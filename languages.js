const langList = {
    // 🇮🇳 India Top 6
    "hi-IN": "Hindi (हिंदी)", "bn-IN": "Bengali (বাংলা)", "mr-IN": "Marathi (मराठी)",
    "te-IN": "Telugu (తెలుగు)", "ta-IN": "Tamil (தமிழ்)", "gu-IN": "Gujarati (ગુજરાતી)",
    // 🌍 World Top 20
    "en-GB": "English (Global)", "es-ES": "Spanish", "fr-FR": "French",
    "ar-SA": "Arabic", "zh-CN": "Chinese", "ru-RU": "Russian", "pt-PT": "Portuguese",
    "de-DE": "German", "ja-JP": "Japanese", "tr-TR": "Turkish", "vi-VN": "Vietnamese",
    "it-IT": "Italian", "fa-IR": "Persian", "pl-PL": "Polish", "uk-UA": "Ukrainian",
    "nl-NL": "Dutch", "th-TH": "Thai", "ko-KR": "Korean", "id-ID": "Indonesian", "pt-BR": "Portuguese (Brazil)"
};

const sourceSelect = document.getElementById('sourceLang');
const targetSelect = document.getElementById('targetLang');

Object.entries(langList).forEach(([code, name]) => {
    sourceSelect.add(new Option(name, code));
    targetSelect.add(new Option(name, code));
});
sourceSelect.value = "hi-IN"; 
targetSelect.value = "en-GB";
