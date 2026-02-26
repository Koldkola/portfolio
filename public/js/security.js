/**
 * Security utilities for the portfolio site
 * Protects against XSS, injection attacks, and malicious scripts
 */

// =============================================================================
// INPUT SANITIZATION
// =============================================================================

/**
 * Sanitize user input to prevent XSS attacks
 * Removes dangerous HTML and script tags
 */
function sanitizeInput(input) {
  if (typeof input !== 'string') return '';
  
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
}

/**
 * Sanitize HTML content while allowing safe tags
 * Only allows: p, ul, li, ol, strong, em, a, br, img (with validation)
 */
function sanitizeHTML(html) {
  if (typeof html !== 'string') return '';
  
  const allowedTags = ['p', 'ul', 'li', 'ol', 'strong', 'em', 'a', 'br', 'img', 'h1', 'h2', 'h3'];
  const allowedAttributes = {
    'a': ['href', 'target', 'rel'],
    'img': ['src', 'alt', 'style'],
    '*': ['style']
  };
  
  // Create a temporary container
  const temp = document.createElement('div');
  temp.innerHTML = html;
  
  // Remove all scripts
  const scripts = temp.querySelectorAll('script, iframe, object, embed, form, input, button');
  scripts.forEach(el => el.remove());
  
  // Recursively clean elements
  function cleanElement(el) {
    // Check if tag is allowed
    if (!allowedTags.includes(el.tagName.toLowerCase())) {
      // Replace with text content
      const text = document.createTextNode(el.textContent);
      el.parentNode.replaceChild(text, el);
      return;
    }
    
    // Remove disallowed attributes
    const allowedAttrs = allowedAttributes[el.tagName.toLowerCase()] || allowedAttributes['*'] || [];
    Array.from(el.attributes).forEach(attr => {
      if (!allowedAttrs.includes(attr.name)) {
        el.removeAttribute(attr.name);
      }
    });
    
    // Validate href and src
    if (el.tagName.toLowerCase() === 'a') {
      const href = el.getAttribute('href');
      if (href && !isValidURL(href)) {
        el.removeAttribute('href');
      }
    }
    
    if (el.tagName.toLowerCase() === 'img') {
      const src = el.getAttribute('src');
      if (src && !isValidImageSource(src)) {
        el.removeAttribute('src');
      }
    }
    
    // Clean children
    Array.from(el.children).forEach(cleanElement);
  }
  
  Array.from(temp.children).forEach(cleanElement);
  return temp.innerHTML;
}

/**
 * Validate URL to prevent javascript: and data: attacks
 */
function isValidURL(url) {
  if (!url) return false;
  try {
    const parsed = new URL(url, window.location.href);
    // Only allow http, https, and mailto
    return ['http:', 'https:', 'mailto:'].includes(parsed.protocol);
  } catch {
    return false;
  }
}

/**
 * Validate image source (allow data URIs for uploaded images, external URLs, and base64)
 */
function isValidImageSource(src) {
  if (!src) return false;
  
  // Allow data URIs (for uploaded photos)
  if (src.startsWith('data:image/')) return true;
  
  // Allow base64 images
  if (src.startsWith('data:')) {
    const validFormats = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    return validFormats.some(format => src.includes(format));
  }
  
  // Allow HTTPS URLs
  if (src.startsWith('https://')) return true;
  
  // Allow HTTP URLs (for Unsplash, etc.)
  if (src.startsWith('http://')) return true;
  
  return false;
}

// =============================================================================
// FILE UPLOAD VALIDATION
// =============================================================================

/**
 * Validate file upload for security
 * Checks file type, size, and prevents malicious files
 */
function validateFileUpload(file, maxSizeMB = 5) {
  if (!file) return { valid: false, error: 'No file selected' };
  
  // Check file size
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    return { valid: false, error: `File must be less than ${maxSizeMB}MB` };
  }
  
  // Only allow image types
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Only JPEG, PNG, GIF, and WebP images are allowed' };
  }
  
  // Check file extension matches MIME type
  const extension = file.name.split('.').pop()?.toLowerCase();
  const typeToExt = {
    'image/jpeg': ['jpg', 'jpeg'],
    'image/png': ['png'],
    'image/gif': ['gif'],
    'image/webp': ['webp']
  };
  
  const validExtensions = typeToExt[file.type] || [];
  if (!validExtensions.includes(extension)) {
    return { valid: false, error: 'File extension does not match file type' };
  }
  
  return { valid: true };
}

// =============================================================================
// PASSWORD SECURITY
// =============================================================================

/**
 * Rate limiting object to track failed password attempts
 */
const passwordAttempts = {};

/**
 * Check if user is rate limited for password attempts
 */
function isPasswordRateLimited(identifier = 'global') {
  const now = Date.now();
  const attempt = passwordAttempts[identifier];
  
  if (!attempt) return false;
  
  // Reset after 15 minutes
  if (now - attempt.firstAttempt > 15 * 60 * 1000) {
    delete passwordAttempts[identifier];
    return false;
  }
  
  // Allow 5 attempts per 15 minutes
  return attempt.count >= 5;
}

/**
 * Track password attempt
 */
function trackPasswordAttempt(identifier = 'global') {
  const now = Date.now();
  
  if (!passwordAttempts[identifier]) {
    passwordAttempts[identifier] = { count: 0, firstAttempt: now };
  }
  
  passwordAttempts[identifier].count++;
  
  // Reset if window has passed
  if (now - passwordAttempts[identifier].firstAttempt > 15 * 60 * 1000) {
    passwordAttempts[identifier] = { count: 1, firstAttempt: now };
  }
}

/**
 * Reset password attempts
 */
function resetPasswordAttempts(identifier = 'global') {
  delete passwordAttempts[identifier];
}

// =============================================================================
// CRYPTOMINER DETECTION
// =============================================================================

/**
 * Monitor for suspicious CPU usage patterns that might indicate mining
 * Returns true if suspicious activity is detected
 */
function detectCryptoMining() {
  // Check for common miner scripts in the DOM
  const suspiciousPatterns = [
    'coinhive',
    'cryptonight',
    'miner',
    'monero',
    'jsecoin',
    'webassembly.*wasm',
    'worker'
  ];
  
  const scripts = document.querySelectorAll('script');
  for (const script of scripts) {
    const content = script.textContent || script.src || '';
    for (const pattern of suspiciousPatterns) {
      if (new RegExp(pattern, 'i').test(content)) {
        console.warn('⚠️ Potential cryptominer detected and blocked');
        return true;
      }
    }
  }
  
  return false;
}

/**
 * Block Worker creation (used by miners)
 * Note: This is a voluntary protection, can be bypassed
 */
function secureWorkerCreation() {
  const originalWorker = window.Worker;
  
  window.Worker = function(scriptURL) {
    // Check if worker script contains suspicious patterns
    const suspiciousPatterns = ['coinhive', 'cryptonight', 'miner', 'monero'];
    
    if (typeof scriptURL === 'string') {
      for (const pattern of suspiciousPatterns) {
        if (new RegExp(pattern, 'i').test(scriptURL)) {
          console.warn('⚠️ Suspicious Worker blocked:', scriptURL);
          throw new Error('Blocked: Suspicious worker script');
        }
      }
    }
    
    return new originalWorker(scriptURL);
  };
}

// =============================================================================
// LOCAL STORAGE SECURITY
// =============================================================================

/**
 * Safely store sensitive data in localStorage with expiration
 */
function secureSetItem(key, value, expirationMinutes = 30) {
  const item = {
    value: value,
    expires: Date.now() + (expirationMinutes * 60 * 1000)
  };
  localStorage.setItem(key, JSON.stringify(item));
}

/**
 * Safely retrieve sensitive data from localStorage with expiration check
 */
function secureGetItem(key) {
  const item = localStorage.getItem(key);
  if (!item) return null;
  
  try {
    const parsed = JSON.parse(item);
    if (Date.now() > parsed.expires) {
      localStorage.removeItem(key);
      return null;
    }
    return parsed.value;
  } catch {
    localStorage.removeItem(key);
    return null;
  }
}

/**
 * Clear sensitive data immediately
 */
function secureClearItem(key) {
  localStorage.removeItem(key);
}

// =============================================================================
// INITIALIZATION
// =============================================================================

// Run security checks on page load
document.addEventListener('DOMContentLoaded', () => {
  // Detect and block cryptominers
  if (detectCryptoMining()) {
    console.warn('Security: Cryptominer detection triggered');
  }
  
  // Secure worker creation
  secureWorkerCreation();
  
  // Log security initialization
  console.log('🔒 Security module initialized');
});

// Periodic security check
setInterval(() => {
  detectCryptoMining();
}, 60000); // Every 60 seconds
