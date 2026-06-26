/* ==========================================================
   Transworld AI
   Part 8
========================================================== */

(function () {

"use strict";

const sourceLangEl=document.getElementById("sourceLang");
const targetLangEl=document.getElementById("targetLang");

const inputTextEl=document.getElementById("inputText");
const outputTextEl=document.getElementById("outputText");

const inputLangLabel=document.getElementById("inputLangLabel");
const outputLangLabel=document.getElementById("outputLangLabel");

const micBtn=document.getElementById("micBtn");
const micStatus=document.getElementById("micStatus");

const translateBtn=document.getElementById("translateBtn");

const clearBtn=document.getElementById("clearBtn");
const copyBtn=document.getElementById("copyBtn");

const swapBtn=document.getElementById("swapBtn");

const speakInputBtn=document.getElementById("speakInputBtn");
const speakOutputBtn=document.getElementById("speakOutputBtn");

const statusMsg=document.getElementById("statusMsg");

let recognition=null;
let isRecording=false;


/* ===========================
   Load Languages
=========================== */

function populateLanguages(){

UNIQUE_LANGUAGES.forEach(lang=>{

let option=document.createElement("option");

option.value=lang.translateCode;

option.textContent=lang.name;

option.dataset.speech=lang.code;

sourceLangEl.appendChild(option);

let option2=document.createElement("option");

option2.value=lang.translateCode;

option2.textContent=lang.name;

option2.dataset.speech=lang.code;

targetLangEl.appendChild(option2);

});

sourceLangEl.value="hi";

targetLangEl.value="en";

updateLabels();

}


/* ===========================
   Labels
=========================== */

function updateLabels(){

inputLangLabel.textContent=

sourceLangEl.options[sourceLangEl.selectedIndex].textContent;

outputLangLabel.textContent=

targetLangEl.options[targetLangEl.selectedIndex].textContent;

}

sourceLangEl.addEventListener("change",updateLabels);

targetLangEl.addEventListener("change",updateLabels);


/* ===========================
   Status
=========================== */

function setStatus(message,type=""){

statusMsg.textContent=message;

statusMsg.className="status-msg";

if(type){

statusMsg.classList.add(type);

}

}


/* ===========================
   Swap
=========================== */

swapBtn.addEventListener("click",()=>{

let a=sourceLangEl.selectedIndex;

let b=targetLangEl.selectedIndex;

sourceLangEl.selectedIndex=b;

targetLangEl.selectedIndex=a;

updateLabels();

let temp=inputTextEl.value;

inputTextEl.value=outputTextEl.value;

outputTextEl.value=temp;

});


/* ===========================
   Voice Recognition
=========================== */

function startRecording(){

const SpeechRecognition=

window.SpeechRecognition||

window.webkitSpeechRecognition;

if(!SpeechRecognition){

setStatus(

"Speech Recognition not supported",

"error"

);

return;

}

recognition=new SpeechRecognition();

recognition.lang=

sourceLangEl.options[

sourceLangEl.selectedIndex

].dataset.speech;

recognition.interimResults=true;

recognition.continuous=false;

recognition.maxAlternatives=1;

recognition.start();

isRecording=true;

micBtn.classList.add("recording");

micStatus.textContent="Listening...";

setStatus("Speak now...");/* ===========================
   Speech Result
=========================== */

recognition.onresult = (event) => {

let finalTranscript = "";

let interimTranscript = "";

for (
let i = event.resultIndex;
i < event.results.length;
i++
){

const transcript =
event.results[i][0].transcript;

if(event.results[i].isFinal){

finalTranscript += transcript;

}else{

interimTranscript += transcript;

}

}

inputTextEl.value =
(finalTranscript + interimTranscript).trim();

};


/* ===========================
   Speech Error
=========================== */

recognition.onerror = (event)=>{

isRecording=false;

micBtn.classList.remove("recording");

micStatus.textContent="Tap to Speak";

setStatus(
"Voice Error : " + event.error,
"error"
);

};


/* ===========================
   Speech End
=========================== */

recognition.onend=()=>{

isRecording=false;

micBtn.classList.remove("recording");

micStatus.textContent="Tap to Speak";

if(inputTextEl.value.trim()){

translateText();

}

};


/* ===========================
   Mic Button
=========================== */

micBtn.addEventListener("click",()=>{

if(isRecording){

recognition.stop();

}else{

startRecording();

}

});


/* ===========================
   Translation
=========================== */

async function translateText(){

const text=inputTextEl.value.trim();

if(!text){

setStatus(
"Please enter some text.",
"error"
);

return;

}

translateBtn.disabled=true;

translateBtn.innerHTML="Translating...";

setStatus("Translating...");

try{

const source=sourceLangEl.value;

const target=targetLangEl.value;

const url=

`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${source}|${target}`;

const response=

await fetch(url);

const data=

await response.json();

outputTextEl.value=

data.responseData.translatedText;

setStatus(
"Translation Completed",
"success"
);

speakText(
outputTextEl.value,
targetLangEl.options[
targetLangEl.selectedIndex
].dataset.speech
);

}catch(e){

setStatus(
"Translation Failed",
"error"
);

}

translateBtn.disabled=false;

translateBtn.innerHTML="Translate";

}


/* ===========================
   Translate Button
=========================== */

translateBtn.addEventListener(

"click",

translateText

);/* ===========================
   Text To Speech
=========================== */

function speakText(text, lang) {

if (!text) return;

if (!("speechSynthesis" in window)) {

setStatus("Speech output is not supported.","error");

return;

}

window.speechSynthesis.cancel();

const speech = new SpeechSynthesisUtterance(text);

speech.lang = lang;

speech.rate = 0.95;

speech.pitch = 1;

const voices = window.speechSynthesis.getVoices();

const voice = voices.find(v => v.lang === lang) ||
voices.find(v => v.lang.startsWith(lang.split("-")[0]));

if (voice) {

speech.voice = voice;

}

window.speechSynthesis.speak(speech);

}


/* ===========================
   Listen Buttons
=========================== */

speakInputBtn.addEventListener("click", () => {

speakText(

inputTextEl.value,

sourceLangEl.options[sourceLangEl.selectedIndex].dataset.speech

);

});

speakOutputBtn.addEventListener("click", () => {

speakText(

outputTextEl.value,

targetLangEl.options[targetLangEl.selectedIndex].dataset.speech

);

});


/* ===========================
   Copy Button
=========================== */

copyBtn.addEventListener("click", async () => {

if (!outputTextEl.value) {

setStatus("Nothing to copy.","error");

return;

}

try {

await navigator.clipboard.writeText(outputTextEl.value);

setStatus("Copied Successfully","success");

} catch {

outputTextEl.select();

document.execCommand("copy");

setStatus("Copied Successfully","success");

}

});


/* ===========================
   Clear Button
=========================== */

clearBtn.addEventListener("click", () => {

inputTextEl.value = "";

outputTextEl.value = "";

setStatus("");

inputTextEl.focus();

});


/* ===========================
   Service Worker
=========================== */

if ("serviceWorker" in navigator) {

window.addEventListener("load", () => {

navigator.serviceWorker

.register("sw.js")

.catch(err => console.log(err));

});

}


/* ===========================
   Initialize App
=========================== */

populateLanguages();

})();
