# Translation Assistant

## Overview
The Translation Assistant is a web application designed to facilitate language translation and convert VTT (WebVTT) files into plain text. The application provides an intuitive user interface for accessing various translation services and offers a dedicated feature for VTT file conversion.

## Features
- **Translation Services**: Users can select from multiple translation services including Google Translate, DeepL, Reverso, and Bing Translator.
- **Language Selection**: Users can choose the source and target languages for translation.
- **Text Input**: An input section for users to enter text for translation.
- **VTT to Text Conversion**: A dedicated page for converting VTT files to normal text, allowing users to upload or paste VTT content.

## File Structure
```
translation-assistant
├── src
│   ├── app.html           # Main HTML page for translation services
│   ├── vtt-to-text.html   # HTML page for VTT to text conversion
│   ├── script.js          # JavaScript for handling interactions
│   └── styles.css         # CSS styles for the application
├── package.json           # npm configuration file
├── tsconfig.json          # TypeScript configuration file
└── README.md              # Documentation for the project
```

## Getting Started
1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install the necessary dependencies using npm:
   ```
   npm install
   ```
4. Open `src/app.html` in your web browser to access the Translation Assistant.

## Usage
- To translate text, select the desired translation service, choose the source and target languages, and enter the text in the input section.
- To convert a VTT file, navigate to the VTT to Text conversion page, upload or paste the VTT content, and click the conversion button.

## Contributing
Contributions are welcome! Please feel free to submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.