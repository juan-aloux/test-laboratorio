/* ==========================================================================
   Carrusel del hero (Swiper 11, desde CDN).

   Qué hace:
   - Pasa solo cada DURACION milisegundos.
   - Un clic sobre la imagen pausa; otro clic reanuda.
   - Puntos sobre la foto: uno por diapositiva, clicables. El activo se
     alarga. Navegar con ellos no pausa el carrusel.
   - Barra inferior que se llena durante la espera de cada diapositiva.

   El HTML lo pinta carruselHero() en js/componentes.js. Este archivo solo
   le da comportamiento; si el elemento no existe, no hace nada.
   ========================================================================== */
(function () {
  'use strict';

  var DURACION = 5000;   // ms que dura cada diapositiva

  var contenedor = document.getElementById('carrusel-hero');
  if (!contenedor || typeof Swiper === 'undefined') return;

  var puntos   = document.getElementById('carrusel-puntos');
  var relleno  = contenedor.querySelector('.carrusel__barra-relleno');
  var total    = contenedor.querySelectorAll('.swiper-slide').length;

  // Con una sola diapositiva no hay nada que pasar: fuera los puntos.
  if (total < 2) {
    var pie = contenedor.querySelector('.carrusel__pie');
    if (pie) pie.hidden = true;
  }

  var swiper = new Swiper(contenedor, {
    // rewind en vez de loop: con pocas diapositivas el loop de Swiper 11
    // reordena el DOM y se bloquea a mitad de camino. rewind da la misma
    // vuelta infinita (de la última salta a la primera) sin duplicar nada.
    rewind: total > 1,
    slidesPerView: 1,
    // Los cuadros de marcador no tienen contenido que le dé ancho a la
    // lámina: observer hace que Swiper vuelva a medir cuando el layout
    // cambia (al pintar el componente, al cargar las fotos reales, al
    // redimensionar), en vez de quedarse con la medida de 0 del arranque.
    observer: true,
    observeParents: true,
    speed: 550,
    // waitForTransition: false — si no, autoplay espera un transitionend que
    // en este montaje no siempre llega y se queda esperando para siempre
    // después de la primera diapositiva.
    autoplay: total > 1
      ? { delay: DURACION, disableOnInteraction: false, waitForTransition: false }
      : false,
    a11y: { enabled: false },   // el aria-label del contenedor ya describe el control
    pagination: {
      el: puntos,
      clickable: true,
      bulletClass: 'carrusel__punto',
      bulletActiveClass: 'carrusel__punto--activo'
    },
    on: {
      // autoplayTimeLeft da los ms restantes: 'progreso' va de 0 a 1 y
      // alimenta el scaleX de la barra sin necesidad de un timer propio.
      autoplayTimeLeft: function (s, restante, progreso) {
        pintarBarra(1 - progreso);
      }
    }
  });

  function pintarBarra(fraccion) {
    if (relleno) relleno.style.transform = 'scaleX(' + fraccion + ')';
  }

  /* --- Pausa y reanudación --------------------------------------------- */

  var pausado = false;

  function alternarPausa() {
    if (!swiper.autoplay) return;
    pausado = !pausado;
    if (pausado) {
      swiper.autoplay.stop();
    } else {
      swiper.autoplay.start();
    }
    contenedor.classList.toggle('carrusel--pausado', pausado);
    // Sin autoplay la barra no recibe eventos: se deja llena o se reinicia.
    if (pausado) pintarBarra(1);
  }

  if (total > 1) {
    contenedor.addEventListener('click', alternarPausa);
    contenedor.setAttribute('role', 'button');
    contenedor.setAttribute('tabindex', '0');
    contenedor.setAttribute('aria-label', 'Pausar o reanudar el carrusel');
    contenedor.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        alternarPausa();
      }
    });
  }

  // Los puntos viven dentro de #carrusel-hero, así que su clic burbujea hasta
  // el handler de pausa: sin esto, elegir una imagen la pausaría a la vez.
  if (puntos) {
    puntos.addEventListener('click', function (e) { e.stopPropagation(); });
  }
})();
