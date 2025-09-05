// Agency Theme JavaScript

(function($) {
    "use strict"; // Start of use strict

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    });

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function(){ 
            $('.navbar-toggle:visible').click();
    });

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    })

})(jQuery); // End of use strict

// JavaScript para el slider de la galería
class GallerySlider {
    constructor() {
        this.track = document.getElementById('galleryTrack');
        this.cards = document.querySelectorAll('.treatment-card');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.dotsContainer = document.getElementById('dotsContainer');
        
        this.currentIndex = 0;
        this.cardsToShow = this.getCardsToShow();
        this.maxIndex = Math.max(0, this.cards.length - this.cardsToShow);
        
        this.init();
        this.setupEventListeners();
    }

    getCardsToShow() {
        if (window.innerWidth <= 480) return 1;
        if (window.innerWidth <= 768) return 2;
        return 3;
    }

    init() {
        this.createDots();
        this.updateSlider();
        this.updateButtons();
    }

    createDots() {
        this.dotsContainer.innerHTML = '';
        const totalDots = this.maxIndex + 1;
        
        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('span');
            dot.className = 'dot';
            dot.addEventListener('click', () => this.goToSlide(i));
            this.dotsContainer.appendChild(dot);
        }
    }

    updateSlider() {
        const cardWidth = 100 / this.cardsToShow;
        const translateX = -(this.currentIndex * cardWidth);
        this.track.style.transform = `translateX(${translateX}%)`;
        
        this.updateDots();
    }

    updateDots() {
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }

    updateButtons() {
        this.prevBtn.style.opacity = this.currentIndex === 0 ? '0.5' : '1';
        this.nextBtn.style.opacity = this.currentIndex >= this.maxIndex ? '0.5' : '1';
    }

    goToSlide(index) {
        this.currentIndex = Math.max(0, Math.min(index, this.maxIndex));
        this.updateSlider();
        this.updateButtons();
    }

    nextSlide() {
        if (this.currentIndex < this.maxIndex) {
            this.currentIndex++;
            this.updateSlider();
            this.updateButtons();
        }
    }

    prevSlide() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateSlider();
            this.updateButtons();
        }
    }

    setupEventListeners() {
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());

        // Touch/swipe support
        let startX = 0;
        let endX = 0;

        this.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        this.track.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            const diff = startX - endX;

            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });

        // Resize handler
        window.addEventListener('resize', () => {
            const newCardsToShow = this.getCardsToShow();
            if (newCardsToShow !== this.cardsToShow) {
                this.cardsToShow = newCardsToShow;
                this.maxIndex = Math.max(0, this.cards.length - this.cardsToShow);
                this.currentIndex = Math.min(this.currentIndex, this.maxIndex);
                this.createDots();
                this.updateSlider();
                this.updateButtons();
            }
        });
    }
}

// Initialize the gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new GallerySlider();
});

// JavaScript para controles del video
document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('bgVideo');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const muteBtn = document.getElementById('muteBtn');
    const fitModeBtn = document.getElementById('fitModeBtn');
    
    let currentFitMode = 'cover';
    const fitModes = ['cover', 'contain', 'fill'];

    // Control de ajuste del video
    fitModeBtn.addEventListener('click', function() {
        const currentIndex = fitModes.indexOf(currentFitMode);
        const nextIndex = (currentIndex + 1) % fitModes.length;
        currentFitMode = fitModes[nextIndex];
        
        // Remover todas las clases de fit
        video.classList.remove('fit-cover', 'fit-contain', 'fit-fill');
        // Agregar la nueva clase
        video.classList.add('fit-' + currentFitMode);
        
        // Actualizar el título del botón
        const modeNames = {
            'cover': 'Llenar pantalla',
            'contain': 'Video completo',
            'fill': 'Estirar video'
        };
        fitModeBtn.title = 'Modo: ' + modeNames[currentFitMode];
    });

    // Control de reproducción/pausa
    playPauseBtn.addEventListener('click', function() {
        if (video.paused) {
            video.play();
            playPauseBtn.textContent = '⏸️';
            playPauseBtn.title = 'Pausar';
        } else {
            video.pause();
            playPauseBtn.textContent = '▶️';
            playPauseBtn.title = 'Reproducir';
        }
    });

    // Control de sonido (mute/unmute)
    muteBtn.addEventListener('click', function() {
        if (video.muted) {
            video.muted = false;
            muteBtn.textContent = '🔊';
            muteBtn.title = 'Silenciar';
        } else {
            video.muted = true;
            muteBtn.textContent = '🔇';
            muteBtn.title = 'Activar sonido';
        }
    });

    // Manejo de errores del video
    video.addEventListener('error', function() {
        console.log('Error cargando el video, mostrando fallback');
        document.querySelector('.video-fallback').style.display = 'block';
    });

    // Optimización: pausar video cuando no está visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                video.play();
            } else {
                video.pause();
            }
        });
    });

    observer.observe(video);

    // Smooth scroll para el botón CTA
    document.querySelector('.cta-button').addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector('#content').scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Ajuste de altura en dispositivos móviles (para manejar las barras de navegación)
function setVH() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setVH();
window.addEventListener('resize', setVH);
window.addEventListener('orientationchange', setVH);