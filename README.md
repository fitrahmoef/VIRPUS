# VIRPUS - Virtual Library for Viral Purpose

![VIRPUS Banner](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38B2AC?style=for-the-badge&logo=tailwind-css)

**Baca. Bayangkan. Viralkan.** - AI-powered platform untuk Gen Z

Transform reading into viral content with VIRPUS - an innovative platform that combines digital reading with AI-powered video generation capabilities.

## 🎯 Features

- **📚 Digital Library**: Access to 1.2M+ books
- **🎬 AI Video Generation**: Transform book scenes into viral videos with Google Veo3
- **🔥 Trending Content**: Discover viral videos created by the community
- **👤 User Dashboard**: Track your creations and analytics
- **🎨 Multiple Art Styles**: Anime, Flat Design, 3D Realistic
- **🚀 REST API**: Full-featured backend with Next.js API routes
- **💾 Database**: SQLite with Prisma ORM

## 🚀 Quick Start

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd VIRPUS
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env and configure your Google Cloud credentials
```

4. Initialize the database:
```bash
npm run db:generate  # Generate Prisma client
npm run db:push      # Create database schema
npm run db:seed      # Seed with sample data
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Google Veo3 Setup

To enable AI video generation:

1. Create a Google Cloud project at [console.cloud.google.com](https://console.cloud.google.com)
2. Enable the Vertex AI API
3. Create a service account with Vertex AI permissions
4. Download the service account key JSON file
5. Update `.env` with your credentials:
```env
GOOGLE_CLOUD_PROJECT="your-project-id"
GOOGLE_CLOUD_LOCATION="us-central1"
GOOGLE_APPLICATION_CREDENTIALS="path/to/service-account-key.json"
```

For detailed backend documentation, see [BACKEND.md](BACKEND.md).

## 📦 Build & Deploy

### Build for Production

```bash
npm run build
```

This will create an optimized production build in the `out` directory (static export).

### Deployment Options

#### 1. Vercel (Recommended)

The easiest way to deploy your Next.js app is to use [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=<your-repo-url>)

**Steps:**
1. Push your code to GitHub
2. Import your repository in Vercel
3. Vercel will automatically detect Next.js and configure the build settings
4. Click "Deploy"

#### 2. Netlify

```bash
npm run build
```

Then deploy the `out` folder to Netlify:

1. Go to [Netlify](https://netlify.com)
2. Drag and drop the `out` folder
3. Or connect your GitHub repository for automatic deployments

#### 3. GitHub Pages

This project is configured for static export. To deploy to GitHub Pages:

```bash
npm run build
```

Then push the `out` folder to your `gh-pages` branch.

#### 4. Self-Hosted

After building, you can serve the `out` directory with any static file server:

```bash
npm install -g serve
serve out
```

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 16.0 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.1 + Custom CSS
- **Runtime**: React 19.2
- **Build Tool**: Turbopack

### Backend
- **API**: Next.js API Routes
- **Database**: SQLite with Prisma ORM
- **AI**: Google Vertex AI (Veo3)
- **Validation**: Zod
- **TypeScript**: Full type safety

## 📁 Project Structure

```
VIRPUS/
├── app/
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── public/             # Static assets
├── next.config.ts      # Next.js configuration
├── tailwind.config.ts  # Tailwind CSS configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # Project dependencies
```

## 📝 Available Scripts

### Development
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Database
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:migrate` - Create database migration
- `npm run db:seed` - Seed database with sample data
- `npm run db:studio` - Open Prisma Studio (database GUI)

## 📡 API Endpoints

The backend provides REST APIs for:

- **Videos**: Generate, list, and manage AI-generated videos
- **Users**: User management and profiles
- **Books**: Book library management

Example API usage:
```typescript
// Generate a video
const response = await fetch('/api/videos/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'Jakarta 2157',
    prompt: 'Futuristic Jakarta with hologram advertisements...',
    style: 'anime',
    duration: 45,
    userId: 'user-id'
  })
});

// Get trending videos
const videos = await fetch('/api/videos?trending=true&limit=10');
```

For complete API documentation, see [BACKEND.md](BACKEND.md).

## 🎨 Customization

The project uses a combination of Tailwind CSS and custom CSS for styling. You can customize:

- **Colors**: Edit the gradient colors in `app/globals.css`
- **Fonts**: Update the font family in the `body` selector
- **Components**: Modify components in `app/page.tsx`

## 📄 License

This project was created for Computer Science Festival (CSF) 2025.

© 2025 Virpus. All rights reserved.

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📞 Support

For support and questions, please open an issue in the repository.

---

Made with ❤️ for Gen Z readers
