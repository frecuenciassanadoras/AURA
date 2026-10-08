/**
 * aura-content-engine.js - Motor de Contenido & Lector Somático AURA
 * Provee lecciones completas en Markdown para los 30 módulos de la plataforma,
 * vinculados directamente con los 3 Pasos del Método AURA.
 */

(function() {
    // Generador de contenido somático profundo para módulos de los Pasos 1, 2 y 3
    function generateDeepModuleLesson(mod) {
        const stepNum = mod.stepNumber;
        const stepTag = stepNum === 1 ? "PASO 1 • RECONOCE TU TERRENO" :
                        stepNum === 2 ? "PASO 2 • EXPANDE SU SISTEMA NERVIOSO" :
                        "PASO 3 • PRACTICA SOSTENIDAMENTE";
        
        const stepSubtitle = stepNum === 1 ? "Responsabilidad Propia Radical" :
                             stepNum === 2 ? "Ventana de Tolerancia Somática" :
                             "Integración Diaria & Maestría";

        return `# AURA &bull; ${stepTag}
## ${stepSubtitle}
---

# MÓDULO ${mod.number}: ${mod.title}
### *${mod.subtitle}*

> **DURACIÓN ESTIMADA:** ${mod.duration} &bull; **TIPO:** ${mod.type} &bull; **ENFOQUE:** ${mod.badge}

---

## 1. El Salto Somático: De la Reactividad a la Soberanía

En este módulo abordamos uno de los pilares de la transformación neurosomática de AURA:

| ANTES DE AURA (Piloto Automático) | DESPUÉS DE AURA (Soberanía Somática) |
| :--- | :--- |
| **Respuesta automática:** Tu cuerpo reacciona en milisegundos sin tu permiso consciente. | **Reconocimiento temprano:** Detectas la señal somática en el cuerpo antes de que se dispare la conducta reactiva. |
| **Sensación de amenaza ciega:** Tu sistema nervioso confunde la incomodidad cotidiana con peligro vital. | **Herramientas de regulación rápida:** Aplicas protocolos respiratorios y vagales para recuperar el centro en menos de 90 segundos. |
| **Desregulación sostenida:** Quedas atrapado en rumiación, tensión muscular o fatiga por horas. | **Regulación y homeostasis:** Tu ventana de tolerancia se ensancha y tu cuerpo retorna a la calma biológica. |

---

## 2. Fundamento Neurocientífico & Somático

La neurobiología contemporánea confirma que **el cuerpo lleva la cuenta** antes de que la mente consciente pueda formular un solo pensamiento. 

Cuando experimentas un detonante:
1. **La vía corta subcortical:** El tálamo envía la señal de estímulo directamente a la amígdala en aproximadamente **12 milisegundos**.
2. **La cascada química:** Se segregan catecolaminas (adrenalina y noradrenalina), el diafragma se contrae, el ritmo cardíaco se acelera y el campo visual se estrecha.
3. **El apagón prefrontal:** Si no intervienes con tu respiración, la amígdala desconecta temporalmente el córtex prefrontal dorso-lateral. En ese estado, no estás decidiendo: eres un títere de viejos engramas aprendidos en tu pasado.

**La clave de ${mod.title}:**
${mod.description}

Al entrenar conscientemente la señal aferente del nervio vago (la comunicación que va desde el cuerpo y los pulmones hacia el cerebro), **cambias la química del tronco encefálico desde abajo hacia arriba (Bottom-Up regulation)**. No intentas convencer a tu mente con lógica; regulas tu fisiología para que la mente reciba una señal biológica de seguridad innegable.

---

## 3. Protocolo Somático Guiado: Práctica Paso a Paso

Realiza esta práctica ahora mismo para anclar la neuroplasticidad del módulo:

### Fase 1: Postura y Calibración Interoceptiva (2 minutos)
* Siéntate con los pies apoyados en el suelo, columna recta sin tensión rígida y hombros relajados hacia atrás y abajo.
* Haz un escaneo interoceptivo rápido: ¿dónde hay tensión en este momento? (mandíbula, garganta, diafragma, abdomen).
* Afloja intencionalmente la lengua del paladar y suaviza los músculos oculares.

### Fase 2: El Ciclo de Regulación (${mod.type}) (5 minutos)
* **Inhalación:** Inhala suavemente por la nariz durante **4 segundos**, permitiendo que el abdomen bajo se expanda lateralmente.
* **Micro-pausa de contención:** Sostén el aire con el pecho abierto durante **2 segundos**, reconociendo la sensación de plenitud.
* **Exhalación parasimpática:** Exhala por la boca o nariz de forma lenta, continua y silenciosa durante **6 a 7 segundos**. Siente cómo los hombros descienden.
* **Pausa de quietud:** Descansa durante **2 segundos** en el vacío antes del siguiente ciclo.
* *Repite este ciclo durante 8 a 10 respiraciones completas.*

### Fase 3: Sellado Somático y Reanclaje (3 minutos)
* Coloca una mano sobre el centro de tu pecho y la otra sobre tu plexo solar.
* Siente el calor de tus palmas transmitiéndose a través de tu ropa hacia el sistema nervioso.
* Repite interiormente con convicción: *"En este preciso instante, mi cuerpo está a salvo. Yo soy el espacio consciente que sostiene esta experiencia."*

---

## 4. Sintonización con Ondas Alfa 14 Hz (Audio Integrado)

Durante el estudio de este módulo, utiliza el reproductor de ondas binaurales de la plataforma (botón **Reproducir Ondas de Enfoque** en la barra lateral):
* **Frecuencia portadora:** 200 Hz y 214 Hz.
* **Diferencia sintetizada:** **14 Hz (Ritmo Alfa Medio)**.
* **Efecto neurológico:** Facilita la sincronización interhemisférica, reduce las ondas Beta rápidas de estrés y activa el estado de *alerta relajada*.

---

## 5. Reto de las Próximas 24 Horas

**Tu misión somática para hoy:**
1. Elige un momento durante el día de hoy en el que sientas que la intensidad o la prisa suben (una llamada difícil, tráfico, o un pensamiento repetitivo).
2. **Aplica la Micro-Pausa de Oro:** Detente durante 3 respiraciones completas siguiendo el protocolo de este módulo antes de responder o actuar.
3. Observa cómo cambia tu capacidad de respuesta cuando tu biología no está secuestrada por el piloto automático.

---

---

## 6. Preparación e Integración
Continúa abajo con la **Evaluación Somática Interactiva (10 Preguntas)** para validar tu comprensión y desbloquear el siguiente módulo con una precisión mínima del 80%.
`;
    }

    // Función auxiliar para limpiar la sección de examen estático del texto de lectura
    function stripStaticExamSection(md) {
        if (!md) return '';
        return md
            // Eliminar Sección 9 (Examen de Comprensión) completa hasta la sección 10 o fin
            .replace(/## 9\.\s*Examen de [Cc]omprensión[\s\S]*?(?=(?:---\s*\n+)?## 10\.|\Z)/g, '')
            // Eliminar Sección 6 de autoevaluación estática si existiera
            .replace(/## 6\.\s*Autoevaluación de Comprensión[\s\S]*?(?=(?:---\s*\n+)?## 7\.|\Z)/g, '');
    }

    // Proveedor del contenido original completo (para que el motor de cuestionarios extraiga preguntas)
    window.getRawModuleContent = function(mod) {
        if (!mod) return "";
        if (window.MODULES_CONTENT && window.MODULES_CONTENT[String(mod.id)]) {
            return window.MODULES_CONTENT[String(mod.id)];
        }
        return generateDeepModuleLesson(mod);
    };

    // Proveedor principal de contenido para lectura (sin preguntas repetidas en texto estático)
    window.getAuraModuleContent = function(mod) {
        if (!mod) return "Módulo no encontrado.";
        const fullContent = window.getRawModuleContent(mod);
        return stripStaticExamSection(fullContent);
    };
})();

