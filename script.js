// Menaxhimi i këngëve (Track Management)
const songsData = {
    "butrint-imeri-cigaren": {
        title: "BUTRINT IMERI - CIGAREN",
        url: "https://soundhelix.com"
    },
    "don-xhoni-katile": {
        title: "DON XHONI - KATILE",
        url: "https://soundhelix.com"
    },
    "elvana-gjata-x-gimi-o-x-bardhi-ex": {
        title: "ELVANA GJATA X GIMI O X BARDHI - EX",
        url: "https://soundhelix.com"
    },
    "noizy-x-loredana-heart-attack": {
        title: "NOIZY X LOREDANA - HEART ATTACK",
        url: "https://soundhelix.com"
    }
};

const keys = Object.keys(songsData);
const currentAudio = new Audio();
let isPlaying = false;
let currentTrackId = null;

// Elementet DOM
const playerBar = document.getElementById('playerBar');
const currentTrackTitle = document.getElementById('currentTrackTitle');
const btnMainPlay = document.getElementById('btn-main-play');
const btnForward = document.getElementById('btn-forward');
const btnBackward = document.getElementById('btn-backward');
const volumeSlider = document.getElementById('volumeSlider');
const musicWave = document.getElementById('musicWave');
const trackCards = document.querySelectorAll('.track-card');

function handlePlayPause(trackId) {
    const mainPlayIcon = btnMainPlay.querySelector('i');
    const cardIcon = document.getElementById(`icon-${trackId}`);

    if (currentTrackId === trackId) {
        if (isPlaying) {
            currentAudio.pause();
            isPlaying = false;
            mainPlayIcon.className = "fa-solid fa-circle-play";
            if (cardIcon) cardIcon.className = "fa-solid fa-play play-icon";
            musicWave.classList.remove('animated');
        } else {
            currentAudio.play();
            isPlaying = true;
            mainPlayIcon.className = "fa-solid fa-circle-pause";
            if (cardIcon) cardIcon.className = "fa-solid fa-pause play-icon";
            musicWave.classList.add('animated');
        }
    } else {
        if (currentTrackId) {
            const oldCardIcon = document.getElementById(`icon-${currentTrackId}`);
            if (oldCardIcon) oldCardIcon.className = "fa-solid fa-play play-icon";
        }

        currentTrackId = trackId;
        currentAudio.src = songsData[trackId].url;
        currentTrackTitle.innerText = songsData[trackId].title;
        playerBar.style.display = 'flex';

        currentAudio.play().then(() => {
            isPlaying = true;
            mainPlayIcon.className = "fa-solid fa-circle-pause";
            if (cardIcon) cardIcon.className = "fa-solid fa-pause play-icon";
            musicWave.classList.add('animated');
        }).catch(err => console.error("Gabim audio:", err));
    }
}

// Kalimi te kënga tjetër (Next)
function nextTrack() {
    if (!currentTrackId) return;
    let currentIndex = keys.indexOf(currentTrackId);
    let nextIndex = (currentIndex + 1) % keys.length;
    handlePlayPause(keys[nextIndex]);
}

// Kalimi te kënga e mëparshme (Previous)
function prevTrack() {
    if (!currentTrackId) return;
    let currentIndex = keys.indexOf(currentTrackId);
    let prevIndex = (currentIndex - 1 + keys.length) % keys.length;
    handlePlayPause(keys[prevIndex]);
}

// Event Listeners
trackCards.forEach(card => {
    card.addEventListener('click', () => {
        handlePlayPause(card.getAttribute('data-id'));
    });
});

btnMainPlay.addEventListener('click', () => {
    if (currentTrackId) handlePlayPause(currentTrackId);
});

btnForward.addEventListener('click', nextTrack);
btnBackward.addEventListener('click', prevTrack);
volumeSlider.addEventListener('input', (e) => currentAudio.volume = e.target.value);

currentAudio.addEventListener('ended', () => {
    isPlaying = false;
    btnMainPlay.querySelector('i').className = "fa-solid fa-circle-play";
    musicWave.classList.remove('animated');
    const cardIcon = document.getElementById(`icon-${currentTrackId}`);
    if (cardIcon) cardIcon.className = "fa-solid fa-play play-icon";
    nextTrack(); // Luaj automatikisht këngën pasardhëse
});


