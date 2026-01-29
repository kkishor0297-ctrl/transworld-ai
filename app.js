document.addEventListener("DOMContentLoaded", function() {
    // HTML Elements
    const langDropdown = document.getElementById("languageDropdown");
    const translateBtn = document.getElementById("translateBtn");
    const inputText = document.getElementById("inputText");
    const outputText = document.getElementById("outputText");
    const speakBtn = document.getElementById("speakBtn");
    const micBtn = document.getElementById("micBtn");

    // Populate dropdown
    languages.forEach(lang => {
        const option = document.createElement("option");
        option.value = lang.code;
        option.text = lang.name;
        langDropdown.appendChild(option);
    });

    // Translate function (mock / beginner version)
    function translate(text, targetLang) {
        // This is placeholder logic
        // Replace with real API call if needed
        return `[${targetLang}] ${text}`;
    }

    // Translate button click
    translateBtn.addEventListener("click", function() {
        const text = inputText.value;
        const lang = langDropdown.value;
        if(!text || !lang) {
            alert("Please enter text and select language!");
            return;
        }
        const translated = translate(text, lang);
        outputText.value = translated;
        console.log("Translated:", translated);
    });

    // Text-to-Speech
    speakBtn.addEventListener("click", function() {
        const msg = new SpeechSynthesisUtterance(outputText.value);
        window.speechSynthesis.speak(msg);
    });

    // Voice Input (Microphone)
    micBtn.addEventListener("click", function() {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = "en-US"; // default
        recognition.start();
        recognition.onresult = function(event) {
            inputText.value = event.results[0][0].transcript;
        }
    });

    console.log("Advanced JS loaded, DOM ready!");
});
