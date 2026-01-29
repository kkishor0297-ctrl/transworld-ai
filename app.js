// HTML Elements
const inputLang = document.getElementById("inputLang");
const outputLang = document.getElementById("outputLang");
const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");
const micBtn = document.getElementById("micBtn");
const translateBtn = document.getElementById("translateBtn");
const copyBtn = document.getElementById("copyBtn");
const clearBtn = document.getElementById("clearBtn");
const shareBtn = document.getElementById("shareBtn");

// Load languages into dropdowns
for (let lang in languages) {
    inputLang.innerHTML += `<option value="${languages[lang]}">${lang}</option>`;
    outputLang.innerHTML += `<option value="${lang}">${lang}</option>`;
}

// Default selections
inputLang.value = "hi-IN";
outputLang.value = "English";

// ---------- Voice Input & Translation ----------
micBtn.onclick = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = inputLang.value;
    recognition.start();

    // Green glow animation
    micBtn.style.background = "#27ae60";

    recognition.onresult = (event) => {
        inputText.value = event.results[0][0].transcript;
        translateText();
    };

    recognition.onend = () => {
        micBtn.style.background = "#2ecc71";
    };
};

// ---------- Text Translation Button ----------
translateBtn.onclick = () => {
    translateText();
};

// ---------- Translate Function ----------
function translateText() {
    let text = inputText.value.trim();
    if (!text) return;

    // For demo, just show input in output
    // Future: Replace with AI translation API
    outputText.value = `[${outputLang.value}] ${text}`;

    // Voice output (TTS)
    const utterance = new SpeechSynthesisUtterance(outputText.value);
    utterance.lang = outputLang.value.includes("IN") ? "en-US" : "en-US"; // demo fallback
    window.speechSynthesis.speak(utterance);
}

// ---------- Copy ----------
copyBtn.onclick = () => {
    navigator.clipboard.writeText(outputText.value);
    alert("Copied!");
};

// ---------- Clear ----------
clearBtn.onclick = () => {
    inputText.value = "";
    outputText.value = "";
};

// ---------- Share ----------
shareBtn.onclick = () => {
    if (navigator.share) {
        navigator.share({
            title: "Transworld AI",
            text: outputText.value,
            url: location.href
        });
    } else {
        alert("Share not supported in this browser");
    }
};
