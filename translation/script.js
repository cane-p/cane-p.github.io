// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const darkModeIcon = document.getElementById('darkModeIcon');
const body = document.body;

darkModeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  darkModeIcon.textContent = body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

// Language Selection
const fromLanguage = document.getElementById('fromLanguage');
const toLanguage = document.getElementById('toLanguage');
const flipLanguagesBtn = document.getElementById('flipLanguages');

flipLanguagesBtn.addEventListener('click', () => {
  const temp = fromLanguage.value;
  fromLanguage.value = toLanguage.value;
  toLanguage.value = temp;
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