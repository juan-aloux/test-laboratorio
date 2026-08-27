/* ==========================================================================
   ALMAR LABORATORIO — componentes de página
   --------------------------------------------------------------------------
   Cada sección del sitio es un custom element: <almar-hero>, <almar-catalogo>…
   index.html solo los coloca en orden; el contenido vive aquí.

   SIN Shadow DOM a propósito. Los componentes pintan en el DOM normal
   ("light DOM"), así que css/estilos.css les aplica igual que antes. Con
   Shadow DOM habría que reescribir las 926 líneas de la hoja de estilos.

   Los elementos se registran antes de que corra principal.js, y las etiquetas
   ya están parseadas cuando eso pasa, así que todo el DOM existe para cuando
   principal.js busca sus IDs. Por eso principal.js no necesitó cambios.
   ========================================================================== */
(function () {
  'use strict';

  /* --- Registro -------------------------------------------------------- */

  // Define un componente a partir de una función que devuelve HTML.
  function componente(nombre, plantilla) {
    customElements.define(nombre, class extends HTMLElement {
      connectedCallback() {
        // Guarda contra repintados: si el elemento se moviera en el DOM,
        // connectedCallback correría otra vez y borraría lo que principal.js
        // ya pintó dentro (el catálogo, las sugerencias del buscador).
        if (this.dataset.pintado) return;
        this.innerHTML = plantilla();
        this.dataset.pintado = '1';
      }
    });
  }

  var I = ICONOS;
  var VERDE = 'var(--verde-oscuro)';

  // Enlace de "Cómo llegar" a Google Maps, con la dirección ya codificada.
  // Los espacios van como '+' y no como %20: es lo que Maps usa en sus propias
  // URLs y lo que tenía el sitio antes de separar los datos.
  function urlMapa(direccion) {
    return 'https://www.google.com/maps/search/?api=1&query=' +
           encodeURIComponent(direccion).replace(/%20/g, '+');
  }

  /* --- Cabecera y navegación -------------------------------------------- */

  componente('almar-cabecera', function () {
    var enlaces = NAVEGACION.map(function (e) {
      return '<a href="' + e.href + '">' + e.texto + '</a>';
    }).join('');

    return '' +
      '<header class="cabecera">' +
        '<div class="contenedor">' +
          '<a class="logo" href="#inicio">' +
            '<img src="img/logo.png" alt="ALMAR Laboratorio" width="762" height="618">' +
          '</a>' +
          '<nav class="nav" aria-label="Navegación principal">' +
            '<button class="nav__boton-menu" type="button" id="boton-menu" ' +
                    'aria-expanded="false" aria-controls="menu-principal" aria-label="Abrir menú">' +
              I.menu(22) +
            '</button>' +
            '<div class="nav__enlaces" id="menu-principal">' + enlaces + '</div>' +
            '<a class="boton boton--primario boton--compacto" href="#contacto">Agendar estudio</a>' +
          '</nav>' +
        '</div>' +
      '</header>';
  });

  /* --- Hero -------------------------------------------------------------- */

  /* El carrusel del hero. Las imágenes van cuadradas (el marco es 1:1);
     estas son de 1600x1600. Agregar o quitar diapositivas es agregar o
     quitar objetos de esta lista: los puntos y la barra se ajustan solos.
     Si un objeto se deja sin 'img', esa lámina cae en el cuadro gris de
     respaldo.

     El texto de estas gráficas va quemado en el pixel, así que el 'alt' es
     lo único que lo hace accesible: resume lo que la imagen anuncia, no
     solo lo que se ve.

     El comportamiento (autoplay, pausa al clic) vive en js/carrusel.js. */
  var DIAPOSITIVAS = [
    { img: 'img/slider-1.jpg', alt: 'Almar Laboratorios está contratando: se solicita químico analista y personal de recursos humanos. Informes al (249) 422-6598.' },
    { img: 'img/slider-2.jpg', alt: 'Dos integrantes del equipo de Almar Laboratorios en el área de trabajo. En equipo siempre es mejor.' },
    { img: 'img/slider-3.jpg', alt: 'Almar Laboratorios está contratando: se solicita químico analista. Informes al (249) 422-6598.' }
  ];

  function carruselHero() {
    var laminas = DIAPOSITIVAS.map(function (d, i) {
      var contenido = d.img
        ? '<img src="' + d.img + '" alt="' + d.alt + '" loading="' + (i === 0 ? 'eager' : 'lazy') + '">'
        : '<div class="carrusel__marcador" aria-hidden="true"></div>';
      return '<div class="swiper-slide carrusel__lamina">' + contenido + '</div>';
    }).join('');

    // Los puntos van dentro del .swiper, sobre la foto: .carrusel__pie los
    // apoya en un degradado para que se lean sobre cualquier imagen, y la
    // barra de duración queda por debajo de ellos, al ras del borde.
    return '' +
      '<div class="carrusel">' +
        '<div class="swiper" id="carrusel-hero">' +
          '<div class="swiper-wrapper">' + laminas + '</div>' +
          '<div class="carrusel__pie">' +
            '<div class="carrusel__puntos" id="carrusel-puntos"></div>' +
          '</div>' +
          '<div class="carrusel__barra"><span class="carrusel__barra-relleno"></span></div>' +
        '</div>' +
      '</div>';
  }


  componente('almar-hero', function () {
    return '' +
      '<section class="hero" id="inicio">' +
        '<div class="contenedor">' +
          '<div class="hero__texto">' +
            '<h1><em>Laboratorios Almar</em> – Laboratorio clínico, resultados precisos y <em>atención humana</em>.</h1>' +
            '<p class="hero__entrada">40 años de trayectoria en Tecamachalco y la región, cuidando la salud de las familias que confían en nosotros generación tras generación.</p>' +
            '<div class="hero__acciones">' +
              '<a class="boton boton--primario" href="#contacto">Agendar estudio</a>' +
            '</div>' +
          '</div>' +
          '<div class="hero__media">' + carruselHero() + '</div>' +
        '</div>' +
      '</section>';
  });

  /* --- Catálogo ---------------------------------------------------------- */
  /* La lista <ul id="catalogo"> queda vacía a propósito: la pinta
     principal.js a partir de js/estudios.js, igual que antes. Lo mismo pasa
     con el conteo, la paginación y el cuerpo del modal.

     El modal vive dentro de la sección y arranca oculto. Se llena al abrirlo,
     no antes: pintar los 75 detalles de golpe llenaría el DOM de HTML que
     nadie está viendo. */

  componente('almar-catalogo', function () {
    // Las categorías salen del tipo de muestra, no del 'Tipo' del sistema
    // (que solo distingue Paquetes de Perfiles y no le dice nada al paciente).
    //
    // No hay botón para 'heces' ni 'exudados' a propósito: esos estudios
    // siguen en el catálogo y se ven en "Todos" y en el buscador, solo que
    // sin filtro propio. Para devolverles el botón, basta agregar aquí
    // { id: 'heces', texto: 'Heces' } y { id: 'exudados', texto: 'Exudados' }.
    var categorias = [
      { id: 'todos',    texto: 'Todos' },
      { id: 'sangre',   texto: 'Sangre' },
      { id: 'orina',    texto: 'Orina' },
      { id: 'otros',    texto: 'Otros' }
    ];

    var filtros = categorias.map(function (c, i) {
      return '<button class="filtro" type="button" data-categoria="' + c.id + '" ' +
             'aria-pressed="' + (i === 0 ? 'true' : 'false') + '">' + c.texto + '</button>';
    }).join('');

    var encabezados = ['ESTUDIO', 'PREPARACIÓN', 'ENTREGA', 'PRECIO']
      .map(function (t) { return '<span>' + t + '</span>'; }).join('');

    return '' +
      '<section class="seccion" id="estudios">' +
        '<div class="contenedor">' +
          '<div class="seccion__encabezado">' +
            '<div>' +
              '<span class="rotulo">CATÁLOGO DE ESTUDIOS</span>' +
              '<h2>Cada estudio, con su precio y su preparación</h2>' +
              '<p class="seccion__intro">Si un estudio pide ayuno o alguna preparación especial, aquí lo dice. Toca cualquier estudio para ver todo lo que incluye.</p>' +
            '</div>' +
            '<a class="enlace-flecha" href="#contacto">' +
              '¿No encuentras tu estudio? Escríbenos' + I.flecha(16) +
            '</a>' +
          '</div>' +

          '<div class="catalogo__herramientas">' +
            '<div class="filtros" role="group" aria-label="Filtrar estudios por tipo de muestra">' + filtros + '</div>' +
            '<div class="catalogo__busqueda">' +
              I.lupa(17, 'var(--texto-tenue)') +
              '<input type="search" id="busqueda-catalogo" placeholder="Buscar por nombre, código o prueba" aria-label="Buscar dentro del catálogo">' +
            '</div>' +
          '</div>' +

          '<p class="catalogo__conteo" id="catalogo-conteo" aria-live="polite"></p>' +

          '<div class="catalogo__cabecera" aria-hidden="true">' + encabezados + '</div>' +

          '<ul class="catalogo__lista" id="catalogo"></ul>' +

          '<p class="catalogo__sin-resultados" id="catalogo-vacio" hidden>' +
            'No hay estudios que coincidan. Prueba con otro término o escríbenos.' +
          '</p>' +

          '<nav class="paginacion" id="catalogo-paginas" aria-label="Paginación del catálogo"></nav>' +


          '<div class="catalogo__pie">' +
            '<a class="boton boton--linea" href="#contacto">' +
              '¿Necesitas un estudio que no está aquí? Escríbenos' + I.flecha(17) +
            '</a>' +
          '</div>' +

          /* Modal de detalle. Empieza vacío y oculto; principal.js lo llena
             al abrirlo y lo vuelve a vaciar al cerrarlo. */
          '<div class="modal" id="modal-estudio" hidden>' +
            '<div class="modal__velo" data-cerrar-modal></div>' +
            '<div class="modal__panel" role="dialog" aria-modal="true" aria-labelledby="modal-titulo">' +
              '<button class="modal__cerrar" type="button" id="modal-cerrar" aria-label="Cerrar detalle del estudio">' +
                I.cerrar(20) +
              '</button>' +
              '<div class="modal__cuerpo" id="modal-cuerpo"></div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</section>';
  });

  /* --- Servicios ---------------------------------------------------------- */
  /* Lo que ofrece el laboratorio. Cada tarjeta lleva su foto de
     img/servicios/ y el icono como ancla visual. */

  componente('almar-servicios', function () {
    var tarjetas = SERVICIOS.map(function (s) {
      return '<li class="servicio">' +
               '<div class="servicio__foto">' +
                 '<img src="' + s.foto + '" alt="' + s.alt + '" width="1200" height="669" loading="lazy">' +
               '</div>' +
               '<div class="servicio__cuerpo">' +
                 '<div class="servicio__titulo">' +
                   I[s.icono](17) +
                   '<h3>' + s.titulo + '</h3>' +
                 '</div>' +
                 '<p>' + s.texto + '</p>' +
               '</div>' +
             '</li>';
    }).join('');

    return '' +
      '<section class="seccion seccion--crema" id="servicios">' +
        '<div class="contenedor">' +
          '<div class="seccion__encabezado">' +
            '<div>' +
              '<span class="rotulo">NUESTROS SERVICIOS</span>' +
              '<h2>Los servicios que ofrecemos</h2>' +
              '<p class="seccion__intro">Análisis clínicos y estudios especializados, disponibles sin cita previa para los de rutina.</p>' +
            '</div>' +
          '</div>' +

          '<ul class="servicios__rejilla">' + tarjetas + '</ul>' +

          '<div class="servicios__domicilio">' +
            I.casa(20) +
            '<div>' +
              '<strong>Toma de muestras a domicilio</strong>' +
              '<span>Disponible desde las siete sucursales. Llámanos para confirmar cobertura y horario.</span>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</section>';
  });

  /* --- Sucursales -------------------------------------------------------- */

  // Una tarjeta de sucursal. Los datos vienen de js/datos-sucursales.js.
  function plantillaSucursal(s) {
    var insignia = '';
    if (s.principal) {
      insignia = '<span class="sucursal__insignia sucursal__insignia--principal">PRINCIPAL</span>';
    } else if (s.insignia) {
      insignia = '<span class="sucursal__insignia sucursal__insignia--horario">' + s.insignia + '</span>';
    }

    // Los teléfonos van separados por un punto medio decorativo.
    var telefonos = s.telefonos.map(function (t) {
      return '<a href="tel:' + t.tel + '">' + t.texto + '</a>';
    }).join('<span aria-hidden="true">·</span>');

    // Con más de un teléfono hace falta el envoltorio que los separa.
    var bloqueTelefonos = s.telefonos.length > 1
      ? '<span class="sucursal__telefonos">' + telefonos + '</span>'
      : telefonos;

    return '' +
      '<article class="sucursal' + (s.principal ? ' sucursal--principal' : '') + '">' +
        '<div class="sucursal__titulo">' +
          '<h3>' + s.nombre + '</h3>' +
          insignia +
        '</div>' +
        '<address class="sucursal__direccion">' + s.direccion.join('<br>') + '</address>' +
        '<a class="sucursal__mapa" href="' + urlMapa(s.mapa) + '" target="_blank" rel="noopener">' +
          I.pin(15) +
          'Cómo llegar<span class="oculto-visualmente"> a la sucursal ' + s.nombre + '</span>' +
        '</a>' +
        '<div class="sucursal__contacto">' +
          '<div class="sucursal__dato">' +
            I.telefonoFino(16) +
            bloqueTelefonos +
          '</div>' +
          '<div class="sucursal__dato' + (s.abierto24 ? ' sucursal__horario--destacado' : '') + '">' +
            I.relojFino(16) +
            '<span>' + s.horario + '</span>' +
          '</div>' +
        '</div>' +
      '</article>';
  }

  componente('almar-sucursales', function () {
    var tarjetas = SUCURSALES.map(plantillaSucursal).join('');

    return '' +
      '<section class="seccion sucursales" id="sucursales">' +
        '<div class="contenedor">' +
          '<div class="seccion__encabezado">' +
            '<div>' +
              '<span class="rotulo">NUESTRAS SUCURSALES</span>' +
              '<h2>Siete sucursales en la región de Tecamachalco</h2>' +
              '<p class="seccion__intro">Toma de muestra sin cita previa para estudios de rutina. La sucursal de Centro Médico abre las 24 horas.</p>' +
            '</div>' +
            '<a class="enlace-flecha" href="tel:2494224054">' +
              'Llamar a Matriz' + I.flecha(16) +
            '</a>' +
          '</div>' +

          '<div class="sucursales__rejilla">' + tarjetas + '</div>' +
        '</div>' +
      '</section>';
  });

  /* --- Llamado final ------------------------------------------------------ */

  componente('almar-llamado', function () {
    return '' +
      '<section class="llamado" id="contacto">' +
        '<div class="contenedor contenedor--estrecho llamado__caja">' +
          '<h2>Agenda hoy y consulta el precio antes de venir</h2>' +
          '<p>Estudios de rutina sin cita previa. Para paquetes y toma a domicilio, escríbenos y te confirmamos horario.</p>' +
          '<div class="llamado__acciones">' +
            '<a class="boton boton--claro" href="tel:[TELÉFONO]">Agendar estudio</a>' +
            '<a class="boton boton--sobre-verde" href="tel:[TELÉFONO]">' +
              I.telefonoGrueso(18) +
              '[TELÉFONO]' +
            '</a>' +
          '</div>' +
        '</div>' +
      '</section>';
  });

  /* --- Pie ---------------------------------------------------------------- */

  componente('almar-pie', function () {
    var columnas = PIE_COLUMNAS.map(function (col) {
      var enlaces = col.enlaces.map(function (e) {
        return '<a href="' + e.href + '">' + e.texto + '</a>';
      }).join('');

      // El aria-label toma la inicial mayúscula del título: ESTUDIOS → Estudios.
      var etiqueta = col.titulo.charAt(0) + col.titulo.slice(1).toLowerCase();

      return '<nav class="pie__columna" aria-label="' + etiqueta + '">' +
               '<span class="pie__titulo">' + col.titulo + '</span>' +
               enlaces +
             '</nav>';
    }).join('');

    return '' +
      '<footer class="pie">' +
        '<div class="contenedor">' +
          '<div class="pie__rejilla">' +
            '<div class="pie__marca">' +
              '<div class="pie__logo">' +
                '<img src="img/logo.png" alt="ALMAR Laboratorio" width="762" height="618" loading="lazy">' +
              '</div>' +
              '<p class="pie__descripcion">Laboratorio de análisis clínicos. Precios publicados, resultados validados y firmados.</p>' +
            '</div>' +

            columnas +

            '<div class="pie__columna">' +
              '<span class="pie__titulo">CONTACTO</span>' +
              '<address class="pie__dato" style="font-style: normal">[DIRECCIÓN COMPLETA]<br>[COLONIA, CIUDAD, CP]</address>' +
              '<a class="pie__dato" href="tel:[TELÉFONO]">[TELÉFONO]</a>' +
              '<a class="pie__dato" href="mailto:[CORREO]">[CORREO]</a>' +
              '<span class="pie__dato">Lun a Sáb [HORARIO]<br>Dom [HORARIO]</span>' +
            '</div>' +
          '</div>' +

          '<div class="pie__legal">' +
            '<span>© <span id="anio">[AÑO]</span> ALMAR Laboratorio. Todos los derechos reservados.</span>' +
            '<div class="pie__legal-enlaces">' +
              '<a href="#contacto">Aviso de privacidad</a>' +
              '<a href="#contacto">Términos y condiciones</a>' +
              '<span>Responsable sanitario: [NOMBRE, CÉD. PROF.]</span>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</footer>';
  });

})();
