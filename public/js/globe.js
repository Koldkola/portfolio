// Globe interaction and user submissions
let globeEntries = [];
let currentEntryIndex = 0;
let isAdminMode = false;
let selectedEntries = new Set();

// Same password hash as archive (Error930!)
const ADMIN_PASSWORD_HASH = "e464086987a59f5748054130383a2b9ddd7196fea110dd7da0e3d4fd29fb2838";
const ADMIN_PASSWORD_SALT = "archive-v1";

// API endpoint for board entries
const API_URL = '/api/board/entries';

// Load entries from backend server
async function loadEntries() {
  try {
    const response = await fetch(API_URL);
    if (response.ok) {
      const data = await response.json();
      globeEntries = Array.isArray(data) ? data : (data.entries || []);
    } else {
      console.error('Failed to load entries:', response.status);
      globeEntries = [];
    }
  } catch (error) {
    console.error('Error loading entries:', error);
    globeEntries = [];
  }
  updateGlobeDisplay();
}

// Save entries to backend server
async function saveEntries() {
  // Entries are now saved via API on submission
  // This function is kept for compatibility but no longer needed
  return true;
}

// Add new entry to backend server
async function addEntry(entry) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entry)
    });
    
    if (response.ok) {
      const data = await response.json();
      globeEntries.push(entry);
      updateGlobeDisplay();
      return true;
    } else {
      const errorData = await response.json().catch(() => ({}));
      console.error('Failed to save entry:', response.status, errorData);
      return false;
    }
  } catch (error) {
    console.error('Error saving entry:', error);
    return false;
  }
}

// Update globe display with current entry
function updateGlobeDisplay() {
  const globe = document.getElementById('globe');
  if (!globe) return;
  
  if (globeEntries.length === 0) {
    globe.innerHTML = '<div class="globe-prompt">Share your week</div>';
    return;
  }
  
  // Create scrolling list of all entries
  const entriesHTML = globeEntries.map((entry, index) => `
    <div class="globe-scroll-item" style="animation-delay: ${index * 0.2}s;">
      <div style="font-size: 0.8rem; font-weight: 700; margin-bottom: 4px; opacity: 0.9;">
        ${entry.name}
      </div>
      <div style="font-size: 0.75rem; line-height: 1.3; opacity: 0.8;">
        "${entry.text.substring(0, 50)}${entry.text.length > 50 ? '...' : ''}"
      </div>
    </div>
  `).join('');
  
  globe.innerHTML = `
    <div class="globe-scroll-container">
      <div class="globe-scroll-content">
        ${entriesHTML}
        ${entriesHTML}
      </div>
    </div>
    <div class="globe-click-hint">Click to see full board</div>
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
  const aboutWindow = document.getElementById('aboutWindow');
  const notesWindow = document.getElementById('notesWindow');
  
  // Fade out floating windows
  if (aboutWindow) {
    aboutWindow.style.opacity = '0';
    aboutWindow.style.pointerEvents = 'none';
    aboutWindow.style.transition = 'opacity 0.3s ease';
  }
  if (notesWindow) {
    notesWindow.style.opacity = '0';
    notesWindow.style.pointerEvents = 'none';
    notesWindow.style.transition = 'opacity 0.3s ease';
  }
  
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

// Close submission modal
function closeGlobeModal() {
  const modal = document.getElementById('globe-modal');
  const aboutWindow = document.getElementById('aboutWindow');
  const notesWindow = document.getElementById('notesWindow');
  
  // Fade in floating windows
  if (aboutWindow) {
    aboutWindow.style.opacity = '1';
    aboutWindow.style.pointerEvents = 'auto';
  }
  if (notesWindow) {
    notesWindow.style.opacity = '1';
    notesWindow.style.pointerEvents = 'auto';
  }
  
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
  
  // Fade out me.txt and context.txt windows
  const aboutWindow = document.getElementById('aboutWindow');
  const notesWindow = document.getElementById('notesWindow');
  if (aboutWindow) {
    aboutWindow.style.opacity = '0';
    aboutWindow.style.pointerEvents = 'none';
    aboutWindow.style.transition = 'opacity 0.3s ease';
  }
  if (notesWindow) {
    notesWindow.style.opacity = '0';
    notesWindow.style.pointerEvents = 'none';
    notesWindow.style.transition = 'opacity 0.3s ease';
  }
  
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
            <img src="${entry.photo}" class="board-polaroid-photo" alt="User photo" data-photo="${entry.photo}" onclick="openPhotoModal('${entry.photo}')" />
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
        const fontStyle = entry.font ? `font-family: ${entry.font};` : '';
        const escapedText = entry.text.replace(/'/g, "\\'");
        const escapedName = entry.name.replace(/'/g, "\\'");
        return `
          <div class="board-sticky ${selectableClass} ${selectedClass}" style="background: ${entry.bgColor || '#000000'}; color: ${entry.textColor || '#ff1493'}; cursor: pointer;" data-index="${index}" onclick="openStickyModal('${escapedName}', '${escapedText}', '${entry.age || ''}', '${entry.timestamp}')">
            ${checkboxHtml}
            <div class="board-sticky-name" style="${fontStyle}">${entry.name}</div>
            <div class="board-sticky-text" style="${fontStyle}">${entry.text}</div>
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

// Photo enlargement functions
function openPhotoModal(photoSrc) {
  const modal = document.getElementById('photo-modal');
  const img = document.getElementById('photo-modal-img');
  if (modal && img) {
    img.src = photoSrc;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closePhotoModal() {
  const modal = document.getElementById('photo-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Sticky note modal functions
function openStickyModal(name, text, age, timestamp) {
  const modal = document.getElementById('sticky-modal');
  if (!modal) {
    // Create modal if it doesn't exist
    const newModal = document.createElement('div');
    newModal.id = 'sticky-modal';
    newModal.className = 'modal';
    newModal.innerHTML = `
      <div class="modal-content" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 9999; background: var(--glass-bg); backdrop-filter: blur(10px); border: 1px solid var(--glass-border); border-radius: 16px; padding: 40px; max-width: 600px; width: 90%; max-height: 80vh; overflow-y: auto; box-shadow: 0 8px 32px rgba(0,0,0,0.3);">
        <button onclick="closeStickyModal()" style="position: absolute; top: 10px; right: 10px; background: none; border: none; font-size: 2rem; cursor: pointer; color: var(--text-primary);">×</button>
        <h2 id="sticky-name"></h2>
        <div id="sticky-text" style="white-space: pre-wrap; word-break: break-word; margin: 20px 0; line-height: 1.6;"></div>
        <div id="sticky-meta" style="color: var(--text-muted); font-size: 0.9rem; margin-top: 20px;"></div>
      </div>
    `;
    document.body.appendChild(newModal);
  }
  
  const modal = document.getElementById('sticky-modal');
  document.getElementById('sticky-name').textContent = name;
  document.getElementById('sticky-text').textContent = text;
  document.getElementById('sticky-meta').textContent = `${age ? `Age ${age} • ` : ''}${new Date(timestamp).toLocaleDateString()}`;
  
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeStickyModal() {
  const modal = document.getElementById('sticky-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Close expanded view modal
function closeGlobeViewModal() {
  const modal = document.getElementById('globe-view-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  // Auto-lock globe admin mode when board modal closes
  if (isAdminMode) {
    isAdminMode = false;
    selectedEntries.clear();
    updateAdminButton();
    renderBoardModal();
  }
  
  // Restore windows visibility
  const aboutWindow = document.getElementById('aboutWindow');
  const notesWindow = document.getElementById('notesWindow');
  const aboutVisible = sessionStorage.getItem('aboutWindowVisible');
  const notesVisible = sessionStorage.getItem('notesWindowVisible');
  
  if (aboutWindow && aboutVisible !== 'false') {
    aboutWindow.style.display = 'block';
  }
  if (notesWindow && notesVisible !== 'false') {
    notesWindow.style.display = 'block';
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
async function deleteSelectedEntries() {
  if (selectedEntries.size === 0) {
    showNotification('No entries selected');
    return;
  }
  
  const count = selectedEntries.size;
  if (confirm(`Delete ${count} selected ${count === 1 ? 'entry' : 'entries'}? This cannot be undone.`)) {
    // Get the IDs of entries to delete
    const indicesToDelete = Array.from(selectedEntries).sort((a, b) => b - a);
    const idsToDelete = indicesToDelete.map(index => globeEntries[index]?.id).filter(Boolean);
    
    // Delete from local array
    indicesToDelete.forEach(index => {
      globeEntries.splice(index, 1);
    });
    
    selectedEntries.clear();
    currentEntryIndex = 0;
    updateGlobeDisplay();
    
    // Sync deletion to backend
    try {
      const response = await fetch(API_URL, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids: idsToDelete })
      });
      
      if (response.ok) {
        showNotification(`Deleted ${count} ${count === 1 ? 'entry' : 'entries'}`);
      } else {
        showNotification('Deleted locally, but failed to sync to server');
        // Reload to get server state
        await loadEntries();
      }
    } catch (error) {
      console.error('Error syncing deletions:', error);
      showNotification('Deleted locally, but failed to sync to server');
      // Reload to get server state
      await loadEntries();
    }
    
    openGlobeViewModal(); // Refresh view
  }
}

// Close expanded view modal
function closeGlobeViewModal() {
  const modal = document.getElementById('globe-view-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  // Auto-lock globe admin mode when board modal closes
  if (isAdminMode) {
    isAdminMode = false;
    selectedEntries.clear();
    updateAdminButton();
    renderBoardModal();
  }
  
  // Fade in floating windows
  const aboutWindow = document.getElementById('aboutWindow');
  const notesWindow = document.getElementById('notesWindow');
  if (aboutWindow) {
    aboutWindow.style.opacity = '1';
    aboutWindow.style.pointerEvents = 'auto';
  }
  if (notesWindow) {
    notesWindow.style.opacity = '1';
    notesWindow.style.pointerEvents = 'auto';
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
  const userFont = document.getElementById('userFont').value;
  const photoInput = document.getElementById('userPhoto');
  const drawingInput = document.getElementById('userDrawing');
  
  if (!name || !text) {
    showNotification('Please enter a name and message', 'error');
    return;
  }
  
  // Disable submit button during processing
  const submitBtn = document.querySelector('.globe-form button[type="submit"]');
  if (submitBtn) submitBtn.disabled = true;
  
  // Check for drawing first
  if (drawingInput && drawingInput.value) {
    saveNewEntry(name, text, age, textColor, bgColor, userFont, drawingInput.value, submitBtn);
    drawingInput.value = '';
  }
  // Handle photo if provided
  else if (photoInput.files && photoInput.files[0]) {
    const reader = new FileReader();
    reader.onload = async function(e) {
      await saveNewEntry(name, text, age, textColor, bgColor, userFont, e.target.result, submitBtn);
    };
    reader.readAsDataURL(photoInput.files[0]);
  } else {
    saveNewEntry(name, text, age, textColor, bgColor, userFont, null, submitBtn);
  }
}

// Save new entry to backend
async function saveNewEntry(name, text, age, textColor, bgColor, userFont, photo, submitBtn) {
  const entry = {
    name: name,
    text: text,
    age: age || null,
    textColor: textColor,
    bgColor: bgColor,
    font: userFont,
    photo: photo,
    timestamp: new Date().toISOString()
  };
  
  const success = await addEntry(entry);
  
  if (submitBtn) submitBtn.disabled = false;
  
  if (success) {
    closeGlobeModal();
    document.getElementById('globe-form').reset();
    showNotification('Your entry has been added to the board!');
  } else {
    showNotification('Failed to save entry. Please try again.', 'error');
  }
}

// Show notification
function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  const bgColor = type === 'error' ? 'rgba(239, 68, 68, 0.95)' : 'rgba(139, 92, 246, 0.95)';
  
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 40px;
    background: ${bgColor};
    color: white;
    padding: 16px 24px;
    border-radius: 8px;
    z-index: 10001;
    animation: slideInRight 0.3s ease;
    box-shadow: 0 8px 24px ${type === 'error' ? 'rgba(239, 68, 68, 0.4)' : 'rgba(139, 92, 246, 0.4)'};
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
  
  // Photo modal backdrop click and escape key
  const photoModal = document.getElementById('photo-modal');
  if (photoModal) {
    photoModal.addEventListener('click', (e) => {
      if (e.target === photoModal) {
        closePhotoModal();
      }
    });
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && photoModal.classList.contains('active')) {
        closePhotoModal();
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

// Make photo modal functions globally accessible
window.openPhotoModal = openPhotoModal;
window.closePhotoModal = closePhotoModal;
