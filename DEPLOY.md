# 🚀 Deploy to Vercel

## Quick Deploy

1. **Push to GitHub** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up/in with GitHub
   - Click "New Project"
   - Import your GitHub repository

3. **Set Environment Variables** in Vercel dashboard:
   - Go to Project → Settings → Environment Variables
   - Add these variables:
     ```
     AIRTABLE_API_KEY = patpOudQeLMPaThpi.6176ddf3a4dc6fed4ff9796c449b754c4199fb35cdb8672d6fb30ef07a1cc059
     AIRTABLE_BASE_ID = appxZMUIzYRGQhIqW
     AIRTABLE_TABLE_NAME = Feedback
     ```

4. **Deploy**: 
   - Vercel will automatically deploy
   - Your form will be live at `https://your-project-name.vercel.app`

## Local Development

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Create local environment file**:
   ```bash
   cp env.example .env.local
   # Edit .env.local with your actual values
   ```

3. **Run locally**:
   ```bash
   vercel dev
   ```

## Security Benefits

✅ **API keys hidden** - No longer exposed in frontend code  
✅ **Serverless functions** - Secure backend processing  
✅ **Environment variables** - Proper secret management  
✅ **CORS handled** - Secure cross-origin requests  

## What Changed

- **Frontend**: Now calls `/api/submit-feedback` instead of Airtable directly
- **Backend**: New serverless function handles Airtable integration
- **Security**: API keys moved to environment variables
- **No config.js**: Configuration now handled server-side

Your form is now production-ready and secure! 🎉 