// script.js

document.addEventListener('DOMContentLoaded', () => {
  const serviceButtons = document.querySelectorAll('.service-btn');
  const logoutButton = document.getElementById('logoutBtn');
  const fromLanguageSelect = document.getElementById('fromLanguage');
  const toLanguageSelect = document.getElementById('toLanguage');
  const flipLanguagesButton = document.getElementById('flipLanguages');

  serviceButtons.forEach(button => {
    button.addEventListener('click', () => {
      const service = button.getAttribute('data-service');
      // Handle translation service selection
      console.log(`Selected service: ${service}`);
    });
  });

  logoutButton.addEventListener('click', () => {
    // Handle logout functionality
    console.log('User logged out');
  });

  flipLanguagesButton.addEventListener('click', () => {
    const fromLanguage = fromLanguageSelect.value;
    const toLanguage = toLanguageSelect.value;
    fromLanguageSelect.value = toLanguage;
    toLanguageSelect.value = fromLanguage;
  });

  // VTT to Text Conversion Functionality
  const vttToTextButton = document.getElementById('vttToTextButton');
  const vttInput = document.getElementById('vttInput');
  const textOutput = document.getElementById('textOutput');

  if (vttToTextButton) {
    vttToTextButton.addEventListener('click', () => {
      const vttContent = vttInput.value;
      const convertedText = convertVTTToText(vttContent);
      textOutput.value = convertedText;
    });
  }

  function convertVTTToText(vtt) {
    // Basic VTT to text conversion logic
    return vtt
      .split('\n')
      .filter(line => line && !line.startsWith('WEBVTT') && !line.match(/^\d+$/))
      .join(' ')
      .trim();
  }
});