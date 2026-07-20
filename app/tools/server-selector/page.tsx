"use client";

/**
 * MCP Server Selector Wizard
 * Interactive tool to recommend MCP server stacks
 */

import { useState } from 'react'

interface Recommendation {
  servers: string[]
  setupGuide: string[]
  estimatedLatency: number
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
}

interface FormData {
  useCase: string
  tools: string[]
  experience: string
  compliance: string
  location: string
}

const USE_CASES = [
  { id: 'assistant', name: 'AI Assistant / Chatbot', icon: '🤖' },
  { id: 'analytics', name: 'Data Analytics', icon: '📊' },
  { id: 'devops', name: 'DevOps Automation', icon: '⚙️' },
  { id: 'business', name: 'Business Workflows', icon: '💼' },
  { id: 'research', name: 'Research & Analysis', icon: '🔍' },
  { id: 'education', name: 'Education & Learning', icon: '🎓' },
  { id: 'support', name: 'Customer Support', icon: '🎧' },
  { id: 'creative', name: 'Creative Tools', icon: '🎨' }
]

const TOOLS = [
  'GitHub', 'GitLab', 'Bitbucket',
  'Slack', 'Discord', 'Microsoft Teams',
  'Notion', 'Airtable', 'Google Sheets',
  'PostgreSQL', 'MySQL', 'MongoDB', 'Redis',
  'Prometheus', 'Grafana', 'Datadog',
  'Gmail', 'Outlook', 'Calendar',
  'Stripe', 'PayPal', 'Razorpay',
  'Jira', 'Linear', 'Asana', 'Trello',
  'Figma', 'FigJam', 'Miro'
]

const COMPLIANCE = [
  { id: 'none', name: 'No specific requirements' },
  { id: 'dpdp', name: 'DPDP Act (India)' },
  { id: 'rbi', name: 'RBI Guidelines (India)' },
  { id: 'gdpr', name: 'GDPR (Europe)' },
  { id: 'ccpa', name: 'CCPA (California)' },
  { id: 'soc2', name: 'SOC 2' }
]

const LOCATIONS = [
  { id: 'mumbai', name: 'Mumbai, India', latency: 42 },
  { id: 'bengaluru', name: 'Bengaluru, India', latency: 45 },
  { id: 'hyderabad', name: 'Hyderabad, India', latency: 58 },
  { id: 'delhi', name: 'Delhi, India', latency: 62 },
  { id: 'global', name: 'Global (AWS/GCP)', latency: 280 }
]

const RECOMMENDATIONS: Record<string, Recommendation> = {
  assistant: {
    servers: ['Filesystem', 'Slack', 'Notion', 'Gmail'],
    setupGuide: [
      'Install MCP server binaries',
      'Configure Slack and Notion integrations',
      'Set up Gmail OAuth',
      'Test with sample queries'
    ],
    estimatedLatency: 45,
    difficulty: 'Beginner'
  },
  analytics: {
    servers: ['PostgreSQL', 'Redis', 'Prometheus', 'Grafana'],
    setupGuide: [
      'Set up PostgreSQL database',
      'Configure Redis for caching',
      'Deploy Prometheus metrics',
      'Create Grafana dashboards'
    ],
    estimatedLatency: 55,
    difficulty: 'Intermediate'
  },
  devops: {
    servers: ['GitHub', 'Docker', 'Kubernetes', 'Terraform'],
    setupGuide: [
      'Configure GitHub integration',
      'Set up Docker MCP server',
      'Deploy Kubernetes tools',
      'Connect Terraform for IaC'
    ],
    estimatedLatency: 120,
    difficulty: 'Advanced'
  },
  business: {
    servers: ['Airtable', 'Google Sheets', 'Slack', 'Calendar'],
    setupGuide: [
      'Connect Airtable base',
      'Configure Google Sheets API',
      'Set up Slack notifications',
      'Integrate calendar system'
    ],
    estimatedLatency: 65,
    difficulty: 'Beginner'
  },
  research: {
    servers: ['GitHub', 'ArXiv', 'Semantic Scholar', 'Notion'],
    setupGuide: [
      'Configure GitHub research tools',
      'Set up academic API integrations',
      'Create Notion knowledge base',
      'Test research workflows'
    ],
    estimatedLatency: 95,
    difficulty: 'Intermediate'
  },
  education: {
    servers: ['Google Classroom', 'Notion', 'Calendar', 'Drive'],
    setupGuide: [
      'Connect Google Classroom',
      'Set up Notion templates',
      'Configure calendar sync',
      'Test educational workflows'
    ],
    estimatedLatency: 75,
    difficulty: 'Beginner'
  },
  support: {
    servers: ['Zendesk', 'Intercom', 'Slack', 'Notion'],
    setupGuide: [
      'Configure Zendesk integration',
      'Set up Intercom tools',
      'Connect Slack channels',
      'Create Notion knowledge base'
    ],
    estimatedLatency: 85,
    difficulty: 'Intermediate'
  },
  creative: {
    servers: ['Figma', 'GitHub', 'Notion', 'Slack'],
    setupGuide: [
      'Connect Figma design tools',
      'Set up GitHub for assets',
      'Create Notion project boards',
      'Configure Slack notifications'
    ],
    estimatedLatency: 90,
    difficulty: 'Intermediate'
  }
}

export default function ServerSelector() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    useCase: '',
    tools: [],
    experience: '',
    compliance: '',
    location: 'mumbai'
  })
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null)

  const updateField = (field: keyof FormData, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const getNextStep = () => setStep(step + 1)
  const getPrevStep = () => setStep(step - 1)

  const generateRecommendation = () => {
    const rec = RECOMMENDATIONS[formData.useCase] || RECOMMENDATIONS.assistant
    setRecommendation(rec)
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">MCP Server Selector</h1>
      
      <div className="bg-white rounded-lg shadow p-6">
        {/* Step 1: Use Case */}
        {step === 1 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">What are you building?</h2>
            <p className="text-gray-600 mb-6">Select your primary use case to get personalized recommendations.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {USE_CASES.map(useCase => (
                <button
                  key={useCase.id}
                  onClick={() => {
                    updateField('useCase', useCase.id)
                    getNextStep()
                  }}
                  className="p-4 border rounded-lg hover:border-blue-500 hover:shadow-md transition-all"
                >
                  <div className="text-2xl mb-2">{useCase.icon}</div>
                  <div className="font-medium">{useCase.name}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Tools */}
        {step === 2 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Which tools do you need?</h2>
            <p className="text-gray-600 mb-4">Select all tools you want to integrate with your MCP server.</p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-6">
              {TOOLS.map(tool => {
                const isSelected = formData.tools.includes(tool)
                return (
                  <label key={tool} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={(e) => {
                        if (e.target.checked) {
                          updateField('tools', [...formData.tools as string[], tool])
                        } else {
                          updateField('tools', (formData.tools as string[]).filter(t => t !== tool))
                        }
                      }}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm">{tool}</span>
                  </label>
                )
              })}
            </div>
            
            <div className="flex space-x-3">
              <button onClick={getPrevStep} className="px-4 py-2 text-gray-600 hover:text-gray-900">
                Back
              </button>
              <button
                onClick={getNextStep}
                className="ml-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Experience */}
        {step === 3 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">What's your experience level?</h2>
            <p className="text-gray-600 mb-4">This helps us recommend the right complexity level.</p>
            
            <div className="space-y-3 mb-6">
              {['Beginner', 'Intermediate', 'Advanced'].map(level => (
                <label key={level} className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:border-blue-500">
                  <input
                    type="radio"
                    name="experience"
                    checked={formData.experience === level}
                    onChange={() => updateField('experience', level)}
                    className="text-blue-600"
                  />
                  <div>
                    <div className="font-medium">{level}</div>
                    <div className="text-sm text-gray-500">
                      {level === 'Beginner' && 'New to MCP, need step-by-step guidance'}
                      {level === 'Intermediate' && 'Some MCP experience, comfortable with APIs'}
                      {level === 'Advanced' && 'Experienced developer, building complex systems'}
                    </div>
                  </div>
                </label>
              ))}
            </div>
            
            <div className="flex space-x-3">
              <button onClick={getPrevStep} className="px-4 py-2 text-gray-600 hover:text-gray-900">
                Back
              </button>
              <button
                onClick={getNextStep}
                className="ml-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Compliance */}
        {step === 4 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Any compliance requirements?</h2>
            <p className="text-gray-600 mb-4">Select any regulations your deployment must follow.</p>
            
            <div className="space-y-2 mb-6">
              {COMPLIANCE.map(comp => (
                <label key={comp.id} className="flex items-center p-3 border rounded-lg cursor-pointer hover:border-blue-500">
                  <input
                    type="radio"
                    name="compliance"
                    checked={formData.compliance === comp.id}
                    onChange={() => updateField('compliance', comp.id)}
                    className="text-blue-600 mr-3"
                  />
                  <span>{comp.name}</span>
                </label>
              ))}
            </div>
            
            <div className="flex space-x-3">
              <button onClick={getPrevStep} className="px-4 py-2 text-gray-600 hover:text-gray-900">
                Back
              </button>
              <button
                onClick={getNextStep}
                className="ml-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Location */}
        {step === 5 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Where are your users?</h2>
            <p className="text-gray-600 mb-4">Select your primary location for optimal latency recommendations.</p>
            
            <div className="space-y-2 mb-6">
              {LOCATIONS.map(loc => (
                <label key={loc.id} className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:border-blue-500">
                  <div>
                    <input
                      type="radio"
                      name="location"
                      checked={formData.location === loc.id}
                      onChange={() => updateField('location', loc.id)}
                      className="text-blue-600 mr-3"
                    />
                    <span>{loc.name}</span>
                  </div>
                  <span className="text-sm text-gray-500">{loc.latency}ms avg</span>
                </label>
              ))}
            </div>
            
            <div className="flex space-x-3">
              <button onClick={getPrevStep} className="px-4 py-2 text-gray-600 hover:text-gray-900">
                Back
              </button>
              <button
                onClick={generateRecommendation}
                className="ml-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Get Recommendation
              </button>
            </div>
          </div>
        )}

        {/* Results */}
        {step === 6 && recommendation && (
          <div>
            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded">
              <div className="flex items">
                <div className="ml-3">
                  <h3 className="text-lg font-semibold text-green-800">Your Recommended Stack</h3>
                  <p className="text-green-700">Based on your inputs, here's your MCP server recommendation.</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Recommended Servers</h3>
                <ul className="space-y-2">
                  {recommendation.servers.map(server => (
                    <li key={server} className="flex items-center space-x-3 p-3 bg-gray-50 rounded">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>{server}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">Setup Guide</h3>
                <ol className="space-y-2">
                  {recommendation.setupGuide.map((step, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="font-medium text-blue-600">{index + 1}.</span>
                      <span className="text-sm">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded text-center">
                <p className="text-sm text-gray-600">Estimated Latency</p>
                <p className="text-xl font-bold text-blue-600">{recommendation.estimatedLatency}ms</p>
              </div>
              <div className="bg-green-50 p-4 rounded text-center">
                <p className="text-sm text-gray-600">Difficulty</p>
                <p className="text-xl font-bold text-green-600">{recommendation.difficulty}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded text-center">
                <p className="text-sm text-gray-600">Time to Setup</p>
                <p className="text-xl font-bold text-purple-600">
                  {recommendation.difficulty === 'Beginner' ? '1-2 hrs' : 
                   recommendation.difficulty === 'Intermediate' ? '2-4 hrs' : '4-8 hrs'}
                </p>
              </div>
            </div>
            
            <div className="mt-6 flex space-x-3">
              <button onClick={() => setStep(1)} className="px-4 py-2 text-gray-600 hover:text-gray-900">
                Start Over
              </button>
              <button className="ml-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Download Setup Guide
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}