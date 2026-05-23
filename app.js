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

updateCountdown();
const timerInterval = setInterval(updateCountdown, 1000);