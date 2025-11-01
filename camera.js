/* ===== CAMERA FUNCTIONALITY FOR MAGICAL PALM READER ===== */

// ===== CAMERA MANAGEMENT =====
let currentStream = null;
let currentDeviceId = null;
let devices = [];
let isCapturing = false;

// ===== CAMERA INITIALIZATION =====
async function initializeCamera() {
    try {
        // Get available devices
        devices = await navigator.mediaDevices.enumerateDevices();
        devices = devices.filter(device => device.kind === 'videoinput');
        
        // Set up camera UI
        setupCameraUI();
        
        // Check permissions
        await checkCameraPermissions();
        
        console.log('📷 Camera initialized successfully');
        return true;
    } catch (error) {
        console.error('❌ Camera initialization failed:', error);
        showCameraError('فشل تهيئة الكاميرا');
        return false;
    }
}

// ===== CAMERA PERMISSIONS =====
async function checkCameraPermissions() {
    try {
        const permissions = await navigator.permissions.query({ name: 'camera' });
        
        if (permissions.state === 'denied') {
            showCameraError('تم رفض إذن الوصول للكاميرا');
            return false;
        }
        
        if (permissions.state === 'prompt') {
            showCameraPrompt('يحتاج التطبيق إلى إذن الوصول للكاميرا');
        }
        
        return true;
    } catch (error) {
        console.warn('Could not check camera permissions:', error);
        return true; // Assume permission is available
    }
}

// ===== CAMERA OPERATIONS =====
async function openCamera(deviceId = null) {
    try {
        // Close existing stream
        await closeCamera();
        
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
        const constraints = getCameraConstraints(deviceId);
        
        // Get user media
        currentStream = await navigator.mediaDevices.getUserMedia(constraints);
        currentDeviceId = deviceId || constraints.video.deviceId;
        
        // Setup video element
        const video = document.getElementById('video');
        if (video) {
            video.srcObject = currentStream;
            video.onloadedmetadata = () => {
                video.play();
                setupVideoAnalysis();
            };
        }
        
        // Add magical effects
        addCameraMagicEffects();
        
        showNotification('الكاميرا مفتوحة بنجاح', 'success');
        
        return true;
    } catch (error) {
        console.error('❌ Error opening camera:', error);
        handleCameraError(error);
        return false;
    }
}

function getCameraConstraints(deviceId = null) {
    const baseConstraints = {
        video: {
            width: { ideal: 1280, max: 1920 },
            height: { ideal: 720, max: 1080 },
            facingMode: 'environment',
            aspectRatio: 16/9
        },
        audio: false
    };
    
    if (deviceId) {
        baseConstraints.video.deviceId = { exact: deviceId };
    }
    
    return baseConstraints;
}

async function closeCamera() {
    try {
        if (currentStream) {
            currentStream.getTracks().forEach(track => {
                track.stop();
            });
            currentStream = null;
        }
        
        const video = document.getElementById('video');
        if (video) {
            video.srcObject = null;
        }
        
        currentDeviceId = null;
        
        console.log('📷 Camera closed');
        return true;
    } catch (error) {
        console.error('❌ Error closing camera:', error);
        return false;
    }
}

// ===== PHOTO CAPTURE =====
async function capturePhoto() {
    if (isCapturing) {
        showNotification('جاري التقاط الصورة...', 'info');
        return;
    }
    
    isCapturing = true;
    
    try {
        // Add capture effect
        addCaptureEffect();
        
        // Get video and canvas elements
        const video = document.getElementById('video');
        const canvas = document.getElementById('canvas');
        
        if (!video || !canvas) {
            throw new Error('Video or canvas element not found');
        }
        
        // Setup canvas
        const context = canvas.getContext('2d');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        // Draw video frame to canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Get image quality
        const quality = 0.9;
        
        // Convert to blob
        const blob = await new Promise((resolve) => {
            canvas.toBlob(resolve, 'image/jpeg', quality);
        });
        
        // Create object URL
        const imageUrl = URL.createObjectURL(blob);
        
        // Store captured image
        window.capturedImage = {
            url: imageUrl,
            blob: blob,
            width: canvas.width,
            height: canvas.height,
            timestamp: new Date().toISOString()
        };
        
        // Play capture sound
        playCaptureSound();
        
        // Show success notification
        showNotification('تم التقاط الصورة بنجاح', 'success');
        
        // Close camera and show preview
        setTimeout(() => {
            closeCamera();
            showPreview(imageUrl);
        }, 1000);
        
        return imageUrl;
    } catch (error) {
        console.error('❌ Error capturing photo:', error);
        showCameraError('فشل التقاط الصورة');
        return null;
    } finally {
        isCapturing = false;
    }
}

// ===== CAMERA EFFECTS =====
function addCameraMagicEffects() {
    const video = document.getElementById('video');
    if (!video) return;
    
    // Add magical border effect
    video.classList.add('enchanted-border');
    
    // Add periodic glow effect
    setInterval(() => {
        video.classList.toggle('glow-pulse');
    }, 3000);
}

function addCaptureEffect() {
    const video = document.getElementById('video');
    if (!video) return;
    
    // Add flash effect
    video.style.filter = 'brightness(2)';
    
    setTimeout(() => {
        video.style.filter = 'brightness(1)';
    }, 200);
    
    // Add screen shake
    const cameraPreview = document.getElementById('camera-preview');
    if (cameraPreview) {
        cameraPreview.classList.add('shake');
        setTimeout(() => {
            cameraPreview.classList.remove('shake');
        }, 500);
    }
}

// ===== VIDEO ANALYSIS =====
function setupVideoAnalysis() {
    const video = document.getElementById('video');
    if (!video) return;
    
    // Setup palm detection overlay
    setupPalmDetectionOverlay(video);
}

function setupPalmDetectionOverlay(video) {
    const cameraPreview = document.getElementById('camera-preview');
    if (!cameraPreview) return;
    
    const overlay = document.createElement('div');
    overlay.className = 'palm-detection-overlay';
    overlay.style.position = 'absolute';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.pointerEvents = 'none';
    overlay.style.zIndex = '10';
    
    // Add palm detection guide
    const guide = document.createElement('div');
    guide.className = 'palm-guide';
    guide.innerHTML = `
        <div class="guide-text">ضع يدك في الإطار</div>
        <div class="guide-frame"></div>
    `;
    
    overlay.appendChild(guide);
    cameraPreview.appendChild(overlay);
}

// ===== ERROR HANDLING =====
function handleCameraError(error) {
    console.error('Camera error:', error);
    
    let errorMessage = 'حدث خطأ في الكاميرا';
    
    switch (error.name) {
        case 'NotAllowedError':
        case 'PermissionDeniedError':
            errorMessage = 'تم رفض إذن الوصول للكاميرا';
            break;
        case 'NotFoundError':
        case 'DevicesNotFoundError':
            errorMessage = 'لم يتم العثور على كاميرا';
            break;
        case 'NotReadableError':
        case 'TrackStartError':
            errorMessage = 'الكاميرا قيد الاستخدام بالفعل';
            break;
        case 'OverconstrainedError':
        case 'ConstraintNotSatisfiedError':
            errorMessage = 'الكاميرا لا تدعم الإعدادات المطلوبة';
            break;
        default:
            errorMessage = 'فشل الوصول للكاميرا';
    }
    
    showCameraError(errorMessage);
}

function showCameraError(message) {
    showNotification(message, 'error');
    
    // Fallback to file upload
    setTimeout(() => {
        uploadImage();
    }, 2000);
}

function showCameraPrompt(message) {
    showNotification(message, 'info');
}

// ===== UTILITY FUNCTIONS =====
function playCaptureSound() {
    try {
        // Create audio context for capture sound
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (error) {
        console.warn('Could not play capture sound:', error);
    }
}

function isCameraSupported() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}

// Export functions for global access
window.cameraFunctions = {
    openCamera,
    closeCamera,
    capturePhoto,
    isCameraSupported
};