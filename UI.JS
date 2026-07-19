// Motori i kërkimit UI në kohë reale
const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const cards = document.querySelectorAll('.track-card');
        
        cards.forEach(card => {
            const title = card.querySelector('.track-title').innerText.toLowerCase();
            if (title.includes(query)) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.4s ease';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Menaxhimi i Tabeve Filtruese UI
const tabButtons = document.querySelectorAll('#tabMenu .tab');
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const category = button.getAttribute('data-category');
        showNotification(`U hap kategoria: ${button.innerText}`);
        
        const cards = document.querySelectorAll('.track-card');
        cards.forEach(card => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Menaxhimi i Menusë Anësore UI (Sidebar Navigation)
const navItems = document.querySelectorAll('.nav-item');
const sectionTitle = document.getElementById('sectionTitle');
const tracksContainer = document.getElementById('tracksContainer');

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
        
        const target = item.getAttribute('data-target');
        if (target === 'home') {
            sectionTitle.innerText = "Top Hitet - Më të Shkarkuara";
            renderTracks(); 
        } else if (target === 'favorites') {
            sectionTitle.innerText = "Këngët e Preferuara ❤️";
            tracksContainer.innerHTML = '<p class="empty-msg">Nuk keni asnjë këngë të preferuar ende.</p>';
        } else if (target === 'info') {
            sectionTitle.innerText = "Rreth Platformës";
            tracksContainer.innerHTML = '<p class="empty-msg">Platforma zyrtare e muzikës shqip genti1993 v2.0.</p>';
        }
    });
});

// Funksion UI për njoftime dinamike (Toast Notifications)
function showNotification(message) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast-alert';
    toast.innerHTML = `<i class="fa-solid fa-circle-info"></i> ${message}`;
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.4s ease forwards';
        setTimeout(() => toast.remove(), 400);
    }, 2500);
}

// Ndryshimi dinamik i ikonës së volumit UI
const volSlider = document.getElementById('volumeSlider');
const volIcon = document.getElementById('volumeIcon');
if (volSlider && volIcon) {
    volSlider.addEventListener('input', (e) => {
        const val = e.target.value;
        if (val == 0) {
            volIcon.className = "fa-solid fa-volume-xmark";
        } else if (val < 0.5) {
            volIcon.className = "fa-solid fa-volume-low";
        } else {
            volIcon.className = "fa-solid fa-volume-high";
        }
    });
}
