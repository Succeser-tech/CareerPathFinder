# Career Path Finder - Deployment Guide

## 🚀 Deploy to Vercel

### Prerequisites
- GitHub account with the repository pushed
- Vercel account (sign up at [vercel.com](https://vercel.com))

### Deployment Steps

1. **Import Project to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click "Import Git Repository"
   - Select your `careerpathfinder` repository
   - Click "Import"

2. **Configure Build Settings**
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Add Environment Variables** (Optional - for Hugging Face API)
   - Go to Project Settings → Environment Variables
   - Add: `VITE_HF_API_KEY` = `your_hugging_face_api_key`
   - This enables AI-powered chatbot responses
   - **Note:** The app works perfectly without this (uses offline fallback)

4. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for build to complete
   - Your app will be live at `https://your-project-name.vercel.app`

### Post-Deployment

- **Custom Domain:** Add your own domain in Project Settings → Domains
- **Analytics:** Enable Vercel Analytics for visitor insights
- **Automatic Deployments:** Every push to `main` branch auto-deploys

### Features That Work Offline
✅ Career recommendations (100+ careers)
✅ Assessment form
✅ Results page with filtering
✅ Chatbot (keyword-based matching)
✅ PDF export
✅ All UI interactions

### Features That Need API Key
🔑 AI-powered chatbot responses (uses Hugging Face)
- Without key: Works with smart keyword matching
- With key: Enhanced natural language responses

## 🔧 Local Development

```bash
# Install dependencies
npm install

# Create .env file (optional)
echo "VITE_HF_API_KEY=your_key_here" > .env

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📝 Notes

- The app is a **Single Page Application (SPA)** using React Router
- `vercel.json` handles routing for SPA navigation
- All career data is hardcoded for 100% reliability
- No backend required - fully static deployment
- Chatbot works offline with local matching algorithm

## 🐛 Troubleshooting

**Build fails on Vercel:**
- Check that `package.json` has all dependencies
- Verify Node version (should be 18.x or higher)
- Check build logs for specific errors

**Routing doesn't work:**
- Ensure `vercel.json` is in the root directory
- Verify rewrites configuration is correct

**Environment variables not working:**
- Make sure they start with `VITE_`
- Redeploy after adding new variables
- Check they're set in Vercel dashboard

## 🎉 Success!

Your Career Path Finder is now live and helping students discover their perfect career path!
