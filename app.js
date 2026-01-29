// app.js
const inputText = document.querySelector('#inputText');
const outputText = document.querySelector('#outputText');
const listenBtn = document.querySelector('#listenBtn');
const translateBtn = document.querySelector('#translateBtn');
const copyBtn = document.querySelector('#copyBtn');
const clearBtn = document.querySelector('#clearBtn');
const shareBtn = document.querySelector('#shareBtn');
const inputLang = document.querySelector('#inputLang');
const outputLang = document.querySelector('#outputLang');

// Populate language dropdowns
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

// Speech Recognition
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.onresult = (event) => {
    inputText.value = event.results[0][0].transcript;
};
recognition.onerror = (err) => console.log(err);

// Voice Input & Translate
listenBtn.addEventListener('click', () => {
    recognition.lang = inputLang.value;
    recognition.start();
    recognition.onend = async () => {
        const translated = await translateText(inputText.value, inputLang.value, outputLang.value);
        outputText.value = `[${outputLang.options[outputLang.selectedIndex].text}] ${translated}`;
        speakText(translated, outputLang.value);
    };
});

// Translate Text Button
translateBtn.addEventListener('click', async () => {
    const translated = await translateText(inputText.value, inputLang.value, outputLang.value);
    outputText.value = `[${outputLang.options[outputLang.selectedIndex].text}] ${translated}`;
    speakText(translated, outputLang.value);
});

// Copy / Clear / Share
copyBtn.addEventListener('click', () => navigator.clipboard.writeText(outputText.value));
clearBtn.addEventListener('click', () => { inputText.value = ''; outputText.value = ''; });
shareBtn.addEventListener('click', () => { navigator.share({ text: outputText.value }).catch(() => alert("Share not supported")); });

// Text-to-Speech
function speakText(text, lang) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    speechSynthesis.speak(utterance);
}

// Translation API
async function translateText(text, fromLang, toLang) {
    if(!text) return '';
    const apiKey = 'YOUR_OPENAI_API_KEY'; // Replace with real key
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: `Translate this text from ${fromLang} to ${toLang}: "${text}"` }]
        })
    });
    const data = await res.json();
    return data.choices[0].message.content.trim();
}
