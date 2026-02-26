// Randomize button styles while maintaining website colors (purple/turquoise)
function randomizeButtons() {
  // Button styles that match the website color scheme (purple/turquoise)
  const styleOptions = ['btn-2', 'btn-4', 'btn-8', 'btn-9', 'btn-13', 'btn-15'];
  
  // Contact page buttons
  const contactLinks = document.querySelectorAll('.contact-links .contact-btn');
  contactLinks.forEach((btn, index) => {
    if (index < styleOptions.length) {
      btn.classList.add(styleOptions[index]);
    }
  });
  
  // Contact form button
  const formButton = document.querySelector('.form-actions button');
  if (formButton) {
    formButton.classList.add('custom-btn', styleOptions[Math.floor(Math.random() * styleOptions.length)]);
  }
  
  // Resume page buttons
  const resumeActionBtns = document.querySelectorAll('.resume-actions .btn');
  resumeActionBtns.forEach((btn, index) => {
    btn.classList.add('custom-btn', styleOptions[index % styleOptions.length]);
  });
  
  const resumeContactBtns = document.querySelectorAll('.resume-actions .contact-btn');
  resumeContactBtns.forEach((btn, index) => {
    btn.classList.add('custom-btn', styleOptions[(index + 2) % styleOptions.length]);
  });
}

// Run on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', randomizeButtons);
} else {
  randomizeButtons();
}
