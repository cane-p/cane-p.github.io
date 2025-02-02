const historyList = document.getElementById('historyList');

function saveTranslation(sourceText, translation) {
  const history = JSON.parse(localStorage.getItem('translationHistory') || '[]');
  history.push({ sourceText, translation, timestamp: new Date().toLocaleString() });
  localStorage.setItem('translationHistory', JSON.stringify(history));
  displayHistory();
}

function displayHistory() {
  const history = JSON.parse(localStorage.getItem('translationHistory') || '[]');
  historyList.innerHTML = history
    .map(
      (entry) => `
      <li>
        <strong>${entry.timestamp}</strong><br>
        <strong>Source:</strong> ${entry.sourceText}<br>
        <strong>Translation:</strong> ${entry.translation}
      </li>
    `
    )
    .join('');
}

// Call this function when combining translations
document.getElementById('combineBtn').addEventListener('click', () => {
  const sourceText = document.getElementById('sourceText').value;
  const translation = document.getElementById('combinedTranslation').value;
  saveTranslation(sourceText, translation);
});

// Display history on page load
displayHistory();
