'use client';

import { useState } from 'react';
import { apiClient, VideoGenerationRequest } from '@/lib/api-client';

export function useVideoGeneration() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [videoId, setVideoId] = useState<string | null>(null);

  const generateVideo = async (request: VideoGenerationRequest) => {
    try {
      setIsGenerating(true);
      setError(null);
      setProgress(10);

      // Start generation
      const result = await apiClient.generateVideo(request);
      setVideoId(result.video.id);
      setProgress(30);

      // Poll for status updates
      const pollInterval = setInterval(async () => {
        try {
          const status = await apiClient.getVideoStatus(result.video.id);

          if (status.status === 'completed') {
            setProgress(100);
            clearInterval(pollInterval);
            setIsGenerating(false);
            return result.video;
          } else if (status.status === 'failed') {
            setError('Video generation failed');
            clearInterval(pollInterval);
            setIsGenerating(false);
            return null;
          } else {
            setProgress(status.progress || 50);
          }
        } catch (err) {
          console.error('Error polling video status:', err);
        }
      }, 5000); // Poll every 5 seconds

      // Timeout after 5 minutes
      setTimeout(() => {
        clearInterval(pollInterval);
        if (isGenerating) {
          setError('Video generation timeout');
          setIsGenerating(false);
        }
      }, 300000);

      return result.video;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate video');
      setIsGenerating(false);
      return null;
    }
  };

  const reset = () => {
    setIsGenerating(false);
    setProgress(0);
    setError(null);
    setVideoId(null);
  };

  return {
    generateVideo,
    isGenerating,
    progress,
    error,
    videoId,
    reset,
  };
}
