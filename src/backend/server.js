require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { v4: uuidv4 } = require('uuid');

// Initialize Express
const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Google Generative AI
if (!process.env.GOOGLE_API_KEY) {
    console.error('❌ ERROR: GOOGLE_API_KEY is not set in .env file!');
    console.error('Please add your API key to the .env file and restart the server.');
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Rate limiting
const limiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || 15000),
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || 100),
    message: 'Too many requests, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});

app.use(limiter);

// Static files
app.use(express.static(path.join(__dirname, '../public')));

// Store conversation sessions (in production, use a database)
const conversationSessions = new Map();

// Serve index.html for root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
    try {
        const { message, history = [] } = req.body;

        // Validation
        if (!message || typeof message !== 'string') {
            return res.status(400).json({
                success: false,
                error: 'Invalid message format'
            });
        }

        const trimmedMessage = message.trim();
        if (trimmedMessage.length === 0) {
            return res.status(400).json({
                success: false,
                error: 'Message cannot be empty'
            });
        }

        if (trimmedMessage.length > 5000) {
            return res.status(400).json({
                success: false,
                error: 'Message is too long (max 5000 characters)'
            });
        }

        // Get the generative model
        const model = genAI.getGenerativeModel({ 
            model: 'gemini-pro'
        });

        // Format conversation history for the model
        const conversationHistory = history.map(msg => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content }]
        }));

        // Send message and get response
        let result;
        
        if (conversationHistory.length > 0) {
            // Use startChat for multi-turn conversations with history
            const chat = model.startChat({
                history: conversationHistory
            });
            result = await chat.sendMessage(trimmedMessage);
        } else {
            // Use generateContent for first message
            result = await model.generateContent(trimmedMessage);
        }
        
        const responseText = result.response.text();

        // Validate response
        if (!responseText || responseText.trim().length === 0) {
            return res.status(500).json({
                success: false,
                error: 'Failed to generate response'
            });
        }

        // Return response
        res.json({
            success: true,
            response: responseText,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('❌ Chat API Error:', error.message);
        console.error('Full Error:', error);

        // Handle specific error cases
        if (error.message && error.message.includes('API key')) {
            return res.status(500).json({
                success: false,
                error: 'API configuration error. Please add your Google API key to the .env file and restart the server.',
                details: 'GOOGLE_API_KEY not configured'
            });
        }

        if (error.message && error.message.includes('INVALID_ARGUMENT')) {
            return res.status(400).json({
                success: false,
                error: 'Invalid request. The API key may be invalid or the request format is incorrect.',
                details: error.message
            });
        }

        if (error.message && error.message.includes('PERMISSION_DENIED')) {
            return res.status(403).json({
                success: false,
                error: 'API key does not have permission. Please check your Google AI Studio credentials.',
                details: error.message
            });
        }

        if (error.message && error.message.includes('quota') || error.message.includes('RESOURCE_EXHAUSTED')) {
            return res.status(429).json({
                success: false,
                error: 'API quota exceeded. Please wait a moment and try again.',
                details: 'Rate limit reached'
            });
        }

        if (error.message && error.message.includes('network')) {
            return res.status(503).json({
                success: false,
                error: 'Network error. Please check your internet connection.',
                details: error.message
            });
        }

        res.status(500).json({
            success: false,
            error: 'An error occurred processing your request. Please try again.',
            details: error.message
        });
    }
});

// Get chat suggestions
app.get('/api/suggestions', (req, res) => {
    const suggestions = [
        { 
            icon: 'question-circle',
            text: 'What can you help me with?'
        },
        {
            icon: 'atom',
            text: 'Explain quantum computing in simple terms'
        },
        {
            icon: 'envelope',
            text: 'Write a professional email for me'
        },
        {
            icon: 'code',
            text: 'Help me debug this code problem'
        },
        {
            icon: 'trending-up',
            text: 'What are the latest tech trends?'
        },
        {
            icon: 'utensils',
            text: 'Create a meal plan for the week'
        },
        {
            icon: 'lightbulb',
            text: 'Give me creative ideas for my project'
        },
        {
            icon: 'book',
            text: 'Explain this complex topic'
        }
    ];

    res.json({
        success: true,
        suggestions: suggestions
    });
});

// Advanced analysis endpoint (for future use)
app.post('/api/analyze', async (req, res) => {
    try {
        const { text, analysisType = 'general' } = req.body;

        if (!text || typeof text !== 'string') {
            return res.status(400).json({
                success: false,
                error: 'Invalid text'
            });
        }

        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

        let prompt = '';
        switch (analysisType) {
            case 'sentiment':
                prompt = `Analyze the sentiment of this text and provide: sentiment (positive/negative/neutral), confidence score (0-1), and key emotions.\n\nText: ${text}`;
                break;
            case 'summary':
                prompt = `Provide a concise summary of this text:\n\n${text}`;
                break;
            case 'keywords':
                prompt = `Extract the top 10 keywords from this text:\n\n${text}`;
                break;
            default:
                prompt = `Provide a general analysis of this text:\n\n${text}`;
        }

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        res.json({
            success: true,
            analysis: responseText,
            analysisType: analysisType,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Analysis Error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to perform analysis'
        });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server Error:', err);
    
    res.status(err.status || 500).json({
        success: false,
        error: process.env.NODE_ENV === 'production' 
            ? 'Internal server error' 
            : err.message
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Endpoint not found'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════════════════════╗
║                    XMX CHATBOT SERVER                      ║
║                    Starting on port ${PORT}                      ║
╚════════════════════════════════════════════════════════════╝

🤖 Chatbot API: http://localhost:${PORT}
📊 Health Check: http://localhost:${PORT}/api/health
🎯 Main App: http://localhost:${PORT}/

Environment: ${process.env.NODE_ENV || 'development'}
API Key Status: ${process.env.GOOGLE_API_KEY ? '✅ Configured' : '❌ Not configured'}

    `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('SIGINT signal received: closing HTTP server');
    process.exit(0);
});

module.exports = app;
