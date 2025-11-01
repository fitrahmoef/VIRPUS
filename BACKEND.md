# VIRPUS Backend Documentation

## Overview

VIRPUS backend is built with Next.js API routes and integrates with Google's Vertex AI Veo3 for AI-powered video generation. It uses Prisma ORM with SQLite for data management.

## Technology Stack

- **Framework**: Next.js 16.0 API Routes
- **Database**: SQLite with Prisma ORM
- **AI Integration**: Google Vertex AI (Veo3)
- **Validation**: Zod
- **Language**: TypeScript

## Architecture

```
VIRPUS/
├── app/
│   ├── api/               # API routes
│   │   ├── videos/        # Video endpoints
│   │   ├── users/         # User endpoints
│   │   └── books/         # Book endpoints
│   └── components/        # React components
├── lib/
│   ├── prisma.ts          # Database client
│   ├── veo3.ts            # Veo3 integration service
│   ├── api-client.ts      # Frontend API client
│   └── hooks/             # React hooks
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Seed data
└── .env                   # Environment variables
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and configure:

```env
# Database
DATABASE_URL="file:./dev.db"

# Google Cloud / Vertex AI
GOOGLE_CLOUD_PROJECT="your-project-id"
GOOGLE_CLOUD_LOCATION="us-central1"
GOOGLE_APPLICATION_CREDENTIALS="path/to/service-account-key.json"

# API Configuration
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

### 3. Google Cloud Setup

1. Create a Google Cloud project
2. Enable Vertex AI API
3. Create a service account with Vertex AI permissions
4. Download the service account key JSON file
5. Set the path in `GOOGLE_APPLICATION_CREDENTIALS`

### 4. Initialize Database

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed initial data
npm run db:seed
```

### 5. Start Development Server

```bash
npm run dev
```

The API will be available at `http://localhost:3000/api`

## Database Schema

### User
- `id`: Unique identifier
- `name`: User's name
- `email`: User's email (unique)
- `avatar`: Avatar image or initial
- `badge`: User badge/achievement
- `points`: Gamification points
- `rank`: User ranking

### Book
- `id`: Unique identifier
- `title`: Book title
- `author`: Book author
- `coverEmoji`: Emoji for cover
- `coverGradient`: CSS gradient for background
- `videoCount`: Number of videos created
- `likeCount`: Number of likes
- `content`: Book content/excerpt

### Video
- `id`: Unique identifier
- `title`: Video title
- `prompt`: AI generation prompt
- `style`: Animation style (anime, flat-design, 3d-realistic)
- `duration`: Video duration in seconds
- `status`: Generation status (pending, processing, completed, failed)
- `veo3JobId`: Veo3 job identifier
- `videoUrl`: URL to generated video
- `viewCount`: Number of views
- `likeCount`: Number of likes
- `userId`: Creator user ID
- `bookId`: Associated book ID

## API Endpoints

### Videos

#### POST `/api/videos/generate`
Generate a new video with Veo3

**Request Body:**
```json
{
  "title": "Jakarta 2157",
  "prompt": "Futuristic Jakarta with hologram advertisements...",
  "style": "anime",
  "duration": 45,
  "userId": "user-id",
  "bookId": "book-id" // optional
}
```

**Response:**
```json
{
  "success": true,
  "video": {
    "id": "video-id",
    "title": "Jakarta 2157",
    "status": "processing",
    "jobId": "veo3-job-id",
    "estimatedTime": "2-3 minutes"
  }
}
```

#### GET `/api/videos?userId=xxx&trending=true&limit=20`
Get videos list

**Query Parameters:**
- `userId`: Filter by user
- `bookId`: Filter by book
- `status`: Filter by status
- `trending`: Sort by views
- `limit`: Limit results (default: 20)

#### GET `/api/videos/:id`
Get video details

#### GET `/api/videos/:id/status`
Check video generation status

**Response:**
```json
{
  "id": "video-id",
  "status": "completed",
  "videoUrl": "https://...",
  "progress": 100
}
```

#### PATCH `/api/videos/:id`
Update video (increment views/likes)

**Request Body:**
```json
{
  "action": "increment-view" // or "increment-like"
}
```

### Users

#### POST `/api/users`
Create a new user

**Request Body:**
```json
{
  "name": "Rina Mahasiswa",
  "email": "rina@example.com",
  "avatar": "R"
}
```

#### GET `/api/users?email=xxx`
Get user by email

#### GET `/api/users/:id`
Get user by ID with stats

### Books

#### POST `/api/books`
Create a new book

**Request Body:**
```json
{
  "title": "Nusantara 2157",
  "author": "Ahmad Fuadi",
  "coverEmoji": "📖",
  "coverGradient": "linear-gradient(...)",
  "description": "A futuristic vision..."
}
```

#### GET `/api/books?trending=true&limit=20`
Get books list

## Veo3 Integration

### Service: `lib/veo3.ts`

The Veo3Service class handles all interactions with Google's Vertex AI Veo3 model.

#### Key Methods:

**generateVideo(request: VideoGenerationRequest)**
- Starts video generation
- Returns job ID for tracking
- Supports multiple styles and durations

**checkJobStatus(jobId: string)**
- Checks the status of a generation job
- Returns current status and video URL when complete

**buildPrompt(request)**
- Constructs optimized prompts for Veo3
- Adds style instructions and technical specs

### Video Generation Flow

1. User submits generation request
2. Backend validates and creates video record
3. Veo3 service initiates generation
4. Status is set to "processing"
5. Frontend polls status endpoint
6. When complete, video URL is updated
7. User can view/download the generated video

### Prompt Engineering

The system enhances user prompts with:
- Style-specific instructions
- Technical specifications (duration, aspect ratio)
- Quality requirements
- Negative prompts for unwanted elements

Example transformation:
```
User Input: "Arya in futuristic Jakarta"

Enhanced Prompt: "Arya in futuristic Jakarta. Create this in anime art style,
vibrant colors, dynamic composition. Video duration: 45 seconds.
Aspect ratio: 16:9. High quality, smooth motion, professional production."
```

## Frontend Integration

### API Client: `lib/api-client.ts`

Typed client for all API interactions:

```typescript
import { apiClient } from '@/lib/api-client';

// Generate video
const result = await apiClient.generateVideo({
  title: 'My Video',
  prompt: 'Description...',
  style: 'anime',
  duration: 45,
  userId: 'user-id'
});

// Check status
const status = await apiClient.getVideoStatus(videoId);

// Get videos
const videos = await apiClient.getVideos({ trending: true });
```

### React Hook: `lib/hooks/useVideoGeneration.ts`

Simplified video generation in React:

```typescript
import { useVideoGeneration } from '@/lib/hooks/useVideoGeneration';

function MyComponent() {
  const { generateVideo, isGenerating, progress, error } = useVideoGeneration();

  const handleGenerate = async () => {
    const video = await generateVideo({
      title: 'Test Video',
      prompt: 'A beautiful scene...',
      style: 'anime',
      duration: 45,
      userId: 'user-id'
    });
  };

  return (
    <div>
      {isGenerating && <p>Generating... {progress}%</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
}
```

## Database Management

### Commands

```bash
# Generate Prisma client
npm run db:generate

# Push schema changes (dev)
npm run db:push

# Create migration (production)
npm run db:migrate

# Seed database
npm run db:seed

# Open Prisma Studio
npm run db:studio
```

### Prisma Studio

Visual database editor available at `http://localhost:5555`

```bash
npm run db:studio
```

## Error Handling

All API endpoints return consistent error responses:

```json
{
  "error": "Error message",
  "details": {} // Optional validation errors
}
```

HTTP Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `409` - Conflict
- `500` - Internal Server Error

## Security Considerations

1. **API Keys**: Never commit Google Cloud credentials
2. **Validation**: All inputs validated with Zod
3. **Rate Limiting**: Consider implementing rate limits
4. **Authentication**: Add user authentication in production
5. **CORS**: Configure CORS for production domains

## Performance Optimization

1. **Database Indexing**: Prisma auto-indexes primary and unique keys
2. **Caching**: Consider Redis for video status caching
3. **Background Jobs**: Use job queues for long-running tasks
4. **CDN**: Serve generated videos from CDN

## Monitoring & Logging

All operations are logged to console:
- Video generation requests
- Veo3 API calls
- Database operations
- Errors and exceptions

For production, integrate with:
- Google Cloud Logging
- Sentry for error tracking
- Analytics for usage metrics

## Testing

### Manual Testing

Use tools like:
- Postman
- Thunder Client
- cURL

Example:
```bash
curl -X POST http://localhost:3000/api/videos/generate \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Video",
    "prompt": "A beautiful landscape",
    "style": "anime",
    "duration": 45,
    "userId": "user-id"
  }'
```

## Deployment

### Vercel

1. Push code to GitHub
2. Import in Vercel
3. Configure environment variables
4. Deploy

### Environment Variables in Production

Set these in Vercel dashboard:
- `DATABASE_URL`
- `GOOGLE_CLOUD_PROJECT`
- `GOOGLE_CLOUD_LOCATION`
- `GOOGLE_APPLICATION_CREDENTIALS` (base64 encoded JSON)
- `NEXT_PUBLIC_API_URL`

## Troubleshooting

### Prisma Client Issues

```bash
# Regenerate client
npm run db:generate

# Reset database
npx prisma migrate reset
```

### Veo3 Connection Issues

- Verify Google Cloud project ID
- Check service account permissions
- Ensure Vertex AI API is enabled
- Validate credentials file path

### Database Locked

SQLite may lock with concurrent writes. Consider PostgreSQL for production.

## Future Enhancements

- [ ] User authentication with NextAuth
- [ ] File upload for custom content
- [ ] Real-time status updates with WebSockets
- [ ] Video editing and trimming
- [ ] Social features (comments, shares)
- [ ] Advanced analytics dashboard
- [ ] Multiple AI model support
- [ ] Video templates library
- [ ] Batch video generation

## Support

For issues and questions:
- Check GitHub Issues
- Review documentation
- Contact development team

---

Built with ❤️ for VIRPUS - Virtual Library for Viral Purpose
