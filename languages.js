const languages = [
  { code:'en', name:'English' },
  { code:'zh', name:'Mandarin' },
  { code:'es', name:'Spanish' },
  { code:'fr', name:'French' },
  { code:'ar', name:'Arabic' },
  { code:'bn', name:'Bengali' },
  { code:'pt', name:'Portuguese' },
  { code:'ru', name:'Russian' },
  { code:'ja', name:'Japanese' },
  { code:'pa', name:'Punjabi' },
  { code:'de', name:'German' },
  { code:'jv', name:'Javanese' },
  { code:'te', name:'Telugu' },
  { code:'vi', name:'Vietnamese' },
  { code:'ko', name:'Korean' },
  { code:'mr', name:'Marathi' },
  { code:'ta', name:'Tamil' },
  { code:'tr', name:'Turkish' },
  { code:'it', name:'Italian' },
  { code:'hi', name:'Hindi' },
  { code:'gu', name:'Gujarati' },
  { code:'kn', name:'Kannada' },
  { code:'ml', name:'Malayalam' },
  { code:'or', name:'Odia' },
  { code:'as', name:'Assamese' },
  { code:'sd', name:'Sindhi' }
];

const select = document.getElementById('language');
languages.forEach(lang=>{
  const opt=document.createElement('option');
  opt.value=lang.code;
  opt.textContent=lang.name;
  select.appendChild(opt);
});
