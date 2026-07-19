// Ruajmë listën e këngëve me linket e tyre audio (stream) nga burimi yt
const tracks = {
    "butrint-imeri-cigaren": {
        title: "BUTRINT IMERI - CIGAREN",
        url: "https://unsplash.com" // Link i përkohshëm audio për test
    },
    "don-xhoni-katile": {
        title: "DON XHONI - KATILE",
        url: "https://unsplash.com"
    },
    "elvana-gjata-x-gimi-o-x-bardhi-ex": {
        title: "ELVANA GJATA X GIMI O X BARDHI - EX",
        url: "https://unsplash.com"
    },
    "noizy-x-loredana-heart-attack": {
        title: "NOIZY X LOREDANA - HEART ATTACK",
        url: "https://unsplash.com"
    }
};

let currentAudio = new Audio();
let isPlaying = false;
let currentTrackId = null;

// Krijojmë strukturën e Audio Player-it në fund të faqes në mënyrë dinamike
const playerHTML = `
    <div id="audio-player" class="player-container" style="display: none;">
        <div class="player-info">
            <span id="player-title">Asnjë këngë</span>
        </div>
        <div class="player-controls">
            <button id="btn-prev"><i class="fa-solid fa-backward-step"></i></button>
            <button id="btn-play-trigger"><i class="fa-solid fa-circle-play"></i></button>
            <button id="btn-next"><i class="fa-solid fa-forward-step"></i></button>
        </div>
        <div class="player-volume">
            <i class="fa-solid fa-volume-high"></i>
            <input type="range" id="volume-slider" min="0" max="1" step="0.1" value="1">
        </div>
    </div>
`;
document.body.insertAdjacentHTML('beforeend', playerHTML);

// Përzgjedhim elementet nga DOM
const audioPlayer = document.getElementById('audio-player');
const playerTitle = document.getElementById('player-title');
const btnPlayTrigger = document.getElementById('btn-play-trigger');
const volumeSlider = document.getElementById('volume-slider');
const trackCards = document.querySelectorAll('.track-card');

// Funksioni për të luajtur ose ndaluar muzikën
function togglePlay(trackId) {
    const playIcon = btnPlayTrigger.querySelector('i');
    
    if (currentTrackId === trackId) {
        if (isPlaying) {
            currentAudio.pause();
            playIcon.className = "fa-solid fa-circle-play";
            isPlaying = false;
        } else {
            currentAudio.play();
            playIcon.className = "fa-solid fa-circle-pause";
            isPlaying = true;
        }
    } else {
        // Luajmë një këngë të re
        currentTrackId = trackId;
        currentAudio.src = tracks[trackId].url;
        playerTitle.innerText = tracks[trackId].title;
        audioPlayer.style.display = "flex";
        
        currentAudio.play().then(() => {
            playIcon.className = "fa-solid fa-circle-pause";
            isPlaying = true;
        }).catch(err => console.log("Gabim gjatë ngarkimit audio:", err));
    }
}

// Lidhim ngjarjen e klikimit (Click) për çdo kartë kënge
trackCards.forEach(card => {
    card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        togglePlay(id);
    });
});

// Kontrollet e player-it të poshtëm
btnPlayTrigger.addEventListener('click', () => {
    if (currentTrackId) togglePlay(currentTrackId);
});

volumeSlider.addEventListener('input', (e) => {
    currentAudio.volume = e.target.value;
});
