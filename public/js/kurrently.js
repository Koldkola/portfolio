// Kurrently Window Typing Animation
(function() {
  let isLooping = false;
  let kurrentlyWindow;
  let contentDiv;

  // Expose global trigger function
  window.triggerKurrently = function() {
    if (kurrentlyWindow) {
      kurrentlyWindow.style.opacity = '1';
      kurrentlyWindow.style.display = 'block';
      kurrentlyWindow.style.transition = 'opacity 0s';
    }
  };

  // Terminal typing animation for Kurrently window
  function startKurrentlyAnimation() {
    contentDiv = document.getElementById('kurrentlyContent');
    kurrentlyWindow = document.getElementById('kurrentlyWindow');
    if (!contentDiv || !kurrentlyWindow) return;

    // Content arrays for randomization
    const watchingItems = [
      'Paradise',
      'industry',
      'JJK',
      'One Piece',
      'Frieren',
      "Hell's paradise",
      'The pitt',
      'The Boys',
      'You',
      'Dune',
      'Shameless',
      'Knives Out',
      'Entourage',
      'Breaking Bad',
      'The sopranos',
      'Dark',
      'AfroSenju'
    ];

    const listeningItems = [
      'The sundays',
      'Aya Nakamura',
      'Dom Jr',
      'Theodora',
      'Grimm Grimm',
      'Salvia Path',
      'Lil Durk',
      'The Pastels',
      'Playboi Carti',
      'Gvlli3',
      'Jhene aiko',
      'Bawo',
      'Seyi Vibez',
      'Asake',
      'The Cavemen',
      'ODUMODUBLVCK',
      'Tame impala',
      'The Shirelles',
      'PinkPanthress',
      'Charli xcx',
      'Young Thug',
      'Future',
      'Frank Ocean',
      'Kendrick Lamar',
      'Lucki',
      'King Krule',
      'Ravyn Lenae',
      'Panchiko',
      'Sampha',
      'Kid Cudi',
      'Ethel Cain',
      'EKKSTACY',
      'The Drums',
      'Title Fight',
      'The Cranberries',
      'Alex G',
      'Amy Winehouse',
      'Okay Kaya',
      'Current Joys'
    ];

    const playingItems = [
      'Overwatch',
      'Ghost of Tsushima',
      'Marvel rivals',
      'It takes Two',
      'Roblox',
      'Wizard 101',
      'Tomb Raider',
      'SmashBros'
    ];

    const readingItems = [
      'One piece',
      'Kingdom',
      'Gachiakuta',
      'Beserk',
      'Tomie',
      'Vagabond',
      'No longer Human',
      'Flowers of evil',
      'Homonculus',
      'Gyo',
      'Aku no hana',
      'Chainsaw Man',
      'Fire Punch',
      'Leviathan',
      'Emanon',
      'i am hero',
      'Vinland Saga'
    ];

    // Helper function to get random item from array
    function getRandomItem(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    }

    // Get random items for this load
    const watching = getRandomItem(watchingItems);
    const listening = getRandomItem(listeningItems);
    const playing = getRandomItem(playingItems);
    const reading = getRandomItem(readingItems);

    const lines = [
      `watching: ${watching}`,
      `listening to: ${listening}`,
      `playing: ${playing}`,
      `reading: ${reading}`
    ];

    const typingSpeed = 50; // ms per character
    const delayBetweenLines = 400; // ms between lines
    const pauseAtEnd = 2000; // ms pause before restart

    async function typeLines() {
      contentDiv.textContent = '';
      
      for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
        const line = lines[lineIndex];
        
        // Type each character
        for (let charIndex = 0; charIndex < line.length; charIndex++) {
          contentDiv.textContent += line[charIndex];
          await new Promise(resolve => setTimeout(resolve, typingSpeed));
        }
        
        // Add newline if not the last line
        if (lineIndex < lines.length - 1) {
          contentDiv.textContent += '\n';
          await new Promise(resolve => setTimeout(resolve, delayBetweenLines));
        }
      }
      
      // Wait then fade out
      await new Promise(resolve => setTimeout(resolve, pauseAtEnd));
      kurrentlyWindow.style.transition = 'opacity 1s ease-out';
      kurrentlyWindow.style.opacity = '0';
    }

    // Repeat every 20 seconds
    async function startKurrentlyLoop() {
      while (true) {
        kurrentlyWindow.style.opacity = '1';
        kurrentlyWindow.style.transition = 'opacity 0s';
        await typeLines();
        await new Promise(resolve => setTimeout(resolve, 20000));
      }
    }

    startKurrentlyLoop();
  }

  // Start animation when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startKurrentlyAnimation);
  } else {
    startKurrentlyAnimation();
  }
})();
