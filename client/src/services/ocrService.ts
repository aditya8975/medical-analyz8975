import Tesseract from 'tesseract.js'
import * as pdfjsLib from 'pdfjs-dist'
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url'

// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc =pdfWorker

export async function extractTextFromImage(file: File): Promise<string> {
  try {
    if (file.type === 'application/pdf') {
      return await extractTextFromPDF(file)
    } else {
      return await extractTextFromImageFile(file)
    }
  } catch (error) {
    console.error('OCR extraction error:', error)
    throw new Error('Failed to extract text from the image. Please try another image.')
  }
}

async function extractTextFromImageFile(file: File): Promise<string> {
  const reader = new FileReader()

  return new Promise((resolve, reject) => {
    reader.onload = async (e) => {
      try {
        const imageData = e.target?.result as string

        const { data } = await Tesseract.recognize(imageData, 'eng', {
          logger: (m) => {
            console.log('OCR progress:', m)
          },
        })

        const text = data.text.trim()
        if (!text) {
          throw new Error('No text could be extracted from the image')
        }

        resolve(text)
      } catch (error) {
        reject(error)
      }
    }

    reader.onerror = () => {
      reject(new Error('Failed to read file'))
    }

    reader.readAsDataURL(file)
  })
}

async function extractTextFromPDF(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer()
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise

    let fullText = ''

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum)
      const textContent = await page.getTextContent()

      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ')

      fullText += pageText + '\n'
    }

    const text = fullText.trim()
    if (!text) {
      throw new Error('No text could be extracted from the PDF')
    }

    return text
  } catch (error) {
    console.error('PDF extraction error:', error)
    throw new Error('Failed to extract text from the PDF. Please try another file.')
  }
}
