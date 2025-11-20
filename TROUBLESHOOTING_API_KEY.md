# ⚠️ TROUBLESHOOTING - Error: "Unable to get response"

If you're seeing this error, follow these steps:

## 🔍 STEP 1: Verify .env File

Your .env file has been created. Now you MUST add your Google API key:

### Windows (PowerShell):
```powershell
notepad "c:\Users\addis\XMX Chatbot\.env"
```

### Mac/Linux:
```bash
nano ~/.config/XMX\ Chatbot/.env
# or
nano ./env
```

### In the .env file, you should see:
```
GOOGLE_API_KEY=your_api_key_from_google_ai_studio
NODE_ENV=development
PORT=3000
RATE_LIMIT_WINDOW_MS=15000
RATE_LIMIT_MAX_REQUESTS=100
```

✅ **Replace `your_api_key_from_google_ai_studio` with your actual API key**

---

## 🔑 STEP 2: Get Your Google API Key

If you don't have an API key yet:

1. **Visit:** https://aistudio.google.com
2. **Click:** "Get API Key" (top-right button)
3. **Click:** "Create API key in new project"
4. **Copy:** Your API key
5. **Paste** it in your .env file

---

## 🚀 STEP 3: Restart the Server

After adding your API key:

1. **Stop the server:** Press `Ctrl+C` in the terminal
2. **Restart the server:**
   ```bash
   npm run dev
   ```
3. **Wait** for message: "Starting on port 3000"

---

## ✅ STEP 4: Test Again

1. **Refresh** your browser: `Ctrl+R` or `Cmd+R`
2. **Clear cache** if needed: `Ctrl+Shift+Delete`
3. **Type** a test message: "Hello"
4. **Send** the message

You should now see a response!

---

## 🆘 Still Getting Errors?

### Error: "API key not found"
- ✅ Check .env file exists in your project folder
- ✅ Check API key is NOT "your_api_key_from_google_ai_studio"
- ✅ Check there are no spaces around the = sign
- ✅ Check the API key is valid at aistudio.google.com

### Error: "Network error"
- ✅ Check your internet connection
- ✅ Check if Google AI service is up
- ✅ Try restarting your router

### Error: "PERMISSION_DENIED"
- ✅ Your API key might be invalid
- ✅ Get a new key from aistudio.google.com
- ✅ Make sure it's a valid key

### Error: "Rate limit exceeded"
- ✅ You've made too many requests too quickly
- ✅ Wait a few seconds and try again
- ✅ This shouldn't happen with normal usage

### Error: "Server not responding"
- ✅ Is the server running? Check terminal
- ✅ Run: `npm run dev`
- ✅ Check if port 3000 is in use
- ✅ Try: `$env:PORT=3001; npm run dev`

---

## 📋 Verification Checklist

Before trying again, verify:

- [ ] .env file exists in your project folder
- [ ] GOOGLE_API_KEY line is in .env file
- [ ] API key is NOT "your_api_key_from_google_ai_studio"
- [ ] Server is running (check terminal)
- [ ] Terminal shows "Starting on port 3000"
- [ ] Browser is on http://localhost:3000
- [ ] You refreshed the page after restarting server

---

## 🎯 Quick Verification

To verify your server is working:

Open this in your browser:
```
http://localhost:3000/api/health
```

You should see:
```json
{
  "status": "healthy",
  "timestamp": "...",
  "version": "1.0.0"
}
```

If you see this, your server is working! The error is in the API key configuration.

---

## 📞 Complete Troubleshooting Flow

### 1. Stop server
```bash
Ctrl+C
```

### 2. Edit .env
```bash
# Windows
notepad .env

# Mac/Linux
nano .env
```

### 3. Add your API key
```
GOOGLE_API_KEY=your_actual_key_here
```

### 4. Save and close editor

### 5. Restart server
```bash
npm run dev
```

### 6. Refresh browser
```
http://localhost:3000
```

### 7. Try again
- Type: "Hello"
- Press: Enter
- Wait for response

---

## 💡 Pro Tips

1. **Don't share your API key** - keep .env private!
2. **Use free tier** - 60 requests/minute is plenty for testing
3. **Check console** - Press F12 in browser to see detailed errors
4. **Watch terminal** - Server shows what's happening
5. **Restart often** - Restart server after changing .env

---

## 🆘 If Still Not Working

1. **Terminal Output:** Copy the error message from terminal
2. **Browser Console:** Press F12 and check Console tab
3. **Check Health:** Visit http://localhost:3000/api/health
4. **Restart Everything:**
   - Stop server: Ctrl+C
   - Close browser tab
   - Run: npm run dev
   - Refresh browser: Ctrl+R

---

**Your chatbot should now be working! 🎉**

If you have additional issues, please share:
1. The error message you see
2. Your terminal output
3. The browser console error (F12)
