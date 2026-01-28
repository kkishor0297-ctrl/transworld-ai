// Populate language dropdowns
const sourceSelect = document.getElementById('sourceLang');
const targetSelect = document.getElementById('targetLang');
languages.forEach(lang => {
    const option1 = document.createElement('option');
    option1.value = lang.code;
    option1.text = lang.name;
    sourceSelect.add(option1);

    const option2 = document.createElement('option');
    option2.value = lang.code;
    option2.text = lang.name;
    targetSelect.add(option2);
});

// Buttons
const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const copyBtn = document.getElementById('copyBtn');
const clearBtn = document.getElementById('clearBtn');
const translateBtn = document.getElementById('translateBtn');
const voiceBtn = document.getElementById('voiceBtn');

// Copy & Clear
copyBtn.addEventListener('click', () => {
    outputText.select();
    document.execCommand('copy');
});

clearBtn.addEventListener('click', () => {
    inputText.value = '';
    outputText.value = '';
});

// Dummy translate function (replace with API later)
translateBtn.addEventListener('click', () => {
    const src = sourceSelect.value;
    const tgt = targetSelect.value;
    const text = inputText.value;
    // API call example: fetch(`/translate?from=${src}&to=${tgt}&text=${text}`)
    outputText.value = `Translated [${src} → ${tgt}]: ${text}`;
});

// Voice recognition
let recognition;
if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
    recognition.lang = sourceSelect.value;
    recognition.continuous = false;

    voiceBtn.addEventListener('click', () => {
        recognition.start();
    });

    recognition.onresult = (event) => {
        inputText.value = event.results[0][0].transcript;
        translateBtn.click();
    };
}
