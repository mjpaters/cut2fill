"""
Cut2Fill Dev Hub — Local server for viewing and editing project documents.
Run: python docs/dev-hub/server.py
Open: http://localhost:8060
"""

import json
import subprocess
import sys
from datetime import datetime
from pathlib import Path

from flask import Flask, jsonify, request, send_file, abort

# Paths
HUB_DIR = Path(__file__).parent
DOCS_DIR = HUB_DIR.parent
PROJECT_ROOT = DOCS_DIR.parent
JOURNAL_DIR = DOCS_DIR / "dev-journal"
BOARD_FILE = HUB_DIR / "board.json"

app = Flask(__name__)


# --- Routes ---

@app.route("/")
def index():
    return send_file(HUB_DIR / "index.html")


@app.route("/api/docs")
def list_docs():
    """List all markdown documents in docs/."""
    docs = []
    for f in sorted(DOCS_DIR.glob("*.md")):
        stat = f.stat()
        docs.append({
            "filename": f.name,
            "size": stat.st_size,
            "modified": datetime.fromtimestamp(stat.st_mtime).isoformat(),
            "lines": sum(1 for _ in open(f, encoding="utf-8")),
        })
    return jsonify(docs)


@app.route("/api/docs/<filename>")
def get_doc(filename):
    """Read a single markdown document."""
    path = DOCS_DIR / filename
    if not path.exists() or path.suffix != ".md" or ".." in filename:
        abort(404)
    return jsonify({
        "filename": filename,
        "content": path.read_text(encoding="utf-8"),
        "modified": datetime.fromtimestamp(path.stat().st_mtime).isoformat(),
    })


@app.route("/api/docs/<filename>", methods=["PUT"])
def save_doc(filename):
    """Save a markdown document and append to dev journal."""
    path = DOCS_DIR / filename
    if path.suffix != ".md" or ".." in filename:
        abort(400)
    if not path.exists():
        abort(404)

    body = request.get_json()
    content = body.get("content", "")
    note = body.get("note")

    path.write_text(content, encoding="utf-8")

    # Append to today's dev journal
    now = datetime.now()
    journal_file = JOURNAL_DIR / f"{now.strftime('%Y-%m-%d')}_session.md"
    entry = f"\n## {now.strftime('%H:%M')} — Edited {filename} via Dev Hub\n"
    if note:
        entry += f"- {note}\n"
    entry += f"- File: `docs/{filename}`\n"

    if journal_file.exists():
        with open(journal_file, "a", encoding="utf-8") as jf:
            jf.write(entry)
    else:
        with open(journal_file, "w", encoding="utf-8") as jf:
            jf.write(f"# Dev Journal — {now.strftime('%Y-%m-%d')}\n{entry}")

    return jsonify({"saved": True, "filename": filename})


@app.route("/api/journal")
def list_journal():
    """List all dev journal entries, newest first."""
    entries = []
    for f in sorted(JOURNAL_DIR.glob("*.md"), reverse=True):
        entries.append({
            "filename": f.name,
            "date": f.stem.replace("_session", ""),
            "content": f.read_text(encoding="utf-8"),
        })
    return jsonify(entries)


@app.route("/api/git/status")
def git_status():
    """Get current git status for docs/."""
    try:
        result = subprocess.run(
            ["git", "status", "--porcelain", "docs/"],
            capture_output=True, text=True, cwd=PROJECT_ROOT,
        )
        changes = [line.strip() for line in result.stdout.strip().split("\n") if line.strip()]
        return jsonify({"changes": changes, "clean": len(changes) == 0})
    except Exception as e:
        return jsonify({"error": str(e)})


@app.route("/api/git/log")
def git_log():
    """Get recent git history for docs/."""
    try:
        result = subprocess.run(
            ["git", "log", "--oneline", "-20", "--", "docs/"],
            capture_output=True, text=True, cwd=PROJECT_ROOT,
        )
        commits = []
        for line in result.stdout.strip().split("\n"):
            if line.strip():
                parts = line.strip().split(" ", 1)
                commits.append({"hash": parts[0], "message": parts[1] if len(parts) > 1 else ""})
        return jsonify(commits)
    except Exception as e:
        return jsonify({"error": str(e)})


@app.route("/api/git/diff/<filename>")
def git_diff(filename):
    """Get uncommitted diff for a specific file."""
    if ".." in filename:
        abort(400)
    try:
        result = subprocess.run(
            ["git", "diff", f"docs/{filename}"],
            capture_output=True, text=True, cwd=PROJECT_ROOT,
        )
        return jsonify({"filename": filename, "diff": result.stdout})
    except Exception as e:
        return jsonify({"error": str(e)})


@app.route("/api/git/commit", methods=["POST"])
def git_commit():
    """Stage docs/ changes and commit."""
    body = request.get_json()
    message = body.get("message", "").strip()
    if not message:
        return jsonify({"committed": False, "error": "Empty commit message"}), 400
    try:
        subprocess.run(
            ["git", "add", "docs/"],
            capture_output=True, text=True, cwd=PROJECT_ROOT,
        )
        result = subprocess.run(
            ["git", "commit", "-m", message],
            capture_output=True, text=True, cwd=PROJECT_ROOT,
        )
        if result.returncode != 0:
            return jsonify({"committed": False, "error": result.stderr.strip() or result.stdout.strip()})
        return jsonify({"committed": True, "message": message})
    except Exception as e:
        return jsonify({"committed": False, "error": str(e)})


# --- Board (Trello-style task tracking) ---

@app.route("/api/board")
def get_board():
    """Get the full board state."""
    if BOARD_FILE.exists():
        return jsonify(json.loads(BOARD_FILE.read_text(encoding="utf-8")))
    return jsonify({"columns": []})


@app.route("/api/board", methods=["PUT"])
def save_board():
    """Save the full board state."""
    data = request.get_json()
    BOARD_FILE.write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding="utf-8")
    return jsonify({"saved": True})


if __name__ == "__main__":
    print("Cut2Fill Dev Hub starting on http://localhost:8060")
    print(f"Serving docs from: {DOCS_DIR}")
    app.run(host="127.0.0.1", port=8060, debug=True)
