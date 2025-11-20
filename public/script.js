// XMX Chatbot - Frontend JavaScript with Direct Google AI REST API
// Project: projects/1001834401532
// Project Number: 1001834401532
// API Key embedded directly

const API_KEY = 'AIzaSyCZB98FI2K5F1KQEQ1tD12MfCCrlhUMHvk'; // Your Google API Key
const GOOGLE_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent';

class XMXChatbot {
    constructor() {
        this.messagesContainer = document.getElementById('chatMessages');
        this.messageInput = document.getElementById('messageInput');
        this.sendBtn = document.getElementById('sendBtn');
        this.refreshBtn = document.getElementById('refreshBtn');
        this.settingsBtn = document.getElementById('settingsBtn');
        this.settingsModal = document.getElementById('settingsModal');
        this.closeSettingsBtn = document.getElementById('closeSettings');
        this.quickRepliesSection = document.getElementById('quickReplies');
        this.quickReplyBtns = document.querySelectorAll('.quick-reply-btn');
        this.loadingIndicator = document.getElementById('loadingIndicator');
        this.toast = document.getElementById('toast');
        this.attachBtn = document.getElementById('attachBtn');
        this.clearHistoryBtn = document.getElementById('clearHistoryBtn');
        this.themeSelect = document.getElementById('themeSelect');
        this.fontSizeSlider = document.getElementById('fontSizeSlider');
        this.soundToggle = document.getElementById('soundToggle');
        
        this.chatHistory = this.loadChatHistory();
        this.conversationHistory = [];
        
        console.log('✅ Google Generative AI (REST API) initialized');
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.restoreChatHistory();
        this.setupTheme();
        this.showWelcomeAndQuickReplies();
    }

    setupEventListeners() {
        // Send message
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Quick replies
        this.quickReplyBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const prompt = btn.getAttribute('data-prompt');
                if (prompt) {
                    console.log('📌 Quick reply clicked:', prompt);
                    this.messageInput.value = prompt;
                    this.messageInput.focus();
                    setTimeout(() => {
                        this.sendMessage();
                    }, 100);
                }
            });
        });

        // Header buttons
        this.refreshBtn.addEventListener('click', () => this.newChat());
        this.settingsBtn.addEventListener('click', () => this.openSettings());
        this.closeSettingsBtn.addEventListener('click', () => this.closeSettings());
        this.clearHistoryBtn.addEventListener('click', () => this.clearChatHistory());

        // Settings
        this.themeSelect.addEventListener('change', (e) => this.setTheme(e.target.value));
        this.fontSizeSlider.addEventListener('input', (e) => this.setFontSize(e.target.value));
        this.soundToggle.addEventListener('change', (e) => this.toggleSound(e.target.checked));

        // Modal close on outside click
        this.settingsModal.addEventListener('click', (e) => {
            if (e.target === this.settingsModal) this.closeSettings();
        });

        // Attach file (placeholder)
        this.attachBtn.addEventListener('click', () => {
            this.showToast('File attachment feature coming soon!', 'warning');
        });

        // Auto-resize input
        this.messageInput.addEventListener('input', () => this.autoResizeInput());
    }

    setupTheme() {
        const savedTheme = localStorage.getItem('xmx-theme') || 'auto';
        this.themeSelect.value = savedTheme;
        this.applyTheme(savedTheme);
    }

    setTheme(theme) {
        localStorage.setItem('xmx-theme', theme);
        this.applyTheme(theme);
    }

    applyTheme(theme) {
        if (theme === 'auto') {
            document.documentElement.removeAttribute('data-theme');
        } else {
            document.documentElement.setAttribute('data-theme', theme);
        }
    }

    setFontSize(size) {
        document.documentElement.style.fontSize = size + 'px';
        localStorage.setItem('xmx-font-size', size);
    }

    toggleSound(enabled) {
        localStorage.setItem('xmx-sound', enabled);
    }

    autoResizeInput() {
        this.messageInput.style.height = 'auto';
        this.messageInput.style.height = Math.min(this.messageInput.scrollHeight, 100) + 'px';
    }

    showWelcomeAndQuickReplies() {
        if (this.chatHistory.length === 0) {
            this.quickRepliesSection.classList.add('visible');
        } else {
            this.quickRepliesSection.classList.remove('visible');
        }
    }

    async sendMessage() {
        const message = this.messageInput.value.trim();
        if (!message) return;

        this.messageInput.value = '';
        this.autoResizeInput();
        this.quickRepliesSection.classList.remove('visible');
        
        // Add user message to UI
        this.addMessageToUI(message, 'user');
        this.conversationHistory.push({ role: 'user', content: message });

        // Save to history
        this.chatHistory.push({
            timestamp: new Date().toISOString(),
            role: 'user',
            content: message
        });

        // Show typing indicator
        this.showTypingIndicator();
        this.sendBtn.disabled = true;
        this.loadingIndicator.classList.add('visible');

        try {
            // Check if user is asking about the bot's name
            const nameTriggers = ['what\'s your name', 'whats your name', 'who are you', 'what is your name', 'what are you called', 'tell me your name'];
            const lowerMessage = message.toLowerCase();
            
            if (nameTriggers.some(trigger => lowerMessage.includes(trigger))) {
                const responseText = "I'm ore, an AI assistant here to help you with anything you need!";
                this.removeTypingIndicator();
                this.addMessageToUI(responseText, 'assistant');
                this.conversationHistory.push({
                    role: 'assistant',
                    content: responseText
                });
                this.chatHistory.push({
                    timestamp: new Date().toISOString(),
                    role: 'assistant',
                    content: responseText
                });
                this.saveChatHistory();
                this.scrollToBottom();
                this.sendBtn.disabled = false;
                this.loadingIndicator.classList.remove('visible');
                this.messageInput.focus();
                return;
            }
            
            // Build the prompt with conversation history
            let fullPrompt = '';
            
            // Add previous messages for context
            if (this.conversationHistory.length > 1) {
                for (let i = 0; i < this.conversationHistory.length - 1; i++) {
                    const msg = this.conversationHistory[i];
                    fullPrompt += `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}\n\n`;
                }
            }
            
            fullPrompt += `User: ${message}`;

            // Call Google Generative AI REST API directly with timeout
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
            
            console.log('📤 Sending to Google API:', fullPrompt.substring(0, 100));
            
            const response = await fetch(`${GOOGLE_API_URL}?key=${API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: fullPrompt
                                }
                            ]
                        }
                    ],
                    generationConfig: {
                        maxOutputTokens: 1024,
                        temperature: 0.7,
                    }
                }),
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error?.message || `API Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            
            // Remove typing indicator
            this.removeTypingIndicator();

            // Extract response text
            let responseText = 'No response generated';
            if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
                responseText = data.candidates[0].content.parts[0].text;
            }
            
            // Add assistant response
            this.addMessageToUI(responseText, 'assistant');
            this.conversationHistory.push({
                role: 'assistant',
                content: responseText
            });

            // Save to history
            this.chatHistory.push({
                timestamp: new Date().toISOString(),
                role: 'assistant',
                content: responseText
            });

            // Limit history to last 50 messages
            if (this.chatHistory.length > 50) {
                this.chatHistory = this.chatHistory.slice(-50);
            }

            this.saveChatHistory();

            // Play sound if enabled
            if (localStorage.getItem('xmx-sound') !== 'false') {
                this.playNotificationSound();
            }

            // Scroll to bottom
            this.scrollToBottom();

        } catch (error) {
            console.error('Chat error:', error);
            this.removeTypingIndicator();
            
            let errorMsg = 'Error: Unable to get response';
            
            if (error.name === 'AbortError') {
                errorMsg = 'Error: Request timeout (API took too long to respond)';
            } else if (error.message.includes('Failed to fetch')) {
                errorMsg = 'Error: Network error - Check your internet connection or CORS settings';
            } else if (error.message) {
                errorMsg = `Error: ${error.message}`;
            }
            
            this.showToast(errorMsg, 'error');
            console.error('Full error details:', error);
            
            // Add error message
            this.addMessageToUI(
                `⚠️ ${errorMsg}`,
                'assistant'
            );
        } finally {
            this.sendBtn.disabled = false;
            this.loadingIndicator.classList.remove('visible');
            this.messageInput.focus();
        }
    }

    addMessageToUI(content, role) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${role}`;

        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.innerHTML = this.formatMessage(content);

        const timeDiv = document.createElement('div');
        timeDiv.className = 'message-time';
        timeDiv.textContent = this.getCurrentTime();

        messageDiv.appendChild(contentDiv);
        messageDiv.appendChild(timeDiv);

        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }

    showTypingIndicator() {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message assistant';
        messageDiv.id = 'typingIndicator';

        const contentDiv = document.createElement('div');
        contentDiv.className = 'typing-indicator';
        contentDiv.innerHTML = '<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>';

        messageDiv.appendChild(contentDiv);
        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }

    removeTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) {
            indicator.remove();
        }
    }

    formatMessage(text) {
        // Escape HTML
        let formatted = document.createElement('div').appendChild(document.createTextNode(text)).parentNode.innerHTML;

        // Format code blocks
        formatted = formatted.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');

        // Format inline code
        formatted = formatted.replace(/`([^`]+)`/g, '<code style="background: rgba(0,0,0,0.1); padding: 2px 6px; border-radius: 3px; font-family: monospace;">$1</code>');

        // Format bold
        formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        // Format italic
        formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');

        // Format links
        formatted = formatted.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" style="color: var(--primary-color); text-decoration: underline;">$1</a>');

        // Format line breaks
        formatted = formatted.replace(/\n/g, '<br>');

        return formatted;
    }

    getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    }

    scrollToBottom() {
        setTimeout(() => {
            this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
        }, 0);
    }

    newChat() {
        if (this.chatHistory.length === 0) {
            this.showToast('Chat is already empty', 'warning');
            return;
        }

        if (confirm('Are you sure you want to start a new chat? This will clear the current conversation.')) {
            this.clearChatHistory();
        }
    }

    clearChatHistory() {
        this.chatHistory = [];
        this.conversationHistory = [];
        localStorage.removeItem('xmx-chat-history');
        this.messagesContainer.innerHTML = '';
        this.showWelcomeAndQuickReplies();
        this.closeSettings();
        this.showToast('Chat history cleared', 'success');
    }

    saveChatHistory() {
        localStorage.setItem('xmx-chat-history', JSON.stringify(this.chatHistory));
    }

    loadChatHistory() {
        const saved = localStorage.getItem('xmx-chat-history');
        return saved ? JSON.parse(saved) : [];
    }

    restoreChatHistory() {
        this.chatHistory.forEach(msg => {
            this.addMessageToUI(msg.content, msg.role);
            this.conversationHistory.push({
                role: msg.role,
                content: msg.content
            });
        });
    }

    openSettings() {
        this.settingsModal.classList.add('visible');
    }

    closeSettings() {
        this.settingsModal.classList.remove('visible');
    }

    showToast(message, type = 'info') {
        this.toast.textContent = message;
        this.toast.className = `toast show ${type}`;
        
        setTimeout(() => {
            this.toast.classList.remove('show');
        }, 3000);
    }

    playNotificationSound() {
        // Create a simple notification sound using Web Audio API
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    }
}

// Initialize chatbot when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    const user = localStorage.getItem('user');
    if (!user) {
        window.location.href = '../index.html';
        return;
    }

    // Add logout button handler
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to logout?')) {
                localStorage.removeItem('user');
                window.location.href = '../index.html';
            }
        });
    }

    new XMXChatbot();
});
