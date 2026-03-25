#!/usr/bin/env node
/**
 * Cut2Fill — Data Source Health Check
 *
 * Verifies all external data dependencies are still reachable.
 * Run manually: node scripts/check-sources.js
 * Run on schedule: set up as a GitHub Actions cron job
 *
 * Outputs a report to stdout and optionally to docs/source-health-report.txt
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const REGISTRY_PATH = path.join(__dirname, '..', 'data', 'source-registry.json');
const REPORT_PATH = path.join(__dirname, '..', 'docs', 'source-health-report.txt');
const TIMEOUT_MS = 15000;

function checkUrl(url) {
    return new Promise((resolve) => {
        const protocol = url.startsWith('https') ? https : http;
        const req = protocol.get(url, { timeout: TIMEOUT_MS }, (res) => {
            // Follow redirects
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                resolve({ url, status: res.statusCode, ok: true, redirectTo: res.headers.location, note: 'redirect' });
            } else {
                resolve({ url, status: res.statusCode, ok: res.statusCode >= 200 && res.statusCode < 400 });
            }
            res.resume(); // consume response to free memory
        });
        req.on('error', (err) => {
            resolve({ url, status: 0, ok: false, error: err.message });
        });
        req.on('timeout', () => {
            req.destroy();
            resolve({ url, status: 0, ok: false, error: 'timeout' });
        });
    });
}

function daysSince(dateStr) {
    if (!dateStr) return null;
    const d = new Date(dateStr);
    const now = new Date();
    return Math.floor((now - d) / (1000 * 60 * 60 * 24));
}

async function main() {
    const registry = JSON.parse(fs.readFileSync(REGISTRY_PATH, 'utf8'));
    const sources = registry.sources;
    const lines = [];
    const issues = [];

    lines.push('='.repeat(80));
    lines.push('CUT2FILL — DATA SOURCE HEALTH CHECK');
    lines.push(`Run: ${new Date().toISOString()}`);
    lines.push('='.repeat(80));
    lines.push('');

    for (const [key, source] of Object.entries(sources)) {
        lines.push(`--- ${source.name} [${source.criticality.toUpperCase()}] ---`);

        // Check primary URL
        const result = await checkUrl(source.primaryUrl);
        const statusIcon = result.ok ? 'OK' : 'FAIL';
        lines.push(`  Primary: ${statusIcon} (${result.status}) ${source.primaryUrl.substring(0, 80)}`);

        if (!result.ok) {
            issues.push({
                source: source.name,
                criticality: source.criticality,
                type: 'PRIMARY_URL_FAIL',
                url: source.primaryUrl,
                error: result.error || `HTTP ${result.status}`,
                fallback: source.fallbackStrategy
            });
        }

        if (result.redirectTo) {
            lines.push(`    -> Redirects to: ${result.redirectTo.substring(0, 80)}`);
        }

        // Check backup URLs
        if (source.backupUrls && source.backupUrls.length > 0) {
            for (const backupUrl of source.backupUrls) {
                const backupResult = await checkUrl(backupUrl);
                const backupIcon = backupResult.ok ? 'OK' : 'FAIL';
                lines.push(`  Backup:  ${backupIcon} (${backupResult.status}) ${backupUrl.substring(0, 80)}`);

                if (!backupResult.ok) {
                    issues.push({
                        source: source.name,
                        criticality: source.criticality,
                        type: 'BACKUP_URL_FAIL',
                        url: backupUrl,
                        error: backupResult.error || `HTTP ${backupResult.status}`
                    });
                }
            }
        }

        // Check snapshot freshness
        if (source.lastPulled) {
            const age = daysSince(source.lastPulled);
            const staleThreshold = source.updateFrequency === 'quarterly' ? 120 :
                                   source.updateFrequency === 'rarely' ? 365 : 90;
            const fresh = age <= staleThreshold;
            lines.push(`  Snapshot: ${fresh ? 'FRESH' : 'STALE'} (${age} days old, pulled ${source.lastPulled})`);

            if (!fresh) {
                issues.push({
                    source: source.name,
                    criticality: source.criticality,
                    type: 'SNAPSHOT_STALE',
                    age: `${age} days`,
                    lastPulled: source.lastPulled,
                    threshold: `${staleThreshold} days`
                });
            }
        }

        // Check local snapshot file exists
        if (source.snapshot) {
            const snapshotPath = path.join(__dirname, '..', source.snapshot);
            const exists = fs.existsSync(snapshotPath);
            if (!exists) {
                lines.push(`  Local file: MISSING (${source.snapshot})`);
                issues.push({
                    source: source.name,
                    criticality: source.criticality,
                    type: 'SNAPSHOT_MISSING',
                    file: source.snapshot
                });
            }
        }

        lines.push('');
    }

    // Summary
    lines.push('='.repeat(80));
    lines.push('SUMMARY');
    lines.push('='.repeat(80));

    if (issues.length === 0) {
        lines.push('All sources healthy. No issues detected.');
    } else {
        lines.push(`${issues.length} issue(s) found:`);
        lines.push('');
        for (const issue of issues) {
            const icon = issue.criticality === 'high' ? '!!!' :
                         issue.criticality === 'medium' ? ' ! ' : ' . ';
            lines.push(`  [${icon}] ${issue.source}`);
            lines.push(`        Type: ${issue.type}`);
            if (issue.url) lines.push(`        URL: ${issue.url}`);
            if (issue.error) lines.push(`        Error: ${issue.error}`);
            if (issue.age) lines.push(`        Age: ${issue.age} (threshold: ${issue.threshold})`);
            if (issue.file) lines.push(`        File: ${issue.file}`);
            if (issue.fallback) lines.push(`        Fallback: ${issue.fallback}`);
            lines.push('');
        }
    }

    const report = lines.join('\n');
    console.log(report);

    // Save report
    fs.writeFileSync(REPORT_PATH, report, 'utf8');
    console.log(`\nReport saved to: ${REPORT_PATH}`);

    // Exit with error code if high-criticality issues found
    const highCritical = issues.filter(i => i.criticality === 'high');
    if (highCritical.length > 0) {
        console.log(`\n${highCritical.length} HIGH criticality issue(s) — action required.`);
        process.exit(1);
    }
}

main().catch(err => {
    console.error('Health check failed:', err);
    process.exit(2);
});
