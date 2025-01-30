// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const darkModeIcon = document.getElementById('darkModeIcon');
const body = document.body;

darkModeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  darkModeIcon.textContent = body.classList.contains('dark-mode') ? '☀️' : '🌙';
  localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
});

// Load Dark Mode Preference
if (localStorage.getItem('darkMode') === 'true') {
  body.classList.add('dark-mode');
  darkModeIcon.textContent = '☀️';
}

// Language Selection
const fromLanguage = document.getElementById('fromLanguage');
const toLanguage = document.getElementById('toLanguage');
const flipLanguagesBtn = document.getElementById('flipLanguages');

const languages = [
  { code: 'ar', name: 'Arabic' }, { code: 'zh', name: 'Chinese' },
  { code: 'en', name: 'English' }, { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' }, { code: 'hi', name: 'Hindi' },
  { code: 'it', name: 'Italian' }, { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' }, { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' }, { code: 'es', name: 'Spanish' }
];

function populateLanguages() {
  languages.forEach(lang => {
    [fromLanguage, toLanguage].forEach(select => {
      const option = document.createElement('option');
      option.value = lang.code;
      option.textContent = lang.name;
      select.appendChild(option);
    });
  });
  fromLanguage.value = 'fr';
  toLanguage.value = 'en';
}

populateLanguages();
flipLanguagesBtn.addEventListener('click', () => {
  [fromLanguage.value, toLanguage.value] = [toLanguage.value, fromLanguage.value];
});

// Translation Services
document.querySelectorAll('.service-btn').forEach(button => {
  button.addEventListener('click', () => {
    const service = button.getAttribute('data-service');
    const text = encodeURIComponent(document.getElementById('sourceText').value);
    const fromLang = fromLanguage.value, toLang = toLanguage.value;
    const urls = {
      google: `https://translate.google.com/?sl=${fromLang}&tl=${toLang}&text=${text}`,
      deepl: `https://www.deepl.com/translator#${fromLang}/${toLang}/${text}`,
      reverso: `https://www.reverso.net/text-translation#sl=${fromLang}&tl=${toLang}&text=${text}`,
      bing: `https://www.bing.com/translator?from=${fromLang}&to=${toLang}&text=${text}`
    };
    if (urls[service]) window.open(urls[service], '_blank');
  });
});

// Divide Text into Chunks
document.getElementById('divideTextBtn').addEventListener('click', () => {
  const text = document.getElementById('sourceText').value;
  const charLimit = parseInt(document.getElementById('charLimit').value) || 2000;
  const chunks = [], chunksContainer = document.getElementById('chunksContainer');
  let start = 0;
  while (start < text.length) {
    let end = Math.min(start + charLimit, text.length);
    if (end < text.length) {
      const spaceIndex = text.lastIndexOf(' ', end);
      if (spaceIndex > start) end = spaceIndex;
    }
    chunks.push(text.substring(start, end).trim());
    start = end;
  }
  chunksContainer.innerHTML = chunks.map(chunk => `
    <div class='chunk-box'>
      <textarea readonly>${chunk}</textarea>
      <textarea placeholder='Enter translation...' class='translation-box'></textarea>
      <button class='play-audio' data-text='${chunk}'>🔊</button>
    </div>
  `).join('');
});

// Combine Translations
document.getElementById('combineBtn').addEventListener('click', () => {
  document.getElementById('combinedTranslation').value = 
    [...document.querySelectorAll('.translation-box')]
      .map(t => t.value.trim()).filter(Boolean).join('\n\n');
});

// Copy to Clipboard
document.getElementById('copyCombinedBtn').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(document.getElementById('combinedTranslation').value);
    alert('Copied to clipboard!');
  } catch { alert('Failed to copy text'); }
});

// Speech-to-Text
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.continuous = true; recognition.interimResults = true;
recognition.onresult = e => document.getElementById('sourceText').value = [...e.results].map(r => r[0].transcript).join('');
const startRecordingBtn = document.getElementById('startRecording');
startRecordingBtn?.addEventListener('click', () => {
  if (recognition.running) { recognition.stop(); startRecordingBtn.style.color = 'black'; }
  else { recognition.start(); startRecordingBtn.style.color = 'red'; }
});
if (!('SpeechRecognition' in window)) startRecordingBtn?.remove();

// Text-to-Speech
function speakText(text, lang) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  window.speechSynthesis.speak(utterance);
}
document.addEventListener('click', e => {
  if (e.target.classList.contains('play-audio')) {
    speakText(e.target.getAttribute('data-text'), toLanguage.value);
  }
});
document.getElementById('playCombinedAudio')?.addEventListener('click', () => {
  speakText(document.getElementById('combinedTranslation').value, toLanguage.value);
});
if (!('speechSynthesis' in window)) document.querySelectorAll('.play-audio').forEach(btn => btn.remove());
