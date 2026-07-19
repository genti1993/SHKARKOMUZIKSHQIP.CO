// Të dhënat origjinale të këngëve me fotot photo/track
const songsData = {
    "butrint-imeri-cigaren": {
        title: "BUTRINT IMERI - CIGAREN",
        downloads: "452,934 Shkarkime",
        image: "https://shkarko.co",
        url: "https://soundhelix.com"
    },
    "don-xhoni-katile": {
        title: "DON XHONI - KATILE",
        downloads: "347,132 Shkarkime",
        image: "https://shkarko.co",
        url: "https://soundhelix.com"
    },
    "elvana-gjata-x-gimi-o-x-bardhi-ex": {
        title: "ELVANA GJATA X GIMI O X BARDHI - EX",
        downloads: "229,206 Shkarkime",
        image: "https://shkarko.co",
        url: "https://soundhelix.com"
    },
    "noizy-x-loredana-heart-attack": {
        title: "NOIZY X LOREDANA - HEART ATTACK",
        downloads: "189,450 Shkarkime",
        image: "https://shkarko.co",
        url: "https://soundhelix.com"
    }
};

const keys = Object.keys(songsData);
const currentAudio = new Audio();
let isPlaying = false;
let currentTrackId = null;

const tracksContainer = document.getElementById('tracksContainer');
const playerBar = document.getElementById('playerBar');
const currentTrackTitle = document.getElementById('currentTrackTitle');
const btnMainPlay = document.getElementById('btn-main-play');
const btnForward = document.getElementById('btn-forward');
const btnBackward = document.getElementById('btn-backward');
const volumeSlider = document.getElementById('volumeSlider');
const musicWave = document.getElementById('musicWave');

function renderTracks() {
    if (!tracksContainer) return;
    tracksContainer.innerHTML = "";
    
    keys.forEach(id => {
        const track = songsData[id];
        const cardHTML = `
            <div class="track-card" data-id="${id}">
                <div class="thumb-container">
                    <img src="${track.image}" alt="${track.title}" class="poster" />
                    <div class="hover-overlay">
                        <i id="icon-${id}" class="fa-solid fa-play play-icon"></i>
                    </div>
                </div>
                <div class="track-details">
                    <h3 class="track-title">${track.title}</h3>
                    <p class="track-downloads"><i class="fa-solid fa-download"></i> ${track.downloads}</p>
                </div>
            </div>
        `;
        tracksContainer.insertAdjacentHTML('beforeend', cardHTML);
    });

    document.querySelectorAll('.track-card').forEach(card => {
        card.addEventListener('click', () => {
            handlePlayPause(card.getAttribute('data-id'));
        });
    });
}

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
        }).catch(err => console.error(err));
    }
}

function nextTrack() {
    if (!currentTrackId) return;
    let currentIndex = keys.indexOf(currentTrackId);
    handlePlayPause(keys[(currentIndex + 1) % keys.length]);
}

function prevTrack() {
    if (!currentTrackId) return;
    let currentIndex = keys.indexOf(currentTrackId);
    handlePlayPause(keys[(currentIndex - 1 + keys.length) % keys.length]);
}

btnMainPlay.addEventListener('click', () => currentTrackId && handlePlayPause(currentTrackId));
btnForward.addEventListener('click', nextTrack);
btnBackward.addEventListener('click', prevTrack);
volumeSlider.addEventListener('input', (e) => currentAudio.volume = e.target.value);
currentAudio.addEventListener('ended', nextTrack);

renderTracks();



