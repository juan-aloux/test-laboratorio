/* ==========================================================================
   ALMAR LABORATORIO — comportamiento del sitio
   Sin dependencias. Todo degrada con gracia si el JS falla.
   ========================================================================== */
(function () {
  'use strict';

  /* --- Utilidades ------------------------------------------------------ */

  // Evita inyección de HTML al pintar datos del catálogo.
  function limpiar(texto) {
    return String(texto).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  // Normaliza para buscar sin acentos ni mayúsculas.
  function normalizar(texto) {
    return String(texto)
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  var ICONO_PALOMA =
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
    'stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ' +
    'style="color: var(--verde-oscuro)"><path d="M20 6 9 17l-5-5"></path></svg>';

  var ICONO_RELOJ =
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
    'stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ' +
    'style="color: var(--ambar)"><circle cx="12" cy="12" r="9"></circle>' +
    '<path d="M12 7v5l3 2"></path></svg>';

  /* --- Menú móvil ------------------------------------------------------ */

  var botonMenu = document.getElementById('boton-menu');
  var menu = document.getElementById('menu-principal');

  if (botonMenu && menu) {
    botonMenu.addEventListener('click', function () {
      var abierto = menu.classList.toggle('esta-abierto');
      botonMenu.setAttribute('aria-expanded', String(abierto));
      botonMenu.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
    });

    // Cerrar al elegir un destino.
    menu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        menu.classList.remove('esta-abierto');
        botonMenu.setAttribute('aria-expanded', 'false');
        botonMenu.setAttribute('aria-label', 'Abrir menú');
      }
    });

    // Cerrar con Escape.
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('esta-abierto')) {
        menu.classList.remove('esta-abierto');
        botonMenu.setAttribute('aria-expanded', 'false');
        botonMenu.focus();
      }
    });
  }

  /* --- Catálogo: pintado, filtros, búsqueda, paginación y modal --------- */

  var lista       = document.getElementById('catalogo');
  var avisoVacio  = document.getElementById('catalogo-vacio');
  var conteo      = document.getElementById('catalogo-conteo');
  var paginas     = document.getElementById('catalogo-paginas');
  var campoFiltro = document.getElementById('busqueda-catalogo');
  var filtros     = document.querySelectorAll('.filtro');

  var categoriaActiva = 'todos';
  var terminoBusqueda = '';
  var paginaActual    = 1;
  var POR_PAGINA      = 24;

  // Precio en pesos. 0 significa que aún no se publica.
  function precioTexto(precio) {
    if (!precio) return 'Consultar';
    return '$' + precio.toLocaleString('es-MX', { maximumFractionDigits: 2 });
  }

  // El ayuno no se guarda en estudios.js: se deduce de las indicaciones.
  function pideAyuno(est) {
    return est.indicaciones.some(function (linea) {
      return normalizar(linea).indexOf('ayun') !== -1;
    });
  }

  // Primera línea de indicaciones, recortada para que quepa en la columna.
  function resumenPrep(est) {
    if (!est.indicaciones.length) return 'Sin preparación especial';
    var linea = est.indicaciones[0];
    return linea.length > 58 ? linea.slice(0, 57).trim() + '…' : linea;
  }

  // Cuántas pruebas trae en total, sumando todos los grupos.
  function totalPruebas(est) {
    return est.incluye.reduce(function (suma, g) { return suma + g.pruebas.length; }, 0);
  }

  /* --- Filtrado --------------------------------------------------------- */

  // Se busca en nombre, código y nombres de grupo, para que "colesterol"
  // encuentre los perfiles que lo contienen y no solo los que lo llevan
  // en el título.
  function coincide(est, termino) {
    if (normalizar(est.nombre).indexOf(termino) !== -1) return true;
    if (normalizar(est.codigo).indexOf(termino) !== -1) return true;
    return est.incluye.some(function (g) {
      if (normalizar(g.grupo).indexOf(termino) !== -1) return true;
      return g.pruebas.some(function (p) {
        return normalizar(p).indexOf(termino) !== -1;
      });
    });
  }

  function estudiosFiltrados() {
    if (typeof ESTUDIOS === 'undefined') return [];
    var t = normalizar(terminoBusqueda).trim();

    return ESTUDIOS.filter(function (est) {
      if (categoriaActiva !== 'todos' && est.muestra !== categoriaActiva) return false;
      return t ? coincide(est, t) : true;
    });
  }

  /* --- Pintado ---------------------------------------------------------- */

  function plantillaEstudio(est) {
    var pruebas = totalPruebas(est);
    var detalle = 'Código ' + limpiar(est.codigo);
    if (pruebas) detalle += ' · Incluye ' + pruebas + (pruebas === 1 ? ' prueba' : ' pruebas');

    return (
      '<li class="estudio">' +
        '<button class="estudio__boton" type="button" data-clave="' + limpiar(est.clave) + '" ' +
                'aria-label="Ver detalle de ' + limpiar(est.nombre) + '">' +
          '<span class="estudio__datos">' +
            '<span class="estudio__nombre">' + limpiar(est.nombre) + '</span>' +
            '<span class="estudio__detalle">' + detalle + '</span>' +
          '</span>' +
          '<span class="estudio__prep">' +
            (pideAyuno(est) ? ICONO_RELOJ : ICONO_PALOMA) +
            '<span>' + limpiar(resumenPrep(est)) + '</span>' +
          '</span>' +
          '<span class="estudio__entrega">' + limpiar(est.entrega) + '</span>' +
          '<span class="estudio__precio">' + limpiar(precioTexto(est.precio)) + '</span>' +
        '</button>' +
      '</li>'
    );
  }

  function pintarPaginacion(totalPaginas) {
    if (!paginas) return;

    if (totalPaginas <= 1) {
      paginas.innerHTML = '';
      return;
    }

    var botones = '';
    for (var i = 1; i <= totalPaginas; i++) {
      botones +=
        '<button class="paginacion__pagina" type="button" data-pagina="' + i + '"' +
        (i === paginaActual ? ' aria-current="page"' : '') + '>' + i + '</button>';
    }

    paginas.innerHTML =
      '<button class="paginacion__salto" type="button" data-pagina="' + (paginaActual - 1) + '"' +
        (paginaActual === 1 ? ' disabled' : '') + '>Anterior</button>' +
      '<div class="paginacion__numeros">' + botones + '</div>' +
      '<button class="paginacion__salto" type="button" data-pagina="' + (paginaActual + 1) + '"' +
        (paginaActual === totalPaginas ? ' disabled' : '') + '>Siguiente</button>';
  }

  function pintarCatalogo() {
    if (!lista) return;

    var visibles     = estudiosFiltrados();
    var totalPaginas = Math.max(1, Math.ceil(visibles.length / POR_PAGINA));

    // Al filtrar puede desaparecer la página en la que estábamos.
    if (paginaActual > totalPaginas) paginaActual = totalPaginas;

    var desde  = (paginaActual - 1) * POR_PAGINA;
    var pagina = visibles.slice(desde, desde + POR_PAGINA);

    lista.innerHTML = pagina.map(plantillaEstudio).join('');

    if (avisoVacio) avisoVacio.hidden = visibles.length > 0;

    if (conteo) {
      conteo.textContent = visibles.length
        ? 'Mostrando ' + (desde + 1) + '–' + (desde + pagina.length) +
          ' de ' + visibles.length + ' estudios'
        : '';
    }

    pintarPaginacion(totalPaginas);
  }

  /* --- Filtros y búsqueda ----------------------------------------------- */

  filtros.forEach(function (boton) {
    boton.addEventListener('click', function () {
      categoriaActiva = boton.dataset.categoria;
      paginaActual = 1;
      filtros.forEach(function (b) {
        b.setAttribute('aria-pressed', String(b === boton));
      });
      pintarCatalogo();
    });
  });

  if (campoFiltro) {
    var esperaBusqueda;
    campoFiltro.addEventListener('input', function () {
      clearTimeout(esperaBusqueda);
      esperaBusqueda = setTimeout(function () {
        terminoBusqueda = campoFiltro.value;
        paginaActual = 1;
        pintarCatalogo();
      }, 150);
    });
  }

  if (paginas) {
    paginas.addEventListener('click', function (e) {
      var boton = e.target.closest('[data-pagina]');
      if (!boton || boton.disabled) return;

      paginaActual = Number(boton.dataset.pagina);
      pintarCatalogo();

      // Al cambiar de página, volver al inicio de la lista.
      var seccion = document.getElementById('estudios');
      if (seccion) seccion.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  pintarCatalogo();

  /* --- Modal de detalle -------------------------------------------------- */

  var modal       = document.getElementById('modal-estudio');
  var modalCuerpo = document.getElementById('modal-cuerpo');
  var modalCerrar = document.getElementById('modal-cerrar');
  var origenFoco  = null;   // el renglón que abrió el modal, para devolverle el foco

  function filaDato(etiqueta, valor) {
    return '<div class="modal__dato">' +
             '<dt>' + etiqueta + '</dt>' +
             '<dd>' + valor + '</dd>' +
           '</div>';
  }

  function contenidoModal(est) {
    var html =
      '<div class="modal__encabezado">' +
        '<span class="modal__tipo">' + limpiar(est.tipo) + '</span>' +
        '<h3 id="modal-titulo">' + limpiar(est.nombre) + '</h3>' +
      '</div>' +

      '<dl class="modal__resumen">' +
        filaDato('Precio',  '<strong>' + limpiar(precioTexto(est.precio)) + '</strong>') +
        filaDato('Entrega', limpiar(est.entrega)) +
        filaDato('Código',  limpiar(est.codigo)) +
      '</dl>';

    // Preparación. Si no hay indicaciones se dice explícitamente, porque un
    // hueco vacío se lee como "faltó el dato".
    html += '<section class="modal__seccion">' +
              '<h4>' + (pideAyuno(est) ? ICONO_RELOJ : ICONO_PALOMA) + 'Preparación</h4>';

    if (est.indicaciones.length) {
      html += '<ul class="modal__indicaciones">' +
                est.indicaciones.map(function (linea) {
                  return '<li>' + limpiar(linea) + '</li>';
                }).join('') +
              '</ul>';
    } else {
      html += '<p class="modal__nota">Este estudio no requiere preparación especial. ' +
              'Si tienes dudas, pregúntanos al agendar.</p>';
    }
    html += '</section>';

    // Estudios incluidos. El grupo 'Pruebas' es el genérico del sistema: son
    // determinaciones sueltas, así que se pintan sin encabezado propio.
    if (est.incluye.length) {
      var total = totalPruebas(est);
      html += '<section class="modal__seccion">' +
                '<h4>Qué incluye <span class="modal__cuenta">' + total +
                (total === 1 ? ' prueba' : ' pruebas') + '</span></h4>' +
                est.incluye.map(function (g) {
                  var pruebas = '<p class="modal__pruebas">' +
                                g.pruebas.map(limpiar).join(' · ') +
                                '</p>';
                  return '<div class="modal__grupo">' +
                           (g.grupo === 'Pruebas' ? '' : '<h5>' + limpiar(g.grupo) + '</h5>') +
                           pruebas +
                         '</div>';
                }).join('') +
              '</section>';
    }

    if (est.tiposMuestra.length) {
      html += '<section class="modal__seccion">' +
                '<h4>Tipo de muestra</h4>' +
                '<ul class="modal__muestras">' +
                  est.tiposMuestra.map(function (m) {
                    return '<li>' + limpiar(m) + '</li>';
                  }).join('') +
                '</ul>' +
              '</section>';
    }

    html += '<div class="modal__acciones">' +
              '<a class="boton boton--primario" href="#contacto" data-cerrar-modal>Agendar este estudio</a>' +
            '</div>';

    return html;
  }

  function abrirModal(clave, disparador) {
    if (!modal || !modalCuerpo || typeof ESTUDIOS === 'undefined') return;

    var est = ESTUDIOS.filter(function (e) { return e.clave === clave; })[0];
    if (!est) return;

    origenFoco = disparador || null;
    modalCuerpo.innerHTML = contenidoModal(est);
    modal.hidden = false;
    document.body.classList.add('con-modal');
    if (modalCerrar) modalCerrar.focus();
  }

  function cerrarModal() {
    if (!modal || modal.hidden) return;

    modal.hidden = true;
    modalCuerpo.innerHTML = '';
    document.body.classList.remove('con-modal');

    if (origenFoco) {
      origenFoco.focus();
      origenFoco = null;
    }
  }

  if (lista) {
    lista.addEventListener('click', function (e) {
      var boton = e.target.closest('.estudio__boton');
      if (boton) abrirModal(boton.dataset.clave, boton);
    });
  }

  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target.closest('[data-cerrar-modal]') || e.target === modalCerrar) cerrarModal();
    });

    if (modalCerrar) modalCerrar.addEventListener('click', cerrarModal);

    document.addEventListener('keydown', function (e) {
      if (modal.hidden) return;

      if (e.key === 'Escape') {
        cerrarModal();
        return;
      }

      // El foco no debe salirse del diálogo mientras está abierto.
      if (e.key !== 'Tab') return;

      var focales = modal.querySelectorAll('button, a[href], input, [tabindex]:not([tabindex="-1"])');
      if (!focales.length) return;

      var primero = focales[0];
      var ultimo  = focales[focales.length - 1];

      if (e.shiftKey && document.activeElement === primero) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primero.focus();
      }
    });
  }

  /* --- Chat de MIA ------------------------------------------------------ */
  /* Maqueta: MIA responde con el guion fijo de js/datos-chat.js. La
     conversación vive solo en memoria, así que recargar la página empieza de
     cero — es lo que se pidió. */

  var chat           = document.getElementById('chat-mia');
  var chatBoton      = document.getElementById('chat-abrir');
  var chatPanel      = document.getElementById('chat-panel');
  var chatCerrar     = document.getElementById('chat-cerrar');
  var chatHilo       = document.getElementById('chat-hilo');
  var chatSugerencias= document.getElementById('chat-sugerencias');
  var chatForm       = document.getElementById('chat-form');
  var chatTexto      = document.getElementById('chat-texto');

  if (chat && chatBoton && chatPanel && chatHilo && chatForm && chatTexto &&
      typeof CHAT_MIA !== 'undefined') {

    var chatIniciado = false;   // el saludo se pinta al abrir, no antes
    var chatPensando = null;    // el globo de puntos, mientras está en pantalla
    var chatEspera   = null;
    var chatSaludo   = null;    // temporizador del icono que invita al clic

    function chatAlFinal() {
      chatHilo.scrollTop = chatHilo.scrollHeight;
    }

    function chatAgregar(texto, autor) {
      var globo = document.createElement('div');
      globo.className = 'chat__mensaje chat__mensaje--' + autor;
      globo.textContent = texto;   // sin innerHTML: el texto del paciente entra tal cual
      chatHilo.appendChild(globo);
      chatAlFinal();
    }

    function chatSugerir() {
      if (!chatSugerencias) return;
      chatSugerencias.innerHTML = CHAT_MIA.sugerencias.map(function (t) {
        return '<button class="chat__chip" type="button">' + limpiar(t) + '</button>';
      }).join('');
    }

    // La primera respuesta cuya clave aparezca en el mensaje, sin acentos.
    function chatRespuesta(texto) {
      var t = normalizar(texto);
      for (var i = 0; i < CHAT_MIA.respuestas.length; i++) {
        var r = CHAT_MIA.respuestas[i];
        for (var j = 0; j < r.claves.length; j++) {
          if (t.indexOf(normalizar(r.claves[j])) !== -1) return r.texto;
        }
      }
      return CHAT_MIA.respaldo;
    }

    function chatResponder(texto) {
      clearTimeout(chatEspera);

      chatPensando = document.createElement('div');
      chatPensando.className = 'chat__escribiendo';
      chatPensando.setAttribute('aria-label', CHAT_MIA.nombre + ' está escribiendo');
      chatPensando.innerHTML = '<span></span><span></span><span></span>';
      chatHilo.appendChild(chatPensando);
      chatAlFinal();

      chatEspera = setTimeout(function () {
        if (chatPensando) {
          chatPensando.remove();
          chatPensando = null;
        }
        chatAgregar(chatRespuesta(texto), 'mia');
      }, 700);
    }

    function chatEnviar(texto) {
      var limpio = texto.trim();
      if (!limpio) return;

      chatAgregar(limpio, 'usuario');
      if (chatSugerencias) chatSugerencias.innerHTML = '';
      chatTexto.value = '';
      chatTexto.style.height = 'auto';
      chatResponder(limpio);
    }

    function chatAbrir() {
      chatPanel.hidden = false;
      chat.classList.add('chat--abierto');
      chat.classList.remove('chat--saludando');
      chatBoton.setAttribute('aria-expanded', 'true');
      chatBoton.setAttribute('aria-label', 'Cerrar el chat con ' + CHAT_MIA.nombre);

      if (!chatIniciado) {
        chatAgregar(CHAT_MIA.saludo, 'mia');
        chatSugerir();
        chatIniciado = true;
      }

      chatTexto.focus();
      chatAlFinal();
    }

    function chatCerrarPanel(devolverFoco) {
      chatPanel.hidden = true;
      chat.classList.remove('chat--abierto');
      chatBoton.setAttribute('aria-expanded', 'false');
      chatBoton.setAttribute('aria-label', 'Abrir el chat con ' + CHAT_MIA.nombre);
      if (devolverFoco) chatBoton.focus();
    }

    chatBoton.addEventListener('click', function () {
      if (chatPanel.hidden) chatAbrir();
      else chatCerrarPanel(false);
    });

    if (chatCerrar) {
      chatCerrar.addEventListener('click', function () { chatCerrarPanel(true); });
    }

    if (chatSugerencias) {
      chatSugerencias.addEventListener('click', function (e) {
        var chip = e.target.closest('.chat__chip');
        if (chip) chatEnviar(chip.textContent);
      });
    }

    chatForm.addEventListener('submit', function (e) {
      e.preventDefault();
      chatEnviar(chatTexto.value);
    });

    // Enter envía; Shift+Enter salta de línea.
    chatTexto.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        chatEnviar(chatTexto.value);
      }
    });

    // El campo crece con el texto hasta el tope de max-height del CSS.
    chatTexto.addEventListener('input', function () {
      chatTexto.style.height = 'auto';
      chatTexto.style.height = Math.min(chatTexto.scrollHeight, 104) + 'px';
    });

    /* Cada 10 s el icono del botón cambia a la mano durante 2 s y regresa al
       de mensaje. Es solo una invitación a dar clic: el cruce entre iconos lo
       hace el CSS, aquí solo se enciende y apaga la clase. */
    function chatCicloSaludo() {
      chatSaludo = setInterval(function () {
        if (!chatPanel.hidden) return;      // con el chat abierto, no estorbar
        chat.classList.add('chat--saludando');
        setTimeout(function () {
          chat.classList.remove('chat--saludando');
        }, 2000);
      }, 10000);
    }

    // Quien pidió menos movimiento no ve el ciclo. Es el mismo criterio de la
    // media query de la hoja de estilos, aplicado donde el CSS no alcanza.
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      chatCicloSaludo();
    }

    // Escape cierra el chat, pero si el modal del catálogo está abierto es
    // suyo el Escape: el chat queda oculto detrás de él.
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape' || chatPanel.hidden) return;
      if (modal && !modal.hidden) return;
      chatCerrarPanel(true);
    });
  }

  /* --- Elección de sucursal --------------------------------------------- */
  /* El pie no puede mostrar una sola dirección: hay siete sucursales con datos
     distintos. Al entrar se pregunta cuál queda más cerca y con esa respuesta
     se pinta el bloque CONTACTO.

     El diálogo no se puede cerrar sin elegir: no tiene botón de cerrar, el velo
     no responde al clic y aquí se atrapa Escape. */

  var modalSuc   = document.getElementById('modal-sucursal');
  var listaSuc   = document.getElementById('eleccion-lista');
  var SUCURSAL_ACTIVA = null;   // la elección vive en memoria, no se persiste

  function pintarContactoPie(suc) {
    var direccion = document.getElementById('pie-direccion');
    var telefonos = document.getElementById('pie-telefonos');
    var horario   = document.getElementById('pie-horario');

    if (direccion) {
      direccion.innerHTML = suc.direccion.map(limpiar).join('<br>');
    }

    if (telefonos) {
      telefonos.innerHTML = suc.telefonos.map(function (t) {
        return '<a href="tel:' + limpiar(t.tel) + '">' + limpiar(t.texto) + '</a>';
      }).join('<br>');
    }

    if (horario) {
      // En Centro Médico el texto ya dice "Abierto las 24 horas": ponerle
      // "Lun a Sáb" delante sería falso. Los datos no traen horario de
      // domingo, así que ese renglón se omite en vez de inventarlo.
      horario.textContent = suc.abierto24
        ? suc.horario
        : 'Lun a Sáb ' + suc.horario;
    }
  }

  function elegirSucursal(indice) {
    var suc = SUCURSALES[Number(indice)];
    if (!suc) return;

    SUCURSAL_ACTIVA = suc;
    pintarContactoPie(suc);

    modalSuc.hidden = true;
    document.body.classList.remove('con-modal');
  }

  if (modalSuc && listaSuc && typeof SUCURSALES !== 'undefined') {
    listaSuc.addEventListener('click', function (e) {
      var opcion = e.target.closest('.eleccion__opcion');
      if (opcion) elegirSucursal(opcion.dataset.sucursal);
    });

    document.addEventListener('keydown', function (e) {
      if (modalSuc.hidden) return;

      // Escape se traga a propósito: de aquí solo se sale eligiendo.
      if (e.key === 'Escape') {
        e.preventDefault();
        return;
      }

      if (e.key !== 'Tab') return;

      var focales = modalSuc.querySelectorAll('.eleccion__opcion');
      if (!focales.length) return;

      var primero = focales[0];
      var ultimo  = focales[focales.length - 1];

      if (e.shiftKey && document.activeElement === primero) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primero.focus();
      }
    });

    // Se abre de inmediato: componentes.js ya pintó el diálogo cuando este
    // archivo corre, así que no hace falta esperar a DOMContentLoaded.
    modalSuc.hidden = false;
    document.body.classList.add('con-modal');

    var primeraOpcion = modalSuc.querySelector('.eleccion__opcion');
    if (primeraOpcion) primeraOpcion.focus();
  }

  /* --- Año del pie ------------------------------------------------------ */

  var anio = document.getElementById('anio');
  if (anio) anio.textContent = String(new Date().getFullYear());
})();
