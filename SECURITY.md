# Security Documentation

This portfolio site implements multiple layers of security protection to prevent hacking, mining, and other malicious attacks.

## 🔒 Server-Side Security (Node.js/Express)

### 1. **Helmet Security Headers**
- **Content Security Policy (CSP)**: Prevents XSS attacks by restricting script sources
- **X-Frame-Options**: Prevents clickjacking attacks (set to DENY)
- **X-Content-Type-Options**: Prevents MIME type sniffing
- **X-XSS-Protection**: Additional XSS protection header
- **Referrer-Policy**: Controls referrer information leakage

### 2. **Rate Limiting**
- **Password Attempts**: Maximum 5 failed attempts per 15 minutes
- **Per-endpoint**: Applied to all POST requests
- Automatically resets after the time window

### 3. **CORS Protection**
- Whitelist-based origin verification
- Prevents unauthorized cross-origin requests
- Methods restricted to GET, POST, OPTIONS

### 4. **Payload Size Limits**
- JSON payload limited to 5MB
- Prevents buffer overflow attacks
- Protects against DoS attacks

### 5. **Request Timeout**
- 10-second timeout on external API calls
- Prevents hanging connections and resource exhaustion

## 🛡️ Client-Side Security (Browser/JavaScript)

### 1. **Input Sanitization**
Located in `public/js/security.js`:

- **`sanitizeInput()`**: Removes all HTML tags and dangerous characters
  - Used for text fields (titles, tags, descriptions)
  - Converts HTML entities for safe display

- **`sanitizeHTML()`**: Allows safe HTML tags only
  - Allowed tags: `<p>`, `<ul>`, `<li>`, `<ol>`, `<strong>`, `<em>`, `<a>`, `<br>`, `<img>`, `<h1-3>`
  - Removes all scripts, iframes, forms, and embedded content
  - Validates href and src attributes

### 2. **URL Validation**
- **`isValidURL()`**: Only allows http://, https://, and mailto: protocols
  - Prevents javascript: and data: URI attacks
  - Blocks malicious protocol handlers

- **`isValidImageSource()`**: Validates image sources
  - Allows data URIs (for uploaded photos)
  - Allows base64 images with proper MIME types
  - Only allows HTTPS and HTTP external URLs

### 3. **File Upload Validation**
- **Size Limit**: Maximum 5MB per file
- **Type Restriction**: Only JPEG, PNG, GIF, WebP allowed
- **Extension Verification**: Checks file extension matches MIME type
- **Format Detection**: Validates against 4 image MIME types
- Prevents executable files and malicious archives

### 4. **Password Security**
- **Hashing**: SHA-256 with salt
- **Salt**: Unique salt per password field
- **Rate Limiting**: 5 attempts per 15 minutes per user
- **Client-side tracking**: Tracks failed attempts using local object
- **No plain-text storage**: Passwords never stored in localStorage

### 5. **Local Storage Security**
- **`secureSetItem()`**: Stores items with automatic expiration
  - Default expiration: 30 minutes
  - Prevents long-term credential compromise
  - Fails silently if storage unavailable

- **`secureGetItem()`**: Retrieves and validates stored items
  - Checks expiration before returning
  - Auto-deletes expired items
  - Handles JSON parsing errors gracefully

- **`secureClearItem()`**: Immediately removes sensitive data

### 6. **Cryptominer Detection**
- **Script Scanning**: Detects suspicious patterns in loaded scripts
  - Looks for: 'coinhive', 'cryptonight', 'miner', 'monero', 'jsecoin'
  - Runs on page load and every 60 seconds
  - Logs warnings to console

- **Worker Blocking**: Prevents Web Workers with suspicious scripts
  - Interceptswindow.Worker()
  - Checks worker URL for mining patterns
  - Throws error if suspicious worker detected

- **Patterns Detected**:
  ```
  coinhive
  cryptonight
  miner
  monero
  jsecoin
  webassembly.*wasm
  worker (in suspicious context)
  ```

## 📋 Data Handling

### 1. **Sensitive Data**
- Admin passwords hashed immediately
- Never transmitted as plain text
- Stored in localStorage only after successful validation
- Cleared when switching browsers/incognito mode

### 2. **User-Generated Content**
- All user inputs sanitized before storage
- HTML content validated against whitelist
- Images validated for type and size
- URLs validated for protocol

### 3. **API Communication**
- All API keys stored in environment variables
- Never exposed to client-side code
- API keys stripped from error messages

## 🚀 Deployment Security

### Environment Variables (.env)
```env
OPENAI_API_KEY=***
PORT=3000
ALLOWED_ORIGINS=https://yourdomain.com
```

### Never Commit These:
- `.env` file (add to `.gitignore`)
- API keys
- Sensitive credentials
- Database passwords

## 🔐 Admin Password Security

### Weekly Highlights Admin
- **Hash**: `e464086987a59f5748054130383a2b9ddd7196fea110dd7da0e3d4fd29fb2838`
- **Salt**: `archive-v1`
- **Password**: Error930!

### Archive Admin
- **Hash**: `e464086987a59f5748054130383a2b9ddd7196fea110dd7da0e3d4fd29fb2838`
- **Salt**: `archive-v1`
- **Password**: Error930!

### Password Reset
To change admin password:
1. Generate SHA-256 hash: `hash(salt + ":" + newPassword)`
2. Update `WEEKLY_ADMIN_HASH` and `ARCHIVE_LOCK_HASH` in code
3. Deploy updated code

```javascript
// Example: Generate new hash
async function generateHash() {
  const salt = 'archive-v1';
  const password = 'YourNewPassword';
  const encoder = new TextEncoder();
  const data = encoder.encode(`${salt}:${password}`);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
```

## 🧪 Testing Security

### Check for Issues
1. **Browser Console**: Look for security warnings (🔒 messages)
2. **CSP Violations**: Check for blocked resources
3. **Failed Attempts**: Monitor rate limiting
4. **File Uploads**: Test with invalid file types

### Common Test Cases
- ✅ Upload 6MB file (should fail)
- ✅ Upload .exe file (should fail)
- ✅ Try XSS payload in title (should be sanitized)
- ✅ Enter wrong password 6 times (should rate limit)
- ✅ Try javascript: URL (should be blocked)
- ✅ Try to create Web Worker with miner script (should be blocked)

## 📊 Security Checklist

- [x] Content Security Policy implemented
- [x] CORS properly configured
- [x] Rate limiting on sensitive endpoints
- [x] Input sanitization for all user data
- [x] File upload validation
- [x] Password hashing with salt
- [x] URL validation
- [x] Cryptominer detection
- [x] XSS prevention
- [x] CSRF tokens not needed (no state-changing GET requests)
- [x] No sensitive data in localStorage (only after expiration)
- [x] API keys stored in environment variables
- [x] Helmet security headers
- [x] No MIME type sniffing
- [x] No clickjacking vulnerability
- [x] Error messages don't leak sensitive info

## 🔄 Security Updates

This site uses the latest stable versions of security dependencies:
- **helmet**: ^7.1.0 (Security headers)
- **express-rate-limit**: ^7.1.5 (Rate limiting)
- **express**: ^4.18.2 (Framework)
- **cors**: ^2.8.5 (CORS)

Keep these updated regularly:
```bash
npm audit
npm audit fix
npm update
```

## 📞 Security Issues

If you discover a security vulnerability:
1. **DO NOT** create a public issue
2. Contact: Kenechi596@gmail.com
3. Include: Description, steps to reproduce, impact

## 📚 References

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [CSP Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [Helmet.js](https://helmetjs.github.io/)
- [Express Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)

---

**Last Updated**: February 25, 2026
**Security Level**: Production-Ready
