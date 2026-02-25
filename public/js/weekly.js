// Database of weekly curations
const weeklyData = [
  {
    weekNumber: 1,
    date: "February 18, 2026", // Added Month Date, Year format
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
    date: "February 25, 2026", // Added Month Date, Year format
    items: [
      { category: "Music", title: "Lo-Fi Horror Soundtracks", img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600" },
      { category: "Art", title: "Brutalist Architecture", img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600" },
      { category: "Fashion", title: "Asymmetrical Silhouettes", img: "https://images.unsplash.com/photo-1550614000-4b95d466f914?q=80&w=600" },
      { category: "Film", title: "Lighting in Sci-Fi", img: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=600" },
      { category: "Random", title: "Mechanical Keyboard Mods", img: "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=600" }
    ]
  }
  // Add future weeks here following the same format
];

let currentWeekIndex = 0;

const gridElement = document.getElementById('weekly-grid');
const weekLabel = document.getElementById('week-label');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

function renderWeek(index) {
  const data = weeklyData[index];
  
  // Fade out animation
  gridElement.classList.add('fade-out');
  
  setTimeout(() => {
    // Update content while invisible — Now includes the date!
    weekLabel.innerHTML = `Week ${data.weekNumber} <span style="opacity: 0.5; margin-left: 8px; font-weight: 300;">| ${data.date}</span>`;
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

// Initialize first week on load
document.addEventListener('DOMContentLoaded', () => {
  renderWeek(currentWeekIndex);
});