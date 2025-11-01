/* ===== MAIN JAVASCRIPT FOR MAGICAL PALM READER ===== */

// ===== GLOBAL VARIABLES =====
let currentSection = 'welcome-section';
let userData = {};
let palmImage = null;
let stream = null;
let readingResults = {};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    createMagicalParticles();
    setupScrollAnimations();
});

// ===== APP INITIALIZATION =====
function initializeApp() {
    console.log('🔮 Magical Palm Reader Initialized');
    
    // Load saved data if exists
    loadSavedData();
    
    // Set up initial animations
    animateEntrance();
    
    // Check camera permissions
    checkCameraPermissions();
    
    // Initialize sections
    showSection('welcome-section');
}

// ===== EVENT LISTENERS SETUP =====
function setupEventListeners() {
    // Form submission
    document.getElementById('user-form')?.addEventListener('submit', handleFormSubmit);
    
    // File input changes
    document.getElementById('file-input')?.addEventListener('change', handleFileUpload);
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
    
    // Window resize
    window.addEventListener('resize', handleWindowResize);
    
    // Before unload - save data
    window.addEventListener('beforeunload', saveDataBeforeUnload);
}

// ===== SECTION MANAGEMENT =====
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('hidden');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.remove('hidden');
        
        // Add entrance animation
        targetSection.classList.add('magical-entrance');
        
        // Remove animation class after animation completes
        setTimeout(() => {
            targetSection.classList.remove('magical-entrance');
        }, 1000);
        
        currentSection = sectionId;
        
        // Section-specific initialization
        initializeSection(sectionId);
    }
    
    // Update URL hash for bookmarking
    window.location.hash = sectionId;
}

function initializeSection(sectionId) {
    switch(sectionId) {
        case 'welcome-section':
            initializeWelcomeSection();
            break;
        case 'user-form-section':
            initializeFormSection();
            break;
        case 'camera-section':
            initializeCameraSection();
            break;
        case 'preview-section':
            initializePreviewSection();
            break;
        case 'reading-section':
            initializeReadingSection();
            break;
        case 'results-section':
            initializeResultsSection();
            break;
    }
}

// ===== WELCOME SECTION =====
function initializeWelcomeSection() {
    // Add floating animations to cards
    const cards = document.querySelectorAll('.magic-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        card.classList.add('float-animation');
    });
    
    // Create magical particles
    createWelcomeParticles();
}

function createWelcomeParticles() {
    const welcomeSection = document.getElementById('welcome-section');
    if (!welcomeSection) return;
    
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'magical-particles-bg';
    
    // Create multiple particles
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'magical-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (10 + Math.random() * 10) + 's';
        particlesContainer.appendChild(particle);
    }
    
    welcomeSection.appendChild(particlesContainer);
}

function showUserForm() {
    showSection('user-form-section');
}

// ===== FORM SECTION =====
function initializeFormSection() {
    // Add input animations
    const inputs = document.querySelectorAll('.magic-input');
    inputs.forEach(input => {
        input.addEventListener('focus', handleInputFocus);
        input.addEventListener('blur', handleInputBlur);
    });
}

function handleInputFocus(event) {
    const input = event.target;
    const formGroup = input.closest('.form-group');
    if (formGroup) {
        formGroup.classList.add('focused');
    }
}

function handleInputBlur(event) {
    const input = event.target;
    const formGroup = input.closest('.form-group');
    if (formGroup) {
        formGroup.classList.remove('focused');
    }
}

function handleFormSubmit(event) {
    event.preventDefault();
    
    // Collect form data
    const formData = new FormData(event.target);
    userData = {
        name: formData.get('name'),
        birthDate: formData.get('birthDate'),
        birthTime: formData.get('birthTime'),
        birthPlace: formData.get('birthPlace')
    };
    
    // Validate data
    if (validateUserData(userData)) {
        // Save user data
        saveUserData(userData);
        
        // Show camera section
        showSection('camera-section');
        
        // Add magical transition effect
        addMagicalTransition();
    } else {
        showFormError();
    }
}

function validateUserData(data) {
    return data.name && data.name.trim() !== '' && 
           data.birthDate && data.birthDate !== '';
}

function showFormError() {
    const form = document.getElementById('user-form');
    form.classList.add('shake');
    
    setTimeout(() => {
        form.classList.remove('shake');
    }, 500);
    
    // Show error message
    showNotification('يرجى ملء جميع الحقول المطلوبة', 'error');
}

function showWelcome() {
    showSection('welcome-section');
}

// ===== CAMERA SECTION =====
function initializeCameraSection() {
    // Setup camera options
    setupCameraOptions();
    
    // Create magical background
    createCameraParticles();
}

function setupCameraOptions() {
    const cameraBtn = document.querySelector('.camera-btn');
    const uploadBtn = document.querySelectorAll('.camera-btn')[1];
    
    if (cameraBtn) {
        cameraBtn.addEventListener('click', openCamera);
    }
    
    if (uploadBtn) {
        uploadBtn.addEventListener('click', uploadImage);
    }
}

function createCameraParticles() {
    const cameraSection = document.getElementById('camera-section');
    if (!cameraSection) return;
    
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'magical-particles-bg';
    
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'magical-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particlesContainer.appendChild(particle);
    }
    
    cameraSection.appendChild(particlesContainer);
}

async function openCamera() {
    try {
        // Show camera preview
        const cameraPreview = document.getElementById('camera-preview');
        const fileUpload = document.getElementById('file-upload');
        
        if (cameraPreview) {
            cameraPreview.classList.remove('hidden');
        }
        
        if (fileUpload) {
            fileUpload.classList.add('hidden');
        }
        
        // Get user media
        stream = await navigator.mediaDevices.getUserMedia({ 
            video: { 
                facingMode: 'environment',
                width: { ideal: 1280 },
                height: { ideal: 720 }
            } 
        });
        
        const video = document.getElementById('video');
        if (video) {
            video.srcObject = stream;
        }
        
        showNotification('الكاميرا مفتوحة الآن', 'success');
        
    } catch (error) {
        console.error('Error accessing camera:', error);
        showNotification('لا يمكن الوصول للكاميرا', 'error');
        closeCamera();
    }
}

function closeCamera() {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        stream = null;
    }
    
    const video = document.getElementById('video');
    if (video) {
        video.srcObject = null;
    }
    
    const cameraPreview = document.getElementById('camera-preview');
    if (cameraPreview) {
        cameraPreview.classList.add('hidden');
    }
}

function uploadImage() {
    const cameraPreview = document.getElementById('camera-preview');
    const fileUpload = document.getElementById('file-upload');
    
    if (cameraPreview) {
        cameraPreview.classList.add('hidden');
    }
    
    if (fileUpload) {
        fileUpload.classList.remove('hidden');
    }
    
    // Trigger file input
    const hiddenFileInput = document.getElementById('hidden-file-input');
    if (hiddenFileInput) {
        hiddenFileInput.click();
    }
}

function capturePhoto() {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    
    if (video && canvas) {
        const context = canvas.getContext('2d');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0);
        
        // Convert to blob
        canvas.toBlob(function(blob) {
            const url = URL.createObjectURL(blob);
            palmImage = url;
            
            // Close camera
            closeCamera();
            
            // Show preview
            showPreview(url);
            
        }, 'image/jpeg', 0.9);
    }
}

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            palmImage = e.target.result;
            showPreview(e.target.result);
        };
        reader.readAsDataURL(file);
    }
}

// ===== PREVIEW SECTION =====
function initializePreviewSection() {
    // Setup preview controls
    setupPreviewControls();
}

function setupPreviewControls() {
    const retakeBtn = document.querySelector('.preview-controls .magic-btn');
    const startBtn = document.querySelectorAll('.preview-controls .magic-btn')[1];
    
    if (retakeBtn) {
        retakeBtn.addEventListener('click', retakePhoto);
    }
    
    if (startBtn) {
        startBtn.addEventListener('click', startPalmReading);
    }
}

function showPreview(imageUrl) {
    const previewImage = document.getElementById('preview-image');
    if (previewImage) {
        previewImage.src = imageUrl;
    }
    
    showSection('preview-section');
    
    // Add magical effects
    addPreviewEffects();
}

function addPreviewEffects() {
    const imagePreview = document.querySelector('.image-preview');
    if (imagePreview) {
        imagePreview.classList.add('enchanted-glow');
        
        // Add sparkles
        createSparkles(imagePreview);
    }
}

function createSparkles(container) {
    for (let i = 0; i < 8; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'magic-sparkle';
        sparkle.textContent = '✨';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 2 + 's';
        container.appendChild(sparkle);
    }
}

function retakePhoto() {
    showSection('camera-section');
}

// ===== READING SECTION =====
function initializeReadingSection() {
    // Start reading animation
    startReadingAnimation();
}

function startPalmReading() {
    showSection('reading-section');
    
    // Simulate reading process
    simulatePalmReading();
}

function startReadingAnimation() {
    const readingContainer = document.querySelector('.reading-container');
    if (readingContainer) {
        readingContainer.classList.add('magical-entrance');
    }
    
    // Create magical effects
    createReadingEffects();
}

function createReadingEffects() {
    const readingAnimation = document.querySelector('.reading-animation');
    if (readingAnimation) {
        // Add mystical particles
        createMysticalParticles(readingAnimation);
        
        // Add energy waves
        createEnergyWaves(readingAnimation);
    }
}

function createMysticalParticles(container) {
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.className = 'magical-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 3 + 's';
        container.appendChild(particle);
    }
}

function createEnergyWaves(container) {
    for (let i = 0; i < 3; i++) {
        const wave = document.createElement('div');
        wave.className = 'energy-wave';
        wave.style.animationDelay = i * 0.5 + 's';
        container.appendChild(wave);
    }
}

async function simulatePalmReading() {
    // Show loading animation
    const loaderText = document.querySelector('.loader-text');
    
    // Simulate reading steps
    const steps = [
        'جاري تحليل خطوط الكف...',
        'يتم فحص الخطوط الرئيسية...',
        'تحليل الخطوط الفرعية...',
        'فحص العلامات الخاصة...',
        'جاري إنشاء التقرير...'
    ];
    
    for (let i = 0; i < steps.length; i++) {
        if (loaderText) {
            loaderText.textContent = steps[i];
        }
        await sleep(1500 + Math.random() * 1000);
    }
    
    // Generate reading results
    generateReadingResults();
    
    // Show results
    setTimeout(() => {
        showResults();
    }, 1000);
}

function generateReadingResults() {
    // Generate mock reading results based on user data
    readingResults = {
        love: generateLoveReading(),
        career: generateCareerReading(),
        money: generateMoneyReading(),
        health: generateHealthReading(),
        personality: generatePersonalityReading()
    };
}

function generateLoveReading() {
    const loveReadings = [
        'خطوط يدك تشير إلى علاقة عاطفية قوية ومستقرة قادمة. ستجد الحب في مكان غير متوقع.',
        'يظهر تحليل الكف أنك شخص عاطفي وحنون. علاقتك القادمة ستكون مليئة بالرومانسية.',
        'خطوط الحب في يدك واضحة ومشرقة. انتظر لقاءً سيغير حياتك العاطفية للأبد.',
        'الكف يظهر أنك تمتلك قلباً كبيراً ومحباً. ستجد الشريك المناسب قريباً.',
        'خطوطك تدل على علاقة طويلة الأمد ومستقرة. الحب الحقيقي في طريقك إليك.'
    ];
    
    return loveReadings[Math.floor(Math.random() * loveReadings.length)];
}

function generateCareerReading() {
    const careerReadings = [
        'خطوطك تشير إلى نجاح مهني كبير. ستحقق إنجازات مهمة في مجال عملك.',
        'الكف يظهر طموحاً كبيراً وقدرات قيادية. المستقبل المهني مزدهر.',
        'خطوط النجاح واضحة في يدك. سترتقي إلى مناصب عليا وتحقق أهدافك.',
        'تحليل الكف يظهر موهبة فريدة ستميزك في مجالك المهني.',
        'خطوطك تدل على فرص عمل ممتازة قادمة. كن مستعداً للتغيير الإيجابي.'
    ];
    
    return careerReadings[Math.floor(Math.random() * careerReadings.length)];
}

function generateMoneyReading() {
    const moneyReadings = [
        'خطوط الكف تشير إلى ازدهار مالي قادم. ستحسن وضعك المالي بشكل ملحوظ.',
        'يظهر التحليل وجود فرص استثمارية ممتازة. الثروة في طريقك إليك.',
        'خطوط المال في يدك قوية ومشرقة. ستحقق الاستقرار المالي الذي تطمح إليه.',
        'الكف يظهر ذكاءً مالياً وقدرة على اتخاذ قرارات مالية حكيمة.',
        'خطوطك تدل على مكاسب مالية غير متوقعة. كن مستعداً للفرص القادمة.'
    ];
    
    return moneyReadings[Math.floor(Math.random() * moneyReadings.length)];
}

function generateHealthReading() {
    const healthReadings = [
        'خطوط الكف تشير إلى صحة جيدة وعمر طويل. حافظ على نمط حياتك الصحي.',
        'يظهر التحليل أنك تتمتع بمناعة جيدة. استمر في العناية بصحتك.',
        'خطوط الصحة في يدك واضحة ومشرقة. مستقبلك الصحي مزدهر.',
        'الكف يظهر توازناً جيداً بين الجسد والعقل. استمر في نمط حياتك المتوازن.',
        'خطوطك تدل على طاقة حيوية عالية. استغل هذه الطاقة الإيجابية.'
    ];
    
    return healthReadings[Math.floor(Math.random() * healthReadings.length)];
}

function generatePersonalityReading() {
    const personalityReadings = [
        'خطوط كفك تشير إلى شخصية قوية ومؤثرة. أنت قائد بالفطرة.',
        'يظهر التحليل أنك شخص مبدع ومبتكر. تمتلك قدرة فريدة على حل المشكلات.',
        'خطوط الشخصية في يدك عميقة وواضحة. أنت شخص موثوق ومحترم.',
        'الكف يظهر توازناً بين العقل والعاطفة. تمتلك حكمة فريدة.',
        'خطوطك تدل على شخصية متعددة المواهب. لديك قدرات خفية لم تكتشفها بعد.'
    ];
    
    return personalityReadings[Math.floor(Math.random() * personalityReadings.length)];
}

// ===== RESULTS SECTION =====
function initializeResultsSection() {
    // Display results
    displayResults();
    
    // Setup palm line drawing
    setupPalmLineDrawing();
}

function showResults() {
    showSection('results-section');
}

function displayResults() {
    // Display reading results
    document.getElementById('love-result').textContent = readingResults.love;
    document.getElementById('career-result').textContent = readingResults.career;
    document.getElementById('money-result').textContent = readingResults.money;
    document.getElementById('health-result').textContent = readingResults.health;
    document.getElementById('personality-result').textContent = readingResults.personality;
    
    // Set palm image
    const resultPalmImage = document.getElementById('result-palm-image');
    if (resultPalmImage && palmImage) {
        resultPalmImage.src = palmImage;
    }
    
    // Add magical effects
    addResultsEffects();
}

function setupPalmLineDrawing() {
    const canvas = document.getElementById('result-canvas');
    const image = document.getElementById('result-palm-image');
    
    if (canvas && image) {
        image.onload = function() {
            drawPalmLines(canvas, image);
        };
        
        if (image.complete) {
            drawPalmLines(canvas, image);
        }
    }
}

function drawPalmLines(canvas, image) {
    const ctx = canvas.getContext('2d');
    
    // Set canvas size to match image
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set drawing style
    ctx.strokeStyle = '#EC4899';
    ctx.lineWidth = 3;
    ctx.shadowColor = '#EC4899';
    ctx.shadowBlur = 10;
    
    // Draw palm lines (simplified simulation)
    drawHeartLine(ctx, canvas.width, canvas.height);
    drawHeadLine(ctx, canvas.width, canvas.height);
    drawLifeLine(ctx, canvas.width, canvas.height);
    drawFateLine(ctx, canvas.width, canvas.height);
    
    // Add magical animation
    animatePalmLines(ctx, canvas);
}

function drawHeartLine(ctx, width, height) {
    ctx.beginPath();
    ctx.moveTo(width * 0.2, height * 0.6);
    ctx.quadraticCurveTo(width * 0.5, height * 0.4, width * 0.8, height * 0.3);
    ctx.stroke();
}

function drawHeadLine(ctx, width, height) {
    ctx.beginPath();
    ctx.moveTo(width * 0.15, height * 0.4);
    ctx.quadraticCurveTo(width * 0.5, height * 0.35, width * 0.85, height * 0.4);
    ctx.stroke();
}

function drawLifeLine(ctx, width, height) {
    ctx.beginPath();
    ctx.moveTo(width * 0.2, height * 0.7);
    ctx.quadraticCurveTo(width * 0.3, height * 0.5, width * 0.4, height * 0.3);
    ctx.stroke();
}

function drawFateLine(ctx, width, height) {
    ctx.beginPath();
    ctx.moveTo(width * 0.5, height * 0.8);
    ctx.lineTo(width * 0.5, height * 0.2);
    ctx.stroke();
}

function animatePalmLines(ctx, canvas) {
    let alpha = 0;
    let increasing = true;
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update alpha
        if (increasing) {
            alpha += 0.02;
            if (alpha >= 1) increasing = false;
        } else {
            alpha -= 0.02;
            if (alpha <= 0.3) increasing = true;
        }
        
        // Set alpha
        ctx.globalAlpha = alpha;
        
        // Redraw lines
        drawHeartLine(ctx, canvas.width, canvas.height);
        drawHeadLine(ctx, canvas.width, canvas.height);
        drawLifeLine(ctx, canvas.width, canvas.height);
        drawFateLine(ctx, canvas.width, canvas.height);
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

function addResultsEffects() {
    const resultCategories = document.querySelectorAll('.result-category');
    resultCategories.forEach((category, index) => {
        category.style.animationDelay = `${index * 0.2}s`;
        category.classList.add('fade-in-up');
    });
}

function saveResults() {
    // Create results object
    const results = {
        userData: userData,
        readingResults: readingResults,
        palmImage: palmImage,
        timestamp: new Date().toISOString()
    };
    
    // Save to localStorage
    localStorage.setItem('palmReadingResults', JSON.stringify(results));
    
    showNotification('تم حفظ النتائج بنجاح', 'success');
}

function shareResults() {
    // Create share text
    const shareText = `لقد قمت بقراءة كفي باستخدام قارئ الكف السحري! 📱✨\n\n` +
                     `النتائج:\n` +
                     `❤️ الحب: ${readingResults.love}\n` +
                     `💼 المهنة: ${readingResults.career}\n` +
                     `💰 المال: ${readingResults.money}\n` +
                     `🏥 الصحة: ${readingResults.health}\n` +
                     `🌟 الشخصية: ${readingResults.personality}`;
    
    // Share functionality (simplified)
    if (navigator.share) {
        navigator.share({
            title: 'نتائج قراءة الكف',
            text: shareText
        });
    } else {
        // Fallback - copy to clipboard
        navigator.clipboard.writeText(shareText).then(() => {
            showNotification('تم نسخ النتائج للحافظة', 'success');
        });
    }
}

function newReading() {
    // Reset data
    userData = {};
    palmImage = null;
    readingResults = {};
    
    // Show welcome section
    showSection('welcome-section');
}

// ===== UTILITY FUNCTIONS =====
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function addMagicalTransition() {
    // Add magical transition effect between sections
    const body = document.body;
    body.style.transition = 'all 0.5s ease';
    
    setTimeout(() => {
        body.style.transition = '';
    }, 500);
}

function createMagicalParticles() {
    // Create magical particles for the entire app
    const body = document.body;
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'magical-particles-bg';
    particlesContainer.style.position = 'fixed';
    particlesContainer.style.top = '0';
    particlesContainer.style.left = '0';
    particlesContainer.style.width = '100%';
    particlesContainer.style.height = '100%';
    particlesContainer.style.pointerEvents = 'none';
    particlesContainer.style.zIndex = '-1';
    
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.className = 'magical-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        particlesContainer.appendChild(particle);
    }
    
    body.appendChild(particlesContainer);
}

function animateEntrance() {
    // Animate entrance of main elements
    const mainElements = document.querySelectorAll('.magic-header, .main-content');
    mainElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.8s ease-out';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

function setupScrollAnimations() {
    // Setup scroll-based animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observe elements with animate-on-scroll class
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

function checkCameraPermissions() {
    // Check if camera is available
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.warn('Camera not available');
        return;
    }
}

function handleKeyboardShortcuts(event) {
    // Handle keyboard shortcuts
    switch(event.key) {
        case 'Escape':
            // Go back to welcome
            showSection('welcome-section');
            break;
        case 'Enter':
            // Handle form submission if in form section
            if (currentSection === 'user-form-section') {
                const form = document.getElementById('user-form');
                if (form) {
                    form.dispatchEvent(new Event('submit'));
                }
            }
            break;
    }
}

function handleWindowResize() {
    // Handle window resize
    // Add responsive adjustments here
}

function saveDataBeforeUnload() {
    // Save data before page unload
    saveUserData(userData);
}

// ===== DATA MANAGEMENT =====
function saveUserData(data) {
    localStorage.setItem('palmReaderUserData', JSON.stringify(data));
}

function loadSavedData() {
    const saved = localStorage.getItem('palmReaderUserData');
    if (saved) {
        userData = JSON.parse(saved);
    }
}

function loadSavedData() {
    const saved = localStorage.getItem('palmReaderUserData');
    if (saved) {
        userData = JSON.parse(saved);
    }
}

// ===== NAVIGATION FUNCTIONS =====
function showHistory() {
    // Show reading history
    const savedResults = localStorage.getItem('palmReadingResults');
    if (savedResults) {
        const results = JSON.parse(savedResults);
        showNotification('توجد نتائج محفوظة', 'info');
        // TODO: Implement history display
    } else {
        showNotification('لا توجد نتائج محفوظة', 'info');
    }
}

function showSettings() {
    // Show settings modal
    showNotification('الإعدادات قيد التطوير', 'info');
    // TODO: Implement settings modal
}

// ===== INITIALIZATION CALL =====
// Initialize app when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// ===== GLOBAL CAMERA FUNCTIONS =====
// Make camera functions globally available

// ===== GLOBAL FUNCTIONS FOR HTML BUTTONS =====

// Camera Functions
window.openCamera = async function() {
    try {
        console.log('📷 Opening camera...');
        
        // Check if camera is supported
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            showNotification('الكاميرا غير مدعومة في هذا المتصفح', 'error');
            return;
        }
        
        // Show camera preview
        const cameraPreview = document.getElementById('camera-preview');
        const fileUpload = document.getElementById('file-upload');
        
        if (cameraPreview) {
            cameraPreview.classList.remove('hidden');
            cameraPreview.classList.add('magical-entrance');
        }
        
        if (fileUpload) {
            fileUpload.classList.add('hidden');
        }
        
        // Get camera constraints
        const constraints = {
            video: {
                width: { ideal: 1280, max: 1920 },
                height: { ideal: 720, max: 1080 },
                facingMode: 'environment'
            },
            audio: false
        };
        
        try {
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            const video = document.getElementById('video');
            if (video) {
                video.srcObject = stream;
                video.onloadedmetadata = () => {
                    video.play();
                    showNotification('الكاميرا مفتوحة بنجاح', 'success');
                };
            }
            
            // Store stream globally
            window.currentStream = stream;
            
        } catch (error) {
            console.error('Camera access error:', error);
            showNotification('فشل الوصول للكاميرا. يرجى التحقق من الأذونات', 'error');
        }
        
    } catch (error) {
        console.error('Error opening camera:', error);
        showNotification('حدث خطأ أثناء فتح الكاميرا', 'error');
    }
};

window.uploadImage = function() {
    try {
        console.log('📤 Opening image upload...');
        
        // Create file input if it doesn't exist
        let fileInput = document.getElementById('hidden-file-input');
        if (!fileInput) {
            fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.id = 'hidden-file-input';
            fileInput.accept = 'image/*';
            fileInput.style.display = 'none';
            document.body.appendChild(fileInput);
        }
        
        // Add change event listener
        fileInput.onchange = function(event) {
            const file = event.target.files[0];
            if (file) {
                handleFileUpload(file);
            }
        };
        
        // Trigger file selection
        fileInput.click();
        
    } catch (error) {
        console.error('Error uploading image:', error);
        showNotification('حدث خطأ أثناء تحميل الصورة', 'error');
    }
};

window.capturePhoto = function() {
    try {
        console.log('📸 Capturing photo...');
        
        const video = document.getElementById('video');
        const canvas = document.getElementById('canvas');
        
        if (!video || !canvas) {
            showNotification('لم يتم العثور على الكاميرا', 'error');
            return;
        }
        
        const context = canvas.getContext('2d');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        // Draw video frame to canvas
        context.drawImage(video, 0, 0);
        
        // Get image data
        const imageData = canvas.toDataURL('image/jpeg');
        
        // Store image globally
        window.palmImage = imageData;
        
        // Close camera
        closeCamera();
        
        // Show preview
        showPreview(imageData);
        
        showNotification('تم التقاط الصورة بنجاح', 'success');
        
    } catch (error) {
        console.error('Error capturing photo:', error);
        showNotification('حدث خطأ أثناء التقاط الصورة', 'error');
    }
};

window.closeCamera = function() {
    try {
        console.log('📷 Closing camera...');
        
        // Stop video stream
        if (window.currentStream) {
            window.currentStream.getTracks().forEach(track => track.stop());
            window.currentStream = null;
        }
        
        // Hide camera preview
        const cameraPreview = document.getElementById('camera-preview');
        if (cameraPreview) {
            cameraPreview.classList.add('hidden');
        }
        
        // Clear video source
        const video = document.getElementById('video');
        if (video) {
            video.srcObject = null;
        }
        
    } catch (error) {
        console.error('Error closing camera:', error);
    }
};

window.retakePhoto = function() {
    showSection('camera-section');
};

window.startReading = function() {
    if (!window.palmImage) {
        showNotification('لا توجد صورة للتحليل', 'error');
        return;
    }
    
    showSection('reading-section');
    
    // Start palm reading analysis
    setTimeout(async () => {
        try {
            const palmEngine = new PalmReadingEngine();
            const results = await palmEngine.analyzePalmImage(window.palmImage);
            
            // Show results
            showResults(results);
            
        } catch (error) {
            console.error('Error during palm reading:', error);
            showNotification('حدث خطأ أثناء تحليل الكف', 'error');
            showSection('preview-section');
        }
    }, 2000);
};

window.saveResults = function() {
    try {
        const results = window.readingResults;
        if (!results) {
            showNotification('لا توجد نتائج للحفظ', 'error');
            return;
        }
        
        // Save to localStorage
        const savedReadings = JSON.parse(localStorage.getItem('palmReadings') || '[]');
        const newReading = {
            id: Date.now(),
            date: new Date().toISOString(),
            userData: window.userData,
            results: results,
            image: window.palmImage
        };
        
        savedReadings.push(newReading);
        localStorage.setItem('palmReadings', JSON.stringify(savedReadings));
        
        showNotification('تم حفظ النتائج بنجاح', 'success');
        
    } catch (error) {
        console.error('Error saving results:', error);
        showNotification('حدث خطأ أثناء حفظ النتائج', 'error');
    }
};

window.shareResults = function() {
    try {
        const results = window.readingResults;
        if (!results) {
            showNotification('لا توجد نتائج للمشاركة', 'error');
            return;
        }
        
        // Create share text
        const shareText = `🔮 قراءة الكف السحرية\n\n${window.userData.name}\n\n${results.summary}\n\n#قارئ_الكف_السحري`;
        
        // Try to use Web Share API
        if (navigator.share) {
            navigator.share({
                title: 'قراءة الكف السحرية',
                text: shareText
            }).catch(error => {
                console.log('Share cancelled');
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(shareText).then(() => {
                showNotification('تم نسخ النتائج للحافظة', 'success');
            });
        }
        
    } catch (error) {
        console.error('Error sharing results:', error);
        showNotification('حدث خطأ أثناء مشاركة النتائج', 'error');
    }
};

window.newReading = function() {
    // Reset data
    window.palmImage = null;
    window.readingResults = null;
    window.userData = {};
    
    // Go to welcome section
    showSection('welcome-section');
};

window.showHistory = function() {
    try {
        const savedReadings = JSON.parse(localStorage.getItem('palmReadings') || '[]');
        
        if (savedReadings.length === 0) {
            showNotification('لا توجد قراءات سابقة', 'info');
            return;
        }
        
        // Show history (simplified for now)
        let historyText = '📜 سجل القراءات:\n\n';
        savedReadings.forEach((reading, index) => {
            const date = new Date(reading.date).toLocaleDateString('ar-SA');
            historyText += `${index + 1}. ${reading.userData.name} - ${date}\n`;
        });
        
        showNotification(historyText, 'info', 5000);
        
    } catch (error) {
        console.error('Error showing history:', error);
        showNotification('حدث خطأ أثناء عرض السجل', 'error');
    }
};

window.showSettings = function() {
    showNotification('الإعدادات قيد التطوير', 'info');
};

// Helper Functions
function showPreview(imageData) {
    const previewImage = document.getElementById('preview-image');
    if (previewImage) {
        previewImage.src = imageData;
    }
    showSection('preview-section');
}

function showResults(results) {
    window.readingResults = results;
    
    // Set palm image
    const resultPalmImage = document.getElementById('result-palm-image');
    if (resultPalmImage) {
        resultPalmImage.src = window.palmImage;
    }
    
    // Populate results container
    const resultsContainer = document.getElementById('results-container');
    if (resultsContainer) {
        resultsContainer.innerHTML = `
            <div class="result-card">
                <h3><i class="fas fa-heart"></i> الحب والعلاقات</h3>
                <p>${results.love?.reading || 'جاري التحليل...'}</p>
            </div>
            <div class="result-card">
                <h3><i class="fas fa-briefcase"></i> العمل والوظيفة</h3>
                <p>${results.career?.reading || 'جاري التحليل...'}</p>
            </div>
            <div class="result-card">
                <h3><i class="fas fa-coins"></i> المال والثروة</h3>
                <p>${results.wealth?.reading || 'جاري التحليل...'}</p>
            </div>
            <div class="result-card">
                <h3><i class="fas fa-heartbeat"></i> الصحة والحيوية</h3>
                <p>${results.health?.reading || 'جاري التحليل...'}</p>
            </div>
            <div class="result-card">
                <h3><i class="fas fa-user"></i> الشخصية والسلوك</h3>
                <p>${results.personality?.reading || 'جاري التحليل...'}</p>
            </div>
        `;
    }
    
    showSection('results-section');
}

function handleFileUpload(file) {
    try {
        console.log('📤 Handling file upload...');
        
        // Validate file
        if (!file.type.startsWith('image/')) {
            showNotification('يرجى اختيار ملف صورة', 'error');
            return;
        }
        
        if (file.size > 10 * 1024 * 1024) { // 10MB
            showNotification('حجم الملف كبير جداً. الحد الأقصى 10MB', 'error');
            return;
        }
        
        // Read file
        const reader = new FileReader();
        reader.onload = function(e) {
            window.palmImage = e.target.result;
            showPreview(e.target.result);
            showNotification('تم تحميل الصورة بنجاح', 'success');
        };
        
        reader.onerror = function() {
            showNotification('فشل قراءة الملف', 'error');
        };
        
        reader.readAsDataURL(file);
        
    } catch (error) {
        console.error('Error handling file upload:', error);
        showNotification('حدث خطأ أثناء تحميل الملف', 'error');
    }
}

// Form submission handler
document.addEventListener('DOMContentLoaded', function() {
    const userForm = document.getElementById('user-form');
    if (userForm) {
        userForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(userForm);
            window.userData = {
                name: formData.get('name'),
                birthDate: formData.get('birthDate'),
                birthTime: formData.get('birthTime'),
                birthPlace: formData.get('birthPlace')
            };
            
            // Validate form
            if (!window.userData.name || !window.userData.birthDate || !window.userData.birthPlace) {
                showNotification('يرجى ملء جميع الحقول المطلوبة', 'error');
                return;
            }
            
            // Go to camera section
            showSection('camera-section');
            showNotification('تم حفظ البيانات بنجاح', 'success');
        });
    }
});