import re
import json
import urllib.request
import logging
from typing import Dict, Any, List, Optional
from backend.app.config import (
    GEMINI_API_KEY,
    BRAND_NAME,
    SUPPORT_PHONE,
    SUPPORT_WHATSAPP,
    SUPPORT_EMAIL,
    HEAD_OFFICE_ADDRESS,
    GOOGLE_MAPS_URL,
)

logger = logging.getLogger("ai_chat")

INSTAGRAM_URL = "https://www.instagram.com/jienergies/"
FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61594577424584"
WHATSAPP_URL = f"https://wa.me/{SUPPORT_WHATSAPP}"

ENGLISH_WORDS = {
    "what", "how", "when", "where", "which", "who", "whom", "whose", "why",
    "can", "could", "would", "should", "will", "shall",
    "is", "are", "am", "was", "were", "be", "been", "being",
    "have", "has", "had", "do", "does", "did",
    "the", "this", "that", "these", "those",
    "my", "your", "his", "her", "their", "our", "you", "they", "we", "me",
    "give", "tell", "show", "help", "please", "kind", "assist", "of", "about",
    "for", "with", "from", "need", "want", "like", "much", "many", "price", "cost"
}

# Rich vocabulary of Pakistani Roman Urdu words and colloquialisms
ROMAN_URDU_VOCAB = {
    # Pronouns & address
    "tum", "tu", "aap", "ap", "apka", "aapka", "apki", "aapki", "apke", "aapke", "apne", "aapne",
    "mera", "meri", "mere", "mujhe", "mujh", "hum", "humein", "hamara", "hamari", "hamare",
    "bhai", "janab", "sahab", "yaar", "dost",
    # Question words
    "kya", "kia", "kaise", "kese", "kaisay", "kyun", "kyu", "kahan", "kidhar", "kab", "kitna",
    "kitne", "kitni", "kitnay", "konsa", "kaunsa", "konse", "kaunse", "konsi", "kaunsi",
    "kaun", "kon",
    # Verbs & modals
    "hai", "hain", "he", "hen", "hoga", "hogi", "honge", "hona", "hua", "hue", "hui",
    "karna", "krna", "kar", "kr", "karo", "kro", "karein", "krein", "karta", "karti", "karte",
    "sakte", "sakty", "sakti", "sakta", "stey", "skte", "skta", "skty", "sakain",
    "chahiye", "chahye", "chaye", "mangwana", "bhejo", "dein", "do", "dena", "lena",
    "batao", "btao", "bataiye", "btayein", "batayein", "bataen", "btaen", "poochna", "pouch", "pooch",
    "lagana", "lagwana", "lagayen", "lagayein", "lagwao", "aata", "ata", "aati", "ati",
    "samjhao", "samjh", "samajh", "chalana", "chalega", "chalegi",
    # Prepositions & conjunctions
    "ka", "ke", "ki", "ko", "se", "mein", "par", "pe", "tak",
    "aur", "lekin", "magar", "bhi", "toh", "agr", "agar", "warna",
    "wala", "wali", "wale", "walay",
    # Common conversational words
    "madad", "bijli", "bachat", "tareeqa", "faida", "kharcha", "qeemat", "paisa", "paise",
    "sai", "sahi", "theek", "thik", "acha", "achha", "zaroor", "shukriya", "meherbani",
    "waghera", "wgera", "kuch", "kcuh", "hun", "hoon", "hn"
}

def detect_language(text: str) -> str:
    """Detect if query is primarily English or Pakistani Roman Urdu."""
    lower = text.lower()
    
    # Check for direct multi-word Pakistani Roman Urdu markers
    urdu_phrases = [
        "kia madad", "kya madad", "kr stey", "kar sakte", "kia kar", "kya kar",
        "madad kr", "madad kar", "batao", "btao", "kese ho", "kaise ho",
        "mera bill", "kitna system", "kitne kw", "bijli ka", "bachat", "lagwana",
        "chahiye", "chahye", "apna bill", "kaun ho", "kon ho", "kr stey hun"
    ]
    for p in urdu_phrases:
        if p in lower:
            return "ur"

    words = re.findall(r'\b[a-zA-Z]+\b', lower)
    if not words:
        return "en"

    eng_matches = sum(1 for w in words if w in ENGLISH_WORDS)
    urdu_matches = sum(1 for w in words if w in ROMAN_URDU_VOCAB)

    if urdu_matches > 0 and urdu_matches >= eng_matches:
        return "ur"
    elif eng_matches > urdu_matches:
        return "en"
    elif urdu_matches > 0:
        return "ur"

    return "en"

def extract_bill_amount(text: str) -> Optional[int]:
    """Extract numeric bill amount if present in text (e.g., 50000, 50k, 50,000)."""
    clean = text.lower().replace(",", "")
    k_match = re.search(r'(\d+)\s*k\b', clean)
    if k_match:
        val = int(k_match.group(1)) * 1000
        if 5000 <= val <= 2000000:
            return val
    num_matches = re.findall(r'\b\d{4,7}\b', clean)
    for num in num_matches:
        val = int(num)
        if 5000 <= val <= 2000000:
            return val
    return None

def is_off_topic(text: str) -> bool:
    """Check if query is blatantly out of domain (politics, recipes, movies, etc.)."""
    lower = text.lower()
    
    blatant_off_topics = [
        "cricket", "football", "psl", "ipl", "match score", "recipe", "biryani", "cook", "cooking",
        "prime minister", "president", "politics", "imran khan", "nawaz", "biden", "trump",
        "python code", "write a code", "programming in", "poem", "essay", "movie", "song",
        "actor", "actress", "cinema", "game", "bitcoin", "crypto", "joke", "weather today"
    ]
    for bot in blatant_off_topics:
        if bot in lower:
            return True

    return False

def get_social_channels() -> List[Dict[str, Any]]:
    """Return the official 5 communication channels for J.I ENERGIES."""
    return [
        {
            "name": "Instagram",
            "label": "Instagram",
            "handle": "@jienergies",
            "url": INSTAGRAM_URL,
            "type": "instagram"
        },
        {
            "name": "Facebook",
            "label": "Facebook",
            "handle": "J.I ENERGIES Official",
            "url": FACEBOOK_URL,
            "type": "facebook"
        },
        {
            "name": "WhatsApp",
            "label": "WhatsApp Solar Desk",
            "handle": SUPPORT_PHONE,
            "url": WHATSAPP_URL,
            "type": "whatsapp"
        },
        {
            "name": "Email",
            "label": "Official Email",
            "handle": SUPPORT_EMAIL,
            "url": f"mailto:{SUPPORT_EMAIL}",
            "type": "email"
        },
        {
            "name": "Office",
            "label": "Head Office & Location",
            "handle": HEAD_OFFICE_ADDRESS,
            "url": GOOGLE_MAPS_URL,
            "type": "maps"
        }
    ]

def generate_expert_response(message: str, lang: str) -> Dict[str, Any]:
    """Provide structured, clean human-engineer answers without asterisks."""
    lower = message.lower()
    bill = extract_bill_amount(message)

    # 1. Blatant Off-Topic Guardrail
    if is_off_topic(message):
        if lang == "ur":
            return {
                "reply": (
                    "Main is ke liye madad nahi kar sakta.\n\n"
                    "Main sirf J.I ENERGIES aur solar power solutions ke hawale se aapki rehnumai kar sakta hoon. "
                    "Aap mujh se apne bijli ke bill, solar system packages, Alp Solar products, ya hamari services ke baray mein pooch sakte hain!"
                ),
                "recommendation": None,
                "channels": None,
                "source": "guardrail"
            }
        else:
            return {
                "reply": (
                    "I cannot assist with that.\n\n"
                    "I am exclusively designed to help with J.I ENERGIES solar solutions, hardware specs, and electricity bill savings. "
                    "Please feel free to ask about our solar systems, packages, or services!"
                ),
                "recommendation": None,
                "channels": None,
                "source": "guardrail"
            }

    # 2. Capabilities & Help Intent ("tum meri kya madad kar sakte ho", "what can you do", "help me")
    help_keywords = [
        "madad", "help", "kia kr", "kya kar", "stey", "sakte", "sakty", "what can you do",
        "what kind", "how can you help", "guide", "rehnumai", "kaam kya", "what do you do",
        "who are you", "kaun ho", "kon ho", "capabilities", "features", "taaruf", "services",
        "khidmaat", "introduction", "assist me", "can u help", "can you help"
    ]
    if any(k in lower for k in help_keywords) and not bill:
        if lang == "ur":
            reply = (
                "Hi! 🤖 Main J.I ENERGIES Solar AI Assistant hoon. Main aapki in tamam cheezon mein madad kar sakta hoon:\n\n"
                "• Solar System Sizing & Bachat Calculator: Apna monthly bijli bill batayein (jaise 'mera bill 50,000 hai'), main foran required kW, Alp Solar panels ki taadad aur mahana bachat calculate kar doonga.\n"
                "• Certified Hardware & Specs: Alp Solar South Punjab N-Type TOPCon 585W/610W panels aur Pulse Series Smart Inverters ki technical details aur 30-year warranty.\n"
                "• MEPCO Net Metering: Green meter lagwane ka mukammal tareeqa, sanctioned load, aur phase conversion application support.\n"
                "• Commercial & Industrial Solar: Factories, plazas, aur cold storage ke liye mega-scale solar EPC solutions (Jiaxing LEGO benchmark quality).\n"
                "• Agricultural Solar: Solar tubewell systems aur VFD pumps jo diesel ka kharcha khatam karte hain.\n"
                "• Contact & Free Survey: Multan head office visit, free rooftop site survey, ya WhatsApp par direct engineer se rabta!\n\n"
                "Aap in mein se kis cheez ke baray mein rehnumai chahte hain?"
            )
        else:
            reply = (
                "Hi! 🤖 I am the J.I ENERGIES Solar Solutions Assistant. Here is how I can assist you:\n\n"
                "• Solar Sizing & Savings Calculator: Share your monthly electricity bill (e.g. 'my bill is 50,000') to get instant kW recommendation, panel count, and estimated monthly savings.\n"
                "• Tier-1 Hardware & Specifications: In-depth details on Alp Solar South Punjab N-Type TOPCon 585W/610W modules and Pulse Series Hybrid Inverters with 30-year warranties.\n"
                "• MEPCO Net Metering: Complete Green Meter application guidance, sanctioned load rules, and DISCO liaison.\n"
                "• Commercial, Industrial & Agriculture: Rooftop EPC for factories and commercial buildings, plus Solar Tubewell VFD systems for farms.\n"
                "• Free Site Survey & Contact: Book a free site assessment, visit our Multan head office, or chat directly with a senior solar engineer on WhatsApp!\n\n"
                "What would you like assistance with today?"
            )
        return {"reply": reply, "channels": None, "recommendation": None, "source": "capabilities_kb"}

    # 3. Social Media Accounts & Official Contacts
    social_keywords = ["social", "instagram", "facebook", "insta", "fb", "media", "account", "accounts", "handles", "link", "links"]
    if any(k in lower for k in social_keywords):
        channels = get_social_channels()
        if lang == "ur":
            reply = "Hi! 🤖 J.I ENERGIES ke official social media aur contact channels yeh hain:"
        else:
            reply = "Hi! 🤖 Here are all official social media and communication channels for J.I ENERGIES:"
        return {"reply": reply, "channels": channels, "recommendation": None, "source": "social_kb"}

    # 4. Bill Calculation & Solar Sizing
    if bill or any(k in lower for k in ["kitna system", "system size", "calculate", "sizing"]):
        bill_val = bill if bill else 60000
        units = int(bill_val / 65)
        kw = max(5, round((units / 120) * 2) / 2)
        panel_count = int(kw * 1000 / 585) + 1
        est_cost_min = int(kw * 145000)
        est_cost_max = int(kw * 175000)
        monthly_saving = int(bill_val * 0.9)

        if lang == "ur":
            reply = (
                f"Hi! 🤖 Aapke monthly bill (Rs. {bill_val:,}) ke hisab se hamari engineering assessment yeh hai:\n\n"
                f"Recommended System: {kw} kW Solar Solution\n"
                f"Monthly Consumption: ~{units:,} Units\n"
                f"Estimated Generation: ~{int(kw * 120):,} Units / Month\n"
                f"Solar Panels: {panel_count}x Alp Solar South Punjab 585W N-Type TOPCon Modules\n"
                f"Inverter: {kw}kW Smart On-Grid / Pulse Hybrid Inverter\n"
                f"Expected Monthly Bachat: ~Rs. {monthly_saving:,} / Mahina\n"
                f"Turnkey Budget Range: Rs. {est_cost_min:,} se Rs. {est_cost_max:,} (Complete Structure & Earthing)\n"
                f"Payback Period: ~2.5 se 3 saal (Uske baad 22+ saal free bijli!)\n\n"
                f"Kya aap chahte hain ke hum aapke liye customized proposal generate karein ya site survey schedule karein?"
            )
        else:
            reply = (
                f"Hi! 🤖 Based on your monthly bill of Rs. {bill_val:,}, here is our engineering recommendation:\n\n"
                f"Recommended System: {kw} kW Solar Solution\n"
                f"Monthly Consumption: ~{units:,} Units\n"
                f"Estimated Generation: ~{int(kw * 120):,} Units / Month\n"
                f"Solar Panels: {panel_count}x Alp Solar South Punjab 585W N-Type TOPCon Modules\n"
                f"Inverter: {kw}kW Smart On-Grid / Pulse Hybrid Inverter\n"
                f"Expected Monthly Savings: ~Rs. {monthly_saving:,} / Month\n"
                f"Turnkey Budget Range: Rs. {est_cost_min:,} – Rs. {est_cost_max:,} (Complete EPC & Installation)\n"
                f"Payback Period: ~2.5 to 3 years\n\n"
                f"Would you like our engineering team to prepare a detailed proposal or conduct a free rooftop site survey?"
            )

        return {
            "reply": reply,
            "recommendation": {
                "bill": bill_val,
                "recommended_kw": kw,
                "panel_count": panel_count,
                "monthly_saving": monthly_saving,
                "turnkey_min": est_cost_min,
                "turnkey_max": est_cost_max
            },
            "channels": None,
            "source": "calculator_engine"
        }

    # 5. Alp Solar South Punjab & The LEGO Group Strategic Partnership
    if any(k in lower for k in ["alp", "lego", "partner", "partners", "partnership", "south punjab", "jiaxing"]):
        if lang == "ur":
            reply = (
                "Hi! 🤖 J.I ENERGIES ki strategic international partnerships ki details yeh hain:\n\n"
                "• Alp Solar South Punjab: Hamare certified technology partner jo factory-certified Tier-1 N-Type TOPCon 585W/610W panels aur Pulse Series Smart Hybrid Inverters supply karte hain (30-year linear performance warranty ke sath).\n"
                "• The LEGO Group Jiaxing Factory Project: Landmark global industrial benchmark project jahan 20,000 solar panels (5+ football grounds barabar) se salana 6 GWh clean electricity generate hoti hai aur 4,000+ tonnes CO2 kam hoti hai.\n\n"
                "Isi mega-scale industrial standard ki engineering quality hum Pakistan ke har residential aur commercial project par deliver karte hain!"
            )
        else:
            reply = (
                "Hi! 🤖 Here are details on our strategic international alliances:\n\n"
                "• Alp Solar South Punjab: Our certified technology partner supplying Tier-1 N-Type TOPCon 585W/610W modules and Pulse Series Smart Hybrid Inverters with 30-year performance warranties.\n"
                "• The LEGO Group Jiaxing Factory Installation: A benchmark mega-industrial project featuring 20,000 rooftop solar panels generating 6 GWh/year and offsetting 4,000+ tonnes of CO2.\n\n"
                "J.I ENERGIES brings these proven international engineering standards to every project in Pakistan."
            )
        return {"reply": reply, "recommendation": None, "channels": None, "source": "partnership_kb"}

    # 6. Hardware & Product Specs (Panels, Inverters, Batteries, Mounting)
    if any(k in lower for k in ["product", "products", "panel", "plate", "inverter", "battery", "batteries", "lifepo4", "topcon", "585w", "610w", "hybrid", "on-grid", "structure"]):
        if lang == "ur":
            reply = (
                "Hi! 🤖 J.I ENERGIES ke certified solar hardware products yeh hain:\n\n"
                "• Solar Panels: Alp Solar South Punjab N-Type TOPCon 585W & 610W Bifacial (22.8% cell efficiency, 30-year linear performance warranty)\n"
                "• Hybrid Inverters: Pulse Series Smart Hybrid Inverters (5kW, 10kW, 15kW, 20kW, 25kW) with sub-10ms UPS transfer\n"
                "• Battery Storage: High-discharge LiFePO4 Lithium Iron Phosphate Battery packs (6,000+ lifecycle cycles)\n"
                "• Mounting Structures: Galvanized heavy-gauge elevated and rooftop structures with complete DC/AC lightning earthing\n\n"
                "Tamam hardware factory-certified serial registration aur local warranty support ke sath aata hai!"
            )
        else:
            reply = (
                "Hi! 🤖 Here are the certified solar hardware products provided by J.I ENERGIES:\n\n"
                "• Solar Panels: Alp Solar South Punjab N-Type TOPCon 585W & 610W Bifacial Modules (22.8% cell efficiency, 30-year linear warranty)\n"
                "• Smart Inverters: Pulse Series Hybrid Inverters (5kW to 25kW) with sub-10ms UPS backup switching\n"
                "• Lithium Batteries: High-discharge LiFePO4 Lithium energy storage packs with 6,000+ lifecycles\n"
                "• Structural Framing: Heavy-gauge hot-dipped galvanized structures engineered for high wind loads\n\n"
                "Every component is backed by official local warranty support and flash-test verification."
            )
        return {"reply": reply, "recommendation": None, "channels": None, "source": "products_kb"}

    # 7. MEPCO Net Metering (Green Meter)
    if any(k in lower for k in ["net meter", "green meter", "mepco", "nepra", "wapda", "phase"]):
        if lang == "ur":
            reply = (
                "Hi! 🤖 MEPCO Net Metering (Green Meter) ka mukammal tareeqa yeh hai:\n\n"
                "1. 3-Phase Meter Requirement: Net metering ke liye three-phase electricity connection lazmi hai (Phase conversion application hum manage karte hain).\n"
                "2. Engineering Filing: J.I ENERGIES single-line diagram, sanctioned load verification, aur DISCO paperwork file karta hai.\n"
                "3. MEPCO Inspection & Commissioning: Physical site verification aur bi-directional green meter installation.\n"
                "4. Timeline: Commissioning se green meter activate hone tak aam tor par 30 se 45 business days lagte hain.\n\n"
                "J.I ENERGIES end-to-end liaison handle karta hai taake aapko kisi daftari pareshani ka samna na karna pare!"
            )
        else:
            reply = (
                "Hi! 🤖 Here is how the MEPCO Net Metering (Green Meter) process works:\n\n"
                "1. Three-Phase Requirement: A 3-phase meter connection is mandatory under NEPRA regulations. We assist with phase upgrades if needed.\n"
                "2. Technical Application: J.I ENERGIES prepares certified single-line diagrams, sanctioned load checks, and files directly with MEPCO.\n"
                "3. Inspection & Metering: Following DISCO inspection, the bi-directional Green Meter is installed.\n"
                "4. Duration: Typically takes 30 to 45 business days.\n\n"
                "We provide full turnkey liaison from initial filing to final activation."
            )
        return {"reply": reply, "recommendation": None, "channels": None, "source": "net_metering_kb"}

    # 8. AC & Heavy Home Load Sizing ("1.5 ton AC chalane ke liye")
    if any(k in lower for k in ["ac", "air conditioner", "ton", "fridge", "motor", "chalana", "chalane"]):
        if lang == "ur":
            reply = (
                "Hi! 🤖 Air Conditioner aur heavy home appliances solar par chalane ke liye recommended sizing yeh hai:\n\n"
                "• 1x Inverter AC (1.5 Ton) + Basic Home Load: 5 kW Solar System (Din ke waqt direct solar par chalega)\n"
                "• 2x Inverter ACs (1.5 Ton) + Fridge + Fans: 7.5 kW – 10 kW Solar System\n"
                "• 3x Inverter ACs + Water Motor + Full Home: 12 kW – 15 kW Hybrid Solar System\n\n"
                "Note: Inverter ACs din ke waqt solar generation se zero-bill par chalte hain. Raat ko chalane ke liye MEPCO Net Metering ya LiFePO4 Lithium battery zaroori hoti hai!"
            )
        else:
            reply = (
                "Hi! 🤖 Sizing guidelines for running Air Conditioners on solar:\n\n"
                "• 1x Inverter AC (1.5 Ton) + Essential Home Appliances: 5 kW Solar System\n"
                "• 2x Inverter ACs (1.5 Ton) + Full House: 7.5 kW to 10 kW System\n"
                "• 3x Inverter ACs + Water Pumps: 12 kW to 15 kW Hybrid System\n\n"
                "Inverter ACs run seamlessly during daytime peak solar hours. For night operation, MEPCO Net Metering export credits or LiFePO4 batteries are utilized."
            )
        return {"reply": reply, "recommendation": None, "channels": None, "source": "ac_sizing_kb"}

    # 9. Agriculture & Solar Tubewells
    if any(k in lower for k in ["tubewell", "tube well", "kisan", "agriculture", "zaraat", "vfd", "solar pump"]):
        if lang == "ur":
            reply = (
                "Hi! 🤖 J.I ENERGIES Solar Tubewell Solutions ki details yeh hain:\n\n"
                "• High-Power VFD Inverters: Heavy-duty Variable Frequency Drives jo 15HP se 50HP tak ke tubewell pumps ko bina kisi jhatkay ke chalate hain.\n"
                "• High-Yield N-Type Panels: Subah se shaam tak maximum pani discharge ke liye Alp Solar 585W TOPCon modules.\n"
                "• Diesel Bachat: Diesel generator ka mehanga kharcha foran 100% khatam ho jata hai.\n"
                "• Payback Period: Mehangay diesel ke muqabilay mein solar tubewell 1.5 se 2 saal mein apna pura kharcha nikal leta hai!\n\n"
                "Apne motor ka Horsepower (HP) batayein, hum mukammal quotation bana dein gay."
            )
        else:
            reply = (
                "Hi! 🤖 J.I ENERGIES Agricultural Solar Tubewell Solutions:\n\n"
                "• High-Power VFD Drives: Automated VFD inverters engineered to run 15HP to 50HP agricultural tubewells smoothly.\n"
                "• N-Type Solar Arrays: High-output Alp Solar 585W modules ensuring high water discharge from morning till dusk.\n"
                "• 100% Diesel Elimination: Completely replaces expensive diesel operation.\n"
                "• Rapid Payback: Achieves complete ROI within 1.5 to 2 years.\n\n"
                "Share your tubewell HP rating for a custom quotation!"
            )
        return {"reply": reply, "recommendation": None, "channels": None, "source": "tubewell_kb"}

    # 10. Financing & Bank Installment Plans
    if any(k in lower for k in ["financing", "bank", "installment", "installments", "qist", "qiston", "loan", "meezan", "alfalah"]):
        if lang == "ur":
            reply = (
                "Hi! 🤖 Solar Bank Financing aur Installment Plans ki maloomat:\n\n"
                "• SBP Green Energy Refinance Scheme: State Bank of Pakistan ki concessional markup scheme ke tehat commercial aur residential financing.\n"
                "• Islamic Banking Partners: Meezan Bank, Bank Alfalah, aur Faysal Bank ke sath 1 se 5 saal ki asan mahana qiston par solar lagwayein.\n"
                "• Documentation Support: J.I ENERGIES technical feasibility, bill of quantity (BOQ), aur bank verification process mukammal handle karta hai!\n\n"
                "Mazeed rehnumai ke liye hamare WhatsApp desk par rabta karein."
            )
        else:
            reply = (
                "Hi! 🤖 Solar Bank Financing & Installment Options:\n\n"
                "• SBP Green Refinance Scheme: Concessional financing schemes facilitated via leading Pakistani commercial banks.\n"
                "• Islamic Banking Facilities: Available through Meezan Bank, Bank Alfalah, and Faysal Bank with 1 to 5-year repayment tenures.\n"
                "• Turnkey Liaison: J.I ENERGIES prepares certified engineering designs and technical feasibility dossiers for smooth bank approvals.\n\n"
                "Contact our WhatsApp desk to initiate bank paperwork."
            )
        return {"reply": reply, "recommendation": None, "channels": None, "source": "financing_kb"}

    # 11. Cost / Price / Per Watt Rate
    if any(k in lower for k in ["price", "cost", "qeemat", "rate", "kharcha", "budget", "per watt"]):
        if lang == "ur":
            reply = (
                "Hi! 🤖 J.I ENERGIES ke current realistic solar packages yeh hain:\n\n"
                "• 5 kW Solution: Approx. Rs. 7.5 – 8.5 Lakh (Turnkey with structure, earthing, installation)\n"
                "• 10 kW Solution: Approx. Rs. 14.5 – 16.5 Lakh (Ideal for full house with 2-3 ACs)\n"
                "• 15 kW Solution: Approx. Rs. 21 – 24 Lakh (Large home / commercial with net metering)\n"
                "• 20 kW+ Commercial: Custom industrial rates per watt with Tier-1 Alp Solar N-Type panels\n\n"
                "Tamam systems mein Tier-1 N-Type TOPCon panels aur factory-certified inverters shamil hain!"
            )
        else:
            reply = (
                "Hi! 🤖 Current turnkey solar solution pricing estimates:\n\n"
                "• 5 kW Solution: ~Rs. 7.5 – 8.5 Lakh (Complete EPC, heavy-gauge framing, installation)\n"
                "• 10 kW Solution: ~Rs. 14.5 – 16.5 Lakh (Full house with multiple ACs & net metering)\n"
                "• 15 kW Solution: ~Rs. 21 – 24 Lakh (Large residential / light commercial)\n"
                "• 20 kW+ Mega Solar: Tailored commercial pricing with Tier-1 Alp Solar N-Type modules\n\n"
                "All packages feature genuine Tier-1 hardware with 30-year performance warranties."
            )
        return {"reply": reply, "recommendation": None, "channels": None, "source": "pricing_kb"}

    # 12. Office Location & Direct Contact
    if any(k in lower for k in ["contact", "phone", "office", "address", "kahan", "multan", "email", "location", "rabta"]):
        channels = get_social_channels()
        if lang == "ur":
            reply = (
                "Hi! 🤖 J.I ENERGIES Multan team se direct rabta karne ke details yeh hain:\n\n"
                f"• Head Office: {HEAD_OFFICE_ADDRESS}\n"
                f"• WhatsApp & Phone: {SUPPORT_PHONE}\n"
                f"• Official Email: {SUPPORT_EMAIL}\n"
                f"• Working Hours: Monday – Saturday (9:00 AM – 6:00 PM PKT)\n\n"
                "Hamare engineer se baat karne ya office visit ke liye neeche diye gaye links use karein:"
            )
        else:
            reply = (
                "Hi! 🤖 Here are our official contact details:\n\n"
                f"• Head Office: {HEAD_OFFICE_ADDRESS}\n"
                f"• Phone & WhatsApp: {SUPPORT_PHONE}\n"
                f"• Official Email: {SUPPORT_EMAIL}\n"
                f"• Working Hours: Monday – Saturday (9:00 AM – 6:00 PM PKT)\n\n"
                "Feel free to click any of our official channels below:"
            )
        return {"reply": reply, "channels": channels, "recommendation": None, "source": "contact_kb"}

    # 13. General Greeting / Solar Assistance Fallback
    if lang == "ur":
        reply = (
            "Hi! 🤖 Main J.I ENERGIES Solar AI Assistant hoon.\n\n"
            "Main aapki in cheezon mein rehnumai kar sakta hoon:\n"
            "• Solar System Sizing: Apna monthly bijli bill batayein, main foran required kW aur mahana bachat calculate kar doonga.\n"
            "• Certified Products: Alp Solar South Punjab N-Type 585W panels aur inverters ki specs.\n"
            "• MEPCO Net Metering: Green meter lagwane ka procedure aur application filing.\n"
            "• Social & Contacts: Hamare official social media accounts aur Multan office address.\n\n"
            "Aap kya poochna chahenge?"
        )
    else:
        reply = (
            "Hi! 🤖 I am the J.I ENERGIES Solar Solutions Assistant.\n\n"
            "I can assist you with:\n"
            "• Solar Sizing & ROI: Tell me your monthly electricity bill to calculate the ideal system size and savings.\n"
            "• Hardware Specifications: Alp Solar South Punjab N-Type 585W modules and smart inverters.\n"
            "• Net Metering: Complete MEPCO green meter requirements and paperwork liaison.\n"
            "• Social & Office: Official social media channels and Multan office contact.\n\n"
            "How can I assist you today?"
        )

    return {"reply": reply, "recommendation": None, "channels": None, "source": "general_kb"}

def process_chat_message(message: str, history: List[Dict[str, str]] = None) -> Dict[str, Any]:
    """Main entrypoint for chat processing with fast accurate routing."""
    lang = detect_language(message)
    return generate_expert_response(message, lang)
