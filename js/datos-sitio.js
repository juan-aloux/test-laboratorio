/* ==========================================================================
   ALMAR LABORATORIO — contenido de secciones
   --------------------------------------------------------------------------
   Los bloques que se repiten dentro de una misma sección: los pasos de
   la lista de servicios y las columnas del pie.

   Los valores entre corchetes son MARCADORES: sustitúyelos por los datos
   reales de ALMAR antes de publicar.
   ========================================================================== */


/* Servicios disponibles en todas las sucursales.
   'icono' es una clave de ICONOS. 'foto' y 'alt' son la imagen de la tarjeta.
   Las fotos viven en img/servicios/ en 16:9 (1200×669 px); si reemplazas
   alguna, respeta la proporción y el nombre del archivo. */
const SERVICIOS = [
  {
    icono: 'tubo',
    foto: 'img/servicios/analisis-clinicos.jpg',
    alt: 'Tubos de muestra etiquetados en el área de procesamiento',
    titulo: 'Análisis clínicos',
    texto: 'Química sanguínea, biometría, perfiles hormonales y pruebas especiales.'
  },
  {
    icono: 'corazon',
    foto: 'img/servicios/electrocardiograma.jpg',
    alt: 'Electrodos colocados en el tórax de un paciente durante un electrocardiograma',
    titulo: 'Electrocardiogramas',
    texto: 'Registro de la actividad eléctrica del corazón en reposo.'
  },
  {
    icono: 'colposcopia',
    foto: 'img/servicios/colposcopia.jpg',
    alt: 'Colposcopio en el consultorio de exploración',
    titulo: 'Colposcopías',
    texto: 'Revisión ampliada del cuello uterino para detección oportuna.'
  },
  {
    icono: 'oido',
    foto: 'img/servicios/audiometria.jpg',
    alt: 'Paciente con audífonos dentro de la cabina de audiometría',
    titulo: 'Audiometrías',
    texto: 'Medición del umbral auditivo en cabina, por vía aérea y ósea.'
  },
  {
    icono: 'pulmon',
    foto: 'img/servicios/espirometria.jpg',
    alt: 'Paciente soplando en el espirómetro durante la prueba',
    titulo: 'Espirometrías',
    texto: 'Prueba de capacidad y flujo pulmonar para valorar la respiración.'
  },
  {
    icono: 'bebe',
    foto: 'img/servicios/audiometria-neonatal.jpg',
    alt: 'Recién nacido durante el tamiz auditivo',
    titulo: 'Audiometría neonatal',
    texto: 'Tamiz auditivo para recién nacidos, rápido y sin molestias.'
  },
  {
    icono: 'chat',
    foto: 'img/servicios/asesorias.jpg',
    alt: 'Personal del laboratorio orientando a una paciente en el mostrador',
    titulo: 'Asesorías en servicios',
    texto: 'Te orientamos sobre qué estudio necesitas y cómo prepararte.'
  }
];

/* Enlaces del menú principal. Se usan en la cabecera. */
const NAVEGACION = [
  { texto: 'Estudios',      href: '#estudios' },
  { texto: 'Servicios',     href: '#servicios' },
  { texto: 'Sucursales',    href: '#sucursales' },
  { texto: 'Contacto',      href: '#contacto' }
];
