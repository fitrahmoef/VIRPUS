'use client';

import { useState } from 'react';
import { useVideoGeneration } from '@/lib/hooks/useVideoGeneration';

interface VideoGeneratorProps {
  userId: string;
  bookId?: string;
  defaultPrompt?: string;
}

export default function VideoGenerator({ userId, bookId, defaultPrompt }: VideoGeneratorProps) {
  const [title, setTitle] = useState('');
  const [prompt, setPrompt] = useState(defaultPrompt || '');
  const [style, setStyle] = useState<'anime' | 'flat-design' | '3d-realistic'>('anime');
  const [duration, setDuration] = useState(45);

  const { generateVideo, isGenerating, progress, error, videoId, reset } = useVideoGeneration();

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !prompt) {
      alert('Please fill in title and prompt');
      return;
    }

    const result = await generateVideo({
      title,
      prompt,
      style,
      duration,
      userId,
      bookId,
    });

    if (result) {
      console.log('Video generation started:', result);
    }
  };

  return (
    <div className="viz-panel">
      <div className="viz-title">🎨 AI Video Generation with Veo3</div>
      <form onSubmit={handleGenerate}>
        <div className="viz-input">
          <label className="input-label">Video Title:</label>
          <input
            type="text"
            className="input-field"
            placeholder="Give your video a catchy title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isGenerating}
            required
          />

          <label className="input-label">Describe Your Vision:</label>
          <textarea
            className="input-field"
            rows={4}
            placeholder="Contoh: Arya adalah pemuda 20-an dengan jaket kulit hitam futuristik dan visor biru. Suasana malam dengan neon lights warna ungu dan biru. Style animasi cyberpunk realistis..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isGenerating}
            required
          />

          <label className="input-label">Select Animation Style:</label>
          <div className="style-options">
            <div
              className={`style-option ${style === 'anime' ? 'active' : ''}`}
              onClick={() => !isGenerating && setStyle('anime')}
            >
              <div>🎭 Anime</div>
            </div>
            <div
              className={`style-option ${style === 'flat-design' ? 'active' : ''}`}
              onClick={() => !isGenerating && setStyle('flat-design')}
            >
              <div>🎨 Flat Design</div>
            </div>
            <div
              className={`style-option ${style === '3d-realistic' ? 'active' : ''}`}
              onClick={() => !isGenerating && setStyle('3d-realistic')}
            >
              <div>🌟 3D Realistic</div>
            </div>
          </div>

          <label className="input-label">Video Duration:</label>
          <input
            type="range"
            className="input-field"
            min="15"
            max="90"
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value))}
            disabled={isGenerating}
            style={{ padding: '5px' }}
          />
          <div style={{ textAlign: 'center', color: '#667eea', fontWeight: 600 }}>
            {duration} seconds
          </div>

          {isGenerating && (
            <div style={{ marginTop: '20px' }}>
              <div style={{
                background: '#e0e0e0',
                borderRadius: '10px',
                overflow: 'hidden',
                height: '30px',
                marginBottom: '10px'
              }}>
                <div style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  height: '100%',
                  width: `${progress}%`,
                  transition: 'width 0.3s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 600,
                }}>
                  {progress}%
                </div>
              </div>
              <p style={{ textAlign: 'center', color: '#666' }}>
                Generating with Google Veo3... This may take 2-3 minutes.
              </p>
            </div>
          )}

          {error && (
            <div style={{
              background: '#ffebee',
              border: '1px solid #ef5350',
              borderRadius: '10px',
              padding: '15px',
              marginTop: '20px',
              color: '#c62828',
            }}>
              <strong>Error:</strong> {error}
              <button
                type="button"
                onClick={reset}
                style={{
                  marginLeft: '10px',
                  padding: '5px 15px',
                  background: '#ef5350',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Try Again
              </button>
            </div>
          )}

          {videoId && progress === 100 && (
            <div style={{
              background: '#e8f5e9',
              border: '1px solid #4caf50',
              borderRadius: '10px',
              padding: '15px',
              marginTop: '20px',
              color: '#2e7d32',
            }}>
              <strong>Success!</strong> Your video has been generated.
              <a
                href={`/video/${videoId}`}
                style={{
                  marginLeft: '10px',
                  padding: '5px 15px',
                  background: '#4caf50',
                  color: 'white',
                  borderRadius: '5px',
                  textDecoration: 'none',
                  display: 'inline-block',
                }}
              >
                View Video
              </a>
            </div>
          )}

          <button
            type="submit"
            className="generate-btn"
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>🔄 Generating... ({progress}%)</>
            ) : (
              <>🤖 Generate Video with Veo3 (2-3 minutes)</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
