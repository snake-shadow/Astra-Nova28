# COSMIC CR8T1V3 Deployment Guide

Follow these steps to get your Tactical Bridge live on Render.

## 1. Prepare Your Repository
Push all files in this directory to a new GitHub repository.

## 2. Render Dashboard Setup
1. Log in to [Render.com](https://render.com).
2. Click **New +** > **Static Site**.
3. Connect your GitHub repository.

## 3. Build Configuration
*   **Build Command:** `npm install && npm run build`
*   **Publish Directory:** `dist`

## 4. Setting the API Key
1. Go to the **Environment** tab in your Render project.
2. Click **Add Environment Variable**.
3. **Key:** `VITE_API_KEY`
4. **Value:** `[Your Google Gemini API Key]`
5. Save changes and trigger a new deploy.

## 5. Security Note
Because this is a static site, the API key is bundled in the frontend. 
**To protect your key:**
*   Go to [Google Cloud Console Credentials](https://console.cloud.google.com/apis/credentials).
*   Edit your API Key.
*   Under **Website restrictions**, add your Render URL: `https://your-site-name.onrender.com/*`.
