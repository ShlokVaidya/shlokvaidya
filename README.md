# 🚀 Shlok Vaidya - Portfolio & Blog

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)

> **A modern, full-stack portfolio and blog platform built with Next.js 15, TypeScript, and cutting-edge web technologies.**

🌐 **Live Site:** [shlokvaidya.vercel.app](https://shlokvaidya.vercel.app)

---

## ✨ Features

### 🎨 **Modern UI/UX**

- ✅ Glassmorphic floating navigation bar
- ✅ Interactive spotlight effects with Framer Motion
- ✅ 3D interactive globe powered by Cobe
- ✅ Dark mode support with seamless theme switching
- ✅ Fully responsive mobile-first design
- ✅ Smooth animations and transitions

### 📝 **Blog System**

- ✅ MDX-powered blog posts (Markdown + React components)
- ✅ Syntax-highlighted code blocks
- ✅ Reading time calculation
- ✅ View counter with real-time tracking
- ✅ Post navigation (previous/next)
- ✅ Featured post highlighting
- ✅ RSS feed for subscribers
- ✅ Blog statistics dashboard

### 🔌 **Live Integrations**

- ✅ **Hackatime/WakaTime** - Real-time coding statistics
  - Total coding time (last 7 days)
  - Daily average
  - Top programming languages
- ✅ **Spotify** - Now Playing widget
  - Current track information
  - Album artwork
  - Live playback status
- ✅ **GitHub** - Repository activity and stats
- ✅ **Cloudinary** - Optimized image delivery

### 🛡️ **Admin Panel**

- ✅ Secure OTP-based authentication
- ✅ JWT session management
- ✅ Real-time status posting
- ✅ View analytics dashboard
- ✅ Blog statistics viewer
- ✅ Session cleanup automation

### 📬 **Contact & Newsletter**

- ✅ Contact form with email integration (Nodemailer)
- ✅ Newsletter subscription system
- ✅ Email validation
- ✅ Spam protection
- ✅ Toast notifications

### 🚀 **Performance & SEO**

- ✅ Server-side rendering (SSR)
- ✅ Static site generation (SSG)
- ✅ Edge computing with Vercel
- ✅ Automatic image optimization
- ✅ Dynamic sitemap generation
- ✅ Robots.txt configuration
- ✅ Schema.org structured data
- ✅ Open Graph & Twitter Cards
- ✅ Sub-100ms response times

---

## 🛠️ Tech Stack

### **Frontend**

- **Framework:** [Next.js 16](https://nextjs.org/) with App Router
- **UI Library:** [React 19](https://react.dev/)
- **Language:** [TypeScript 5](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Component Library:** [shadcn/ui](https://ui.shadcn.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **3D Graphics:** [Cobe](https://github.com/shuding/cobe)
- **Theme:** [next-themes](https://github.com/pacocoursey/next-themes)

### **Backend**

- **API Routes:** Next.js Route Handlers
- **Database:** [PostgreSQL](https://www.postgresql.org/) (Vercel Postgres)
- **ORM/Query:** [node-postgres (pg)](https://node-postgres.com/)
- **Authentication:** JWT + OTP
- **Email Service:** [Nodemailer](https://nodemailer.com/)
- **Image Hosting:** [Cloudinary](https://cloudinary.com/)

### **Content Management**

- **Blog Engine:** MDX with [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote)
- **Frontmatter Parser:** [gray-matter](https://github.com/jonschlinkert/gray-matter)
- **Reading Time:** [reading-time](https://github.com/ngryman/reading-time)

### **Deployment & Analytics**

- **Hosting:** [Vercel](https://vercel.com/)
- **Analytics:** [Vercel Analytics](https://vercel.com/analytics)
- **Speed Insights:** [Vercel Speed Insights](https://vercel.com/docs/speed-insights)
- **CI/CD:** Automated GitHub deployments

### **Development Tools**

- **Build Tool:** Turbopack (Next.js 16)
- **Linting:** ESLint
- **Type Checking:** TypeScript strict mode
- **Version Control:** Git & GitHub

---

## 📂 Project Structure

```text
shlokvaidya/
├── app/                      # Next.js App Router
│   ├── api/                  # API Routes
│   │   ├── admin/           # Admin authentication & management
│   │   ├── cloudinary/      # Image optimization
│   │   ├── contact/         # Contact form handler
│   │   ├── emails/          # Email service
│   │   ├── github/          # GitHub API integration
│   │   ├── hackatime/       # Coding stats API
│   │   ├── rss/             # RSS feed generation
│   │   ├── spotify/         # Spotify Now Playing
│   │   ├── status/          # Status updates
│   │   ├── subscribe/       # Newsletter subscriptions
│   │   └── views/           # View counter
│   ├── blog/                # Blog pages
│   │   ├── [slug]/          # Dynamic blog post pages
│   │   └── page.tsx         # Blog index
│   ├── control/             # Admin dashboard
│   │   ├── login/           # Admin login
│   │   └── status/          # Status management
│   ├── project/             # Projects showcase
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Homepage
│   ├── robots.ts            # Robots.txt generation
│   └── sitemap.ts           # Sitemap generation
├── components/              # React components
│   ├── ui/                  # shadcn/ui components
│   ├── AdminProvider.tsx    # Admin auth context
│   ├── BlogIndex.tsx        # Blog listing
│   ├── BlogStats.tsx        # Blog analytics
│   ├── Contact.tsx          # Contact form
│   ├── FeaturedPost.tsx     # Featured blog post
│   ├── Features.tsx         # Live integrations widget
│   ├── Footer.tsx           # Site footer
│   ├── Hero.tsx             # Homepage hero section
│   ├── Navbar.tsx           # Navigation bar
│   ├── PostNavigator.tsx    # Blog post navigation
│   ├── SchemaScript.tsx     # Structured data
│   ├── ViewCounter.tsx      # View count display
│   └── ViewTracker.tsx      # View tracking logic
├── content/                 # Blog content
│   └── blogs/               # MDX blog posts
├── lib/                     # Utility libraries
│   ├── admin-auth.ts        # Admin authentication
│   ├── cloudinary.ts        # Cloudinary config
│   ├── crypto.ts            # Encryption utilities
│   ├── db.ts                # Database connection
│   ├── mail.ts              # Email service
│   ├── mdx.ts               # MDX processing
│   ├── server-crypto.ts     # Server-side crypto
│   ├── status.ts            # Status management
│   ├── utils.ts             # General utilities
│   └── views.ts             # View tracking
├── public/                  # Static assets
├── scripts/                 # Database scripts
│   └── init-db.ts           # Database initialization
├── .env                     # Environment variables
├── components.json          # shadcn/ui config
├── next.config.ts           # Next.js configuration
├── package.json             # Dependencies
├── postcss.config.mjs       # PostCSS config
├── tailwind.config.ts       # Tailwind configuration
└── tsconfig.json            # TypeScript config
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm** or **yarn** or **pnpm**
- **PostgreSQL** database (or Vercel Postgres)

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/ShlokVaidya/shlokvaidya.git
cd shlokvaidya
```

2. **Install dependencies:**

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up environment variables:**

Create a `.env` file in the root directory:

```env
# Database
POSTGRES_URL=your_postgresql_connection_string

# Admin Authentication
ADMIN_EMAIL=your_admin_email@example.com
JWT_SECRET=your_jwt_secret_key
OTP_SECRET=your_otp_secret_key

# Email Service (Gmail)
GMAIL_USER=your_email@gmail.com
GMAIL_PASS=your_gmail_app_password
FORWARD_TO_EMAIL=recipient_email@example.com

# API Keys
HACKATIME_API_KEY=your_hackatime_api_key
HACKATIME_USERNAME=your_hackatime_username
GITHUB_TOKEN=your_github_personal_access_token

# Spotify
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REFRESH_TOKEN=your_spotify_refresh_token
REDIRECT_URI=http://localhost:3000/callback

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

4. **Initialize the database:**

```bash
npx ts-node scripts/init-db.ts
```

5. **Run the development server:**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

6. **Open your browser:**

Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📝 Creating Blog Posts

Create new MDX files in `content/blogs/` with the following frontmatter:

```mdx
---
title: "Your Blog Post Title"
description: "A brief description of your post"
publishedAt: 2026-01-01
banner: https://your-image-url.jpg
tags: ["Tag1", "Tag2", "Tag3"]
---

# Your Blog Content Here

Write your blog post using Markdown and JSX components!
```

The blog post will automatically appear on your blog page with:

- View counter
- Reading time calculation
- Previous/Next navigation
- RSS feed inclusion

---

## 🔧 Configuration

### Customize Site Metadata

Edit `app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: "Your Name - Portfolio & Blog",
  description: "Your custom description",
  // ... other metadata
};
```

### Update Social Links

Edit `components/Footer.tsx` and `components/Hero.tsx` to update your social media links.

### Modify Theme Colors

Edit `tailwind.config.ts` to customize your color scheme and design tokens.

---

## 📊 Admin Dashboard

Access the admin panel at `/control/login`:

1. Enter your admin email (from `.env`)
2. Receive OTP via email
3. Enter OTP to authenticate
4. Access dashboard features:
   - View statistics
   - Post status updates
   - Manage sessions
   - View blog analytics

---

## 🎨 Key Features Explained

### View Counter

- Tracks unique page views per blog post
- IP-based deduplication
- Real-time updates using SWR
- Persistent storage in PostgreSQL

### RSS Feed

- Auto-generated at `/api/rss`
- Includes all blog posts with metadata
- Cached for performance
- Compatible with all RSS readers

### Spotify Integration

- Displays currently playing track
- Album artwork and artist info
- Live status updates

### Hackatime/WakaTime Stats

- Last 7 days coding statistics
- Language breakdown with percentages
- Daily average calculation
- Animated progress bars

---

## 🚀 Deployment

### Deploy to Vercel

1. **Push to GitHub:**

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Import to Vercel:**

   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables
   - Deploy

3. **Configure Database:**
   - Use Vercel Postgres or external PostgreSQL
   - Run database initialization script
   - Update `POSTGRES_URL` in Vercel environment variables

### Environment Variables in Vercel

Add all environment variables from your `.env` file to Vercel:

- Project Settings → Environment Variables
- Add each variable one by one
- Redeploy after adding variables

---

## 📈 Performance

- **Lighthouse Score:** 95+ across all metrics
- **First Contentful Paint:** < 1.0s
- **Time to Interactive:** < 2.5s
- **Core Web Vitals:** All green
- **Bundle Size:** Optimized with code splitting
- **Response Time:** Sub-100ms on Edge

---

## 🔒 Security Features

- ✅ OTP-based authentication
- ✅ JWT token management
- ✅ HTTP-only cookies
- ✅ CSRF protection
- ✅ SQL injection prevention
- ✅ XSS protection
- ✅ Rate limiting
- ✅ Secure headers

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Vercel](https://vercel.com/) - Hosting and deployment
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Framer Motion](https://www.framer.com/motion/) - Animations

---

## 📞 Contact

**Shlok Vaidya**

- 🌐 Website: [shlokvaidya.vercel.app](https://shlokvaidya.vercel.app)
- 📧 Email: [shlokvaidya.in@gmail.com](mailto:shlokvaidya.in@gmail.com)
- 💼 GitHub: [@ShlokVaidya](https://github.com/ShlokVaidya)

---

<div align="center">

**Built with ☕ and TypeScript**

⭐ Star this repo if you find it helpful!

</div>
