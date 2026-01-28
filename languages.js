const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi' },
  { code: 'gu', name: 'Gujarati' },
  { code: 'bn', name: 'Bengali' },
  { code: 'ta', name: 'Tamil' },
  { code: 'te', name: 'Telugu' },
  { code: 'ur', name: 'Urdu' },
  { code: 'fr', name: 'French' },
  { code: 'es', name: 'Spanish' },
  { code: 'de', name: 'German' },
  { code: 'ar', name: 'Arabic' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'it', name: 'Italian' },
  { code: 'vi', name: 'Vietnamese' },
  { code: 'tr', name: 'Turkish' },
  { code: 'pa', name: 'Punjabi' },
  { code: 'mr', name: 'Marathi' },
  { code: 'zh', name: 'Chinese' },
  { code: 'fa', name: 'Persian' },
  { code: 'sw', name: 'Swahili' },
  { code: 'nl', name: 'Dutch' },
  { code: 'jv', name: 'Javanese' },
  { code: 'ta', name: 'Tamil' }
];

// Populate input and output dropdowns
const inputLang = document.getElementById('inputLang');
const outputLang = document.getElementById('outputLang');

languages.forEach(lang => {
  const option1 = document.createElement('option');
  option1.value = lang.code;
  option1.textContent = lang.name;
  inputLang.appendChild(option1);

  const option2 = document.createElement('option');
  option2.value = lang.code;
  option2.textContent = lang.name;
  outputLang.appendChild(option2);
});
