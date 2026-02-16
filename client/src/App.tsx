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
//end
// import { useState, useRef } from 'react'
// import { Upload, Loader2, AlertCircle, CheckCircle, AlertTriangle, TrendingUp, Download } from 'lucide-react'
// import { toast } from './utils/toast'
// import { analyzeBloodReport } from './services/groqService'
// import { extractTextFromImage } from './services/ocrService'
// import html2canvas from 'html2canvas-pro'
// import jsPDF from 'jspdf'

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
//   const resultsRef = useRef<HTMLDivElement>(null)

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
//       dragRef.current.classList.add('border-indigo-500', 'bg-indigo-50', 'shadow-md')
//     }
//   }

//   const handleDragLeave = (e: React.DragEvent) => {
//     e.preventDefault()
//     e.stopPropagation()
//     if (dragRef.current) {
//       dragRef.current.classList.remove('border-indigo-500', 'bg-indigo-50', 'shadow-md')
//     }
//   }

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault()
//     e.stopPropagation()
//     if (dragRef.current) {
//       dragRef.current.classList.remove('border-indigo-500', 'bg-indigo-50', 'shadow-md')
//     }

//     const files = e.dataTransfer.files
//     if (files.length > 0) {
//       handleFileSelect(files[0])
//     }
//   }

//   const handleExport = async () => {
//     if (!resultsRef.current) return
//     try {
//       const canvas = await html2canvas(resultsRef.current, { scale: 2 })
//       const imgData = canvas.toDataURL('image/png')
//       const pdf = new jsPDF('p', 'mm', 'a4')
//       const pdfWidth = pdf.internal.pageSize.getWidth()
//       const pdfHeight = (canvas.height * pdfWidth) / canvas.width
//       pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
//       pdf.save('blood-report-analysis.pdf')
//       toast.success('Report exported successfully!')
//     } catch (error) {
//       toast.error('Export failed')
//       console.error('Export error:', error)
//     }
//   }

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'high':
//         return 'text-red-700 bg-red-100 border-red-200'
//       case 'low':
//         return 'text-amber-700 bg-amber-100 border-amber-200'
//       default:
//         return 'text-green-700 bg-green-100 border-green-200'
//     }
//   }

//   const getRiskColor = (level: string) => {
//     switch (level) {
//       case 'critical':
//         return 'bg-red-50 border-red-400 text-red-900'
//       case 'high':
//         return 'bg-orange-50 border-orange-400 text-orange-900'
//       case 'moderate':
//         return 'bg-yellow-50 border-yellow-400 text-yellow-900'
//       default:
//         return 'bg-green-50 border-green-400 text-green-900'
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 font-sans antialiased">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         {/* Header */}
//         <div className="text-center mb-16">
//           <div className="flex items-center justify-center gap-4 mb-6">
//             <TrendingUp className="w-12 h-12 text-indigo-600" />
//             <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">MediAnalyze</h1>
//           </div>
//           <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//          AI-Powered Blood Test Report Analysis Platform
//           </p>
//         </div>

//         {!analysisResult ? (
//           // Upload Section
//           <div className="max-w-3xl mx-auto">
//             <div className="p-8 sm:p-10 border-2 border-dashed border-gray-300 hover:border-indigo-500 transition-all duration-300 rounded-xl bg-white shadow-lg">
//               <div
//                 ref={dragRef}
//                 onDragOver={handleDragOver}
//                 onDragLeave={handleDragLeave}
//                 onDrop={handleDrop}
//                 className="text-center cursor-pointer transition-all duration-300"
//               >
//                 <Upload className="w-16 sm:w-20 h-16 sm:h-20 text-indigo-500 mx-auto mb-6" />
//                 <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
//                   Upload Your Blood Report
//                 </h2>
//                 <p className="text-base sm:text-lg text-gray-600 mb-8">
//                   Securely drag and drop your medical report or click to browse files
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
//                   className="px-8 sm:px-10 py-3 sm:py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 mx-auto shadow-md"
//                 >
//                   {isLoading ? (
//                     <>
//                       <Loader2 className="w-5 h-5 animate-spin" />
//                       Processing...
//                     </>
//                   ) : (
//                     <>
//                       <Upload className="w-5 h-5" />
//                       Select Report
//                     </>
//                   )}
//                 </button>

//                 <div className="mt-8 text-sm sm:text-base text-gray-500">
//                   <p>Supported formats: PDF, JPG, PNG</p>
//                   <p>Maximum file size: 10MB | All data processed securely</p>
//                 </div>
//               </div>
//             </div>

//             {isLoading && (
//               <div className="mt-8 text-center">
//                 <Loader2 className="w-10 h-10 animate-spin text-indigo-600 mx-auto mb-3" />
//                 <p className="text-lg text-gray-600">Analyzing your blood report securely...</p>
//               </div>
//             )}
//           </div>
//         ) : (
//           // Results Section
//           <div ref={resultsRef} className="space-y-10">
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//               <h2 className="text-4xl font-bold text-gray-900">Analysis Results</h2>
//               <div className="flex gap-4">
//                 <button
//                   onClick={handleExport}
//                   className="px-6 sm:px-8 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300 font-medium flex items-center gap-2"
//                 >
//                   <Download className="w-5 h-5" />
//                   Export PDF
//                 </button>
//                 <button
//                   onClick={() => {
//                     setAnalysisResult(null)
//                   }}
//                   className="px-6 sm:px-8 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300 font-medium"
//                 >
//                   Analyze New Report
//                 </button>
//               </div>
//             </div>

//             {/* Summary */}
//             {analysisResult.summary && (
//               <div className="p-6 sm:p-8 bg-white border border-gray-200 rounded-xl shadow-md">
//                 <h3 className="text-2xl font-semibold text-gray-900 mb-4">Executive Summary</h3>
//                 <p className="text-gray-700 text-lg leading-relaxed">{analysisResult.summary}</p>
//               </div>
//             )}

//             {/* Blood Metrics */}
//             {analysisResult.metrics.length > 0 && (
//               <div>
//                 <h3 className="text-3xl font-bold text-gray-900 mb-6">Blood Metrics Overview</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {analysisResult.metrics.map((metric, idx) => (
//                     <div key={idx} className="p-6 bg-white border border-gray-200 rounded-xl shadow-md transition-shadow hover:shadow-lg">
//                       <div className="flex justify-between items-start mb-3">
//                         <h4 className="font-semibold text-xl text-gray-900">{metric.name}</h4>
//                         <span
//                           className={`px-4 py-1 rounded-full text-sm font-medium border ${getStatusColor(
//                             metric.status
//                           )}`}
//                         >
//                           {metric.status.toUpperCase()}
//                         </span>
//                       </div>
//                       <p className="text-3xl font-bold text-gray-900 mb-2">
//                         {metric.value}
//                       </p>
//                       <p className="text-base text-gray-600">Reference Range: {metric.normal}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Health Risks */}
//             {analysisResult.risks.length > 0 && (
//               <div>
//                 <h3 className="text-3xl font-bold text-gray-900 mb-6">Health Risk Assessment</h3>
//                 <div className="space-y-5">
//                   {analysisResult.risks.map((risk, idx) => (
//                     <div
//                       key={idx}
//                       className={`p-6 border-l-8 rounded-xl shadow-md ${getRiskColor(risk.level)}`}
//                     >
//                       <div className="flex items-start gap-4">
//                         {risk.level === 'critical' || risk.level === 'high' ? (
//                           <AlertTriangle className="w-6 h-6 mt-1 flex-shrink-0" />
//                         ) : (
//                           <AlertCircle className="w-6 h-6 mt-1 flex-shrink-0" />
//                         )}
//                         <div className="flex-1">
//                           <div className="flex justify-between items-start mb-2">
//                             <h4 className="font-semibold text-xl">{risk.condition}</h4>
//                             <span className="text-base font-bold">{risk.percentage}% Risk</span>
//                           </div>
//                           <p className="text-base mb-3">{risk.reason}</p>
//                           <div className="w-full bg-gray-200 rounded-full h-3">
//                             <div
//                               className={`h-3 rounded-full ${
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
//                 <h3 className="text-3xl font-bold text-gray-900 mb-6">
//                   Personalized Health Recommendations
//                 </h3>
//                 <div className="p-6 sm:p-8 bg-white border border-gray-200 rounded-xl shadow-md">
//                   <ul className="space-y-4">
//                     {analysisResult.recommendations.map((rec, idx) => (
//                       <li key={idx} className="flex gap-4 text-lg">
//                         <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
//                         <span className="text-gray-700">{rec}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
//             )}

//             {/* Disclaimer */}
//             <div className="p-6 bg-amber-50 border border-amber-200 rounded-xl shadow-md">
//               <p className="text-base text-gray-700">
//                 <strong>⚠️ Important Disclaimer:</strong> This analysis is provided for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always consult qualified healthcare professionals for medical decisions and interpretations.
//               </p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Upload, FileText, Brain, CheckCircle, AlertTriangle, AlertCircle, Loader2, ArrowRight, Zap, Shield, Clock } from 'lucide-react';
import { extractTextFromImage } from '@/services/ocrService';
import { analyzeBloodReport } from '@/services/groqService';
import { toast } from '@/utils/toast';

interface AnalysisResult {
  metrics: Array<{
    name: string;
    value: string;
    status: 'high' | 'normal' | 'low';
    normal: string;
  }>;
  risks: Array<{
    condition: string;
    level: 'low' | 'moderate' | 'high' | 'critical';
    percentage: number;
    reason: string;
  }>;
  recommendations: string[];
  summary?: string;
}

/**
 * Design Philosophy: Vibrant Healthcare with Modern Energy
 * - Approachable Authority: Professional yet warm and human-centered
 * - Vibrant Accents: Teal (#14B8A6), Coral (#FF6B6B), Gold (#FBBF24)
 * - Organic Shapes: Rounded corners and flowing layouts
 * - Narrative-Driven: Visual storytelling through illustrations
 */
export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [extractedText, setExtractedText] = useState('');

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type === 'application/pdf' || file.type.startsWith('image/')) {
        setSelectedFile(file);
        setAnalysisResult(null);
        setExtractedText('');
      } else {
        toast.error('Please upload an image (JPG, PNG) or PDF file');
      }
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      toast.error('Please select a medical report file');
      return;
    }

    setIsAnalyzing(true);
    const loadingToast = toast.loading('Extracting text from report...');

    try {
      // Step 1: Extract text using OCR
      const text = await extractTextFromImage(selectedFile);
      setExtractedText(text);

      // Step 2: Analyze with AI
      toast.loading('Analyzing with AI...');
      const result = await analyzeBloodReport(text);
      setAnalysisResult(result);
      toast.success('Analysis complete!');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Analysis failed';
      toast.error(message);
      setAnalysisResult(null);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'critical':
        return 'border-l-8 border-red-600 bg-red-50';
      case 'high':
        return 'border-l-8 border-orange-500 bg-orange-50';
      case 'moderate':
        return 'border-l-8 border-yellow-500 bg-yellow-50';
      default:
        return 'border-l-8 border-green-500 bg-green-50';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'high':
        return 'border border-red-300 bg-red-50 text-red-700';
      case 'low':
        return 'border border-blue-300 bg-blue-50 text-blue-700';
      default:
        return 'border border-green-300 bg-green-50 text-green-700';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Medicare AI</h1>
              <p className="text-xs text-gray-500">Medical Report Analysis</p>
            </div>
          </div>
          
        </div>
      </header>

      {/* Hero Section */}
      {!analysisResult && (
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 className="display-lg text-gray-900">
                    Understand Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-500">Medical Reports</span> Instantly
                  </h1>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    Upload your blood test report and get AI-powered insights about your health metrics, potential risks, and personalized recommendations in seconds.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                    onClick={() => document.getElementById('file-input')?.click()}
                  >
                    <Upload className="w-5 h-5 mr-2" />
                    Upload Report
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-gray-300 hover:border-teal-500 hover:bg-teal-50 rounded-xl font-semibold"
                  >
                     <a
    href="https://github.com/aditya8975/medical-analyz8975"
    target="_blank"
    rel="noopener noreferrer"
  >
    Learn More
  </a>
                  </Button>
                </div>

                <div className="flex gap-8 pt-4">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-teal-500" />
                    <span className="text-sm text-gray-600">100% Private</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-teal-500" />
                    <span className="text-sm text-gray-600">15-30 seconds</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-teal-500" />
                    <span className="text-sm text-gray-600">AI-Powered</span>
                  </div>
                </div>
              </div>

              {/* Right Image */}
              <div className="relative">
                <img
                  src="https://private-us-east-1.manuscdn.com/sessionFile/Mqi9rHKgnqY2fwQbAhNrwr/sandbox/NxsLWH5NHVCJvXKMVlc4L1-img-1_1771154844000_na1fn_aGVyby1tZWRpY2FsLWFuYWx5c2lz.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvTXFpOXJIS2ducVkyZndRYkFoTnJ3ci9zYW5kYm94L054c0xXSDVOSFZDSnZYS01WbGM0TDEtaW1nLTFfMTc3MTE1NDg0NDAwMF9uYTFmbl9hR1Z5YnkxdFpXUnBZMkZzTFdGdVlXeDVjMmx6LnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=U~didqlsVJi0GLJ6Sj9BN9jWme7gONbS36lUX0ql5gzHAy73aH0Eadky5kcqTzz59sH2NguIfsnEZ7kdnTAFSQHeGocq6tSHcpsZ828q-4J6dl-IUUBtZA5XwXwqYBeK2jfMCdPcN5lmG2m1viOgC4q38211~WIfA~v56LLAz-wVE6T7C2noidVAt48GqIcNRu-o5IxRxIr7FPPq74kMgfms7GJ8N6y57t4noVbsmBQ4tUJXZ3uuoFt0kJspW5IwSZxT6eukniJ2Cfzkedj2K2ujdSzTo1pJtN74rkS6UyOeshnHHxWFwyDKKRCQIypsgxEtceZVQN82G6GQrTZnGA__"
                  alt="Medical Analysis"
                  className="rounded-2xl shadow-2xl object-cover w-full h-96"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* How It Works Section */}
      {!analysisResult && (
        <section className="py-20 bg-gradient-to-b from-white to-blue-50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="heading-lg text-gray-900 mb-4">How It Works</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Simple 4-step process to analyze your medical reports with AI
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {[
                {
                  step: 1,
                  title: 'Upload Document',
                  description: 'Upload your blood test report as an image or PDF',
                  icon: Upload,
                  color: 'from-teal-500 to-teal-600',
                },
                {
                  step: 2,
                  title: 'Extract Text',
                  description: 'Advanced OCR extracts all data from your report',
                  icon: FileText,
                  color: 'from-coral-500 to-red-500',
                },
                {
                  step: 3,
                  title: 'AI Analysis',
                  description: 'Groq AI analyzes metrics and identifies risks',
                  icon: Brain,
                  color: 'from-yellow-500 to-orange-500',
                },
                {
                  step: 4,
                  title: 'Get Results',
                  description: 'Receive personalized health recommendations',
                  icon: CheckCircle,
                  color: 'from-green-500 to-emerald-500',
                },
              ].map((item, idx) => (
                <div key={idx} className="relative">
                  <Card className="p-8 rounded-2xl border-2 border-gray-200 hover:border-teal-300 transition-all duration-300 hover:shadow-lg h-full">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 shadow-lg`}>
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <span className="text-sm font-bold text-gray-600">{item.step}</span>
                    </div>
                    <h3 className="heading-md text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </Card>
                  {idx < 3 && (
                    <div className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                      <ArrowRight className="w-8 h-8 text-teal-500" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Upcoming Features Section */}
      {!analysisResult && (
        <section className="py-20 bg-white">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="heading-lg text-gray-900 mb-4">Coming Soon</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Exciting features to enhance your healthcare experience
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Report Comparison',
                  description: 'Compare multiple reports over time to track health trends',
                  icon: '📊',
                },
                {
                  title: 'Advanced Analytics',
                  description: 'Detailed graphs and visualizations of your health metrics',
                  icon: '📈',
                },
                {
                  title: 'Export to PDF',
                  description: 'Download your analysis results as a professional PDF report',
                  icon: '📄',
                },
                {
                  title: 'Multi-Language Support',
                  description: 'Access the platform in your preferred language',
                  icon: '🌍',
                },
                {
                  title: 'Doctor Integration',
                  description: 'Share results securely with your healthcare provider',
                  icon: '👨‍⚕️',
                },
                {
                  title: 'Mobile App',
                  description: 'Native iOS and Android apps for on-the-go analysis',
                  icon: '📱',
                },
              ].map((feature, idx) => (
                <Card
                  key={idx}
                  className="p-8 rounded-2xl border-2 border-gray-200 hover:border-teal-300 transition-all duration-300 hover:shadow-lg hover:scale-105"
                >
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3 className="heading-md text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                  <div className="mt-4 inline-block px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full">
                    Coming Soon
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Analysis Tool Section */}
      <section className={`${analysisResult ? 'py-8' : 'py-20'} bg-gradient-to-b from-blue-50 to-white`}>
        <div className="container">
          {!analysisResult ? (
            <div className="max-w-2xl mx-auto">
              <Card className="p-12 rounded-3xl border-2 border-dashed border-teal-300 bg-gradient-to-br from-teal-50 to-cyan-50">
                <div className="text-center space-y-8">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center mx-auto shadow-lg">
                    <Upload className="w-10 h-10 text-white" />
                  </div>

                  <div>
                    <h2 className="heading-lg text-gray-900 mb-3">Upload Your Medical Report</h2>
                    <p className="text-gray-600 text-lg">
                      Supported formats: JPG, PNG, PDF (Max 10MB)
                    </p>
                  </div>

                  <input
                    id="file-input"
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileSelect}
                    className="hidden"
                  />

                  <div className="space-y-4">
                    <Button
                      size="lg"
                      className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                      onClick={() => document.getElementById('file-input')?.click()}
                    >
                      <Upload className="w-5 h-5 mr-2" />
                      Choose File
                    </Button>

                    {selectedFile && (
                      <div className="space-y-4">
                        <div className="p-4 bg-white rounded-xl border-2 border-teal-200">
                          <p className="text-sm text-gray-600">
                            <span className="font-semibold text-gray-900">Selected:</span> {selectedFile.name}
                          </p>
                        </div>
                        <Button
                          size="lg"
                          className="w-full bg-gradient-to-r from-coral-500 to-red-500 hover:from-coral-600 hover:to-red-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                          onClick={handleAnalyze}
                          disabled={isAnalyzing}
                        >
                          {isAnalyzing ? (
                            <>
                              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                              Analyzing...
                            </>
                          ) : (
                            <>
                              <Brain className="w-5 h-5 mr-2" />
                              Analyze with AI
                            </>
                          )}
                        </Button>
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-gray-500">
                    🔒 Your data is processed locally and never stored on our servers
                  </p>
                </div>
              </Card>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="heading-lg text-gray-900">Analysis Results</h2>
                <Button
                  variant="outline"
                  className="rounded-xl"
                  onClick={() => {
                    setAnalysisResult(null);
                    setSelectedFile(null);
                    setExtractedText('');
                  }}
                >
                  Analyze Another Report
                </Button>
              </div>

              {/* Summary */}
              {analysisResult.summary && (
                <Card className="p-8 rounded-2xl border-2 border-teal-200 bg-gradient-to-br from-teal-50 to-cyan-50">
                  <h3 className="heading-md text-gray-900 mb-4">Summary</h3>
                  <p className="text-gray-700 leading-relaxed">{analysisResult.summary}</p>
                </Card>
              )}

              {/* Blood Metrics */}
              {analysisResult.metrics.length > 0 && (
                <div>
                  <h3 className="heading-md text-gray-900 mb-6">Blood Metrics Overview</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {analysisResult.metrics.map((metric, idx) => (
                      <Card
                        key={idx}
                        className="p-6 rounded-2xl border-2 border-gray-200 hover:border-teal-300 transition-all duration-300 hover:shadow-lg"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="font-semibold text-lg text-gray-900">{metric.name}</h4>
                          <span className={`px-4 py-1 rounded-full text-sm font-medium border ${getStatusColor(metric.status)}`}>
                            {metric.status.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-4xl font-bold text-gray-900 mb-3">{metric.value}</p>
                        <p className="text-sm text-gray-600">Reference Range: {metric.normal}</p>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Health Risks */}
              {analysisResult.risks.length > 0 && (
                <div>
                  <h3 className="heading-md text-gray-900 mb-6">Health Risk Assessment</h3>
                  <div className="space-y-5">
                    {analysisResult.risks.map((risk, idx) => (
                      <Card
                        key={idx}
                        className={`p-6 rounded-2xl ${getRiskColor(risk.level)} transition-all duration-300`}
                      >
                        <div className="flex items-start gap-4">
                          {risk.level === 'critical' || risk.level === 'high' ? (
                            <AlertTriangle className="w-6 h-6 mt-1 flex-shrink-0" />
                          ) : (
                            <AlertCircle className="w-6 h-6 mt-1 flex-shrink-0" />
                          )}
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-3">
                              <h4 className="font-semibold text-lg text-gray-900">{risk.condition}</h4>
                              <span className="text-lg font-bold text-gray-900">{risk.percentage}% Risk</span>
                            </div>
                            <p className="text-gray-700 mb-4">{risk.reason}</p>
                            <div className="w-full bg-gray-300 rounded-full h-3 overflow-hidden">
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
                              />
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommendations */}
              {analysisResult.recommendations.length > 0 && (
                <div>
                  <h3 className="heading-md text-gray-900 mb-6">Personalized Health Recommendations</h3>
                  <Card className="p-8 rounded-2xl border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
                    <ul className="space-y-4">
                      {analysisResult.recommendations.map((rec, idx) => (
                        <li key={idx} className="flex gap-4 text-lg">
                          <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                          <span className="text-gray-700">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </div>
              )}

              {/* Disclaimer */}
              <Card className="p-6 rounded-2xl border-2 border-yellow-200 bg-yellow-50">
                <p className="text-gray-700 leading-relaxed">
                  <strong className="text-yellow-900">⚠️ Important Disclaimer:</strong> This analysis is provided for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always consult qualified healthcare professionals for medical decisions and interpretations.
                </p>
              </Card>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50 py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Medicare AI</h4>
              <p className="text-sm text-gray-600">AI-powered medical report analysis for better health insights.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Features</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-teal-600">OCR Analysis</a></li>
                <li><a href="#" className="hover:text-teal-600">AI Insights</a></li>
                <li><a href="#" className="hover:text-teal-600">Health Risks</a></li>
                <li><a href="#" className="hover:text-teal-600">Recommendations</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-teal-600">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-teal-600">Terms of Service</a></li>
                <li><a href="#" className="hover:text-teal-600">Disclaimer</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Email: info@medicare-ai.com</li>
                <li>Support: support@medicare-ai.com</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-300 pt-8 text-center text-sm text-gray-600">
            <p>&copy; 2026 Medicare AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
