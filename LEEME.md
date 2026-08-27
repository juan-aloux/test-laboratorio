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
│   ├── datos-chat.js       ← EL GUION DE MIA, el chat flotante.
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
| `[HORARIO DEL PORTAL]` | Disponibilidad del portal de resultados |
| `[N] años`, `[N] estudios`, `[N] horas` | Cifras reales de operación |
| `[NOMBRE, CÉD. PROF.]`, `[NÚMERO]`, `[XX]` | Responsable sanitario e iniciales |
| `[CIUDAD]`, `[ZONA DE COBERTURA]` | Cobertura geográfica |
| `[TESTIMONIO REAL DE UN PACIENTE...]` | Testimonio real, con permiso |
| `[NOMBRE DEL PACIENTE]`, `[FECHA]` | Autor del testimonio |

El `[AÑO]` del pie se rellena solo con JavaScript. El bloque CONTACTO del pie
(dirección, teléfono y horario) tampoco tiene marcadores: se rellena con la
sucursal que el visitante elige al entrar — ver "Elección de sucursal".

## Elección de sucursal

Al abrir el sitio aparece un diálogo que pregunta cuál sucursal le queda más
cerca al visitante. No se puede cerrar sin elegir: no tiene botón de cerrar, el
clic en el velo no lo cierra y Escape se ignora.

La respuesta se usa para pintar el bloque CONTACTO del pie — dirección,
teléfono y horario de esa sucursal — que de otro modo no tendría un solo dato
correcto que mostrar, porque hay siete sucursales.

- **Las opciones salen de `js/datos-sucursales.js`.** Agregar o quitar una
  sucursal ahí la agrega o la quita del diálogo. No hay nada que tocar aparte.
- El marcado está en `js/componentes.js`, componente `almar-sucursal-modal`.
- La lógica está al final de `js/principal.js`, sección "Elección de sucursal".
- Los estilos reusan el modal del catálogo (`.modal`, `.modal__velo`,
  `.modal__panel`); en `css/estilos.css` solo se agregan las clases
  `.eleccion__*`.

**La elección no se guarda.** Vive en memoria: al recargar se vuelve a
preguntar. Si algún día conviene recordarla, el cambio es guardar el índice en
`localStorage` dentro de `elegirSucursal()` y leerlo antes de abrir el diálogo.

El horario del pie lleva "Lun a Sáb" adelante, salvo en las sucursales con
`abierto24: true`, donde el texto ya dice "Abierto las 24 horas". Los datos no
traen horario de domingo, así que ese renglón no se pinta.

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

## El chat de MIA

En la esquina inferior derecha vive un chat flotante con **MIA**, presentada
como asistente de IA de ALMAR. Es una **maqueta**: no hay servidor, no hay
modelo detrás y la conversación **no se guarda** — al recargar la página el
hilo vuelve a estar vacío.

Cómo responde: busca en `js/datos-chat.js` la primera entrada de `respuestas`
cuya clave aparezca en el mensaje del paciente; si ninguna coincide, contesta
con `respaldo`. Las claves se comparan sin acentos ni mayúsculas, así que
escríbelas en minúscula y sin acentos.

```js
{
  claves: ['horario', 'abren', 'cierran'],
  texto: 'La Matriz abre de 7:00 am a 7:00 pm…'
}
```

También ahí se editan el `saludo` y las cuatro `sugerencias` que salen como
pastillas antes del primer mensaje. Los datos que cita MIA (horarios,
teléfonos) están copiados de `js/datos-sucursales.js`: si cambian allá,
cámbialos también aquí.

La burbuja late todo el tiempo con un anillo verde, y cada 10 segundos su icono
cambia a uno de conversación durante 2 segundos, para invitar al clic. Con
"reducir movimiento" activado en el sistema, se queda quieta, sin anillo y sin
cambio de icono.

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

El chat de MIA es **una maqueta**: responde con el guion fijo de
`js/datos-chat.js` y no consulta ningún servicio. Para conectarlo con una IA o
con un agente real, hay que sustituir `chatResponder()` en `js/principal.js`
por una llamada al backend.

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
