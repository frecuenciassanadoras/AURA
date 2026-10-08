/**
 * courses-data.js - Repositorio de Pasos & Módulos Somáticos AURA
 * Contiene los 3 Pasos del Método AURA y sus 10 Módulos por paso (30 Módulos en total),
 * estructurados en base a la transformación somática (Antes vs. Después de AURA).
 */

const AURA_STEPS = [
    {
        id: "paso-1",
        stepNumber: 1,
        tag: "PASO 1",
        title: "Reconoce tu Terreno",
        parenthesis: "(Responsabilidad Propia Radical)",
        subtitle: "Identifica lo que te desregula y comprométete con tu salud nerviosa",
        colorClass: "card-step-1",
        accentColor: "#f59e0b",
        badgeColor: "gold",
        visual: "assets/step1_mountain.svg",
        caption: "Identifica lo que te desregula, y comprométete en tu salud nerviosa.",
        promiseBefore: "Respondes desde tu estado emocional automático y tus estados te controlan a ti.",
        promiseAfter: "Reconoces tu estado antes de la reacción automática y habitas el observador lúcido.",
        modulesCount: 10,
        modules: [
            {
                id: 1,
                globalId: "p1-m1",
                stepId: "paso-1",
                stepNumber: 1,
                number: "01",
                title: "El Despertar del Observador Somático",
                subtitle: "La separación lúcida entre tus pensamientos y tu presencia",
                duration: "25 min",
                type: "Conciencia Somática",
                badge: "OBSERVADOR",
                icon: "fa-eye",
                transformation: "De fundirte con el ruido mental ➔ Al espacio sereno del testigo interior.",
                description: "Aprende a distinguir entre las películas proyectadas por tu mente y la conciencia lúcida que las observa. Establece tu primer anclaje somático.",
                file: "cursos/modulo_01_bienvenido_al_despertar.md"
            },
            {
                id: 2,
                globalId: "p1-m2",
                stepId: "paso-1",
                stepNumber: 1,
                number: "02",
                title: "El Piloto Automático y los Circuitos Basales",
                subtitle: "Neurobiología de la reactividad y ahorro metabólico",
                duration: "30 min",
                type: "Neurobiología",
                badge: "PILOTO AUTOMÁTICO",
                icon: "fa-robot",
                transformation: "De actuar sin pensar ➔ A comprender por qué tu cerebro repite patrones mecánicos.",
                description: "Descubre cómo los ganglios basales operan en segundo plano y cómo insertar la cuña prefrontal para interrumpir el bucle reactivo.",
                file: "cursos/modulo_02_el_piloto_automatico.md"
            },
            {
                id: 3,
                globalId: "p1-m3",
                stepId: "paso-1",
                stepNumber: 1,
                number: "03",
                title: "Mapeo Somático: ¿Dónde Sientes la Amenaza?",
                subtitle: "Interocepción profunda y detección precoz de la tensión",
                duration: "35 min",
                type: "Interocepción",
                badge: "MAPEO SOMÁTICO",
                icon: "fa-heartbeat",
                transformation: "De ignorar las señales corporales ➔ A rastrear la contracción antes de la crisis.",
                description: "Aprende a escanear mandíbula, diafragma y plexo solar para decodificar las micro-alarmas corporales antes del secuestro emocional.",
                file: "cursos/modulo_03_la_mente_crea_filtros.md"
            },
            {
                id: 4,
                globalId: "p1-m4",
                stepId: "paso-1",
                stepNumber: 1,
                number: "04",
                title: "El Secuestro Amigdalar y la Mente Reactiva",
                subtitle: "Los 12 milisegundos de emergencia biológica",
                duration: "35 min",
                type: "Neurobiología",
                badge: "AMÍGDALA",
                icon: "fa-brain",
                transformation: "De perder el control bajo presión ➔ A desactivar la vía de emergencia en tiempo real.",
                description: "Comprende la diferencia entre la Vía Corta (amígdala, 12 ms) y la Vía Larga (córtex prefrontal, 250 ms) para recuperar tu lóbulo frontal.",
                file: "cursos/modulo_04_el_poder_de_la_atencion.md"
            },
            {
                id: 5,
                globalId: "p1-m5",
                stepId: "paso-1",
                stepNumber: 1,
                number: "05",
                title: "Filtros Perceptuales y el SARA",
                subtitle: "Cómo el sistema reticular confunde incomodidad con peligro",
                duration: "30 min",
                type: "Percepción",
                badge: "SESGOS & SARA",
                icon: "fa-filter",
                transformation: "De ver peligro en todas partes ➔ A limpiar los filtros que distorsionan tu realidad.",
                description: "Desmonta los sesgos cognitivos que le hacen creer a tu sistema nervioso que una crítica o mensaje es una amenaza de muerte.",
                file: "cursos/modulo_05_comprender_tus_emociones.md"
            },
            {
                id: 6,
                globalId: "p1-m6",
                stepId: "paso-1",
                stepNumber: 1,
                number: "06",
                title: "El Anclaje Atencional en el Cuerpo",
                subtitle: "Foco endógeno para detener la rumiación mental",
                duration: "35 min",
                type: "Atención Somática",
                badge: "ENRAIZAMIENTO",
                icon: "fa-anchor",
                transformation: "De vivir atrapado en la cabeza ➔ Al anclaje físico que apaga la tormenta.",
                description: "Técnicas de enraizamiento kinestésico 5-4-3-2-1 para retirar la glucosa de la mente rumiante y retornarla al cuerpo presente.",
                file: "cursos/modulo_06_las_historias_que_te_cuentas.md"
            },
            {
                id: 7,
                globalId: "p1-m7",
                stepId: "paso-1",
                stepNumber: 1,
                number: "07",
                title: "Las Historias que Nutren la Desregulación",
                subtitle: "Silenciar la Red Neuronal por Defecto (RND)",
                duration: "35 min",
                type: "Cognición Somática",
                badge: "RND & RELATOS",
                icon: "fa-book-open",
                transformation: "De creer cada pensamiento dramático ➔ A cortar el guión antes de la espiral.",
                description: "Aprende a detectar cuándo tu mente construye fábulas de insuficiencia o catástrofe que sobreestimulan tu sistema nervioso autónomo.",
                file: "cursos/modulo_07_la_sombra_y_lo_reprimido.md"
            },
            {
                id: 8,
                globalId: "p1-m8",
                stepId: "paso-1",
                stepNumber: 1,
                number: "08",
                title: "La Sombra Somática y las Tensiones Reprimidas",
                subtitle: "Liberación de corazas fasciales y emociones estancadas",
                duration: "40 min",
                type: "Liberación Somática",
                badge: "CORAZA FASCIAL",
                icon: "fa-layer-group",
                transformation: "De acumular dolor no procesado ➔ A permitir el drenaje físico de tensiones crónicas.",
                description: "Explora la memoria muscular del cuerpo, afloja las bandas de tensión crónica y permite que la carga somática reprimida se disuelva.",
                file: "cursos/modulo_08_el_arte_de_soltar_y_desidentificarse.md"
            },
            {
                id: 9,
                globalId: "p1-m9",
                stepId: "paso-1",
                stepNumber: 1,
                number: "09",
                title: "El Arte de la Desidentificación Inmediata",
                subtitle: "Tú no eres la tormenta química que atraviesa tu cuerpo",
                duration: "40 min",
                type: "Trascendencia",
                badge: "DESIDENTIFICACIÓN",
                icon: "fa-cloud-sun",
                transformation: "De decir 'yo soy mi ira' ➔ A observar 'hay una ola de adrenalina en mi pecho'.",
                description: "Aprende a sostener la experiencia emocional como un fenómeno meteorológico transitorio sin añadirle combustible ni narrativa de culpa.",
                file: "cursos/modulo_09_la_maestria_del_momento_presente.md"
            },
            {
                id: 10,
                globalId: "p1-m10",
                stepId: "paso-1",
                stepNumber: 1,
                number: "10",
                title: "Responsabilidad Propia Radical: Tu Nuevo Terreno",
                subtitle: "Compromiso fundacional con tu soberanía nerviosa",
                duration: "45 min",
                type: "Integración Paso 1",
                badge: "SOBERANÍA",
                icon: "fa-mountain",
                transformation: "De culpar a las circunstancias ➔ A ser el dueño absoluto de tu estado interior.",
                description: "El manifiesto y auditoría del Paso 1: mapa personal de detonantes, límites no negociables y el cierre del ciclo de la víctima reactiva.",
                file: "cursos/modulo_10_integracion_tu_nueva_arquitectura_interior.md"
            }
        ]
    },
    {
        id: "paso-2",
        stepNumber: 2,
        tag: "PASO 2",
        title: "Expande Su Sistema Nervioso",
        parenthesis: "(Ventana de Tolerancia Somática)",
        subtitle: "Avanza en el proceso de ampliar tu ventana de tolerancia somática",
        colorClass: "card-step-2",
        accentColor: "#a855f7",
        badgeColor: "purple",
        visual: "assets/step2_waves.svg",
        caption: "Avanza en el proceso de ampliar tu ventana de tolerancia somática.",
        promiseBefore: "Tu cuerpo siente amenaza aunque racionalmente sepas que no existe, sin herramientas prácticas.",
        promiseAfter: "Tienes herramientas respiratorias concretas y tu cuerpo regula más rápido cuando la activación sube.",
        modulesCount: 10,
        modules: [
            {
                id: 11,
                globalId: "p2-m1",
                stepId: "paso-2",
                stepNumber: 2,
                number: "01",
                title: "La Ventana de Tolerancia Somática",
                subtitle: "Neurobiología de la zona de regulación óptima",
                duration: "25 min",
                type: "Neuro-Regulación",
                badge: "VENTANA SOMÁTICA",
                icon: "fa-compress-arrows-alt",
                transformation: "De oscilar entre pánico y congelamiento ➔ A ensanchar tu capacidad de contención.",
                description: "Comprende la zona óptima según el Dr. Dan Siegel y por qué ampliar tu umbral nervioso es el secreto para no colapsar ante la vida.",
                file: "cursos/modulo_11_la_ventana_de_tolerancia_somatica.md"
            },
            {
                id: 12,
                globalId: "p2-m2",
                stepId: "paso-2",
                stepNumber: 2,
                number: "02",
                title: "El Freno Vagal y la Teoría Polivagal",
                subtitle: "Activación del Nervio Vago Ventral para frenar el estrés",
                duration: "30 min",
                type: "Polivagal",
                badge: "FRENO VAGAL",
                icon: "fa-project-diagram",
                transformation: "Del estado simpático defensivo ➔ A la seguridad neuroceptiva del vago ventral.",
                description: "La ciencia del Dr. Stephen Porges: activa el freno vagal del corazón mediante el alargamiento de la fase exhalatoria.",
                file: "cursos/modulo_12_el_freno_vagal_y_la_teoria_polivagal.md"
            },
            {
                id: 13,
                globalId: "p2-m3",
                stepId: "paso-2",
                stepNumber: 2,
                number: "03",
                title: "El Suspiro Fisiológico de Emergencia",
                subtitle: "Doble inhalación y exhalación larga para regular en 30 segundos",
                duration: "30 min",
                type: "Breathwork Rápido",
                badge: "SUSPIRO FISIOLÓGICO",
                icon: "fa-wind",
                transformation: "De quedar sin aire bajo ansiedad ➔ A desinflar los alvéolos y bajar pulsaciones al instante.",
                description: "La herramienta descubierta en laboratorios de Stanford: reabre los sacos de los pulmones y activa el freno parasimpático en 3 ciclos.",
                file: "cursos/modulo_13_el_suspiro_fisiologico_de_emergencia.md"
            },
            {
                id: 14,
                globalId: "p2-m4",
                stepId: "paso-2",
                stepNumber: 2,
                number: "04",
                title: "Bioquímica Respiratoria: CO2 y Tolerancia Somática",
                subtitle: "La relación entre dióxido de carbono y umbral de pánico",
                duration: "35 min",
                type: "Fisiología Celular",
                badge: "TOLERANCIA AL CO2",
                icon: "fa-flask",
                transformation: "De hiperventilar por miedo ➔ A reacondicionar la tolerancia bioquímica al CO2.",
                description: "Aprende el Test BOLT y ejercicios de retención suave para elevar tu umbral químico frente al estrés agudo.",
                file: "cursos/modulo_14_bioquimica_respiratoria_co2.md"
            },
            {
                id: 15,
                globalId: "p2-m5",
                stepId: "paso-2",
                stepNumber: 2,
                number: "05",
                title: "Down-Regulation: Fisiología de la Calma",
                subtitle: "Protocolo 4-7-8 y exhalación labial con resistencia",
                duration: "30 min",
                type: "Down-Regulation",
                badge: "CALMA INMEDIATA",
                icon: "fa-arrow-down",
                transformation: "De taquicardia prolongada ➔ Al descenso voluntario del ritmo cardíaco y presión arterial.",
                description: "Protocolos guiados de exhalación con resistencia labial para enviar señales directas de seguridad al tronco encefálico.",
                file: "cursos/modulo_15_down_regulation_calma.md"
            },
            {
                id: 16,
                globalId: "p2-m6",
                stepId: "paso-2",
                stepNumber: 2,
                number: "06",
                title: "Up-Regulation: Salir del Congelamiento Somático",
                subtitle: "Superar el colapso dorsal mediante respiración estimulante",
                duration: "35 min",
                type: "Up-Regulation",
                badge: "ACTIVACIÓN SANA",
                icon: "fa-bolt",
                transformation: "De la apatía y parálisis ➔ A la energía vital limpia sin detonar pánico.",
                description: "Protocolo de respiración de fuelle y movimiento diafragmático para salir del estado dorsal vagal (congelamiento) de forma segura.",
                file: "cursos/modulo_16_up_regulation_congelamiento.md"
            },
            {
                id: 17,
                globalId: "p2-m7",
                stepId: "paso-2",
                stepNumber: 2,
                number: "07",
                title: "Respiración en Caja (Box Breathing) Táctica",
                subtitle: "El ritmo 4-4-4-4 de máxima estabilidad bajo fuego",
                duration: "35 min",
                type: "Respiración Táctica",
                badge: "BOX BREATHING",
                icon: "fa-square",
                transformation: "De mente nublada en conflicto ➔ A la ecuanimidad y precisión mental de alto rendimiento.",
                description: "Inhala 4s, sostén 4s, exhala 4s, retén 4s. El método de los cuerpos de operaciones especiales adaptado a la vida cotidiana.",
                file: "cursos/modulo_17_respiracion_en_caja_box_breathing.md"
            },
            {
                id: 18,
                globalId: "p2-m8",
                stepId: "paso-2",
                stepNumber: 2,
                number: "08",
                title: "Reentrenamiento del Reflejo de Falsa Alarma",
                subtitle: "Disociar la incomodidad corporal del peligro real",
                duration: "40 min",
                type: "Desensibilización",
                badge: "DESENSIBILIZACIÓN",
                icon: "fa-shield-alt",
                transformation: "De huir de las sensaciones físicas ➔ A sostener la activación con calma interior.",
                description: "Aprende a tolerar calor en el pecho, temblor o pulsaciones sin añadirle el pensamiento de catástrofe.",
                file: "cursos/modulo_18_reentrenamiento_falsa_alarma.md"
            },
            {
                id: 19,
                globalId: "p2-m9",
                stepId: "paso-2",
                stepNumber: 2,
                number: "09",
                title: "Frecuencias Acústicas & Resonancia Vagal",
                subtitle: "Vocalización, humming y ondas Alfa 14 Hz para el nervio vago",
                duration: "40 min",
                type: "Audio Somático",
                badge: "RESONANCIA VAGAL",
                icon: "fa-headphones",
                transformation: "De tensión en garganta y pecho ➔ A la vibración del vago laríngeo que desbloquea la calma.",
                description: "Estimulación mecánica del nervio vago a través de la vibración del paladar blando y tonos acústicos binaurales de sincronización.",
                file: "cursos/modulo_19_frecuencias_acusticas_resonancia_vagal.md"
            },
            {
                id: 20,
                globalId: "p2-m10",
                stepId: "paso-2",
                stepNumber: 2,
                number: "10",
                title: "Calibración Somática: El Salto de Ventana",
                subtitle: "Prueba integral de expansión nerviosa y asimilación",
                duration: "45 min",
                type: "Integración Paso 2",
                badge: "VENTANA EXPANDIDA",
                icon: "fa-chart-line",
                transformation: "De un sistema nervioso frágil ➔ A una ventana de tolerancia amplia y resiliente.",
                description: "Evaluación práctica de tu nuevo ancho de banda somático y combinación de protocolos según el nivel de activación.",
                file: "cursos/modulo_20_calibracion_somatica_salto_de_ventana.md"
            }
        ]
    },
    {
        id: "paso-3",
        stepNumber: 3,
        tag: "PASO 3",
        title: "Practica Sostenidamente",
        parenthesis: "(Integración Diaria & Maestría)",
        subtitle: "Con la nueva ventana de tolerancia, consolida tu soberanía como respirador a 90 días",
        colorClass: "card-step-3",
        accentColor: "#06b6d4",
        badgeColor: "cyan",
        visual: "assets/step3_tree.svg",
        caption: "Con la nueva ventana de tolerancia, comienza tu camino como respirador.",
        promiseBefore: "Sabes qué hacer pero no puedes hacerlo cuando más lo necesitas ante el estrés agudo.",
        promiseAfter: "Mayor participación consciente en cómo respondes; tú estás en control de tu estado interior.",
        modulesCount: 10,
        modules: [
            {
                id: 21,
                globalId: "p3-m1",
                stepId: "paso-3",
                stepNumber: 3,
                number: "01",
                title: "Coherencia Cardíaca: Sincronía Corazón-Cerebro",
                subtitle: "El ritmo de resonancia a 0.1 Hz (6 ciclos por minuto)",
                duration: "25 min",
                type: "Coherencia",
                badge: "COHERENCIA CARDÍACA",
                icon: "fa-heart",
                transformation: "De una variabilidad cardíaca caótica ➔ A la sinfonía óptima entre corazón y cerebro.",
                description: "Inhala 5s, exhala 5s. La frecuencia electromagnética que sincroniza el sistema nervioso autónomo y clarifica las decisiones.",
                file: "cursos/modulo_21_coherencia_cardiaca_sincronia.md"
            },
            {
                id: 22,
                globalId: "p3-m2",
                stepId: "paso-3",
                stepNumber: 3,
                number: "02",
                title: "La Micro-Pausa de los 90 Segundos en Vivo",
                subtitle: "Aplicación en tiempo real en discusiones y momentos de crisis",
                duration: "30 min",
                type: "Práctica en Vivo",
                badge: "PAUSA 90S",
                icon: "fa-stopwatch",
                transformation: "De reaccionar en el calor del momento ➔ Al espacio sagrado donde la adrenalina se disipa.",
                description: "Cómo sobrevivir al pico de la ola bioquímica de 90 segundos sin emitir una sola palabra ni gesto destructivo.",
                file: "cursos/modulo_22_micro_pausa_90_segundos_en_vivo.md"
            },
            {
                id: 23,
                globalId: "p3-m3",
                stepId: "paso-3",
                stepNumber: 3,
                number: "03",
                title: "De la Reacción Ciega a la Respuesta Consciente",
                subtitle: "Ejecutar la elección que tú decides con tu lóbulo frontal",
                duration: "30 min",
                type: "Soberanía de Conducta",
                badge: "RESPUESTA CONSCIENTE",
                icon: "fa-compass",
                transformation: "De lamentar tus palabras pasadas ➔ A responder con elegancia, firmeza y serenidad.",
                description: "El protocolo de 3 pasos: Reconocer el impulso ➔ Respirar la pausa ➔ Elegir la acción con tus valores más elevados.",
                file: "cursos/modulo_23_reaccion_ciega_a_respuesta_consciente.md"
            },
            {
                id: 24,
                globalId: "p3-m4",
                stepId: "paso-3",
                stepNumber: 3,
                number: "04",
                title: "Arquitectura del Hábito Somático Diario",
                subtitle: "Protocolo matutino y nocturno no negociable de 10 minutos",
                duration: "35 min",
                type: "Hábitos Sostenidos",
                badge: "HÁBITO INNEGOCIABLE",
                icon: "fa-calendar-check",
                transformation: "De practicar sólo cuando estás en crisis ➔ Al acondicionamiento diario de tu sistema.",
                description: "Diseña tu rutina de anclaje matutino (despertar regulado) y descarga nocturna (desconexión profunda para el sueño reparador).",
                file: "cursos/modulo_24_arquitectura_habito_somatico_diario.md"
            },
            {
                id: 25,
                globalId: "p3-m5",
                stepId: "paso-3",
                stepNumber: 3,
                number: "05",
                title: "Regulación en Medio del Caos Cotidiano",
                subtitle: "Respirar mientras hablas, trabajas y tomas decisiones",
                duration: "35 min",
                type: "Integración Operativa",
                badge: "REGULACIÓN EN ACCIÓN",
                icon: "fa-fire",
                transformation: "De necesitar silencio absoluto para calmarte ➔ A sostener tu centro en el ruido.",
                description: "Técnicas de micro-respiración invisible: cómo regularte en juntas de trabajo, negociaciones o eventos sociales sin que nadie lo note.",
                file: "cursos/modulo_25_regulacion_medio_caos_cotidiano.md"
            },
            {
                id: 26,
                globalId: "p3-m6",
                stepId: "paso-3",
                stepNumber: 3,
                number: "06",
                title: "Navegación de Picos de Estrés Sin Perder el Centro",
                subtitle: "Atravesar la incomodidad sin bloquear el diafragma",
                duration: "35 min",
                type: "Resiliencia Somática",
                badge: "PICOS DE ESTRÉS",
                icon: "fa-mountain",
                transformation: "De contraer el cuerpo en crisis ➔ A mantener la fluidez diafragmática bajo presión.",
                description: "Desarrolla la maestría de relajar conscientemente la musculatura central mientras tu entorno vive momentos de alta demanda.",
                file: "cursos/modulo_26_navegacion_picos_estres_sin_perder_centro.md"
            },
            {
                id: 27,
                globalId: "p3-m7",
                stepId: "paso-3",
                stepNumber: 3,
                number: "07",
                title: "El Ancla Somática Kinestésica de Seguridad",
                subtitle: "Gatillos corporales para invocar la calma en 5 segundos",
                duration: "40 min",
                type: "Neuro-Anclaje",
                badge: "ANCLA KINESTÉSICA",
                icon: "fa-fingerprint",
                transformation: "De perder el hilo en pánico ➔ A un disparador físico que devuelve la señal de seguridad.",
                description: "Condicionamiento neuromuscular pavloviano: asocia un gesto físico de presión dactilar con el estado de coherencia parasimpática.",
                file: "cursos/modulo_27_ancla_somatica_kinestesica_seguridad.md"
            },
            {
                id: 28,
                globalId: "p3-m8",
                stepId: "paso-3",
                stepNumber: 3,
                number: "08",
                title: "Corregulación Somática en Vínculos y Liderazgo",
                subtitle: "Cómo tu calma regula y sostiene el sistema nervioso de otros",
                duration: "40 min",
                type: "Corregulación",
                badge: "CORREGULACIÓN",
                icon: "fa-users",
                transformation: "De contagiarte del estrés de otros ➔ A ser el ancla de estabilidad para tu familia y equipo.",
                description: "Las neuronas espejo y la resonancia electromagnética: lidera desde la calma biológica inquebrantable.",
                file: "cursos/modulo_28_corregulacion_somatica_vinculos_liderazgo.md"
            },
            {
                id: 29,
                globalId: "p3-m9",
                stepId: "paso-3",
                stepNumber: 3,
                number: "09",
                title: "Consolidación de los 90 Días & Neuroplasticidad",
                subtitle: "Fijación permanente de la nueva línea base nerviosa",
                duration: "40 min",
                type: "Neuroplasticidad",
                badge: "LÍNEA BASE 90 DÍAS",
                icon: "fa-dna",
                transformation: "De recaer en el viejo yo ➔ A consolidar sinapsis mielinizadas de serenidad duradera.",
                description: "La neurobiología de los 90 días: cómo el entrenamiento diario reprograma la amígdala y ensancha permanentemente tu corteza prefrontal.",
                file: "cursos/modulo_29_consolidacion_90_dias_neuroplasticidad.md"
            },
            {
                id: 30,
                globalId: "p3-m10",
                stepId: "paso-3",
                stepNumber: 3,
                number: "10",
                title: "Maestría Somática AURA: Soberanía de por Vida",
                subtitle: "Graduación, autogestión continua y el respirador consciente",
                duration: "45 min",
                type: "Maestría AURA",
                badge: "SOBERANÍA TOTAL",
                icon: "fa-award",
                transformation: "De ser un esclavo de tus estados ➔ A ser el maestro y guardián de tu propio templo interior.",
                description: "Tu certificación personal de soberanía somática: protocolo de autodiagnóstico perpetuo y el sendero del respirador maduro.",
                file: "cursos/modulo_30_maestria_somatica_aura_soberania_por_vida.md"
            }
        ]
    }
];

// Helper para obtener módulos y estado de completitud particionado por usuario y sincronizado
function getActiveUserEmail() {
    return (localStorage.getItem('aura_session') || localStorage.getItem('aura_user_email') || 'default').toLowerCase().trim();
}

function isModuleCompleted(globalId) {
    const userEmail = getActiveUserEmail();
    const userVal = localStorage.getItem(`aura_mod_completed_${userEmail}_${globalId}`);
    if (userVal !== null) return userVal === 'true';
    return localStorage.getItem(`aura_mod_completed_${globalId}`) === 'true';
}

function setModuleCompleted(globalId, status) {
    const userEmail = getActiveUserEmail();
    localStorage.setItem(`aura_mod_completed_${userEmail}_${globalId}`, status ? 'true' : 'false');
    localStorage.setItem(`aura_mod_completed_${globalId}`, status ? 'true' : 'false');

    // Sincronizar automáticamente a la nube en Supabase
    if (window.AuraSync && window.AuraSync.save) {
        window.AuraSync.save();
    }
}

function getStepProgress(stepId) {
    const step = AURA_STEPS.find(s => s.id === stepId);
    if (!step) return { completed: 0, total: 10, percent: 0 };
    const completed = step.modules.filter(m => isModuleCompleted(m.globalId)).length;
    const total = step.modules.length;
    const percent = Math.round((completed / total) * 100);
    return { completed, total, percent };
}

function getGlobalProgress() {
    let completedTotal = 0;
    let totalModules = 0;
    AURA_STEPS.forEach(step => {
        step.modules.forEach(m => {
            totalModules++;
            if (isModuleCompleted(m.globalId)) completedTotal++;
        });
    });
    const percent = Math.round((completedTotal / totalModules) * 100);
    return { completed: completedTotal, total: totalModules, percent };
}

// ====================================================================
// REGLAS DE BLOQUEO DE PASOS (PRERREQUISITOS SOMÁTICOS)
// ====================================================================
function isStepUnlocked(stepNumber) {
    if (stepNumber <= 1) return true; // Paso 1 siempre desbloqueado
    if (stepNumber === 2) {
        // Desbloqueado solo si los 10 módulos del Paso 1 están completados (10/10)
        return getStepProgress('paso-1').completed >= 10;
    }
    if (stepNumber === 3) {
        // Desbloqueado solo si Paso 2 está desbloqueado y tiene sus 10 módulos completados (10/10)
        return isStepUnlocked(2) && getStepProgress('paso-2').completed >= 10;
    }
    return false;
}

function getStepRequirementNotice(stepNumber) {
    if (stepNumber === 2) {
        const p1 = getStepProgress('paso-1');
        const remaining = 10 - p1.completed;
        return `Para expandir tu sistema nervioso en el Paso 2, primero debes completar y asimilar los 10 módulos del Paso 1. Te faltan ${remaining} módulo${remaining === 1 ? '' : 's'} (${p1.completed}/10 completados).`;
    }
    if (stepNumber === 3) {
        const p2 = getStepProgress('paso-2');
        const remaining = 10 - p2.completed;
        return `Para practicar sostenidamente en el Paso 3, primero debes completar los 10 módulos del Paso 2. Te faltan ${remaining} módulo${remaining === 1 ? '' : 's'} (${p2.completed}/10 completados).`;
    }
    return '';
}

// Comprobar si un módulo fue aprobado con >= 80% (por usuario)
function isModuleApproved(globalId) {
    if (window.AuraQuizEngine && window.AuraQuizEngine.isApproved) {
        return window.AuraQuizEngine.isApproved(globalId);
    }
    const userEmail = getActiveUserEmail();
    const passedUser = localStorage.getItem(`aura_quiz_passed_${userEmail}_${globalId}`);
    const passedGen = localStorage.getItem('aura_quiz_passed_' + globalId);
    const score = parseInt(localStorage.getItem(`aura_quiz_score_${userEmail}_${globalId}`) || localStorage.getItem('aura_quiz_score_' + globalId) || '0', 10);
    return passedUser === 'true' || passedGen === 'true' || score >= 80;
}

// Comprobar si un módulo dentro de un paso es accesible (prerrequisito secuencial)
function isModuleAccessible(stepNumber, moduleIndex) {
    if (!isStepUnlocked(stepNumber)) return false;
    if (moduleIndex === 0) return true; // El primer módulo del paso siempre está accesible

    const step = AURA_STEPS.find(s => s.stepNumber === stepNumber);
    if (!step || !step.modules[moduleIndex - 1]) return false;

    const prevMod = step.modules[moduleIndex - 1];
    return isModuleApproved(prevMod.globalId);
}

// Inicialización de progreso y evaluaciones para pruebas coherentes
(function initDefaultProgress() {
    if (!localStorage.getItem('aura_progress_quiz_v3')) {
        // Inicializar módulos 1 y 2 de Paso 1 como completados y aprobados (100% y 85%)
        setModuleCompleted('p1-m1', true);
        localStorage.setItem('aura_quiz_passed_p1-m1', 'true');
        localStorage.setItem('aura_quiz_score_p1-m1', '100');

        setModuleCompleted('p1-m2', true);
        localStorage.setItem('aura_quiz_passed_p1-m2', 'true');
        localStorage.setItem('aura_quiz_score_p1-m2', '85');

        // Módulo 3 listo para ser tomado y evaluado interactivamente
        setModuleCompleted('p1-m3', false);
        localStorage.setItem('aura_quiz_passed_p1-m3', 'false');
        localStorage.setItem('aura_quiz_score_p1-m3', '0');

        localStorage.setItem('aura_progress_quiz_v3', 'true');
    }
})();

// Exportar al objeto global
window.AURA_STEPS = AURA_STEPS;
window.isModuleCompleted = isModuleCompleted;
window.setModuleCompleted = setModuleCompleted;
window.isModuleApproved = isModuleApproved;
window.isModuleAccessible = isModuleAccessible;
window.getStepProgress = getStepProgress;
window.getGlobalProgress = getGlobalProgress;
window.isStepUnlocked = isStepUnlocked;
window.getStepRequirementNotice = getStepRequirementNotice;

