// Paint Brush Cursor Effect

document.addEventListener('DOMContentLoaded', () => {
  // Add paint reveal effect to text elements
  const textElements = document.querySelectorAll('h1, h2, h3, p, a, .hero-content, .eyebrow, .sub, li, label, button');
  
  textElements.forEach(element => {
    // Skip if element is already wrapped or is inside a modal/form
    if (element.classList.contains('paint-reveal') || 
        element.closest('.category-modal') || 
        element.closest('form') ||
        element.closest('.emoji-picker-modal')) {
      return;
    }
    
    // Skip if element is empty or only contains other elements
    if (!element.textContent.trim() || element.children.length > 0) {
      return;
    }
    
    const text = element.textContent;
    element.classList.add('paint-reveal');
    element.setAttribute('data-text', text);
    
    // Track mouse position within element
    element.addEventListener('mousemove', (e) => {
      const rect = element.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      element.style.setProperty('--mouse-x', `${x}%`);
      element.style.setProperty('--mouse-y', `${y}%`);
    });
    
    // Mark as painted when mouse leaves after hovering
    element.addEventListener('mouseleave', () => {
      setTimeout(() => {
        element.classList.add('painted');
      }, 600);
    });
  });
  
  // Create custom cursor trail
  const cursorTrail = document.createElement('div');
  cursorTrail.className = 'cursor-trail';
  cursorTrail.style.cssText = `
    position: fixed;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(168, 85, 247, 0.4) 0%, rgba(6, 182, 212, 0.4) 100%);
    pointer-events: none;
    z-index: 9999;
    mix-blend-mode: screen;
    transform: translate(-50%, -50%);
    transition: all 0.15s ease-out;
    opacity: 0;
  `;
  document.body.appendChild(cursorTrail);
  
  let cursorX = 0;
  let cursorY = 0;
  let isMoving = false;
  
  document.addEventListener('mousemove', (e) => {
    cursorX = e.clientX;
    cursorY = e.clientY;
    
    cursorTrail.style.left = cursorX + 'px';
    cursorTrail.style.top = cursorY + 'px';
    cursorTrail.style.opacity = '1';
    
    if (!isMoving) {
      isMoving = true;
      setTimeout(() => {
        isMoving = false;
      }, 100);
    }
  });
  
  document.addEventListener('mouseleave', () => {
    cursorTrail.style.opacity = '0';
  });
  
  document.addEventListener('mouseenter', () => {
    cursorTrail.style.opacity = '1';
  });
});
