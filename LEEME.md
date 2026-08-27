# ALMAR Laboratorio — sitio web

Landing page en HTML, CSS y JavaScript. Sin frameworks, sin dependencias,
sin compilación. Se abre directo en el navegador.

## Estructura

```
sitio/
├── index.html              Solo la lista de secciones. ~75 líneas.
├── css/
│   └── estilos.css         Estilos + responsive (tokens en :root)
├── js/
│   ├── componentes.js      ← EL HTML de cada sección.
│   ├── iconos.js           Los SVG, en un solo lugar
│   ├── estudios.js         ← EL CATÁLOGO. Edita aquí los estudios.
│   ├── datos-sucursales.js ← LAS SUCURSALES.
│   ├── datos-sitio.js      ← Pasos, servicios y enlaces del pie.
│   └── principal.js        Filtros, buscador, menú, validación
└── img/
    ├── logo.png            Logo (recortado, sin margen vacío)
    ├── hero.jpg
    ├── toma-muestra.jpg
    └── consulta.jpg
```

Cada sección de la página es un componente (`<almar-hero>`, `<almar-sucursales>`…).
`index.html` solo los coloca en orden; el contenido vive en `js/componentes.js`.
Los bloques que se repiten —las siete sucursales, los tres pasos, los siete
servicios— salen de archivos de datos, no de HTML copiado y pegado.

Son Web Components nativos, sin Shadow DOM: pintan en el DOM normal, así que
`css/estilos.css` les aplica igual que a cualquier HTML.

## Cómo verlo

Hay que servirlo por http. El doble clic en `index.html` ya no funciona: los
navegadores bloquean los scripts en `file://`, y sin ellos no se pinta nada.

```bash
cd sitio
python3 -m http.server 8000
# abre http://localhost:8000
```

## ANTES DE PUBLICAR: rellena los marcadores

Todo dato entre corchetes es un **marcador** que debes sustituir por el dato
real de ALMAR. Ninguno está inventado — se dejaron a propósito para que no se
publique información falsa.

Para encontrarlos todos:

```bash
grep -rn "\[[A-ZÁÉÍÓÚÑ]" js/
```

| Marcador | Qué poner |
|---|---|
| `[PRECIO]` | Precio de cada estudio (en `js/estudios.js`) |
| `[ENTREGA]` | Tiempo de entrega por estudio (en `js/estudios.js`) |
| `[ZONA DE COBERTURA]` | Cobertura de la toma a domicilio (en `js/datos-sitio.js`) |
| `[PRECIO SUMADO]` | Suma de los estudios del paquete por separado |
| `[TELÉFONO]` | Teléfono. Va también en los `href="tel:..."` |
| `[CORREO]` | Correo. Va también en el `href="mailto:..."` |
| `[DIRECCIÓN COMPLETA]`, `[COLONIA, CIUDAD, CP]` | Domicilio |
| `[HORARIO]` | Horario de atención |
| `[HORARIO DEL PORTAL]` | Disponibilidad del portal de resultados |
| `[N] años`, `[N] estudios`, `[N] horas` | Cifras reales de operación |
| `[NOMBRE, CÉD. PROF.]`, `[NÚMERO]`, `[XX]` | Responsable sanitario e iniciales |
| `[CIUDAD]`, `[ZONA DE COBERTURA]` | Cobertura geográfica |
| `[TESTIMONIO REAL DE UN PACIENTE...]` | Testimonio real, con permiso |
| `[NOMBRE DEL PACIENTE]`, `[FECHA]` | Autor del testimonio |

El `[AÑO]` del pie se rellena solo con JavaScript.

## Mantener el catálogo

Todo vive en `js/estudios.js`. Para agregar un estudio, copia un bloque:

```js
{
  nombre: 'Antígeno prostático específico',
  detalle: 'PSA total y libre',
  categoria: 'sangre',          // sangre | orina | perfiles | hormonas
  preparacion: 'Sin ayuno',
  ayuno: false,                 // true = icono de reloj ámbar
  entrega: '24 horas',
  precio: '$450'
}
```

`categoria` debe coincidir con algún `data-categoria` de los botones de filtro.
Para una categoría nueva, agrega también su botón en el componente
`almar-catalogo`, dentro de `js/componentes.js`.

## Mantener las sucursales

Todo vive en `js/datos-sucursales.js`. Para agregar una, copia un bloque:

```js
{
  nombre: 'Nueva sucursal',
  direccion: ['Calle y número', 'Colonia, Ciudad'],
  mapa: 'Calle 123, Colonia, Ciudad, Puebla',   // texto legible, se codifica solo
  telefonos: [{ texto: '249-000-0000', tel: '2490000000' }],
  horario: '7:00 am a 3:00 pm'
}
```

`mapa` se escribe en texto plano: el enlace de Google Maps se arma solo. En
`telefonos`, `texto` es lo que se ve y `tel` lo que marca el teléfono (solo
dígitos). Campos opcionales: `principal: true` para el recuadro destacado,
`insignia: '24 HORAS'` y `abierto24: true` para resaltar el horario.

## Editar el texto de una sección

Cada sección es un componente en `js/componentes.js`. Busca su nombre
(`almar-hero`, `almar-resultados`, `almar-llamado`…) y edita el texto ahí.
Los iconos se piden por nombre: `I.telefono(16)`, `I.paloma(15, VERDE)`.
Están todos en `js/iconos.js`.

Si agregas una sección nueva, defínela con `componente('almar-loquesea', …)` y
pon su etiqueta en `index.html` donde va.

## Qué hace el JavaScript

- **Filtros del catálogo** por categoría.
- **Buscador del hero**: encuentra sin acentos ("lipidico" → "Perfil lipídico").
- **Menú móvil** con hamburguesa, cierra con Escape.
- **Validación** del formulario de resultados, con mensajes en español.
- **Año** del pie, automático.

El sitio **necesita JavaScript**: al ser componentes, sin JS no se pinta
ninguna sección. Por eso `index.html` lleva un `<noscript>` con los teléfonos y
direcciones de las siete sucursales, para que el contacto siga siendo
alcanzable. Si en algún momento hace falta que la página se vea completa sin
JS, hay que pasar a un generador estático (11ty, Astro) que compile los mismos
datos a HTML plano.

## Pendiente de conectar

El formulario de resultados es **una maqueta**: valida los campos y muestra un
aviso, pero no consulta nada. Para que funcione hay que enlazarlo con el
sistema de resultados de ALMAR (ver el `addEventListener('submit')` al final de
`js/principal.js`).

Los botones "Agendar estudio" apuntan al teléfono. Si hay sistema de citas en
línea, cambia esos `href`.

## Notas de diseño

- Paleta tomada del logo: verde `#02AB02`, lima `#B1D408`, azul `#065A9D`.
  Están como variables CSS en `:root` — cámbialas ahí y se propagan.
- Los botones verdes llevan texto azul marino a propósito: el blanco sobre este
  verde da 3.0:1 de contraste y no cumple accesibilidad.
- Tipografía: Archivo (títulos) y Public Sans (texto), desde Google Fonts.
  Para trabajar sin internet, descárgalas y sírvelas local.
- Probado en escritorio y a 390px de ancho.
