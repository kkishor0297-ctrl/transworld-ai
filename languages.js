const langList = {
    // 🇮🇳 India Top 6
    "hi-IN": "Hindi (हिंदी)",
    "bn-IN": "Bengali (বাংলা)",
    "mr-IN": "Marathi (मराठी)",
    "te-IN": "Telugu (తెలుగు)",
    "ta-IN": "Tamil (தமிழ்)",
    "gu-IN": "Gujarati (ગુજરાતી)",
    // 🌍 World Top 20
    "en-GB": "English (UK)",
    "es-ES": "Spanish (Español)",
    "fr-FR": "French (Français)",
    "ar-SA": "Arabic (العربية)",
    "zh-CN": "Chinese (Mandarin)",
    "ru-RU": "Russian (Русский)",
    "pt-PT": "Portuguese (Português)",
    "de-DE": "German (Deutsch)",
    "ja-JP": "Japanese (日本語)",
    "tr-TR": "Turkish (Türkçe)",
    "vi-VN": "Vietnamese",
    "it-IT": "Italiano",
    "fa-IR": "Persian",
    "pl-PL": "Polish",
    "uk-UA": "Ukrainian",
    "nl-NL": "Dutch",
    "th-TH": "Thai",
    "ko-KR": "Korean (한국어)",
    "id-ID": "Indonesian",
    "pt-BR": "Portuguese (Brazil)"
};

const sourceSelect = document.getElementById('sourceLang');
const targetSelect = document.getElementById('targetLang');

function fillLanguages() {
    Object.entries(langList).forEach(([code, name]) => {
        sourceSelect.add(new Option(name, code));
        targetSelect.add(new Option(name, code));
    });
    // डिफ़ॉल्ट भाषा सेट करें
    sourceSelect.value = "hi-IN"; 
    targetSelect.value = "en-GB";
}
fillLanguages();
