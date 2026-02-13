# 🏥 MediAnalyze - Frontend-Only Blood Report Analyzer

A lightweight, frontend-only medical report analyzer that uses AI to extract blood test metrics, assess health risks, and provide personalized recommendations. **No server required!**

## ✨ Features

✅ **Frontend-Only** - No backend server needed  
✅ **Groq API Integration** - Free tier AI analysis (Mixtral 8x7B model)  
✅ **Drag-and-Drop Upload** - Simple file upload interface  
✅ **OCR Text Extraction** - Tesseract.js for image/PDF text extraction  
✅ **AI-Powered Analysis** - Automatic blood metrics detection  
✅ **Health Risk Assessment** - Potential conditions with severity levels  
✅ **Personalized Recommendations** - Actionable health advice  
✅ **Professional Medical UI** - Clean, responsive design  
✅ **No Authentication** - Direct access, no login required  
✅ **No History Saving** - Results display only, no database  
✅ **Comprehensive Error Handling** - User-friendly error messages  

## 🚀 Quick Start (Windows)

### Prerequisites

1. **Node.js** (LTS version)
   - Download: https://nodejs.org/
   - Install and verify: `node --version`

2. **pnpm** (Package Manager)
   - Open Command Prompt
   - Run: `npm install -g pnpm`
   - Verify: `pnpm --version`

3. **Groq API Key** (Free)
   - Visit: https://console.groq.com/keys
   - Sign up with email (no credit card required)
   - Copy your API key

### Setup & Run (3 Steps)

**Step 1: Extract the ZIP file**
```
Right-click → Extract All
```

**Step 2: Create `.env` file**
```
Open: medical-analyzer-v2/.env
Add: VITE_GROQ_API_KEY=your-api-key-here
Save the file
```

**Step 3: Install & Run**
```cmd
cd medical-analyzer-v2
pnpm install
pnpm dev
```

Open browser: **http://localhost:3000**

## 📖 How to Use

1. **Open the app** - Go to http://localhost:3000
2. **Upload report** - Drag-drop a blood test file (PDF, JPG, PNG) or click to browse
3. **Wait for analysis** - AI extracts text and analyzes metrics
4. **View results** - See metrics, risks, and recommendations
5. **Analyze another** - Click "Analyze Another Report" to start over

## 🛠️ Available Commands

| Command | Purpose |
|---------|---------|
| `pnpm dev` | Start development server (http://localhost:3000) |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build locally |

## 📁 Project Structure

```
medical-analyzer-v2/
├── client/                      # Frontend React app
│   ├── index.html              # HTML entry point
│   ├── public/                 # Static assets
│   └── src/
│       ├── main.tsx            # React entry point
│       ├── App.tsx             # Main component
│       ├── index.css           # Tailwind styles
│       ├── services/
│       │   ├── groqService.ts  # Groq API integration
│       │   └── ocrService.ts   # OCR text extraction
│       └── utils/
│           └── toast.ts        # Toast notifications
├── .env                        # Environment variables (add your API key)
├── .env.example                # Example environment file
├── package.json                # Dependencies
├── vite.config.ts              # Vite configuration
└── README.md                   # This file
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_GROQ_API_KEY=your-groq-api-key-here
```

Get your free API key from: https://console.groq.com/keys

## 🌐 Technology Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19, TypeScript, Tailwind CSS 4 |
| **Build** | Vite 7 |
| **AI Analysis** | Groq API (Mixtral 8x7B) |
| **OCR** | Tesseract.js, PDF.js |
| **Icons** | Lucide React |

## 📊 Supported Blood Metrics

The AI extracts and analyzes:
- Glucose (Fasting/Random)
- Total Cholesterol
- LDL Cholesterol
- HDL Cholesterol
- Triglycerides
- HbA1c
- Blood Pressure
- White Blood Cells (WBC)
- Red Blood Cells (RBC)
- Hemoglobin
- Hematocrit
- Platelets
- And more...

## ❌ Troubleshooting

### "VITE_GROQ_API_KEY is not defined"
**Solution:** Create `.env` file and add your API key:
```env
VITE_GROQ_API_KEY=your-key-here
```

### "Cannot find module" or "pnpm: command not found"
**Solution:** Reinstall dependencies:
```cmd
rmdir /s /q node_modules
pnpm install
pnpm dev
```

### "Port 3000 already in use"
**Solution:** Use a different port:
```cmd
set VITE_PORT=3001
pnpm dev
```
Then open: http://localhost:3001

### "Failed to extract text from image"
**Solution:** Try another image or PDF with better quality. Ensure:
- File is not corrupted
- Image is clear and readable
- PDF is not password-protected
- File size is under 10MB

### "Groq API request failed"
**Solution:** Check your API key:
1. Visit https://console.groq.com/keys
2. Verify your API key is correct
3. Update `.env` file
4. Restart the dev server

## 🚀 Deployment

### Build for Production
```cmd
pnpm build
```

This creates an optimized `dist/` folder ready for deployment.

### Deploy to Vercel
```cmd
npm install -g vercel
vercel
```

### Deploy to Netlify
```cmd
npm install -g netlify-cli
netlify deploy --prod --dir dist
```

### Deploy to GitHub Pages
1. Build: `pnpm build`
2. Push `dist/` folder to GitHub
3. Enable GitHub Pages in repository settings

## ⚠️ Important Notes

1. **Frontend-Only** - No server, all processing happens in the browser
2. **API Key Required** - Get free key from https://console.groq.com/keys
3. **Internet Required** - Needs internet for Groq API calls
4. **No History** - Results are not saved, only displayed
5. **Medical Disclaimer** - For informational purposes only
6. **File Size** - Maximum 10MB per file
7. **Supported Formats** - PDF, JPG, PNG

## ❓ FAQ

**Q: Do I need a server?**  
A: No! This is a frontend-only app. Everything runs in your browser.

**Q: Is the API key safe?**  
A: Your API key is stored locally in `.env`. Never commit it to version control.

**Q: Can I use this offline?**  
A: No, you need internet for Groq API calls.

**Q: How long does analysis take?**  
A: Usually 5-15 seconds depending on image quality and file size.

**Q: Can I export results?**  
A: Currently displays only. You can screenshot or copy text.

**Q: Is my data saved?**  
A: No. Results are displayed only, nothing is stored.

**Q: What if OCR fails?**  
A: Try a clearer image or PDF. Ensure text is readable.

**Q: Can I use this commercially?**  
A: Yes, but always consult healthcare providers for medical decisions.

## 📝 License

MIT License - Use freely for personal and commercial projects

## 🆘 Support

1. Check the troubleshooting section above
2. Verify `.env` file has your Groq API key
3. Check browser console for errors (Press F12)
4. Ensure Node.js and pnpm are installed correctly
5. Try reinstalling dependencies: `pnpm install`

## 🎯 Next Steps

1. ✅ Extract the ZIP file
2. ✅ Get Groq API key from https://console.groq.com/keys
3. ✅ Create `.env` file with your API key
4. ✅ Run `pnpm install`
5. ✅ Run `pnpm dev`
6. ✅ Open http://localhost:3000
7. ✅ Upload a blood report
8. ✅ Get AI analysis!

---

**Version:** 1.0.0 (Frontend-Only Edition)  
**Status:** Production Ready ✅  
**Last Updated:** February 13, 2026

Enjoy using MediAnalyze! 🏥❤️
