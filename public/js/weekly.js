// Database of weekly curations
const weeklyData = [
  {
    weekNumber: 1,
    startDate: new Date(2026, 1, 14), // February 14, 2026 (Saturday)
    items: [
      { category: "Music", title: "Ambient Darkwave Synths", img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600" },
      { category: "Art", title: "Geometric Shadows", img: "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=600" },
      { category: "Fashion", title: "Y2K Techwear", img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=600" },
      { category: "Film", title: "The Anatomy of Suspense", img: "https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=600" },
      { category: "Random", title: "PS5 UI Case Study", img: "https://images.unsplash.com/photo-1606144042888-517865780d32?q=80&w=600" }
    ]
  },
  {
    weekNumber: 2,
    startDate: new Date(2026, 1, 21), // February 21, 2026 (Saturday)
    items: [
      { category: "Music", title: "Lo-Fi Horror Soundtracks", img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600" },
      { category: "Art", title: "Brutalist Architecture", img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600" },
      { category: "Fashion", title: "Asymmetrical Silhouettes", img: "https://images.unsplash.com/photo-1550614000-4b95d466f914?q=80&w=600" },
      { category: "Film", title: "Lighting in Sci-Fi", img: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=600" },
      { category: "Random", title: "Mechanical Keyboard Mods", img: "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=600" }
    ]
  },
  {
    weekNumber: 3,
    startDate: new Date(2026, 1, 28), // February 28, 2026 (Saturday)
    items: [
      { category: "Music", title: "Synthwave Nostalgia", img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=600" },
      { category: "Art", title: "Digital Expressionism", img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=600" },
      { category: "Fashion", title: "Minimalist Maximalism", img: "https://images.unsplash.com/photo-1551028719-00167b16ebc5?q=80&w=600" },
      { category: "Film", title: "Color Grading Mastery", img: "https://images.unsplash.com/photo-1485579149c01123123bf4dc5a7eb46?q=80&w=600" },
      { category: "Random", title: "Retro Gaming Aesthetics", img: "https://images.unsplash.com/photo-1559808295-51a1da00554c?q=80&w=600" }
    ]
  }
];

const gridElement = document.getElementById('weekly-grid');
const weekLabel = document.getElementById('week-label');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let currentWeekIndex = 0;

// Function to get current week index based on today's date
function getCurrentWeekIndex() {
  const today = new Date();
  
  for (let i = weeklyData.length - 1; i >= 0; i--) {
    const weekStart = new Date(weeklyData[i].startDate);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6); // Saturday to Friday
    
    if (today >= weekStart && today <= weekEnd) {
      return i;
    }
    
    if (today > weekEnd) {
      return Math.min(i + 1, weeklyData.length - 1);
    }
  }
  
  return 0;
}

// Function to format date range for display
function getDateRange(startDate) {
  const start = new Date(startDate);
  const end = new Date(startDate);
  end.setDate(end.getDate() + 6); // Add 6 days to get Friday
  
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const startStr = `${months[start.getMonth()]} ${start.getDate()}`;
  const endStr = `${months[end.getMonth()]} ${end.getDate()}`;
  
  return `${startStr} - ${endStr}`;
}

function renderWeek(index) {
  const data = weeklyData[index];
  
  // Fade out animation
  gridElement.classList.add('fade-out');
  
  setTimeout(() => {
    const dateRange = getDateRange(data.startDate);
    weekLabel.innerHTML = `Week ${data.weekNumber} <span style="opacity: 0.5; margin-left: 8px; font-weight: 300;">| ${dateRange}</span>`;
    gridElement.innerHTML = '';
    
    data.items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'curation-card';
      card.style.backgroundImage = `url('${item.img}')`;
      
      card.innerHTML = `
        <div class="curation-content">
          <span class="curation-tag">${item.category}</span>
          <h3 class="curation-title">${item.title}</h3>
        </div>
      `;
      
      gridElement.appendChild(card);
    });
    
    // Fade back in
    gridElement.classList.remove('fade-out');
  }, 400); 
}

// Event Listeners
prevBtn.addEventListener('click', () => {
  if (currentWeekIndex > 0) {
    currentWeekIndex--;
    renderWeek(currentWeekIndex);
  }
});

nextBtn.addEventListener('click', () => {
  if (currentWeekIndex < weeklyData.length - 1) {
    currentWeekIndex++;
    renderWeek(currentWeekIndex);
  }
});

// Initialize with current week on load
document.addEventListener('DOMContentLoaded', () => {
  currentWeekIndex = getCurrentWeekIndex();
  renderWeek(currentWeekIndex);
});
