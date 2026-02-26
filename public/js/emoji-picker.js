// Emoji Picker Functionality

const emojis = {
  smileys: ['😊', '😂', '😍', '😎', '😭', '😡', '😱', '🤔', '😴', '🤗', '😇', '🥳', '🤩', '😋', '😜', '🤪', '😏', '😬', '🙄', '😮', '🥺', '😢', '😤', '😈', '👻', '💀', '👽', '🤖'],
  hearts: ['❤️', '💕', '💖', '💗', '💙', '💚', '💛', '🧡', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💞', '💓', '💘', '💝', '💟'],
  hands: ['👍', '👎', '👏', '🙌', '👋', '🤝', '✊', '👊', '🤛', '🤜', '✌️', '🤞', '🤟', '🤘', '👌', '🤌', '🤏', '👈', '👉', '👆', '👇', '☝️', '✋', '🤚', '🖐️', '🖖', '👐', '🙏'],
  activities: ['⚽', '🏀', '🏈', '⚾', '🎾', '🏐', '🏉', '🎱', '🏓', '🏸', '🏒', '🏑', '🥍', '🏏', '⛳', '🏹', '🎣', '🥊', '🥋', '⛸️', '🛷', '⛷️', '🏂', '🤿', '🏋️', '🎯', '🎮', '🎲'],
  objects: ['💡', '🔦', '🕯️', '💻', '⌨️', '🖥️', '🖨️', '🖱️', '💾', '📱', '☎️', '📞', '📟', '📠', '📺', '📻', '🎙️', '🎚️', '🎛️', '⏰', '⏱️', '⏲️', '⌚', '📡', '🔋', '🔌', '💵', '💰'],
  symbols: ['✨', '⭐', '🌟', '💫', '✅', '❌', '⚠️', '🚫', '💯', '🔥', '💢', '💥', '💤', '💨', '🎉', '🎊', '🎈', '🎁', '🏆', '🥇', '🥈', '🥉', '🔔', '🔕', '🎵', '🎶', '🎤', '🎧'],
  nature: ['🌸', '🌺', '🌻', '🌷', '🌹', '🥀', '🌱', '🌿', '🍀', '🌾', '🌳', '🌲', '🌴', '🌵', '🌊', '🌈', '🌙', '⭐', '☀️', '⛅', '☁️', '🌤️', '⛈️', '🌧️', '☔', '⚡', '❄️', '🔥'],
  food: ['🍕', '🍔', '🍟', '🌭', '🍿', '🧀', '🍖', '🍗', '🥓', '🥚', '🍳', '🥞', '🧇', '🥐', '🍞', '🥖', '🥨', '🧈', '🥯', '🍕', '🍝', '🥗', '🍲', '🍱', '🍛', '🍜', '🍣', '🍤']
};

let currentTargetTextarea = null;

// Open emoji picker
function openEmojiPicker(targetId) {
  currentTargetTextarea = document.getElementById(targetId);
  const modal = document.getElementById('emoji-picker-modal');
  modal.classList.add('active');
  loadEmojis('smileys');
}

// Close emoji picker
function closeEmojiPicker() {
  const modal = document.getElementById('emoji-picker-modal');
  modal.classList.remove('active');
  currentTargetTextarea = null;
}

// Load emojis for a category
function loadEmojis(category) {
  const grid = document.getElementById('emojiGrid');
  grid.innerHTML = '';
  
  const categoryEmojis = emojis[category] || [];
  categoryEmojis.forEach(emoji => {
    const btn = document.createElement('button');
    btn.textContent = emoji;
    btn.className = 'emoji-item';
    btn.type = 'button';
    btn.onclick = () => insertEmoji(emoji);
    grid.appendChild(btn);
  });
}

// Insert emoji at cursor position
function insertEmoji(emoji) {
  if (!currentTargetTextarea) return;
  
  const start = currentTargetTextarea.selectionStart;
  const end = currentTargetTextarea.selectionEnd;
  const text = currentTargetTextarea.value;
  
  currentTargetTextarea.value = text.substring(0, start) + emoji + text.substring(end);
  currentTargetTextarea.selectionStart = currentTargetTextarea.selectionEnd = start + emoji.length;
  currentTargetTextarea.focus();
  
  // Trigger input event for any listeners
  currentTargetTextarea.dispatchEvent(new Event('input', { bubbles: true }));
}

// Initialize emoji picker functionality
document.addEventListener('DOMContentLoaded', () => {
  // Add click handlers to all emoji buttons
  document.querySelectorAll('.emoji-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-target');
      openEmojiPicker(targetId);
    });
  });
  
  // Add category switching
  document.querySelectorAll('.emoji-cat-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('.emoji-cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.getAttribute('data-category');
      loadEmojis(category);
    });
  });
  
  // Close on outside click
  document.getElementById('emoji-picker-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'emoji-picker-modal') {
      closeEmojiPicker();
    }
  });
  
  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.getElementById('emoji-picker-modal')?.classList.contains('active')) {
      closeEmojiPicker();
    }
  });
});
