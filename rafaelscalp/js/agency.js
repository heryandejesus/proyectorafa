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

const track = document.getElementById("carouselTrack");
const dots = document.querySelectorAll(".dot");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
let index = 0;
let totalSlides = dots.length;

// Cambiar slide
function moveToSlide(i) {
  index = (i + totalSlides) % totalSlides;
  track.style.transform = `translateX(-${index * 100}%)`;
  updateDots();
}

// Actualiza los indicadores
function updateDots() {
  dots.forEach(dot => dot.classList.remove("active"));
  dots[index].classList.add("active");
}

// Auto deslizar
let autoSlide = setInterval(() => moveToSlide(index + 1), 4000);

// Click en puntos
dots.forEach(dot => {
  dot.addEventListener("click", () => {
    clearInterval(autoSlide);
    moveToSlide(Number(dot.dataset.index));
    autoSlide = setInterval(() => moveToSlide(index + 1), 4000);
  });
});

// Flechas
prevBtn.addEventListener("click", () => {
  clearInterval(autoSlide);
  moveToSlide(index - 1);
  autoSlide = setInterval(() => moveToSlide(index + 1), 4000);
});

nextBtn.addEventListener("click", () => {
  clearInterval(autoSlide);
  moveToSlide(index + 1);
  autoSlide = setInterval(() => moveToSlide(index + 1), 4000);
});

