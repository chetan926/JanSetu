from typing import Dict, Any, List
from datetime import datetime
from app.schemas.schemas import EligibilityResponse, RuleCheck

class DeterministicEligibilityEngine:
    POLICY_VERSION = "1.0"
    MAX_INCOME_THRESHOLD = 250000.0

    @classmethod
    def evaluate_scholarship_eligibility(cls, canonical_data: Dict[str, Any]) -> EligibilityResponse:
        checks: List[RuleCheck] = []
        citizen_id = canonical_data.get("citizen_id", "UNKNOWN")

        # 1. Income Check
        annual_income = canonical_data.get("annual_income", 0.0)
        income_passed = annual_income <= cls.MAX_INCOME_THRESHOLD
        checks.append(RuleCheck(
            rule=f"Annual Income ≤ ₹{int(cls.MAX_INCOME_THRESHOLD):,}",
            actual=f"₹{int(annual_income):,}",
            passed=income_passed
        ))

        # 2. Education Status Check
        education_status = canonical_data.get("education_status", "").upper()
        education_passed = education_status == "ACTIVE"
        checks.append(RuleCheck(
            rule="Education Enrollment Status == ACTIVE",
            actual=education_status,
            passed=education_passed
        ))

        # 3. Identity & Property Verification Check
        property_verified = canonical_data.get("property_verified", False)
        identity_passed = bool(property_verified)
        checks.append(RuleCheck(
            rule="Identity Verification == VERIFIED",
            actual="VERIFIED" if property_verified else "UNVERIFIED",
            passed=identity_passed
        ))

        # Final decision calculation
        all_passed = income_passed and education_passed and identity_passed

        reasons = []
        if not income_passed:
            reasons.append(f"Annual income (₹{int(annual_income):,}) exceeds max eligibility limit of ₹{int(cls.MAX_INCOME_THRESHOLD):,}.")
        if not education_passed:
            reasons.append(f"Student enrollment status is '{education_status}' (must be ACTIVE).")
        if not identity_passed:
            reasons.append("Identity verification failed or unverified by National Identity registry.")

        reason_str = " ".join(reasons) if reasons else "Citizen meets all deterministic eligibility criteria for Education Scholarship Scheme 2026."

        return EligibilityResponse(
            eligible=all_passed,
            policy_version=cls.POLICY_VERSION,
            citizen_id=citizen_id,
            checks=checks,
            reason=reason_str,
            evaluated_at=datetime.utcnow().isoformat()
        )
