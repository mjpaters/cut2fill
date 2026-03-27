/**
 * export_data.js — Extract hardcoded data arrays from app.js into clean JSON seed files.
 *
 * Strategy: Find each `const varName = [...]` block by bracket-matching,
 * then evaluate just that array literal in isolation.
 *
 * Usage: node scripts/export_data.js
 * Output: seed/facilities.json, seed/water_points.json, seed/major_projects.json
 */

const fs = require('fs');
const path = require('path');

const appJsPath = path.resolve(__dirname, '../../app.js');
const seedDir = path.resolve(__dirname, '../seed');
if (!fs.existsSync(seedDir)) fs.mkdirSync(seedDir, { recursive: true });

const appJs = fs.readFileSync(appJsPath, 'utf-8');

/**
 * Extract a top-level array assigned to `const varName = [...]`.
 * Uses bracket depth tracking to find the matching close bracket.
 */
function extractArray(src, varName) {
    const marker = `const ${varName} = [`;
    const idx = src.indexOf(marker);
    if (idx === -1) throw new Error(`Could not find "${marker}" in app.js`);

    const arrayStart = idx + marker.length - 1; // position of '['
    let depth = 0;
    for (let i = arrayStart; i < src.length; i++) {
        const ch = src[i];
        if (ch === '[') depth++;
        else if (ch === ']') {
            depth--;
            if (depth === 0) {
                const arrayStr = src.substring(arrayStart, i + 1);
                // Evaluate the array literal (pure data, no DOM needed)
                return eval(`(${arrayStr})`);
            }
        }
        // Skip string contents to avoid false bracket matches
        if (ch === "'" || ch === '"' || ch === '`') {
            const quote = ch;
            i++;
            while (i < src.length && src[i] !== quote) {
                if (src[i] === '\\') i++; // skip escaped char
                i++;
            }
        }
    }
    throw new Error(`Unmatched brackets for ${varName}`);
}

const facilities = extractArray(appJs, 'registeredFacilities');
const waterPoints = extractArray(appJs, 'waterFillPoints');
const majorProjects = extractArray(appJs, 'majorProjects');

// Normalise facilities
const normFacilities = facilities.map(f => ({
    name: f.name,
    facility_type: f.type,
    lat: f.lat,
    lng: f.lng,
    suburb: f.suburb || null,
    hours: f.hours || null,
    notes: f.notes || null,
    icon: f.icon || null,
    color: f.color || null,
    source: 'manual',
    source_ref: f.sourceRef || null,
}));

// Normalise water points
const normWater = waterPoints.map(w => ({
    name: w.name,
    code: w.code || null,
    provider: w.provider,
    lat: w.lat,
    lng: w.lng,
    suburb: w.suburb || null,
    address: w.address || null,
    access: w.access || null,
    water_type: w.waterType || null,
    source: 'manual',
}));

// Normalise major projects
const normProjects = majorProjects.map(p => ({
    name: p.name,
    lat: p.lat,
    lng: p.lng,
    suburb: p.suburb || null,
    description: p.description || null,
    status: p.status || null,
    project_type: p.projectType || null,
    cost: p.cost || null,
    authority: p.authority || null,
    start_date: p.startDate || null,
    expected_end: p.expectedEndDate || null,
    estimated_volume: p.estimatedVolume || null,
    source_url: p.sourceUrl || null,
    phases: (p.phases || []).map((ph, i) => ({
        name: ph.name,
        start_date: ph.start || null,
        end_date: ph.end || null,
        sort_order: i + 1,
    })),
}));

// Write seed files
fs.writeFileSync(path.join(seedDir, 'facilities.json'), JSON.stringify(normFacilities, null, 2));
fs.writeFileSync(path.join(seedDir, 'water_points.json'), JSON.stringify(normWater, null, 2));
fs.writeFileSync(path.join(seedDir, 'major_projects.json'), JSON.stringify(normProjects, null, 2));

console.log(`Exported ${normFacilities.length} facilities`);
console.log(`Exported ${normWater.length} water fill points`);
console.log(`Exported ${normProjects.length} major projects`);
console.log(`Seed files written to ${seedDir}`);
