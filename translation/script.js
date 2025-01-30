// Export as PDF
document.getElementById('exportPdfBtn').addEventListener('click', () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.text(document.getElementById('combinedTranslation').value, 10, 10);
  doc.save('translation.pdf');
});

// Export as TXT
document.getElementById('exportTxtBtn').addEventListener('click', () => {
  const blob = new Blob([document.getElementById('combinedTranslation').value], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'translation.txt';
  a.click();
  URL.revokeObjectURL(url);
});

// Character Count for Source Text
document.getElementById('sourceText').addEventListener('input', () => {
  document.getElementById('sourceCharCount').textContent = `Character count: ${document.getElementById('sourceText').value.length}`;
});

// Character Count for Final Translation
document.getElementById('combinedTranslation').addEventListener('input', () => {
  document.getElementById('finalCharCount').textContent = `Character count: ${document.getElementById('combinedTranslation').value.length}`;
});
