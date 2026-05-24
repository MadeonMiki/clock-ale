function updateCountdown() {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0); 

    const diff = midnight - now;

    if (diff <= 0) {
        clearInterval(timerInterval);
        document.getElementById('countdown').classList.add('hidden');
        document.getElementById('title').classList.add('hidden');
        
        const messageEl = document.getElementById('message');
        messageEl.classList.remove('hidden');
        return;
    }

    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}
// --- LÓGICA DE MÚSICA DE FONDO CON REINTENTOS ---
// --- ELEMENTOS DEL DOM ---
const popup = document.getElementById('welcome-popup');
const enterBtn = document.getElementById('enter-btn');
const music = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-btn');
const musicIcon = document.getElementById('music-icon');
const glowBg = document.getElementById('glow-bg');

// Iconos SVG de control
const playIconSVG = `<path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />`;
const pauseIconSVG = `<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />`;

// Volumen inicial moderado
music.volume = 0.4;

// --- FUNCIÓN PARA INICIAR LA EXPERIENCIA ---
function initializeApp() {
    // 1. Desvanecer el popup con una transición suave
    popup.classList.add('opacity-0', 'pointer-events-none');
    
    // 2. Reproducir la música de forma segura (el navegador lo aprobará por el clic)
    music.play()
        .then(() => {
            musicIcon.innerHTML = pauseIconSVG;
            musicBtn.classList.add('text-emerald-400', 'border-emerald-500');
        })
        .catch(err => console.log("Error al reproducir audio:", err));

    // 3. Activar el rastreador del ratón solo DESPUÉS de entrar
    window.addEventListener('mousemove', handleMouseMove);
}

// Control manual del botón flotante de Play/Pause
function toggleMusic(e) {
    e.stopPropagation(); // Evita conflictos de eventos
    if (music.paused) {
        music.play();
        musicIcon.innerHTML = pauseIconSVG;
        musicBtn.classList.add('text-emerald-400', 'border-emerald-500');
    } else {
        music.pause();
        musicIcon.innerHTML = playIconSVG;
        musicBtn.classList.remove('text-emerald-400', 'border-emerald-500');
    }
}

// Manejador del movimiento del ratón para el brillo de fondo
function handleMouseMove(e) {
    glowBg.style.left = `${e.clientX}px`;
    glowBg.style.top = `${e.clientY}px`;
}

// --- ESCUCHADORES DE EVENTOS ---

// Escuchar el clic en el botón del Popup
enterBtn.addEventListener('click', initializeApp);

// Escuchar el botón flotante de música
musicBtn.addEventListener('click', toggleMusic);
updateCountdown();
const timerInterval = setInterval(updateCountdown, 1000);