const voiceBtn = document.getElementById('voiceBtn');
const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');

// 🎤 आवाज़ सुनना
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
voiceBtn.onclick = () => {
    recognition.lang = document.getElementById('sourceLang').value;
    recognition.start();
    voiceBtn.innerText = "Listening... 🎤";
};

recognition.onresult = (event) => {
    const text = event.results[0][0].transcript;
    inputText.value = text;
    translate(text);
    voiceBtn.innerText = "Start Voice 🎤";
};

// 🌍 इंटरनेट अनुवाद (MyMemory API)
async function translate(text) {
    if(!text) return;
    outputText.value = "Translating...";
    
    // 5-letter कोड को 2-letter में बदलना (जैसे hi-IN -> hi) ताकि एरर न आए
    const s = document.getElementById('sourceLang').value.split('-')[0];
    const t = document.getElementById('targetLang').value.split('-')[0];
    
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${s}|${t}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        const result = data.responseData.translatedText;
        outputText.value = result;
        
        // 🔊 आवाज़ में सुनाना
        const speech = new SpeechSynthesisUtterance(result);
        speech.lang = document.getElementById('targetLang').value;
        window.speechSynthesis.speak(speech);
    } catch (err) {
        outputText.value = "Error: Internet check karein!";
    }
}

// Translate Edited Text Button के लिए
document.querySelector('.translate-edited-btn').onclick = () => translate(inputText.value);
