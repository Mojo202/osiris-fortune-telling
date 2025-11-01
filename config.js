/* ===== CONFIGURATION FOR AI PALM READER ===== */

// ===== APPLICATION CONFIGURATION =====
window.CONFIG = {
    // ===== API KEYS (Add your actual API keys here) =====
    apiKeys: {
        // Google Vision API Key
        // Get from: https://console.cloud.google.com/
        googleVision: 'AIzaSyDLHl4FRCyYN_M8RoHIm3DgFfx1gAE6zX0',
        
        // OpenAI API Key
        // Get from: https://platform.openai.com/api-keys
        openai: 'YOUR_OPENAI_API_KEY',
        
        // Hugging Face API Key (Alternative)
        // Get from: https://huggingface.co/settings/tokens
        huggingface: 'YOUR_HUGGINGFACE_API_KEY'
    },
    
    // ===== APPLICATION SETTINGS =====
    app: {
        name: 'قارئ الكف السحري',
        version: '2.0.0',
        description: 'تطبيق ذكاء اصطناعي متقدم لقراءة الكف',
        author: 'AI Developer',
        language: 'ar',
        rtl: true
    },
    
    // ===== AI SETTINGS =====
    ai: {
        // Primary AI service to use
        primaryService: 'openai', // 'openai', 'google', 'huggingface'
        
        // Fallback service if primary fails
        fallbackService: 'local',
        
        // Analysis settings
        analysis: {
            maxImageSize: 1024,
            quality: 0.8,
            confidenceThreshold: 0.6,
            enableCache: true,
            cacheTimeout: 300000 // 5 minutes
        },
        
        // Reading generation settings
        reading: {
            maxTokens: 1500,
            temperature: 0.7,
            includeAstrology: true,
            includeCultural: true,
            personalizationLevel: 'high' // 'low', 'medium', 'high'
        }
    },
    
    // ===== UI/UX SETTINGS =====
    ui: {
        theme: 'magical',
        animations: true,
        soundEffects: true,
        particleEffects: true,
        responsive: true,
        loadingScreen: true,
        progressIndicators: true
    },
    
    // ===== CAMERA SETTINGS =====
    camera: {
        preferredResolution: '1280x720',
        maxResolution: '1920x1080',
        facingMode: 'environment', // 'user', 'environment'
        enableFilters: true,
        autoFocus: true,
        flashSupport: true
    },
    
    // ===== STORAGE SETTINGS =====
    storage: {
        useLocalStorage: true,
        maxSavedReadings: 50,
        autoCleanup: true,
        cleanupInterval: 7 // days
    },
    
    // ===== ANALYTICS SETTINGS =====
    analytics: {
        enabled: false, // Set to true to enable analytics
        trackingId: 'YOUR_GA_TRACKING_ID',
        anonymizeIp: true,
        trackEvents: ['reading_start', 'reading_complete', 'error']
    },
    
    // ===== DEVELOPMENT SETTINGS =====
    development: {
        debugMode: false,
        consoleLogging: true,
        mockAI: false, // Set to true for testing without real APIs
        showPerformanceMetrics: false
    },
    
    // ===== GITHUB PAGES SETTINGS =====
    githubPages: {
        repository: 'your-username/magical-palm-reader',
        customDomain: '', // e.g., 'magical-palm-reader.com'
        enforceHttps: true,
        enableCustom404: true
    }
};

// ===== ENVIRONMENT-BASED CONFIGURATION =====
function loadEnvironmentConfig() {
    // Load API keys from environment variables (for deployment)
    const envKeys = {
        googleVision: process.env?.GOOGLE_VISION_API_KEY,
        openai: process.env?.OPENAI_API_KEY,
        huggingface: process.env?.HUGGINGFACE_API_KEY
    };
    
    // Override config with environment variables
    Object.keys(envKeys).forEach(key => {
        if (envKeys[key]) {
            window.CONFIG.apiKeys[key] = envKeys[key];
        }
    });
    
    // Load other environment-specific settings
    if (process.env?.NODE_ENV === 'production') {
        window.CONFIG.development.debugMode = false;
        window.CONFIG.development.consoleLogging = false;
        window.CONFIG.analytics.enabled = true;
    }
    
    if (process.env?.NODE_ENV === 'development') {
        window.CONFIG.development.debugMode = true;
        window.CONFIG.development.consoleLogging = true;
        window.CONFIG.development.mockAI = true;
    }
}

// ===== CONFIGURATION VALIDATION =====
function validateConfig() {
    const requiredKeys = ['googleVision', 'openai'];
    const missingKeys = [];
    
    requiredKeys.forEach(key => {
        if (!window.CONFIG.apiKeys[key] || window.CONFIG.apiKeys[key] === 'YOUR_' + key.toUpperCase() + '_API_KEY') {
            missingKeys.push(key);
        }
    });
    
    if (missingKeys.length > 0) {
        console.warn('⚠️ Missing API keys:', missingKeys);
        console.warn('Please add your API keys to config.js or set environment variables');
        
        if (window.CONFIG.development.mockAI) {
            console.log('🤖 Running in mock AI mode for development');
        }
    } else {
        console.log('✅ All API keys configured');
    }
}

// ===== CONFIGURATION INITIALIZATION =====
function initializeConfig() {
    try {
        // Load environment-based configuration
        loadEnvironmentConfig();
        
        // Validate configuration
        validateConfig();
        
        // Apply configuration to AI engine
        if (window.aiPalmReader) {
            window.aiPalmReader.configureAPIKeys(window.CONFIG.apiKeys);
        }
        
        console.log('⚙️ Configuration loaded successfully');
        console.log('📱 App:', window.CONFIG.app.name, 'v' + window.CONFIG.app.version);
        
    } catch (error) {
        console.error('❌ Configuration initialization failed:', error);
    }
}

// ===== AUTO-INITIALIZE CONFIG =====
document.addEventListener('DOMContentLoaded', function() {
    initializeConfig();
});

// ===== EXPORT CONFIGURATION =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.CONFIG;
}

console.log('⚙️ Configuration System Loaded');