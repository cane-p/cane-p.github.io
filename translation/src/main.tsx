import React, { useState, useEffect } from 'react';
import { Download, Copy, Clipboard, RotateCw, ArrowLeftRight, Moon, Sun, ExternalLink } from 'lucide-react';

const TranslationAssistant = () => {
  const [sourceText, setSourceText] = useState<string>('');
  const [chunks, setChunks] = useState<string[]>([]);
  const [translations, setTranslations] = useState<string[]>([]);
  const [combinedTranslation, setCombinedTranslation] = useState<string>('');
  const [fromLanguage, setFromLanguage] = useState<string>('fr');
  const [toLanguage, setToLanguage] = useState<string>('en');
  const [charLimit, setCharLimit] = useState<number>(2000);
  const [progress, setProgress] = useState<number>(0);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const translationServices = [
    { name: 'Google Translate', url: 'https://translate.google.com' },
    { name: 'DeepL', url: 'https://www.deepl.com/translator' },
    { name: 'Reverso', url: 'https://www.reverso.net/text-translation' },
    { name: 'Bing Translator', url: 'https://www.bing.com/translator' }
  ];

  const languages = [
    { code: 'ar', name: 'Arabic' },
    { code: 'zh', name: 'Chinese' },
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'es', name: 'Spanish' }
  ];

  useEffect(() => {
    // Check system preference for dark mode
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const openTranslationService = (service: { name: string; url: string }, text: string) => {
    const encodedText = encodeURIComponent(text);
    let url = service.url;
    
    // Add source text to URL if possible
    switch(service.name) {
      case 'Google Translate':
        url += `/?sl=${fromLanguage}&tl=${toLanguage}&text=${encodedText}`;
        break;
      case 'DeepL':
        url += `#${fromLanguage}/${toLanguage}/${encodedText}`;
        break;
      default:
        // For services without direct text parameter support
        url += '';
    }
    
    window.open(url, '_blank');
  };

  // Rest of the original functions
  const divideText = () => {
    if (!sourceText.trim()) {
      setChunks([]);
      setTranslations([]);
      return;
    }

    const newChunks = [];
    let start = 0;
    
    while (start < sourceText.length) {
      let end = Math.min(start + charLimit, sourceText.length);
      if (end < sourceText.length) {
        const spaceIndex = sourceText.lastIndexOf(' ', end);
        if (spaceIndex > start) end = spaceIndex;
      }
      newChunks.push(sourceText.substring(start, end).trim());
      start = end;
    }
    
    setChunks(newChunks);
    setTranslations(new Array(newChunks.length).fill(''));
  };

  const updateTranslation = (index, text) => {
    const newTranslations = [...translations];
    newTranslations[index] = text;
    setTranslations(newTranslations);
    
    const completed = newTranslations.filter(t => t.trim()).length;
    setProgress((completed / chunks.length) * 100);
  };

  const combineTranslations = () => {
    setCombinedTranslation(translations.join('\n\n').trim());
  };

  const flipLanguages = () => {
    setFromLanguage(toLanguage);
    setToLanguage(fromLanguage);
  };

  const reset = () => {
    setSourceText('');
    setChunks([]);
    setTranslations([]);
    setCombinedTranslation('');
    setProgress(0);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Header with Dark Mode Toggle */}
        <div className="flex justify-between items-center">
          <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
            Translation Assistant
          </h1>
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-800 text-yellow-400' : 'bg-gray-200 text-gray-600'}`}
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        {/* Translation Services Shortcuts */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {translationServices.map(service => (
            <button
              key={service.name}
              onClick={() => openTranslationService(service, sourceText)}
              className={`flex items-center justify-center gap-2 p-2 rounded
                ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'}
                border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
            >
              {service.name}
              <ExternalLink className="w-4 h-4" />
            </button>
          ))}
        </div>

        {/* Language Selection */}
        <div className="flex items-center gap-4">
          <select 
            value={fromLanguage}
            onChange={(e) => setFromLanguage(e.target.value)}
            className={`flex-1 p-2 border rounded 
              ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
          >
            {languages.map(lang => (
              <option key={lang.code} value={lang.code}>{lang.name}</option>
            ))}
          </select>
          
          <button 
            onClick={flipLanguages}
            className={`p-2 rounded-full 
              ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'}
              text-white`}
          >
            <ArrowLeftRight className="w-5 h-5" />
          </button>
          
          <select 
            value={toLanguage}
            onChange={(e) => setToLanguage(e.target.value)}
            className={`flex-1 p-2 border rounded 
              ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
          >
            {languages.map(lang => (
              <option key={lang.code} value={lang.code}>{lang.name}</option>
            ))}
          </select>
        </div>

        {/* Source Text Input */}
        <div className="space-y-4">
          <textarea
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
            placeholder="Enter text to translate..."
            className={`w-full h-40 p-4 border rounded 
              ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
          />
          
          <div className="flex gap-4">
            <input
              type="number"
              value={charLimit}
              onChange={(e) => setCharLimit(Math.max(1, parseInt(e.target.value) || 2000))}
              placeholder="Character limit per chunk"
              className={`flex-1 p-2 border rounded 
                ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
            />
            <button
              onClick={divideText}
              className={`px-4 py-2 rounded text-white
                ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'}`}
            >
              Divide Text
            </button>
          </div>
        </div>

        {/* Translation Chunks */}
        {chunks.length > 0 && (
          <div className="space-y-6">
            {chunks.map((chunk, index) => (
              <div key={index} className={`p-4 border rounded space-y-4
                ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <textarea
                  value={chunk}
                  readOnly
                  className={`w-full p-2 rounded
                    ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
                />
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => navigator.clipboard.writeText(chunk)}
                    className={`flex items-center gap-2 px-3 py-1 rounded
                      ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
                  >
                    <Copy className="w-4 h-4" /> Copy
                  </button>
                  {translationServices.map(service => (
                    <button
                      key={service.name}
                      onClick={() => openTranslationService(service, chunk)}
                      className={`flex items-center gap-2 px-3 py-1 rounded
                        ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
                    >
                      {service.name}
                    </button>
                  ))}
                </div>
                <textarea
                  value={translations[index]}
                  onChange={(e) => updateTranslation(index, e.target.value)}
                  placeholder="Enter translation..."
                  className={`w-full p-2 border rounded
                    ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
                />
              </div>
            ))}

            {/* Progress Circle */}
            <div className="fixed bottom-8 right-8">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center
                ${isDarkMode ? 'bg-gray-800' : 'bg-blue-100'}`}>
                <span className="text-lg font-bold">{Math.round(progress)}%</span>
              </div>
            </div>

            {/* Combined Translation */}
            <div className="space-y-4">
              <button
                onClick={combineTranslations}
                className={`w-full px-4 py-2 rounded text-white
                  ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'}`}
              >
                Combine Translations
              </button>
              
              {combinedTranslation && (
                <>
                  <textarea
                    value={combinedTranslation}
                    readOnly
                    className={`w-full h-40 p-4 border rounded
                      ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
                  />
                  <div className="flex gap-4">
                    <button
                      onClick={() => navigator.clipboard.writeText(combinedTranslation)}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 text-white rounded
                        ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'}`}
                    >
                      <Copy className="w-5 h-5" /> Copy Combined
                    </button>
                    <button
                      onClick={reset}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      <RotateCw className="w-5 h-5" /> Reset
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TranslationAssistant;
