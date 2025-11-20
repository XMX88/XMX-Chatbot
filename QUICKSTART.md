# Quick Start Guide - XMX Chatbot

## Step 1: Get Your Google API Key

1. Visit [Google AI Studio](https://aistudio.google.com)
2. Click on "Get API Key" button
3. Create a new API key for "XMX CHATBOT"
4. Copy the API key (keep it safe!)

## Step 2: Install Node.js

Download and install from [nodejs.org](https://nodejs.org)
- Recommended: LTS version (14 or higher)

## Step 3: Setup the Project

### On Windows (PowerShell):
```powershell
# Navigate to project folder
cd "c:\Users\addis\XMX Chatbot"

# Install dependencies
npm install

# Create .env file
Copy-Item .env.example -Destination .env

# Edit .env and add your API key
# Open .env in your text editor and replace:
# GOOGLE_API_KEY=your_api_key_from_google_ai_studio
```

### On Mac/Linux:
```bash
cd "~/XMX Chatbot"
npm install
cp .env.example .env
# Edit .env and add your API key
```

## Step 4: Start the Server

### Development Mode (recommended for testing):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

## Step 5: Open the Chatbot

Open your browser and go to:
```
http://localhost:3000
```

## 🎯 Testing the Chatbot

1. Click on a "Quick Start Prompt" or type a message
2. Press Enter or click the send button
3. Wait for the AI to respond
4. Try different types of questions:
   - "Write a poem about nature"
   - "Explain machine learning"
   - "Help me with JavaScript"
   - "Create a workout plan"

## ⚙️ Customization

### Change the Welcome Message
Edit `public/index.html` and look for "Welcome to XMX Chatbot"

### Change Colors
Edit `public/styles.css` and modify colors in `:root` section

### Change AI Behavior
Edit `src/backend/server.js` and adjust `temperature` (0-1):
- Lower value (0.3) = More focused/deterministic
- Higher value (0.9) = More creative/varied

## 🚀 Deploy to the Internet

### Option 1: Vercel (Easiest)
```bash
npm i -g vercel
vercel --env-file .env
```

### Option 2: Heroku
```bash
npm i -g heroku
heroku login
heroku create your-app-name
heroku config:set GOOGLE_API_KEY=your_key
git push heroku main
```

### Option 3: Railway.app
1. Connect GitHub repository
2. Add environment variables
3. Deploy with one click

## 🔗 Useful Links

- Google AI Studio: https://aistudio.google.com
- Vercel Deployment: https://vercel.com
- Heroku Deployment: https://heroku.com
- Railway.app: https://railway.app

## 💡 Tips & Tricks

1. **Save API Quota**: Set lower `maxOutputTokens` in server.js
2. **Better Responses**: Include context in your message
3. **Faster Loading**: Deploy to a location near your users
4. **Better UX**: Customize the quick reply buttons for your use case

## ❓ FAQ

**Q: Is this free to use?**
A: Yes! Google's free tier allows 60 API calls per minute.

**Q: How long are conversations saved?**
A: Chat history is saved in your browser's local storage (5-10MB limit).

**Q: Can I use this for commercial purposes?**
A: Yes, as long as you follow Google's terms of service.

**Q: How do I increase API limits?**
A: Set up a Google Cloud project and enable billing.

## 🆘 Troubleshooting

### Error: "Cannot find module"
```bash
npm install
```

### Error: "API key not found"
1. Make sure `.env` file exists
2. Verify the API key is correct
3. Restart the server

### Chatbot not responding
1. Check if server is running: http://localhost:3000/api/health
2. Open browser console (F12) and check for errors
3. Verify internet connection

## 📞 Need Help?

1. Check the README.md file for detailed documentation
2. Review the troubleshooting section
3. Check browser console (F12) for error messages
4. Verify all steps were followed correctly

---

**Enjoy your professional XMX Chatbot!** 🚀

Need a custom modification? Edit the files mentioned above and restart the server.
