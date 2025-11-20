# XMX Chatbot - Professional AI Assistant

A fully-featured, production-ready chatbot powered by Google Generative AI with a modern, professional UI/UX.

## ✨ Features

- **AI-Powered Conversations**: Powered by Google Generative AI (Gemini Pro)
- **Quick Reply Buttons**: Pre-configured prompts for common tasks
- **Chat History**: Persistent conversation history in local storage
- **Professional UI/UX**: Modern design with smooth animations
- **Dark Mode Support**: Automatic dark mode based on system preferences
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Typing Indicators**: Shows when the AI is "thinking"
- **Real-time Message Formatting**: Supports markdown, code blocks, links
- **Settings Panel**: Customize theme, font size, and notifications
- **Rate Limiting**: Protection against abuse
- **Error Handling**: Graceful error messages and recovery
- **Multi-language Support**: Ready for internationalization

## 📋 Prerequisites

- Node.js 14.0 or higher
- npm or yarn package manager
- Google API Key (free tier available at [Google AI Studio](https://aistudio.google.com))

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure API Key

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and add your Google API key:

```env
GOOGLE_API_KEY=your_api_key_from_google_ai_studio
NODE_ENV=development
PORT=3000
```

**Get your API key:**
1. Visit [Google AI Studio](https://aistudio.google.com)
2. Click "Get API Key"
3. Create a new API key for "XMX CHATBOT"
4. Copy the key and paste it in `.env`

### 3. Start the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

### 4. Access the Chatbot

Open your browser and navigate to:
```
http://localhost:3000
```

## 📁 Project Structure

```
XMX Chatbot/
├── public/
│   ├── index.html          # Main HTML file
│   ├── styles.css          # Professional styling
│   └── script.js           # Frontend JavaScript
├── src/
│   └── backend/
│       └── server.js       # Express backend server
├── package.json            # Dependencies and scripts
├── .env.example            # Environment variables template
└── README.md              # This file
```

## 🎨 Customization

### Change Chatbot Name
Edit `public/index.html` and update the title and header text:
```html
<h1>Your Chatbot Name</h1>
```

### Customize Quick Reply Buttons
Edit `public/index.html` and modify the quick-reply buttons:
```html
<button class="quick-reply-btn" data-prompt="Your prompt">
    <i class="fas fa-icon"></i>
    <span>Your Label</span>
</button>
```

### Change Color Scheme
Edit `public/styles.css` and modify the CSS variables in `:root`:
```css
:root {
    --primary-color: #2563eb;  /* Main blue color */
    --secondary-color: #7c3aed; /* Purple accent */
    /* ... other colors ... */
}
```

### Adjust Model Temperature
Edit `src/backend/server.js` and modify the generationConfig:
```javascript
generationConfig: {
    temperature: 0.7,  // 0 = deterministic, 1 = creative
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 1024,
}
```

## 📊 API Endpoints

### POST /api/chat
Send a message and get a response from the AI.

**Request:**
```json
{
    "message": "Your message here",
    "history": [
        {"role": "user", "content": "previous message"},
        {"role": "assistant", "content": "previous response"}
    ]
}
```

**Response:**
```json
{
    "success": true,
    "response": "AI generated response",
    "timestamp": "2025-11-20T10:00:00.000Z"
}
```

### GET /api/health
Check server health status.

**Response:**
```json
{
    "status": "healthy",
    "timestamp": "2025-11-20T10:00:00.000Z",
    "version": "1.0.0"
}
```

### GET /api/suggestions
Get suggested prompts for quick replies.

## 🔒 Security

- **Helmet.js**: Secure HTTP headers
- **CORS**: Cross-origin resource sharing protection
- **Rate Limiting**: Prevents abuse and API quota overrun
- **Input Validation**: Sanitizes user input
- **Environment Variables**: API keys never exposed in code

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your project to GitHub
2. Connect your GitHub repository to Vercel
3. Set environment variables in Vercel settings
4. Deploy with one click

```bash
npm i -g vercel
vercel --env-file .env
```

### Deploy to Heroku

```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set GOOGLE_API_KEY=your_key

# Deploy
git push heroku main
```

### Deploy to AWS

1. Use AWS Elastic Beanstalk
2. Set environment variables through AWS Console
3. Deploy with AWS CLI or CodePipeline

### Deploy to Railway

1. Connect GitHub repository
2. Add environment variables
3. Deploy automatically

## 📈 Performance Tips

- Enable compression: Already configured with Helmet
- Use CDN for static files: Consider Cloudflare
- Implement caching: Use Redis for conversation history
- Monitor API usage: Set up billing alerts in Google Cloud
- Scale horizontally: Use load balancer for multiple instances

## 🐛 Troubleshooting

### "API key not found" error
- Make sure `.env` file exists and has `GOOGLE_API_KEY` set
- Verify the API key is valid at [Google AI Studio](https://aistudio.google.com)

### "Module not found" error
- Run `npm install` to install all dependencies
- Check that Node.js version is 14 or higher: `node --version`

### Chat not responding
- Check browser console for errors (F12)
- Verify server is running: `http://localhost:3000/api/health`
- Check API rate limits in Google Cloud Console
- Ensure internet connection is active

### High latency
- Check network connection
- Verify server resources (CPU, RAM)
- Review API quota usage
- Consider implementing caching

## 📚 Resources

- [Google Generative AI Documentation](https://ai.google.dev/)
- [Express.js Documentation](https://expressjs.com/)
- [MDN Web Docs](https://developer.mozilla.org/)

## 📝 License

This project is licensed under the MIT License. See LICENSE file for details.

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements.

## 📞 Support

For issues and questions:
- Create an issue on GitHub
- Check the documentation
- Review the troubleshooting section

---

**XMX Chatbot** - Professional AI Assistant Built with Love ❤️
Created: November 20, 2025
Version: 1.0.0
