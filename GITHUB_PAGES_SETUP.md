# GitHub Pages Setup Guide

## ✅ Your Repository is Ready for GitHub Pages!

Your XMX Chatbot repository has been configured for deployment on GitHub Pages. Here's what was set up:

## 📁 Root-Level Pages

The following files are now in the **root directory** and will be served as static web pages:

- **`index.html`** - Login page (homepage)
- **`signup.html`** - User registration page
- **`dashboard.html`** - Chatbot interface
- **`_config.yml`** - GitHub Pages configuration
- **`.nojekyll`** - Disables Jekyll processing

## 🚀 How to Deploy

### Step 1: Commit Changes
```powershell
git add .
git commit -m "Setup GitHub Pages with root index.html"
git push origin main
```

### Step 2: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under "Build and deployment":
   - Source: Select "Deploy from a branch"
   - Branch: Select **main**
   - Folder: Select **/ (root)**
4. Click Save
5. Wait 1-2 minutes for the site to build

### Step 3: Access Your Site
Your chatbot will be available at:
```
https://XMX88.github.io/XMX-Chatbot
```

## 🔧 Configuration Details

### _config.yml Setup
Your GitHub Pages configuration includes:
- Title: "XMX Chatbot"
- Description: "Professional AI-powered Chatbot Application"
- Excluded files: node_modules, src, .env files (not deployed)
- Jekyll disabled with `.nojekyll`

### File Paths
All assets are correctly configured:
- CSS: `public/styles.css`
- JavaScript: `public/script.js`
- Login redirects to `signup.html` ✓
- Signup redirects back to `index.html` ✓
- Dashboard loads all assets from `public/` folder ✓

## 📊 Site Structure

```
Root (/)
├── index.html           ← HOMEPAGE (Login)
├── signup.html          ← Sign up page
├── dashboard.html       ← Chatbot interface
├── .nojekyll            ← GitHub Pages config
├── _config.yml          ← Jekyll config
└── public/
    ├── styles.css       ← Styling
    ├── script.js        ← Frontend logic
    └── [images, assets]
```

## ⚙️ Backend API Setup

For the AI chat functionality to work, you need to set up the backend:

### Option 1: Run Locally
```bash
npm install
```

Create `.env` file:
```env
GOOGLE_API_KEY=your_api_key_here
PORT=3000
```

Start server:
```bash
npm start
```

Then update the API endpoint in `public/script.js`:
```javascript
const API_URL = 'http://localhost:3000/api/chat';
```

### Option 2: Deploy Backend to Heroku

1. Create a Heroku account
2. Create a new Heroku app
3. Set config vars: `GOOGLE_API_KEY`
4. Deploy from GitHub
5. Update `public/script.js` with your Heroku URL:
```javascript
const API_URL = 'https://your-app-name.herokuapp.com/api/chat';
```

### Option 3: Deploy to Railway/Render

Similar to Heroku - follow their deployment docs and update the API endpoint.

## 🔒 Security Notes

- ✅ API key is never exposed in frontend files
- ✅ All sensitive data stays in `.env` (excluded from GitHub)
- ✅ Frontend is static HTML/CSS/JS
- ✅ Backend handles AI API calls securely

## 🛠️ Customization

### Change Domain
If you have a custom domain, add it in GitHub Pages settings:
- Settings → Pages → Custom domain
- Point your domain DNS to GitHub Pages

### Modify Site Title
Edit `_config.yml`:
```yaml
title: My Custom Title
description: My custom description
```

### Update Links
All links in HTML files work correctly:
- Links between pages: `href="index.html"` ✓
- Asset links: `href="public/styles.css"` ✓
- Script links: `src="public/script.js"` ✓

## 📱 Testing

### Before Pushing
Test locally:
1. Open `file:///path/to/index.html` in browser
2. Try navigation between pages
3. Check that links work

### After Deployment
1. Visit your GitHub Pages URL
2. Test login/signup flow
3. Test dashboard page
4. Check console for errors (F12)

## 🐛 Troubleshooting

### Site not appearing
- Wait 1-2 minutes for GitHub to process
- Check repository Settings → Pages
- Ensure branch is set to "main"
- Verify `.nojekyll` file exists

### 404 errors
- Check file names match exactly (case-sensitive)
- Verify files are in root directory
- Check `_config.yml` hasn't excluded necessary files

### Links not working
- Use relative paths: `href="index.html"` not `/index.html`
- Don't include domain in links
- Test on the live GitHub Pages URL

### Styles/Scripts not loading
- Check browser console (F12) for 404 errors
- Verify `public/` folder exists on GitHub
- Check file paths in HTML

## 📚 Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Pages with Custom Domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [Jekyll Configuration](https://jekyllrb.com/docs/configuration/)

## ✨ What's Next?

1. **Push your code**: `git push origin main`
2. **Wait for deployment**: Check "Actions" tab on GitHub
3. **Visit your site**: `https://XMX88.github.io/XMX-Chatbot`
4. **Share with others**: Your chatbot is now live! 🎉

---

**Questions?** Check GitHub Pages docs or create an issue on your repository!
