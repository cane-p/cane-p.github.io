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
  { code: 'ar', name: 'Arabic' },
  { code: 'zh', name: 'Chinese' },
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'hi', name: 'Hindi' },
  { code: 'it', name: 'Italian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' },
  { code: 'es', name: 'Spanish' },
];

// Populate Language Dropdowns
function populateLanguages() {
  languages.forEach((lang) => {
    const option1 = document.createElement('option');
    option1.value = lang.code;
    option1.textContent = lang.name;
    fromLanguage.appendChild(option1);

    const option2 = document.createElement('option');
    option2.value = lang.code;
    option2.textContent = lang.name;
    toLanguage.appendChild(option2);
  });

  // Set default languages
  fromLanguage.value = 'fr'; // French
  toLanguage.value = 'en'; // English
}

populateLanguages(); // Call this function to populate the dropdowns

flipLanguagesBtn.addEventListener('click', () => {
  const temp = fromLanguage.value;
  fromLanguage.value = toLanguage.value;
  toLanguage.value = temp;
});

// Translation Services
const serviceButtons = document.querySelectorAll('.service-btn');

serviceButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const service = button.getAttribute('data-service');
    const text = document.getElementById('sourceText').value;
    const fromLang = fromLanguage.value;
    const toLang = toLanguage.value;

    let url = '';

    switch (service) {
      case 'google':
        url = `https://translate.google.com/?sl=${fromLang}&tl=${toLang}&text=${encodeURIComponent(text)}`;
        break;
      case 'deepl':
        url = `https://www.deepl.com/translator#${fromLang}/${toLang}/${encodeURIComponent(text)}`;
        break;
      case 'reverso':
        url = `https://www.reverso.net/text-translation#sl=${fromLang}&tl=${toLang}&text=${encodeURIComponent(text)}`;
        break;
      case 'bing':
        url = `https://www.bing.com/translator?from=${fromLang}&to=${toLang}&text=${encodeURIComponent(text)}`;
        break;
      default:
        console.error('Unknown service');
        return;
    }

    window.open(url, '_blank');
  });
});

// Divide Text
const sourceText = document.getElementById('sourceText');
const charLimitInput = document.getElementById('charLimit');
const divideTextBtn = document.getElementById('divideTextBtn');
const chunksContainer = document.getElementById('chunksContainer');

divideTextBtn.addEventListener('click', () => {
  const text = sourceText.value;
  const charLimit = parseInt(charLimitInput.value) || 2000;
  const chunks = [];

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

  chunksContainer.innerHTML = chunks
    .map(
      (chunk, index) => `
      <div class="chunk-box">
        <textarea readonly>${chunk}</textarea>
        <textarea placeholder="Enter translation..."></textarea>
      </div>
    `
    )
    .join('');
});

// Combine Translations
const combineBtn = document.getElementById('combineBtn');
const combinedTranslation = document.getElementById('combinedTranslation');

combineBtn.addEventListener('click', () => {
  const translations = Array.from(document.querySelectorAll('.chunk-box textarea:last-child'))
    .map((textarea) => textarea.value)
    .join('\n\n');
  combinedTranslation.value = translations;
});

// Reset
const resetBtn = document.getElementById('resetBtn');

resetBtn.addEventListener('click', () => {
  sourceText.value = '';
  charLimitInput.value = '';
  chunksContainer.innerHTML = '';
  combinedTranslation.value = '';
});

// Export as PDF
const exportPdfBtn = document.getElementById('exportPdfBtn');
exportPdfBtn.addEventListener('click', () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.text(combinedTranslation.value, 10, 10);
  doc.save('translation.pdf');
});

// Export as TXT
const exportTxtBtn = document.getElementById('exportTxtBtn');
exportTxtBtn.addEventListener('click', () => {
  const blob = new Blob([combinedTranslation.value], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'translation.txt';
  a.click();
  URL.revokeObjectURL(url);
});

// Character Count
sourceText.addEventListener('input', () => {
  const charCount = document.getElementById('charCount');
  charCount.textContent = `Character count: ${sourceText.value.length}`;
});
