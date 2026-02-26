// Assign specific button styles to each button (non-random)
// Button styles that match the website color scheme (purple/turquoise)
const buttonStyles = {
  contactEmail: 'btn-2',      // Purple gradient
  contactGithub: 'btn-9',     // Cyan/Purple gradient
  contactLinkedin: 'btn-13',  // Teal gradient
  contactFormSend: 'btn-15',  // Purple/Magenta gradient
  resumePDF: 'btn-4',         // Teal gradient
  resumeContact: 'btn-8',     // Purple/Lavender gradient
  resumeGithub: 'btn-2',      // Purple gradient
  resumeLinkedin: 'btn-13'    // Teal gradient
};

function assignButtonStyles() {
  // Contact page buttons
  const contactLinks = document.querySelectorAll('.contact-links .contact-btn');
  if (contactLinks.length >= 3) {
    contactLinks[0].classList.add('custom-btn', buttonStyles.contactEmail);
    contactLinks[1].classList.add('custom-btn', buttonStyles.contactGithub);
    contactLinks[2].classList.add('custom-btn', buttonStyles.contactLinkedin);
  }
  
  // Contact form button
  const formButton = document.querySelector('.form-actions button');
  if (formButton) {
    formButton.classList.add('custom-btn', buttonStyles.contactFormSend);
  }
  
  // Resume page buttons
  const resumeActionBtns = document.querySelectorAll('.resume-actions .btn');
  if (resumeActionBtns.length >= 2) {
    resumeActionBtns[0].classList.add('custom-btn', buttonStyles.resumePDF);
    resumeActionBtns[1].classList.add('custom-btn', buttonStyles.resumeContact);
  }
  
  const resumeContactBtns = document.querySelectorAll('.resume-actions .contact-btn');
  if (resumeContactBtns.length >= 2) {
    resumeContactBtns[0].classList.add('custom-btn', buttonStyles.resumeGithub);
    resumeContactBtns[1].classList.add('custom-btn', buttonStyles.resumeLinkedin);
  }
}

// Run on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', assignButtonStyles);
} else {
  assignButtonStyles();
}
