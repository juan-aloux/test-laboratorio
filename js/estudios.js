/* ==========================================================================
   ALMAR LABORATORIO — catálogo de estudios
   --------------------------------------------------------------------------
   ESTE ES EL ARCHIVO QUE HAY QUE EDITAR para mantener el catálogo.
   No hace falta tocar el HTML ni principal.js.

   Campos de cada estudio:
     clave        Identificador único dentro del catálogo. Es el código del
                  sistema; cuando ese código es un número suelto y se repite,
                  se usa la abreviatura para que la clave siga siendo legible.
     codigo       Código tal como aparece en el sistema del laboratorio.
     tipo         'Paquetes' | 'Perfiles'
     nombre       Nombre del análisis tal como aparece en la orden médica.
     precio       Importe al público, en pesos y como número.
                  0 significa "Consultar" (precio aún sin publicar).
     entrega      Tiempo de proceso.
     muestra      Categoría del filtro, derivada del tipo de muestra:
                  'sangre' | 'orina' | 'heces' | 'exudados' | 'otros'
     indicaciones Preparación requerida, una entrada por línea.
                  Arreglo vacío si el estudio no pide preparación especial.
     incluye      Estudios que trae el paquete, agrupados:
                  { grupo: 'NOMBRE DEL ESTUDIO', pruebas: ['...', '...'] }
                  El grupo 'Pruebas' es el genérico del sistema: agrupa
                  determinaciones sueltas que no pertenecen a un estudio con
                  nombre propio, y por eso el modal lo pinta sin encabezado.
     tiposMuestra Recipientes en los que se recibe la muestra.

   El icono de ayuno del catálogo NO se guarda aquí: principal.js lo deduce
   buscando la palabra "ayuno" dentro de las indicaciones.
   ========================================================================== */

const ESTUDIOS = [
  {
    clave: 'SINOVIAL',
    codigo: 'SINOVIAL',
    tipo: 'Paquetes',
    nombre: 'ANÁLISIS CITOLÓGICO Y CITOQUÍMICO DE LÍQUIDO SINOVIAL',
    precio: 1309,
    entrega: '1 día',
    muestra: 'otros',
    indicaciones: [],
    incluye: [
      {
        grupo: 'CITOQUÍMICO DE LÍQUIDO SINOVIAL',
        pruebas: ['SITIO ANATÓMICO', 'VOLUMEN RECIBIDO', 'DIAGNÓSTICO PRESUNTIVO', 'COLOR', 'ASPECTO', 'VISCOSIDAD', 'COÁGULO DE FIBRINA', 'LEUCOCITOS', 'ERITROCITOS', 'NEUTRÓFILOS/PMN', 'MONONUCLEARES', 'CRISTALES', 'CÉLULAS ATÍPICAS', 'PROTEÍNAS TOTALES', 'GLUCOSA', 'DHL', 'ÁCIDO ÚRICO', 'pH', 'PROTEINA C REACTIVA', 'LEVADURAS', 'TINCIÓN DE GRAM', 'TINCION DE ZIEHL NEELSEN']
      },
      { grupo: 'Pruebas', pruebas: ['PAPANICOLAOU EN BASE LIQUIDA'] }
    ],
    tiposMuestra: ['Otras', 'Frasco — líquido sinovial', 'Frasco — muestras diversas', 'Medio de transporte — Femprevence']
  },
  {
    clave: 'CITLIQDIVER',
    codigo: 'CITLIQDIVER',
    tipo: 'Paquetes',
    nombre: 'ANÁLISIS CITOLÓGICO Y CITOQUÍMICO DE LÍQUIDOS DE ORIGEN DIVERSO',
    precio: 1250,
    entrega: '1 día',
    muestra: 'otros',
    indicaciones: [
      'Muestra: Líquido biológico obtenido mediante punción, aspiración o drenaje, utilizando técnica aséptica y evitando la contaminación de la muestra. Indicar espécimen, sospecha diagnóstica y hora de la toma.',
      'Recipiente: Enviar en recipiente o tubo estéril. Para estudios citológicos y recuento celular se recomienda tubo con EDTA; para análisis citoquímico, tubo estéril sin aditivos, cuando sea posible.',
      'Volumen: Preferentemente 5–10 mL; el volumen mínimo dependerá de los estudios solicitados.',
      'Transporte: Remitir la muestra al laboratorio inmediatamente después de su obtención, correctamente identificada e indicando el sitio anatómico de origen.',
      'Conservación: Procesar lo antes posible. Si existe retraso, conservar refrigerada entre 2 y 8 °C. No congelar.',
      'Criterios de rechazo: Muestras mal identificadas, en recipientes inadecuados o no estériles, con volumen insuficiente, derramadas, con contaminación evidente o cuya conservación comprometa la calidad del análisis.'
    ],
    incluye: [
      {
        grupo: 'Pruebas',
        pruebas: ['CITOLOGICO DE LIQUIDOS SEROSOS', 'LEVADURAS', 'TINCIÓN DE GRAM', 'TINCION DE ZIEHL NEELSEN', 'TIPO DE MUESTRA', 'SITIO ANATÓMICO', 'DIAGNÓSTICO PRESUNTIVO', 'COLOR', 'ASPECTO', 'VOLUMEN RECIBIDO', 'TURBIDEZ', 'PH', 'PROTEÍNAS', 'GLUCOSA', 'DESHIDROGENASA LÁCTICA (DHL)', 'AMILASA', 'PROTEINA C REACTIVA', 'LEUCOCITOS', 'ERITROCÍTOS', 'NEUTRÓFILOS', 'LINFOCITOS', 'MACRÓFAGOS', 'OBSERVACION MICROSCÓPICA']
      }
    ],
    tiposMuestra: ['Otras', 'Frasco — muestras diversas']
  },
  {
    clave: 'CheckInf',
    codigo: 'CheckInf',
    tipo: 'Paquetes',
    nombre: 'Check Up Infantil',
    precio: 997,
    entrega: '8 hrs',
    muestra: 'sangre',
    indicaciones: [
      'Ayuno mínimo de 8 horas.',
      'El paciente debe presentarse en ayunas, preferentemente sin haberse realizado aseo dental ni gargarismos.',
      'No debe estar bajo tratamiento antimicrobiano, a menos que lo indique el médico, o debe haber terminado una semana antes.',
      'Recolectar las muestras del tamaño de una nuez en frascos separados, rotular con marcador permanente la fecha de toma y mantener en refrigeración hasta entregarlas en el laboratorio.',
      'Primera orina de la mañana o pasadas 2 horas después de la última micción, recolectar por chorro medio.'
    ],
    incluye: [
      {
        grupo: 'CITOMETRIA HEMATICA COMPLETA',
        pruebas: ['GLOBULOS ROJOS', 'HEMOGLOBINA', 'HEMATOCRITO', 'VOLUMEN GLOBULAR MEDIO', 'HCM', 'CMHC', 'RDW', 'PLAQUETAS', 'VOLUMEN PLAQUETARIO MEDIO', 'LEUCOCITOS TOTALES', 'NEUTROFILOS', 'BANDAS', 'LINFOCITOS', 'MONOCITOS', 'EOSINOFILOS', 'BASOFILOS', 'METAMIELOCITOS', 'MIELOCITOS', 'PROMIELOCITOS', 'BLASTOS', 'OBSERVACIONES EN ERITROCITOS', 'OBSERVACIONES EN LEUCOCITOS', 'OBSERVACIONES EN PLAQUETAS']
      },
      { grupo: 'COPROPARASITOSCOPICO 1, 2 Y 3 MUESTRAS', pruebas: ['COPROPARASITOSCOPICO 1 MUESTRA', 'COPROPARASITOSCOPICO 2 MUESTRA', 'COPROPARASITOSCOPICO 3 MUESTRA'] },
      {
        grupo: 'EXAMEN GENERAL DE ORINA',
        pruebas: ['COLOR', 'ASPECTO', 'DENSIDAD', 'PH', 'GLUCOSA', 'PROTEINAS', 'CUERPOS CETONICOS', 'BILIRRUBINA', 'UROBILINOGENO', 'NITRITOS', 'LEUCOCITOS ESTERASA', 'HEMOGLOBINA', 'CELULAS URETRALES', 'CELULAS UROTELIALES', 'CELULAS RENALES', 'LEUCOCITOS', 'PIOCITOS', 'ERITROCITOS', 'BACTERIAS', 'FILAMENTOS DE MUCINA', 'CILINDROS', 'BLASTOCONIDIOS', 'CRISTALES', 'SALES AMORFAS', 'OTROS']
      },
      { grupo: 'Pruebas', pruebas: ['EXUDADO FARINGEO'] },
      { grupo: 'QUIMICA SANGUINEA 7 ELEMENTOS', pruebas: ['GLUCOSA', 'UREA', 'BUN', 'CREATININA', 'ACIDO URICO', 'COLESTEROL', 'TRIGLICERIDOS', 'ASPECTO DEL SUERO', 'AYUNO DEL PACIENTE'] }
    ],
    tiposMuestra: ['Frasco — heces', 'Frasco — orina', 'Lila — plasma EDTA', 'Stuart — exudado faríngeo', 'Tubo lila — sangre total', 'Tubo oro — suero', 'Tubo rojo — suero']
  },
  {
    clave: 'CITOMOCNAS',
    codigo: 'CITOMOCNAS',
    tipo: 'Paquetes',
    nombre: 'CITOLOGÍA DE MOCO NASAL',
    precio: 150,
    entrega: '8 hrs',
    muestra: 'exudados',
    indicaciones: [
      'Suspender antihistamínicos 48–72 horas previas y evitar corticoesteroides nasales o sistémicos al menos 5–7 días antes, si la condición clínica lo permite.',
      'No utilizar descongestionantes ni realizar lavados nasales en las 12 horas previas.',
      'Se recomienda no acudir con infección respiratoria aguda y realizar el estudio en fase sintomática.'
    ],
    incluye: [
      { grupo: 'CITOLOGÍA DE MOCO NASAL (FOSA DERECHA)', pruebas: ['LEUCOCITOS', 'POLIMORFONUCLEARES', 'MONONUCLEARES', 'EOSINÓFILOS'] },
      { grupo: 'CITOLOGÍA DE MOCO NASAL (FOSA IZQUIERDA)', pruebas: ['LEUCOCITOS', 'POLIMORFONUCLEARES', 'MONONUCLEARES', 'EOSINÓFILOS'] }
    ],
    tiposMuestra: ['Laminilla — exudado de mucosas']
  },
  {
    clave: 'CITOQDIAL',
    codigo: 'CITOQDIAL',
    tipo: 'Paquetes',
    nombre: 'CITOQUIMICO DE LIQUIDO DE DIALISIS',
    precio: 441,
    entrega: '2 días',
    muestra: 'orina',
    indicaciones: [],
    incluye: [
      { grupo: 'EXAMEN FÍSICO', pruebas: ['ASPECTO', 'REACCIÓN'] },
      { grupo: 'EXAMEN MICROSCOPICO', pruebas: ['LEUCOCITOS', 'LINFOCITOS', 'NEUTROFILOS', 'LEVADURAS', 'TINCIÓN DE GRAM', 'TINCION DE ZIEHL NEELSEN'] },
      { grupo: 'EXAMEN QUÍMICO', pruebas: ['GLUCOSA', 'pH', 'DENSIDAD', 'PROTEÍNAS TOTALES', 'AMILASA', 'PROTEINA C REACTIVA'] },
      { grupo: 'Pruebas', pruebas: ['CITOQUIMICO DE LIQUIDO DE DIALISIS'] }
    ],
    tiposMuestra: ['Otras', 'Frasco — orina']
  },
  {
    clave: 'CITQUIPL',
    codigo: 'CITQUIPL',
    tipo: 'Paquetes',
    nombre: 'CITOQUÍMICO DE LÍQUIDO PLEURAL',
    precio: 525,
    entrega: '2 días',
    muestra: 'otros',
    indicaciones: ['Frasco estéril.'],
    incluye: [
      { grupo: 'CITOQUÍMICO DE LIQUIDO PLEURAL', pruebas: ['MUESTRA'] },
      { grupo: 'EXAMEN FÍSICO', pruebas: ['COAGULO DE FIBRINA', 'COLOR', 'ASPECTO'] },
      { grupo: 'EXAMEN MICROSCÓPICO', pruebas: ['LEUCOCITOS', 'LINFOCITOS', 'MONOCITOS', 'POLIMORFONUCLEARES', 'TINCIÓN DE GRAM', 'TINCIÓN DE TINTA CHINA'] },
      { grupo: 'EXAMEN QUÍMICO', pruebas: ['GLUCOSA', 'PROTEÍNAS TOTALES', 'COLESTEROL', 'DESHIDROGENASA LACTICA', 'AMILASA', 'pH'] }
    ],
    tiposMuestra: ['Otras']
  },
  {
    clave: 'COPROLO',
    codigo: 'COPROLO',
    tipo: 'Paquetes',
    nombre: 'COPROLOGICO 1 MUESTRA',
    precio: 714,
    entrega: '8 hrs',
    muestra: 'heces',
    indicaciones: ['Recolectar 5 a 10 g de heces en frasco de boca ancha. Entregar la muestra con nombre completo del paciente y fecha de toma.'],
    incluye: [
      { grupo: 'EXAMEN MACROSCOPICO', pruebas: ['COLOR', 'CONSISTENCIA', 'OLOR', 'RESTOS ALIMENTICIOS', 'MOCO', 'PARASITOS', 'CUERPOS EXTRAÑOS'] },
      { grupo: 'EXAMEN MICROSCOPICO', pruebas: ['FIBRAS MUSCULARES', 'FIBRAS VEGETALES', 'GRASAS NEUTRAS', 'LEUCOCITOS', 'ERITROCITOS', 'BLASTOCONIDIOS', 'CRISTALES', 'PARASITOS'] },
      { grupo: 'EXAMEN QUIMICO', pruebas: ['PH', 'AZUCARES REDUCTORES', 'SANGRE OCULTA EN HECES', 'TRANSFERRINA EN HECES'] }
    ],
    tiposMuestra: ['Frasco — heces']
  },
  {
    clave: 'CDE',
    codigo: 'CDE',
    tipo: 'Paquetes',
    nombre: 'CULTIVO DE',
    precio: 472,
    entrega: '6 días',
    muestra: 'exudados',
    indicaciones: ['No debe estar bajo tratamiento antimicrobiano, a menos que lo indique el médico, o debe haber terminado una semana antes.'],
    incluye: [
      { grupo: 'CULTIVO', pruebas: ['CULTIVO'] },
      { grupo: 'ESPÉCIMEN', pruebas: ['ESPÉCIMEN'] },
      { grupo: 'TINCION DE GRAM', pruebas: ['TINCION DE GRAM'] }
    ],
    tiposMuestra: ['Otras', 'Frasco — muestras diversas', 'Stuart — exudado']
  },
  {
    clave: 'CULEXVULVAR',
    codigo: 'CULEXVULVAR',
    tipo: 'Paquetes',
    nombre: 'CULTIVO DE EXUDADO VULVAR',
    precio: 525,
    entrega: '4 días',
    muestra: 'exudados',
    indicaciones: [
      'No debe estar bajo tratamiento antimicrobiano, a menos que lo indique el médico, o debe haber terminado una semana antes.',
      'No aplicar óvulos, cremas o pomadas vaginales al menos 5 días antes.',
      'Bañarse preferentemente antes de la toma de muestra.',
      'Dejar pasar al menos 5 días después del término del periodo menstrual.',
      'Abstinencia sexual de 3 días.',
      'No haber orinado al menos 3 horas antes de la toma.'
    ],
    incluye: [
      { grupo: 'CARACTERISTICAS DE LA SECRECION', pruebas: ['PRUEBA DE AMINAS', 'pH'] },
      { grupo: 'EXAMEN EN FRESCO', pruebas: ['CELULAS EPITELIALES', 'CELULAS CLAVE', 'MOBILUNCUS SP.', 'LEUCOCITOS', 'ERITROCITOS', 'BACTERIAS', 'BLASTOCONIDIOS', 'TRICHOMONAS VAGINALIS'] },
      { grupo: 'Pruebas', pruebas: ['EXUDADO VULVAR', 'TINCION DE GRAM'] }
    ],
    tiposMuestra: ['Otras', 'Frasco — muestras diversas', 'Stuart — exudado']
  },
  {
    clave: 'ESINTASC',
    codigo: 'ESINTASC',
    tipo: 'Paquetes',
    nombre: 'ESTUDIO INTEGRAL LÍQUIDO DE ASCITIS',
    precio: 400,
    entrega: '8 hrs',
    muestra: 'otros',
    indicaciones: [],
    incluye: [
      { grupo: 'CITOLÓGICO DE LÍQUIDO DE ASCITIS', pruebas: ['POLIMORFONUCLEARES', 'LINFOCITOS', 'CÉLULAS MESOTELIALES', 'MACRÓFAGOS', 'ERITROCITOS'] },
      { grupo: 'RECUENTO CELULAR DE LÍQUIDO DE ASCITIS', pruebas: ['RECUENTO CELULAR ABSOLUTO', 'POLIMORFONUCLEARES', 'MONONUCLEARES'] }
    ],
    tiposMuestra: ['Otras']
  },
  {
    clave: 'EXUVAG',
    codigo: 'EXUVAG',
    tipo: 'Paquetes',
    nombre: 'EXUDADO VAGINAL',
    precio: 682,
    entrega: '4 días',
    muestra: 'exudados',
    indicaciones: [
      'No debe estar bajo tratamiento antimicrobiano, a menos que lo indique el médico, o debe haber terminado una semana antes.',
      'No aplicar óvulos, cremas o pomadas vaginales al menos 5 días antes.',
      'Bañarse preferentemente antes de la toma de muestra.',
      'Dejar pasar al menos 5 días después del término del periodo menstrual.',
      'Abstinencia sexual de 3 días.',
      'No haber orinado al menos 3 horas antes de la toma.'
    ],
    incluye: [
      { grupo: 'CARACTERISTICAS DE LA SECRECION', pruebas: ['PRUEBA DE AMINAS', 'pH'] },
      { grupo: 'EXAMEN EN FRESCO', pruebas: ['CELULAS EPITELIALES', 'CELULAS CLAVE', 'MOBILUNCUS SP.', 'LEUCOCITOS', 'ERITROCITOS', 'BACTERIAS', 'BLASTOCONIDIOS', 'TRICHOMONAS VAGINALIS'] },
      { grupo: 'EXUDADO VAGINAL', pruebas: ['TINCION DE GRAM', 'CULTIVO VAGINAL', 'IDENTIFICACION DE MYCOPLASMA', 'IDENTIFICACION DE UREAPLASMA', 'Detección de Chlamydia trachomatis'] }
    ],
    tiposMuestra: ['Otras', 'Exudado — UTM', 'Frasco — muestras diversas', 'Stuart — exudado vaginal', 'Tubo estéril sin conservador']
  },
  {
    clave: 'PNEFR2',
    codigo: 'PNEFR2',
    tipo: 'Paquetes',
    nombre: 'PANEL VIRAL NEFROLOGÍA 2',
    precio: 2793,
    entrega: '2 días',
    muestra: 'sangre',
    indicaciones: [],
    incluye: [
      { grupo: 'PANEL VIRAL 2', pruebas: ['ANTICUERPOS ANTI HEPATITIS C (CUANTITATIVOS)', 'ANTICUERPOS ANTI P24 (GAG)', 'Anticuerpos anti VIH', 'AG. S DE HEPATITIS B (AUSTRALIA)'] },
      { grupo: 'Pruebas', pruebas: ['ANTICUERPOS CONTRA ANTÍGENO CORE DEL VIRUS DE HEPATITIS B TOTALES', 'ANTICUERPOS ANTI ANTIGENO S DE HEPATITIS B'] }
    ],
    tiposMuestra: ['Tubo oro — suero', 'Tubo rojo — suero']
  },
  {
    clave: 'PaqPrenatal',
    codigo: 'PaqPrenatal',
    tipo: 'Paquetes',
    nombre: 'PAQUETE PRENATAL',
    precio: 859,
    entrega: '8 hrs',
    muestra: 'sangre',
    indicaciones: [],
    incluye: [
      {
        grupo: 'CITOMETRIA HEMATICA COMPLETA',
        pruebas: ['GLOBULOS ROJOS', 'HEMOGLOBINA', 'HEMATOCRITO', 'VOLUMEN GLOBULAR MEDIO', 'HCM', 'CMHC', 'RDW', 'PLAQUETAS', 'VOLUMEN PLAQUETARIO MEDIO', 'LEUCOCITOS TOTALES', 'NEUTROFILOS', 'BANDAS', 'LINFOCITOS', 'MONOCITOS', 'EOSINOFILOS', 'BASOFILOS', 'METAMIELOCITOS', 'MIELOCITOS', 'PROMIELOCITOS', 'BLASTOS', 'OBSERVACIONES EN ERITROCITOS', 'OBSERVACIONES EN LEUCOCITOS', 'OBSERVACIONES EN PLAQUETAS']
      },
      {
        grupo: 'EXAMEN GENERAL DE ORINA',
        pruebas: ['COLOR', 'ASPECTO', 'DENSIDAD', 'PH', 'GLUCOSA', 'PROTEINAS', 'CUERPOS CETONICOS', 'BILIRRUBINA', 'UROBILINOGENO', 'NITRITOS', 'LEUCOCITOS ESTERASA', 'HEMOGLOBINA', 'CELULAS URETRALES', 'CELULAS UROTELIALES', 'CELULAS RENALES', 'LEUCOCITOS', 'PIOCITOS', 'ERITROCITOS', 'BACTERIAS', 'FILAMENTOS DE MUCINA', 'CILINDROS', 'BLASTOCONIDIOS', 'CRISTALES', 'SALES AMORFAS', 'OTROS']
      },
      { grupo: 'PRUEBA PRESUNTIVA PARA DETECCION DE VIH', pruebas: ['ANTIGENO P24', 'ANTICUERPOS ANTI-VIH TOTALES'] },
      { grupo: 'Pruebas', pruebas: ['VDRL'] },
      { grupo: 'QUIMICA SANGUINEA DE 6 ELEMENTOS', pruebas: ['GLUCOSA', 'CREATININA', 'UREA', 'BUN', 'COLESTEROL', 'ACIDO URICO', 'ASPECTO DEL SUERO', 'AYUNO DEL PACIENTE'] }
    ],
    tiposMuestra: ['Frasco — orina', 'Lila — plasma EDTA', 'Tubo lila — sangre total', 'Tubo oro — suero', 'Tubo rojo — suero']
  },
  {
    clave: 'Coag2',
    codigo: 'Coag2',
    tipo: 'Paquetes',
    nombre: 'PERFIL COAGULACIÓN BASICO',
    precio: 273,
    entrega: '6 hrs',
    muestra: 'sangre',
    indicaciones: [],
    incluye: [
      { grupo: 'Pruebas', pruebas: ['TIEMPO DE PROTROMBINA', 'TIEMPO DE TROMBOPLASTINA PARCIALMENTE ACTIVADA', 'TP PACIENTE NORMAL', 'INR', 'PACIENTE TESTIGO TTP'] }
    ],
    tiposMuestra: ['Tubo azul — plasma citratado']
  },
  {
    clave: 'PAQCOAG',
    codigo: 'PAQCOAG',
    tipo: 'Paquetes',
    nombre: 'PERFIL DE COAGULACION',
    precio: 630,
    entrega: '8 hrs',
    muestra: 'sangre',
    indicaciones: ['Ayuno mínimo de 4 horas.'],
    incluye: [
      { grupo: 'Pruebas', pruebas: ['FIBRINOGENO', 'TIEMPO DE PROTROMBINA', 'TIEMPO DE TROMBOPLASTINA PARCIALMENTE ACTIVADA', 'TP PACIENTE NORMAL', 'INR', 'TIEMPO DE TROMBINA'] }
    ],
    tiposMuestra: ['Tubo azul — plasma citratado']
  },
  {
    clave: 'PCRETSAVANZADO',
    codigo: 'PCRETSAVANZADO',
    tipo: 'Paquetes',
    nombre: 'PERFIL DE ENFERMEDADES DE TRANSMISIÓN SEXUAL AVANZADO + VPH GENOTIPOS ALTO RIESGO',
    precio: 3400,
    entrega: '7 días',
    muestra: 'exudados',
    indicaciones: [],
    incluye: [
      { grupo: 'Detección de Mycoplasma por PCR', pruebas: ['Mycoplasma genitalium', 'Mycoplasma hominis'] },
      { grupo: 'Detección de Ureaplasma por PCR', pruebas: ['Ureaplasma urealyticum', 'Ureaplasma parvum'] },
      { grupo: 'GENOTIPOS DE ALTO RIESGO', pruebas: ['GENOTIPO 16', 'GENOTIPO 18', 'GENOTIPO 26', 'GENOTIPO 31', 'GENOTIPO 33', 'GENOTIPO 35', 'GENOTIPO 39', 'GENOTIPO 45', 'GENOTIPO 51', 'GENOTIPO 52', 'GENOTIPO 53', 'GENOTIPO 56', 'GENOTIPO 58', 'GENOTIPO 59', 'GENOTIPO 66', 'GENOTIPO 68', 'GENOTIPO 69', 'GENOTIPO 73', 'GENOTIPO 82', 'MUESTRA'] },
      { grupo: 'Pruebas', pruebas: ['Chlamydia Trachomatis PCR', 'Neisseria Gonorrhoeae por PCR'] },
      { grupo: 'Trichomonas vaginalis por PCR', pruebas: ['Trichomonas vaginalis'] }
    ],
    tiposMuestra: ['Otras', 'Exudado — UTM', 'Hisopo — exudado cervical', 'Medio de transporte — Femprevence']
  },
  {
    clave: 'PMATER1',
    codigo: 'PMATER1',
    tipo: 'Paquetes',
    nombre: 'PERFIL MATERNIDAD 1',
    precio: 865,
    entrega: '8 hrs',
    muestra: 'sangre',
    indicaciones: [
      'Ayuno mínimo de 8 horas, máximo de 12 horas.',
      'Recolectar primera orina de la mañana por técnica de chorro medio, previo aseo, y entregar en menos de dos horas al laboratorio después de la recolección.'
    ],
    incluye: [
      {
        grupo: 'CITOMETRIA HEMATICA COMPLETA',
        pruebas: ['GLOBULOS ROJOS', 'HEMOGLOBINA', 'HEMATOCRITO', 'VOLUMEN GLOBULAR MEDIO', 'HCM', 'CMHC', 'RDW', 'PLAQUETAS', 'VOLUMEN PLAQUETARIO MEDIO', 'LEUCOCITOS TOTALES', 'NEUTROFILOS', 'BANDAS', 'LINFOCITOS', 'MONOCITOS', 'EOSINOFILOS', 'BASOFILOS', 'METAMIELOCITOS', 'MIELOCITOS', 'PROMIELOCITOS', 'BLASTOS', 'OBSERVACIONES EN ERITROCITOS', 'OBSERVACIONES EN LEUCOCITOS', 'OBSERVACIONES EN PLAQUETAS']
      },
      {
        grupo: 'EXAMEN GENERAL DE ORINA',
        pruebas: ['COLOR', 'ASPECTO', 'DENSIDAD', 'PH', 'GLUCOSA', 'PROTEINAS', 'CUERPOS CETONICOS', 'BILIRRUBINA', 'UROBILINOGENO', 'NITRITOS', 'LEUCOCITOS ESTERASA', 'HEMOGLOBINA', 'CELULAS URETRALES', 'CELULAS UROTELIALES', 'CELULAS RENALES', 'LEUCOCITOS', 'PIOCITOS', 'ERITROCITOS', 'BACTERIAS', 'FILAMENTOS DE MUCINA', 'CILINDROS', 'BLASTOCONIDIOS', 'CRISTALES', 'SALES AMORFAS', 'OTROS']
      },
      { grupo: 'PRUEBA PRESUNTIVA PARA DETECCION DE VIH', pruebas: ['ANTIGENO P24', 'ANTICUERPOS ANTI-VIH TOTALES'] },
      { grupo: 'Pruebas', pruebas: ['VDRL'] },
      { grupo: 'QUIMICA SANGUINEA 7 ELEMENTOS', pruebas: ['GLUCOSA', 'UREA', 'BUN', 'CREATININA', 'ACIDO URICO', 'COLESTEROL', 'TRIGLICERIDOS', 'ASPECTO DEL SUERO', 'AYUNO DEL PACIENTE'] }
    ],
    tiposMuestra: ['Frasco — orina', 'Lila — plasma EDTA', 'Tubo lila — sangre total', 'Tubo oro — suero', 'Tubo rojo — suero']
  },
  {
    clave: 'PMATER2',
    codigo: 'PMATER2',
    tipo: 'Paquetes',
    nombre: 'PERFIL MATERNIDAD 2',
    precio: 1080,
    entrega: '8 hrs',
    muestra: 'sangre',
    indicaciones: [
      'Ayuno mínimo de 8 horas, máximo de 12 horas.',
      'Recolectar primera orina de la mañana por técnica de chorro medio, previo aseo, y entregar en menos de dos horas al laboratorio después de la recolección.'
    ],
    incluye: [
      {
        grupo: 'CITOMETRIA HEMATICA COMPLETA',
        pruebas: ['GLOBULOS ROJOS', 'HEMOGLOBINA', 'HEMATOCRITO', 'VOLUMEN GLOBULAR MEDIO', 'HCM', 'CMHC', 'RDW', 'PLAQUETAS', 'VOLUMEN PLAQUETARIO MEDIO', 'LEUCOCITOS TOTALES', 'NEUTROFILOS', 'BANDAS', 'LINFOCITOS', 'MONOCITOS', 'EOSINOFILOS', 'BASOFILOS', 'METAMIELOCITOS', 'MIELOCITOS', 'PROMIELOCITOS', 'BLASTOS', 'OBSERVACIONES EN ERITROCITOS', 'OBSERVACIONES EN LEUCOCITOS', 'OBSERVACIONES EN PLAQUETAS']
      },
      {
        grupo: 'EXAMEN GENERAL DE ORINA',
        pruebas: ['COLOR', 'ASPECTO', 'DENSIDAD', 'PH', 'GLUCOSA', 'PROTEINAS', 'CUERPOS CETONICOS', 'BILIRRUBINA', 'UROBILINOGENO', 'NITRITOS', 'LEUCOCITOS ESTERASA', 'HEMOGLOBINA', 'CELULAS URETRALES', 'CELULAS UROTELIALES', 'CELULAS RENALES', 'LEUCOCITOS', 'PIOCITOS', 'ERITROCITOS', 'BACTERIAS', 'FILAMENTOS DE MUCINA', 'CILINDROS', 'BLASTOCONIDIOS', 'CRISTALES', 'SALES AMORFAS', 'OTROS']
      },
      { grupo: 'PRUEBA PRESUNTIVA PARA DETECCION DE VIH', pruebas: ['ANTIGENO P24', 'ANTICUERPOS ANTI-VIH TOTALES'] },
      { grupo: 'Pruebas', pruebas: ['VDRL', 'ALBUMINA EN ORINA OCASIONAL'] },
      { grupo: 'QUIMICA SANGUINEA 7 ELEMENTOS', pruebas: ['GLUCOSA', 'UREA', 'BUN', 'CREATININA', 'ACIDO URICO', 'COLESTEROL', 'TRIGLICERIDOS', 'ASPECTO DEL SUERO', 'AYUNO DEL PACIENTE'] }
    ],
    tiposMuestra: ['Frasco — orina', 'Lila — plasma EDTA', 'Tubo lila — sangre total', 'Tubo oro — suero', 'Tubo rojo — suero']
  },
  {
    clave: 'PREOP',
    codigo: 'PREOP',
    tipo: 'Paquetes',
    nombre: 'PERFIL PREOPERATORIO',
    precio: 405,
    entrega: '4 hrs',
    muestra: 'sangre',
    indicaciones: ['Ayuno mínimo de 8 horas.'],
    incluye: [
      {
        grupo: 'CITOMETRIA HEMATICA COMPLETA',
        pruebas: ['GLOBULOS ROJOS', 'HEMOGLOBINA', 'HEMATOCRITO', 'VOLUMEN GLOBULAR MEDIO', 'HCM', 'CMHC', 'RDW', 'PLAQUETAS', 'VOLUMEN PLAQUETARIO MEDIO', 'LEUCOCITOS TOTALES', 'NEUTROFILOS', 'BANDAS', 'LINFOCITOS', 'MONOCITOS', 'EOSINOFILOS', 'BASOFILOS', 'METAMIELOCITOS', 'MIELOCITOS', 'PROMIELOCITOS', 'BLASTOS', 'OBSERVACIONES EN ERITROCITOS', 'OBSERVACIONES EN LEUCOCITOS', 'OBSERVACIONES EN PLAQUETAS']
      },
      { grupo: 'Pruebas', pruebas: ['TIEMPO DE PROTROMBINA', 'TIEMPO DE TROMBOPLASTINA PARCIALMENTE ACTIVADA', 'GRUPO SANGUÍNEO Y FACTOR RH', 'TP PACIENTE NORMAL', 'INR'] },
      { grupo: 'QUIMICA SANGUINEA PARCIAL', pruebas: ['GLUCOSA', 'UREA', 'BUN', 'CREATININA', 'COCIENTE BUN-CREATININA', 'ASPECTO DEL SUERO', 'AYUNO DEL PACIENTE'] }
    ],
    tiposMuestra: ['Lila — plasma EDTA', 'Tubo azul — plasma citratado', 'Tubo lila — sangre total', 'Tubo oro — suero', 'Tubo rojo — suero']
  },
  {
    clave: 'PREOP2',
    codigo: 'PREOP2',
    tipo: 'Paquetes',
    nombre: 'PERFIL PREOPERATORIO INTEGRAL',
    precio: 682,
    entrega: '4 hrs',
    muestra: 'sangre',
    indicaciones: ['Ayuno de 8 horas.', 'Primera muestra de orina recolectada por técnica de chorro medio.'],
    incluye: [
      {
        grupo: 'CITOMETRIA HEMATICA COMPLETA',
        pruebas: ['GLOBULOS ROJOS', 'HEMOGLOBINA', 'HEMATOCRITO', 'VOLUMEN GLOBULAR MEDIO', 'HCM', 'CMHC', 'RDW', 'PLAQUETAS', 'VOLUMEN PLAQUETARIO MEDIO', 'LEUCOCITOS TOTALES', 'NEUTROFILOS', 'BANDAS', 'LINFOCITOS', 'MONOCITOS', 'EOSINOFILOS', 'BASOFILOS', 'METAMIELOCITOS', 'MIELOCITOS', 'PROMIELOCITOS', 'BLASTOS', 'OBSERVACIONES EN ERITROCITOS', 'OBSERVACIONES EN LEUCOCITOS', 'OBSERVACIONES EN PLAQUETAS']
      },
      { grupo: 'ELECTROLITOS SERICOS BASICOS', pruebas: ['SODIO', 'POTASIO', 'CLORO'] },
      {
        grupo: 'EXAMEN GENERAL DE ORINA',
        pruebas: ['COLOR', 'ASPECTO', 'DENSIDAD', 'PH', 'GLUCOSA', 'PROTEINAS', 'CUERPOS CETONICOS', 'BILIRRUBINA', 'UROBILINOGENO', 'NITRITOS', 'LEUCOCITOS ESTERASA', 'HEMOGLOBINA', 'CELULAS URETRALES', 'CELULAS UROTELIALES', 'CELULAS RENALES', 'LEUCOCITOS', 'PIOCITOS', 'ERITROCITOS', 'BACTERIAS', 'FILAMENTOS DE MUCINA', 'CILINDROS', 'BLASTOCONIDIOS', 'CRISTALES', 'SALES AMORFAS', 'OTROS']
      },
      { grupo: 'Pruebas', pruebas: ['TIEMPO DE PROTROMBINA', 'TIEMPO DE TROMBOPLASTINA PARCIALMENTE ACTIVADA', 'GRUPO SANGUÍNEO Y FACTOR RH'] },
      { grupo: 'QUIMICA SANGUINEA 7 ELEMENTOS', pruebas: ['GLUCOSA', 'UREA', 'BUN', 'CREATININA', 'ACIDO URICO', 'COLESTEROL', 'TRIGLICERIDOS', 'ASPECTO DEL SUERO', 'AYUNO DEL PACIENTE'] }
    ],
    tiposMuestra: ['Frasco — orina', 'Lila — plasma EDTA', 'Tubo azul — plasma citratado', 'Tubo lila — sangre total', 'Tubo oro — suero', 'Tubo rojo — suero']
  },
  {
    clave: 'PQS10',
    codigo: 'PQS10',
    tipo: 'Paquetes',
    nombre: 'PERFIL QUIMICA DE 10 ELEMENTOS',
    precio: 630,
    entrega: '8 hrs',
    muestra: 'sangre',
    indicaciones: [
      'Ayuno mínimo de 8 horas, máximo de 12 horas.',
      'Recolectar primera orina de la mañana por técnica de chorro medio, previo aseo, y entregar en menos de dos horas al laboratorio después de la recolección.'
    ],
    incluye: [
      {
        grupo: 'CITOMETRIA HEMATICA COMPLETA',
        pruebas: ['GLOBULOS ROJOS', 'HEMOGLOBINA', 'HEMATOCRITO', 'VOLUMEN GLOBULAR MEDIO', 'HCM', 'CMHC', 'RDW', 'PLAQUETAS', 'VOLUMEN PLAQUETARIO MEDIO', 'LEUCOCITOS TOTALES', 'NEUTROFILOS', 'BANDAS', 'LINFOCITOS', 'MONOCITOS', 'EOSINOFILOS', 'BASOFILOS', 'METAMIELOCITOS', 'MIELOCITOS', 'PROMIELOCITOS', 'BLASTOS', 'OBSERVACIONES EN ERITROCITOS', 'OBSERVACIONES EN LEUCOCITOS', 'OBSERVACIONES EN PLAQUETAS']
      },
      {
        grupo: 'EXAMEN GENERAL DE ORINA',
        pruebas: ['COLOR', 'ASPECTO', 'DENSIDAD', 'PH', 'GLUCOSA', 'PROTEINAS', 'CUERPOS CETONICOS', 'BILIRRUBINA', 'UROBILINOGENO', 'NITRITOS', 'LEUCOCITOS ESTERASA', 'HEMOGLOBINA', 'CELULAS URETRALES', 'CELULAS UROTELIALES', 'CELULAS RENALES', 'LEUCOCITOS', 'PIOCITOS', 'ERITROCITOS', 'BACTERIAS', 'FILAMENTOS DE MUCINA', 'CILINDROS', 'BLASTOCONIDIOS', 'CRISTALES', 'SALES AMORFAS', 'OTROS']
      },
      { grupo: 'QUIMICA SANGUINEA DE 10 ELEMENTOS', pruebas: ['GLUCOSA', 'CREATININA', 'UREA', 'BUN', 'COLESTEROL', 'ACIDO URICO', 'TRIGLICERIDOS', 'COLESTEROL HDL', 'COLESTEROL LDL', 'RELACION LDL/HDL', 'RELACION COLESTEROL TOTAL / HDL', 'COLESTEROL VLDL', 'ASPECTO DEL SUERO', 'AYUNO DEL PACIENTE'] }
    ],
    tiposMuestra: ['Frasco — orina', 'Lila — plasma EDTA', 'Tubo lila — sangre total', 'Tubo oro — suero', 'Tubo rojo — suero']
  },
  {
    clave: 'PQS10HB',
    codigo: 'PQS10HB',
    tipo: 'Paquetes',
    nombre: 'PERFIL QUIMICA DE 10 ELEMENTOS + HBA1C',
    precio: 924,
    entrega: '8 hrs',
    muestra: 'sangre',
    indicaciones: [
      'Ayuno mínimo de 8 horas, máximo de 12 horas.',
      'Recolectar primera orina de la mañana por técnica de chorro medio, previo aseo, y entregar en menos de dos horas al laboratorio después de la recolección.'
    ],
    incluye: [
      {
        grupo: 'CITOMETRIA HEMATICA COMPLETA',
        pruebas: ['GLOBULOS ROJOS', 'HEMOGLOBINA', 'HEMATOCRITO', 'VOLUMEN GLOBULAR MEDIO', 'HCM', 'CMHC', 'RDW', 'PLAQUETAS', 'VOLUMEN PLAQUETARIO MEDIO', 'LEUCOCITOS TOTALES', 'NEUTROFILOS', 'BANDAS', 'LINFOCITOS', 'MONOCITOS', 'EOSINOFILOS', 'BASOFILOS', 'METAMIELOCITOS', 'MIELOCITOS', 'PROMIELOCITOS', 'BLASTOS', 'OBSERVACIONES EN ERITROCITOS', 'OBSERVACIONES EN LEUCOCITOS', 'OBSERVACIONES EN PLAQUETAS']
      },
      {
        grupo: 'EXAMEN GENERAL DE ORINA',
        pruebas: ['COLOR', 'ASPECTO', 'DENSIDAD', 'PH', 'GLUCOSA', 'PROTEINAS', 'CUERPOS CETONICOS', 'BILIRRUBINA', 'UROBILINOGENO', 'NITRITOS', 'LEUCOCITOS ESTERASA', 'HEMOGLOBINA', 'CELULAS URETRALES', 'CELULAS UROTELIALES', 'CELULAS RENALES', 'LEUCOCITOS', 'PIOCITOS', 'ERITROCITOS', 'BACTERIAS', 'FILAMENTOS DE MUCINA', 'CILINDROS', 'BLASTOCONIDIOS', 'CRISTALES', 'SALES AMORFAS', 'OTROS']
      },
      { grupo: 'HEMOGLOBINA GLUCOSILADA (FRACCION A1C) POR HPLC', pruebas: ['HEMOGLOBINA GLUCOSILADA (FRACCION A1C) POR HPLC', 'PROMEDIO ESTIMADO DE GLUCOSA'] },
      { grupo: 'QUIMICA SANGUINEA DE 10 ELEMENTOS', pruebas: ['GLUCOSA', 'CREATININA', 'UREA', 'BUN', 'COLESTEROL', 'ACIDO URICO', 'TRIGLICERIDOS', 'COLESTEROL HDL', 'COLESTEROL LDL', 'RELACION LDL/HDL', 'RELACION COLESTEROL TOTAL / HDL', 'COLESTEROL VLDL', 'ASPECTO DEL SUERO', 'AYUNO DEL PACIENTE'] }
    ],
    tiposMuestra: ['Frasco — orina', 'Lila — plasma EDTA', 'Tubo lila — sangre total', 'Tubo oro — suero', 'Tubo rojo — suero']
  },
  {
    clave: 'PQSC',
    codigo: 'PQSC',
    tipo: 'Paquetes',
    nombre: 'PERFIL QUIMICA DE 7 ELEMENTOS',
    precio: 577,
    entrega: '8 hrs',
    muestra: 'sangre',
    indicaciones: [
      'Ayuno mínimo de 8 horas, máximo de 12 horas.',
      'Recolectar primera orina de la mañana por técnica de chorro medio, previo aseo, y entregar en menos de dos horas al laboratorio después de la recolección.'
    ],
    incluye: [
      {
        grupo: 'CITOMETRIA HEMATICA COMPLETA',
        pruebas: ['GLOBULOS ROJOS', 'HEMOGLOBINA', 'HEMATOCRITO', 'VOLUMEN GLOBULAR MEDIO', 'HCM', 'CMHC', 'RDW', 'PLAQUETAS', 'VOLUMEN PLAQUETARIO MEDIO', 'LEUCOCITOS TOTALES', 'NEUTROFILOS', 'BANDAS', 'LINFOCITOS', 'MONOCITOS', 'EOSINOFILOS', 'BASOFILOS', 'METAMIELOCITOS', 'MIELOCITOS', 'PROMIELOCITOS', 'BLASTOS', 'OBSERVACIONES EN ERITROCITOS', 'OBSERVACIONES EN LEUCOCITOS', 'OBSERVACIONES EN PLAQUETAS']
      },
      {
        grupo: 'EXAMEN GENERAL DE ORINA',
        pruebas: ['COLOR', 'ASPECTO', 'DENSIDAD', 'PH', 'GLUCOSA', 'PROTEINAS', 'CUERPOS CETONICOS', 'BILIRRUBINA', 'UROBILINOGENO', 'NITRITOS', 'LEUCOCITOS ESTERASA', 'HEMOGLOBINA', 'CELULAS URETRALES', 'CELULAS UROTELIALES', 'CELULAS RENALES', 'LEUCOCITOS', 'PIOCITOS', 'ERITROCITOS', 'BACTERIAS', 'FILAMENTOS DE MUCINA', 'CILINDROS', 'BLASTOCONIDIOS', 'CRISTALES', 'SALES AMORFAS', 'OTROS']
      },
      { grupo: 'QUIMICA SANGUINEA 7 ELEMENTOS', pruebas: ['GLUCOSA', 'UREA', 'BUN', 'CREATININA', 'ACIDO URICO', 'COLESTEROL', 'TRIGLICERIDOS', 'ASPECTO DEL SUERO', 'AYUNO DEL PACIENTE'] }
    ],
    tiposMuestra: ['Frasco — orina', 'Lila — plasma EDTA', 'Tubo lila — sangre total', 'Tubo oro — suero', 'Tubo rojo — suero']
  },
  {
    clave: 'PQSCHB',
    codigo: 'PQSCHB',
    tipo: 'Paquetes',
    nombre: 'PERFIL QUIMICA DE 7 ELEMENTOS + HBA1C',
    precio: 871,
    entrega: '8 hrs',
    muestra: 'sangre',
    indicaciones: [
      'Ayuno mínimo de 8 horas, máximo de 12 horas.',
      'Recolectar primera orina de la mañana por técnica de chorro medio, previo aseo, y entregar en menos de dos horas al laboratorio después de la recolección.'
    ],
    incluye: [
      {
        grupo: 'CITOMETRIA HEMATICA COMPLETA',
        pruebas: ['GLOBULOS ROJOS', 'HEMOGLOBINA', 'HEMATOCRITO', 'VOLUMEN GLOBULAR MEDIO', 'HCM', 'CMHC', 'RDW', 'PLAQUETAS', 'VOLUMEN PLAQUETARIO MEDIO', 'LEUCOCITOS TOTALES', 'NEUTROFILOS', 'BANDAS', 'LINFOCITOS', 'MONOCITOS', 'EOSINOFILOS', 'BASOFILOS', 'METAMIELOCITOS', 'MIELOCITOS', 'PROMIELOCITOS', 'BLASTOS', 'OBSERVACIONES EN ERITROCITOS', 'OBSERVACIONES EN LEUCOCITOS', 'OBSERVACIONES EN PLAQUETAS']
      },
      {
        grupo: 'EXAMEN GENERAL DE ORINA',
        pruebas: ['COLOR', 'ASPECTO', 'DENSIDAD', 'PH', 'GLUCOSA', 'PROTEINAS', 'CUERPOS CETONICOS', 'BILIRRUBINA', 'UROBILINOGENO', 'NITRITOS', 'LEUCOCITOS ESTERASA', 'HEMOGLOBINA', 'CELULAS URETRALES', 'CELULAS UROTELIALES', 'CELULAS RENALES', 'LEUCOCITOS', 'PIOCITOS', 'ERITROCITOS', 'BACTERIAS', 'FILAMENTOS DE MUCINA', 'CILINDROS', 'BLASTOCONIDIOS', 'CRISTALES', 'SALES AMORFAS', 'OTROS']
      },
      { grupo: 'HEMOGLOBINA GLUCOSILADA (FRACCION A1C) POR HPLC', pruebas: ['HEMOGLOBINA GLUCOSILADA (FRACCION A1C) POR HPLC', 'PROMEDIO ESTIMADO DE GLUCOSA'] },
      { grupo: 'QUIMICA SANGUINEA 7 ELEMENTOS', pruebas: ['GLUCOSA', 'UREA', 'BUN', 'CREATININA', 'ACIDO URICO', 'COLESTEROL', 'TRIGLICERIDOS', 'ASPECTO DEL SUERO', 'AYUNO DEL PACIENTE'] }
    ],
    tiposMuestra: ['Frasco — orina', 'Lila — plasma EDTA', 'Tubo lila — sangre total', 'Tubo oro — suero', 'Tubo rojo — suero']
  },
  {
    clave: 'PQ20',
    codigo: 'PQ20',
    tipo: 'Paquetes',
    nombre: 'PERFIL QUIMICA SANGUINEA 20 ELEMENTOS',
    precio: 960,
    entrega: '5 hrs',
    muestra: 'sangre',
    indicaciones: [],
    incluye: [
      {
        grupo: 'CITOMETRIA HEMATICA COMPLETA',
        pruebas: ['GLOBULOS ROJOS', 'HEMOGLOBINA', 'HEMATOCRITO', 'VOLUMEN GLOBULAR MEDIO', 'HCM', 'CMHC', 'RDW', 'PLAQUETAS', 'VOLUMEN PLAQUETARIO MEDIO', 'LEUCOCITOS TOTALES', 'NEUTROFILOS', 'BANDAS', 'LINFOCITOS', 'MONOCITOS', 'EOSINOFILOS', 'BASOFILOS', 'METAMIELOCITOS', 'MIELOCITOS', 'PROMIELOCITOS', 'BLASTOS', 'OBSERVACIONES EN ERITROCITOS', 'OBSERVACIONES EN LEUCOCITOS', 'OBSERVACIONES EN PLAQUETAS']
      },
      {
        grupo: 'EXAMEN GENERAL DE ORINA',
        pruebas: ['COLOR', 'ASPECTO', 'DENSIDAD', 'PH', 'GLUCOSA', 'PROTEINAS', 'CUERPOS CETONICOS', 'BILIRRUBINA', 'UROBILINOGENO', 'NITRITOS', 'LEUCOCITOS ESTERASA', 'HEMOGLOBINA', 'CELULAS URETRALES', 'CELULAS UROTELIALES', 'CELULAS RENALES', 'LEUCOCITOS', 'PIOCITOS', 'ERITROCITOS', 'BACTERIAS', 'FILAMENTOS DE MUCINA', 'CILINDROS', 'BLASTOCONIDIOS', 'CRISTALES', 'SALES AMORFAS', 'OTROS']
      },
      { grupo: 'QUIMICA SANGUINEA DE 20 ELEMENTOS', pruebas: ['GLUCOSA', 'CREATININA', 'UREA', 'BUN', 'COLESTEROL', 'ACIDO URICO', 'TRIGLICERIDOS', 'COLESTEROL HDL', 'COLESTEROL LDL', 'RELACION COLESTEROL TOTAL / HDL', 'RELACION LDL/HDL', 'COLESTEROL VLDL', 'PROTEINAS TOTALES', 'ALBUMINA', 'GLOBULINAS TOTALES', 'RELACION ALBUMINA GLOBULINA', 'BILIRRUBINA TOTAL', 'BILIRRUBINA DIRECTA', 'BILIRRUBINA INDIRECTA', 'TGO', 'TGP', 'ASPECTO DEL SUERO', 'AYUNO DEL PACIENTE'] }
    ],
    tiposMuestra: ['Frasco — orina', 'Lila — plasma EDTA', 'Tubo lila — sangre total', 'Tubo oro — suero', 'Tubo rojo — suero']
  },
  {
    clave: 'PQ20GLU',
    codigo: 'PQ20GLU',
    tipo: 'Paquetes',
    nombre: 'PERFIL QUIMICA SANGUINEA DE 20 ELEMENTOS MAS HbA1c',
    precio: 1210,
    entrega: '5 hrs',
    muestra: 'sangre',
    indicaciones: [],
    incluye: [
      {
        grupo: 'CITOMETRIA HEMATICA COMPLETA',
        pruebas: ['GLOBULOS ROJOS', 'HEMOGLOBINA', 'HEMATOCRITO', 'VOLUMEN GLOBULAR MEDIO', 'HCM', 'CMHC', 'RDW', 'PLAQUETAS', 'VOLUMEN PLAQUETARIO MEDIO', 'LEUCOCITOS TOTALES', 'NEUTROFILOS', 'BANDAS', 'LINFOCITOS', 'MONOCITOS', 'EOSINOFILOS', 'BASOFILOS', 'METAMIELOCITOS', 'MIELOCITOS', 'PROMIELOCITOS', 'BLASTOS', 'OBSERVACIONES EN ERITROCITOS', 'OBSERVACIONES EN LEUCOCITOS', 'OBSERVACIONES EN PLAQUETAS']
      },
      {
        grupo: 'EXAMEN GENERAL DE ORINA',
        pruebas: ['COLOR', 'ASPECTO', 'DENSIDAD', 'PH', 'GLUCOSA', 'PROTEINAS', 'CUERPOS CETONICOS', 'BILIRRUBINA', 'UROBILINOGENO', 'NITRITOS', 'LEUCOCITOS ESTERASA', 'HEMOGLOBINA', 'CELULAS URETRALES', 'CELULAS UROTELIALES', 'CELULAS RENALES', 'LEUCOCITOS', 'PIOCITOS', 'ERITROCITOS', 'BACTERIAS', 'FILAMENTOS DE MUCINA', 'CILINDROS', 'BLASTOCONIDIOS', 'CRISTALES', 'SALES AMORFAS', 'OTROS']
      },
      { grupo: 'HEMOGLOBINA GLUCOSILADA (FRACCION A1C) POR HPLC', pruebas: ['HEMOGLOBINA GLUCOSILADA (FRACCION A1C) POR HPLC', 'PROMEDIO ESTIMADO DE GLUCOSA'] },
      { grupo: 'QUIMICA SANGUINEA DE 20 ELEMENTOS', pruebas: ['GLUCOSA', 'CREATININA', 'UREA', 'BUN', 'COLESTEROL', 'ACIDO URICO', 'TRIGLICERIDOS', 'COLESTEROL HDL', 'COLESTEROL LDL', 'RELACION COLESTEROL TOTAL / HDL', 'RELACION LDL/HDL', 'COLESTEROL VLDL', 'PROTEINAS TOTALES', 'ALBUMINA', 'GLOBULINAS TOTALES', 'RELACION ALBUMINA GLOBULINA', 'BILIRRUBINA TOTAL', 'BILIRRUBINA DIRECTA', 'BILIRRUBINA INDIRECTA', 'TGO', 'TGP', 'ASPECTO DEL SUERO', 'AYUNO DEL PACIENTE'] }
    ],
    tiposMuestra: ['Frasco — orina', 'Lila — plasma EDTA', 'Tubo lila — sangre total', 'Tubo oro — suero', 'Tubo rojo — suero']
  },
  {
    clave: 'PQS28HBGLU',
    codigo: 'PQS28HBGLU',
    tipo: 'Paquetes',
    nombre: 'PERFIL QUÍMICA SANGUÍNEA DE 28 ELEMENTOS CON HbA1c',
    precio: 1140,
    entrega: '8 hrs',
    muestra: 'sangre',
    indicaciones: [
      'Ayuno mínimo de 8 horas, máximo de 12 horas.',
      'Recolectar primera orina de la mañana por técnica de chorro medio, previo aseo, y entregar en menos de dos horas al laboratorio después de la recolección.'
    ],
    incluye: [
      {
        grupo: 'CITOMETRIA HEMATICA COMPLETA',
        pruebas: ['GLOBULOS ROJOS', 'HEMOGLOBINA', 'HEMATOCRITO', 'VOLUMEN GLOBULAR MEDIO', 'HCM', 'CMHC', 'RDW', 'PLAQUETAS', 'VOLUMEN PLAQUETARIO MEDIO', 'LEUCOCITOS TOTALES', 'NEUTROFILOS', 'BANDAS', 'LINFOCITOS', 'MONOCITOS', 'EOSINOFILOS', 'BASOFILOS', 'METAMIELOCITOS', 'MIELOCITOS', 'PROMIELOCITOS', 'BLASTOS', 'OBSERVACIONES EN ERITROCITOS', 'OBSERVACIONES EN LEUCOCITOS', 'OBSERVACIONES EN PLAQUETAS']
      },
      {
        grupo: 'EXAMEN GENERAL DE ORINA',
        pruebas: ['COLOR', 'ASPECTO', 'DENSIDAD', 'PH', 'GLUCOSA', 'PROTEINAS', 'CUERPOS CETONICOS', 'BILIRRUBINA', 'UROBILINOGENO', 'NITRITOS', 'LEUCOCITOS ESTERASA', 'HEMOGLOBINA', 'CELULAS URETRALES', 'CELULAS UROTELIALES', 'CELULAS RENALES', 'LEUCOCITOS', 'PIOCITOS', 'ERITROCITOS', 'BACTERIAS', 'FILAMENTOS DE MUCINA', 'CILINDROS', 'BLASTOCONIDIOS', 'CRISTALES', 'SALES AMORFAS', 'OTROS']
      },
      { grupo: 'HEMOGLOBINA GLUCOSILADA (FRACCION A1C) POR HPLC', pruebas: ['HEMOGLOBINA GLUCOSILADA (FRACCION A1C) POR HPLC', 'PROMEDIO ESTIMADO DE GLUCOSA'] },
      { grupo: 'QUIMICA SANGUINEA DE 28 ELEMENTOS', pruebas: ['GLUCOSA', 'CREATININA', 'UREA', 'BUN', 'COLESTEROL', 'ACIDO URICO', 'TRIGLICERIDOS', 'COLESTEROL HDL', 'COLESTEROL LDL', 'RELACION LDL/HDL', 'RELACION COLESTEROL TOTAL / HDL', 'COLESTEROL VLDL', 'PROTEINAS TOTALES', 'ALBUMINA', 'GLOBULINAS TOTALES', 'RELACION ALBUMINA GLOBULINA', 'BILIRRUBINA TOTAL', 'BILIRRUBINA DIRECTA', 'BILIRRUBINA INDIRECTA', 'TGP', 'TGO', 'FOSFATASA ALCALINA', 'DHL (DESHIDROGENASA LACTICA)', 'GGT', 'AMILASA', 'SODIO', 'POTASIO', 'CLORO', 'CALCIO', 'ASPECTO DEL SUERO', 'AYUNO DEL PACIENTE'] }
    ],
    tiposMuestra: ['Frasco — orina', 'Lila — plasma EDTA', 'Tubo lila — sangre total', 'Tubo oro — suero', 'Tubo rojo — suero']
  },
  {
    clave: 'PQS30HBGLI',
    codigo: 'PQS30HBGLI',
    tipo: 'Paquetes',
    nombre: 'PERFIL QUÍMICA SANGUÍNEA DE 30 ELEMENTOS CON HEMOGLOBINA GLUCOSILADA',
    precio: 1250,
    entrega: '8 hrs',
    muestra: 'sangre',
    indicaciones: ['Ayuno de 8 a 12 horas.', 'Primera orina de la mañana, recolectar chorro medio en frasco estéril.'],
    incluye: [
      {
        grupo: 'CITOMETRIA HEMATICA COMPLETA',
        pruebas: ['GLOBULOS ROJOS', 'HEMOGLOBINA', 'HEMATOCRITO', 'VOLUMEN GLOBULAR MEDIO', 'HCM', 'CMHC', 'RDW', 'PLAQUETAS', 'VOLUMEN PLAQUETARIO MEDIO', 'LEUCOCITOS TOTALES', 'NEUTROFILOS', 'BANDAS', 'LINFOCITOS', 'MONOCITOS', 'EOSINOFILOS', 'BASOFILOS', 'METAMIELOCITOS', 'MIELOCITOS', 'PROMIELOCITOS', 'BLASTOS', 'OBSERVACIONES EN ERITROCITOS', 'OBSERVACIONES EN LEUCOCITOS', 'OBSERVACIONES EN PLAQUETAS']
      },
      {
        grupo: 'EXAMEN GENERAL DE ORINA',
        pruebas: ['COLOR', 'ASPECTO', 'DENSIDAD', 'PH', 'GLUCOSA', 'PROTEINAS', 'CUERPOS CETONICOS', 'BILIRRUBINA', 'UROBILINOGENO', 'NITRITOS', 'LEUCOCITOS ESTERASA', 'HEMOGLOBINA', 'CELULAS URETRALES', 'CELULAS UROTELIALES', 'CELULAS RENALES', 'LEUCOCITOS', 'PIOCITOS', 'ERITROCITOS', 'BACTERIAS', 'FILAMENTOS DE MUCINA', 'CILINDROS', 'BLASTOCONIDIOS', 'CRISTALES', 'SALES AMORFAS', 'OTROS']
      },
      { grupo: 'HEMOGLOBINA GLUCOSILADA (FRACCION A1C) POR HPLC', pruebas: ['HEMOGLOBINA GLUCOSILADA (FRACCION A1C) POR HPLC', 'PROMEDIO ESTIMADO DE GLUCOSA'] },
      { grupo: 'QUIMICA SANGUINEA DE 30 ELEMENTOS', pruebas: ['GLUCOSA', 'CREATININA', 'UREA', 'BUN', 'COLESTEROL', 'ACIDO URICO', 'TRIGLICERIDOS', 'COLESTEROL HDL', 'COLESTEROL LDL', 'RELACION LDL/HDL', 'RELACION COLESTEROL TOTAL / HDL', 'COLESTEROL VLDL', 'PROTEINAS TOTALES', 'ALBUMINA', 'GLOBULINAS TOTALES', 'RELACION ALBUMINA GLOBULINA', 'BILIRRUBINA TOTAL', 'BILIRRUBINA DIRECTA', 'BILIRRUBINA INDIRECTA', 'TGO', 'TGP', 'FOSFATASA ALCALINA', 'DHL (DESHIDROGENASA LACTICA)', 'GGT', 'AMILASA', 'HIERRO', 'CALCIO', 'SODIO', 'POTASIO', 'CLORO', 'FOSFORO', 'ASPECTO DEL SUERO', 'AYUNO DEL PACIENTE'] }
    ],
    tiposMuestra: ['Frasco — orina', 'Lila — plasma EDTA', 'Tubo lila — sangre total', 'Tubo oro — suero', 'Tubo rojo — suero']
  },
  {
    clave: 'QS32HB',
    codigo: 'QS32HB',
    tipo: 'Paquetes',
    nombre: 'PERFIL QUIMICA SANGUINEA DE 32 ELEMENTOS + HbA1c',
    precio: 1500,
    entrega: '8 hrs',
    muestra: 'sangre',
    indicaciones: ['Ayuno mínimo de 8 horas, máximo de 12.', 'Tomar primera orina de la mañana.'],
    incluye: [
      {
        grupo: 'CITOMETRIA HEMATICA COMPLETA',
        pruebas: ['GLOBULOS ROJOS', 'HEMOGLOBINA', 'HEMATOCRITO', 'VOLUMEN GLOBULAR MEDIO', 'HCM', 'CMHC', 'RDW', 'PLAQUETAS', 'VOLUMEN PLAQUETARIO MEDIO', 'LEUCOCITOS TOTALES', 'NEUTROFILOS', 'BANDAS', 'LINFOCITOS', 'MONOCITOS', 'EOSINOFILOS', 'BASOFILOS', 'METAMIELOCITOS', 'MIELOCITOS', 'PROMIELOCITOS', 'BLASTOS', 'OBSERVACIONES EN ERITROCITOS', 'OBSERVACIONES EN LEUCOCITOS', 'OBSERVACIONES EN PLAQUETAS']
      },
      {
        grupo: 'EXAMEN GENERAL DE ORINA',
        pruebas: ['COLOR', 'ASPECTO', 'DENSIDAD', 'PH', 'GLUCOSA', 'PROTEINAS', 'CUERPOS CETONICOS', 'BILIRRUBINA', 'UROBILINOGENO', 'NITRITOS', 'LEUCOCITOS ESTERASA', 'HEMOGLOBINA', 'CELULAS URETRALES', 'CELULAS UROTELIALES', 'CELULAS RENALES', 'LEUCOCITOS', 'PIOCITOS', 'ERITROCITOS', 'BACTERIAS', 'FILAMENTOS DE MUCINA', 'CILINDROS', 'BLASTOCONIDIOS', 'CRISTALES', 'SALES AMORFAS', 'OTROS']
      },
      { grupo: 'Pruebas', pruebas: ['HEMOGLOBINA GLUCOSILADA (FRACCION A1C)', 'PROMEDIO ESTIMADO DE GLUCOSA'] },
      { grupo: 'QUIMICA SANGUINEA DE 32 ELEMENTOS', pruebas: ['GLUCOSA', 'CREATININA', 'BUN', 'UREA', 'COLESTEROL', 'ACIDO URICO', 'TRIGLICERIDOS', 'COLESTEROL HDL', 'COLESTEROL LDL', 'RELACION COLESTEROL TOTAL / HDL', 'RELACION LDL/HDL', 'COLESTEROL VLDL', 'PROTEINAS TOTALES', 'ALBUMINA', 'GLOBULINAS TOTALES', 'RELACION ALBUMINA GLOBULINA', 'BILIRRUBINA TOTAL', 'BILIRRUBINA DIRECTA', 'BILIRRUBINA INDIRECTA', 'TGO', 'TGP', 'FOSFATASA ALCALINA', 'DHL (DESHIDROGENASA LACTICA)', 'GGT', 'AMILASA', 'HIERRO SERICO', 'SODIO', 'CLORO', 'CALCIO', 'CPK', 'CPK-MB', 'POTASIO', 'ASPECTO DEL SUERO', 'AYUNO DEL PACIENTE'] }
    ],
    tiposMuestra: ['Frasco — orina', 'Lila — plasma EDTA', 'Tubo lila — sangre total', 'Tubo oro — suero', 'Tubo rojo — suero']
  },
  {
    clave: 'PQ32HBGLU',
    codigo: 'PQ32HBGLU',
    tipo: 'Paquetes',
    nombre: 'PERFIL QUÍMICA SANGUÍNEA DE 32 ELEMENTOS CON HbA1c',
    precio: 0,
    entrega: '8 hrs',
    muestra: 'sangre',
    indicaciones: [],
    incluye: [
      {
        grupo: 'CITOMETRIA HEMATICA COMPLETA',
        pruebas: ['GLOBULOS ROJOS', 'HEMOGLOBINA', 'HEMATOCRITO', 'VOLUMEN GLOBULAR MEDIO', 'HCM', 'CMHC', 'RDW', 'PLAQUETAS', 'VOLUMEN PLAQUETARIO MEDIO', 'LEUCOCITOS TOTALES', 'NEUTROFILOS', 'BANDAS', 'LINFOCITOS', 'MONOCITOS', 'EOSINOFILOS', 'BASOFILOS', 'METAMIELOCITOS', 'MIELOCITOS', 'PROMIELOCITOS', 'BLASTOS', 'OBSERVACIONES EN ERITROCITOS', 'OBSERVACIONES EN LEUCOCITOS', 'OBSERVACIONES EN PLAQUETAS']
      },
      {
        grupo: 'EXAMEN GENERAL DE ORINA',
        pruebas: ['COLOR', 'ASPECTO', 'DENSIDAD', 'PH', 'GLUCOSA', 'PROTEINAS', 'CUERPOS CETONICOS', 'BILIRRUBINA', 'UROBILINOGENO', 'NITRITOS', 'LEUCOCITOS ESTERASA', 'HEMOGLOBINA', 'CELULAS URETRALES', 'CELULAS UROTELIALES', 'CELULAS RENALES', 'LEUCOCITOS', 'PIOCITOS', 'ERITROCITOS', 'BACTERIAS', 'FILAMENTOS DE MUCINA', 'CILINDROS', 'BLASTOCONIDIOS', 'CRISTALES', 'SALES AMORFAS', 'OTROS']
      },
      { grupo: 'HEMOGLOBINA GLUCOSILADA (FRACCION A1C) POR HPLC', pruebas: ['HEMOGLOBINA GLUCOSILADA (FRACCION A1C) POR HPLC', 'PROMEDIO ESTIMADO DE GLUCOSA'] },
      { grupo: 'QUIMICA SANGUINEA DE 32', pruebas: ['GLUCOSA', 'UREA', 'BUN', 'COCIENTE BUN-CREATININA', 'CREATININA', 'ACIDO URICO', 'TRIGLICERIDOS', 'COLESTEROL', 'COLESTEROL HDL', 'COLESTEROL NO-HDL', 'COLESTEROL LDL', 'COLESTEROL VLDL', 'ALBUMINA', 'GLOBULINAS TOTALES', 'RELACION ALBUMINA GLOBULINA', 'TGO', 'TGP', 'PROTEINAS TOTALES', 'BILIRRUBINA TOTAL', 'BILIRRUBINA DIRECTA', 'BILIRRUBINA INDIRECTA', 'FOSFATASA ALCALINA', 'GGT', 'DHL (DESHIDROGENASA LACTICA)', 'SODIO', 'POTASIO', 'CLORO', 'CALCIO', 'MAGNESIO', 'FOSFORO', 'AMILASA', 'LIPASA', 'ASPECTO DEL SUERO', 'AYUNO DEL PACIENTE'] }
    ],
    tiposMuestra: ['Frasco — orina', 'Lila — plasma EDTA', 'Tubo lila — sangre total', 'Tubo oro — suero', 'Tubo rojo — suero']
  },
  {
    clave: 'PQS35',
    codigo: 'PQS35',
    tipo: 'Paquetes',
    nombre: 'PERFIL QUIMICA SANGUINEA DE 35 ELEMENTOS MÁS HbA1c',
    precio: 1575,
    entrega: '8 hrs',
    muestra: 'sangre',
    indicaciones: ['Ayuno de 8 horas.'],
    incluye: [
      {
        grupo: 'CITOMETRIA HEMATICA COMPLETA',
        pruebas: ['GLOBULOS ROJOS', 'HEMOGLOBINA', 'HEMATOCRITO', 'VOLUMEN GLOBULAR MEDIO', 'HCM', 'CMHC', 'RDW', 'PLAQUETAS', 'VOLUMEN PLAQUETARIO MEDIO', 'LEUCOCITOS TOTALES', 'NEUTROFILOS', 'BANDAS', 'LINFOCITOS', 'MONOCITOS', 'EOSINOFILOS', 'BASOFILOS', 'METAMIELOCITOS', 'MIELOCITOS', 'PROMIELOCITOS', 'BLASTOS', 'OBSERVACIONES EN ERITROCITOS', 'OBSERVACIONES EN LEUCOCITOS', 'OBSERVACIONES EN PLAQUETAS']
      },
      {
        grupo: 'EXAMEN GENERAL DE ORINA',
        pruebas: ['COLOR', 'ASPECTO', 'DENSIDAD', 'PH', 'GLUCOSA', 'PROTEINAS', 'CUERPOS CETONICOS', 'BILIRRUBINA', 'UROBILINOGENO', 'NITRITOS', 'LEUCOCITOS ESTERASA', 'HEMOGLOBINA', 'CELULAS URETRALES', 'CELULAS UROTELIALES', 'CELULAS RENALES', 'LEUCOCITOS', 'PIOCITOS', 'ERITROCITOS', 'BACTERIAS', 'FILAMENTOS DE MUCINA', 'CILINDROS', 'BLASTOCONIDIOS', 'CRISTALES', 'SALES AMORFAS', 'OTROS']
      },
      { grupo: 'Pruebas', pruebas: ['GLUCOSA', 'ALBUMINA', 'AMILASA', 'BILIRRUBINA DIRECTA', 'BILIRRUBINA TOTAL', 'BILIRRUBINA INDIRECTA', 'CPK', 'CPK-MB', 'CREATININA', 'DHL (DESHIDROGENASA LACTICA)', 'FOSFATASA ALCALINA', 'FOSFORO', 'GGT', 'HEMOGLOBINA GLUCOSILADA (FRACCION A1C)', 'LIPASA', 'COLESTEROL HDL', 'COLESTEROL LDL', 'COLESTEROL VLDL', 'MAGNESIO', 'PROTEINAS TOTALES', 'TGO', 'TGP', 'TRIGLICERIDOS', 'UREA', 'ACIDO URICO', 'POTASIO', 'SODIO', 'HIERRO', 'COLESTEROL', 'GLOBULINAS TOTALES', 'RELACION ALBUMINA GLOBULINA', 'BUN', 'TASA ESTIMADA DE FILTRADO GLOMERULAR', 'RELACION LDL/HDL', 'RELACION COLESTEROL TOTAL / HDL', 'PROMEDIO ESTIMADO DE GLUCOSA', 'ASPECTO DEL SUERO', 'AYUNO DEL PACIENTE'] }
    ],
    tiposMuestra: ['Frasco — orina', 'Lila — plasma EDTA', 'Tubo lila — sangre total', 'Tubo oro — suero', 'Tubo rojo — suero']
  },
  {
    clave: 'PRENAL',
    codigo: 'PRENAL',
    tipo: 'Paquetes',
    nombre: 'PERFIL RENAL',
    precio: 1039,
    entrega: '8 hrs',
    muestra: 'orina',
    indicaciones: [
      'Ayuno de 8 a 12 horas.',
      'Recolectar orina preferentemente la primera de la mañana, o que haya estado 4 horas retenida en vejiga.',
      'Recolectar el chorro medio en frasco estéril y entregar de inmediato en el laboratorio.'
    ],
    incluye: [
      {
        grupo: 'EXAMEN GENERAL DE ORINA',
        pruebas: ['COLOR', 'ASPECTO', 'DENSIDAD', 'PH', 'GLUCOSA', 'PROTEINAS', 'CUERPOS CETONICOS', 'BILIRRUBINA', 'UROBILINOGENO', 'NITRITOS', 'LEUCOCITOS ESTERASA', 'HEMOGLOBINA', 'CELULAS URETRALES', 'CELULAS UROTELIALES', 'CELULAS RENALES', 'LEUCOCITOS', 'PIOCITOS', 'ERITROCITOS', 'BACTERIAS', 'FILAMENTOS DE MUCINA', 'CILINDROS', 'BLASTOCONIDIOS', 'CRISTALES', 'SALES AMORFAS', 'OTROS']
      },
      { grupo: 'Pruebas', pruebas: ['TASA ESTIMADA DE FILTRADO GLOMERULAR'] },
      { grupo: 'QUIMICA SANGUINEA 4', pruebas: ['GLUCOSA', 'BUN', 'UREA', 'CREATININA', 'ACIDO URICO', 'ASPECTO DEL SUERO', 'AYUNO DEL PACIENTE'] },
      { grupo: 'RELACION ALBUMINA CREATININA URINARIA', pruebas: ['CONCENTRACION DE CREATININA URINARIA', 'ALBUMINA EN ORINA OCASIONAL', 'RELACION ALBUMINA CREATININA URINARIA'] }
    ],
    tiposMuestra: ['Frasco — orina', 'Tubo oro — suero', 'Tubo rojo — suero']
  },
  {
    clave: 'PREUM',
    codigo: 'PREUM',
    tipo: 'Paquetes',
    nombre: 'PERFIL REUMATICO',
    precio: 630,
    entrega: '5 hrs',
    muestra: 'sangre',
    indicaciones: ['Ayuno mínimo de 4 horas.'],
    incluye: [
      {
        grupo: 'CITOMETRIA HEMATICA COMPLETA',
        pruebas: ['GLOBULOS ROJOS', 'HEMOGLOBINA', 'HEMATOCRITO', 'VOLUMEN GLOBULAR MEDIO', 'HCM', 'CMHC', 'RDW', 'PLAQUETAS', 'VOLUMEN PLAQUETARIO MEDIO', 'LEUCOCITOS TOTALES', 'NEUTROFILOS', 'BANDAS', 'LINFOCITOS', 'MONOCITOS', 'EOSINOFILOS', 'BASOFILOS', 'METAMIELOCITOS', 'MIELOCITOS', 'PROMIELOCITOS', 'BLASTOS', 'OBSERVACIONES EN ERITROCITOS', 'OBSERVACIONES EN LEUCOCITOS', 'OBSERVACIONES EN PLAQUETAS']
      },
      { grupo: 'Pruebas', pruebas: ['PROTEINA C REACTIVA', 'ANTI-ESTREPTOLISINA O', 'FACTOR REUMATOIDE', 'ACIDO URICO', 'SEDIMENTACION GLOBULAR'] }
    ],
    tiposMuestra: ['Lila — plasma EDTA', 'Tubo lila — sangre total', 'Tubo rojo — suero']
  },
  {
    clave: 'QS46',
    codigo: 'QS46',
    tipo: 'Paquetes',
    nombre: 'QUIMICA SANGUINEA DE 46 ELEMENTOS',
    precio: 1207,
    entrega: '8 hrs',
    muestra: 'sangre',
    indicaciones: ['Ayuno mínimo de 8 horas, máximo de 12 horas.'],
    incluye: [
      { grupo: 'Pruebas', pruebas: ['PROTEINA C REACTIVA', 'GLUCOSA', 'ALBUMINA', 'AMILASA', 'BILIRRUBINA DIRECTA', 'BILIRRUBINA TOTAL', 'BILIRRUBINA INDIRECTA', 'CALCIO', 'CLORO', 'CPK', 'CPK-MB', 'CREATININA', 'DHL (DESHIDROGENASA LACTICA)', 'FOSFATASA ALCALINA', 'FOSFORO', 'GGT', 'LIPASA', 'COLESTEROL HDL', 'COLESTEROL LDL', 'COLESTEROL VLDL', 'MAGNESIO', 'PROTEINAS TOTALES', 'TGO', 'TGP', 'TRIGLICERIDOS', 'UREA', 'ACIDO URICO', 'POTASIO', 'SODIO', 'COLESTEROL', 'LIPIDOS TOTALES', 'GLOBULINAS TOTALES', 'RELACION ALBUMINA GLOBULINA', 'BUN', 'ION AMONIO', 'COLINESTERASA EN SUERO/PLASMA', 'INDICE ATEROGENICO', 'COLESTEROL NO-HDL', 'COCIENTE BUN-CREATININA', 'TASA ESTIMADA DE FILTRADO GLOMERULAR', 'RELACION TG/HDL', 'RELACION AST/ALT', 'RELACION LDL/HDL', 'RELACION COLESTEROL TOTAL / HDL', 'ANION GAP', 'CO2 TOTAL EN SUERO'] }
    ],
    tiposMuestra: ['Tubo lila — sangre total', 'Tubo oro — suero', 'Tubo rojo — suero', 'Tubo verde — plasma heparinizado']
  },
  {
    clave: 'VPHPCR',
    codigo: 'VPHPCR',
    tipo: 'Paquetes',
    nombre: 'VPH EN MUESTRA BIOLOGICA por PCR (genotipos de alto y bajo riesgo)',
    precio: 3885,
    entrega: '10 días',
    muestra: 'otros',
    indicaciones: [
      'Requisitos generales (hombres y mujeres)',
      'Abstinencia sexual: No haber tenido relaciones sexuales (vaginales, anales u orales) al menos 48 a 72 horas antes de la toma.',
      'Higiene: Lavar la zona externa solo con agua y jabón neutro. No aplicar cremas, polvos, aceites o lociones en el área genital el día de la cita.',
      'Tratamientos locales: No estar aplicando óvulos, pomadas o tratamientos para verrugas al menos 5 días antes de la prueba.',
      'Específicamente para mujeres',
      'Ciclo menstrual: No estar menstruando. Lo ideal es esperar al menos 5 días después de que haya terminado el periodo.',
      'Duchas y productos: No realizarse duchas vaginales ni utilizar espermicidas, geles lubricantes o tampones 48 horas antes.',
      'Exámenes previos: No haberse realizado una colposcopía o manipulación cervical en las 48 horas previas.',
      'Específicamente para hombres',
      'Retención urinaria: Se recomienda no orinar al menos 2 a 3 horas antes de la muestra, especialmente si la toma es uretral.',
      'Sin aseo profundo: No realizar un lavado profundo del surco prepucial justo antes de la toma (hacerlo de forma normal en la mañana).'
    ],
    incluye: [
      { grupo: 'GENOTIPOS DE ALTO RIESGO', pruebas: ['GENOTIPO 16', 'GENOTIPO 18', 'GENOTIPO 26', 'GENOTIPO 31', 'GENOTIPO 33', 'GENOTIPO 35', 'GENOTIPO 39', 'GENOTIPO 45', 'GENOTIPO 51', 'GENOTIPO 52', 'GENOTIPO 53', 'GENOTIPO 56', 'GENOTIPO 58', 'GENOTIPO 59', 'GENOTIPO 66', 'GENOTIPO 68', 'GENOTIPO 69', 'GENOTIPO 73', 'GENOTIPO 82', 'MUESTRA'] },
      { grupo: 'GENOTIPOS DE BAJO RIESGO', pruebas: ['GENOTIPO 6', 'GENOTIPO 11', 'GENOTIPO 40', 'GENOTIPO 42', 'GENOTIPO 43', 'GENOTIPO 44', 'GENOTIPO 54', 'GENOTIPO 61', 'GENOTIPO 70'] }
    ],
    tiposMuestra: ['Otras']
  },

  /* --- Perfiles ---------------------------------------------------------- */

  {
    clave: 'ACBETA2G',
    codigo: 'ACBETA2G',
    tipo: 'Perfiles',
    nombre: 'Ac. Anti Beta 2 glucoproteína IgA, IgG, IgM',
    precio: 1785,
    entrega: '4 días',
    muestra: 'sangre',
    indicaciones: ['Ayuno de 8 horas.'],
    incluye: [
      { grupo: 'Ac. Anti Beta 2 glucoproteína IgA, IgG, IgM', pruebas: ['AC. ANTI BETA 2 GLUCOPROTEINA IgA', 'AC. ANTI BETA 2 GLUCOPROTEINA IgG', 'AC. ANTI BETA 2 GLUCOPROTEINA IgM'] }
    ],
    tiposMuestra: ['Tubo oro — suero']
  },
  {
    clave: 'ACHGYM',
    codigo: 'ACHGYM',
    tipo: 'Perfiles',
    nombre: 'Ac. Anti Chlamydia trachomatis IgG e IgM',
    precio: 766.5,
    entrega: '5 días',
    muestra: 'sangre',
    indicaciones: ['Ayuno mínimo de 4 horas.'],
    incluye: [
      { grupo: 'Ac. Anti Chlamydia trachomatis IgG e IgM', pruebas: ['Ac. Anti Chlamydia trachomatis IgG', 'Ac. Anti Chlamydia trachomatis IgM'] }
    ],
    tiposMuestra: ['Tubo rojo — suero']
  },
  {
    clave: 'ANCApc',
    codigo: 'ANCApc',
    tipo: 'Perfiles',
    nombre: 'Ac. Anti Citoplasma de neutrófilos (P y C ANCA)',
    precio: 1271,
    entrega: '5 días',
    muestra: 'sangre',
    indicaciones: ['Ayuno mínimo de 4 horas.'],
    incluye: [
      { grupo: 'Ac. Anti Citoplasma de neutrófilos (P y C ANCA)', pruebas: ['c-ANCA/PR3 (Proteinasa 3)', 'p-ANCA/MPO (Mieloperoxidasa)'] }
    ],
    tiposMuestra: ['Tubo rojo — suero']
  },
  {
    clave: 'Ac.Gliad',
    codigo: 'Ac.Gliad',
    tipo: 'Perfiles',
    nombre: 'Ac. Anti Gliadinas IgA e IgG (Ac. Anti-Gluten)',
    precio: 1575,
    entrega: '3 días',
    muestra: 'sangre',
    indicaciones: ['Ayuno mínimo de 8 horas.'],
    incluye: [
      { grupo: 'Ac. Anti Gliadinas IgA e IgG (Ac. Anti-Gluten)', pruebas: ['Ac. Anti Gliadinas IgA', 'Ac. Anti Gliadinas IgG'] }
    ],
    tiposMuestra: ['Tubo rojo — suero']
  },
  {
    clave: 'ACTRANSG',
    codigo: 'ACTRANSG',
    tipo: 'Perfiles',
    nombre: 'AC. ANTI TRANSGLUTAMINASA TISULAR IgA E IgG',
    precio: 1175,
    entrega: '5 días',
    muestra: 'sangre',
    indicaciones: ['Ayuno de 8 horas.'],
    incluye: [
      { grupo: 'AC. ANTI TRANSGLUTAMINASA TISULAR IgA E IgG', pruebas: ['AC. ANTI TRANSGLUTAMINASA TISULAR IgA', 'AC. ANTI TRANSGLUTAMINASA TISULAR IgG'] }
    ],
    tiposMuestra: ['Tubo rojo — suero']
  },
  {
    clave: 'AcVarZosGyM',
    codigo: 'AcVarZosGyM',
    tipo: 'Perfiles',
    nombre: 'Ac. Anti Varicela IgG, IgM (Herpes Zóster)',
    precio: 1071,
    entrega: '11 días',
    muestra: 'sangre',
    indicaciones: ['Ayuno mínimo de 8 horas.'],
    incluye: [
      { grupo: 'Ac. Anti Varicela IgG, IgM (Herpes Zóster)', pruebas: ['Ac. Anti Varicela IgG (Herpes Zóster)', 'Ac. Anti Varicela IgM (Herpes Zóster)'] }
    ],
    tiposMuestra: ['Tubo rojo — suero']
  },
  {
    clave: 'ACcardiolip',
    codigo: 'ACcardiolip',
    tipo: 'Perfiles',
    nombre: 'Ac. Anti-Cardiolipinas IgG e IgM',
    precio: 2188,
    entrega: '4 días',
    muestra: 'sangre',
    indicaciones: ['Ayuno de 4 horas.', 'Determinar riesgo de exposición.'],
    incluye: [
      { grupo: 'Ac. Anti-Cardiolipinas IgG e IgM', pruebas: ['Ac. Anti-Cardiolipinas IgG', 'Ac. Anti-Cardiolipinas IgM'] }
    ],
    tiposMuestra: ['Tubo rojo — suero']
  },
  {
    clave: 'IgGIgMTCRUZI',
    codigo: 'IgGIgMTCRUZI',
    tipo: 'Perfiles',
    nombre: 'AC. ANTI-TRYPANOSOMA CRUZI IgG E IgM',
    precio: 1575,
    entrega: '14 días',
    muestra: 'sangre',
    indicaciones: ['Ayuno de 8 horas.'],
    incluye: [
      { grupo: 'AC. ANTI-TRYPANOSOMA CRUZI IgG E IgM', pruebas: ['AC. ANTI-TRYPANOSOMA CRUZI IgG', 'AC. ANTI-TRYPANOSOMA CRUZI IgM'] }
    ],
    tiposMuestra: ['Tubo rojo — suero']
  },
  {
    clave: 'PHERP1Y2',
    codigo: '2025',
    tipo: 'Perfiles',
    nombre: 'AC. ANTI-VIRUS HERPES I Y II IgG E IgM',
    precio: 1995,
    entrega: '5 días',
    muestra: 'sangre',
    indicaciones: ['Ayuno de 8 horas.'],
    incluye: [
      { grupo: 'AC. ANTI-VIRUS HERPES I Y II IgG E IgM', pruebas: ['ANTICUERPOS VIRUS HERPES 1 IgM', 'ANTICUERPOS VIRUS HERPES 1 IgG', 'ANTICUERPOS VIRUS HERPES 2 IgM', 'Ac. Anti-Virus Herpes (HSV) Tipo II IgG'] }
    ],
    tiposMuestra: ['Tubo rojo — suero']
  },
  {
    clave: 'ACLARCREAT',
    codigo: '003',
    tipo: 'Perfiles',
    nombre: 'ACLARAMIENTO DE CREATININA 24 HORAS',
    precio: 265,
    entrega: '8 hrs',
    muestra: 'orina',
    indicaciones: [
      'Solicite en la recepción un frasco para recolección de orina o adquiera uno con capacidad de 2.5 L.',
      'Ponga en el recipiente toda la orina que produzca en 24 horas. Si alguna cantidad de orina no se colecta, los resultados no serán confiables, por lo que no se recibirá la orina y deberá comenzar de nuevo la recolección.',
      'Durante el periodo de la recolección no ingerir alcohol ni bebidas diuréticas (té, café, etc.).',
      'Mantenga siempre en refrigeración el frasco con la recolección.',
      'La recolección debe comenzar alrededor de las 6 a.m.; la primera orina debe desecharse y a partir de ahí se recolecta todo el día, tarde y noche.',
      'Al día siguiente se debe recolectar la primera orina de la mañana e incluirla en el frasco recolector, debidamente identificado con su nombre.',
      'El frasco debe entregarse bien cerrado en el laboratorio lo antes posible.'
    ],
    incluye: [
      { grupo: 'ACLARAMIENTO DE CREATININA 24 HORAS', pruebas: ['CONCENTRACION DE CREATININA URINARIA', 'VOLUMEN URINARIO', 'PESO', 'CREATININA URINARIA DE 24 HORAS'] }
    ],
    tiposMuestra: ['Frasco — orina', 'Tubo rojo — suero']
  },
  {
    clave: 'AMIBA',
    codigo: 'AMIBA',
    tipo: 'Perfiles',
    nombre: 'AMIBA EN FRESCO',
    precio: 105,
    entrega: '8 hrs',
    muestra: 'heces',
    indicaciones: [
      'No requiere ayuno.',
      'Los pacientes deben evitar laxantes oleosos, antiparasitarios, antibióticos, enemas y medios de contraste radiológico (bario, carbón) durante al menos 72 horas (o hasta 2 semanas) antes de la recolección de la muestra.'
    ],
    incluye: [
      { grupo: 'AMIBA EN FRESCO', pruebas: ['BUSQUEDA DE AMIBAS', 'COLOR DE LA MUESTRA', 'CONSISTENCIA DE LA MUESTRA', 'PRESENCIA DE MOCO', 'LEUCOCITOS', 'PRESENCIA DE ERITROCITOS', 'FLORA BACTERIANA PREDOMINANTE'] }
    ],
    tiposMuestra: ['Frasco — heces']
  },
  {
    clave: 'semin',
    codigo: 'semin',
    tipo: 'Perfiles',
    nombre: 'ANALISIS SEMINAL DIRECTO',
    precio: 525,
    entrega: '2 días',
    muestra: 'otros',
    indicaciones: [
      'Abstinencia sexual de 2 a 3 días.',
      'Efectuar lavado genital con jabón y abundante agua.',
      'Recolectar la muestra mediante masturbación.',
      'Depositarla en un recipiente proporcionado por el laboratorio.',
      'Si la muestra es recolectada en su hogar: entregarla en el laboratorio máximo 30 minutos después de la recolección y mantenerla lo más cercano a la temperatura corporal.'
    ],
    incluye: [
      { grupo: 'ANALISIS SEMINAL DIRECTO', pruebas: ['SEMEN OBTENIDO', 'HORA DE ANALISIS', 'MUESTRA COMPLETA', 'ABSTINENCIA', 'COLOR', 'VOLUMEN', 'pH', 'VISCOSIDAD', 'LICUEFACCIÓN', 'AGLUTINACION', 'CONCENTRACION DE ESPERMATOZOIDES', 'RECUENTO TOTAL DE ESPERMATOZOIDES', 'MOTILIDAD ESPERMATICA TOTAL', 'MOTILIDAD PROGRESIVA (PR)', 'MOTILIDAD NO PROGRESIVA (NP)', 'ESPERMATOZOIDES INMÓVILES', 'VITALIDAD ESPERMATICA', 'MORFOLOGÍA ESPERMÁTICA NORMAL', 'DEFECTOS DE CABEZA', 'DEFECTO DE PIEZA MEDIA', 'DEFECTOS DE FLAGELO', 'INMADUROS', 'LEUCOCITOS', 'Epiteliales'] }
    ],
    tiposMuestra: ['Otras', 'Frasco — esperma']
  },
  {
    clave: 'aclupic',
    codigo: 'aclupic',
    tipo: 'Perfiles',
    nombre: 'ANTICOAGULANTE CIRCULATORIO LUPICO',
    precio: 999,
    entrega: '3 días',
    muestra: 'sangre',
    indicaciones: ['Ayuno de 8 horas.'],
    incluye: [
      { grupo: 'ANTICOAGULANTE CIRCULATORIO LUPICO', pruebas: ['Screening LA1', 'Confirmación LA2', 'Radio LA1/LA2'] }
    ],
    tiposMuestra: ['Tubo azul — plasma citratado']
  },
  {
    clave: 'Acantifosfo',
    codigo: 'Acantifosfo',
    tipo: 'Perfiles',
    nombre: 'Anticuerpos Anti Fosfolípidos IgG e IgM',
    precio: 942,
    entrega: '4 días',
    muestra: 'sangre',
    indicaciones: ['Ayuno de 8 horas.'],
    incluye: [
      { grupo: 'Anticuerpos Anti Fosfolípidos IgG e IgM', pruebas: ['Anticuerpos Anti Fosfolípidos IgG', 'Anticuerpos Anti Fosfolípidos IgM'] }
    ],
    tiposMuestra: ['Tubo oro — suero']
  },
  {
    clave: 'HEPAAC',
    codigo: 'HEPAAC',
    tipo: 'Perfiles',
    nombre: 'ANTICUERPOS ANTI HEPATITIS A (IgM E IgG)',
    precio: 787,
    entrega: '2 días',
    muestra: 'sangre',
    indicaciones: ['Ayuno de 4 horas mínimo.'],
    incluye: [
      { grupo: 'ANTICUERPOS ANTI HEPATITIS A (IgM E IgG)', pruebas: ['ANTICUERPOS ANTI HEPATITIS A IgG', 'ANTICUERPOS ANTI HEPATITIS A IgM'] }
    ],
    tiposMuestra: ['Tubo rojo — suero']
  },
  {
    clave: 'AcAHistC',
    codigo: 'AcAHistC',
    tipo: 'Perfiles',
    nombre: 'ANTICUERPOS ANTI HISTOPLASMA CAPSULATUM',
    precio: 1470,
    entrega: '10 días',
    muestra: 'sangre',
    indicaciones: ['Ayuno de 4 horas.'],
    incluye: [
      { grupo: 'ANTICUERPOS ANTI HISTOPLASMA CAPSULATUM', pruebas: ['Ac. An. Histoplasma Levadura', 'Ac. An. Histoplasma Micelial'] }
    ],
    tiposMuestra: ['Tubo oro — suero']
  },
  {
    clave: 'AcASGM',
    codigo: 'AcASGM',
    tipo: 'Perfiles',
    nombre: 'ANTICUERPOS ANTI SARAMPIÓN IgG E IgM',
    precio: 950,
    entrega: '8 días',
    muestra: 'otros',
    indicaciones: ['Recomendable pero no indispensable ayuno de 4 horas.'],
    incluye: [],
    tiposMuestra: []
  },
  {
    clave: 'VIHQuim',
    codigo: 'VIHQuim',
    tipo: 'Perfiles',
    nombre: 'ANTICUERPOS ANTI VIH POR QUIMIOLUMINISCENCIA',
    precio: 550,
    entrega: '2 días',
    muestra: 'sangre',
    indicaciones: ['Ayuno mínimo de 4 horas.'],
    incluye: [
      { grupo: 'ANTICUERPOS ANTI VIH POR QUIMIOLUMINISCENCIA', pruebas: ['ANTIGENO P24', 'Anticuerpos anti VIH'] }
    ],
    tiposMuestra: ['Tubo oro — suero', 'Tubo rojo — suero']
  },
  {
    clave: 'AcDesm1-3',
    codigo: 'AcDesm1-3',
    tipo: 'Perfiles',
    nombre: 'Anticuerpos anti-Epidérmicos (Desmogleína 1 y Desmogleína 3)',
    precio: 11550,
    entrega: '15 días',
    muestra: 'otros',
    indicaciones: [],
    incluye: [],
    tiposMuestra: []
  },
  {
    clave: 'ANA',
    codigo: 'ANA',
    tipo: 'Perfiles',
    nombre: 'ANTICUERPOS ANTINUCLEARES',
    precio: 515,
    entrega: '5 días',
    muestra: 'sangre',
    indicaciones: [],
    incluye: [
      { grupo: 'ANTICUERPOS ANTINUCLEARES', pruebas: ['ANTICUERPOS ANTINUCLEARES', 'TITULO', 'NOMENCLATURA ICAP', 'PATRÓN ICAP', 'PATRÓN COMÚN', 'TITULO 2', 'NOMENCLATURA ICAP 2', 'PATRÓN ICAP 2', 'PATRÓN COMÚN 2'] }
    ],
    tiposMuestra: ['Tubo oro — suero', 'Tubo rojo — suero']
  },
  {
    clave: 'RICKRICK',
    codigo: '6419',
    tipo: 'Perfiles',
    nombre: 'ANTICUERPOS IgG E IgM ANTI RICKETTSIA RICKETTSII',
    precio: 4578,
    entrega: '9 días',
    muestra: 'otros',
    indicaciones: ['Ayuno mínimo de 4 horas.'],
    incluye: [],
    tiposMuestra: []
  },
  {
    clave: 'RICKTYPHI',
    codigo: '37503',
    tipo: 'Perfiles',
    nombre: 'ANTICUERPOS IgG E IgM ANTI RICKETTSIA TYPHI (TIFUS)',
    precio: 4578,
    entrega: '10 días',
    muestra: 'sangre',
    indicaciones: ['Ayuno de 4 horas mínimo.'],
    incluye: [
      { grupo: 'ANTICUERPOS IgG E IgM ANTI RICKETTSIA TYPHI (TIFUS)', pruebas: ['ANTICUERPOS IgG ANTI RICKETTSIA TYPHI (TIFUS)', 'ANTICUERPOS IgM ANTI RICKETTSIA TYPHI (TIFUS)'] }
    ],
    tiposMuestra: ['Tubo oro — suero']
  },
  {
    clave: 'ACRSARSCOV',
    codigo: 'ACRSARSCOV',
    tipo: 'Perfiles',
    nombre: 'ANTICUERPOS IgG E IgM ANTI SARS-CoV2',
    precio: 681,
    entrega: '1 día',
    muestra: 'sangre',
    indicaciones: ['Ayuno de 4 horas.', 'Solicitar fecha de diagnóstico.', 'Medidas de seguridad 3.'],
    incluye: [
      { grupo: 'ANTICUERPOS IgG E IgM ANTI SARS-CoV2', pruebas: ['ANTICUERPOS IgG ANTI SARS-CoV2', 'ANTICUERPOS IgM ANTI SARS-CoV2'] }
    ],
    tiposMuestra: ['Tubo rojo — suero']
  },
  {
    clave: 'ATD3',
    codigo: 'ATD3',
    tipo: 'Perfiles',
    nombre: 'ANTIDOPING BASICO',
    precio: 430,
    entrega: '8 hrs',
    muestra: 'orina',
    indicaciones: ['Muestra de orina al azar recolectada por técnica de chorro medio, con supervisión de un químico.'],
    incluye: [
      { grupo: 'ANTIDOPING BASICO', pruebas: ['CANNABINOIDES (MARIHUANA)', 'COCAINA', 'ANFETAMINAS'] }
    ],
    tiposMuestra: ['Frasco — orina']
  },
  {
    clave: 'ATD6',
    codigo: 'ATD6',
    tipo: 'Perfiles',
    nombre: 'ANTIDOPING COMPLETO',
    precio: 735,
    entrega: '8 hrs',
    muestra: 'orina',
    indicaciones: ['Muestra de orina al azar recolectada por técnica de chorro medio, bajo supervisión.'],
    incluye: [
      { grupo: 'ANTIDOPING COMPLETO', pruebas: ['CANNABINOIDES (MARIHUANA)', 'COCAINA', 'ANFETAMINAS', 'Opiáceos', 'METANFETAMINAS'] }
    ],
    tiposMuestra: ['Frasco — orina']
  },
  {
    clave: 'APOAB',
    codigo: 'APOAB',
    tipo: 'Perfiles',
    nombre: 'APOLIPOPROTEINAS A1 Y B',
    precio: 1000,
    entrega: '3 días',
    muestra: 'sangre',
    indicaciones: ['Ayuno de 8 horas.'],
    incluye: [
      { grupo: 'APOLIPOPROTEINAS A1 Y B', pruebas: ['APOLIPOPROTEINA A1', 'Apolipoproteína B', 'RELACION APO B/APO A1'] }
    ],
    tiposMuestra: ['Tubo oro — suero', 'Tubo rojo — suero']
  },
  {
    clave: 'BAAR3M',
    codigo: '301',
    tipo: 'Perfiles',
    nombre: 'BAAR SERIADO 3 MUESTRAS',
    precio: 315,
    entrega: '8 hrs',
    muestra: 'otros',
    indicaciones: [
      'Para el examen de BAAR necesitas recolectar 3 muestras de esputo en días consecutivos.',
      'Lava bien tus manos antes de cada recolección y tose profundamente para expectorar en el contenedor estéril proporcionado.',
      'La primera muestra se toma al inicio de los síntomas, la segunda a la mañana siguiente en ayunas y la tercera al entregar la segunda.',
      'Es importante evitar contaminar la muestra con saliva y llevar los contenedores al laboratorio lo antes posible.',
      'Si tienes dificultades para expectorar, consulta a tu médico.'
    ],
    incluye: [
      { grupo: 'BAAR SERIADO 3 MUESTRAS', pruebas: ['BAAR 1RA MUESTRA', 'BAAR 2DA MUESTRA', 'BAAR 3RA MUESTRA'] }
    ],
    tiposMuestra: ['Otras', 'Frasco — esputo']
  },
  {
    clave: 'BILIS',
    codigo: 'BILIS',
    tipo: 'Perfiles',
    nombre: 'BILIRRUBINAS',
    precio: 126,
    entrega: '8 hrs',
    muestra: 'sangre',
    indicaciones: ['Sin indicaciones especiales (no requiere ayuno).'],
    incluye: [
      { grupo: 'BILIRRUBINAS', pruebas: ['BILIRRUBINA TOTAL', 'BILIRRUBINA DIRECTA', 'BILIRRUBINA INDIRECTA'] }
    ],
    tiposMuestra: ['Tubo rojo — suero']
  },
  {
    clave: 'KPLAMDO',
    codigo: 'KPLAMDO',
    tipo: 'Perfiles',
    nombre: 'CADENAS LIGERAS LIBRES KAPPA/LAMBDA EN ORINA DE 24 HORAS',
    precio: 2357,
    entrega: '11 días',
    muestra: 'orina',
    indicaciones: ['Recolectar en contenedor de plástico, limpio, estéril y con tapa de rosca.'],
    incluye: [
      { grupo: 'CADENAS LIGERAS LIBRES KAPPA/LAMBDA EN ORINA DE 24 HORAS', pruebas: ['CADENAS LIGERAS LIBRES KAPPA EN ORINA', 'CADENAS LIGERAS LIBRES LAMBDA EN ORINA', 'CADENAS LIGERAS LIBRES KAPPA EN ORINA DE 24 HORAS', 'CADENAS LIGERAS LIBRES LAMBDA EN ORINA DE 24 HORAS', 'COCIENTE KAPPA-LAMBDA'] }
    ],
    tiposMuestra: ['Frasco — orina']
  },
  {
    clave: 'KLS',
    codigo: 'KLS',
    tipo: 'Perfiles',
    nombre: 'CADENAS LIGERAS LIBRES KAPPA/LAMBDA EN SUERO',
    precio: 2031,
    entrega: '9 días',
    muestra: 'sangre',
    indicaciones: ['Ayuno de 8 horas.'],
    incluye: [
      { grupo: 'CADENAS LIGERAS LIBRES KAPPA/LAMBDA EN SUERO', pruebas: ['CADENAS LIGERAS LIBRES KAPPA EN SUERO', 'CADENAS LIGERAS LIBRES LAMBDA EN SUERO', 'RELACIÓN KAPPA/LAMBDA'] }
    ],
    tiposMuestra: ['Otras', 'Tubo oro — suero', 'Tubo rojo — suero']
  },
  {
    clave: 'CALLACP',
    codigo: 'CALLACP',
    tipo: 'Perfiles',
    nombre: 'CALPROTECTINA/LACTOFERRINA',
    precio: 1102.5,
    entrega: '8 hrs',
    muestra: 'heces',
    indicaciones: [
      'El paciente no debe haber estado bajo tratamiento antibiótico por lo menos 3 días antes de la toma, y preferentemente antes de tomar antidiarreicos.',
      'Recolectar heces en frasco sin contaminación con agua u orina.'
    ],
    incluye: [
      { grupo: 'CALPROTECTINA/LACTOFERRINA', pruebas: ['CALPROTECTINA', 'LACTOFERRINA'] }
    ],
    tiposMuestra: ['Frasco — heces']
  },
  {
    clave: 'CVHC',
    codigo: 'CVHC',
    tipo: 'Perfiles',
    nombre: 'CARGA VIRAL DE HEPATITIS C',
    precio: 4620,
    entrega: '8 días',
    muestra: 'sangre',
    indicaciones: ['Programar cita para la toma: la muestra requiere ser enviada el mismo día de la toma.'],
    incluye: [
      { grupo: 'CARGA VIRAL DE HEPATITIS C', pruebas: ['Partículas virales HCV', 'Logaritmo'] }
    ],
    tiposMuestra: ['Lila — plasma EDTA']
  },
  {
    clave: 'CVCMV',
    codigo: 'CVCMV',
    tipo: 'Perfiles',
    nombre: 'CARGA VIRAL PARA CITOMEGALOVIRUS (CMV)',
    precio: 4515,
    entrega: '7 días',
    muestra: 'sangre',
    indicaciones: [
      'Ayuno de 12 horas, durante el cual se permite el consumo de agua.',
      'Se debe evitar el alcohol durante 24 horas antes del muestreo de sangre.',
      'En la mañana previa a la toma de muestras, los pacientes deben abstenerse de fumar cigarrillos y de bebidas que contengan cafeína (té, café, etc.).'
    ],
    incluye: [
      { grupo: 'CARGA VIRAL PARA CITOMEGALOVIRUS (CMV)', pruebas: ['CARGA VIRAL PARA CITOMEGALOVIRUS', 'Logaritmo 10'] }
    ],
    tiposMuestra: ['Lila — plasma EDTA']
  },
  {
    clave: 'PCatO',
    codigo: 'PCatO',
    tipo: 'Perfiles',
    nombre: 'Catecolaminas en Orina de 24 horas',
    precio: 1974,
    entrega: '7 días',
    muestra: 'otros',
    indicaciones: ['Evitar 72 horas antes la ingesta de vitamina B, café y plátano, así como medicamentos como la alfametildopa, inhibidores de la MAO y COMT, y medicamentos para el tratamiento de hipertensión.'],
    incluye: [],
    tiposMuestra: []
  },
  {
    clave: 'CATEPLASMA',
    codigo: '00123',
    tipo: 'Perfiles',
    nombre: 'CATECOLAMINAS EN PLASMA',
    precio: 1569,
    entrega: '11 días',
    muestra: 'sangre',
    indicaciones: [
      'Abstenerse de ingerir los siguientes alimentos 72 horas antes de la toma de muestra: aguacate, plátano, café, ciruela, piña, tomate, papaya, nuez y vainilla.',
      'Abstenerse de las siguientes drogas: aspirina, corticotropina, reserpina, nicotina, vitamina B, alfametildopa, inhibidores de la MAO y de la COMT.'
    ],
    incluye: [
      { grupo: 'CATECOLAMINAS EN PLASMA', pruebas: ['ADRENALINA EN PLASMA', 'NORADRENALINA EN PLASMA', 'DOPAMINA EN PLASMA', 'CATECOLAMINAS TOTALES EN PLASMA'] }
    ],
    tiposMuestra: ['Lila — plasma EDTA']
  },
  {
    clave: 'PCRMYCGONO',
    codigo: 'PCRMYCGONO',
    tipo: 'Perfiles',
    nombre: 'Chlamydia Trachomatis y Neisseria Gonorrhoeae por PCR',
    precio: 1100,
    entrega: '7 días',
    muestra: 'exudados',
    indicaciones: ['Abstinencia sexual de 3 días.', 'No se recomienda uso de cremas ni óvulos 7 días antes de la toma.'],
    incluye: [
      { grupo: 'Chlamydia Trachomatis y Neisseria Gonorrhoeae por PCR', pruebas: ['Chlamydia Trachomatis PCR', 'Neisseria Gonorrhoeae por PCR'] }
    ],
    tiposMuestra: ['Hisopo — exudado cervical', 'Medio de transporte — Femprevence']
  },
  {
    clave: 'CMF',
    codigo: 'CMF',
    tipo: 'Perfiles',
    nombre: 'CITOLOGIA DE MOCO FECAL',
    precio: 126,
    entrega: '8 hrs',
    muestra: 'heces',
    indicaciones: [
      'Para mayores de 3 años: recolectar heces en frasco sin contaminación con agua u orina.',
      'Los pacientes deben evitar laxantes oleosos, antiparasitarios, antibióticos, enemas y medios de contraste radiológico (bario, carbón) durante al menos 72 horas (o hasta 2 semanas) antes de la recolección de la muestra.'
    ],
    incluye: [
      { grupo: 'CITOLOGIA DE MOCO FECAL', pruebas: ['LEUCOCITOS', 'POLIMORFONUCLEARES', 'MONONUCLEARES', 'ERITROCITOS', 'BLASTOCONIDIOS'] }
    ],
    tiposMuestra: ['Frasco — heces', 'Heces CM']
  },
  {
    clave: 'CITOLLCR',
    codigo: 'CITOLLCR',
    tipo: 'Perfiles',
    nombre: 'CITOLOGICO DE LIQUIDO CEFALORRAQUIDEO',
    precio: 808,
    entrega: '5 días',
    muestra: 'otros',
    indicaciones: ['La muestra remitida deberá ser tomada por el médico especialista. Volumen óptimo: 2 mL. Frasco estéril.'],
    incluye: [
      { grupo: 'CITOLOGICO DE LIQUIDO CEFALORRAQUIDEO', pruebas: ['CITOLOGICO DE LIQUIDOS SEROSOS'] }
    ],
    tiposMuestra: ['Otras']
  },
  {
    clave: 'BH',
    codigo: '45',
    tipo: 'Perfiles',
    nombre: 'CITOMETRIA HEMATICA COMPLETA',
    precio: 215,
    entrega: '8 hrs',
    muestra: 'sangre',
    indicaciones: ['No requiere ayuno.'],
    incluye: [
      {
        grupo: 'CITOMETRIA HEMATICA COMPLETA',
        pruebas: ['GLOBULOS ROJOS', 'HEMOGLOBINA', 'HEMATOCRITO', 'VOLUMEN GLOBULAR MEDIO', 'HCM', 'CMHC', 'RDW', 'PLAQUETAS', 'VOLUMEN PLAQUETARIO MEDIO', 'LEUCOCITOS TOTALES', 'NEUTROFILOS', 'BANDAS', 'LINFOCITOS', 'MONOCITOS', 'EOSINOFILOS', 'BASOFILOS', 'METAMIELOCITOS', 'MIELOCITOS', 'PROMIELOCITOS', 'BLASTOS', 'OBSERVACIONES EN ERITROCITOS', 'OBSERVACIONES EN LEUCOCITOS', 'OBSERVACIONES EN PLAQUETAS']
      }
    ],
    tiposMuestra: ['Lila — plasma EDTA', 'Tubo lila — sangre total']
  },
  {
    clave: 'CITOQLCR',
    codigo: 'CITOQLCR',
    tipo: 'Perfiles',
    nombre: 'CITOQUIMICO DE LIQUIDO CEFALORAQUIDEO',
    precio: 525,
    entrega: '2 días',
    muestra: 'otros',
    indicaciones: ['La muestra de LCR debe venir con la identificación completa del paciente y, preferentemente, en varios tubos estériles con tapa de rosca y sin aditivos, idealmente etiquetados con la secuencia de extracción.'],
    incluye: [
      { grupo: 'CITOQUIMICO DE LIQUIDO CEFALORAQUIDEO', pruebas: ['COLOR', 'SEDIMENTO EN LCR', 'pH', 'GLUCOSA EN LCR', 'PROTEINAS TOTALES EN LCR', 'SODIO EN LCR', 'POTASIO EN LCR', 'CLORO EN LCR', 'PROTEINA C REACTIVA EN LCR', 'TINCION DE GRAM', 'BAAR', 'TINTA CHINA', 'ERITROCITOS', 'LEUCOCITOS'] }
    ],
    tiposMuestra: ['Otras', 'Frasco — esperma', 'Frasco — orina', 'Tubo estéril — líquido cefalorraquídeo']
  }
];
