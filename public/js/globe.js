// Globe interaction and user submissions
let globeEntries = [];
let currentEntryIndex = 0;
let isAdminMode = false;
let selectedEntries = new Set();

// Same password hash as archive (Error930!)
const ADMIN_PASSWORD_HASH = "e464086987a59f5748054130383a2b9ddd7196fea110dd7da0e3d4fd29fb2838";
const ADMIN_PASSWORD_SALT = "archive-v1";

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
        ${entry.name}
      </div>
      <div style="font-size: 0.9rem; line-height: 1.4;">
        "${entry.text.substring(0, 60)}${entry.text.length > 60 ? '...' : ''}"
      </div>
      <div style="font-size: 0.75rem; opacity: 0.6; margin-top: 8px;">
        Click to see board
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
    content.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px;">No entries yet. Be the first to share!</div>';
  } else {
    content.innerHTML = globeEntries.map((entry, index) => {
      const checkboxHtml = isAdminMode ? `<input type="checkbox" class="board-item-checkbox" data-index="${index}" ${selectedEntries.has(index) ? 'checked' : ''} />` : '';
      const selectableClass = isAdminMode ? 'selectable' : '';
      const selectedClass = selectedEntries.has(index) ? 'selected' : '';
      
      if (entry.photo) {
        // Display as polaroid
        return `
          <div class="board-polaroid ${selectableClass} ${selectedClass}" style="background: ${entry.bgColor || '#ffffff'};" data-index="${index}">
            ${checkboxHtml}
            <img src="${entry.photo}" class="board-polaroid-photo" alt="User photo" />
            <div class="board-polaroid-content">
              <div class="board-polaroid-name" style="color: ${entry.textColor || '#333'};">${entry.name}</div>
              <div class="board-polaroid-text" style="color: ${entry.textColor || '#555'};">${entry.text}</div>
              <div class="board-polaroid-meta" style="color: ${adjustOpacity(entry.textColor || '#888', 0.7)};">
                ${entry.age ? `Age ${entry.age} • ` : ''}${new Date(entry.timestamp).toLocaleDateString()}
              </div>
            </div>
          </div>
        `;
      } else {
        // Display as sticky note
        return `
          <div class="board-sticky ${selectableClass} ${selectedClass}" style="background: ${entry.bgColor || '#ffd97d'}; color: ${entry.textColor || '#333'};" data-index="${index}">
            ${checkboxHtml}
            <div class="board-sticky-name">${entry.name}</div>
            <div class="board-sticky-text">${entry.text}</div>
            <div class="board-sticky-meta">
              ${entry.age ? `Age ${entry.age} • ` : ''}${new Date(entry.timestamp).toLocaleDateString()}
            </div>
          </div>
        `;
      }
    }).join('');
    
    // Add checkbox event listeners if in admin mode
    if (isAdminMode) {
      setTimeout(() => {
        document.querySelectorAll('.board-item-checkbox').forEach(checkbox => {
          checkbox.addEventListener('change', (e) => {
            const index = parseInt(e.target.dataset.index);
            const parent = e.target.closest('.board-sticky, .board-polaroid');
            if (e.target.checked) {
              selectedEntries.add(index);
              parent.classList.add('selected');
            } else {
              selectedEntries.delete(index);
              parent.classList.remove('selected');
            }
          });
        });
      }, 0);
    }
  }
  
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Helper function to adjust color opacity
function adjustOpacity(color, opacity) {
  if (color.startsWith('#')) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  return color;
}

// Close expanded view modal
function closeGlobeViewModal() {
  const modal = document.getElementById('globe-view-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Admin password functions
function openAdminPasswordModal() {
  const modal = document.getElementById('admin-password-modal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    document.getElementById('admin-password-error').style.display = 'none';
  }
}

function closeAdminPasswordModal() {
  const modal = document.getElementById('admin-password-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    document.getElementById('admin-password-form').reset();
    document.getElementById('admin-password-error').style.display = 'none';
  }
}

// Hash password using SHA-256
async function hashPassword(password, salt) {
  const encoder = new TextEncoder();
  const data = encoder.encode(`${salt}:${password}`);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Verify admin password
async function verifyAdminPassword(password) {
  const hash = await hashPassword(password, ADMIN_PASSWORD_SALT);
  return hash === ADMIN_PASSWORD_HASH;
}

// Toggle admin mode
function toggleAdminMode() {
  isAdminMode = !isAdminMode;
  selectedEntries.clear();
  
  const adminControls = document.getElementById('board-admin-controls');
  const deleteBtn = document.getElementById('boardDeleteBtn');
  const adminBtn = document.getElementById('boardAdminBtn');
  
  if (isAdminMode) {
    adminControls.style.display = 'block';
    deleteBtn.style.display = 'flex';
    adminBtn.textContent = '🔓';
    openGlobeViewModal(); // Refresh view with checkboxes
  } else {
    adminControls.style.display = 'none';
    deleteBtn.style.display = 'none';
    adminBtn.textContent = '🔒';
    openGlobeViewModal(); // Refresh view without checkboxes
  }
}

// Select all entries
function selectAllEntries() {
  globeEntries.forEach((_, index) => {
    selectedEntries.add(index);
  });
  openGlobeViewModal(); // Refresh view
}

// Delete selected entries
function deleteSelectedEntries() {
  if (selectedEntries.size === 0) {
    showNotification('No entries selected');
    return;
  }
  
  const count = selectedEntries.size;
  if (confirm(`Delete ${count} selected ${count === 1 ? 'entry' : 'entries'}? This cannot be undone.`)) {
    // Sort indices in descending order to delete from end to start
    const indicesToDelete = Array.from(selectedEntries).sort((a, b) => b - a);
    indicesToDelete.forEach(index => {
      globeEntries.splice(index, 1);
    });
    
    selectedEntries.clear();
    saveEntries();
    currentEntryIndex = 0;
    updateGlobeDisplay();
    openGlobeViewModal(); // Refresh view
    showNotification(`Deleted ${count} ${count === 1 ? 'entry' : 'entries'}`);
  }
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
  
  const name = document.getElementById('userName').value.trim();
  const text = document.getElementById('weekFeeling').value.trim();
  const age = document.getElementById('userAge').value;
  const textColor = document.getElementById('textColor').value;
  const bgColor = document.getElementById('bgColor').value;
  const photoInput = document.getElementById('userPhoto');
  
  if (!name || !text) return;
  
  // Handle photo if provided
  if (photoInput.files && photoInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      addEntry(name, text, age, textColor, bgColor, e.target.result);
    };
    reader.readAsDataURL(photoInput.files[0]);
  } else {
    addEntry(name, text, age, textColor, bgColor, null);
  }
}

// Add new entry
function addEntry(name, text, age, textColor, bgColor, photo) {
  const entry = {
    name: name,
    text: text,
    age: age || null,
    textColor: textColor,
    bgColor: bgColor,
    photo: photo,
    timestamp: new Date().toISOString()
  };
  
  globeEntries.push(entry);
  saveEntries();
  updateGlobeDisplay();
  closeGlobeModal();
  
  // Show success message
  showNotification('Your entry has been added to the board!');
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
      closeAdminPasswordModal();
    }
  });
  
  // Admin button click handler
  const adminBtn = document.getElementById('boardAdminBtn');
  if (adminBtn) {
    adminBtn.addEventListener('click', () => {
      if (isAdminMode) {
        toggleAdminMode(); // Turn off admin mode
      } else {
        openAdminPasswordModal(); // Request password
      }
    });
  }
  
  // Admin password form submit
  const adminForm = document.getElementById('admin-password-form');
  if (adminForm) {
    adminForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const password = document.getElementById('adminPassword').value;
      const isValid = await verifyAdminPassword(password);
      
      if (isValid) {
        closeAdminPasswordModal();
        toggleAdminMode();
        showNotification('Admin mode activated');
      } else {
        document.getElementById('admin-password-error').style.display = 'block';
      }
    });
  }
  
  // Select all button
  const selectAllBtn = document.getElementById('selectAllBtn');
  if (selectAllBtn) {
    selectAllBtn.addEventListener('click', selectAllEntries);
  }
  
  // Delete selected button
  const deleteSelectedBtn = document.getElementById('deleteSelectedBtn');
  if (deleteSelectedBtn) {
    deleteSelectedBtn.addEventListener('click', deleteSelectedEntries);
  }
  
  // Admin password modal backdrop click
  const adminPasswordModal = document.getElementById('admin-password-modal');
  if (adminPasswordModal) {
    adminPasswordModal.addEventListener('click', (e) => {
      if (e.target === adminPasswordModal) {
        closeAdminPasswordModal();
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
