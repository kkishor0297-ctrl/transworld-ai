const startBtn = document.getElementById('startBtn');
const translateBtn = document.getElementById('translateBtn');
const clearBtn = document.getElementById('clearBtn');
const copyBtn = document.getElementById('copyBtn');
const shareBtn = document.getElementById('shareBtn');
const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const languageSelect = document.getElementById('language');

// Voice Input
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'en-US';
recognition.continuous = false;
startBtn.addEventListener('click', ()=>recognition.start());
recognition.onresult = (event)=>{ inputText.value = event.results[0][0].transcript; };

// Translate & Voice Output
translateBtn.addEventListener('click', async ()=>{
  const text = inputText.value.trim();
  const lang = languageSelect.value;
  if(!text) return alert('Please enter text!');

  // Dummy translation (replace with real API)
  const translated = `Translated (${lang}): ${text}`;
  outputText.textContent = translated;

  // Voice output
  const utter = new SpeechSynthesisUtterance(translated);
  utter.lang = lang;
  speechSynthesis.speak(utter);
});

// Clear
clearBtn.addEventListener('click', ()=>{
  inputText.value='';
  outputText.textContent='';
});

// Copy
copyBtn.addEventListener('click', ()=>{
  navigator.clipboard.writeText(outputText.textContent);
  alert('Copied to clipboard!');
});

// Share
shareBtn.addEventListener('click', ()=>{
  if(navigator.share){
    navigator.share({ text: outputText.textContent }).catch(err=>console.log(err));
  } else alert('Share not supported on this device.');
});
