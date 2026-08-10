"use client"

import { useMemo } from "react"

export interface ContentPage {
  title: string
  description: string
  keywords: string[]
  schemaType: string
  wordCount: number
  content: string
  faq?: Array<{ question: string; answer: string }>
  ugc?: {
    reviews: Array<{ author: string; rating: number; text: string; date: string }>
    discussions: Array<{ platform: string; title: string; url: string; excerpt: string }>
    caseStudies: Array<{ company: string; challenge: string; solution: string; outcome: string }>
  }
}

interface GeneratedContentProps {
  content: ContentPage | null
}

export default function GeneratedContent({ content }: GeneratedContentProps) {
  const faqSection = useMemo(() => {
    if (!content?.faq?.length) return null
    return (
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {content.faq.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
              <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: markdownToHtml(faq.answer) }} />
            </div>
          ))}
        </div>
      </div>
    )
  }, [content?.faq])

  const ugcSection = useMemo(() => {
    if (!content?.ugc) return null
    return (
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Community Insights</h2>
        {content.ugc.reviews.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">User Reviews</h3>
            <div className="space-y-4">
              {content.ugc.reviews.map((review, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="font-semibold text-gray-900">{review.author}</div>
                    <div className="flex items-center" aria-label={`${review.rating} out of 5 stars`}>
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-5 h-5 ${i < review.rating ? "text-yellow-400" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 mb-2">{review.text}</p>
                  <div className="text-sm text-gray-500">{review.date}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        {content.ugc.discussions.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Community Discussions</h3>
            <div className="space-y-3">
              {content.ugc.discussions.map((discussion, index) => (
                <a key={index} href={safeHref(discussion.url)} className="block border border-gray-200 rounded-lg p-4 hover:border-blue-400 transition" rel={isExternalUrl(discussion.url) ? "noopener noreferrer" : undefined}>
                  <div className="font-semibold text-blue-600 hover:text-blue-800">{discussion.title}</div>
                  <div className="text-sm text-gray-500 mt-1">on {discussion.platform}</div>
                  <div className="text-gray-700 mt-2">{discussion.excerpt}</div>
                </a>
              ))}
            </div>
          </div>
        )}
        {content.ugc.caseStudies.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Case Studies</h3>
            <div className="space-y-6">
              {content.ugc.caseStudies.map((caseStudy, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6">
                  <div className="font-semibold text-gray-900 mb-3">{caseStudy.company}</div>
                  <div className="space-y-2 text-gray-700">
                    <p><strong>Challenge:</strong> {caseStudy.challenge}</p>
                    <p><strong>Solution:</strong> {caseStudy.solution}</p>
                    <p><strong>Outcome:</strong> {caseStudy.outcome}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }, [content?.ugc])

  if (!content) return null

  return (
    <div className="prose prose-lg max-w-none">
      <div dangerouslySetInnerHTML={{ __html: markdownToHtml(content.content, content.title) }} />
      {faqSection}
      {ugcSection}
    </div>
  )
}

function markdownToHtml(markdown: string, fallbackTitle?: string): string {
  const hasH1 = /^#\s+.+$/m.test(markdown)
  const source = !hasH1 && fallbackTitle ? `# ${fallbackTitle}\n\n${markdown}` : markdown
  let html = escapeHtml(source)
  html = html.replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold text-gray-900 mt-6 mb-3">$1</h3>')
  html = html.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">$1</h2>')
  html = html.replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-gray-900 mb-6">$1</h1>')
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
  html = html.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
  html = html.replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-100 p-4 rounded-lg overflow-x-auto my-4"><code>$1</code></pre>')
  html = html.replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm">$1</code>')
  html = html.replace(/^\- (.*$)/gim, '<li class="ml-4 list-disc text-gray-700">$1</li>')
  html = html.replace(/^\d+\. (.*$)/gim, '<li class="ml-4 list-decimal text-gray-700">$1</li>')
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, label: string, rawUrl: string) => {
    const href = safeHref(unescapeHtml(rawUrl))
    const rel = isExternalUrl(href) ? ' rel="noopener noreferrer"' : ""
    return `<a href="${escapeHtml(href)}" class="text-blue-600 hover:text-blue-800 underline"${rel}>${label}</a>`
  })
  html = html.replace(/\n/g, '<br />')
  return html
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/'/g, "&#39;")
}

function unescapeHtml(value: string): string {
  return value.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&amp;/g, "&")
}

function safeHref(value: string): string {
  const href = value.trim()
  if (href.startsWith("/") && !href.startsWith("//")) return href
  if (href.startsWith("#")) return href
  try {
    const url = new URL(href)
    if (url.protocol === "https:" || url.protocol === "http:") return url.toString()
  } catch {
    // Invalid URLs are rendered as inert anchors.
  }
  return "#"
}

function isExternalUrl(value: string): boolean {
  return /^https?:\/\//i.test(value)
}
