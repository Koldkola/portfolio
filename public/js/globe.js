// Globe interaction and user submissions
let globeEntries = [];
let currentEntryIndex = 0;

// Load entries from localStorage
function loadEntries() {
  const stored = localStorage.getItem('globeEntries');
  if (stored) {
    globeEntries = JSON.parse(stored);
  }
  updateGlobeDisplay();
}

// Save entries to localStorage
function saveEntries() {
  localStorage.setItem('globeEntries', JSON.stringify(globeEntries));
}

// Update globe display with current entry
function updateGlobeDisplay() {
  const globe = document.getElementById('globe');
  if (!globe) return;
  
  if (globeEntries.length === 0) {
    globe.innerHTML = '<div class="globe-prompt">Share your week</div>';
    return;
  }
  
  const entry = globeEntries[currentEntryIndex];
  globe.innerHTML = `
    <div class="globe-prompt" style="cursor: pointer;">
      <div style="font-size: 0.85rem; opacity: 0.7; margin-bottom: 8px;">
        ${entry.age ? `Age ${entry.age}` : 'Anonymous'}
      </div>
      <div style="font-size: 0.9rem; line-height: 1.4;">
        "${entry.text.substring(0, 80)}${entry.text.length > 80 ? '...' : ''}"
      </div>
      <div style="font-size: 0.75rem; opacity: 0.6; margin-top: 8px;">
        Click to expand
      </div>
    </div>
  `;
}

// Rotate through entries
function rotateEntries() {
  if (globeEntries.length === 0) return;
  currentEntryIndex = (currentEntryIndex + 1) % globeEntries.length;
  updateGlobeDisplay();
}

// Open submission modal
function openGlobeModal() {
  const modal = document.getElementById('globe-modal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

// Close submission modal
function closeGlobeModal() {
  const modal = document.getElementById('globe-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    document.getElementById('globe-form').reset();
  }
}

// Open expanded view modal
function openGlobeViewModal() {
  const modal = document.getElementById('globe-view-modal');
  const content = document.getElementById('globe-view-content');
  
  if (!modal || !content) return;
  
  if (globeEntries.length === 0) {
    content.innerHTML = '<p style="color: var(--text-muted); text-align: center;">No entries yet. Be the first to share!</p>';
  } else {
    content.innerHTML = globeEntries.map((entry, index) => `
      <div class="globe-entry">
        <div class="globe-entry-meta">
          ${entry.age ? `Age: ${entry.age}` : 'Anonymous'} • ${new Date(entry.timestamp).toLocaleDateString()}
        </div>
        <div class="globe-entry-text">${entry.text}</div>
        ${entry.photo ? `<img src="${entry.photo}" class="globe-entry-photo" alt="User photo" />` : ''}
      </div>
    `).join('');
  }
  
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Close expanded view modal
function closeGlobeViewModal() {
  const modal = document.getElementById('globe-view-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Handle form submission
function handleFormSubmit(e) {
  e.preventDefault();
  
  const text = document.getElementById('weekFeeling').value.trim();
  const age = document.getElementById('userAge').value;
  const photoInput = document.getElementById('userPhoto');
  
  if (!text) return;
  
  // Handle photo if provided
  if (photoInput.files && photoInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      addEntry(text, age, e.target.result);
    };
    reader.readAsDataURL(photoInput.files[0]);
  } else {
    addEntry(text, age, null);
  }
}

// Add new entry
function addEntry(text, age, photo) {
  const entry = {
    text: text,
    age: age || null,
    photo: photo,
    timestamp: new Date().toISOString()
  };
  
  globeEntries.push(entry);
  saveEntries();
  updateGlobeDisplay();
  closeGlobeModal();
  
  // Show success message
  showNotification('Your thoughts have been added to the globe!');
}

// Show notification
function showNotification(message) {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 40px;
    background: rgba(139, 92, 246, 0.95);
    color: white;
    padding: 16px 24px;
    border-radius: 8px;
    z-index: 10001;
    animation: slideInRight 0.3s ease;
    box-shadow: 0 8px 24px rgba(139, 92, 246, 0.4);
  `;
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  loadEntries();
  
  // Rotate entries every 5 seconds
  if (globeEntries.length > 1) {
    setInterval(rotateEntries, 5000);
  }
  
  // Add button click handler
  const addBtn = document.getElementById('globeAddBtn');
  if (addBtn) {
    addBtn.addEventListener('click', openGlobeModal);
  }
  
  // Globe click handler to expand
  const globe = document.getElementById('globe');
  if (globe) {
    globe.addEventListener('click', openGlobeViewModal);
  }
  
  // Form submit handler
  const form = document.getElementById('globe-form');
  if (form) {
    form.addEventListener('submit', handleFormSubmit);
  }
  
  // Close modals on backdrop click
  const modals = ['globe-modal', 'globe-view-modal'];
  modals.forEach(modalId => {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          if (modalId === 'globe-modal') closeGlobeModal();
          else closeGlobeViewModal();
        }
      });
    }
  });
  
  // Escape key to close modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeGlobeModal();
      closeGlobeViewModal();
    }
  });
  
  // Recycle bin click handler
  const recycleBin = document.getElementById('recycleBin');
  if (recycleBin) {
    recycleBin.addEventListener('click', () => {
      if (confirm('Clear all globe entries? This cannot be undone.')) {
        globeEntries = [];
        saveEntries();
        currentEntryIndex = 0;
        updateGlobeDisplay();
        showNotification('All entries have been cleared');
      }
    });
  }
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from { transform: translateX(400px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slideOutRight {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(400px); opacity: 0; }
  }
`;
document.head.appendChild(style);
