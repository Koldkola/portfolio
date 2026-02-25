// Database of weekly curations
const weeklyData = [
  {
    startDate: new Date(2026, 1, 14), // February 14, 2026 (Saturday)
    items: [
      { category: "Music", title: "Ambient Darkwave Synths", description: "Exploring atmospheric synth layers and dark wave influences.", img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600" },
      { category: "Art", title: "Geometric Shadows", description: "How shadows create depth in minimalist compositions.", img: "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=600" },
      { category: "Fashion", title: "Y2K Techwear", description: "The resurgence of 2000s tech aesthetics in modern fashion.", img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=600" },
      { category: "Film", title: "The Anatomy of Suspense", description: "Analyzing tension-building techniques in psychological thrillers.", img: "https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=600" },
      { category: "Random", title: "PS5 UI Case Study", description: "Breaking down the design systems behind next-gen console interfaces.", img: "https://images.unsplash.com/photo-1606144042888-517865780d32?q=80&w=600" }
    ]
  },
  {
    startDate: new Date(2026, 1, 21), // February 21, 2026 (Saturday)
    items: [
      { category: "Music", title: "Lo-Fi Horror Soundtracks", description: "Blending relaxing beats with eerie ambient textures.", img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600" },
      { category: "Art", title: "Brutalist Architecture", description: "Raw concrete forms and monumental design principles.", img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600" },
      { category: "Fashion", title: "Asymmetrical Silhouettes", description: "Deconstructed tailoring and unexpected fabric layering.", img: "https://images.unsplash.com/photo-1550614000-4b95d466f914?q=80&w=600" },
      { category: "Film", title: "Lighting in Sci-Fi", description: "How neon and practical lights shape cyberpunk aesthetics.", img: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=600" },
      { category: "Random", title: "Mechanical Keyboard Mods", description: "Custom switches, stabilizers, and typing experience optimization.", img: "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=600" }
    ]
  },
  {
    startDate: new Date(2026, 1, 28), // February 28, 2026 (Saturday)
    items: [
      { category: "Music", title: "Synthwave Nostalgia", description: "Electronic soundscapes evoking 80s retro-futurism.", img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=600" },
      { category: "Art", title: "Digital Expressionism", description: "Expressive brushwork translated into digital mediums.", img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=600" },
      { category: "Fashion", title: "Minimalist Maximalism", description: "Bold statements through carefully curated understated pieces.", img: "https://images.unsplash.com/photo-1551028719-00167b16ebc5?q=80&w=600" },
      { category: "Film", title: "Color Grading Mastery", description: "Mood and narrative told through sophisticated color palettes.", img: "https://images.unsplash.com/photo-1485579149c01123123bf4dc5a7eb46?q=80&w=600" },
      { category: "Random", title: "Retro Gaming Aesthetics", description: "Pixel art revival and nostalgia-driven game design trends.", img: "https://images.unsplash.com/photo-1559808295-51a1da00554c?q=80&w=600" }
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

// Function to format date for display (just show start date)
function getDateDisplay(startDate) {
  const start = new Date(startDate);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `Week of ${months[start.getMonth()]} ${start.getDate()}`;
}

function renderWeek(index) {
  const data = weeklyData[index];
  
  // Fade out animation
  gridElement.classList.add('fade-out');
  
  setTimeout(() => {
    const dateDisplay = getDateDisplay(data.startDate);
    weekLabel.innerHTML = `<span style="opacity: 0.5; font-weight: 300;">${dateDisplay}</span>`;
    gridElement.innerHTML = '';
    
    // Create a grid container for descriptions
    const descriptionsGrid = document.createElement('div');
    descriptionsGrid.className = 'weekly-descriptions-grid';
    
    data.items.forEach(item => {
      const descCard = document.createElement('div');
      descCard.className = 'weekly-desc-card';
      
      descCard.innerHTML = `
        <span class="curation-tag">${item.category}</span>
        <h4>${item.title}</h4>
        <p>${item.description}</p>
      `;
      
      descriptionsGrid.appendChild(descCard);
    });
    
    gridElement.appendChild(descriptionsGrid);
    
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
