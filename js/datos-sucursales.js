/* ==========================================================================
   ALMAR LABORATORIO — sucursales
   --------------------------------------------------------------------------
   EDITA AQUÍ para agregar, quitar o corregir una sucursal.
   No hace falta tocar el HTML.

   Campos:
     nombre     Nombre corto, como aparece en el encabezado de la tarjeta.
     principal  true en la Matriz. Le da el recuadro destacado y la insignia.
     insignia   Texto extra de insignia, p. ej. '24 HORAS'. Opcional.
     direccion  Array de líneas. Cada elemento es un renglón de la dirección.
     mapa       Dirección en texto plano para Google Maps. Se codifica sola;
                escríbela legible, sin %20 ni signos +.
     telefonos  Array de { texto, tel }. 'texto' se muestra con guiones,
                'tel' va en el href y lleva solo dígitos.
     horario    Horario de atención.
     abierto24  true solo en Centro Médico. Resalta el horario en verde.
   ========================================================================== */

const SUCURSALES = [
  {
    nombre: 'Matriz',
    principal: true,
    direccion: ['5 Oriente No. 406, Col. Centro', 'C.P. 75482 Tecamachalco, Puebla'],
    mapa: '5 Oriente 406, Centro, 75482 Tecamachalco, Puebla',
    telefonos: [
      { texto: '249-422-4054', tel: '2494224054' },
      { texto: '249-422-0913', tel: '2494220913' }
    ],
    horario: '7:00 am a 7:00 pm'
  },
  {
    nombre: 'San Gabriel',
    direccion: ['Av. Manuel Ávila Camacho No. 15'],
    mapa: 'Av. Manuel Avila Camacho 15, San Gabriel, Puebla',
    telefonos: [{ texto: '237-688-0391', tel: '2376880391' }],
    horario: '7:00 am a 3:00 pm'
  },
  {
    nombre: 'Centro Médico',
    insignia: '24 HORAS',
    abierto24: true,
    direccion: ['Av. 6 Sur No. 106, interior Centro Médico', 'C.P. 75482 Tecamachalco, Puebla'],
    mapa: 'Av. 6 Sur 106, Centro, 75482 Tecamachalco, Puebla',
    telefonos: [{ texto: '249-422-6598', tel: '2494226598' }],
    horario: 'Abierto las 24 horas'
  },
  {
    nombre: 'Tlacotepec',
    direccion: ['Carretera Nacional No. 5', 'Tlacotepec, Puebla'],
    mapa: 'Carretera Nacional 5, Tlacotepec, Puebla',
    telefonos: [{ texto: '237-381-6182', tel: '2373816182' }],
    horario: '7:00 am a 3:00 pm'
  },
  {
    nombre: 'Huixcolotla',
    direccion: ['Bulevar 16 de Septiembre No. 903-A', 'Col. Centro Progreso Ote., San Salvador Huixcolotla'],
    mapa: 'Blvd. 16 de Septiembre 903-A, Centro Progreso Oriente, San Salvador Huixcolotla, Puebla',
    telefonos: [{ texto: '249-425-0805', tel: '2494250805' }],
    horario: '7:00 am a 3:00 pm'
  },
  {
    nombre: 'Tepeaca',
    direccion: ['Av. Hidalgo No. 301, Col. Centro', 'Tepeaca, Puebla'],
    mapa: 'Av. Hidalgo 301, Centro, Tepeaca, Puebla',
    telefonos: [{ texto: '223-275-2702', tel: '2232752702' }],
    horario: '7:00 am a 3:00 pm'
  },
  {
    nombre: 'Los Reyes',
    direccion: ['Jesús N. Merino No. 118-C', 'Los Reyes de Juárez, Puebla'],
    mapa: 'Jesus N. Merino 118-C, Los Reyes de Juarez, Puebla',
    telefonos: [{ texto: '249-688-0191', tel: '2496880191' }],
    horario: '7:00 am a 3:00 pm'
  }
];
