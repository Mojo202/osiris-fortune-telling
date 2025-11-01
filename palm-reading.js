/* ===== PALM READING ANALYSIS SYSTEM ===== */

// ===== PALM READING ENGINE =====
class PalmReadingEngine {
    constructor() {
        this.palmLines = {
            heartLine: null,
            headLine: null,
            lifeLine: null,
            fateLine: null,
            sunLine: null,
            mercuryLine: null
        };
        
        this.palmMounts = {
            venus: null,
            jupiter: null,
            saturn: null,
            apollo: null,
            mercury: null,
            mars: null,
            moon: null
        };
        
        this.fingers = {
            thumb: null,
            index: null,
            middle: null,
            ring: null,
            pinky: null
        };
        
        this.analysisResults = {};
    }
    
    // ===== MAIN ANALYSIS FUNCTION =====
    async analyzePalmImage(imageElement) {
        try {
            console.log('🔮 Starting palm analysis...');
            
            // Simulate analysis with magical effects
            await this.simulateMagicalAnalysis();
            
            // Generate comprehensive reading
            await this.generateReading();
            
            console.log('✅ Palm analysis completed');
            return this.analysisResults;
            
        } catch (error) {
            console.error('❌ Palm analysis failed:', error);
            throw error;
        }
    }
    
    // ===== SIMULATED MAGICAL ANALYSIS =====
    async simulateMagicalAnalysis() {
        // Simulate line detection
        this.palmLines.heartLine = this.generateLineData('heart');
        this.palmLines.headLine = this.generateLineData('head');
        this.palmLines.lifeLine = this.generateLineData('life');
        this.palmLines.fateLine = this.generateLineData('fate');
        
        // Simulate mount detection
        this.palmMounts.venus = this.generateMountData('venus');
        this.palmMounts.jupiter = this.generateMountData('jupiter');
        this.palmMounts.saturn = this.generateMountData('saturn');
        this.palmMounts.apollo = this.generateMountData('apollo');
        this.palmMounts.mercury = this.generateMountData('mercury');
        
        // Simulate finger analysis
        this.fingers.thumb = this.generateFingerData('thumb');
        this.fingers.index = this.generateFingerData('index');
        this.fingers.middle = this.generateFingerData('middle');
        this.fingers.ring = this.generateFingerData('ring');
        this.fingers.pinky = this.generateFingerData('pinky');
    }
    
    generateLineData(lineType) {
        const lineConfigs = {
            heart: {
                strength: Math.random() * 0.5 + 0.5,
                clarity: Math.random() * 0.6 + 0.4,
                length: Math.random() * 0.4 + 0.6,
                characteristics: ['عاطفي', 'حنون', 'مخلص', 'رومانسي', 'حساس']
            },
            head: {
                strength: Math.random() * 0.5 + 0.5,
                clarity: Math.random() * 0.6 + 0.4,
                length: Math.random() * 0.4 + 0.6,
                characteristics: ['ذكي', 'مبدع', 'منطقي', 'مفكر', 'مثقف']
            },
            life: {
                strength: Math.random() * 0.5 + 0.5,
                clarity: Math.random() * 0.6 + 0.4,
                length: Math.random() * 0.4 + 0.6,
                characteristics: ['حيوي', 'قوي', 'منيع', 'نشيط', 'صحي']
            },
            fate: {
                strength: Math.random() * 0.5 + 0.5,
                clarity: Math.random() * 0.6 + 0.4,
                length: Math.random() * 0.4 + 0.6,
                characteristics: ['محظوظ', 'ناجح', 'موفق', 'مبارك', 'ميسور']
            }
        };
        
        return lineConfigs[lineType];
    }
    
    generateMountData(mountType) {
        const mountConfigs = {
            venus: {
                influence: Math.random() * 0.6 + 0.4,
                meanings: ['حب', 'جمال', 'فن', 'عاطفة', 'جاذبية']
            },
            jupiter: {
                influence: Math.random() * 0.6 + 0.4,
                meanings: ['طموح', 'قيادي', 'ناجح', 'مؤثر', 'طموح']
            },
            saturn: {
                influence: Math.random() * 0.6 + 0.4,
                meanings: ['مسؤول', 'جاد', 'منظم', 'مثابر', 'حكيم']
            },
            apollo: {
                influence: Math.random() * 0.6 + 0.4,
                meanings: ['مبدع', 'فنان', 'مشهور', 'موهوب', 'لامع']
            },
            mercury: {
                influence: Math.random() * 0.6 + 0.4,
                meanings: ['ذكي', ' communicative', 'ماهر', 'سريع', 'مرن']
            }
        };
        
        return mountConfigs[mountType];
    }
    
    generateFingerData(fingerType) {
        const fingerConfigs = {
            thumb: {
                overallScore: Math.random() * 0.5 + 0.5,
                meanings: ['إرادة', 'قوة', 'تحكم', 'ثقة', 'عزيمة']
            },
            index: {
                overallScore: Math.random() * 0.5 + 0.5,
                meanings: ['قيادة', 'طموح', 'نجاح', 'سلطة', 'تأثير']
            },
            middle: {
                overallScore: Math.random() * 0.5 + 0.5,
                meanings: ['مسؤولية', 'جدية', 'توازن', 'حكمة', 'استقرار']
            },
            ring: {
                overallScore: Math.random() * 0.5 + 0.5,
                meanings: ['إبداع', 'فن', 'جمال', 'شعبية', 'شهرة']
            },
            pinky: {
                overallScore: Math.random() * 0.5 + 0.5,
                meanings: ['تواصل', 'مهارة', 'سرعة', 'ذكاء', 'مرونة']
            }
        };
        
        return fingerConfigs[fingerType];
    }
    
    // ===== READING GENERATION =====
    async generateReading() {
        this.analysisResults = {
            lines: this.analyzeLines(),
            mounts: this.analyzeMounts(),
            fingers: this.analyzeFingers(),
            reading: {
                love: this.generateLoveReading(),
                career: this.generateCareerReading(),
                money: this.generateMoneyReading(),
                health: this.generateHealthReading(),
                personality: this.generatePersonalityReading(),
                overall: this.generateOverallReading()
            }
        };
    }
    
    analyzeLines() {
        return {
            heartLine: {
                ...this.palmLines.heartLine,
                interpretation: this.interpretHeartLine()
            },
            headLine: {
                ...this.palmLines.headLine,
                interpretation: this.interpretHeadLine()
            },
            lifeLine: {
                ...this.palmLines.lifeLine,
                interpretation: this.interpretLifeLine()
            },
            fateLine: {
                ...this.palmLines.fateLine,
                interpretation: this.interpretFateLine()
            }
        };
    }
    
    analyzeMounts() {
        const mounts = {};
        Object.keys(this.palmMounts).forEach(mount => {
            mounts[mount] = {
                ...this.palmMounts[mount],
                interpretation: this.interpretMount(mount)
            };
        });
        return mounts;
    }
    
    analyzeFingers() {
        const fingers = {};
        Object.keys(this.fingers).forEach(finger => {
            fingers[finger] = {
                ...this.fingers[finger],
                interpretation: this.interpretFinger(finger)
            };
        });
        return fingers;
    }
    
    // ===== LINE INTERPRETATIONS =====
    interpretHeartLine() {
        const line = this.palmLines.heartLine;
        const interpretations = {
            strong: 'خط القلب القوي يدل على علاقات عاطفية عميقة ومستقرة.',
            clear: 'خط القلب الواضح يدل على صفاء القلب ونقاء المشاعر.',
            long: 'خط القلب الطويل يدل على قدرة على الحب والعطاء لفترة طويلة.',
            short: 'خط القلب القصير قد يدل على بعض التحديات في العلاقات العاطفية.'
        };
        
        let result = [];
        if (line.strength > 0.7) result.push(interpretations.strong);
        if (line.clarity > 0.7) result.push(interpretations.clear);
        if (line.length > 0.7) result.push(interpretations.long);
        else result.push(interpretations.short);
        
        return result.join(' ');
    }
    
    interpretHeadLine() {
        const line = this.palmLines.headLine;
        const interpretations = {
            strong: 'خط الرأس القوي يدل على ذكاء حاد وقدرة على التفكير.',
            clear: 'خط الرأس الواضح يدل على صفاء الذهن والقدرة على اتخاذ القرارات.',
            long: 'خط الرأس الطويل يدل على تفكير عميق وتحليل دقيق.',
            short: 'خط الرأس القصير قد يدل على التفكير العملي والسريع.'
        };
        
        let result = [];
        if (line.strength > 0.7) result.push(interpretations.strong);
        if (line.clarity > 0.7) result.push(interpretations.clear);
        if (line.length > 0.7) result.push(interpretations.long);
        else result.push(interpretations.short);
        
        return result.join(' ');
    }
    
    interpretLifeLine() {
        const line = this.palmLines.lifeLine;
        const interpretations = {
            strong: 'خط الحياة القوي يدل على صحة جيدة وطاقة عالية.',
            clear: 'خط الحياة الواضح يدل على حياة مستقرة ومتوازنة.',
            long: 'خط الحياة الطويل يدل على عمر مديد وحياة طويلة.',
            short: 'خط الحياة القصير قد يدل على الحاجة إلى العناية بالصحة.'
        };
        
        let result = [];
        if (line.strength > 0.7) result.push(interpretations.strong);
        if (line.clarity > 0.7) result.push(interpretations.clear);
        if (line.length > 0.7) result.push(interpretations.long);
        else result.push(interpretations.short);
        
        return result.join(' ');
    }
    
    interpretFateLine() {
        const line = this.palmLines.fateLine;
        const interpretations = {
            strong: 'خط القدر القوي يدل على حياة محظوظة وموفقة.',
            clear: 'خط القدر الواضح يدل على مسار واضح في الحياة.',
            long: 'خط القدر الطويل يدل على نجاح مستمر ومستمر.',
            short: 'خط القدر القصير قد يدل على الحاجة إلى بذل الجهد للنجاح.'
        };
        
        let result = [];
        if (line.strength > 0.7) result.push(interpretations.strong);
        if (line.clarity > 0.7) result.push(interpretations.clear);
        if (line.length > 0.7) result.push(interpretations.long);
        else result.push(interpretations.short);
        
        return result.join(' ');
    }
    
    // ===== MOUNT INTERPRETATIONS =====
    interpretMount(mountType) {
        const mount = this.palmMounts[mountType];
        const mountInterpretations = {
            venus: 'جبل الزهرة يدل على الحب والجمال والعاطفة.',
            jupiter: 'جبل المشتري يدل على الطموح والقيادة والنجاح.',
            saturn: 'جبل زحل يدل على المسؤولية والجدية والحكمة.',
            apollo: 'جبل أبولو يدل على الإبداع والفن والشهرة.',
            mercury: 'جبل عطارد يدل على الذكاء والتواصل والمهارة.'
        };
        
        return mountInterpretations[mountType];
    }
    
    // ===== FINGER INTERPRETATIONS =====
    interpretFinger(fingerType) {
        const finger = this.fingers[fingerType];
        const fingerInterpretations = {
            thumb: 'الإبهام يدل على الإرادة والقوة والتحكم.',
            index: 'السبابة تدل على القيادة والطموح والنجاح.',
            middle: 'الوسطى تدل على المسؤولية والجدية والتوازن.',
            ring: 'البنصر تدل على الإبداع والفن والجمال.',
            pinky: 'الخنصر يدل على التواصل والمهارة والسرعة.'
        };
        
        return fingerInterpretations[fingerType];
    }
    
    // ===== READING GENERATION =====
    generateLoveReading() {
        const heartLine = this.analysisResults.lines.heartLine;
        const venusMount = this.analysisResults.mounts.venus;
        const ringFinger = this.analysisResults.fingers.ring;
        
        const loveScore = (heartLine.strength + venusMount.influence + ringFinger.overallScore) / 3;
        
        const loveReadings = {
            high: [
                'حبك سيكون عميقاً ومخلصاً وستجد شريك حياتك قريباً.',
                'علاقاتك العاطفية ستكون ناجحة ومستقرة.',
                'ستحقق السعادة في الحب والزواج.',
                'شريكك المثالي ينتظرك في الفترة القادمة.',
                'علاقاتك ستصبح أكثر استقراراً وعمقاً.'
            ],
            medium: [
                'حياتك العاطفية ستشهد تحسناً تدريجياً.',
                'ستجد التوازن في علاقاتك العاطفية.',
                'فرص جديدة للقاء شريك الحياة ستظهر قريباً.',
                'ستتعلم دروساً قيمة من علاقاتك.',
                'علاقاتك ستصبح أكثر نضجاً وعمقاً.'
            ],
            low: [
                'تحتاج إلى التركيز على نفسك قبل البحث عن الحب.',
                'الصبر مفتاح السعادة العاطفية، لا تستعجل الأمور.',
                'ستتعلم دروساً قيمة من العلاقات السابقة.',
                'فرص جديدة ستظهر عندما تكون مستعداً نفسياً.',
                'الحب سيأتي في الوقت المناسب، استمتع بالرحلة.'
            ]
        };
        
        let reading;
        if (loveScore > 0.7) {
            reading = loveReadings.high[Math.floor(Math.random() * loveReadings.high.length)];
        } else if (loveScore > 0.4) {
            reading = loveReadings.medium[Math.floor(Math.random() * loveReadings.medium.length)];
        } else {
            reading = loveReadings.low[Math.floor(Math.random() * loveReadings.low.length)];
        }
        
        return {
            score: loveScore,
            reading: reading,
            advice: this.getLoveAdvice(loveScore),
            timeline: this.getLoveTimeline(loveScore)
        };
    }
    
    generateCareerReading() {
        const headLine = this.analysisResults.lines.headLine;
        const jupiterMount = this.analysisResults.mounts.jupiter;
        const indexFinger = this.analysisResults.fingers.index;
        
        const careerScore = (headLine.strength + jupiterMount.influence + indexFinger.overallScore) / 3;
        
        const careerReadings = {
            high: [
                'مسيرتك المهنية مشرقة جداً وستحقق نجاحاً باهراً.',
                'ستصل إلى مناصب قيادية عالية بفضل ذكائك ومهاراتك.',
                'فرص استثنائية في العمل ستأتيك قريباً.',
                'موهبتك القيادية ستقودك إلى النجاح والتميز.',
                'مستقبلك المهني مليء بالإنجازات والنجاحات.'
            ],
            medium: [
                'مسيرتك المهنية ستشهد تطوراً إيجابياً تدريجياً.',
                'ستجد توازناً بين العمل والحياة الشخصية.',
                'مهاراتك الجديدة ستفتح لك أبواباً جديدة.',
                'الصبر والمثابرة سيأتيان بثمارهما قريباً.',
                'ستحقق أهدافك المهنية بالجهد والمثابرة.'
            ],
            low: [
                'تحتاج إلى تطوير مهاراتك لتحقيق النجاح المهني.',
                'الصبر مهم في مسيرتك المهنية الحالية.',
                'ستتعلم الكثير من التحديات المهنية الحالية.',
                'فرص جديدة ستظهر عندما تكون مستعداً لها.',
                'استثمر في تطوير نفسك ومهاراتك.'
            ]
        };
        
        let reading;
        if (careerScore > 0.7) {
            reading = careerReadings.high[Math.floor(Math.random() * careerReadings.high.length)];
        } else if (careerScore > 0.4) {
            reading = careerReadings.medium[Math.floor(Math.random() * careerReadings.medium.length)];
        } else {
            reading = careerReadings.low[Math.floor(Math.random() * careerReadings.low.length)];
        }
        
        return {
            score: careerScore,
            reading: reading,
            advice: this.getCareerAdvice(careerScore),
            timeline: this.getCareerTimeline(careerScore)
        };
    }
    
    generateMoneyReading() {
        const fateLine = this.analysisResults.lines.fateLine;
        const jupiterMount = this.analysisResults.mounts.jupiter;
        const saturnMount = this.analysisResults.mounts.saturn;
        
        const moneyScore = (fateLine.strength + jupiterMount.influence + saturnMount.influence) / 3;
        
        const moneyReadings = {
            high: [
                'ستحقق ثروة كبيرة ونجاحاً مالياً باهراً.',
                'فرص استثمارية ممتازة ستأتيك قريباً.',
                'مستقبلك المالي مزدهر ومليء بالوفرة.',
                'ستحقق الاستقلال المالي والحرية الاقتصادية.',
                'أعمالك التجارية ستنجح وتحقق أرباحاً طائلة.'
            ],
            medium: [
                'وضعك المالي سيتحسن تدريجياً في الفترة القادمة.',
                'ستحقق الاستقرار المالي بالجهد والتخطيط.',
                'فرص جديدة لزيادة الدخل ستظهر قريباً.',
                'ادخارك سيؤتي ثماره في الوقت المناسب.',
                'ستجد توازناً بين الإنفاق والادخار.'
            ],
            low: [
                'تحتاج إلى التخطيط المالي الجيد لتحقيق الاستقرار.',
                'الصبر مهم في رحلتك المالية الحالية.',
                'ستتعلم دروساً قيمة في إدارة المال.',
                'فرص جديدة ستظهر عندما تكون مستعداً مالياً.',
                'ركز على بناء أساس مالي متين.'
            ]
        };
        
        let reading;
        if (moneyScore > 0.7) {
            reading = moneyReadings.high[Math.floor(Math.random() * moneyReadings.high.length)];
        } else if (moneyScore > 0.4) {
            reading = moneyReadings.medium[Math.floor(Math.random() * moneyReadings.medium.length)];
        } else {
            reading = moneyReadings.low[Math.floor(Math.random() * moneyReadings.low.length)];
        }
        
        return {
            score: moneyScore,
            reading: reading,
            advice: this.getMoneyAdvice(moneyScore),
            timeline: this.getMoneyTimeline(moneyScore)
        };
    }
    
    generateHealthReading() {
        const lifeLine = this.analysisResults.lines.lifeLine;
        const marsMount = this.analysisResults.mounts.mars;
        const thumbFinger = this.analysisResults.fingers.thumb;
        
        const healthScore = (lifeLine.strength + marsMount.influence + thumbFinger.overallScore) / 3;
        
        const healthReadings = {
            high: [
                'صحتك ممتازة وستعيش حياة طويلة ومفعمة بالحيوية.',
                'طاقتك الجسدية والنفسية في أفضل حال.',
                'جسمك قوي ومنيع ضد الأمراض.',
                'ستتمتع بصحة جيدة طوال حياتك.',
                'حيويتك وطاقتك ستستمر لسنوات طويلة.'
            ],
            medium: [
                'صحتك جيدة بشكل عام وتحتاج إلى بعض العناية.',
                'ستتمتع بصحة مستقرة مع بعض التحسينات.',
                'انتبه إلى صحتك وستكون بخير.',
                'طاقتك جيدة وتحتاج إلى الحفاظ عليها.',
                'صحتك ستتحسن مع العناية المناسبة.'
            ],
            low: [
                'تحتاج إلى الاهتمام بصحتك أكثر.',
                'الراحة والاسترخاء مهمان لصحتك.',
                'ستتعلم الاهتمام بصحتك من التحديات الحالية.',
                'استشر الطبيب بانتظام للحفاظ على صحتك.',
                'العناية الصحية ستؤتي ثمارها قريباً.'
            ]
        };
        
        let reading;
        if (healthScore > 0.7) {
            reading = healthReadings.high[Math.floor(Math.random() * healthReadings.high.length)];
        } else if (healthScore > 0.4) {
            reading = healthReadings.medium[Math.floor(Math.random() * healthReadings.medium.length)];
        } else {
            reading = healthReadings.low[Math.floor(Math.random() * healthReadings.low.length)];
        }
        
        return {
            score: healthScore,
            reading: reading,
            advice: this.getHealthAdvice(healthScore),
            timeline: this.getHealthTimeline(healthScore)
        };
    }
    
    generatePersonalityReading() {
        const allLines = Object.values(this.analysisResults.lines);
        const allMounts = Object.values(this.analysisResults.mounts);
        const allFingers = Object.values(this.analysisResults.fingers);
        
        const personalityScore = (
            allLines.reduce((sum, line) => sum + line.strength, 0) / allLines.length +
            allMounts.reduce((sum, mount) => sum + mount.influence, 0) / allMounts.length +
            allFingers.reduce((sum, finger) => sum + finger.overallScore, 0) / allFingers.length
        ) / 3;
        
        const personalityTraits = this.extractPersonalityTraits();
        
        return {
            score: personalityScore,
            traits: personalityTraits,
            description: this.generatePersonalityDescription(personalityTraits),
            strengths: this.getPersonalityStrengths(personalityTraits),
            weaknesses: this.getPersonalityWeaknesses(personalityTraits)
        };
    }
    
    extractPersonalityTraits() {
        const traits = [];
        
        // Extract from lines
        Object.values(this.analysisResults.lines).forEach(line => {
            traits.push(...line.characteristics);
        });
        
        // Extract from mounts
        Object.values(this.analysisResults.mounts).forEach(mount => {
            traits.push(...mount.meanings);
        });
        
        // Extract from fingers
        Object.values(this.analysisResults.fingers).forEach(finger => {
            traits.push(...finger.meanings);
        });
        
        // Remove duplicates and return unique traits
        return [...new Set(traits)];
    }
    
    generatePersonalityDescription(traits) {
        const descriptions = [
            `شخصيتك تتميز بـ ${traits.slice(0, 3).join(' و ')} و ${traits.slice(3, 5).join(' و ')}.`,
            `أنت شخص ${traits[0]} و ${traits[1]}، وتتمتع بقدرات فريدة في ${traits[2]}.`,
            `صفاتك البارزة تشمل ${traits.slice(0, 4).join('، ')} مما يجعلك شخصاً مميزاً.`,
            `شخصيتك تجمع بين ${traits[0]} و ${traits[1]}، مع قدرة فائقة على ${traits[2]}.`
        ];
        
        return descriptions[Math.floor(Math.random() * descriptions.length)];
    }
    
    getPersonalityStrengths(traits) {
        return traits.slice(0, 3);
    }
    
    getPersonalityWeaknesses(traits) {
        const weaknesses = ['قلق', 'تردد', 'اندفاع', 'تشكيك', 'ملل'];
        return weaknesses.slice(0, 2);
    }
    
    generateOverallReading() {
        const scores = [
            this.analysisResults.reading.love.score,
            this.analysisResults.reading.career.score,
            this.analysisResults.reading.money.score,
            this.analysisResults.reading.health.score,
            this.analysisResults.reading.personality.score
        ];
        
        const overallScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
        
        const overallReadings = {
            high: [
                'مستقبلك مشرق جداً وستحقق كل أمنياتك.',
                'النجاح والسعادة ينتظرانك في كل جوانب حياتك.',
                'أنت محظوظ جداً والكون يدعمك في كل خطواتك.',
                'حياتك ستكون مليئة بالإنجازات والنجاحات الباهرة.',
                'مستقبلك ذهبي وستحقق كل ما تتمناه.'
            ],
            medium: [
                'مستقبلك جيد وسيشهد تحسناً مستمراً.',
                'ستحقق أهدافك بالجهد والمثابرة.',
                'حياتك ستكون مستقرة ومليئة بالفرص الجيدة.',
                'النجاح سيأتيك بالصبر والعمل الجاد.',
                'مستقبلك واعد ويحتاج إلى بعض الجهد.'
            ],
            low: [
                'مستقبلك يحتاج إلى بعض الجهد والتحسين.',
                'التحديات الحالية ستجعلك أقوى في المستقبل.',
                'ستتعلم الكثير من تجاربك وتنمو وتتطور.',
                'الصبر والمثابرة سيفتحان لك أبواب النجاح.',
                'مستقبلك في يدك وستحسنه بجهودك.'
            ]
        };
        
        let reading;
        if (overallScore > 0.7) {
            reading = overallReadings.high[Math.floor(Math.random() * overallReadings.high.length)];
        } else if (overallScore > 0.4) {
            reading = overallReadings.medium[Math.floor(Math.random() * overallReadings.medium.length)];
        } else {
            reading = overallReadings.low[Math.floor(Math.random() * overallReadings.low.length)];
        }
        
        return {
            score: overallScore,
            reading: reading,
            advice: this.getOverallAdvice(overallScore),
            luckyNumbers: this.getLuckyNumbers(),
            luckyColors: this.getLuckyColors(),
            luckyDays: this.getLuckyDays()
        };
    }
    
    // ===== ADVICE GENERATION =====
    getLoveAdvice(score) {
        const advice = {
            high: 'استمر في كونك شخصاً محباً ومخلصاً، فالحب الحقيقي يبحث عن أمثالك.',
            medium: 'كن صبوراً في علاقاتك وركز على التواصل الصادق.',
            low: 'اعمل على نفسك أولاً وستجد الحب المناسب لك.'
        };
        
        if (score > 0.7) return advice.high;
        if (score > 0.4) return advice.medium;
        return advice.low;
    }
    
    getCareerAdvice(score) {
        const advice = {
            high: 'استثمر في مهاراتك وستحقق النجاح المهني.',
            medium: 'استمر في التطور والتعلم لتحقيق أهدافك المهنية.',
            low: 'ركز على تطوير مهاراتك وبناء شبكة علاقات قوية.'
        };
        
        if (score > 0.7) return advice.high;
        if (score > 0.4) return advice.medium;
        return advice.low;
    }
    
    getMoneyAdvice(score) {
        const advice = {
            high: 'استمر في التخطيط المالي الجيد والاستثمار الحكيم.',
            medium: 'ركز على الادخار والتخطيط المالي المستقبلي.',
            low: 'ابدأ في التخطيط المالي وبناء أساس مالي متين.'
        };
        
        if (score > 0.7) return advice.high;
        if (score > 0.4) return advice.medium;
        return advice.low;
    }
    
    getHealthAdvice(score) {
        const advice = {
            high: 'استمر في العناية بصحتك والحفاظ على نمط حياة صحي.',
            medium: 'انتبه إلى صحتك واجري فحوصات دورية.',
            low: 'اهتم بصحتك أكثر واجري فحوصات طبية بانتظام.'
        };
        
        if (score > 0.7) return advice.high;
        if (score > 0.4) return advice.medium;
        return advice.low;
    }
    
    getOverallAdvice(score) {
        const advice = {
            high: 'استمر في طريقك وستحقق كل أهدافك وأحلامك.',
            medium: 'استمر في الجهد والمثابرة وستحقق النجاح.',
            low: 'لا تستسلم، فالتحديات الحالية ستجعلك أقوى.'
        };
        
        if (score > 0.7) return advice.high;
        if (score > 0.4) return advice.medium;
        return advice.low;
    }
    
    // ===== TIMELINE GENERATION =====
    getLoveTimeline(score) {
        const timelines = {
            high: 'ستجد الحب الحقيقي خلال 6 أشهر القادمة.',
            medium: 'فرص جديدة للقاء شريك الحياة ستظهر خلال السنة.',
            low: 'ركز على نفسك أولاً والحب سيأتي في الوقت المناسب.'
        };
        
        if (score > 0.7) return timelines.high;
        if (score > 0.4) return timelines.medium;
        return timelines.low;
    }
    
    getCareerTimeline(score) {
        const timelines = {
            high: 'ترقية مهمة أو فرصة جديدة ستأتيك خلال 3 أشهر.',
            medium: 'تطور مهني جيد سيحدث خلال 6 أشهر.',
            low: 'فرص جديدة ستظهر عندما تكون مستعداً لها.'
        };
        
        if (score > 0.7) return timelines.high;
        if (score > 0.4) return timelines.medium;
        return timelines.low;
    }
    
    getMoneyTimeline(score) {
        const timelines = {
            high: 'فرصة مالية ممتازة ستأتيك خلال 3 أشهر.',
            medium: 'تحسن مالي جيد سيحدث خلال 6 أشهر.',
            low: 'الاستقرار المالي سيأتي بالجهد والتخطيط.'
        };
        
        if (score > 0.7) return timelines.high;
        if (score > 0.4) return timelines.medium;
        return timelines.low;
    }
    
    getHealthTimeline(score) {
        const timelines = {
            high: 'صحتك ستستمر في التحسن والازدهار.',
            medium: 'تحسن في صحتك سيحدث مع العناية المناسبة.',
            low: 'صحتك ستتحسن بالاهتمام والعناية.'
        };
        
        if (score > 0.7) return timelines.high;
        if (score > 0.4) return timelines.medium;
        return timelines.low;
    }
    
    // ===== LUCKY ELEMENTS =====
    getLuckyNumbers() {
        const numbers = [];
        for (let i = 0; i < 3; i++) {
            numbers.push(Math.floor(Math.random() * 9) + 1);
        }
        return numbers;
    }
    
    getLuckyColors() {
        const colors = ['أزرق', 'أخضر', 'أحمر', 'أصفر', 'بنفسجي', 'برتقالي'];
        return colors.slice(0, 2);
    }
    
    getLuckyDays() {
        const days = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
        return days.slice(0, 2);
    }
}

// ===== GLOBAL PALM READING INSTANCE =====
window.palmReadingEngine = new PalmReadingEngine();

// ===== PALM READING FUNCTIONS =====
async function startPalmReading() {
    try {
        console.log('🔮 Starting magical palm reading...');
        
        // Show reading section
        showSection('reading-section');
        
        // Get palm image
        const palmImage = document.getElementById('preview-image');
        if (!palmImage || !palmImage.src) {
            throw new Error('No palm image available');
        }
        
        // Start magical animation
        startReadingAnimation();
        
        // Wait for animation
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Perform analysis
        const results = await window.palmReadingEngine.analyzePalmImage(palmImage);
        
        // Store results
        window.readingResults = results;
        
        // Show results
        showReadingResults(results);
        
        console.log('✅ Palm reading completed successfully');
        
    } catch (error) {
        console.error('❌ Palm reading failed:', error);
        showNotification('فشلت قراءة الكف، يرجى المحاولة مرة أخرى', 'error');
        showSection('preview-section');
    }
}

function startReadingAnimation() {
    const readingContainer = document.querySelector('.reading-container');
    if (!readingContainer) return;
    
    // Add magical effects
    readingContainer.classList.add('magical-entrance');
    
    // Create magical particles
    createReadingParticles();
    
    // Start line drawing animation
    startLineDrawingAnimation();
}

function createReadingParticles() {
    const readingContainer = document.querySelector('.reading-container');
    if (!readingContainer) return;
    
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'magical-particles-bg';
    
    for (let i = 0; i < 25; i++) {
        const particle = document.createElement('div');
        particle.className = 'magical-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (8 + Math.random() * 8) + 's';
        particlesContainer.appendChild(particle);
    }
    
    readingContainer.appendChild(particlesContainer);
}

function startLineDrawingAnimation() {
    const palmImage = document.getElementById('reading-palm-image');
    if (!palmImage) return;
    
    // Add line drawing effect
    palmImage.classList.add('line-drawing-animation');
    
    // Create overlay canvas for line drawing
    const canvas = document.getElementById('reading-canvas');
    if (canvas) {
        drawPalmLines(canvas);
    }
}

function drawPalmLines(canvas) {
    const ctx = canvas.getContext('2d');
    const image = document.getElementById('reading-palm-image');
    
    if (!image) return;
    
    // Set canvas size
    canvas.width = image.width;
    canvas.height = image.height;
    
    // Draw magical lines
    ctx.strokeStyle = '#EC4899';
    ctx.lineWidth = 3;
    ctx.shadowColor = '#EC4899';
    ctx.shadowBlur = 10;
    
    // Animate line drawing
    let progress = 0;
    const animateLines = () => {
        if (progress < 1) {
            progress += 0.02;
            drawAnimatedLines(ctx, canvas.width, canvas.height, progress);
            requestAnimationFrame(animateLines);
        }
    };
    
    animateLines();
}

function drawAnimatedLines(ctx, width, height, progress) {
    ctx.clearRect(0, 0, width, height);
    
    // Draw heart line
    ctx.beginPath();
    ctx.moveTo(width * 0.2, height * 0.6);
    ctx.quadraticCurveTo(
        width * 0.5, height * 0.4,
        width * 0.8 * progress, height * 0.4
    );
    ctx.stroke();
    
    // Draw head line
    ctx.beginPath();
    ctx.moveTo(width * 0.15, height * 0.4);
    ctx.quadraticCurveTo(
        width * 0.5, height * 0.35,
        width * 0.85 * progress, height * 0.35
    );
    ctx.stroke();
    
    // Draw life line
    ctx.beginPath();
    ctx.moveTo(width * 0.2, height * 0.7);
    ctx.quadraticCurveTo(
        width * 0.3, height * 0.4,
        width * 0.4 * progress, height * 0.2
    );
    ctx.stroke();
}

function showReadingResults(results) {
    // Update results section
    updateResultsSection(results);
    
    // Show results section
    showSection('results-section');
    
    // Add entrance animation
    const resultsContainer = document.querySelector('.results-container');
    if (resultsContainer) {
        resultsContainer.classList.add('magical-entrance');
    }
}

function updateResultsSection(results) {
    // Update love result
    const loveResult = document.getElementById('love-result');
    if (loveResult) {
        loveResult.innerHTML = `
            <div class="result-score">نقاط: ${Math.round(results.reading.love.score * 100)}%</div>
            <div class="result-reading">${results.reading.love.reading}</div>
            <div class="result-advice">${results.reading.love.advice}</div>
            <div class="result-timeline">${results.reading.love.timeline}</div>
        `;
    }
    
    // Update career result
    const careerResult = document.getElementById('career-result');
    if (careerResult) {
        careerResult.innerHTML = `
            <div class="result-score">نقاط: ${Math.round(results.reading.career.score * 100)}%</div>
            <div class="result-reading">${results.reading.career.reading}</div>
            <div class="result-advice">${results.reading.career.advice}</div>
            <div class="result-timeline">${results.reading.career.timeline}</div>
        `;
    }
    
    // Update money result
    const moneyResult = document.getElementById('money-result');
    if (moneyResult) {
        moneyResult.innerHTML = `
            <div class="result-score">نقاط: ${Math.round(results.reading.money.score * 100)}%</div>
            <div class="result-reading">${results.reading.money.reading}</div>
            <div class="result-advice">${results.reading.money.advice}</div>
            <div class="result-timeline">${results.reading.money.timeline}</div>
        `;
    }
    
    // Update health result
    const healthResult = document.getElementById('health-result');
    if (healthResult) {
        healthResult.innerHTML = `
            <div class="result-score">نقاط: ${Math.round(results.reading.health.score * 100)}%</div>
            <div class="result-reading">${results.reading.health.reading}</div>
            <div class="result-advice">${results.reading.health.advice}</div>
            <div class="result-timeline">${results.reading.health.timeline}</div>
        `;
    }
    
    // Update personality result
    const personalityResult = document.getElementById('personality-result');
    if (personalityResult) {
        personalityResult.innerHTML = `
            <div class="result-score">نقاط: ${Math.round(results.reading.personality.score * 100)}%</div>
            <div class="result-reading">${results.reading.personality.description}</div>
            <div class="result-traits">
                <strong>صفاتك:</strong> ${results.reading.personality.traits.join('، ')}
            </div>
            <div class="result-strengths">
                <strong>نقاط القوة:</strong> ${results.reading.personality.strengths.join('، ')}
            </div>
        `;
    }
    
    // Update result image
    const resultPalmImage = document.getElementById('result-palm-image');
    if (resultPalmImage && window.capturedImage) {
        resultPalmImage.src = window.capturedImage.url;
    }
    
    // Draw final analysis on result canvas
    const resultCanvas = document.getElementById('result-canvas');
    if (resultCanvas) {
        drawFinalAnalysis(resultCanvas);
    }
}

function drawFinalAnalysis(canvas) {
    const ctx = canvas.getContext('2d');
    const image = document.getElementById('result-palm-image');
    
    if (!image) return;
    
    // Set canvas size
    canvas.width = image.width;
    canvas.height = image.height;
    
    // Draw all lines with final analysis
    ctx.strokeStyle = '#F59E0B';
    ctx.lineWidth = 4;
    ctx.shadowColor = '#F59E0B';
    ctx.shadowBlur = 15;
    
    // Draw complete analysis lines
    drawCompleteAnalysis(ctx, canvas.width, canvas.height);
}

function drawCompleteAnalysis(ctx, width, height) {
    // Draw heart line
    ctx.beginPath();
    ctx.moveTo(width * 0.2, height * 0.6);
    ctx.quadraticCurveTo(width * 0.5, height * 0.4, width * 0.8, height * 0.4);
    ctx.stroke();
    
    // Draw head line
    ctx.beginPath();
    ctx.moveTo(width * 0.15, height * 0.4);
    ctx.quadraticCurveTo(width * 0.5, height * 0.35, width * 0.85, height * 0.35);
    ctx.stroke();
    
    // Draw life line
    ctx.beginPath();
    ctx.moveTo(width * 0.2, height * 0.7);
    ctx.quadraticCurveTo(width * 0.3, height * 0.4, width * 0.4, height * 0.2);
    ctx.stroke();
    
    // Draw fate line
    ctx.beginPath();
    ctx.moveTo(width * 0.5, height * 0.9);
    ctx.lineTo(width * 0.5, height * 0.1);
    ctx.stroke();
}

// Export functions for global access
window.palmReadingFunctions = {
    startPalmReading,
    showReadingResults,
    drawPalmLines
};