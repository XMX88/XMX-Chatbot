# 🔧 XMX Chatbot - Complete Setup & API Configuration

## ✅ Current Architecture (SECURE)

```
Frontend (Browser)
    ↓ HTTP/REST
Backend Server (Node.js + Express)
    ↓ (API Key is HERE - SECURE)
Google Generative AI API
```

### Why This is Secure
- ✅ API key is on **server-side only** (NOT in browser code)
- ✅ Frontend makes requests to your own server
- ✅ Server authenticates with Google API
- ✅ Frontend never sees the API key
- ✅ Safe to deploy publicly on GitHub

---

## 📋 Project Information

**Name:** xmx chatbot  
**Project ID:** projects/1001834401532  
**Project Number:** 1001834401532  
**Region:** Global  
**API:** Google Generative AI (Gemini)  

---

## 🚀 How to Run

### 1. Install Dependencies
```powershell
npm install
```

### 2. Start the Server
```powershell
npm run dev
```

**Expected Output:**
```
✅ XMX Chatbot Server running on port 8080
📍 API Endpoint: http://localhost:8080/api/chat
🌐 Frontend: http://localhost:8080
```

### 3. Open in Browser
```
http://localhost:8080
```

---

## 🔑 API Configuration

### API Key Location
- **Secure Location:** `.env` file (server-side only)
- **Server Code:** `src/backend/server.js`
- **Frontend:** Does NOT contain API key ✅

### Environment Setup (.env)
```
GOOGLE_API_KEY=AIzaSyCZB98FI2K5F1KQEQ1tD12MfCCrlhUMHvk
NODE_ENV=development
PORT=8080
PROJECT_NAME=projects/1001834401532
PROJECT_NUMBER=1001834401532
CHATBOT_NAME=xmx chatbot
RATE_LIMIT_WINDOW_MS=15000
RATE_LIMIT_MAX_REQUESTS=100
```

---

## 📱 Frontend Flow

1. **User enters message** → `public/script.js`
2. **Frontend sends to server** → `POST /api/chat`
3. **Server processes** → `src/backend/server.js`
4. **Server calls Google API** → Uses `.env` API key
5. **Response returns to frontend** → Displays in chat

---

## ✨ Features

- ✅ Real-time chat with Google Gemini
- ✅ Conversation history
- ✅ Professional UI/UX
- ✅ Dark mode support
- ✅ Quick reply buttons
- ✅ Settings panel (theme, font size, sound)
- ✅ Rate limiting (security)
- ✅ CORS enabled
- ✅ Helmet security headers
- ✅ Session management

---

## 🧪 Testing

### Test API Connection
```powershell
node test-api.js
```

### Expected Response
```
✅ API Connection Successful!
Response: [AI response here]
✅ All tests passed!
```

---

## 🔐 Security Features

1. **API Key Protection**
   - Stored in `.env` (server-side only)
   - Never exposed to frontend
   - `.env` added to `.gitignore`

2. **Rate Limiting**
   - Prevents abuse: 100 requests per 15 seconds
   - Configurable in `.env`

3. **Input Validation**
   - Max 5000 characters per message
   - Trim whitespace
   - Type checking

4. **CORS**
   - Enabled for local development
   - Can be restricted for production

5. **Helmet**
   - Security headers
   - XSS protection
   - Clickjacking protection

---

## 🐛 Troubleshooting

### Issue: "Cannot connect to server"
**Solution:**
1. Make sure `npm run dev` is running
2. Check port 8080 is not in use
3. Try: `netstat -ano | findstr :8080`

### Issue: "API Error"
**Solution:**
1. Verify `.env` file exists with correct API key
2. Check internet connection
3. Run: `npm install` to ensure dependencies

### Issue: "401 Unauthorized"
**Solution:**
1. API key is invalid or expired
2. Create new key at: https://makersuite.google.com/app/apikey
3. Update `.env` file
4. Restart server

---

## 📚 File Structure

```
xmx-chatbot/
├── public/
│   ├── index.html          # Login page
│   ├── dashboard.html      # Chat interface
│   ├── signup.html         # Sign up page
│   ├── script.js           # Frontend logic
│   └── styles.css          # Styling
├── src/
│   └── backend/
│       └── server.js       # Express server (API key here)
├── .env                    # Configuration (NEVER commit)
├── .gitignore              # Excludes .env and node_modules
├── package.json            # Dependencies
└── README.md               # Documentation
```

---

## 🌐 Deployment

### For Production
1. Change `NODE_ENV=production` in `.env`
2. Use HTTPS instead of HTTP
3. Restrict CORS to specific domains
4. Use database instead of in-memory storage
5. Deploy to: Vercel, Railway, Heroku, AWS, etc.

---

## 📞 Support

If you encounter issues:
1. Check the `.env` file has correct API key
2. Run `npm install` to ensure dependencies
3. Check browser console (F12) for errors
4. Run `node test-api.js` to test API
5. Share error messages for debugging

---

## ✅ Checklist Before Going Live

- [ ] API key is set in `.env`
- [ ] `.env` is in `.gitignore`
- [ ] `npm install` completed
- [ ] Server runs without errors: `npm run dev`
- [ ] Frontend loads: http://localhost:8080
- [ ] Chat works (can send messages)
- [ ] No API errors in console
- [ ] All tests pass: `node test-api.js`

---

**Last Updated:** December 7, 2025  
**Status:** ✅ Ready for deployment
