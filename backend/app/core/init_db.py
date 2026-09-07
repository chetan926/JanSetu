from app.core.database import engine, Base, SessionLocal
from app.models.models import User, Citizen, Department, GovernmentService, Consent
from app.core.security import hash_password
from datetime import datetime, timedelta

def init_db():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    # Check if DB already seeded with 12 departments
    if db.query(Department).count() >= 12:
        db.close()
        print("Database already seeded with 12 departments.")
        return

    print("Seeding database with 12 government departments & connected services...")

    # Clear old data if partial
    db.query(GovernmentService).delete()
    db.query(Department).delete()
    db.query(Consent).delete()
    db.query(Citizen).delete()
    db.query(User).delete()
    db.commit()

    # Password hash
    hashed_pwd = hash_password("demo123")

    # 1. Users
    user1 = User(citizen_id="C1001", name="Ravi Kumar", email="ravi.kumar@example.com", role="citizen", hashed_password=hashed_pwd)
    user_admin = User(citizen_id="ADMIN01", name="System Admin", email="admin@gov.in", role="admin", hashed_password=hashed_pwd)
    db.add_all([user1, user_admin])

    # 2. Demo Citizens
    c1001 = Citizen(citizen_id="C1001", name="Ravi Kumar", annual_income=180000.0, education_status="ACTIVE", property_verified=True)
    c1002 = Citizen(citizen_id="C1002", name="Anita Sharma", annual_income=450000.0, education_status="ACTIVE", property_verified=True)
    c1003 = Citizen(citizen_id="C1003", name="Suresh Patel", annual_income=180000.0, education_status="INACTIVE", property_verified=True)
    c1004 = Citizen(citizen_id="C1004", name="Vikram Singh", annual_income=180000.0, education_status="ACTIVE", property_verified=False)
    db.add_all([c1001, c1002, c1003, c1004])

    # 3. 12 Government Departments
    departments = [
        Department(code="agriculture", name="Agriculture Department", endpoint="/mock/agriculture", status="operational", latency_ms=135),
        Department(code="education", name="Higher & Technical Education Department", endpoint="/mock/education", status="operational", latency_ms=118),
        Department(code="school_edu", name="School Education & Sports Department", endpoint="/mock/school_edu", status="operational", latency_ms=110),
        Department(code="health", name="Public Health Department", endpoint="/mock/health", status="operational", latency_ms=145),
        Department(code="women_child", name="Women & Child Development Department", endpoint="/mock/women_child", status="operational", latency_ms=125),
        Department(code="housing", name="Housing Department", endpoint="/mock/housing", status="operational", latency_ms=155),
        Department(code="rural_dev", name="Rural Development Department", endpoint="/mock/rural_dev", status="operational", latency_ms=140),
        Department(code="urban_dev", name="Urban Development Department", endpoint="/mock/urban_dev", status="operational", latency_ms=130),
        Department(code="labour", name="Labour Department", endpoint="/mock/labour", status="operational", latency_ms=120),
        Department(code="transport", name="Transport / Motor Vehicles Department", endpoint="/mock/transport", status="operational", latency_ms=105),
        Department(code="food_supplies", name="Food, Civil Supplies & Consumer Protection", endpoint="/mock/food_supplies", status="operational", latency_ms=115),
        Department(code="revenue_forest", name="Revenue & Forest Department", endpoint="/mock/revenue_forest", status="operational", latency_ms=150),
        Department(code="income", name="Income Tax Department", endpoint="/mock/income", status="operational", latency_ms=142),
        Department(code="property", name="Property & Identity Verification Department", endpoint="/mock/property", status="operational", latency_ms=163)
    ]
    db.add_all(departments)

    # 4. Services across all 12 departments
    services = [
        GovernmentService(
            service_id="AGRI-001",
            name="PM Kisan & Crop Fertilizer Subsidy Scheme",
            category="Agriculture Department",
            description="Direct landholding subsidy & crop insurance assistance for registered farmers.",
            required_departments=["agriculture", "income", "revenue_forest"],
            required_fields=["annual_income", "land_record_verified"],
            status="active"
        ),
        GovernmentService(
            service_id="SCHOLARSHIP-001",
            name="Higher Education Scholarship Scheme 2026",
            category="Higher & Technical Education Department",
            description="Financial assistance scheme for higher education students from low-income families.",
            required_departments=["income", "education", "property"],
            required_fields=["annual_income", "education_status", "property_verified"],
            status="active"
        ),
        GovernmentService(
            service_id="SCHOOL-001",
            name="Kanya Vidya Dhan & Free Textbook Scheme",
            category="School Education & Sports Department",
            description="Financial grant & educational kit for female school students in secondary education.",
            required_departments=["school_edu", "property"],
            required_fields=["school_enrollment", "identity_verified"],
            status="active"
        ),
        GovernmentService(
            service_id="HEALTH-001",
            name="Ayushman Universal Health Protection Grant",
            category="Public Health Department",
            description="Cashless hospital treatment insurance up to ₹5 Lakhs per family per year.",
            required_departments=["health", "income", "property"],
            required_fields=["annual_income", "identity_verified"],
            status="active"
        ),
        GovernmentService(
            service_id="WOMEN-001",
            name="Ladki Bahin Women Welfare & Self-Reliance Grant",
            category="Women & Child Development Department",
            description="Monthly financial assistance & skill development grant for women entrepreneurs.",
            required_departments=["women_child", "income", "property"],
            required_fields=["annual_income", "identity_verified"],
            status="active"
        ),
        GovernmentService(
            service_id="HOUSING-001",
            name="PMAY Urban & Rural Affordable Housing Grant",
            category="Housing Department",
            description="Financial interest subsidy & construction grant for first-time home buyers.",
            required_departments=["housing", "income", "revenue_forest"],
            required_fields=["annual_income", "property_verified"],
            status="active"
        ),
        GovernmentService(
            service_id="RURAL-001",
            name="MNREGA Village Infrastructure & Job Guarantee",
            category="Rural Development Department",
            description="100-day guaranteed wage employment & village sanitation infrastructure grant.",
            required_departments=["rural_dev", "property"],
            required_fields=["job_card_verified", "identity_verified"],
            status="active"
        ),
        GovernmentService(
            service_id="URBAN-001",
            name="PM SVANidhi Street Vendor Subsidy",
            category="Urban Development Department",
            description="Collateral-free working capital loan & municipal property tax relief.",
            required_departments=["urban_dev", "income", "property"],
            required_fields=["vendor_id_verified", "identity_verified"],
            status="active"
        ),
        GovernmentService(
            service_id="LABOUR-001",
            name="Unorganized Workers Pension & Safety Net",
            category="Labour Department",
            description="Social security pension, accidental insurance, and welfare kit for gig & construction workers.",
            required_departments=["labour", "income", "property"],
            required_fields=["eshram_id_verified", "identity_verified"],
            status="active"
        ),
        GovernmentService(
            service_id="TRANS-001",
            name="Digital Smart Driving License & Vehicle RC Renewal",
            category="Transport / Motor Vehicles Department",
            description="Instant zero-paperwork driving license issuance, transfer of ownership, and fitness RC.",
            required_departments=["transport", "property"],
            required_fields=["dl_test_passed", "identity_verified"],
            status="active"
        ),
        GovernmentService(
            service_id="FOOD-001",
            name="Smart Antyodaya Ration Card & Grain Allotment",
            category="Food, Civil Supplies & Consumer Protection",
            description="Subsidized food grain distribution (Wheat, Rice, Pulses) for BPL families.",
            required_departments=["food_supplies", "income", "property"],
            required_fields=["annual_income", "family_unit_verified"],
            status="active"
        ),
        GovernmentService(
            service_id="REVENUE-001",
            name="7/12 Land Record Extraction & Income/Caste Certificate",
            category="Revenue & Forest Department",
            description="Instant digitally signed 7/12 land extract, income certificate, and non-creamy layer validation.",
            required_departments=["revenue_forest", "property"],
            required_fields=["land_record_verified", "identity_verified"],
            status="active"
        )
    ]
    db.add_all(services)

    # 5. Pre-granted Consents for Demo Citizen C1001
    now = datetime.utcnow()
    expires = now + timedelta(days=30)
    
    consents = [
        Consent(consent_id="CONSENT-INC-8891", citizen_id="C1001", department="Income Tax Department", requested_fields=["annual_income"], purpose="Scholarship & Subsidy Verification", status="GRANTED", granted_at=now, expires_at=expires),
        Consent(consent_id="CONSENT-EDU-4120", citizen_id="C1001", department="Higher & Technical Education Department", requested_fields=["education_status"], purpose="Student Verification", status="GRANTED", granted_at=now, expires_at=expires),
        Consent(consent_id="CONSENT-ID-1092", citizen_id="C1001", department="Property & Identity Verification Department", requested_fields=["property_verified"], purpose="Identity Validation", status="GRANTED", granted_at=now, expires_at=expires),
        Consent(consent_id="CONSENT-AGR-3012", citizen_id="C1001", department="Agriculture Department", requested_fields=["land_holding"], purpose="Crop Subsidy Check", status="GRANTED", granted_at=now, expires_at=expires),
        Consent(consent_id="CONSENT-HLT-5511", citizen_id="C1001", department="Public Health Department", requested_fields=["health_card_status"], purpose="Medical Coverage Verification", status="GRANTED", granted_at=now, expires_at=expires),
    ]
    db.add_all(consents)

    db.commit()
    db.close()
    print("Seeded all 12 government departments & services successfully.")

if __name__ == "__main__":
    init_db()
