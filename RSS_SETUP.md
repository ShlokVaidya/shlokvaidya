# RSS Feed Setup Guide

## Overview
A beautiful, fully-functional RSS feed has been created for your blog. The feed automatically includes all your blog posts with metadata and is optimized for various RSS readers.

## What was added:

### 1. **RSS Feed API Route** (`app/api/rss/route.ts`)
- Generates valid RSS 2.0 XML format
- Automatically fetches all blog posts from your MDX files
- Includes post metadata: title, description, publication date, tags, and featured images
- Implements proper caching headers for performance (1 hour cache with 24-hour stale fallback)
- Escapes all XML special characters for safe RSS parsing

### 2. **Footer Component Updates** (`components/Footer.tsx`)
- Added RSS icon link in the social media section
- Added a dedicated "RSS Feed" button below the newsletter subscription
- Beautiful styling that matches your site's design system

### 3. **Metadata Configuration** (`app/layout.tsx`)
- Added RSS feed autodiscovery via metadata
- Browsers can automatically detect your RSS feed URL

## Features:

✨ **Automatically Updated**: Every time a blog post is added with frontmatter, it appears in the RSS feed
- Requires: `title`, `description`, `publishedAt` fields in frontmatter

🔗 **Multiple Access Points**:
- RSS icon in footer social links: `/api/rss`
- Dedicated RSS button in newsletter section
- Browser RSS autodiscovery

🎨 **Rich Content Support**:
- Post titles and descriptions
- Featured images from frontmatter
- Publication dates
- Category/tags support
- Author information

⚡ **Performance Optimized**:
- Server-side caching (1 hour, with 24-hour stale-while-revalidate)
- Minimal XML footprint
- Fast static generation

## How to Use:

### For Readers:
1. Click the RSS icon in the footer's social section, or
2. Click the "RSS Feed" button in the newsletter section, or
3. Use RSS reader app to subscribe to: `https://yoursite.com/api/rss`

### For You (Content Creator):
Simply create MDX blog posts with the required frontmatter:
```mdx
---
title: Your Blog Post Title
description: A brief description of your post
publishedAt: 2025-01-01
tags: ["tag1", "tag2"]
banner: https://your-image-url.jpg
---

Your content here...
```

## RSS Readers to Test With:
- Feedly
- Inoreader
- The Old Reader
- NetNewsWire
- Thunderbird
- Or any standard RSS reader

## Feed URL:
```
/api/rss
Full URL: https://shlokvaidya.vercel.app/api/rss
```

## Customization:

If you need to update the feed title, description, or author email, edit:
- `app/api/rss/route.ts` - Update the `channel` properties
- `app/layout.tsx` - Update site metadata

The feed will automatically include any new blog posts added to `content/blogs/` directory.
