/**
 * API Client for VIRPUS Backend
 * Provides typed methods for interacting with the backend API
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '';

export interface VideoGenerationRequest {
  title: string;
  prompt: string;
  style: 'anime' | 'flat-design' | '3d-realistic';
  duration: number;
  userId: string;
  bookId?: string;
  description?: string;
}

export interface Video {
  id: string;
  title: string;
  description?: string;
  prompt: string;
  style: string;
  duration: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  thumbnailEmoji?: string;
  thumbnailGradient?: string;
  videoUrl?: string;
  veo3JobId?: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  userId: string;
  bookId?: string;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: string;
    name: string;
    avatar?: string;
  };
  book?: {
    id: string;
    title: string;
    author: string;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  badge?: string;
  points: number;
  rank?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  coverEmoji: string;
  coverGradient?: string;
  videoCount: number;
  likeCount: number;
  description?: string;
  content?: string;
  createdAt: string;
  updatedAt: string;
}

class APIClient {
  // Video APIs
  async generateVideo(data: VideoGenerationRequest): Promise<{ success: boolean; video: any }> {
    const response = await fetch(`${API_BASE}/api/videos/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to generate video');
    }

    return response.json();
  }

  async getVideo(id: string): Promise<Video> {
    const response = await fetch(`${API_BASE}/api/videos/${id}`);

    if (!response.ok) {
      throw new Error('Failed to fetch video');
    }

    return response.json();
  }

  async getVideoStatus(id: string): Promise<{ id: string; status: string; videoUrl?: string; progress: number }> {
    const response = await fetch(`${API_BASE}/api/videos/${id}/status`);

    if (!response.ok) {
      throw new Error('Failed to fetch video status');
    }

    return response.json();
  }

  async getVideos(params?: {
    userId?: string;
    bookId?: string;
    status?: string;
    limit?: number;
    trending?: boolean;
  }): Promise<Video[]> {
    const searchParams = new URLSearchParams();

    if (params?.userId) searchParams.set('userId', params.userId);
    if (params?.bookId) searchParams.set('bookId', params.bookId);
    if (params?.status) searchParams.set('status', params.status);
    if (params?.limit) searchParams.set('limit', params.limit.toString());
    if (params?.trending) searchParams.set('trending', 'true');

    const response = await fetch(`${API_BASE}/api/videos?${searchParams}`);

    if (!response.ok) {
      throw new Error('Failed to fetch videos');
    }

    return response.json();
  }

  async incrementVideoView(id: string): Promise<Video> {
    const response = await fetch(`${API_BASE}/api/videos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action: 'increment-view' }),
    });

    if (!response.ok) {
      throw new Error('Failed to increment view');
    }

    return response.json();
  }

  async incrementVideoLike(id: string): Promise<Video> {
    const response = await fetch(`${API_BASE}/api/videos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action: 'increment-like' }),
    });

    if (!response.ok) {
      throw new Error('Failed to increment like');
    }

    return response.json();
  }

  // User APIs
  async createUser(data: { name: string; email: string; avatar?: string }): Promise<User> {
    const response = await fetch(`${API_BASE}/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create user');
    }

    return response.json();
  }

  async getUser(idOrEmail: string): Promise<User> {
    const isEmail = idOrEmail.includes('@');
    const endpoint = isEmail
      ? `${API_BASE}/api/users?email=${encodeURIComponent(idOrEmail)}`
      : `${API_BASE}/api/users/${idOrEmail}`;

    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }

    return response.json();
  }

  // Book APIs
  async createBook(data: {
    title: string;
    author: string;
    coverEmoji: string;
    coverGradient?: string;
    description?: string;
    content?: string;
  }): Promise<Book> {
    const response = await fetch(`${API_BASE}/api/books`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create book');
    }

    return response.json();
  }

  async getBooks(params?: { trending?: boolean; limit?: number }): Promise<Book[]> {
    const searchParams = new URLSearchParams();

    if (params?.trending) searchParams.set('trending', 'true');
    if (params?.limit) searchParams.set('limit', params.limit.toString());

    const response = await fetch(`${API_BASE}/api/books?${searchParams}`);

    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }

    return response.json();
  }
}

export const apiClient = new APIClient();
