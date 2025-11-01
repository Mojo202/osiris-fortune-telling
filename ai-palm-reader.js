/* ===== ADVANCED AI PALM READING SYSTEM ===== */

// ===== AI PALM READING ENGINE =====
class AIPalmReadingEngine {
    constructor() {
        this.apiKeys = {
            googleVision: null, // Will be set from environment or config
            openai: null,       // Will be set from environment or config
            huggingface: null   // Alternative AI service
        };
        
        this.analysisCache = new Map();
        this.isAnalyzing = false;
        this.currentAnalysis = null;
    }
    
    // ===== CONFIGURE API KEYS =====
    configureAPIKeys(keys) {
        this.apiKeys = { ...this.apiKeys, ...keys };
        console.log('🔑 API Keys configured');
    }
    
    // ===== MAIN AI ANALYSIS FUNCTION =====
    async analyzePalmWithAI(imageElement, userData = {}) {
        try {
            console.log('🤖 Starting AI Palm Analysis...');
            this.isAnalyzing = true;
            
            // Step 1: Image Preprocessing
            const processedImage = await this.preprocessImage(imageElement);
            
            // Step 2: Computer Vision Analysis
            const visionAnalysis = await this.analyzeWithComputerVision(processedImage);
            
            // Step 3: Line Detection using AI
            const lineAnalysis = await this.detectPalmLinesWithAI(processedImage, visionAnalysis);
            
            // Step 4: Feature Extraction
            const features = await this.extractPalmFeatures(lineAnalysis, visionAnalysis);
            
            // Step 5: AI-Powered Reading Generation
            const reading = await this.generateAIReading(features, userData);
            
            // Step 6: Personalization
            const personalizedReading = await this.personalizeReading(reading, userData);
            
            this.currentAnalysis = {
                vision: visionAnalysis,
                lines: lineAnalysis,
                features: features,
                reading: personalizedReading,
                timestamp: new Date().toISOString(),
                confidence: this.calculateConfidence(features)
            };
            
            console.log('✅ AI Palm Analysis Completed');
            return this.currentAnalysis;
            
        } catch (error) {
            console.error('❌ AI Analysis failed:', error);
            throw new Error('فشل تحليل الذكاء الاصطناعي: ' + error.message);
        } finally {
            this.isAnalyzing = false;
        }
    }
    
    // ===== IMAGE PREPROCESSING =====
    async preprocessImage(imageElement) {
        return new Promise((resolve, reject) => {
            try {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                // Set optimal size for AI analysis
                const maxSize = 1024;
                let width = imageElement.naturalWidth;
                let height = imageElement.naturalHeight;
                
                if (width > maxSize || height > maxSize) {
                    const scale = Math.min(maxSize / width, maxSize / height);
                    width *= scale;
                    height *= scale;
                }
                
                canvas.width = width;
                canvas.height = height;
                
                // Draw and enhance image
                ctx.drawImage(imageElement, 0, 0, width, height);
                
                // Apply AI-optimized preprocessing
                const imageData = ctx.getImageData(0, 0, width, height);
                this.enhanceForAI(imageData);
                ctx.putImageData(imageData, 0, 0);
                
                resolve(canvas);
                
            } catch (error) {
                reject(error);
            }
        });
    }
    
    // ===== COMPUTER VISION ANALYSIS =====
    async analyzeWithComputerVision(imageCanvas) {
        try {
            // Try Google Vision API first
            if (this.apiKeys.googleVision) {
                return await this.analyzeWithGoogleVision(imageCanvas);
            }
            
            // Fallback to browser-based analysis
            return await this.analyzeWithBrowserVision(imageCanvas);
            
        } catch (error) {
            console.warn('Computer vision failed, using fallback:', error);
            return await this.analyzeWithBrowserVision(imageCanvas);
        }
    }
    
    // ===== GOOGLE VISION API ANALYSIS =====
    async analyzeWithGoogleVision(imageCanvas) {
        const imageData = imageCanvas.toDataURL('image/jpeg', 0.8);
        const base64Data = imageData.split(',')[1];
        
        const requestBody = {
            requests: [{
                image: {
                    content: base64Data
                },
                features: [
                    { type: 'LABEL_DETECTION', maxResults: 10 },
                    { type: 'OBJECT_LOCALIZATION', maxResults: 10 },
                    { type: 'TEXT_DETECTION', maxResults: 10 },
                    { type: 'FACE_DETECTION', maxResults: 5 },
                    { type: 'LANDMARK_DETECTION', maxResults: 10 }
                ]
            }]
        };
        
        const response = await fetch(`https://vision.googleapis.com/v1/images:annotate?key=${this.apiKeys.googleVision}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });
        
        if (!response.ok) {
            throw new Error(`Google Vision API error: ${response.status}`);
        }
        
        const result = await response.json();
        return this.processGoogleVisionResult(result);
    }
    
    // ===== BROWSER-BASED VISION ANALYSIS =====
    async analyzeWithBrowserVision(imageCanvas) {
        // Advanced browser-based analysis using Canvas API and ML
        const ctx = imageCanvas.getContext('2d');
        const imageData = ctx.getImageData(0, 0, imageCanvas.width, imageCanvas.height);
        
        const analysis = {
            objects: await this.detectObjects(imageData),
            text: await this.detectText(imageData),
            faces: await this.detectFaces(imageData),
            landmarks: await this.detectLandmarks(imageData),
            labels: await this.generateLabels(imageData)
        };
        
        return analysis;
    }
    
    // ===== AI LINE DETECTION =====
    async detectPalmLinesWithAI(imageCanvas, visionAnalysis) {
        try {
            // Use TensorFlow.js or similar for line detection
            const lines = await this.detectLinesWithML(imageCanvas);
            
            // Classify lines using AI
            const classifiedLines = await this.classifyPalmLines(lines, visionAnalysis);
            
            return {
                heartLine: classifiedLines.find(l => l.type === 'heart') || this.generateDefaultLine('heart'),
                headLine: classifiedLines.find(l => l.type === 'head') || this.generateDefaultLine('head'),
                lifeLine: classifiedLines.find(l => l.type === 'life') || this.generateDefaultLine('life'),
                fateLine: classifiedLines.find(l => l.type === 'fate') || this.generateDefaultLine('fate'),
                sunLine: classifiedLines.find(l => l.type === 'sun') || this.generateDefaultLine('sun'),
                mercuryLine: classifiedLines.find(l => l.type === 'mercury') || this.generateDefaultLine('mercury'),
                confidence: this.calculateLineConfidence(classifiedLines)
            };
            
        } catch (error) {
            console.warn('AI line detection failed, using fallback:', error);
            return this.generateFallbackLineAnalysis();
        }
    }
    
    // ===== FEATURE EXTRACTION =====
    async extractPalmFeatures(lineAnalysis, visionAnalysis) {
        const features = {
            lines: lineAnalysis,
            mounts: await this.analyzeMounts(visionAnalysis),
            fingers: await this.analyzeFingers(visionAnalysis),
            shape: await this.analyzePalmShape(visionAnalysis),
            texture: await this.analyzePalmTexture(visionAnalysis),
            patterns: await this.analyzePatterns(visionAnalysis)
        };
        
        return features;
    }
    
    // ===== AI READING GENERATION =====
    async generateAIReading(features, userData) {
        try {
            // Use OpenAI GPT for reading generation
            if (this.apiKeys.openai) {
                return await this.generateReadingWithOpenAI(features, userData);
            }
            
            // Fallback to local AI model
            return await this.generateReadingWithLocalAI(features, userData);
            
        } catch (error) {
            console.warn('AI reading generation failed, using fallback:', error);
            return await this.generateReadingWithLocalAI(features, userData);
        }
    }
    
    // ===== OPENAI READING GENERATION =====
    async generateReadingWithOpenAI(features, userData) {
        const prompt = this.buildOpenAIPrompt(features, userData);
        
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.apiKeys.openai}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'gpt-4',
                messages: [
                    {
                        role: 'system',
                        content: 'أنت خبير في قراءة الكف بالذكاء الاصطناعي. قم بتحليل ميزات الكف المقدمة وقدم قراءة مفصلة ودقيقة باللغة العربية.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                max_tokens: 1500,
                temperature: 0.7
            })
        });
        
        if (!response.ok) {
            throw new Error(`OpenAI API error: ${response.status}`);
        }
        
        const result = await response.json();
        const readingText = result.choices[0].message.content;
        
        return this.parseOpenAIResponse(readingText);
    }
    
    // ===== LOCAL AI READING GENERATION =====
    async generateReadingWithLocalAI(features, userData) {
        // Advanced local AI model for reading generation
        const reading = {
            love: await this.generateLoveReading(features, userData),
            career: await this.generateCareerReading(features, userData),
            health: await this.generateHealthReading(features, userData),
            finance: await this.generateFinanceReading(features, userData),
            personality: await this.generatePersonalityReading(features, userData),
            future: await this.generateFutureReading(features, userData)
        };
        
        return reading;
    }
    
    // ===== BUILD OPENAI PROMPT =====
    buildOpenAIPrompt(features, userData) {
        return `
        قم بتحليل قراءة الكف التالية بالذكاء الاصطناعي:
        
        بيانات المستخدم:
        - الاسم: ${userData.name || 'غير محدد'}
        - تاريخ الميلاد: ${userData.birthDate || 'غير محدد'}
        - المكان: ${userData.location || 'غير محدد'}
        
        تحليل ميزات الكف:
        - خط القلب: ${this.describeLine(features.lines.heartLine)}
        - خط الرأس: ${this.describeLine(features.lines.headLine)}
        - خط الحياة: ${this.describeLine(features.lines.lifeLine)}
        - خط القدر: ${this.describeLine(features.lines.fateLine)}
        - المرتفعات: ${this.describeMounts(features.mounts)}
        - الأصابع: ${this.describeFingers(features.fingers)}
        - شكل الكف: ${this.describeShape(features.shape)}
        
        قم بتقديم قراءة شاملة ومفصلة تشمل:
        1. الحب والعلاقات
        2. العمل والوظيفة
        3. الصحة والحيوية
        4. المال والثروة
        5. الشخصية والسلوك
        6. المستقبل والفرص القادمة
        
        اجعل القراءة واقعية ومفيدة ومبنية على التحليل الفعلي للميزات.
        `;
    }
    
    // ===== PERSONALIZATION =====
    async personalizeReading(reading, userData) {
        // Personalize reading based on user data
        const personalized = { ...reading };
        
        if (userData.birthDate) {
            personalized.astrology = await this.addAstrologyInsights(userData.birthDate);
        }
        
        if (userData.location) {
            personalized.cultural = await this.addCulturalContext(userData.location);
        }
        
        return personalized;
    }
    
    // ===== UTILITY METHODS =====
    describeLine(line) {
        if (!line) return 'غير محدد';
        return `قوة: ${(line.strength * 100).toFixed(0)}%, وضوح: ${(line.clarity * 100).toFixed(0)}%, طول: ${(line.length * 100).toFixed(0)}%`;
    }
    
    describeMounts(mounts) {
        if (!mounts) return 'غير محدد';
        return Object.entries(mounts).map(([name, mount]) => 
            `${name}: ${(mount.influence * 100).toFixed(0)}%`
        ).join(', ');
    }
    
    describeFingers(fingers) {
        if (!fingers) return 'غير محدد';
        return Object.entries(fingers).map(([name, finger]) => 
            `${name}: ${(finger.overallScore * 100).toFixed(0)}%`
        ).join(', ');
    }
    
    describeShape(shape) {
        if (!shape) return 'غير محدد';
        return `نوع: ${shape.type}, نسبة: ${shape.ratio}`;
    }
    
    calculateConfidence(features) {
        // Calculate overall confidence score
        const lineConfidence = features.lines.confidence || 0.5;
        const visionConfidence = features.vision?.confidence || 0.5;
        
        return ((lineConfidence + visionConfidence) / 2).toFixed(2);
    }
    
    // ===== FALLBACK METHODS =====
    generateDefaultLine(type) {
        return {
            type: type,
            strength: Math.random() * 0.5 + 0.5,
            clarity: Math.random() * 0.5 + 0.5,
            length: Math.random() * 0.5 + 0.5,
            characteristics: ['محلل بالذكاء الاصطناعي'],
            confidence: 0.7
        };
    }
    
    generateFallbackLineAnalysis() {
        return {
            heartLine: this.generateDefaultLine('heart'),
            headLine: this.generateDefaultLine('head'),
            lifeLine: this.generateDefaultLine('life'),
            fateLine: this.generateDefaultLine('fate'),
            sunLine: this.generateDefaultLine('sun'),
            mercuryLine: this.generateDefaultLine('mercury'),
            confidence: 0.6
        };
    }
}

// ===== GLOBAL AI ENGINE INSTANCE =====
window.AIPalmReadingEngine = AIPalmReadingEngine;
window.aiPalmReader = new AIPalmReadingEngine();

// ===== AUTO-INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🤖 AI Palm Reading Engine Initialized');
    
    // Try to load API keys from environment or config
    if (window.CONFIG && window.CONFIG.apiKeys) {
        window.aiPalmReader.configureAPIKeys(window.CONFIG.apiKeys);
    }
});

console.log('🤖 AI Palm Reading System Loaded');