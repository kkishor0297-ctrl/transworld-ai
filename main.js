const startBtn=document.getElementById("startBtn");
const stopBtn=document.getElementById("stopBtn");
const inputText=document.getElementById("inputText");
const outputText=document.getElementById("outputText");
const inputLang=document.getElementById("inputLang");
const outputLang=document.getElementById("outputLang");

const SpeechRecognition=window.SpeechRecognition||window.webkitSpeechRecognition;
const recognition=new SpeechRecognition();

recognition.continuous=true;
recognition.interimResults=false;

startBtn.onclick=()=>{
  recognition.lang=inputLang.value;
  recognition.start();
};

stopBtn.onclick=()=>{
  recognition.stop();
};

recognition.onresult=(e)=>{
  const text=e.results[e.results.length-1][0].transcript;
  inputText.value+=text+" ";
  speak(text);
};

function speak(text){
  outputText.textContent=text;
  const u=new SpeechSynthesisUtterance(text);
  u.lang=outputLang.value;
  u.rate=1;
  u.pitch=1;
  speechSynthesis.speak(u);
}

inputText.addEventListener("change",()=>{
  speak(inputText.value);
});
