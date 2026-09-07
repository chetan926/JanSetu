from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
import time
from app.core.database import get_db
from app.models.models import Citizen

router = APIRouter(prefix="/mock", tags=["Mock Department APIs"])

active_scenario = "NORMAL"

@router.post("/scenario/{scenario_name}")
def set_demo_scenario(scenario_name: str):
    global active_scenario
    active_scenario = scenario_name.upper()
    return {"status": "SUCCESS", "active_scenario": active_scenario}

@router.get("/scenario")
def get_demo_scenario():
    return {"active_scenario": active_scenario}

def check_scenario_delay_or_failure(dept_code: str):
    if active_scenario == f"{dept_code.upper()}_SLOW":
        time.sleep(1.5)
    elif active_scenario == f"{dept_code.upper()}_DOWN":
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=f"{dept_code.replace('_', ' ').title()} API is temporarily unavailable."
        )

# 1. Income Department
@router.get("/income/{citizen_id}")
def get_income(citizen_id: str, db: Session = Depends(get_db)):
    check_scenario_delay_or_failure("income")
    citizen = db.query(Citizen).filter(Citizen.citizen_id == citizen_id).first()
    if not citizen:
        raise HTTPException(status_code=404, detail="Citizen ID not found.")
    return {
        "citizen_id": citizen.citizen_id,
        "full_name": citizen.name,
        "annual_income": citizen.annual_income,
        "department": "Income Tax Department"
    }

# 2. Education Department
@router.get("/education/{citizen_id}")
def get_education(citizen_id: str, db: Session = Depends(get_db)):
    check_scenario_delay_or_failure("education")
    citizen = db.query(Citizen).filter(Citizen.citizen_id == citizen_id).first()
    if not citizen:
        raise HTTPException(status_code=404, detail="Student ID not found.")
    return {
        "studentId": citizen.citizen_id,
        "studentName": citizen.name,
        "enrollmentStatus": citizen.education_status,
        "institution": "National Institute of Technology",
        "department": "Higher Education Department"
    }

# 3. Property & Identity Department
@router.get("/property/{citizen_id}")
def get_property(citizen_id: str, db: Session = Depends(get_db)):
    check_scenario_delay_or_failure("property")
    citizen = db.query(Citizen).filter(Citizen.citizen_id == citizen_id).first()
    if not citizen:
        raise HTTPException(status_code=404, detail="Identity ID not found.")
    return {
        "id": citizen.citizen_id,
        "owner": citizen.name,
        "verification": "VERIFIED" if citizen.property_verified else "UNVERIFIED",
        "department": "Property & Identity Department"
    }

# 4. Agriculture Department
@router.get("/agriculture/{citizen_id}")
def get_agriculture(citizen_id: str, db: Session = Depends(get_db)):
    check_scenario_delay_or_failure("agriculture")
    citizen = db.query(Citizen).filter(Citizen.citizen_id == citizen_id).first()
    return {
        "farmer_id": f"FARM-{citizen_id}",
        "farmer_name": citizen.name if citizen else "Ravi Kumar",
        "land_holding_acres": 2.5,
        "pm_kisan_eligible": True,
        "department": "Agriculture Department"
    }

# 5. School Education Department
@router.get("/school_edu/{citizen_id}")
def get_school_edu(citizen_id: str, db: Session = Depends(get_db)):
    return {
        "student_udise_id": f"UDISE-{citizen_id}",
        "student_name": "Ravi Kumar",
        "school_grade": "Class 12 Passed",
        "school_enrollment": "ACTIVE",
        "department": "School Education & Sports Department"
    }

# 6. Public Health Department
@router.get("/health/{citizen_id}")
def get_health(citizen_id: str, db: Session = Depends(get_db)):
    return {
        "health_card_no": "ABHA-8891-2026",
        "beneficiary_name": "Ravi Kumar",
        "ayushman_coverage": "ACTIVE_5LAKH",
        "department": "Public Health Department"
    }

# 7. Women & Child Development
@router.get("/women_child/{citizen_id}")
def get_women_child(citizen_id: str, db: Session = Depends(get_db)):
    return {
        "scheme_ref": "WCD-2026-9901",
        "applicant": "Family Representative",
        "poshan_status": "VERIFIED",
        "department": "Women & Child Development Department"
    }

# 8. Housing Department
@router.get("/housing/{citizen_id}")
def get_housing(citizen_id: str, db: Session = Depends(get_db)):
    return {
        "pmay_application_id": f"PMAY-{citizen_id}",
        "first_time_homebuyer": True,
        "subsidy_tier": "CLSS-LIG",
        "department": "Housing Department"
    }

# 9. Rural Development Department
@router.get("/rural_dev/{citizen_id}")
def get_rural_dev(citizen_id: str, db: Session = Depends(get_db)):
    return {
        "job_card_no": f"MNREGA-{citizen_id}",
        "days_completed": 45,
        "wage_status": "VERIFIED_DIRECT_BENEFIT",
        "department": "Rural Development Department"
    }

# 10. Urban Development Department
@router.get("/urban_dev/{citizen_id}")
def get_urban_dev(citizen_id: str, db: Session = Depends(get_db)):
    return {
        "vendor_id": f"SVANIDHI-{citizen_id}",
        "municipal_zone": "Zone-4 Central",
        "tax_status": "CLEAR",
        "department": "Urban Development Department"
    }

# 11. Labour Department
@router.get("/labour/{citizen_id}")
def get_labour(citizen_id: str, db: Session = Depends(get_db)):
    return {
        "eshram_uan": "UAN-1002-9912-3341",
        "worker_category": "Building & Construction Worker",
        "social_security_status": "ACTIVE",
        "department": "Labour Department"
    }

# 12. Transport / Motor Vehicles
@router.get("/transport/{citizen_id}")
def get_transport(citizen_id: str, db: Session = Depends(get_db)):
    return {
        "dl_number": "DL-042026001001",
        "license_class": "LMV / Motorcycle",
        "dl_status": "VALID_ACTIVE",
        "department": "Transport / Motor Vehicles Department"
    }

# 13. Food, Civil Supplies & Consumer Protection
@router.get("/food_supplies/{citizen_id}")
def get_food_supplies(citizen_id: str, db: Session = Depends(get_db)):
    return {
        "ration_card_no": f"RC-ANTYODAYA-{citizen_id}",
        "card_type": "PHH_PRIORITY_HOUSEHOLD",
        "family_members": 4,
        "department": "Food, Civil Supplies & Consumer Protection"
    }

# 14. Revenue & Forest Department
@router.get("/revenue_forest/{citizen_id}")
def get_revenue_forest(citizen_id: str, db: Session = Depends(get_db)):
    return {
        "khata_number": "7/12-EXTRACT-8891",
        "land_area_sqft": 10800,
        "encumbrance_status": "NIL_CLEAR",
        "caste_cert_status": "VERIFIED_DIGITAL_SEAL",
        "department": "Revenue & Forest Department"
    }
