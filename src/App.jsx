import { useState } from 'react'
import './App.css'

const HF_TOKEN = import.meta.env.VITE_HF_TOKEN

function App() {
  const [prompt, setPrompt] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [error, setError] = useState('')

  const handleGenerate = async () => {
    if (!prompt.trim() || isLoading) return

    setIsLoading(true)
    setError('')

    // Revoke previous object URL to avoid memory leaks
    if (imageUrl) {
      URL.revokeObjectURL(imageUrl)
      setImageUrl('')
    }

    try {
      const response = await fetch(
        '/hf/models/stabilityai/stable-diffusion-xl-base-1.0',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${HF_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ inputs: prompt.trim() }),
        }
      )

      if (!response.ok) {
        const errBody = await response.text()
        let message = `Request failed (${response.status})`
        try {
          const parsed = JSON.parse(errBody)
          if (parsed.error) message = parsed.error
          if (parsed.estimated_time) {
            message += ` — estimated wait: ${Math.ceil(parsed.estimated_time)}s. Try again shortly.`
          }
        } catch {
          // plain-text error, use default message
        }
        throw new Error(message)
      }

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      setImageUrl(url)
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleGenerate()
    }
  }

  return (
    <div className="app-container">
      {/* Decorative blobs */}
      <div className="blob blob-1" aria-hidden="true" />
      <div className="blob blob-2" aria-hidden="true" />

      <div className="generator-card">
        {/* Header */}
        <header className="header">
          <div className="header-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="url(#grad)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--accent-start)" />
                  <stop offset="100%" stopColor="var(--accent-end)" />
                </linearGradient>
              </defs>
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <h1 className="title">AI Image Generator</h1>
          <p className="subtitle">Describe your vision and bring it to life</p>
        </header>

        {/* Input section */}
        <div className="input-section">
          <label htmlFor="prompt-input" className="input-label">
            Your Prompt
          </label>
          <div className="textarea-wrapper">
            <textarea
              id="prompt-input"
              className="prompt-input"
              placeholder="A surreal landscape with floating islands and bioluminescent trees..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={3}
              disabled={isLoading}
            />
            <span className="char-count">{prompt.length}</span>
          </div>
        </div>

        {/* Generate button */}
        <button
          id="generate-btn"
          className={`generate-btn ${isLoading ? 'loading' : ''}`}
          onClick={handleGenerate}
          disabled={!prompt.trim() || isLoading}
        >
          {isLoading ? (
            <>
              <span className="spinner" />
              <span>Generating…</span>
            </>
          ) : (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
              <span>Generate Image</span>
            </>
          )}
        </button>

        {/* Error */}
        {error && (
          <div className="error-message">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Image display */}
        {imageUrl && !isLoading && (
          <div className="image-section">
            <div className="image-frame">
              <img
                src={imageUrl}
                alt={`Generated from: ${prompt}`}
                className="generated-image"
                onError={() => setError('Failed to load the image.')}
              />
            </div>
            <div className="image-meta">
              <span className="meta-badge">SDXL 1.0</span>
              <span className="meta-prompt" title={prompt}>
                {prompt.length > 60 ? prompt.slice(0, 60) + '…' : prompt}
              </span>
            </div>
          </div>
        )}
      </div>

      <footer className="footer">
        <span>Built with React + Vite</span>
      </footer>
    </div>
  )
}

export default App
