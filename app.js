/* =========================================================
   Transworld AI - Voice & Text Translator
   - Speech Recognition (mic input)
   - MyMemory API (translation)
   - Speech Synthesis (voice output)
   ========================================================= */

(function () {
  "use strict";

  const sourceLangEl   = document.getElementById("sourceLang");
  const targetLangEl   = document.getElementById("targetLang");
  const swapBtn        = document.getElementById("swapBtn");

  const inputTextEl    = document.getElementById("inputText");
  const outputTextEl   = document.getElementById("outputText");

  const inputLangLabel  = document.getElementById("inputLangLabel");
  const outputLangLabel = document.getElementById("outputLangLabel");

  const micBtn        = document.getElementById("micBtn");
  const micStatus     = document.getElementById("micStatus");

  const translateBtn  = document.getElementById("translateBtn");
  const clearBtn      = document.getElementById("clearBtn");
  const copyBtn       = document.getElementById("copyBtn");

  const speakInputBtn  = document.getElementById("speakInputBtn");
  const speakOutputBtn = document.getElementById("speakOutputBtn");

  const statusMsg = document.getElementById("statusMsg");

  let isRecording = false;
  let recognition = null;

  function populateLanguages() {
    UNIQUE_LANGUAGES.forEach((lang) => {
      const opt1 = document.createElement("option");
      opt1.value = lang.translateCode;
      opt1.textContent = lang.name;
      opt1.dataset.speechCode = lang.code;
      sourceLangEl.appendChild(opt1);

      const opt2 = document.createElement("option");
      opt2.value = lang.translateCode;
      opt2.textContent = lang.name;
      opt2.dataset.speechCode = lang.code;
      targetLangEl.appendChild(opt2);
    });

    setSelectByValue(sourceLangEl, "hi");
    setSelectByValue(targetLangEl, "en");

    updateLangLabels();
  }

  function setSelectByValue(selectEl, value) {
    const idx = Array.from(selectEl.options).findIndex((o) => o.value === value);
    if (idx >= 0) selectEl.selectedIndex = idx;
  }

  function getSpeechCode(selectEl) {
    return selectEl.options[selectEl.selectedIndex].dataset.speechCode;
  }

  function getLangName(selectEl) {
    return selectEl.options[selectEl.selectedIndex].textContent;
  }

  function updateLangLabels() {
    inputLangLabel.textContent = getLangName(sourceLangEl);
    outputLangLabel.textContent = getLangName(targetLangEl);
  }

  sourceLangEl.addEventListener("change", updateLangLabels);
  targetLangEl.addEventListener("change", updateLangLabels);

  swapBtn.addEventListener("click", () => {
    const srcIdx = sourceLangEl.selectedIndex;
    const tgtIdx = targetLangEl.selectedIndex;
    sourceLangEl.selectedIndex = tgtIdx;
    targetLangEl.selectedIndex = srcIdx;
    updateLangLabels();

    const tmp = inputTextEl.value;
    inputTextEl.value = outputTextEl.value;
    outputTextEl.value = tmp;
  });

  function setStatus(msg, type) {
    statusMsg.textContent = msg || "";
    statusMsg.className = "status-msg" + (type ? " " + type : "");
  }

  function getRecognitionClass() {
    return window.SpeechRecognition || window.webkitSpeechRecognition || null;
  }

  function startRecording() {
    const RecognitionClass = getRecognitionClass();

    if (!RecognitionClass) {
      setStatus("Voice input is not supported in this browser. Please use Google Chrome.", "error");
      return;
    }

    recognition = new RecognitionClass();
    recognition.lang = getSpeechCode(sourceLangEl);
    recognition.interimResults = true;
    recognition.continuous = false;
    recognition.maxAlternatives = 1;

    isRecording = true;
    micBtn.classList.add("recording");
    micStatus.textContent = "Listening... speak now";
    setStatus("");

    let finalTranscript = "";

    recognition.onresult = (event) => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interim += transcript;
        }
      }
      inputTextEl.value = (finalTranscript + " " + interim).trim();
    };

    recognition.onerror = (event) => {
      isRecording = false;
      micBtn.classList.remove("recording");
      micStatus.textContent = "Tap to speak";

      let msg = "Voice input error: " + event.error;
      if (event.error === "no-speech") msg = "No speech detected. Try again.";
      if (event.error === "not-allowed" || event.error === "service-not-allowed") {
        msg = "Microphone permission denied. Please allow mic access.";
      }
      setStatus(msg, "error");
    };

    recognition.onend = () => {
      isRecording = false;
      micBtn.classList.remove("recording");
      micStatus.textContent = "Tap to speak";

      if (inputTextEl.value.trim().length > 0) {
        translateText();
      }
    };

    recognition.start();
  }

  function stopRecording() {
    if (recognition) {
      recognition.stop();
    }
    isRecording = false;
    micBtn.classList.remove("recording");
    micStatus.textContent = "Tap to speak";
  }

  micBtn.addEventListener("click", () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  });

  async function translateText() {
    const text = inputTextEl.value.trim();
    if (!text) {
      setStatus("Please speak or type something first.", "error");
      return;
    }

    const sourceLang = sourceLangEl.value;
    const targetLang = targetLangEl.value;

    if (sourceLang === targetLang) {
      outputTextEl.value = text;
      setStatus("Source and target languages are the same.", "");
      return;
    }

    translateBtn.disabled = true;
    translateBtn.textContent = "Translating...";
    setStatus("Translating, please wait...", "");

    try {
      const langPair = `${sourceLang}|${targetLang}`;
      const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${langPair}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network error: " + response.status);
      }

      const data = await response.json();

      if (data && data.responseData && data.responseData.translatedText) {
        outputTextEl.value = data.responseData.translatedText;
        setStatus("Translation complete.", "success");

        speakText(outputTextEl.value, getSpeechCode(targetLangEl));
      } else {
        throw new Error("Translation failed. Try again.");
      }
    } catch (err) {
      console.error(err);
      setStatus("Translation failed. Check your internet connection and try again.", "error");
    } finally {
      translateBtn.disabled = false;
      translateBtn.textContent = "Translate";
    }
  }

  translateBtn.addEventListener("click", translateText);

  inputTextEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      translateText();
    }
  });

  function speakText(text, langCode) {
    if (!text || !text.trim()) return;

    if (!("speechSynthesis" in window)) {
      setStatus("Voice output is not supported in this browser.", "error");
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = langCode;
    utterance.rate = 0.95;
    utterance.pitch = 1;

    const voices = window.speechSynthesis.getVoices();
    const matchingVoice = voices.find((v) => v.lang === langCode) ||
                           voices.find((v) => v.lang.startsWith(langCode.split("-")[0]));
    if (matchingVoice) utterance.voice = matchingVoice;

    window.speechSynthesis.speak(utterance);
  }

  speakInputBtn.addEventListener("click", () => {
    speakText(inputTextEl.value, getSpeechCode(sourceLangEl));
  });

  speakOutputBtn.addEventListener("click", () => {
    speakText(outputTextEl.value, getSpeechCode(targetLangEl));
  });

  if ("speechSynthesis" in window) {
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.getVoices();
    };
  }

  clearBtn.addEventListener("click", () => {
    inputTextEl.value = "";
    outputTextEl.value = "";
    setStatus("");
    inputTextEl.focus();
  });

  copyBtn.addEventListener("click", () => {
    const text = outputTextEl.value;
    if (!text) {
      setStatus("Nothing to copy yet.", "error");
      return;
    }
    navigator.clipboard.writeText(text).then(() => {
      setStatus("Copied to clipboard!", "success");
    }).catch(() => {
      outputTextEl.select();
      document.execCommand("copy");
      setStatus("Copied to clipboard!", "success");
    });
  });

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js").catch((err) => {
        console.warn("Service worker registration failed:", err);
      });
    });
  }

  populateLanguages();
})();
