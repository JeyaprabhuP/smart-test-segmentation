import json
from pathlib import Path
from typing import Optional

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Backend Service - Segmentation API",
    description="API serving healthcare dataset endpoints",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATA_DIR = Path(__file__).resolve().parent.parent / "data" / "json"


def load_json(filename: str) -> list:
    filepath = DATA_DIR / filename
    if not filepath.exists():
        raise HTTPException(status_code=404, detail=f"Data file {filename} not found")
    with open(filepath, "r") as f:
        return json.load(f)


def find_by_id(data: list, item_id: str) -> dict:
    for item in data:
        if item.get("id") == item_id:
            return item
    raise HTTPException(status_code=404, detail=f"Item with id '{item_id}' not found")


@app.get("/")
def health():
    return {
        "service": "Smart Test Segmentation API",
        "version": "1.0.0",
        "endpoints": [
            "/api/alerts",
            "/api/audit-logs",
            "/api/departments",
            "/api/hourly-vitals",
            "/api/hourly-patient-load",
            "/api/lab-reports",
            "/api/notifications",
            "/api/patients",
            "/api/resources",
            "/api/rules",
            "/api/shift-schedules",
            "/api/staff",
            "/api/system-metrics",
            "/api/users",
            "/api/ward-distribution",
        ],
    }


# --- Alerts ---
@app.get("/api/alerts")
def get_alerts(severity: Optional[str] = None):
    data = load_json("alerts.json")
    if severity:
        data = [a for a in data if a.get("severity") == severity]
    return data


@app.get("/api/alerts/{alert_id}")
def get_alert(alert_id: str):
    return find_by_id(load_json("alerts.json"), alert_id)


# --- Audit Logs ---
@app.get("/api/audit-logs")
def get_audit_logs(category: Optional[str] = None):
    data = load_json("auditLogs.json")
    if category:
        data = [a for a in data if a.get("category") == category]
    return data


@app.get("/api/audit-logs/{log_id}")
def get_audit_log(log_id: str):
    return find_by_id(load_json("auditLogs.json"), log_id)


# --- Departments ---
@app.get("/api/departments")
def get_departments():
    return load_json("departments.json")


@app.get("/api/departments/{dept_id}")
def get_department(dept_id: str):
    return find_by_id(load_json("departments.json"), dept_id)


# --- Hourly Vitals ---
@app.get("/api/hourly-vitals")
def get_hourly_vitals(patient_id: Optional[str] = None):
    data = load_json("hourlyVitals.json")
    if patient_id:
        data = [v for v in data if v.get("patientId") == patient_id]
    return data


# --- Hourly Patient Load ---
@app.get("/api/hourly-patient-load")
def get_hourly_patient_load():
    return load_json("hourlyPatientLoad.json")


# --- Lab Reports ---
@app.get("/api/lab-reports")
def get_lab_reports(patient_id: Optional[str] = None, status: Optional[str] = None):
    data = load_json("labReports.json")
    if patient_id:
        data = [r for r in data if r.get("patientId") == patient_id]
    if status:
        data = [r for r in data if r.get("status") == status]
    return data


@app.get("/api/lab-reports/{report_id}")
def get_lab_report(report_id: str):
    return find_by_id(load_json("labReports.json"), report_id)


# --- Notifications ---
@app.get("/api/notifications")
def get_notifications(type: Optional[str] = None):
    data = load_json("notifications.json")
    if type:
        data = [n for n in data if n.get("type") == type]
    return data


@app.get("/api/notifications/{notif_id}")
def get_notification(notif_id: str):
    return find_by_id(load_json("notifications.json"), notif_id)


# --- Patients ---
@app.get("/api/patients")
def get_patients(
    severity: Optional[str] = None,
    status: Optional[str] = None,
    ward: Optional[str] = None,
):
    data = load_json("patients.json")
    if severity:
        data = [p for p in data if p.get("severity") == severity]
    if status:
        data = [p for p in data if p.get("status") == status]
    if ward:
        data = [p for p in data if p.get("ward") == ward]
    return data


@app.get("/api/patients/{patient_id}")
def get_patient(patient_id: str):
    return find_by_id(load_json("patients.json"), patient_id)


# --- Resources ---
@app.get("/api/resources")
def get_resources():
    return load_json("resources.json")


# --- Rules ---
@app.get("/api/rules")
def get_rules(active: Optional[bool] = None):
    data = load_json("rules.json")
    if active is not None:
        data = [r for r in data if r.get("active") == active]
    return data


@app.get("/api/rules/{rule_id}")
def get_rule(rule_id: str):
    return find_by_id(load_json("rules.json"), rule_id)


# --- Shift Schedules ---
@app.get("/api/shift-schedules")
def get_shift_schedules(department: Optional[str] = None, status: Optional[str] = None):
    data = load_json("shiftSchedules.json")
    if department:
        data = [s for s in data if s.get("department") == department]
    if status:
        data = [s for s in data if s.get("status") == status]
    return data


@app.get("/api/shift-schedules/{schedule_id}")
def get_shift_schedule(schedule_id: str):
    return find_by_id(load_json("shiftSchedules.json"), schedule_id)


# --- Staff ---
@app.get("/api/staff")
def get_staff(
    department: Optional[str] = None,
    role: Optional[str] = None,
    on_duty: Optional[bool] = None,
):
    data = load_json("staff.json")
    if department:
        data = [s for s in data if s.get("department") == department]
    if role:
        data = [s for s in data if s.get("role") == role]
    if on_duty is not None:
        data = [s for s in data if s.get("onDuty") == on_duty]
    return data


@app.get("/api/staff/{staff_id}")
def get_staff_member(staff_id: str):
    return find_by_id(load_json("staff.json"), staff_id)


# --- System Metrics ---
@app.get("/api/system-metrics")
def get_system_metrics():
    return load_json("systemMetrics.json")


@app.get("/api/system-metrics/{metric_id}")
def get_system_metric(metric_id: str):
    return find_by_id(load_json("systemMetrics.json"), metric_id)


# --- Users ---
@app.get("/api/users")
def get_users(role: Optional[str] = None):
    data = load_json("users.json")
    if role:
        data = [u for u in data if u.get("role") == role]
    return data


@app.get("/api/users/{user_id}")
def get_user(user_id: str):
    return find_by_id(load_json("users.json"), user_id)


# --- Ward Distribution ---
@app.get("/api/ward-distribution")
def get_ward_distribution():
    return load_json("wardDistribution.json")
