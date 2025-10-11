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
// SCRIPT PARA GALERÍA DE RESULTADOS
(function() {
    'use strict';

    const sliderTrack = document.getElementById('galeriaSliderTrack');
    const prevBtn = document.getElementById('galeriaPrevBtn');
    const nextBtn = document.getElementById('galeriaNextBtn');
    const dotsContainer = document.getElementById('galeriaDotsContainer');
    const slides = document.querySelectorAll('.galeria-slide');

    let currentIndex = 0;
    const totalSlides = slides.length;
    let autoPlayInterval;

    // Crear dots dinámicamente
    function createDots() {
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div');
            dot.classList.add('galeria-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }

    const dots = () => document.querySelectorAll('.galeria-dot');

    // Actualizar el slider
    function updateSlider() {
        sliderTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
        dots().forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    // Ir a un slide específico
    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
        resetAutoPlay();
    }

    // Slide siguiente
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider();
    }

    // Slide anterior
    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlider();
    }

    // Auto-play
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    function resetAutoPlay() {
        stopAutoPlay();
        startAutoPlay();
    }

    // Event listeners para los botones
    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoPlay();
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoPlay();
        });
    }

    // Pausar auto-play cuando el usuario interactúa
    if (sliderTrack) {
        sliderTrack.addEventListener('mouseenter', stopAutoPlay);
        sliderTrack.addEventListener('mouseleave', startAutoPlay);
    }

    // Inicializar
    if (slides.length > 0) {
        createDots();
        startAutoPlay();
    }

})();

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

// boton de enlace a instagram en procedimientos

document.querySelectorAll('.btn-instagram').forEach(btn => {
    btn.addEventListener('click', function() {
      this.blur(); 
    });
  });