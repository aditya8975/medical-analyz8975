// import { useState, useRef } from 'react'
// import { Upload, Loader2, AlertCircle, CheckCircle, AlertTriangle, TrendingUp } from 'lucide-react'
// import { toast } from './utils/toast'
// import { analyzeBloodReport } from './services/groqService'
// import { extractTextFromImage } from './services/ocrService'

// interface AnalysisResult {
//   metrics: Array<{
//     name: string
//     value: string
//     status: 'high' | 'normal' | 'low'
//     normal: string
//   }>
//   risks: Array<{
//     condition: string
//     level: 'low' | 'moderate' | 'high' | 'critical'
//     percentage: number
//     reason: string
//   }>
//   recommendations: string[]
//   summary?: string
// }

// export default function App() {
//   const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
//   const [isLoading, setIsLoading] = useState(false)
//   const fileInputRef = useRef<HTMLInputElement>(null)
//   const dragRef = useRef<HTMLDivElement>(null)

//   const handleFileSelect = async (file: File) => {
//     const validTypes = ['application/pdf', 'image/jpeg', 'image/png']
//     if (!validTypes.includes(file.type)) {
//       toast.error('Invalid file type. Please upload PDF, JPG, or PNG.')
//       return
//     }

//     if (file.size > 10 * 1024 * 1024) {
//       toast.error('File too large. Maximum size is 10MB.')
//       return
//     }

//     await analyzeReport(file)
//   }

//   const analyzeReport = async (file: File) => {
//     setIsLoading(true)
//     try {
//       // Extract text from image/PDF
//       toast.loading('Extracting text from report...')
//       const extractedText = await extractTextFromImage(file)
      
//       if (!extractedText) {
//         throw new Error('Could not extract text from the image. Please try another image.')
//       }

//       // Analyze with Groq API
//       toast.loading('Analyzing blood report with AI...')
//       const result = await analyzeBloodReport(extractedText)
      
//       setAnalysisResult(result)
//       toast.success('Analysis completed successfully!')
//     } catch (error) {
//       const message = error instanceof Error ? error.message : 'Analysis failed'
//       toast.error(message)
//       console.error('Analysis error:', error)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleDragOver = (e: React.DragEvent) => {
//     e.preventDefault()
//     e.stopPropagation()
//     if (dragRef.current) {
//       dragRef.current.classList.add('border-blue-500', 'bg-blue-50')
//     }
//   }

//   const handleDragLeave = (e: React.DragEvent) => {
//     e.preventDefault()
//     e.stopPropagation()
//     if (dragRef.current) {
//       dragRef.current.classList.remove('border-blue-500', 'bg-blue-50')
//     }
//   }

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault()
//     e.stopPropagation()
//     if (dragRef.current) {
//       dragRef.current.classList.remove('border-blue-500', 'bg-blue-50')
//     }

//     const files = e.dataTransfer.files
//     if (files.length > 0) {
//       handleFileSelect(files[0])
//     }
//   }

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'high':
//         return 'text-red-600 bg-red-50'
//       case 'low':
//         return 'text-orange-600 bg-orange-50'
//       default:
//         return 'text-green-600 bg-green-50'
//     }
//   }

//   const getRiskColor = (level: string) => {
//     switch (level) {
//       case 'critical':
//         return 'bg-red-100 border-red-300 text-red-900'
//       case 'high':
//         return 'bg-orange-100 border-orange-300 text-orange-900'
//       case 'moderate':
//         return 'bg-yellow-100 border-yellow-300 text-yellow-900'
//       default:
//         return 'bg-green-100 border-green-300 text-green-900'
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
//       <div className="max-w-6xl mx-auto px-4 py-8">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <div className="flex items-center justify-center gap-3 mb-4">
//             <TrendingUp className="w-10 h-10 text-blue-600" />
//             <h1 className="text-4xl font-bold text-gray-900">MediAnalyze</h1>
//           </div>
//           <p className="text-lg text-gray-600">
//             AI-Powered Blood Test Report Analysis
//           </p>
//         </div>

//         {!analysisResult ? (
//           // Upload Section
//           <div className="max-w-2xl mx-auto">
//             <div className="p-8 border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors rounded-lg bg-white shadow-sm">
//               <div
//                 ref={dragRef}
//                 onDragOver={handleDragOver}
//                 onDragLeave={handleDragLeave}
//                 onDrop={handleDrop}
//                 className="text-center cursor-pointer transition-colors"
//               >
//                 <Upload className="w-16 h-16 text-blue-400 mx-auto mb-4" />
//                 <h2 className="text-2xl font-semibold text-gray-900 mb-2">
//                   Upload Your Blood Report
//                 </h2>
//                 <p className="text-gray-600 mb-6">
//                   Drag and drop your medical report here or click to browse
//                 </p>

//                 <input
//                   ref={fileInputRef}
//                   type="file"
//                   accept=".pdf,.jpg,.jpeg,.png"
//                   onChange={(e) => {
//                     if (e.target.files?.[0]) {
//                       handleFileSelect(e.target.files[0])
//                     }
//                   }}
//                   className="hidden"
//                 />

//                 <button
//                   onClick={() => fileInputRef.current?.click()}
//                   disabled={isLoading}
//                   className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
//                 >
//                   {isLoading ? (
//                     <>
//                       <Loader2 className="w-4 h-4 animate-spin" />
//                       Analyzing...
//                     </>
//                   ) : (
//                     <>
//                       <Upload className="w-4 h-4" />
//                       Select Report
//                     </>
//                   )}
//                 </button>

//                 <div className="mt-6 text-sm text-gray-500">
//                   <p>Supported formats: PDF, JPG, PNG</p>
//                   <p>Maximum file size: 10MB</p>
//                 </div>
//               </div>
//             </div>

//             {isLoading && (
//               <div className="mt-6 text-center">
//                 <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-2" />
//                 <p className="text-gray-600">Analyzing your blood report...</p>
//               </div>
//             )}
//           </div>
//         ) : (
//           // Results Section
//           <div className="space-y-6">
//             <div className="flex justify-between items-center">
//               <h2 className="text-3xl font-bold text-gray-900">Analysis Results</h2>
//               <button
//                 onClick={() => {
//                   setAnalysisResult(null)
//                 }}
//                 className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//               >
//                 Analyze Another Report
//               </button>
//             </div>

//             {/* Summary */}
//             {analysisResult.summary && (
//               <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-2">Summary</h3>
//                 <p className="text-gray-700">{analysisResult.summary}</p>
//               </div>
//             )}

//             {/* Blood Metrics */}
//             {analysisResult.metrics.length > 0 && (
//               <div>
//                 <h3 className="text-2xl font-bold text-gray-900 mb-4">Blood Metrics</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {analysisResult.metrics.map((metric, idx) => (
//                     <div key={idx} className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
//                       <div className="flex justify-between items-start mb-2">
//                         <h4 className="font-semibold text-gray-900">{metric.name}</h4>
//                         <span
//                           className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
//                             metric.status
//                           )}`}
//                         >
//                           {metric.status.toUpperCase()}
//                         </span>
//                       </div>
//                       <p className="text-2xl font-bold text-gray-900 mb-1">
//                         {metric.value}
//                       </p>
//                       <p className="text-sm text-gray-600">Normal: {metric.normal}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Health Risks */}
//             {analysisResult.risks.length > 0 && (
//               <div>
//                 <h3 className="text-2xl font-bold text-gray-900 mb-4">Health Risk Assessment</h3>
//                 <div className="space-y-3">
//                   {analysisResult.risks.map((risk, idx) => (
//                     <div
//                       key={idx}
//                       className={`p-4 border-l-4 rounded-lg ${getRiskColor(risk.level)}`}
//                     >
//                       <div className="flex items-start gap-3">
//                         {risk.level === 'critical' || risk.level === 'high' ? (
//                           <AlertTriangle className="w-5 h-5 mt-1 flex-shrink-0" />
//                         ) : (
//                           <AlertCircle className="w-5 h-5 mt-1 flex-shrink-0" />
//                         )}
//                         <div className="flex-1">
//                           <div className="flex justify-between items-start mb-1">
//                             <h4 className="font-semibold">{risk.condition}</h4>
//                             <span className="text-sm font-bold">{risk.percentage}%</span>
//                           </div>
//                           <p className="text-sm mb-2">{risk.reason}</p>
//                           <div className="w-full bg-gray-300 rounded-full h-2">
//                             <div
//                               className={`h-2 rounded-full ${
//                                 risk.level === 'critical'
//                                   ? 'bg-red-600'
//                                   : risk.level === 'high'
//                                   ? 'bg-orange-500'
//                                   : risk.level === 'moderate'
//                                   ? 'bg-yellow-500'
//                                   : 'bg-green-500'
//                               }`}
//                               style={{ width: `${risk.percentage}%` }}
//                             ></div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Recommendations */}
//             {analysisResult.recommendations.length > 0 && (
//               <div>
//                 <h3 className="text-2xl font-bold text-gray-900 mb-4">
//                   Health Recommendations
//                 </h3>
//                 <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
//                   <ul className="space-y-3">
//                     {analysisResult.recommendations.map((rec, idx) => (
//                       <li key={idx} className="flex gap-3">
//                         <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
//                         <span className="text-gray-700">{rec}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
//             )}

//             {/* Disclaimer */}
//             <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
//               <p className="text-sm text-gray-700">
//                 <strong>⚠️ Disclaimer:</strong> This analysis is for informational purposes only
//                 and should not replace professional medical advice. Please consult with qualified
//                 healthcare providers for medical decisions.
//               </p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }
import { useState, useRef } from 'react'
import { Upload, Loader2, AlertCircle, CheckCircle, AlertTriangle, TrendingUp, Download } from 'lucide-react'
import { toast } from './utils/toast'
import { analyzeBloodReport } from './services/groqService'
import { extractTextFromImage } from './services/ocrService'
import html2canvas from 'html2canvas-pro'
import jsPDF from 'jspdf'

interface AnalysisResult {
  metrics: Array<{
    name: string
    value: string
    status: 'high' | 'normal' | 'low'
    normal: string
  }>
  risks: Array<{
    condition: string
    level: 'low' | 'moderate' | 'high' | 'critical'
    percentage: number
    reason: string
  }>
  recommendations: string[]
  summary?: string
}

export default function App() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dragRef = useRef<HTMLDivElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  const handleFileSelect = async (file: File) => {
    const validTypes = ['application/pdf', 'image/jpeg', 'image/png']
    if (!validTypes.includes(file.type)) {
      toast.error('Invalid file type. Please upload PDF, JPG, or PNG.')
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error('File too large. Maximum size is 10MB.')
      return
    }

    await analyzeReport(file)
  }

  const analyzeReport = async (file: File) => {
    setIsLoading(true)
    try {
      // Extract text from image/PDF
      toast.loading('Extracting text from report...')
      const extractedText = await extractTextFromImage(file)
      
      if (!extractedText) {
        throw new Error('Could not extract text from the image. Please try another image.')
      }

      // Analyze with Groq API
      toast.loading('Analyzing blood report with AI...')
      const result = await analyzeBloodReport(extractedText)
      
      setAnalysisResult(result)
      toast.success('Analysis completed successfully!')
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Analysis failed'
      toast.error(message)
      console.error('Analysis error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (dragRef.current) {
      dragRef.current.classList.add('border-indigo-500', 'bg-indigo-50', 'shadow-md')
    }
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (dragRef.current) {
      dragRef.current.classList.remove('border-indigo-500', 'bg-indigo-50', 'shadow-md')
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (dragRef.current) {
      dragRef.current.classList.remove('border-indigo-500', 'bg-indigo-50', 'shadow-md')
    }

    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleExport = async () => {
    if (!resultsRef.current) return
    try {
      const canvas = await html2canvas(resultsRef.current, { scale: 2 })
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
      pdf.save('blood-report-analysis.pdf')
      toast.success('Report exported successfully!')
    } catch (error) {
      toast.error('Export failed')
      console.error('Export error:', error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'high':
        return 'text-red-700 bg-red-100 border-red-200'
      case 'low':
        return 'text-amber-700 bg-amber-100 border-amber-200'
      default:
        return 'text-green-700 bg-green-100 border-green-200'
    }
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'critical':
        return 'bg-red-50 border-red-400 text-red-900'
      case 'high':
        return 'bg-orange-50 border-orange-400 text-orange-900'
      case 'moderate':
        return 'bg-yellow-50 border-yellow-400 text-yellow-900'
      default:
        return 'bg-green-50 border-green-400 text-green-900'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 font-sans antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <TrendingUp className="w-12 h-12 text-indigo-600" />
            <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">MediAnalyze</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
         AI-Powered Blood Test Report Analysis Platform
          </p>
        </div>

        {!analysisResult ? (
          // Upload Section
          <div className="max-w-3xl mx-auto">
            <div className="p-8 sm:p-10 border-2 border-dashed border-gray-300 hover:border-indigo-500 transition-all duration-300 rounded-xl bg-white shadow-lg">
              <div
                ref={dragRef}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className="text-center cursor-pointer transition-all duration-300"
              >
                <Upload className="w-16 sm:w-20 h-16 sm:h-20 text-indigo-500 mx-auto mb-6" />
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                  Upload Your Blood Report
                </h2>
                <p className="text-base sm:text-lg text-gray-600 mb-8">
                  Securely drag and drop your medical report or click to browse files
                </p>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      handleFileSelect(e.target.files[0])
                    }
                  }}
                  className="hidden"
                />

                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isLoading}
                  className="px-8 sm:px-10 py-3 sm:py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 mx-auto shadow-md"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5" />
                      Select Report
                    </>
                  )}
                </button>

                <div className="mt-8 text-sm sm:text-base text-gray-500">
                  <p>Supported formats: PDF, JPG, PNG</p>
                  <p>Maximum file size: 10MB | All data processed securely</p>
                </div>
              </div>
            </div>

            {isLoading && (
              <div className="mt-8 text-center">
                <Loader2 className="w-10 h-10 animate-spin text-indigo-600 mx-auto mb-3" />
                <p className="text-lg text-gray-600">Analyzing your blood report securely...</p>
              </div>
            )}
          </div>
        ) : (
          // Results Section
          <div ref={resultsRef} className="space-y-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-4xl font-bold text-gray-900">Analysis Results</h2>
              <div className="flex gap-4">
                <button
                  onClick={handleExport}
                  className="px-6 sm:px-8 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300 font-medium flex items-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Export PDF
                </button>
                <button
                  onClick={() => {
                    setAnalysisResult(null)
                  }}
                  className="px-6 sm:px-8 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300 font-medium"
                >
                  Analyze New Report
                </button>
              </div>
            </div>

            {/* Summary */}
            {analysisResult.summary && (
              <div className="p-6 sm:p-8 bg-white border border-gray-200 rounded-xl shadow-md">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Executive Summary</h3>
                <p className="text-gray-700 text-lg leading-relaxed">{analysisResult.summary}</p>
              </div>
            )}

            {/* Blood Metrics */}
            {analysisResult.metrics.length > 0 && (
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">Blood Metrics Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {analysisResult.metrics.map((metric, idx) => (
                    <div key={idx} className="p-6 bg-white border border-gray-200 rounded-xl shadow-md transition-shadow hover:shadow-lg">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-semibold text-xl text-gray-900">{metric.name}</h4>
                        <span
                          className={`px-4 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                            metric.status
                          )}`}
                        >
                          {metric.status.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-3xl font-bold text-gray-900 mb-2">
                        {metric.value}
                      </p>
                      <p className="text-base text-gray-600">Reference Range: {metric.normal}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Health Risks */}
            {analysisResult.risks.length > 0 && (
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">Health Risk Assessment</h3>
                <div className="space-y-5">
                  {analysisResult.risks.map((risk, idx) => (
                    <div
                      key={idx}
                      className={`p-6 border-l-8 rounded-xl shadow-md ${getRiskColor(risk.level)}`}
                    >
                      <div className="flex items-start gap-4">
                        {risk.level === 'critical' || risk.level === 'high' ? (
                          <AlertTriangle className="w-6 h-6 mt-1 flex-shrink-0" />
                        ) : (
                          <AlertCircle className="w-6 h-6 mt-1 flex-shrink-0" />
                        )}
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold text-xl">{risk.condition}</h4>
                            <span className="text-base font-bold">{risk.percentage}% Risk</span>
                          </div>
                          <p className="text-base mb-3">{risk.reason}</p>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                              className={`h-3 rounded-full ${
                                risk.level === 'critical'
                                  ? 'bg-red-600'
                                  : risk.level === 'high'
                                  ? 'bg-orange-500'
                                  : risk.level === 'moderate'
                                  ? 'bg-yellow-500'
                                  : 'bg-green-500'
                              }`}
                              style={{ width: `${risk.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recommendations */}
            {analysisResult.recommendations.length > 0 && (
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  Personalized Health Recommendations
                </h3>
                <div className="p-6 sm:p-8 bg-white border border-gray-200 rounded-xl shadow-md">
                  <ul className="space-y-4">
                    {analysisResult.recommendations.map((rec, idx) => (
                      <li key={idx} className="flex gap-4 text-lg">
                        <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                        <span className="text-gray-700">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Disclaimer */}
            <div className="p-6 bg-amber-50 border border-amber-200 rounded-xl shadow-md">
              <p className="text-base text-gray-700">
                <strong>⚠️ Important Disclaimer:</strong> This analysis is provided for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always consult qualified healthcare professionals for medical decisions and interpretations.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}