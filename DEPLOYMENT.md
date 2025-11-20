# XMX Chatbot - Deployment Guide

## 🚀 Deploy Your Professional Chatbot to the Internet

Choose one of the deployment options below to make your chatbot live on the web.

---

## Option 1: Vercel (⭐ RECOMMENDED - Easiest)

**Why Vercel?**
- Zero configuration
- Free tier available
- Automatic scaling
- Global CDN included
- One-click deployments

### Step-by-Step:

1. **Create a GitHub repository:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   ```

2. **Push to GitHub:**
   - Create an account on [github.com](https://github.com)
   - Create a new repository named "xmx-chatbot"
   - Push your local code:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/xmx-chatbot.git
   git push -u origin main
   ```

3. **Deploy on Vercel:**
   - Visit [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Click "Environment Variables"
   - Add: `GOOGLE_API_KEY` = your_api_key_here
   - Click "Deploy"

4. **Done!** Your chatbot is live at: `https://your-app.vercel.app`

---

## Option 2: Railway.app (Simple & Affordable)

**Why Railway?**
- Simple interface
- Free tier available
- $5/month credit included
- Easy database integration
- GitHub auto-deploy

### Step-by-Step:

1. **Create GitHub repository** (same as Option 1)

2. **Deploy on Railway:**
   - Visit [railway.app](https://railway.app)
   - Click "Create a new project"
   - Select "Import from GitHub"
   - Select your xmx-chatbot repository
   - Click "Deploy"
   - Go to Settings → Environment
   - Add: `GOOGLE_API_KEY` = your_api_key_here
   - Domain automatically assigned

3. **Done!** Your chatbot is live

---

## Option 3: Heroku (Traditional PaaS)

**Why Heroku?**
- Industry standard
- Easy CLI commands
- Good documentation
- Free tier (needs verification)

### Step-by-Step:

1. **Install Heroku CLI:**
   ```bash
   npm install -g heroku
   ```

2. **Login to Heroku:**
   ```bash
   heroku login
   ```

3. **Create Heroku app:**
   ```bash
   heroku create xmx-chatbot
   ```

4. **Set environment variable:**
   ```bash
   heroku config:set GOOGLE_API_KEY=your_api_key_here
   ```

5. **Deploy:**
   ```bash
   git push heroku main
   ```

6. **Done!** Visit: `https://xmx-chatbot.herokuapp.com`

---

## Option 4: AWS (Scalable Enterprise Solution)

**Why AWS?**
- Enterprise-grade reliability
- Maximum scalability
- Advanced features
- Global infrastructure

### Step-by-Step:

1. **Create AWS Account:**
   - Visit [aws.amazon.com](https://aws.amazon.com)
   - Create free tier account

2. **Create Elastic Beanstalk App:**
   - Go to Elastic Beanstalk service
   - Click "Create application"
   - Choose "Node.js" platform
   - Upload your code as ZIP file

3. **Set Environment Variables:**
   - Go to Configuration
   - Click "Edit" on Updates, Monitoring and Logging
   - Add environment property:
     - Name: GOOGLE_API_KEY
     - Value: your_api_key_here

4. **Deploy:**
   - Click "Create environment"
   - Wait for green status
   - Copy your domain name

5. **Done!** Visit your Elastic Beanstalk domain

---

## Option 5: DigitalOcean (VPS - More Control)

**Why DigitalOcean?**
- Affordable ($5/month)
- Full control
- Excellent documentation
- Fast performance

### Step-by-Step:

1. **Create Account:**
   - Visit [digitalocean.com](https://digitalocean.com)
   - Create account

2. **Create Droplet:**
   - Click "Create" → "Droplets"
   - Select "Ubuntu 22.04 LTS"
   - Choose $6/month (2GB RAM)
   - Click "Create Droplet"

3. **SSH into Droplet:**
   ```bash
   ssh root@your_droplet_ip
   ```

4. **Install Node.js:**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

5. **Clone and Setup:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/xmx-chatbot.git
   cd xmx-chatbot
   npm install
   ```

6. **Create .env file:**
   ```bash
   nano .env
   # Add: GOOGLE_API_KEY=your_key_here
   ```

7. **Install PM2 (process manager):**
   ```bash
   npm install -g pm2
   pm2 start src/backend/server.js --name "xmx-chatbot"
   pm2 startup
   pm2 save
   ```

8. **Setup domain:**
   - Buy domain on Namecheap/GoDaddy
   - Point to DigitalOcean nameservers
   - Setup reverse DNS in DigitalOcean

---

## Option 6: Google Cloud Run (Serverless)

**Why Cloud Run?**
- Auto-scaling
- Pay per use
- Integrated with Google ecosystem
- No server management

### Step-by-Step:

1. **Setup Google Cloud Project:**
   - Visit [console.cloud.google.com](https://console.cloud.google.com)
   - Create new project
   - Enable Cloud Run API
   - Enable Container Registry API

2. **Install Google Cloud CLI:**
   ```bash
   # Download from cloud.google.com/sdk
   gcloud init
   gcloud auth login
   ```

3. **Create Dockerfile:**
   ```dockerfile
   FROM node:18
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

4. **Deploy:**
   ```bash
   gcloud run deploy xmx-chatbot \
     --source . \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated \
     --set-env-vars GOOGLE_API_KEY=your_key_here
   ```

5. **Done!** Your URL will be displayed

---

## Domain Setup (All Options)

### Connect Custom Domain:

1. **Buy domain:**
   - Namecheap
   - GoDaddy
   - Google Domains
   - Cloudflare

2. **Update DNS settings:**

**For Vercel:**
```
Add CNAME: your-domain.com → your-app.vercel.app
```

**For Railway/Heroku:**
```
Add CNAME: your-domain.com → your-app.herokuapp.com
or Railway assigned domain
```

**For DigitalOcean:**
```
Add A record: your-domain.com → droplet_ip_address
Add A record: www.your-domain.com → droplet_ip_address
```

---

## SSL/HTTPS Setup

Most providers handle this automatically:
- ✅ Vercel: Automatic SSL
- ✅ Railway: Automatic SSL
- ✅ Heroku: Free SSL
- ✅ Google Cloud Run: Automatic SSL
- ⚠️ DigitalOcean: Use Let's Encrypt (auto with Nginx)

---

## Monitor & Maintain

### After Deployment:

1. **Check if running:**
   - Visit your live URL
   - Should see the chatbot interface

2. **Test API:**
   - Visit `https://your-domain.com/api/health`
   - Should return: `{"status":"healthy",...}`

3. **Check Logs:**
   - Vercel: Dashboard → Logs
   - Railway: Project → Logs
   - Heroku: `heroku logs --tail`
   - AWS: Elastic Beanstalk → Logs

4. **Monitor API Usage:**
   - Google AI Studio: Check quota
   - Set billing alerts
   - Monitor costs

---

## Performance Optimization

### After Deployment:

```bash
# Enable gzip compression (add to server.js)
const compression = require('compression');
app.use(compression());

# Add caching headers
app.use((req, res, next) => {
  res.header('Cache-Control', 'public, max-age=3600');
  next();
});

# Use CDN for static files
# Vercel/Railway: Built-in
# Others: Use Cloudflare (free)
```

---

## Cost Estimation

| Provider | Free Tier | Pay-As-You-Go | Minimum Cost |
|----------|-----------|---------------|--------------|
| Vercel | Yes (limited) | $0-50/month | Free |
| Railway | $5 credit/month | $0-50/month | $0 |
| Heroku | No (now) | $7-50/month | $7 |
| AWS | 12 months free | $0-50/month | $0-5 |
| DigitalOcean | No | $5-20/month | $5 |
| Google Cloud | Free tier | $0-20/month | $0 |

---

## Troubleshooting Deployment

### "API key not found"
```bash
# Verify environment variable is set correctly
# Restart the deployment
```

### "Cannot find module"
```bash
# Make sure npm install runs during deployment
# Check deployment logs
```

### "High latency"
- Check region selection
- Enable caching
- Optimize database queries
- Consider premium tier

### "Out of API quota"
- Check Google Cloud console
- Enable billing
- Monitor usage closely
- Consider rate limiting

---

## Recommended Setup

**Best for small projects:**
- ✅ Vercel (easiest, fastest)
- ✅ Railway (user-friendly)

**Best for scalability:**
- ✅ Google Cloud Run (serverless, scaling)
- ✅ AWS (enterprise-grade)

**Best for cost control:**
- ✅ DigitalOcean (predictable pricing)
- ✅ Railway ($5/month base)

**My Recommendation:** Start with **Vercel** (free, easy, fast), then move to **Google Cloud Run** when you need more scalability.

---

## Next Steps

1. Choose a deployment option
2. Get your Google API key
3. Follow the step-by-step guide
4. Test your live chatbot
5. Share with others!

## 🎉 Congratulations!

Your professional XMX Chatbot is now live on the internet! 🚀

---

**Need help?** Check the README.md or QUICKSTART.md files.
