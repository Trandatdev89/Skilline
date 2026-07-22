#!/usr/bin/env python3
"""
Quality Gate Script - Skilline DevSecOps Pipeline
Đọc output JSON từ Semgrep, đánh giá theo ngưỡng và quyết định PASS/FAIL
"""

import json
import sys
import os
from datetime import datetime

# ============================================================
# CẤU HÌNH NGƯỠNG QUALITY GATE
# Chỉnh các giá trị này để thay đổi độ nghiêm ngặt
# ============================================================
THRESHOLDS = {
    "ERROR":   0,   # Critical/ERROR  → = 0 mới pass (XSS phải = 0)
    "WARNING": 3,   # High/WARNING    → cho phép tối đa 3
}

SEVERITY_LABEL = {
    "ERROR":   "CRITICAL",
    "WARNING": "HIGH",
    "INFO":    "MEDIUM",
}

def load_results(json_path: str) -> dict:
    if not os.path.exists(json_path):
        print(f"[ERROR] Không tìm thấy file kết quả: {json_path}")
        sys.exit(2)
    with open(json_path, "r", encoding="utf-8") as f:
        return json.load(f)

def count_by_severity(results: dict) -> dict:
    counts = {"ERROR": 0, "WARNING": 0, "INFO": 0}
    for finding in results.get("results", []):
        sev = finding.get("extra", {}).get("severity", "INFO").upper()
        counts[sev] = counts.get(sev, 0) + 1
    return counts

def print_findings(results: dict):
    findings = results.get("results", [])
    if not findings:
        print("  Không có findings nào.")
        return

    for i, f in enumerate(findings, 1):
        sev   = f.get("extra", {}).get("severity", "INFO").upper()
        msg   = f.get("extra", {}).get("message", "").strip().splitlines()[0]
        path  = f.get("path", "unknown")
        start = f.get("start", {}).get("line", "?")
        rule  = f.get("check_id", "unknown")
        label = SEVERITY_LABEL.get(sev, sev)
        print(f"  [{i}] [{label}] {path}:{start}")
        print(f"       Rule  : {rule}")
        print(f"       Detail: {msg}")
        print()

def run_gate(counts: dict) -> bool:
    passed = True
    print("\n╔══════════════════════════════════════════════════╗")
    print("║            QUALITY GATE EVALUATION              ║")
    print("╚══════════════════════════════════════════════════╝\n")

    for sev, threshold in THRESHOLDS.items():
        actual = counts.get(sev, 0)
        label  = SEVERITY_LABEL.get(sev, sev)
        status = "✅ PASS" if actual <= threshold else "❌ FAIL"
        print(f"  {label:<10} | Found: {actual:>3}  | Threshold: {threshold:>3}  | {status}")
        if actual > threshold:
            passed = False

    info_count = counts.get("INFO", 0)
    print(f"  {'MEDIUM':<10} | Found: {info_count:>3}  | Threshold: N/A  | ℹ️  INFO")
    return passed

def main():
    json_path = sys.argv[1] if len(sys.argv) > 1 else "semgrep-output.json"

    print("=" * 52)
    print("   SKILLINE DEVSECOPS - SEMGREP QUALITY GATE")
    print(f"   {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 52)

    results = load_results(json_path)
    counts  = count_by_severity(results)
    total   = sum(counts.values())

    print(f"\n📊 Tổng số findings: {total}")
    print(f"   - CRITICAL (ERROR)  : {counts.get('ERROR', 0)}")
    print(f"   - HIGH    (WARNING) : {counts.get('WARNING', 0)}")
    print(f"   - MEDIUM  (INFO)    : {counts.get('INFO', 0)}")

    print("\n📋 Chi tiết findings:\n")
    print_findings(results)

    passed = run_gate(counts)

    print("\n" + "=" * 52)
    if passed:
        print("🟢  QUALITY GATE: PASSED")
        print("    Pipeline tiếp tục → cho phép deploy")
        print("=" * 52)
        sys.exit(0)
    else:
        print("🔴  QUALITY GATE: FAILED")
        print("    Pipeline bị BLOCK → không được deploy")
        print("    Vui lòng fix các lỗ hổng CRITICAL trước!")
        print("=" * 52)
        sys.exit(1)

if __name__ == "__main__":
    main()