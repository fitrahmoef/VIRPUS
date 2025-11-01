# VIRPUS API Quick Reference

## Base URL
`http://localhost:3000/api` (development)

## Authentication
Currently no authentication required. Add authentication in production.

---

## Videos API

### Generate Video
**POST** `/api/videos/generate`

Generate a new video using Google Veo3.

**Request:**
```json
{
  "title": "Jakarta 2157",
  "prompt": "Futuristic Jakarta city with hologram advertisements, skytrain overhead, cyberpunk style, neon lights",
  "style": "anime",
  "duration": 45,
  "userId": "user-id",
  "bookId": "book-id",
  "description": "A cyberpunk vision of future Jakarta"
}
```

**Response (201):**
```json
{
  "success": true,
  "video": {
    "id": "clx...",
    "title": "Jakarta 2157",
    "status": "processing",
    "jobId": "veo3-...",
    "estimatedTime": "2-3 minutes"
  }
}
```

---

### Get Videos
**GET** `/api/videos`

Get a list of videos with optional filters.

**Query Parameters:**
- `userId` - Filter by user ID
- `bookId` - Filter by book ID
- `status` - Filter by status (pending, processing, completed, failed)
- `trending` - Sort by views (true/false)
- `limit` - Limit results (default: 20)

**Example:**
```
GET /api/videos?trending=true&limit=10
```

**Response (200):**
```json
[
  {
    "id": "clx...",
    "title": "Jakarta 2157: The Future",
    "description": "A cyberpunk visualization",
    "prompt": "...",
    "style": "anime",
    "duration": 45,
    "status": "completed",
    "videoUrl": "https://...",
    "viewCount": 1200000,
    "likeCount": 45000,
    "commentCount": 1200,
    "user": {
      "id": "...",
      "name": "Rina Mahasiswa",
      "avatar": "R"
    },
    "book": {
      "id": "...",
      "title": "Nusantara 2157",
      "author": "Ahmad Fuadi"
    },
    "createdAt": "2025-11-01T...",
    "updatedAt": "2025-11-01T..."
  }
]
```

---

### Get Video Details
**GET** `/api/videos/:id`

Get detailed information about a specific video.

**Response (200):**
```json
{
  "id": "clx...",
  "title": "Jakarta 2157: The Future",
  "status": "completed",
  "videoUrl": "https://...",
  ...
}
```

---

### Get Video Status
**GET** `/api/videos/:id/status`

Check the generation status of a video.

**Response (200):**
```json
{
  "id": "clx...",
  "status": "completed",
  "videoUrl": "https://...",
  "progress": 100
}
```

**Status values:**
- `pending` - Not started
- `processing` - Currently generating (progress: 0-99)
- `completed` - Ready (progress: 100)
- `failed` - Generation failed

---

### Update Video
**PATCH** `/api/videos/:id`

Update video metrics.

**Request:**
```json
{
  "action": "increment-view"
}
```

**Actions:**
- `increment-view` - Increment view count
- `increment-like` - Increment like count

**Response (200):**
```json
{
  "id": "clx...",
  "viewCount": 1200001,
  ...
}
```

---

## Users API

### Create User
**POST** `/api/users`

Create a new user account.

**Request:**
```json
{
  "name": "Rina Mahasiswa",
  "email": "rina@example.com",
  "avatar": "R"
}
```

**Response (201):**
```json
{
  "id": "clx...",
  "name": "Rina Mahasiswa",
  "email": "rina@example.com",
  "avatar": "R",
  "badge": "Virpus Creator",
  "points": 0,
  "rank": null,
  "createdAt": "2025-11-01T...",
  "updatedAt": "2025-11-01T..."
}
```

**Error (409):**
```json
{
  "error": "User with this email already exists"
}
```

---

### Get User by Email
**GET** `/api/users?email=rina@example.com`

Get user information by email.

**Response (200):**
```json
{
  "id": "clx...",
  "name": "Rina Mahasiswa",
  "email": "rina@example.com",
  "avatar": "R",
  "badge": "Virpus Creator",
  "points": 2450,
  "rank": 12,
  "videos": [...],
  "_count": {
    "videos": 24,
    "bookmarks": 15
  },
  "createdAt": "2025-11-01T...",
  "updatedAt": "2025-11-01T..."
}
```

---

### Get User by ID
**GET** `/api/users/:id`

Get detailed user information with statistics.

**Response (200):**
```json
{
  "id": "clx...",
  "name": "Rina Mahasiswa",
  "email": "rina@example.com",
  "videos": [...],
  "bookmarks": [...],
  "stats": {
    "videosCreated": 24,
    "totalViews": 1200000,
    "points": 2450,
    "rank": 12
  },
  ...
}
```

---

## Books API

### Create Book
**POST** `/api/books`

Add a new book to the library.

**Request:**
```json
{
  "title": "Nusantara 2157",
  "author": "Ahmad Fuadi",
  "coverEmoji": "📖",
  "coverGradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  "description": "A futuristic vision of Indonesia in 2157",
  "content": "Book content or excerpt..."
}
```

**Response (201):**
```json
{
  "id": "clx...",
  "title": "Nusantara 2157",
  "author": "Ahmad Fuadi",
  "coverEmoji": "📖",
  "coverGradient": "linear-gradient(...)",
  "videoCount": 0,
  "likeCount": 0,
  "description": "...",
  "createdAt": "2025-11-01T...",
  "updatedAt": "2025-11-01T..."
}
```

---

### Get Books
**GET** `/api/books`

Get a list of books.

**Query Parameters:**
- `trending` - Sort by video count (true/false)
- `limit` - Limit results (default: 20)

**Example:**
```
GET /api/books?trending=true&limit=10
```

**Response (200):**
```json
[
  {
    "id": "clx...",
    "title": "Laskar Pelangi",
    "author": "Andrea Hirata",
    "coverEmoji": "📗",
    "coverGradient": "linear-gradient(...)",
    "videoCount": 456,
    "likeCount": 3400,
    "description": "An inspiring story from Belitung",
    "_count": {
      "videos": 456
    },
    "createdAt": "2025-11-01T...",
    "updatedAt": "2025-11-01T..."
  }
]
```

---

## Error Responses

All errors follow this format:

```json
{
  "error": "Error message",
  "details": {}  // Optional validation errors
}
```

### HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `404` - Not Found
- `409` - Conflict (duplicate)
- `500` - Internal Server Error

### Example Validation Error

```json
{
  "error": "Invalid request data",
  "details": [
    {
      "code": "too_small",
      "minimum": 10,
      "type": "string",
      "inclusive": true,
      "message": "String must contain at least 10 character(s)",
      "path": ["prompt"]
    }
  ]
}
```

---

## Video Generation Workflow

1. **Create Video Request**
   ```
   POST /api/videos/generate
   ```
   Returns: `{ video: { id, status: "processing", jobId } }`

2. **Poll Status** (every 5 seconds)
   ```
   GET /api/videos/:id/status
   ```
   Returns: `{ status, progress, videoUrl? }`

3. **Status Changes**
   - `pending` → `processing` (0-99% progress)
   - `processing` → `completed` (100% progress, videoUrl available)
   - `processing` → `failed` (error occurred)

4. **View Video**
   - Once `status === "completed"`, use `videoUrl`
   - Can also fetch full details: `GET /api/videos/:id`

---

## Rate Limits

Currently no rate limits. Recommended for production:
- 10 video generations per user per hour
- 100 API requests per minute
- Implement caching for GET requests

---

## CORS

Development: All origins allowed
Production: Configure allowed origins in Next.js config

---

## Client Libraries

### JavaScript/TypeScript

Use the provided API client:

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

// Get trending videos
const videos = await apiClient.getVideos({ trending: true });
```

### cURL Examples

```bash
# Generate video
curl -X POST http://localhost:3000/api/videos/generate \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Video",
    "prompt": "A beautiful landscape in anime style",
    "style": "anime",
    "duration": 45,
    "userId": "user-id"
  }'

# Get trending videos
curl http://localhost:3000/api/videos?trending=true&limit=10

# Check video status
curl http://localhost:3000/api/videos/VIDEO_ID/status
```

---

## WebSocket Support

Not currently implemented. Future enhancement for real-time status updates.

---

For more details, see [BACKEND.md](BACKEND.md)
