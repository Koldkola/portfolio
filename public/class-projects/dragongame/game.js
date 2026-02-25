document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = 800;
    canvas.height = 600;

    // Images
    const dragonImage = new Image();
    dragonImage.src = 'https://obi2.kean.edu/~ykumar@kean.edu/dragon.jpg';
    
    const itemImage = new Image();
    itemImage.src = 'https://obi2.kean.edu/~ykumar@kean.edu/goat.png';

    const obstacleImage = new Image();
    obstacleImage.src = 'https://obi2.kean.edu/~ykumar@kean.edu/obstacle.jpg';

    // Game state
    let dragon = {
        x: 100,
        y: 300,
        width: 80,
        height: 60,
        speed: 5
    };

    let items = [];
    let obstacles = [];
    let score = 0;
    let gameOver = false;
    let particles = [];

    function createParticles(x, y, baseColor){
        const amount = 18;
        for (let i=0;i<amount;i++){
            const angle = Math.random()*Math.PI*2;
            const speed = 1 + Math.random()*3;
            particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle)*speed,
                vy: Math.sin(angle)*speed - 1,
                life: 40 + Math.floor(Math.random()*30),
                size: 3 + Math.random()*6,
                color: baseColor || randomColor()
            });
        }
    }

    // HUD
    const scoreEl = document.getElementById('score');

    // Audio setup using WebAudio for SFX
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioCtx = AudioContext ? new AudioContext() : null;

    // Background music element (keeps it simple)
    const bgMusic = document.getElementById('bgMusic');

    // Controls
    const muteBtn = document.getElementById('muteBtn');
    const musicVol = document.getElementById('musicVol');
    const sfxVol = document.getElementById('sfxVol');

    let muted = false;

    // Preload simple AudioBuffers for SFX
    async function loadSound(url) {
        if (!audioCtx) return null;
        try {
            const resp = await fetch(url);
            const arr = await resp.arrayBuffer();
            return await audioCtx.decodeAudioData(arr);
        } catch (e) {
            console.warn('Failed to load sound', url, e);
            return null;
        }
    }

    // Use royalty-free small SFX from pixabay
    const sfxFiles = {
        flap: 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_9b2c8b34b8.mp3?filename=soft-flap-6047.mp3',
        collect: 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_8f3b9f0c3c.mp3?filename=small-win-6033.mp3',
        hit: 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_a3e7c9b2f0.mp3?filename=impact-6049.mp3'
    };

    const sfxBuffers = {};

    // Load buffers in background
    (async () => {
        if (audioCtx) {
            sfxBuffers.flap = await loadSound(sfxFiles.flap);
            sfxBuffers.collect = await loadSound(sfxFiles.collect);
            sfxBuffers.hit = await loadSound(sfxFiles.hit);
        }
    })();

    function playBuffer(buffer, volume=1) {
        if (muted) return;
        if (!audioCtx || !buffer) return;
        const src = audioCtx.createBufferSource();
        src.buffer = buffer;
        const gain = audioCtx.createGain();
        gain.gain.value = volume * parseFloat(sfxVol.value);
        src.connect(gain).connect(audioCtx.destination);
        src.start(0);
    }

    // Small helper to play short HTMLAudio (for music control) with volume
    function updateMusicVolume() {
        bgMusic.volume = muted ? 0 : parseFloat(musicVol.value);
    }

    musicVol.addEventListener('input', () => updateMusicVolume());
    sfxVol.addEventListener('input', () => {});

    muteBtn.addEventListener('click', () => {
        muted = !muted;
        muteBtn.textContent = muted ? 'Sound: Off' : 'Sound: On';
        muteBtn.setAttribute('aria-pressed', muted ? 'true' : 'false');
        updateMusicVolume();
    });

    // Ensure music only starts after user interaction (browser policy)
    function resumeAudioOnInteraction() {
        function resume() {
            if (audioCtx && audioCtx.state === 'suspended') {
                audioCtx.resume();
            }
            if (bgMusic.paused && !muted) {
                const p = bgMusic.play();
                if (p && p.catch) p.catch(()=>{});
            }
            window.removeEventListener('keydown', resume);
            window.removeEventListener('click', resume);
            window.removeEventListener('touchstart', resume);
        }
        window.addEventListener('keydown', resume);
        window.addEventListener('click', resume);
        window.addEventListener('touchstart', resume);
    }
    resumeAudioOnInteraction();

    // Spawn timings
    let lastItemSpawn = 0;
    let lastObstacleSpawn = 0;
    const itemInterval = 2000; // ms
    const obstacleInterval = 3000; // ms

    function spawnItem() {
        items.push({
            x: canvas.width + 30,
            y: Math.random() * (canvas.height - 40) + 20,
            width: 40,
            height: 40,
            speed: 4 + Math.random() * 2
            , color: randomColor()
        });
    }

    function spawnObstacle() {
        obstacles.push({
            x: canvas.width + 30,
            y: Math.random() * (canvas.height - 60) + 20,
            width: 50,
            height: 40,
            speed: 4 + Math.random() * 3
            , color: randomColor(true)
        });
    }

    function randomColor(isObstacle){
        // bright palette for items, deeper for obstacles
        if (!isObstacle) {
            const palette = ['#ffde59','#ffd36b','#6ee7b7','#7bdff6','#ff8fa3','#c3a7ff'];
            return palette[Math.floor(Math.random()*palette.length)];
        } else {
            const palette = ['#ff6b6b','#ff9f1c','#ff7aa2','#a84dff','#5cc8ff'];
            return palette[Math.floor(Math.random()*palette.length)];
        }
    }

    // Input
    let keys = {};
    document.addEventListener('keydown', (e) => {
        keys[e.key] = true;
        // play flap sound on up/down for feedback
        if ((e.key === 'ArrowUp' || e.key === 'ArrowDown') && sfxBuffers.flap) {
            playBuffer(sfxBuffers.flap, 0.6);
        }
    });
    document.addEventListener('keyup', (e) => {
        keys[e.key] = false;
    });

    function rectsOverlap(a, b) {
        return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
    }

    function update(delta) {
        if (gameOver) return;

        // Move dragon
        if (keys['ArrowUp'] && dragon.y > 0) {
            dragon.y -= dragon.speed;
        }
        if (keys['ArrowDown'] && dragon.y < canvas.height - dragon.height) {
            dragon.y += dragon.speed;
        }

        // Spawn
        const now = Date.now();
        if (now - lastItemSpawn > itemInterval) {
            spawnItem();
            lastItemSpawn = now;
        }
        if (now - lastObstacleSpawn > obstacleInterval) {
            spawnObstacle();
            lastObstacleSpawn = now;
        }

        // Move items and check collisions
        for (let i = items.length - 1; i >= 0; i--) {
            const item = items[i];
            item.x -= item.speed;
            if (item.x + item.width < 0) {
                items.splice(i, 1);
                continue;
            }
            if (rectsOverlap(dragon, item)) {
                score += 10;
                playBuffer(sfxBuffers.collect, 1);
                // spawn colorful particles
                createParticles(item.x + item.width/2, item.y + item.height/2, item.color);
                items.splice(i, 1);
                updateScore();
            }
        }

        // Move obstacles and check collisions
        for (let i = obstacles.length - 1; i >= 0; i--) {
            const ob = obstacles[i];
            ob.x -= ob.speed;
            if (ob.x + ob.width < 0) {
                obstacles.splice(i, 1);
                continue;
            }
            if (rectsOverlap(dragon, ob)) {
                playBuffer(sfxBuffers.hit, 1);
                gameOver = true;
                setTimeout(()=>{
                    alert('Game Over! Final Score: ' + score);
                    document.location.reload();
                }, 50);
            }
        }

        draw();
    }

    function draw() {
        ctx.clearRect(0,0,canvas.width, canvas.height);

        // simple ground and clouds for look
        // draw clouds
        ctx.fillStyle = 'rgba(255,255,255,0.6)';
        for (let i=0;i<5;i++) {
            const cx = (i*200 + (Date.now()/50 % 200));
            ctx.beginPath();
            ctx.ellipse(cx % canvas.width, 80 + (i%2)*20, 60, 20, 0, 0, Math.PI*2);
            ctx.fill();
        }

        // draw dragon
        if (dragonImage.complete) {
            ctx.drawImage(dragonImage, dragon.x, dragon.y, dragon.width, dragon.height);
        } else {
            ctx.fillStyle = 'red';
            ctx.fillRect(dragon.x, dragon.y, dragon.width, dragon.height);
        }

        // draw items
        items.forEach(item => {
            if (itemImage.complete) {
                // tinting images is expensive; draw a colored circle behind to add color
                ctx.beginPath();
                ctx.fillStyle = item.color || '#ffd36b';
                ctx.ellipse(item.x + item.width/2, item.y + item.height/2, item.width*0.6, item.height*0.6, 0, 0, Math.PI*2);
                ctx.fill();
                ctx.drawImage(itemImage, item.x, item.y, item.width, item.height);
            } else { ctx.fillStyle = item.color || 'yellow'; ctx.fillRect(item.x, item.y, item.width, item.height); }
        });

        // draw obstacles
        obstacles.forEach(ob => {
            if (obstacleImage.complete) {
                // draw colored rectangle with image overlay
                ctx.fillStyle = ob.color || '#ff6b6b';
                ctx.fillRect(ob.x, ob.y, ob.width, ob.height);
                ctx.globalAlpha = 0.9;
                ctx.drawImage(obstacleImage, ob.x, ob.y, ob.width, ob.height);
                ctx.globalAlpha = 1;
            } else { ctx.fillStyle = ob.color || 'brown'; ctx.fillRect(ob.x, ob.y, ob.width, ob.height); }
        });

        // draw particles
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.15; // gravity
            p.life -= 1;
            ctx.globalAlpha = Math.max(0, p.life/60);
            ctx.fillStyle = p.color;
            ctx.fillRect(p.x, p.y, p.size, p.size);
            ctx.globalAlpha = 1;
            if (p.life <= 0) particles.splice(i,1);
        }

        // HUD handled in DOM
    }

    function updateScore(){
        scoreEl.textContent = 'Score: ' + score;
    }

    // Game loop using requestAnimationFrame
    let lastTime = performance.now();
    function loop(ts) {
        const delta = ts - lastTime;
        lastTime = ts;
        update(delta);
        if (!gameOver) requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);

    // Initialize music volume
    updateMusicVolume();

});