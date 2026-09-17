import { NextResponse } from "next/server";
import { SITE_CONFIG } from "@/lib/constants";

const ENGLISH_WORDS = new Set([
  "what", "how", "when", "where", "which", "who", "whom", "whose", "why",
  "can", "could", "would", "should", "will", "shall",
  "is", "are", "am", "was", "were", "be", "been", "being",
  "have", "has", "had", "do", "does", "did",
  "the", "this", "that", "these", "those",
  "my", "your", "his", "her", "their", "our", "you", "they", "we", "me",
  "give", "tell", "show", "help", "please", "kind", "assist", "of", "about",
  "for", "with", "from", "need", "want", "like", "much", "many", "price", "cost"
]);

const ROMAN_URDU_WORDS = new Set([
  "tum", "tu", "aap", "ap", "apka", "aapka", "apki", "aapki", "apke", "aapke", "apne", "aapne",
  "mera", "meri", "mere", "mujhe", "mujh", "hum", "humein", "hamara", "hamari", "hamare",
  "bhai", "janab", "sahab", "yaar", "dost",
  "kya", "kia", "kaise", "kese", "kaisay", "kyun", "kyu", "kahan", "kidhar", "kab", "kitna",
  "kitne", "kitni", "kitnay", "konsa", "kaunsa", "konse", "kaunse", "konsi", "kaunsi",
  "kaun", "kon",
  "hai", "hain", "he", "hen", "hoga", "hogi", "honge", "hona", "hua", "hue", "hui",
  "karna", "krna", "kar", "kr", "karo", "kro", "karein", "krein", "karta", "karti", "karte",
  "sakte", "sakty", "sakti", "sakta", "stey", "skte", "skta", "skty", "sakain",
  "chahiye", "chahye", "chaye", "mangwana", "bhejo", "dein", "do", "dena", "lena",
  "batao", "btao", "bataiye", "btayein", "batayein", "bataen", "btaen", "poochna", "pouch", "pooch",
  "lagana", "lagwana", "lagayen", "lagayein", "lagwao", "aata", "ata", "aati", "ati",
  "samjhao", "samjh", "samajh", "chalana", "chalega", "chalegi",
  "ka", "ke", "ki", "ko", "se", "mein", "par", "pe", "tak",
  "aur", "lekin", "magar", "bhi", "toh", "agr", "agar", "warna",
  "wala", "wali", "wale", "walay",
  "madad", "bijli", "bachat", "tareeqa", "faida", "kharcha", "qeemat", "paisa", "paise",
  "sai", "sahi", "theek", "thik", "acha", "achha", "zaroor", "shukriya", "meherbani",
  "waghera", "wgera", "kuch", "kcuh", "hun", "hoon", "hn"
]);

function detectLanguage(text: string): "ur" | "en" {
  const lower = text.toLowerCase();
  const urduPhrases = [
    "kia madad", "kya madad", "kr stey", "kar sakte", "kia kar", "kya kar",
    "madad kr", "madad kar", "batao", "btao", "kese ho", "kaise ho",
    "mera bill", "kitna system", "kitne kw", "bijli ka", "bachat", "lagwana",
    "chahiye", "chahye", "apna bill", "kaun ho", "kon ho", "kr stey hun"
  ];
  for (const p of urduPhrases) {
    if (lower.includes(p)) return "ur";
  }

  const words = lower.match(/\b[a-z]+\b/g) || [];
  if (words.length === 0) return "en";

  let engMatches = 0;
  let urduMatches = 0;
  for (const w of words) {
    if (ENGLISH_WORDS.has(w)) engMatches++;
    if (ROMAN_URDU_WORDS.has(w)) urduMatches++;
  }

  if (urduMatches > 0 && urduMatches >= engMatches) return "ur";
  if (engMatches > urduMatches) return "en";
  if (urduMatches > 0) return "ur";
  return "en";
}

function extractBillAmount(text: string): number | null {
  const clean = text.toLowerCase().replace(/,/g, "");
  const kMatch = clean.match(/(\d+)\s*k\b/);
  if (kMatch) {
    const val = parseInt(kMatch[1], 10) * 1000;
    if (val >= 5000 && val <= 2000000) return val;
  }
  const numMatches = clean.match(/\b\d{4,7}\b/g);
  if (numMatches) {
    for (const n of numMatches) {
      const val = parseInt(n, 10);
      if (val >= 5000 && val <= 2000000) return val;
    }
  }
  return null;
}

function isOffTopic(text: string): boolean {
  const lower = text.toLowerCase();
  const blatant = [
    "cricket", "football", "psl", "ipl", "match score", "recipe", "biryani", "cook", "cooking",
    "prime minister", "president", "politics", "imran khan", "nawaz", "biden", "trump",
    "python code", "write a code", "programming in", "poem", "essay", "movie", "song",
    "actor", "actress", "cinema", "game", "bitcoin", "crypto", "joke", "weather today"
  ];
  return blatant.some((term) => lower.includes(term));
}

function getSocialChannels() {
  return [
    {
      name: "Instagram",
      label: "Instagram",
      handle: "@jienergies",
      url: SITE_CONFIG.social.instagram,
      type: "instagram",
    },
    {
      name: "Facebook",
      label: "Facebook",
      handle: "J.I ENERGIES Official",
      url: SITE_CONFIG.social.facebook,
      type: "facebook",
    },
    {
      name: "WhatsApp",
      label: "WhatsApp Solar Desk",
      handle: "+92 302 3333499",
      url: SITE_CONFIG.social.whatsapp,
      type: "whatsapp",
    },
    {
      name: "Email",
      label: "Official Email",
      handle: SITE_CONFIG.email,
      url: `mailto:${SITE_CONFIG.email}`,
      type: "email",
    },
    {
      name: "Office",
      label: "Head Office & Location",
      handle: "MA Jinnah Road, Multan, Pakistan",
      url: SITE_CONFIG.maps.multan,
      type: "maps",
    },
  ];
}

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const lang = detectLanguage(message);
    const lower = message.toLowerCase();
    const bill = extractBillAmount(message);

    // 1. Off-Topic Refusal
    if (isOffTopic(message)) {
      const reply =
        lang === "ur"
          ? "Main is ke liye madad nahi kar sakta.\n\nMain sirf J.I ENERGIES aur solar power solutions ke hawale se aapki rehnumai kar sakta hoon. Aap mujh se apne bijli ke bill, solar system packages, Alp Solar products, ya hamari services ke baray mein pooch sakte hain!"
          : "I cannot assist with that.\n\nI am exclusively designed to help with J.I ENERGIES solar solutions, hardware specs, and electricity bill savings. Please feel free to ask about our solar systems, packages, or services!";
      return NextResponse.json({ reply, channels: null, recommendation: null, source: "guardrail" });
    }

    // 2. Capabilities & Help Intent
    const helpKeywords = [
      "madad", "help", "kia kr", "kya kar", "stey", "sakte", "sakty", "what can you do",
      "what kind", "how can you help", "guide", "rehnumai", "kaam kya", "what do you do",
      "who are you", "kaun ho", "kon ho", "capabilities", "features", "taaruf", "services",
      "khidmaat", "introduction", "assist me", "can u help", "can you help"
    ];
    if (helpKeywords.some((k) => lower.includes(k)) && !bill) {
      const reply =
        lang === "ur"
          ? "Hi! 🤖 Main J.I ENERGIES Solar AI Assistant hoon. Main aapki in tamam cheezon mein madad kar sakta hoon:\n\n• Solar System Sizing & Bachat Calculator: Apna monthly bijli bill batayein (jaise 'mera bill 50,000 hai'), main foran required kW, Alp Solar panels ki taadad aur mahana bachat calculate kar doonga.\n• Certified Hardware & Specs: Alp Solar South Punjab N-Type TOPCon 585W/610W panels aur Pulse Series Smart Inverters ki technical details aur 30-year warranty.\n• MEPCO Net Metering: Green meter lagwane ka mukammal tareeqa, sanctioned load, aur phase conversion application support.\n• Commercial & Industrial Solar: Factories, plazas, aur cold storage ke liye mega-scale solar EPC solutions (Jiaxing LEGO benchmark quality).\n• Agricultural Solar: Solar tubewell systems aur VFD pumps jo diesel ka kharcha khatam karte hain.\n• Contact & Free Survey: Multan head office visit, free rooftop site survey, ya WhatsApp par direct engineer se rabta!\n\nAap in mein se kis cheez ke baray mein rehnumai chahte hain?"
          : "Hi! 🤖 I am the J.I ENERGIES Solar Solutions Assistant. Here is how I can assist you:\n\n• Solar Sizing & Savings Calculator: Share your monthly electricity bill (e.g. 'my bill is 50,000') to get instant kW recommendation, panel count, and estimated monthly savings.\n• Tier-1 Hardware & Specifications: In-depth details on Alp Solar South Punjab N-Type TOPCon 585W/610W modules and Pulse Series Hybrid Inverters with 30-year warranties.\n• MEPCO Net Metering: Complete Green Meter application guidance, sanctioned load rules, and DISCO liaison.\n• Commercial, Industrial & Agriculture: Rooftop EPC for factories and commercial buildings, plus Solar Tubewell VFD systems for farms.\n• Free Site Survey & Contact: Book a free site assessment, visit our Multan head office, or chat directly with a senior solar engineer on WhatsApp!\n\nWhat would you like assistance with today?";
      return NextResponse.json({ reply, channels: null, recommendation: null, source: "capabilities_kb" });
    }

    // 3. Social Media Accounts & Contacts
    const socialKeywords = ["social", "instagram", "facebook", "insta", "fb", "media", "account", "accounts", "handles", "link", "links"];
    if (socialKeywords.some((k) => lower.includes(k))) {
      const channels = getSocialChannels();
      const reply =
        lang === "ur"
          ? "Hi! 🤖 J.I ENERGIES ke official social media aur contact channels yeh hain:"
          : "Hi! 🤖 Here are all official social media and communication channels for J.I ENERGIES:";
      return NextResponse.json({ reply, channels, recommendation: null, source: "social_kb" });
    }

    // 4. Bill Calculation & Solar Sizing
    if (bill || ["kitna system", "system size", "calculate", "sizing"].some((k) => lower.includes(k))) {
      const billVal = bill || 60000;
      const units = Math.floor(billVal / 65);
      const kw = Math.max(5, Math.round((units / 120) * 2) / 2);
      const panelCount = Math.floor((kw * 1000) / 585) + 1;
      const estCostMin = Math.floor(kw * 145000);
      const estCostMax = Math.floor(kw * 175000);
      const monthlySaving = Math.floor(billVal * 0.9);

      const reply =
        lang === "ur"
          ? `Hi! 🤖 Aapke monthly bill (Rs. ${billVal.toLocaleString()}) ke hisab se hamari engineering assessment yeh hai:\n\nRecommended System: ${kw} kW Solar Solution\nMonthly Consumption: ~${units.toLocaleString()} Units\nEstimated Generation: ~${Math.floor(kw * 120).toLocaleString()} Units / Month\nSolar Panels: ${panelCount}x Alp Solar South Punjab 585W N-Type TOPCon Modules\nInverter: ${kw}kW Smart On-Grid / Pulse Hybrid Inverter\nExpected Monthly Bachat: ~Rs. ${monthlySaving.toLocaleString()} / Mahina\nTurnkey Budget Range: Rs. ${estCostMin.toLocaleString()} se Rs. ${estCostMax.toLocaleString()} (Complete Structure & Earthing)\nPayback Period: ~2.5 se 3 saal (Uske baad 22+ saal free bijli!)\n\nKya aap chahte hain ke hum aapke liye customized proposal generate karein ya site survey schedule karein?`
          : `Hi! 🤖 Based on your monthly bill of Rs. ${billVal.toLocaleString()}, here is our engineering recommendation:\n\nRecommended System: ${kw} kW Solar Solution\nMonthly Consumption: ~${units.toLocaleString()} Units\nEstimated Generation: ~${Math.floor(kw * 120).toLocaleString()} Units / Month\nSolar Panels: ${panelCount}x Alp Solar South Punjab 585W N-Type TOPCon Modules\nInverter: ${kw}kW Smart On-Grid / Pulse Hybrid Inverter\nExpected Monthly Savings: ~Rs. ${monthlySaving.toLocaleString()} / Month\nTurnkey Budget Range: Rs. ${estCostMin.toLocaleString()} – Rs. ${estCostMax.toLocaleString()} (Complete EPC & Installation)\nPayback Period: ~2.5 to 3 years\n\nWould you like our engineering team to prepare a detailed proposal or conduct a free rooftop site survey?`;

      return NextResponse.json({
        reply,
        recommendation: {
          bill: billVal,
          recommended_kw: kw,
          panel_count: panelCount,
          monthly_saving: monthlySaving,
          turnkey_min: estCostMin,
          turnkey_max: estCostMax,
        },
        channels: null,
        source: "calculator_engine",
      });
    }

    // 5. Alp Solar South Punjab & The LEGO Group Partnership
    if (["alp", "lego", "partner", "partners", "partnership", "south punjab", "jiaxing"].some((k) => lower.includes(k))) {
      const reply =
        lang === "ur"
          ? "Hi! 🤖 J.I ENERGIES ki strategic international partnerships ki details yeh hain:\n\n• Alp Solar South Punjab: Hamare certified technology partner jo factory-certified Tier-1 N-Type TOPCon 585W/610W panels aur Pulse Series Smart Hybrid Inverters supply karte hain (30-year linear performance warranty ke sath).\n• The LEGO Group Jiaxing Factory Project: Landmark global industrial benchmark project jahan 20,000 solar panels (5+ football grounds barabar) se salana 6 GWh clean electricity generate hoti hai aur 4,000+ tonnes CO2 kam hoti hai.\n\nIsi mega-scale industrial standard ki engineering quality hum Pakistan ke har residential aur commercial project par deliver karte hain!"
          : "Hi! 🤖 Here are details on our strategic international alliances:\n\n• Alp Solar South Punjab: Our certified technology partner supplying Tier-1 N-Type TOPCon 585W/610W modules and Pulse Series Smart Hybrid Inverters with 30-year performance warranties.\n• The LEGO Group Jiaxing Factory Installation: A benchmark mega-industrial project featuring 20,000 rooftop solar panels generating 6 GWh/year and offsetting 4,000+ tonnes of CO2.\n\nJ.I ENERGIES brings these proven international engineering standards to every project in Pakistan.";
      return NextResponse.json({ reply, recommendation: null, channels: null, source: "partnership_kb" });
    }

    // 6. Hardware & Product Specs
    if (["product", "products", "panel", "plate", "inverter", "battery", "batteries", "lifepo4", "topcon", "585w", "610w", "hybrid", "on-grid", "structure"].some((k) => lower.includes(k))) {
      const reply =
        lang === "ur"
          ? "Hi! 🤖 J.I ENERGIES ke certified solar hardware products yeh hain:\n\n• Solar Panels: Alp Solar South Punjab N-Type TOPCon 585W & 610W Bifacial (22.8% cell efficiency, 30-year linear performance warranty)\n• Hybrid Inverters: Pulse Series Smart Hybrid Inverters (5kW, 10kW, 15kW, 20kW, 25kW) with sub-10ms UPS transfer\n• Battery Storage: High-discharge LiFePO4 Lithium Iron Phosphate Battery packs (6,000+ lifecycle cycles)\n• Mounting Structures: Galvanized heavy-gauge elevated and rooftop structures with complete DC/AC lightning earthing\n\nTamam hardware factory-certified serial registration aur local warranty support ke sath aata hai!"
          : "Hi! 🤖 Here are the certified solar hardware products provided by J.I ENERGIES:\n\n• Solar Panels: Alp Solar South Punjab N-Type TOPCon 585W & 610W Bifacial Modules (22.8% cell efficiency, 30-year linear warranty)\n• Smart Inverters: Pulse Series Hybrid Inverters (5kW to 25kW) with sub-10ms UPS backup switching\n• Lithium Batteries: High-discharge LiFePO4 Lithium energy storage packs with 6,000+ lifecycles\n• Structural Framing: Heavy-gauge hot-dipped galvanized structures engineered for high wind loads\n\nEvery component is backed by official local warranty support and flash-test verification.";
      return NextResponse.json({ reply, recommendation: null, channels: null, source: "products_kb" });
    }

    // 7. Net Metering
    if (["net meter", "green meter", "mepco", "nepra", "wapda", "phase"].some((k) => lower.includes(k))) {
      const reply =
        lang === "ur"
          ? "Hi! 🤖 MEPCO Net Metering (Green Meter) ka mukammal tareeqa yeh hai:\n\n1. 3-Phase Meter Requirement: Net metering ke liye three-phase electricity connection lazmi hai (Phase conversion application hum manage karte hain).\n2. Engineering Filing: J.I ENERGIES single-line diagram, sanctioned load verification, aur DISCO paperwork file karta hai.\n3. MEPCO Inspection & Commissioning: Physical site verification aur bi-directional green meter installation.\n4. Timeline: Commissioning se green meter activate hone tak aam tor par 30 se 45 business days lagte hain.\n\nJ.I ENERGIES end-to-end liaison handle karta hai taake aapko kisi daftari pareshani ka samna na karna pare!"
          : "Hi! 🤖 Here is how the MEPCO Net Metering (Green Meter) process works:\n\n1. Three-Phase Requirement: A 3-phase meter connection is mandatory under NEPRA regulations. We assist with phase upgrades if needed.\n2. Technical Application: J.I ENERGIES prepares certified single-line diagrams, sanctioned load checks, and files directly with MEPCO.\n3. Inspection & Metering: Following DISCO inspection, the bi-directional Green Meter is installed.\n4. Duration: Typically takes 30 to 45 business days.\n\nWe provide full turnkey liaison from initial filing to final activation.";
      return NextResponse.json({ reply, recommendation: null, channels: null, source: "net_metering_kb" });
    }

    // 8. General Greeting / Fallback
    const reply =
      lang === "ur"
        ? "Hi! 🤖 Main J.I ENERGIES Solar AI Assistant hoon.\n\nMain aapki in cheezon mein rehnumai kar sakta hoon:\n• Solar System Sizing: Apna monthly bijli bill batayein, main foran required kW aur mahana bachat calculate kar doonga.\n• Certified Products: Alp Solar South Punjab N-Type 585W panels aur inverters ki specs.\n• MEPCO Net Metering: Green meter lagwane ka procedure aur application filing.\n• Social & Contacts: Hamare official social media accounts aur Multan office address.\n\nAap kya poochna chahenge?"
        : "Hi! 🤖 I am the J.I ENERGIES Solar Solutions Assistant.\n\nI can assist you with:\n• Solar Sizing & ROI: Tell me your monthly electricity bill to calculate the ideal system size and savings.\n• Hardware Specifications: Alp Solar South Punjab N-Type 585W modules and smart inverters.\n• Net Metering: Complete MEPCO green meter requirements and paperwork liaison.\n• Social & Office: Official social media channels and Multan office contact.\n\nHow can I assist you today?";

    return NextResponse.json({ reply, recommendation: null, channels: null, source: "general_kb" });
  } catch (err: any) {
    console.error("Next.js Chat API error:", err);
    return NextResponse.json({ error: err.message || "Chat processing failed" }, { status: 500 });
  }
}
