// Database of weekly curations
const WEEKLY_ADMIN_HASH = "e464086987a59f5748054130383a2b9ddd7196fea110dd7da0e3d4fd29fb2838";
const WEEKLY_ADMIN_SALT = "archive-v1";
const WEEKLY_STORAGE_KEY = "weeklyDataOverrides";
let weeklyData = [
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

let isWeeklyAdminMode = false;
let editingWeekIndex = null;
let editingItemIndex = null;

function normalizeWeeklyData(rawData) {
  return rawData.map(week => ({
    ...week,
    startDate: week.startDate instanceof Date ? week.startDate : new Date(week.startDate),
    items: Array.isArray(week.items)
      ? week.items.map(item => {
          const images = Array.isArray(item.images)
            ? item.images.filter(Boolean)
            : (item.img ? [item.img] : []);
          const videos = Array.isArray(item.videos)
            ? item.videos.filter(Boolean)
            : [];
          return {
            ...item,
            img: images[0] || item.img || '',
            images: images.slice(0, 4),
            videos: videos.slice(0, 4)
          };
        })
      : []
  }));
}

function loadWeeklyOverrides() {
  const stored = localStorage.getItem(WEEKLY_STORAGE_KEY);
  if (!stored) return;
  try {
    const parsed = JSON.parse(stored);
    weeklyData = normalizeWeeklyData(parsed);
  } catch (error) {
    console.error('Failed to load weekly overrides', error);
  }
}

function saveWeeklyOverrides() {
  const serializable = weeklyData.map(week => ({
    ...week,
    startDate: new Date(week.startDate).toISOString()
  }));
  localStorage.setItem(WEEKLY_STORAGE_KEY, JSON.stringify(serializable));
}

const gridElement = document.getElementById('weekly-grid');
const weekLabel = document.getElementById('week-label');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let currentWeekIndex = 0;

// Function to get current week index based on today's date
function getCurrentWeekIndex() {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  // Check if tomorrow is a Saturday (day 6 in JS where Sunday = 0)
  // If so, show the week starting tomorrow
  if (tomorrow.getDay() === 6) {
    for (let i = 0; i < weeklyData.length; i++) {
      const weekStart = new Date(weeklyData[i].startDate);
      if (weekStart.getTime() === tomorrow.getTime()) {
        return i;
      }
    }
  }
  
  // Otherwise, find the week that contains today
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
      
      const editButton = isWeeklyAdminMode
        ? '<button class="weekly-edit-btn" type="button" aria-label="Edit weekly highlight">Edit</button>'
        : '';

      descCard.innerHTML = `
        <div class="sticky-tape"></div>
        ${editButton}
        <span class="curation-tag" style="color: #000; font-style: italic;">${item.category}</span>
        <h4 style="color: #000;">${item.title}</h4>
        <p style="color: #000;">${item.description}</p>
      `;
      
      // Add click handler to open modal with color
      descCard.addEventListener('click', () => openCategoryModal(item, bgColor));

      if (isWeeklyAdminMode) {
        const editBtn = descCard.querySelector('.weekly-edit-btn');
        if (editBtn) {
          editBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            openWeeklyEditor(currentWeekIndex, itemIndex);
          });
        }
      }
      
      gridElement.appendChild(descCard);
    });
    
    // Fade back in
    gridElement.classList.remove('fade-out');
  }, 400); 
}

function getWeeklyImages(item) {
  if (!item) return [];
  if (Array.isArray(item.images) && item.images.length > 0) {
    return item.images.filter(Boolean).slice(0, 4);
  }
  return item.img ? [item.img] : [];
}

function buildWeeklyImageGrid(images, title) {
  if (!images || images.length === 0) return null;
  const grid = document.createElement('div');
  grid.className = `weekly-image-grid count-${images.length}`;

  images.forEach((src, index) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'weekly-image-btn';
    btn.setAttribute('aria-label', `Enlarge image ${index + 1}${title ? ` for ${title}` : ''}`);

    const img = document.createElement('img');
    img.src = src;
    img.alt = title ? `${title} image ${index + 1}` : `Weekly highlight image ${index + 1}`;

    btn.appendChild(img);
    btn.addEventListener('click', (event) => {
      event.stopPropagation();
      if (window.openPhotoModal) {
        window.openPhotoModal(src);
      }
    });

    grid.appendChild(btn);
  });

  return grid;
}

function getWeeklyVideos(item) {
  if (!item) return [];
  if (Array.isArray(item.videos) && item.videos.length > 0) {
    return item.videos.filter(Boolean).slice(0, 4);
  }
  return [];
}

function getVideoEmbedCode(url) {
  // YouTube
  const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s]+)/);
  if (youtubeMatch) {
    return `<iframe src="https://www.youtube.com/embed/${youtubeMatch[1]}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  }

  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) {
    return `<iframe src="https://player.vimeo.com/video/${vimeoMatch[1]}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
  }

  // Twitter/X
  const twitterMatch = url.match(/(?:twitter\.com|x\.com)\/\w+\/status\/(\d+)/);
  if (twitterMatch) {
    // Use Twitter's blockquote embed which will be enhanced by the widget script
    const embedId = `twitter-embed-${twitterMatch[1]}`;
    setTimeout(() => {
      if (window.twttr && window.twttr.widgets) {
        window.twttr.widgets.load();
      }
    }, 100);
    return `<blockquote class="twitter-tweet" data-theme="dark"><a href="${url}"></a></blockquote>`;
  }

  // Direct video file (base64 or URL)
  if (url.startsWith('data:video/') || url.match(/\.(mp4|webm|ogg)$/i)) {
    return `<video controls><source src="${url}" /></video>`;
  }

  return null;
}

function buildWeeklyVideoGrid(videos) {
  if (!videos || videos.length === 0) return null;
  const grid = document.createElement('div');
  grid.className = `weekly-video-grid count-${videos.length}`;

  videos.forEach((src) => {
    const container = document.createElement('div');
    container.className = 'weekly-video-container';
    const embedCode = getVideoEmbedCode(src);
    if (embedCode) {
      container.innerHTML = embedCode;
    }
    grid.appendChild(container);
  });

  return grid;
}

// Modal functionality
function openCategoryModal(item, bgColor) {
  // Trigger Kurrently window
  if (window.triggerKurrently) {
    window.triggerKurrently();
  }

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
    modalTitle.style.color = '#000';
    modalCategory.style.color = '#000';
    modalWeek.style.color = '#000';
    modalIntro.style.color = '#000';
    
    // Style all content in modal body
    const modalBody = modal.querySelector('.category-modal-body');
    if (modalBody) {
      modalBody.style.color = '#000';
    }
  }
  
  // Populate modal content
  modalTitle.textContent = item.title;
  modalCategory.textContent = item.category;
  
  const dateDisplay = getDateDisplay(weeklyData[currentWeekIndex].startDate);
  modalWeek.textContent = dateDisplay;
  
  if (item.detailedContent) {
    const introHtml = item.detailedContent.intro || '';
    modalIntro.innerHTML = introHtml;

    const images = getWeeklyImages(item);
    const imageGrid = buildWeeklyImageGrid(images, item.title);
    if (imageGrid) {
      modalIntro.prepend(imageGrid);
    }

    const videos = getWeeklyVideos(item);
    const videoGrid = buildWeeklyVideoGrid(videos);
    if (videoGrid) {
      if (imageGrid) {
        imageGrid.after(videoGrid);
      } else {
        modalIntro.prepend(videoGrid);
      }
    }
    
    const highlightsRaw = item.detailedContent.highlights || [];
    const highlights = Array.isArray(highlightsRaw)
      ? highlightsRaw
      : String(highlightsRaw).split('\n').filter(Boolean);
    
    // Create highlights list - only show if not empty
    if (highlights.length > 0) {
      modalHighlights.innerHTML = '<h3 style="color: #000;">Key Highlights</h3><ul>' + 
        highlights.map(h => `<li>${h}</li>`).join('') + 
        '</ul>';
      modalHighlights.style.display = 'block';
    } else {
      modalHighlights.style.display = 'none';
    }
    
    // Show inspiration only if not empty
    const inspiration = item.detailedContent.inspiration || '';
    if (inspiration.trim()) {
      modalInspiration.innerHTML = `<h3 style="color: #000;">Inspiration</h3><p>${inspiration}</p>`;
      modalInspiration.style.display = 'block';
    } else {
      modalInspiration.style.display = 'none';
    }
    
    // Show tools only if not empty
    const toolsText = item.detailedContent.tools || '';
    if (toolsText.trim()) {
      modalTools.innerHTML = `<h3 style="color: #000;">Tools & Resources</h3><p>${toolsText}</p>`;
      modalTools.style.display = 'block';
    } else {
      modalTools.style.display = 'none';
    }
  }

  const modalTextNodes = modal.querySelectorAll('.category-modal-body p, .category-modal-body li');
  modalTextNodes.forEach(node => {
    node.style.color = '#000';
  });
  
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
  
  if (aboutWindow) {
    aboutWindow.style.display = 'block';
    aboutWindow.style.opacity = '1';
  }
  if (notesWindow) {
    notesWindow.style.display = 'block';
    notesWindow.style.opacity = '1';
  }
}

async function hashWeeklyPassword(password, salt) {
  const encoder = new TextEncoder();
  const data = encoder.encode(`${salt}:${password}`);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function updateWeeklyAdminButton() {
  const adminBtn = document.getElementById('weeklyAdminBtn');
  if (adminBtn) {
    adminBtn.textContent = isWeeklyAdminMode ? '🔓' : '🔒';
  }
}

function openWeeklyAdminModal() {
  const modal = document.getElementById('weekly-admin-modal');
  const input = document.getElementById('weeklyAdminPassword');
  const error = document.getElementById('weekly-admin-error');
  if (error) error.style.display = 'none';
  if (input) input.value = '';
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeWeeklyAdminModal() {
  const modal = document.getElementById('weekly-admin-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  // Hide label settings panel when closing
  const settingsPanel = document.getElementById('weekly-label-settings');
  if (settingsPanel) {
    settingsPanel.style.display = 'none';
  }
}

function openWeeklyEditor(weekIndex = currentWeekIndex, itemIndex = null) {
  const modal = document.getElementById('weekly-editor-modal');
  const weekSelect = document.getElementById('weeklyWeekSelect');
  const deleteBtn = document.getElementById('weeklyDeleteBtn');

  editingWeekIndex = weekIndex;
  editingItemIndex = itemIndex;

  populateWeekSelect();
  if (weekSelect) weekSelect.value = String(weekIndex);

  const item = itemIndex !== null ? weeklyData[weekIndex].items[itemIndex] : null;

  document.getElementById('weeklyCategory').value = item?.category || '';
  document.getElementById('weeklyTitle').value = item?.title || '';
  document.getElementById('weeklyDescription').value = item?.description || '';
  const existingImages = Array.isArray(item?.images)
    ? item.images
    : (item?.img ? [item.img] : []);
  document.getElementById('weeklyImage').value = existingImages.join('\n');
  document.getElementById('weeklyPhoto').value = '';
  const existingVideos = Array.isArray(item?.videos) ? item.videos : [];
  document.getElementById('weeklyVideo').value = existingVideos.join('\n');
  document.getElementById('weeklyVideoUpload').value = '';
  document.getElementById('weeklyIntro').value = item?.detailedContent?.intro || '';
  document.getElementById('weeklyHighlights').value = Array.isArray(item?.detailedContent?.highlights)
    ? item.detailedContent.highlights.join('\n')
    : (item?.detailedContent?.highlights || '');
  document.getElementById('weeklyInspiration').value = item?.detailedContent?.inspiration || '';
  document.getElementById('weeklyTools').value = item?.detailedContent?.tools || '';

  if (deleteBtn) {
    deleteBtn.style.display = itemIndex !== null ? 'inline-flex' : 'none';
  }

  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeWeeklyEditor() {
  const modal = document.getElementById('weekly-editor-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
  editingWeekIndex = null;
  editingItemIndex = null;
  
  // Auto-lock weekly admin mode when editor closes
  if (isWeeklyAdminMode) {
    isWeeklyAdminMode = false;
    updateWeeklyAdminButton();
    renderWeek(currentWeekIndex);
    
    // Hide label settings in admin modal
    const settingsPanel = document.getElementById('weekly-label-settings');
    if (settingsPanel) {
      settingsPanel.style.display = 'none';
    }
  }
}

function populateWeekSelect() {
  const weekSelect = document.getElementById('weeklyWeekSelect');
  if (!weekSelect) return;
  weekSelect.innerHTML = '';
  weeklyData.forEach((week, index) => {
    const option = document.createElement('option');
    option.value = String(index);
    option.textContent = getDateDisplay(week.startDate);
    weekSelect.appendChild(option);
  });
}

function addWeeklyWeek(dateString) {
  if (!dateString) return;
  weeklyData.push({
    startDate: new Date(dateString),
    items: []
  });
  weeklyData.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
  saveWeeklyOverrides();
  populateWeekSelect();
}

function saveWeeklyItem() {
  const weekIndex = parseInt(document.getElementById('weeklyWeekSelect').value, 10);
  
  // Sanitize all inputs to prevent XSS
  const category = sanitizeInput(document.getElementById('weeklyCategory').value.trim());
  const title = sanitizeInput(document.getElementById('weeklyTitle').value.trim());
  const description = sanitizeInput(document.getElementById('weeklyDescription').value.trim());
  const rawImages = document.getElementById('weeklyImage').value
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean);
  const urlImages = rawImages.slice(0, 4);

  // Validate image URLs
  const invalidUrl = urlImages.find(url => !isValidURL(url));
  if (invalidUrl) {
    alert('Invalid image URL');
    return;
  }

  const rawVideos = document.getElementById('weeklyVideo').value
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean);
  const urlVideos = rawVideos.slice(0, 4);

  // Validate video URLs
  const invalidVideoUrl = urlVideos.find(url => !isValidURL(url));
  if (invalidVideoUrl) {
    alert('Invalid video URL');
    return;
  }

  const photoInput = document.getElementById('weeklyPhoto');
  const videoInput = document.getElementById('weeklyVideoUpload');
  const intro = sanitizeHTML(document.getElementById('weeklyIntro').value.trim());
  const highlights = document.getElementById('weeklyHighlights').value
    .split('\n')
    .map(line => sanitizeHTML(line.trim()))
    .filter(Boolean);
  const inspiration = sanitizeHTML(document.getElementById('weeklyInspiration').value.trim());
  const tools = sanitizeHTML(document.getElementById('weeklyTools').value.trim());

  if (!weeklyData[weekIndex]) return;

  const uploadFiles = photoInput?.files ? Array.from(photoInput.files).slice(0, 4) : [];
  const videoFiles = videoInput?.files ? Array.from(videoInput.files).slice(0, 4) : [];

  const filePromises = [];

  if (uploadFiles.length > 0) {
    filePromises.push(Promise.all(uploadFiles.map(file => new Promise((resolve, reject) => {
      const validation = validateFileUpload(file);
      if (!validation.valid) {
        reject(validation.error);
        return;
      }
      const reader = new FileReader();
      reader.onload = function(e) {
        resolve(e.target.result);
      };
      reader.onerror = function() {
        reject('Failed to read file');
      };
      reader.readAsDataURL(file);
    }))));
  } else {
    filePromises.push(Promise.resolve([]));
  }

  if (videoFiles.length > 0) {
    filePromises.push(Promise.all(videoFiles.map(file => new Promise((resolve, reject) => {
      const validation = validateFileUpload(file);
      if (!validation.valid) {
        reject(validation.error);
        return;
      }
      const reader = new FileReader();
      reader.onload = function(e) {
        resolve(e.target.result);
      };
      reader.onerror = function() {
        reject('Failed to read file');
      };
      reader.readAsDataURL(file);
    }))));
  } else {
    filePromises.push(Promise.resolve([]));
  }

  Promise.all(filePromises)
    .then(([uploadedImages, uploadedVideos]) => {
      const images = [...urlImages, ...uploadedImages].slice(0, 4);
      const videos = [...urlVideos, ...uploadedVideos].slice(0, 4);
      saveItem(images, videos);
    })
    .catch(error => {
      alert(error);
    });

  function saveItem(images = [], videos = []) {
    const newItem = {
      category,
      title,
      description,
      img: images[0] || '',
      images,
      videos,
      detailedContent: {
        intro,
        highlights,
        inspiration,
        tools
      }
    };

    if (editingItemIndex !== null) {
      weeklyData[weekIndex].items[editingItemIndex] = newItem;
    } else {
      weeklyData[weekIndex].items.push(newItem);
    }

    saveWeeklyOverrides();
    currentWeekIndex = weekIndex;
    renderWeek(currentWeekIndex);
    closeWeeklyEditor();
  }
}

function deleteWeeklyItem() {
  if (editingItemIndex === null || editingWeekIndex === null) return;
  weeklyData[editingWeekIndex].items.splice(editingItemIndex, 1);
  saveWeeklyOverrides();
  renderWeek(currentWeekIndex);
  closeWeeklyEditor();
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
  loadWeeklyOverrides();
  currentWeekIndex = getCurrentWeekIndex();
  renderWeek(currentWeekIndex);
  updateWeeklyAdminButton();
  
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

  // Weekly admin button
  const weeklyAdminBtn = document.getElementById('weeklyAdminBtn');
  if (weeklyAdminBtn) {
    weeklyAdminBtn.addEventListener('click', () => {
      if (isWeeklyAdminMode) {
        openWeeklyEditor(currentWeekIndex, null);
      } else {
        openWeeklyAdminModal();
      }
    });
  }

  // Weekly admin password form
  const weeklyAdminForm = document.getElementById('weekly-admin-form');
  if (weeklyAdminForm) {
    weeklyAdminForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      
      // Check rate limiting
      if (isPasswordRateLimited('weekly_admin')) {
        alert('Too many failed attempts. Please wait 15 minutes before trying again.');
        return;
      }
      
      const input = document.getElementById('weeklyAdminPassword');
      const error = document.getElementById('weekly-admin-error');
      if (!input) return;
      
      const hash = await hashWeeklyPassword(input.value, WEEKLY_ADMIN_SALT);
      if (hash === WEEKLY_ADMIN_HASH) {
        isWeeklyAdminMode = true;
        updateWeeklyAdminButton();
        renderWeek(currentWeekIndex);
        
        // Show label settings panel
        const settingsPanel = document.getElementById('weekly-label-settings');
        if (settingsPanel) {
          settingsPanel.style.display = 'block';
        }
        
        resetPasswordAttempts('weekly_admin');
      } else {
        trackPasswordAttempt('weekly_admin');
        if (error) {
          error.style.display = 'block';
        }
      }
    });
  }

  // Weekly editor controls
  const saveBtn = document.getElementById('weeklySaveBtn');
  if (saveBtn) saveBtn.addEventListener('click', saveWeeklyItem);

  const deleteBtn = document.getElementById('weeklyDeleteBtn');
  if (deleteBtn) deleteBtn.addEventListener('click', deleteWeeklyItem);

  const addWeekBtn = document.getElementById('addWeekBtn');
  if (addWeekBtn) {
    addWeekBtn.addEventListener('click', () => {
      const dateInput = document.getElementById('weeklyWeekDate');
      if (!dateInput) return;
      addWeeklyWeek(dateInput.value);
      dateInput.value = '';
    });
  }

  // Close weekly admin modal on backdrop
  const weeklyAdminModal = document.getElementById('weekly-admin-modal');
  if (weeklyAdminModal) {
    weeklyAdminModal.addEventListener('click', (event) => {
      if (event.target === weeklyAdminModal) closeWeeklyAdminModal();
    });
  }

  // Close weekly editor modal on backdrop
  const weeklyEditorModal = document.getElementById('weekly-editor-modal');
  if (weeklyEditorModal) {
    weeklyEditorModal.addEventListener('click', (event) => {
      if (event.target === weeklyEditorModal) closeWeeklyEditor();
    });
  }
  
  // Load custom labels on page load
  loadWeeklyLabels();
});

// =========================================
// CUSTOM LABEL MANAGEMENT
// =========================================

const DEFAULT_WEEKLY_LABELS = {
  intro: 'Intro',
  highlights: 'Key Highlights',
  inspiration: 'Inspiration',
  tools: 'Tools & Resources'
};

function getWeeklyLabels() {
  const stored = localStorage.getItem('weeklyCustomLabels');
  return stored ? JSON.parse(stored) : { ...DEFAULT_WEEKLY_LABELS };
}

function saveWeeklyLabels() {
  const labels = {
    intro: document.getElementById('labelIntro').value.trim() || DEFAULT_WEEKLY_LABELS.intro,
    highlights: document.getElementById('labelHighlights').value.trim() || DEFAULT_WEEKLY_LABELS.highlights,
    inspiration: document.getElementById('labelInspiration').value.trim() || DEFAULT_WEEKLY_LABELS.inspiration,
    tools: document.getElementById('labelTools').value.trim() || DEFAULT_WEEKLY_LABELS.tools
  };
  
  localStorage.setItem('weeklyCustomLabels', JSON.stringify(labels));
  applyWeeklyLabels(labels);
  alert('Labels saved successfully!');
}

function resetWeeklyLabels() {
  localStorage.removeItem('weeklyCustomLabels');
  const labels = { ...DEFAULT_WEEKLY_LABELS };
  
  document.getElementById('labelIntro').value = labels.intro;
  document.getElementById('labelHighlights').value = labels.highlights;
  document.getElementById('labelInspiration').value = labels.inspiration;
  document.getElementById('labelTools').value = labels.tools;
  
  applyWeeklyLabels(labels);
  alert('Labels reset to defaults!');
}

function loadWeeklyLabels() {
  const labels = getWeeklyLabels();
  
  // Set input values
  const labelIntro = document.getElementById('labelIntro');
  const labelHighlights = document.getElementById('labelHighlights');
  const labelInspiration = document.getElementById('labelInspiration');
  const labelTools = document.getElementById('labelTools');
  
  if (labelIntro) labelIntro.value = labels.intro;
  if (labelHighlights) labelHighlights.value = labels.highlights;
  if (labelInspiration) labelInspiration.value = labels.inspiration;
  if (labelTools) labelTools.value = labels.tools;
  
  applyWeeklyLabels(labels);
}

function applyWeeklyLabels(labels) {
  // Update editor labels
  const editorLabels = {
    weeklyIntro: labels.intro,
    weeklyHighlights: labels.highlights,
    weeklyInspiration: labels.inspiration,
    weeklyTools: labels.tools
  };
  
  Object.entries(editorLabels).forEach(([id, text]) => {
    const textarea = document.getElementById(id);
    if (textarea) {
      const label = textarea.closest('.form-group')?.querySelector('label');
      if (label) {
        label.childNodes[0].nodeValue = text + ' ';
      }
    }
  });
}
