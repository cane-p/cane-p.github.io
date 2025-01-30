// Text-to-Speech
function speakText(text, lang) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang; // Use the target language code (e.g., "en-US", "es-ES")
  synth.speak(utterance);
}

// Play audio for translation chunks
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('play-audio')) {
    const text = e.target.getAttribute('data-text') || e.target.parentElement.querySelector('textarea').value;
    const targetLang = document.getElementById('toLanguage').value;
    speakText(text, targetLang);
  }
});

// Play audio for combined translation
document.getElementById('playCombinedAudio').addEventListener('click', () => {
  const text = document.getElementById('combinedTranslation').value;
  const targetLang = document.getElementById('toLanguage').value;
  speakText(text, targetLang);
});

// Check browser support
if (!('speechSynthesis' in window)) {
  document.querySelectorAll('.play-audio').forEach(btn => btn.style.display = 'none');
  alert("Text-to-Speech is not supported in your browser.");
}
