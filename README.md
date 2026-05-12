# RankForge - SEO Publishing Platform

A modern SEO publishing platform with backlink management, built with React and Supabase.

## Features

- 🔐 Authentication (Email + Google OAuth)
- 📝 Publish blog posts and PDFs
- 🔗 Backlink management (DoFollow/NoFollow/Sponsored)
- 📊 Analytics dashboard with view counts
- 🎨 Modern glassmorphism UI design
- 🤖 AI-powered excerpt generation

## Tech Stack

- React 18
- Supabase (Auth + Database)
- Vite
- CSS3 with animations

## Deployment

This project is deployed on Vercel.

### Environment Variables Required

Add these in Vercel dashboard:

- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anon key

## Local Development

```bash
npm install
npm run dev
