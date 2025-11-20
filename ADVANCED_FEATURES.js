// Advanced Features Configuration
// XMX Chatbot Pro Features

const ADVANCED_FEATURES = {
    // Text-to-Speech (requires external API)
    textToSpeech: {
        enabled: false,
        provider: 'google', // 'google', 'azure', 'aws-polly'
        voice: 'en-US-Standard-C',
        rate: 1.0,
        pitch: 0.0
    },

    // Speech-to-Text (requires external API)
    speechToText: {
        enabled: false,
        provider: 'google',
        language: 'en-US',
        continuous: false
    },

    // Image Recognition (requires vision API)
    imageRecognition: {
        enabled: false,
        maxFileSize: 5242880, // 5MB
        supportedFormats: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    },

    // Document Analysis
    documentAnalysis: {
        enabled: false,
        maxFileSize: 10485760, // 10MB
        supportedFormats: ['application/pdf', 'text/plain']
    },

    // Real-time Translation
    translation: {
        enabled: false,
        supportedLanguages: [
            'en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 
            'ja', 'ko', 'zh', 'ar', 'hi'
        ]
    },

    // Conversation Analytics
    analytics: {
        enabled: false,
        trackSentiment: true,
        trackKeywords: true,
        trackUserBehavior: true
    },

    // Multi-turn Conversations
    multiTurn: {
        enabled: true,
        maxHistoryLength: 50,
        persistToDatabase: false
    },

    // Response Caching
    caching: {
        enabled: true,
        ttl: 3600, // 1 hour
        maxSize: 100 // max cached responses
    },

    // Advanced Search
    search: {
        enabled: false,
        indexDocuments: false,
        maxSearchResults: 5
    },

    // API Rate Limiting
    rateLimiting: {
        enabled: true,
        windowMs: 15000,
        maxRequests: 100,
        perIP: true
    },

    // Content Filtering
    contentFiltering: {
        enabled: true,
        blockInappropriate: true,
        blockPII: false
    },

    // User Authentication
    authentication: {
        enabled: false,
        providers: ['google', 'github', 'email'],
        requireAuth: false
    },

    // Database Integration
    database: {
        enabled: false,
        type: 'mongodb', // 'mongodb', 'postgresql', 'mysql'
        provider: 'atlas' // 'atlas', 'self-hosted'
    },

    // Monitoring & Analytics
    monitoring: {
        enabled: false,
        provider: 'sentry', // 'sentry', 'datadog', 'newrelic'
        trackErrors: true,
        trackPerformance: true
    }
};

// Export for backend use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ADVANCED_FEATURES;
}
