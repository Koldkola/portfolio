// Database of weekly curations
const weeklyData = [
  {
    startDate: new Date(2026, 1, 14), // February 14, 2026 (Saturday)
    items: [
      { 
        category: "Music", 
        title: "Ambient Darkwave Synths", 
        description: "Exploring atmospheric synth layers and dark wave influences.", 
        img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600",
        detailedContent: {
          intro: "This week I've been diving deep into the intersection of ambient music and darkwave synth production. The atmospheric textures and moody undertones create a sonic landscape that's both introspective and cinematic.",
          highlights: [
            "Layering ethereal pads with modulated bass synths for depth",
            "Using reverb and delay to create spatial awareness in the mix",
            "Incorporating vintage analog synth emulations for warmth",
            "Balancing dark atmospheres with melodic elements"
          ],
          inspiration: "Artists like Perturbator, Blanck Mass, and Ben Frost have been major influences this week. Their ability to create tension and release through minimal yet powerful electronic elements is something I'm studying closely.",
          tools: "Arturia V Collection, Valhalla Reverb, Native Instruments Massive X"
        }
      },
      { 
        category: "Art", 
        title: "Geometric Shadows", 
        description: "How shadows create depth in minimalist compositions.", 
        img: "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=600",
        detailedContent: {
          intro: "Geometric abstraction meets shadow play. I've been fascinated by how simple shapes can create complex emotional responses when combined with dramatic lighting and shadow work.",
          highlights: [
            "Studying the interplay between positive and negative space",
            "Using angular shadows to guide the viewer's eye through compositions",
            "Exploring monochromatic palettes to emphasize form over color",
            "Incorporating subtle gradients to enhance dimensional illusion"
          ],
          inspiration: "The work of László Moholy-Nagy and contemporary minimalist photographers like Hiroshi Sugimoto have been particularly inspiring. Their ability to distill complexity into essential geometric forms resonates deeply.",
          tools: "Photography: Sony A7III, studio lighting. Digital: Adobe Photoshop, Blender for 3D shadow studies"
        }
      },
      { 
        category: "Fashion", 
        title: "Y2K Techwear", 
        description: "The resurgence of 2000s tech aesthetics in modern fashion.", 
        img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=600",
        detailedContent: {
          intro: "The Y2K aesthetic is back, but this time it's merging with functional techwear. Metallic fabrics, cargo details, and futuristic silhouettes are being reinterpreted through a contemporary lens that balances nostalgia with utility.",
          highlights: [
            "Reflective materials and iridescent fabrics creating dynamic visual interest",
            "Multi-pocket cargo designs meeting modern urban mobility needs",
            "Low-rise and asymmetrical cuts reimagined for today's body positivity movement",
            "Tech accessories like LED strips and modular attachments"
          ],
          inspiration: "Brands like Acronym, Heliot Emil, and emerging designers on Instagram are pushing this aesthetic forward. The intersection of form, function, and nostalgia creates a unique design language.",
          tools: "Fashion sketching in Procreate, mood boarding in Pinterest, following designers like @acronym, @heliot_emil"
        }
      },
      { 
        category: "Film", 
        title: "The Anatomy of Suspense", 
        description: "Analyzing tension-building techniques in psychological thrillers.", 
        img: "https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=600",
        detailedContent: {
          intro: "What makes a scene truly suspenseful? This week I've been breaking down psychological thrillers frame by frame, studying how directors manipulate time, space, and information to create unbearable tension.",
          highlights: [
            "Strategic use of silence and ambient sound to create unease",
            "Camera angles that suggest hidden dangers or unseen observers",
            "Pacing techniques: slow burns vs. shock cuts",
            "Withholding information from the audience to create anticipation"
          ],
          inspiration: "Analyzing films like 'Zodiac' (Fincher), 'The Shining' (Kubrick), and 'Hereditary' (Aster). Each director has a unique approach to building dread—Fincher through meticulous detail, Kubrick through symmetry and isolation, Aster through family horror.",
          tools: "Frame.io for collaborative analysis, DaVinci Resolve for color/pacing study, annotated screenplays"
        }
      },
      { 
        category: "Random", 
        title: "PS5 UI Case Study", 
        description: "Breaking down the design systems behind next-gen console interfaces.", 
        img: "https://images.unsplash.com/photo-1606144042888-517865780d32?q=80&w=600",
        detailedContent: {
          intro: "Sony's PS5 interface represents a radical departure from traditional console UIs. The card-based system, dynamic backgrounds, and haptic integration create a cohesive experience that extends gameplay into the system level.",
          highlights: [
            "Card-based architecture for quick-resume and content discovery",
            "Glassmorphism and blur effects creating visual depth without clutter",
            "Activities integration: jumping directly into specific game moments",
            "Haptic feedback extending into UI navigation via DualSense"
          ],
          inspiration: "The PS5 UI embodies principles from modern web design (card layouts, infinite scroll) while maintaining console-specific optimization. It's a masterclass in spatial design and information hierarchy.",
          tools: "Figma for UI recreation studies, analyzing system architecture, motion design in After Effects"
        }
      }
    ]
  },
  {
    startDate: new Date(2026, 1, 21), // February 21, 2026 (Saturday)
    items: [
      { 
        category: "Music", 
        title: "Lo-Fi Horror Soundtracks", 
        description: "Blending relaxing beats with eerie ambient textures.", 
        img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600",
        detailedContent: {
          intro: "What happens when you combine the cozy aesthetic of lo-fi hip-hop with the unsettling atmospheres of horror soundtracks? A fascinating sonic experiment in contrasts.",
          highlights: [
            "Warm vinyl crackle layered over dissonant drones",
            "Jazz chord progressions with unexpected horror stings",
            "Manipulated vocal samples creating ghostly textures",
            "Tape saturation for nostalgic warmth meeting digital glitch horror"
          ],
          inspiration: "Drawing from lo-fi producers like Jinsang and horror composers like Disasterpeace (It Follows), I'm exploring how comfort and unease can coexist in the same sonic space.",
          tools: "Ableton Live, iZotope Vinyl, cassette recordings, field recordings from abandoned spaces"
        }
      },
      { 
        category: "Art", 
        title: "Brutalist Architecture", 
        description: "Raw concrete forms and monumental design principles.", 
        img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600",
        detailedContent: {
          intro: "Brutalism is experiencing a renaissance. The honesty of raw materials, the boldness of geometric forms, and the rejection of ornamentation create structures that challenge our relationship with built environments.",
          highlights: [
            "Exposed concrete celebrating material authenticity",
            "Massive geometric volumes creating imposing scales",
            "Repetitive patterns and modular construction",
            "Shadow play across textured surfaces throughout the day"
          ],
          inspiration: "Studying buildings like the Barbican Centre (London), Habitat 67 (Montreal), and works by Tadao Ando who brings brutalism into poetic territory.",
          tools: "Photography expeditions, architectural drawing, 3D visualization in Blender"
        }
      },
      { 
        category: "Fashion", 
        title: "Asymmetrical Silhouettes", 
        description: "Deconstructed tailoring and unexpected fabric layering.", 
        img: "https://images.unsplash.com/photo-1550614000-4b95d466f914?q=80&w=600",
        detailedContent: {
          intro: "Breaking free from bilateral symmetry. Asymmetrical fashion challenges traditional notions of balance while creating dynamic, movement-focused garments.",
          highlights: [
            "One-shoulder designs and diagonal hemlines",
            "Layering different fabric weights for visual interest",
            "Deconstructed sleeves and collar placements",
            "Strategic draping that responds to body movement"
          ],
          inspiration: "Designers like Yohji Yamamoto, Rei Kawakubo (Comme des Garçons), and contemporary brands like A-COLD-WALL* are pushing boundaries in deconstruction.",
          tools: "Fashion draping on dress forms, pattern manipulation, digital fashion in CLO 3D"
        }
      },
      { 
        category: "Film", 
        title: "Lighting in Sci-Fi", 
        description: "How neon and practical lights shape cyberpunk aesthetics.", 
        img: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=600",
        detailedContent: {
          intro: "The cyberpunk visual language is defined by its lighting: neon signs reflected in rain-slicked streets, harsh fluorescents in corporate corridors, and the glow of screens illuminating faces in dark rooms.",
          highlights: [
            "Practical neon lighting for authentic color bleeding",
            "High contrast ratios creating noir-inspired shadows",
            "Color temperature mixing: cool tech vs warm humanity",
            "Volumetric lighting (smoke/fog) for atmospheric depth"
          ],
          inspiration: "Films like Blade Runner 2049, Ghost in the Shell, and recent shows like Cyberpunk: Edgerunners demonstrate masterful lighting design. Each light source tells a story.",
          tools: "Studying cinematography breakdowns, lighting diagrams, practical experiments with LED strips"
        }
      },
      { 
        category: "Random", 
        title: "Mechanical Keyboard Mods", 
        description: "Custom switches, stabilizers, and typing experience optimization.", 
        img: "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=600",
        detailedContent: {
          intro: "Mechanical keyboards have evolved from functional tools to highly customizable instruments. Every component—switches, keycaps, case, stabilizers—contributes to both the tactile and acoustic experience.",
          highlights: [
            "Switch modding: lubing, spring swapping, stem modifications",
            "Stabilizer tuning for smooth spacebar and modifier keys",
            "Case foam and material selection for sound dampening",
            "Keycap profiles (Cherry, SA, MT3) and their ergonomic impacts"
          ],
          inspiration: "The mechanical keyboard community on Reddit and YouTube (Taeha Types, Alexotos) has created an entire culture around typing feel and sound signatures.",
          tools: "Various switches for testing, lube stations, sound dampening materials, soldering equipment"
        }
      }
    ]
  },
  {
    startDate: new Date(2026, 1, 28), // February 28, 2026 (Saturday)
    items: [
      { 
        category: "Music", 
        title: "Synthwave Nostalgia", 
        description: "Electronic soundscapes evoking 80s retro-futurism.", 
        img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=600",
        detailedContent: {
          intro: "Synthwave isn't just nostalgia—it's retrofuturism. It imagines the future as seen through the lens of 1980s optimism, neon-soaked and synthesizer-driven.",
          highlights: [
            "Classic analog synth sounds: Juno-106, DX7, Prophet-5",
            "Gated reverb on drums for that iconic 80s punch",
            "Arpeggiated basslines and soaring lead melodies",
            "Miami Vice-inspired chord progressions and aesthetic"
          ],
          inspiration: "Artists like The Midnight, FM-84, and Gunship perfectly capture this aesthetic. Their music soundtracks imaginary drives through neon-lit cities that never existed.",
          tools: "TAL-U-NO-LX, Dexed FM synth, Lexicon reverb emulations, side-chain compression"
        }
      },
      { 
        category: "Art", 
        title: "Digital Expressionism", 
        description: "Expressive brushwork translated into digital mediums.", 
        img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=600",
        detailedContent: {
          intro: "Can digital art have the same gestural energy as traditional painting? I've been exploring how pressure-sensitive styluses and custom brushes can create authentic expressive marks in the digital realm.",
          highlights: [
            "Custom brush engines mimicking oil paint texture and blending",
            "Gestural mark-making with full arm movements on large displays",
            "Color theory: bold, emotional palettes over realistic representation",
            "Embracing digital artifacts as part of the aesthetic"
          ],
          inspiration: "Looking at traditional expressionists like Willem de Kooning and Francis Bacon, then studying digital artists like Loish and Bobby Chiu who bring similar energy to digital work.",
          tools: "iPad Pro with Apple Pencil, Procreate, Photoshop with Kyle T. Webster brushes, Wacom Cintiq Pro"
        }
      },
      { 
        category: "Fashion", 
        title: "Minimalist Maximalism", 
        description: "Bold statements through carefully curated understated pieces.", 
        img: "https://images.unsplash.com/photo-1551028719-00167b16ebc5?q=80&w=600",
        detailedContent: {
          intro: "The paradox of minimalist maximalism: making a strong statement through restraint. It's about choosing one bold element and letting everything else recede into simplicity.",
          highlights: [
            "Monochromatic palettes with one contrasting statement piece",
            "Oversized single items paired with fitted basics",
            "Luxurious materials in simple silhouettes",
            "Negative space as a design element"
          ],
          inspiration: "The Row's luxury minimalism, Lemaire's oversized yet refined pieces, and Jil Sander's 'less is more' philosophy inform this aesthetic.",
          tools: "Wardrobe curation, studying proportions, investment piece research"
        }
      },
      { 
        category: "Film", 
        title: "Color Grading Mastery", 
        description: "Mood and narrative told through sophisticated color palettes.", 
        img: "https://images.unsplash.com/photo-1485579149c01123123bf4dc5a7eb46?q=80&w=600",
        detailedContent: {
          intro: "Color grading is storytelling. Every scene's color palette should reflect the emotional state of characters and the thematic weight of the narrative moment.",
          highlights: [
            "Complementary color schemes for visual harmony (orange/teal)",
            "Desaturation in specific channels to create mood",
            "Using color temperature to separate foreground from background",
            "LUT creation and color space management"
          ],
          inspiration: "Studying colorist work in films like Mad Max: Fury Road (desert warmth vs cool nights), Her (soft pastels for intimate loneliness), and The Grand Budapest Hotel (distinct palettes for each time period).",
          tools: "DaVinci Resolve, color wheels, RGB curves, shot matching, reference monitoring"
        }
      },
      { 
        category: "Random", 
        title: "Retro Gaming Aesthetics", 
        description: "Pixel art revival and nostalgia-driven game design trends.", 
        img: "https://images.unsplash.com/photo-1559808295-51a1da00554c?q=80&w=600",
        detailedContent: {
          intro: "Modern indie games are reviving pixel art not just for nostalgia, but because of its unique aesthetic language. Constraints breed creativity, and pixel art's limitations force intentional design.",
          highlights: [
            "Limited color palettes creating cohesive visual identity",
            "Pixel-perfect animation and the '12 principles' at low resolution",
            "Dithering techniques for texture and gradient illusion",
            "Modern shaders and lighting effects on classic pixel foundations"
          ],
          inspiration: "Games like Celeste, Hyper Light Drifter, and Blasphemous show how pixel art can be both nostalgic and cutting-edge. They use modern techniques (particles, shaders, dynamic lighting) with retro aesthetics.",
          tools: "Aseprite for pixel art, Unity/Godot for implementation, shader programming for effects"
        }
      }
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

// Color palettes for each week - soft pastel spectrum from purple through turquoise
const colorPalettes = [
  // Week 1 - Soft purple to turquoise gradient
  ['#e8d9ff', '#d4e8ff', '#c4f1f0', '#b8eae8', '#ace3e0'],
  // Week 2 - Mixed soft pastels
  ['#dcc9ff', '#cfdcff', '#c0e9f0', '#b0e3e8', '#d1c4ff'],
  // Week 3 - Soft turquoise to purple gradient
  ['#d2f4f3', '#cae4f2', '#c2d4f1', '#d0c8f0', '#ddc4f5']
];

function renderWeek(index) {
  const data = weeklyData[index];
  const colors = colorPalettes[index % colorPalettes.length];
  
  // Fade out animation
  gridElement.classList.add('fade-out');
  
  setTimeout(() => {
    const dateDisplay = getDateDisplay(data.startDate);
    weekLabel.innerHTML = `<span style="opacity: 0.5; font-weight: 300;">${dateDisplay}</span>`;
    gridElement.innerHTML = '';
    
    data.items.forEach((item, itemIndex) => {
      const descCard = document.createElement('div');
      descCard.className = 'weekly-sticky-card';
      
      const bgColor = colors[itemIndex % colors.length];
      const rotation = itemIndex % 2 === 0 ? -2 : 2;
      
      descCard.style.background = bgColor;
      descCard.style.transform = `rotate(${rotation}deg)`;
      
      descCard.innerHTML = `
        <div class="sticky-tape"></div>
        <span class="curation-tag" style="color: #2d2d2d; font-style: italic;">${item.category}</span>
        <h4 style="color: #2d2d2d;">${item.title}</h4>
        <p style="color: #2d2d2d;">${item.description}</p>
      `;
      
      // Add click handler to open modal with color
      descCard.addEventListener('click', () => openCategoryModal(item, bgColor));
      
      gridElement.appendChild(descCard);
    });
    
    // Fade back in
    gridElement.classList.remove('fade-out');
  }, 400); 
}

// Modal functionality
function openCategoryModal(item, bgColor) {
  // Hide me.txt and content.txt windows
  const aboutWindow = document.getElementById('aboutWindow');
  const notesWindow = document.getElementById('notesWindow');
  if (aboutWindow) aboutWindow.style.display = 'none';
  if (notesWindow) notesWindow.style.display = 'none';
  
  const modal = document.getElementById('category-modal');
  const modalContent = modal.querySelector('.category-modal-content');
  const modalTitle = document.getElementById('modal-title');
  const modalCategory = document.getElementById('modal-category');
  const modalWeek = document.getElementById('modal-week');
  const modalIntro = document.getElementById('modal-intro');
  const modalHighlights = document.getElementById('modal-highlights');
  const modalInspiration = document.getElementById('modal-inspiration');
  const modalTools = document.getElementById('modal-tools');
  
  // Apply sticky note styling to modal
  if (modalContent && bgColor) {
    modalContent.style.background = bgColor;
    modalContent.style.boxShadow = '0 8px 24px rgba(0,0,0,0.3), 0 2px 6px rgba(0,0,0,0.2)';
    modalContent.style.position = 'relative';
    
    // Apply dark text colors for readability on pastel backgrounds
    modalTitle.style.color = '#2d2d2d';
    modalCategory.style.color = 'rgba(0,0,0,0.7)';
    modalWeek.style.color = 'rgba(0,0,0,0.6)';
    modalIntro.style.color = '#3d3d3d';
    
    // Style all content in modal body
    const modalBody = modal.querySelector('.category-modal-body');
    if (modalBody) {
      modalBody.style.color = '#3d3d3d';
    }
  }
  
  // Populate modal content
  modalTitle.textContent = item.title;
  modalCategory.textContent = item.category;
  
  const dateDisplay = getDateDisplay(weeklyData[currentWeekIndex].startDate);
  modalWeek.textContent = dateDisplay;
  
  if (item.detailedContent) {
    modalIntro.textContent = item.detailedContent.intro;
    
    // Create highlights list
    modalHighlights.innerHTML = '<h3 style="color: #2d2d2d;">Key Highlights</h3><ul>' + 
      item.detailedContent.highlights.map(h => `<li>${h}</li>`).join('') + 
      '</ul>';
    
    modalInspiration.innerHTML = `<h3 style="color: #2d2d2d;">Inspiration</h3><p>${item.detailedContent.inspiration}</p>`;
    modalTools.innerHTML = `<h3 style="color: #2d2d2d;">Tools & Resources</h3><p>${item.detailedContent.tools}</p>`;
  }
  
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCategoryModal() {
  const modal = document.getElementById('category-modal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
  
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
  
  // Close modal when clicking on backdrop
  const modal = document.getElementById('category-modal');
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeCategoryModal();
    }
  });
  
  // Close modal on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCategoryModal();
    }
  });
});
