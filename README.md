# 🏥 AI Medical Report Analyzer

>MediAnalyze is a modern, AI-powered web application that analyzes blood test reports and provides intelligent health insights. Built with React, TypeScript, and Tailwind CSS, it leverages the Groq API for fast, accurate medical analysis and Tesseract.js for optical character recognition (OCR).

## 📋 Overview

AI Medical Report Analyzer helps users understand their medical test results by:
- 🔍 **Extracting data** from medical reports using OCR technology
- 🤖 **Analyzing metrics** with Mixtral AI (8x7B model)
- ⚠️ **Predicting health risks** based on established medical ranges
- 💡 **Generating recommendations** for preventive healthcare

---

## ✨ Features

📤 File Upload

🔍 OCR Text Extraction

🤖 AI-Powered Analysis

📊 Blood Metrics Extraction

⚠️ Health Risk Assessment

💡 Personalized Recommendations

🔒 Privacy & Security

---

## 🖼️ Screenshots

### Upload Interface
![Upload Screen](doc/screenshot/medi2.PNG)
*Clean, intuitive interface for uploading medical reports*
![Upload Screen](doc/screenshot/Capture.PNG)
### Analysis Results
![Results Screen](doc/screenshot/medi6.PNG)
*Detailed breakdown of health metrics, risks, and recommendations*
![Results Screen](doc/screenshot/medical7.PNG)
### Risk Visualization
![Risk Assessment](doc/screenshot/medi66.PNG)
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
git clone https://github.com/aditya8975/medical-analyz8975.git
cd medical-analyz8975

# Install dependencies
npm install

# Start development server
npm start
```

Application runs at `http://localhost:3000`

---

## 🔑 Configuration

Environment Variables

Create a .env file in the project root:

Plain Text
# Groq API Configuration
# Get your free API key from: https://console.groq.com/keys
VITE_GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxx

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
// User uploads a blood test PDF
// App automatically:
// 1. Extracts text using Tesseract.js
// 2. Sends to Groq API for analysis
// 3. Parses structured JSON response
// 4. Displays results in UI

// Result structure:
{
  "summary": "Your blood test shows elevated glucose levels...",
  "metrics": [
    {
      "name": "Fasting Glucose",
      "value": "145 mg/dL",
      "status": "high",
      "normal": "70-100 mg/dL"
    }
  ],
  "risks": [
    {
      "condition": "Type 2 Diabetes Risk",
      "level": "high",
      "percentage": 75,
      "reason": "Elevated fasting glucose levels"
    }
  ],
  "recommendations": [
    "Consult with an endocrinologist",
    "Increase physical activity to 150 minutes/week",
    "Reduce refined sugar and carbohydrate intake"
  ]
}
```

---

## 🏗️ Project Structure

```
medical-analyzer-v2/
│
├── client/                          # Frontend React application
│   ├── index.html                  # HTML entry point
│   ├── public/                     # Static assets
│   │   └── vite.svg               # Vite logo
│   │
│   └── src/
│       ├── main.tsx               # React entry point
│       ├── App.tsx                # Main application component
│       ├── index.css              # Global Tailwind styles
│       │
│       ├── services/              # Business logic services
│       │   ├── groqService.ts     # Groq API integration
│       │   │   ├── analyzeBloodReport()
│       │   │   ├── parseResponse()
│       │   │   └── validateMetrics()
│       │   │
│       │   └── ocrService.ts      # OCR text extraction
│       │       ├── extractTextFromImage()
│       │       ├── extractTextFromPDF()
│       │       └── extractTextFromImageFile()
│       │
│       └── utils/                 # Utility functions
│           └── toast.ts           # Toast notification system
│               ├── toast.success()
│               ├── toast.error()
│               ├── toast.loading()
│               └── toast.info()
│
├── .env                           # Environment variables (your API key)
├── .env.example                   # Example environment file
├── .gitignore                     # Git ignore rules
├── package.json                   # Dependencies and scripts
├── pnpm-lock.yaml                # Locked dependency versions
├── vite.config.ts                # Vite configuration
├── tsconfig.json                 # TypeScript configuration
├── README.md                      # Project documentation
└── FRONTEND_SETUP.txt            # Setup guide
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
"homepage": "https://your-username.github.io/medical-analyz8975",
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
- [x] AI analysis 
- [ ] Export results as PDF
- [x] Risk assessment
- [x] Responsive UI

### Version 1.1 (Planned)
- [ ] Analysis history with localStorage
- [ ] Multiple report comparison
- [ ] Graph visualizations

### Version 2.0 (Future)
- [ ] User authentication
- [ ] Cloud storage integration
- [ ] Real-time collaboration
- [ ] Mobile app (React Native)
- [ ] Multi-language support

---


See [Issues](https://github.com/aditya8975/medical-analyz8975/issues) for full list.

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
- GitHub: [@aditya8975](https://github.com/aditya8975)
- LinkedIn: [AdityaKatare](https://www.linkedin.com/in/adityakatare35)
- Portfolio: [AdityaKatare](https://adkatareport.onrender.com/index.html)

---


## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/aditya8975/medical-analyz8975)
![GitHub forks](https://img.shields.io/github/forks/aditya8975/medical-analyz8975)
![GitHub issues](https://img.shields.io/github/issues/aditya8975/medical-analyz8975)
![GitHub pull requests](https://img.shields.io/github/issues-pr/aditya8975/medical-analyz8975)

---



## 📞 Support

Need help? Here's how to get support:

1. **Check Documentation** - Review the [docs](docs/) folder
2. **Search Issues** - Look for similar problems in [Issues](https://github.com/your-username/medical-analyz8975/issues)
3. **Ask Questions** - Open a new issue with the "question" label
4. **Contact** - Reach out via email or LinkedIn

---

## ⭐ Show Your Support

If this project helped you, please give it a ⭐!

---

<div align="center">

**Built with ❤️ for better healthcare accessibility**

[Report Bug](https://github.com/aditya8975/medical-analyz8975/issues) · 
[Request Feature](https://github.com/aditya8975/medical-analyz8975/issues) · 
[View Demo](https://medicare8975.vercel.app/)

</div>
