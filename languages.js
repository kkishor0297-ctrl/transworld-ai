// Transworld AI - Supported Languages
// Top 20 World languages, ordered by approximate total number of speakers (highest first)
// Order: English, Mandarin Chinese, Hindi, Spanish, French, Arabic, Bengali,
// Portuguese, Russian, Urdu, Indonesian, German, Japanese, Swahili, Marathi,
// Telugu, Turkish, Tamil, Vietnamese, Korean
//
// Each entry: code (BCP-47 for speech recognition/synthesis), name (display), translateCode (for MyMemory API)

const LANGUAGES_BY_SPEAKERS = [
  { code: "en-US", name: "English",  translateCode: "en" },
  { code: "zh-CN", name: "Mandarin (Chinese)", translateCode: "zh" },
  { code: "hi-IN", name: "Hindi",    translateCode: "hi" },
  { code: "es-ES", name: "Spanish",  translateCode: "es" },
  { code: "fr-FR", name: "French",   translateCode: "fr" },
  { code: "ar-SA", name: "Arabic",   translateCode: "ar" },
  { code: "bn-BD", name: "Bengali",  translateCode: "bn" },
  { code: "pt-PT", name: "Portuguese", translateCode: "pt" },
  { code: "ru-RU", name: "Russian",  translateCode: "ru" },
  { code: "ur-PK", name: "Urdu",     translateCode: "ur" },
  { code: "id-ID", name: "Indonesian", translateCode: "id" },
  { code: "de-DE", name: "German",   translateCode: "de" },
  { code: "ja-JP", name: "Japanese", translateCode: "ja" },
  { code: "sw-KE", name: "Swahili",  translateCode: "sw" },
  { code: "mr-IN", name: "Marathi",  translateCode: "mr" },
  { code: "te-IN", name: "Telugu",   translateCode: "te" },
  { code: "tr-TR", name: "Turkish",  translateCode: "tr" },
  { code: "ta-IN", name: "Tamil",    translateCode: "ta" },
  { code: "vi-VN", name: "Vietnamese", translateCode: "vi" },
  { code: "ko-KR", name: "Korean",   translateCode: "ko" }
];

const UNIQUE_LANGUAGES = LANGUAGES_BY_SPEAKERS;

if (typeof module !== "undefined" && module.exports) {
  module.exports = UNIQUE_LANGUAGES;
}
