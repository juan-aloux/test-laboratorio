/* ==========================================================================
   ALMAR LABORATORIO — chat de MIA
   --------------------------------------------------------------------------
   EDITA AQUÍ el guion del asistente. MIA es una MAQUETA: no consulta nada,
   no llama a ninguna IA y no guarda la conversación. Responde con el texto
   fijo de la primera entrada de 'respuestas' cuya clave aparezca en el
   mensaje del paciente; si ninguna coincide, contesta 'respaldo'.

   Las claves se comparan sin acentos ni mayúsculas (js/principal.js las pasa
   por normalizar()), así que escríbelas en minúscula y sin acentos.

   Los datos que se citan aquí salen de js/datos-sucursales.js. Si cambian
   allá, cámbialos también aquí.
   ========================================================================== */

const CHAT_MIA = {
  nombre: 'MIA',
  rol: 'Asistente de IA',
  estado: 'En línea',

  saludo: '¡Hola! Soy MIA, la asistente de IA de ALMAR Laboratorio. ' +
          'Puedo orientarte sobre estudios, precios, horarios y sucursales.',

  // Pastillas que se ofrecen antes del primer mensaje.
  sugerencias: [
    '¿Qué horarios manejan?',
    '¿Dónde están sus sucursales?',
    '¿Cuánto cuesta un estudio?',
    'Quiero mis resultados'
  ],

  respuestas: [
    {
      claves: ['horario', 'hora', 'abren', 'cierran', 'abierto', 'domingo'],
      texto: 'La Matriz abre de 7:00 am a 7:00 pm y las demás sucursales de ' +
             '7:00 am a 3:00 pm. Centro Médico atiende las 24 horas.'
    },
    {
      claves: ['sucursal', 'direccion', 'donde estan', 'ubicacion', 'llegar', 'mapa'],
      texto: 'Tenemos siete sucursales en la región de Tecamachalco: Matriz, ' +
             'Centro Médico, San Gabriel, Tlacotepec, Huixcolotla, Tepeaca y ' +
             'Los Reyes. En la sección Sucursales está la dirección de cada una ' +
             'con su enlace a Google Maps.'
    },
    {
      claves: ['precio', 'cuesta', 'costo', 'cuanto', 'tarifa'],
      texto: 'Cada estudio tiene su precio publicado en el catálogo de esta ' +
             'página. Búscalo por nombre o código y toca el renglón para ver el ' +
             'precio, la entrega y todo lo que incluye.'
    },
    {
      claves: ['resultado', 'entrega', 'listo', 'cuando'],
      texto: 'El tiempo de entrega aparece en la ficha de cada estudio. Para ' +
             'recoger o consultar tus resultados, llama a la sucursal donde te ' +
             'tomaron la muestra.'
    },
    {
      claves: ['ayuno', 'preparacion', 'comer', 'prepararme'],
      texto: 'Los estudios que piden ayuno llevan un reloj ámbar en el catálogo. ' +
             'Abre la ficha del estudio y ahí viene la preparación completa, ' +
             'renglón por renglón.'
    },
    {
      claves: ['cita', 'agendar', 'apartar', 'reservar'],
      texto: 'Los estudios de rutina no necesitan cita: llega en el horario de ' +
             'la sucursal. Para paquetes o toma a domicilio, llámanos al ' +
             '249-422-4054 y te confirmamos horario.'
    },
    {
      claves: ['domicilio', 'casa', 'a domicilio'],
      texto: 'Sí hacemos toma de muestras a domicilio desde las siete ' +
             'sucursales. Llámanos al 249-422-4054 para confirmar cobertura y ' +
             'horario en tu zona.'
    },
    {
      claves: ['telefono', 'llamar', 'contacto', 'numero', 'whatsapp'],
      texto: 'Puedes llamarnos a la Matriz al 249-422-4054 o al 249-422-0913. ' +
             'Centro Médico responde las 24 horas al 249-422-6598.'
    },
    {
      claves: ['factura', 'facturacion', 'recibo'],
      texto: 'Para tu factura, acércate a la sucursal donde pagaste o llámanos ' +
             'al 249-422-4054 con tus datos fiscales a la mano.'
    },
    {
      claves: ['gracias', 'muchas gracias', 'ok gracias'],
      texto: '¡Con gusto! Si te queda otra duda, aquí sigo.'
    },
    {
      claves: ['hola', 'buenas', 'buenos dias', 'buenas tardes', 'que tal'],
      texto: '¡Hola! ¿En qué te ayudo? Puedo orientarte sobre estudios, ' +
             'precios, horarios o sucursales.'
    }
  ],

  respaldo: 'Todavía estoy aprendiendo y esa no la tengo. Escríbeme de otra ' +
            'forma o llámanos al 249-422-4054 y te atiende una persona del ' +
            'laboratorio.'
};
