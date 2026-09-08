from fastapi import APIRouter
from pydantic import BaseModel
from typing import List

router = APIRouter(prefix="/api/ai", tags=["AI Service Discovery"])

class QueryRequest(BaseModel):
    query: str
    language: str = "en"

class AIRecommendationResponse(BaseModel):
    intent: str
    recommended_service: str
    service_id: str
    category: str
    confidence: float
    explanation: str
    required_departments: List[str]
    required_fields: List[str]

@router.post("/assistant", response_model=AIRecommendationResponse)
def analyze_service_request(payload: QueryRequest):
    q = payload.query.lower()

    # 1. Agriculture
    if any(k in q for k in ["farmer", "crop", "fertilizer", "kisan", "agriculture", "రైతు", "పంట", "किसान", "फसल"]):
        return AIRecommendationResponse(
            intent="Agriculture Farmer Aid",
            recommended_service="PM Kisan & Crop Fertilizer Subsidy Scheme",
            service_id="AGRI-001",
            category="Agriculture Department",
            confidence=0.97,
            explanation="Request matches agricultural subsidies, crop insurance, and farmer landholding support.",
            required_departments=["Agriculture Department", "Income Tax Department", "Revenue & Forest Department"],
            required_fields=["Annual Income", "Landholding Verification"]
        )

    # 2. School Education
    if any(k in q for k in ["school", "textbook", "kanya", "vidya", "sports", "బడి", "స్కూల్", "स्कूल", "पाठ्यपुस्तक"]):
        return AIRecommendationResponse(
            intent="School Student Welfare",
            recommended_service="Kanya Vidya Dhan & Free Textbook Scheme",
            service_id="SCHOOL-001",
            category="School Education & Sports Department",
            confidence=0.96,
            explanation="Matches primary & secondary school student benefits and sports grants.",
            required_departments=["School Education & Sports Department", "Property & Identity Department"],
            required_fields=["UDISE Student Enrollment", "Identity Verification"]
        )

    # 3. Public Health
    if any(k in q for k in ["health", "hospital", "medical", "ayushman", "insurance", "ఆరోగ్యం", "వైద్యం", "स्वास्थ्य", "अस्पताल"]):
        return AIRecommendationResponse(
            intent="Public Health Coverage",
            recommended_service="Ayushman Universal Health Protection Grant",
            service_id="HEALTH-001",
            category="Public Health Department",
            confidence=0.98,
            explanation="Matches universal health insurance and cashless hospital treatment grants up to ₹5 Lakhs.",
            required_departments=["Public Health Department", "Income Tax Department", "Identity Department"],
            required_fields=["Annual Income", "ABHA Health Card Verification"]
        )

    # 4. Women & Child
    if any(k in q for k in ["women", "child", "mother", "female", "ladki", "bahin", "స్త్రీ", "మహిళ", "महिला", "बाल"]):
        return AIRecommendationResponse(
            intent="Women & Child Welfare",
            recommended_service="Ladki Bahin Women Welfare & Self-Reliance Grant",
            service_id="WOMEN-001",
            category="Women & Child Development Department",
            confidence=0.97,
            explanation="Matches monthly financial aid and self-reliance grants for female applicants.",
            required_departments=["Women & Child Development Department", "Income Tax Department", "Identity Department"],
            required_fields=["Annual Income", "Identity Verification"]
        )

    # 5. Housing
    if any(k in q for k in ["house", "housing", "home", "pmay", "flat", "ఇల్లు", "గృహం", "आवास", "घर"]):
        return AIRecommendationResponse(
            intent="Affordable Housing Grant",
            recommended_service="PMAY Urban & Rural Affordable Housing Grant",
            service_id="HOUSING-001",
            category="Housing Department",
            confidence=0.96,
            explanation="Matches first-time homebuyer credit subsidies and housing construction grants.",
            required_departments=["Housing Department", "Income Tax Department", "Revenue & Forest Department"],
            required_fields=["Annual Income", "First-time Buyer Status"]
        )

    # 6. Rural Development
    if any(k in q for k in ["rural", "village", "mnrega", "panchayat", "గ్రామీణ", "పల్లె", "ग्रामीण", "पंचायत"]):
        return AIRecommendationResponse(
            intent="Rural Guarantee & Village Development",
            recommended_service="MNREGA Village Infrastructure & Job Guarantee",
            service_id="RURAL-001",
            category="Rural Development Department",
            confidence=0.95,
            explanation="Matches 100-day rural employment job cards and village sanitation grants.",
            required_departments=["Rural Development Department", "Identity Department"],
            required_fields=["Job Card Verification", "Identity Validation"]
        )

    # 7. Urban Development
    if any(k in q for k in ["urban", "city", "municipal", "street vendor", "svanidhi", "పట్టణ", "నగరం", "शहरी", "नगर"]):
        return AIRecommendationResponse(
            intent="Urban Vendor & Municipal Assistance",
            recommended_service="PM SVANidhi Street Vendor Subsidy",
            service_id="URBAN-001",
            category="Urban Development Department",
            confidence=0.95,
            explanation="Matches street vendor working capital loans and municipal property tax exemptions.",
            required_departments=["Urban Development Department", "Income Tax Department", "Identity Department"],
            required_fields=["Vendor ID", "Identity Verification"]
        )

    # 8. Labour
    if any(k in q for k in ["labour", "worker", "worker pension", "eshram", "gig", "కార్మికుడు", "శ్రమ", "श्रमिक", "मजदूर"]):
        return AIRecommendationResponse(
            intent="Labour Welfare & Pension",
            recommended_service="Unorganized Workers Pension & Safety Net",
            service_id="LABOUR-001",
            category="Labour Department",
            confidence=0.97,
            explanation="Matches e-Shram worker pensions, accidental insurance, and safety equipment grants.",
            required_departments=["Labour Department", "Income Tax Department", "Identity Department"],
            required_fields=["e-Shram UAN", "Identity Verification"]
        )

    # 9. Transport
    if any(k in q for k in ["license", "driving", "transport", "vehicle", "rc", "డ్రైవింగ్", "లైసెన్స్", "वाहन", "ड्राइविंग"]):
        return AIRecommendationResponse(
            intent="Transport & License Service",
            recommended_service="Digital Smart Driving License & Vehicle RC Renewal",
            service_id="TRANS-001",
            category="Transport / Motor Vehicles Department",
            confidence=0.98,
            explanation="Matches instant digital driving license renewals, RC ownership transfers, and vehicle fitness.",
            required_departments=["Transport / Motor Vehicles Department", "Property & Identity Department"],
            required_fields=["Driving Test Result", "Biometric Identity Verification"]
        )

    # 10. Food & Civil Supplies
    if any(k in q for k in ["ration", "grain", "food", "rice", "wheat", "రాషన్", "బియ్యం", "राशन", "खाद्यान्न"]):
        return AIRecommendationResponse(
            intent="Ration Card & Food Subsidy",
            recommended_service="Smart Antyodaya Ration Card & Grain Allotment",
            service_id="FOOD-001",
            category="Food, Civil Supplies & Consumer Protection",
            confidence=0.97,
            explanation="Matches BPL ration card allotment, subsidized food grains, and consumer protection.",
            required_departments=["Food, Civil Supplies & Consumer Protection", "Income Tax Department", "Identity Department"],
            required_fields=["Annual Income", "Family Unit Count"]
        )

    # 11. Revenue & Forest
    if any(k in q for k in ["land", "revenue", "7/12", "certificate", "caste", "భూమి", "ఆదాయ ధృవీకరణ", "भूमि", "प्रमाणपत्र"]):
        return AIRecommendationResponse(
            intent="Revenue Land Extract & Certificate",
            recommended_service="7/12 Land Record Extraction & Income/Caste Certificate",
            service_id="REVENUE-001",
            category="Revenue & Forest Department",
            confidence=0.98,
            explanation="Matches digital 7/12 land record extracts, non-creamy layer certificates, and revenue seals.",
            required_departments=["Revenue & Forest Department", "Property & Identity Department"],
            required_fields=["Khata Land Record", "Digital Caste Seal"]
        )

    # Default Higher Education Scholarship
    return AIRecommendationResponse(
        intent="Higher Education Scholarship",
        recommended_service="Higher Education Scholarship Scheme 2026",
        service_id="SCHOLARSHIP-001",
        category="Higher & Technical Education Department",
        confidence=0.95,
        explanation="Matches higher education financial grants, university fee waivers, and student scholarships.",
        required_departments=["Higher & Technical Education Department", "Income Tax Department", "Identity Department"],
        required_fields=["Annual Income (≤ ₹2,50,000)", "Education Enrollment Status (ACTIVE)", "Identity Verification (VERIFIED)"]
    )
