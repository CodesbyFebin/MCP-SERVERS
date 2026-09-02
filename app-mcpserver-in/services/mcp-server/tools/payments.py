"""UPI (Unified Payments Interface) VPA validation tool.

Validates VPA (Virtual Payment Address) format: user@handle
"""

import re
from typing import Dict, Any, Optional


def validate_upi(vpa: str) -> Dict[str, Any]:
    """Validate a UPI VPA (Virtual Payment Address).
    
    Format: user@handle
    - user: alphanumeric, can contain dots, underscores, hyphens
    - handle: recognized UPI handle suffixes
    
    Args:
        vpa: UPI VPA string (e.g., user@okaxis)
        
    Returns:
        Dictionary with validation result and handle information
    """
    result: Dict[str, Any] = {
        "valid": False,
        "vpa": vpa,
        "user": None,
        "handle": None,
        "handle_type": None,
        "bank": None,
        "errors": []
    }
    
    # VPA format: user@handle
    # user: alphanumeric with . _ - allowed
    # handle: @okaxis, @upi, @paytm, etc.
    upi_pattern = r"^([a-zA-Z0-9._-]+)@([a-zA-Z0-9]+)$"
    
    match = re.match(upi_pattern, vpa)
    if not match:
        result["errors"].append(f"Invalid VPA format — expected user@handle, got: {vpa}")
        return result
    
    user = match.group(1)
    handle = match.group(2)
    
    result["vpa"] = vpa
    result["user"] = user
    result["handle"] = "@" + handle
    
    # Determine handle type
    handle_types: Dict[str, str] = {
        "okaxis": "Axis Bank",
        "icici": "ICICI Bank",
        "sbi": "State Bank of India",
        "hdfc": "HDFC Bank",
        "paytm": "Paytm",
        "phonepe": "PhonePe",
        "googlepay": "Google Pay",
        "upi": "Generic UPI",
        "yz": "Yes Bank",
        "kotak": "Kotak Mahindra Bank",
        "axis": "Axis Bank",
    }
    
    result["handle_type"] = handle_types.get(handle.lower(), f"Custom handle: @{handle}")
    
    # Try to extract bank name from handle
    bank_map: Dict[str, str] = {
        "okaxis": "Axis Bank",
        "icici": "ICICI Bank",
        "sbi": "State Bank of India",
        "hdfc": "HDFC Bank",
        "paytm": "Paytm Payments Bank",
        "phonepe": "PhonePe Payments Services",
        "googlepay": "Google Payments",
    }
    
    result["bank"] = bank_map.get(handle.lower())
    
    result["valid"] = True
    return result


def validate_vpa_pattern(vpa: str, allowed_handles: list[str] | None = None) -> Dict[str, Any]:
    """Validate VPA against a list of allowed handles."""
    result = validate_upi(vpa)
    if not result["valid"]:
        return result
    
    if allowed_handles:
        handle_lower = result["handle"].lower().replace("@", "")
        if handle_lower not in [h.lower() for h in allowed_handles]:
            result["errors"].append(f"Handle @{handle_lower} not in allowed list")
            result["valid"] = False
    
    return result


# Example usage
if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1:
        vpa = sys.argv[1]
        result = validate_upi(vpa)
        if result["valid"]:
            print(f"✅ Valid UPI VPA")
            print(f"   VPA: {result['vpa']}")
            print(f"   User: {result['user']}")
            print(f"   Handle: {result['handle']}")
            print(f"   Type: {result['handle_type']}")
            if result["bank"]:
                print(f"   Bank: {result['bank']}")
        else:
            print(f"❌ Invalid UPI VPA")
            for error in result["errors"]:
                print(f"   Error: {error}")
    else:
        print("Usage: python -m tools.payments <vpa>")
        print("Example: python -m tools.payments user@okaxis")