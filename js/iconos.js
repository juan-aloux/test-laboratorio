/* ==========================================================================
   ALMAR LABORATORIO — iconos
   --------------------------------------------------------------------------
   Los SVG que se repiten a lo largo del sitio, en un solo lugar.

   Cada icono es una función que recibe:
     tamano  Píxeles de ancho y alto. Por defecto 16.
     color   Valor CSS para el trazo, normalmente una variable:
             'var(--verde-oscuro)'. Si se omite, hereda el color del texto.

   Todos llevan aria-hidden porque son decorativos: el texto que los acompaña
   ya dice lo que hacen.
   ========================================================================== */

const ICONOS = (function () {
  'use strict';

  // Envoltura común. El grosor de trazo varía por icono, por eso es parámetro.
  function svg(tamano, color, grosor, cuerpo) {
    return (
      '<svg width="' + tamano + '" height="' + tamano + '" viewBox="0 0 24 24" ' +
      'fill="none" stroke="currentColor" stroke-width="' + grosor + '" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"' +
      (color ? ' style="color: ' + color + '"' : '') + '>' +
      cuerpo +
      '</svg>'
    );
  }

  var RELOJ     = '<circle cx="12" cy="12" r="9"></circle><path d="M12 7v5l3 2"></path>';
  var TELEFONO  = '<path d="M21 16.9v2.6a1.7 1.7 0 0 1-1.9 1.7 17 17 0 0 1-7.4-2.6 16.6 16.6 0 0 1-5.1-5.1A17 17 0 0 1 4 6.1 1.7 1.7 0 0 1 5.7 4.2h2.6a1.7 1.7 0 0 1 1.7 1.5c.1.9.3 1.7.6 2.5a1.7 1.7 0 0 1-.4 1.8l-1.1 1.1a13.6 13.6 0 0 0 5.1 5.1l1.1-1.1a1.7 1.7 0 0 1 1.8-.4c.8.3 1.6.5 2.5.6a1.7 1.7 0 0 1 1.5 1.7z"></path>';
  var PALOMA    = '<path d="M20 6 9 17l-5-5"></path>';
  var FLECHA    = '<path d="M5 12h14M13 6l6 6-6 6"></path>';
  var PIN       = '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"></path><circle cx="12" cy="10" r="3"></circle>';

  return {
    // --- Estructura y navegación ---
    reloj:      function (t, c) { return svg(t || 16, c, 1.6, RELOJ); },
    relojFino:  function (t, c) { return svg(t || 16, c, 1.7, RELOJ); },
    relojGrueso:function (t, c) { return svg(t || 16, c, 1.8, RELOJ); },
    telefono:   function (t, c) { return svg(t || 16, c, 1.6, TELEFONO); },
    telefonoFino:function (t, c) { return svg(t || 16, c, 1.7, TELEFONO); },
    telefonoGrueso:function (t, c) { return svg(t || 18, c, 1.8, TELEFONO); },
    menu:       function (t, c) { return svg(t || 22, c, 1.8, '<path d="M4 7h16M4 12h16M4 17h16"></path>'); },
    lupa:       function (t, c) { return svg(t || 17, c, 1.8, '<circle cx="11" cy="11" r="7"></circle><path d="m20 20-3.5-3.5"></path>'); },

    // --- Señales ---
    paloma:      function (t, c) { return svg(t || 15, c, 2, PALOMA); },
    palomaFina:  function (t, c) { return svg(t || 18, c, 1.9, PALOMA); },
    palomaMedia: function (t, c) { return svg(t || 17, c, 1.7, PALOMA); },
    flecha:      function (t, c) { return svg(t || 16, c, 2, FLECHA); },
    pin:         function (t, c) { return svg(t || 15, c, 1.8, PIN); },

    // --- Pasos y formulario ---
    calendario: function (t, c) { return svg(t || 30, c, 1.5, '<rect x="3" y="5" width="18" height="16" rx="2"></rect><path d="M8 3v4M16 3v4M3 10h18"></path><path d="m9 15 2 2 4-4"></path>'); },
    documento:  function (t, c) { return svg(t || 30, c, 1.5, '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"></path><path d="M14 3v5h5"></path><path d="M9 13h6M9 17h4"></path>'); },
    candado:    function (t, c) { return svg(t || 24, c, 1.6, '<rect x="4" y="10" width="16" height="11" rx="2"></rect><path d="M8 10V7a4 4 0 0 1 8 0v3"></path>'); },
    casa:       function (t, c) { return svg(t || 20, c, 1.6, '<path d="M3 11.5 12 4l9 7.5"></path><path d="M5 10v10h14V10"></path><path d="M9 20v-6h6v6"></path>'); },

    // --- Servicios ---
    tubo:        function (t, c) { return svg(t || 17, c, 1.6, '<path d="M9 3h6l1 4H8l1-4zM7 7h10l1.5 12a2 2 0 0 1-2 2h-9a2 2 0 0 1-2-2L7 7z"></path>'); },
    corazon:     function (t, c) { return svg(t || 17, c, 1.6, '<path d="M3 12h3l2-5 3 10 2.5-7 1.5 2h6"></path>'); },
    colposcopia: function (t, c) { return svg(t || 17, c, 1.6, '<path d="M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zm5 12 5 5"></path>'); },
    oido:        function (t, c) { return svg(t || 17, c, 1.6, '<path d="M3 11a9 9 0 0 1 18 0v5a3 3 0 0 1-3 3h-1v-8h4M3 11v5a3 3 0 0 0 3 3h1v-8H3"></path>'); },
    pulmon:      function (t, c) { return svg(t || 17, c, 1.6, '<path d="M12 3v6M8 9h8l1.5 8a3 3 0 0 1-3 3.5h-5A3 3 0 0 1 6.5 17L8 9z"></path>'); },
    bebe:        function (t, c) { return svg(t || 17, c, 1.6, '<path d="M9 11a3 3 0 1 1 6 0c0 2-3 2.5-3 4.5M12 19h.01M4 12a8 8 0 1 1 16 0 8 8 0 0 1-16 0z"></path>'); },
    chat:        function (t, c) { return svg(t || 17, c, 1.6, '<path d="M8 10h8M8 14h5M4 5h16v12H9l-5 4V5z"></path>'); },

    // --- Catálogo ---
    cerrar:     function (t, c) { return svg(t || 20, c, 1.8, '<path d="M18 6 6 18M6 6l12 12"></path>'); },
    galon:      function (t, c) { return svg(t || 16, c, 1.8, '<path d="m9 18 6-6-6-6"></path>'); },

    // --- Chat MIA ---
    // La burbuja del chat va a 26 px: con el trazo de 1.6 de 'chat' se vería
    // demasiado fina a ese tamaño, por eso lleva icono propio.
    chatBurbuja: function (t, c) { return svg(t || 26, c, 1.7, '<path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9.7 9.7 0 0 1-2.7-.4L4 21l1.6-4.3A8.2 8.2 0 0 1 4 11.5a8.4 8.4 0 0 1 9-8.4 8.4 8.4 0 0 1 8 8.4z"></path><path d="M9 11h.01M12.5 11h.01M16 11h.01"></path>'); },
    enviar:      function (t, c) { return svg(t || 18, c, 1.8, '<path d="m22 2-7 20-4-9-9-4 20-7z"></path>'); },
    chispa:      function (t, c) { return svg(t || 18, c, 1.7, '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8"></path>'); },

    // Dos bocadillos escalonados (Lucide 'messages-square', ISC). Se asoma
    // cada tanto en la burbuja para invitar al clic. Va de trazo 2: a 26 px
    // los bocadillos cuadrados aguantan más grosor que los redondos, y así
    // contrasta con el icono de reposo, que es redondo y de trazo 1.7.
    conversacion: function (t, c) { return svg(t || 26, c, 2, '<path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2z"></path><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"></path>'); }
  };
})();
