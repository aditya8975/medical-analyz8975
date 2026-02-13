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

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY 
  


const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'

export async function analyzeBloodReport(extractedText: string): Promise<AnalysisResult> {
  if (!GROQ_API_KEY) {
    throw new Error(
      'Groq API key not configured. Please set VITE_GROQ_API_KEY environment variable.'
    )
  }

  const prompt = `You are a medical AI assistant specialized in analyzing blood test reports. 
  
Analyze the following extracted blood test report and provide:
1. Blood metrics with status (high/normal/low)
2. Health risks with severity levels
3. Personalized health recommendations

Extracted Report Text:
${extractedText}

Respond in JSON format with this exact structure:
{
  "summary": "Brief overview of the blood test results",
  "metrics": [
    {
      "name": "Metric name",
      "value": "value with unit",
      "status": "high|normal|low",
      "normal": "normal range"
    }
  ],
  "risks": [
    {
      "condition": "Potential condition name",
      "level": "low|moderate|high|critical",
      "percentage": 0-100,
      "reason": "Why this risk exists based on the metrics"
    }
  ],
  "recommendations": [
    "Actionable health recommendation 1",
    "Actionable health recommendation 2"
  ]
}

Important:
- Extract ALL blood metrics found in the report
- Assess health risks based on abnormal values
- Provide practical, actionable recommendations
- Be conservative with risk assessments
- Include normal ranges for metrics
- Return ONLY valid JSON, no additional text`

  try {
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: 'You are a medical AI assistant. Always respond with valid JSON only.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error?.message || 'Groq API request failed')
    }

    const data = await response.json()
    const content = data.choices[0]?.message?.content

    if (!content) {
      throw new Error('No response from Groq API')
    }

    // Parse JSON response
    const jsonMatch = content.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('Invalid JSON response from AI')
    }

    const result = JSON.parse(jsonMatch[0]) as AnalysisResult

    // Validate response structure
    if (!result.metrics || !Array.isArray(result.metrics)) {
      result.metrics = []
    }
    if (!result.risks || !Array.isArray(result.risks)) {
      result.risks = []
    }
    if (!result.recommendations || !Array.isArray(result.recommendations)) {
      result.recommendations = []
    }

    return result
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error('Failed to parse AI response. Please try again.')
    }
    throw error
  }
}
