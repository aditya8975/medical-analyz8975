# 🏥 AI Medical Report Analyzer

> An intelligent web application that analyzes medical reports using OCR and AI to predict health risks and provide personalized recommendations.

## 📋 Overview

AI Medical Report Analyzer helps users understand their medical test results by:
- 🔍 **Extracting data** from medical reports using OCR technology
- 🤖 **Analyzing metrics** with Mixtral AI (8x7B model)
- ⚠️ **Predicting health risks** based on established medical ranges
- 💡 **Generating recommendations** for preventive healthcare

---

## ✨ Features

### Core Functionality
- 📤 **Smart File Upload** - Supports JPG, PNG, and PDF medical reports
- 🔍 **OCR Text Extraction** - Tesseract.js extracts text from scanned documents
- 🤖 **AI-Powered Analysis** - Mixtral-8x7B analyzes and structures medical data
- 📊 **Risk Assessment** - Calculates diabetes, cardiovascular, and kidney disease risks
- 💡 **Personalized Recommendations** - Generates actionable health advice
- 📈 **Visual Results** - Color-coded metrics and risk percentages
- 🔒 **Privacy-First** - All processing happens client-side (no data storage)

### Technical Features
- ⚡ Real-time progress tracking (3-stage analysis)
- 🎨 Modern UI with Tailwind CSS
- 📱 Fully responsive design
- 🔄 Error handling and validation
- 🧪 Comprehensive test coverage

---

## 🖼️ Screenshots

### Upload Interface
![Upload Screen](docs/screenshots/upload.png)
*Clean, intuitive interface for uploading medical reports*

### Analysis Results
![Results Screen](docs/screenshots/results.png)
*Detailed breakdown of health metrics, risks, and recommendations*

### Risk Visualization
![Risk Assessment](docs/screenshots/risk-assessment.png)
*Visual risk indicators with percentage-based scoring*

---

## 🚀 Demo

**[Live Demo](https://medicare8975.vercel.app/)** |

Try it with the included sample report:
```bash
# Upload sample-blood-report.png and see instant analysis!
```

---

## 🛠️ Tech Stack

### Frontend
- **React.js** (18.2.0) - UI framework
- **Tailwind CSS** - Styling and design
- **Tesseract.js** (5.0.4) - OCR engine

### AI & ML
- **llama-3.3-70b-versatile** - Large language model for medical analysis
- **Groq API** - Model hosting and inference
- **Custom Risk Algorithms** - Medical reference range validation

### Tools & Libraries
- **Create React App** - Project bootstrapping
- **JavaScript (ES6+)** - Core programming language
- **Fetch API** - HTTP requests to AI endpoints

---

## 📦 Installation

### Prerequisites
```bash
node >= 22.0.0
npm >= 8.0.0
```

### Quick Start
```bash
# Clone repository
git clone https://github.com/your-username/medical-report-analyzer.git
cd medical-report-analyzer

# Install dependencies
npm install

# Start development server
npm start
```

Application runs at `http://localhost:3000`

---

## 🔑 Configuration

### Hugging Face API Setup

1. **Get Groq key** (Free)
   - Sign up at [GroqConsole](https://console.groq.com/keys)
   - Go to Settings → Access Tokens
   - Create new token with "read" access

2. **Configure key**
   ```javascript
   // src/services/aiService.js
   const GroqKey  = "your_token_here";
   ```

   **For production, use environment variables:**
   ```bash
   # .env
   REACT_APP_HUGGINGFACE_TOKEN=your_token_here
   ```

---

## 📖 Usage

### Basic Usage
```bash
1. Upload medical report (JPG/PNG)
2. Click "Analyze Report with AI"
3. Wait 15-30 seconds for analysis
4. View results and recommendations
```

### Supported Report Types
- ✅ Blood glucose and HbA1c tests
- ✅ Lipid panels (cholesterol, triglycerides)
- ✅ Metabolic panels
- ✅ Kidney function tests (creatinine, BUN)
- ✅ Liver function tests (ALT, AST)

### Example Analysis
```json
{
  "metrics": [
    {
      "name": "Glucose (Fasting)",
      "value": "126 mg/dL",
      "status": "high",
      "normal": "70-100 mg/dL"
    }
  ],
  "risks": [
    {
      "condition": "Type 2 Diabetes",
      "level": "High",
      "percentage": 80,
      "reason": "Fasting glucose at 126 mg/dL indicates diabetes threshold"
    }
  ],
  "recommendations": [
    "Consult an endocrinologist immediately",
    "Reduce sugar and refined carbohydrate intake",
    "Exercise 150+ minutes per week"
  ]
}
```

---

## 🏗️ Project Structure

```
medical-report-analyzer/
├── public/
│   └── index.html              # HTML template
├── src/
│   ├── App.js                  # Main application component
│   ├── App.css                 # Styles
│   ├── services/
│   │   ├── aiService.js        # Mixtral AI integration
│   │   └── ocrService.js       # Tesseract OCR service
│   ├── utils/
│   │   └── riskAnalyzer.js     # Medical risk calculations
│   └── index.js                # Entry point
├── docs/
│   ├── screenshots/            # UI screenshots
│   └── API.md                  # API documentation
├── sample-reports/             # Test medical reports
├── package.json
├── README.md
└── LICENSE
```

---

## 🧪 Testing

### Run Tests
```bash
npm test
```

### Test with Sample Reports
```bash
# Sample reports included in /sample-reports directory
# Upload sample-blood-report.png for comprehensive test
```

### Expected Test Results
- Glucose: 126 mg/dL (HIGH) ⚠️
- HbA1c: 6.8% (HIGH) ⚠️
- Diabetes Risk: 80% (HIGH)
- Cardiovascular Risk: 60% (MODERATE)

---

## 📊 How It Works

### Analysis Pipeline

```mermaid
graph LR
    A[Upload Report] --> B[OCR Extraction]
    B --> C[Text Preprocessing]
    C --> D[AI Analysis]
    D --> E[Risk Calculation]
    E --> F[Display Results]
```

### Detailed Flow

1. **File Upload** 
   - User uploads medical report (image/PDF)
   - File validation (size, type)
   - Preview generation

2. **OCR Processing** (5-15 seconds)
   - Tesseract.js extracts text from image
   - Text cleaning and preprocessing
   - Medical content validation

3. **AI Analysis** (10-30 seconds)
   - Send text to Mixtral-8x7B via Hugging Face API
   - AI extracts structured data (metrics, initial risks)
   - JSON response parsing

4. **Risk Enhancement** (<1 second)
   - Apply medical reference ranges
   - Calculate diabetes risk (glucose, HbA1c)
   - Calculate cardiovascular risk (cholesterol, lipids)
   - Calculate kidney risk (creatinine, BUN)

5. **Recommendations** (<1 second)
   - Generate personalized health advice
   - Prioritize by risk level
   - Include medical disclaimers

---

## 🎯 Key Algorithms

### Diabetes Risk Assessment
```javascript
if (glucose >= 126 || hba1c >= 6.5) {
  risk = "High" (80-90%)
} else if (glucose >= 100 || hba1c >= 5.7) {
  risk = "Moderate" (50-60%)
}
```

### Cardiovascular Risk
```javascript
riskFactors = 0
if (totalCholesterol >= 240) riskFactors += 2
if (ldl >= 160) riskFactors += 2
if (hdl < 40) riskFactors += 1
if (triglycerides >= 200) riskFactors += 2

risk = calculateFromFactors(riskFactors)
```

---

## 🔒 Privacy & Security

- ✅ **No data storage** - All processing happens in-browser
- ✅ **No server-side processing** - Reports never leave your device
- ✅ **Secure API calls** - HTTPS only to Hugging Face
- ✅ **No analytics** - No tracking or data collection
- ⚠️ **Medical disclaimer** - Not for actual diagnosis

---

## ⚠️ Limitations & Disclaimers

### Technical Limitations
- OCR accuracy depends on image quality
- AI may misinterpret complex reports
- Limited to common blood test metrics
- Requires internet connection for AI analysis

### Medical Disclaimer
> **This application is for educational and informational purposes only.**
> - NOT a substitute for professional medical advice
> - NOT for diagnostic or treatment purposes
> - Always consult qualified healthcare professionals
> - Results may contain errors or inaccuracies

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)
```bash
npm install -g vercel
vercel --prod
```


### Deploy to GitHub Pages
```bash
npm install gh-pages --save-dev

# Add to package.json:
"homepage": "https://your-username.github.io/medical-report-analyzer",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}

npm run deploy
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

### How to Contribute
1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

### Areas for Contribution
- 🩺 Add support for more test types (X-rays, ECG)
- 🌍 Internationalization (i18n)
- 📊 Data visualization improvements
- 🧪 More comprehensive test coverage
- 📱 Mobile app version
- 🔐 User authentication and history

---

## 📝 Roadmap

### Version 1.0 (Current) ✅
- [x] Basic OCR extraction
- [x] AI analysis with Mixtral
- [x] Risk assessment
- [x] Responsive UI

### Version 1.1 (Planned)
- [ ] Analysis history with localStorage
- [ ] Export results as PDF
- [ ] Multiple report comparison
- [ ] Graph visualizations

### Version 2.0 (Future)
- [ ] User authentication
- [ ] Cloud storage integration
- [ ] Real-time collaboration
- [ ] Mobile app (React Native)
- [ ] Multi-language support

---

## 🐛 Known Issues

- First AI request may take 30+ seconds (model loading)
- OCR struggles with handwritten reports
- Groq Token Limit

See [Issues](https://github.com/aditya8975/medicare8975/issues) for full list.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Third-Party Licenses
- React: MIT License
- Tesseract.js: Apache License 2.0
- Mixtral-8x7B: Apache License 2.0

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@your-username](https://github.com/aditya8975)
- LinkedIn: [Your Profile](https://www.linkedin.com/in/adityakatare35)
- Portfolio: [yourwebsite.com](https://adkatareport.onrender.com/index.html)

---


## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/aditya8975/medicare8975)
![GitHub forks](https://img.shields.io/github/forks/aditya8975/medicare8975)
![GitHub issues](https://img.shields.io/github/issues/aditya8975/medicare8975)
![GitHub pull requests](https://img.shields.io/github/issues-pr/aditya8975/medicare8975)

---

## 💡 Use Cases

### For Developers
- Portfolio project showcasing AI integration
- Learning OCR and NLP technologies
- Understanding healthcare tech applications

### For Users
- Quick understanding of medical test results
- Health risk awareness
- Preparation for doctor consultations
- Tracking health metrics over time

### For Students
- Learning project for medical informatics
- AI/ML practical application
- Healthcare technology research

---


## 📞 Support

Need help? Here's how to get support:

1. **Check Documentation** - Review the [docs](docs/) folder
2. **Search Issues** - Look for similar problems in [Issues](https://github.com/your-username/medicare8975r/issues)
3. **Ask Questions** - Open a new issue with the "question" label
4. **Contact** - Reach out via email or LinkedIn

---

## ⭐ Show Your Support

If this project helped you, please give it a ⭐!

---

<div align="center">

**Built with ❤️ for better healthcare accessibility**

[Report Bug](https://github.com/aditya8975/medicare8975/issues) · 
[Request Feature](https://github.com/aditya8975/medicare8975/issues) · 
[View Demo](https://medicare8975.vercel.app/)

</div>
