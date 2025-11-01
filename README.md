# VIRPUS - Virtual Library for Viral Purpose

![VIRPUS Banner](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38B2AC?style=for-the-badge&logo=tailwind-css)

**Baca. Bayangkan. Viralkan.** - AI-powered platform untuk Gen Z

Transform reading into viral content with VIRPUS - an innovative platform that combines digital reading with AI-powered video generation capabilities.

## 🎯 Features

- **📚 Digital Library**: Access to 1.2M+ books
- **🎬 AI Video Generation**: Transform book scenes into viral videos
- **🔥 Trending Content**: Discover viral videos created by the community
- **👤 User Dashboard**: Track your creations and analytics
- **🎨 Multiple Art Styles**: Anime, Flat Design, 3D Realistic

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

3. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

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

- **Framework**: Next.js 16.0 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.1 + Custom CSS
- **Runtime**: React 19.2
- **Build Tool**: Turbopack

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

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server (not applicable for static export)
- `npm run lint` - Run ESLint

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
