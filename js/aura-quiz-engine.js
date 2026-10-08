/**
 * aura-quiz-engine.js - Motor de Evaluaciones Somáticas Interactivas AURA
 * Integra las 10 preguntas de comprensión de cada módulo (extrayendo las del Punto 9),
 * las convierte en tarjetas marcables interactivas y exige un mínimo del 80% (8 de 10 correctas)
 * para aprobar y habilitar el avance al siguiente módulo.
 */

(function() {
    // Parser especializado para extraer las 10 preguntas del "Punto 9: Examen de Comprensión / Graduación"
    function parseExamQuestionsFromMarkdown(rawMd) {
        if (!rawMd) return null;
        const match = rawMd.match(/## 9\.\s*Examen[\s\S]*?\n([\s\S]*?)(?=(?:---\s*\n+)?## 10\.|\Z)/i);
        if (!match) return null;

        const section = match[1];
        // Dividir por **1., **2., etc.
        const parts = section.split(/\n\s*\*\*(\d+)\.\s*/);
        if (parts.length < 3) return null;

        const questions = [];
        // parts[0] es la intro
        // parts[1] = "1", parts[2] = texto de pregunta 1 + opciones + respuesta
        for (let i = 1; i < parts.length; i += 2) {
            const block = parts[i + 1] || "";

            // Encontrar título de la pregunta hasta el cierre **
            const titleMatch = block.match(/^([\s\S]*?)\*\*/);
            if (!titleMatch) continue;
            const qTitle = titleMatch[1].replace(/\s+/g, ' ').trim();

            // Encontrar opciones a/A, b/B, c/C, d/D con ) o .
            const optAMatch = block.match(/(?:^|\n)\s*[aA][\)\.]\s*([\s\S]*?)(?=\n\s*[bB][\)\.]|\Z)/);
            const optBMatch = block.match(/(?:^|\n)\s*[bB][\)\.]\s*([\s\S]*?)(?=\n\s*[cC][\)\.]|\Z)/);
            const optCMatch = block.match(/(?:^|\n)\s*[cC][\)\.]\s*([\s\S]*?)(?=\n\s*[dD][\)\.]|\Z)/);
            const optDMatch = block.match(/(?:^|\n)\s*[dD][\)\.]\s*([\s\S]*?)(?=\n\s*\*(?:\(?)?(?:Respuesta|Opción) correcta|\Z)/i);

            if (!optAMatch || !optBMatch || !optCMatch || !optDMatch) continue;

            const cleanOption = (txt) => txt.replace(/\s+/g, ' ').trim();
            const options = [
                cleanOption(optAMatch[1]),
                cleanOption(optBMatch[1]),
                cleanOption(optCMatch[1]),
                cleanOption(optDMatch[1])
            ];

            // Encontrar respuesta correcta indicada en el texto: *(Respuesta correcta: b)* o *Respuesta correcta: B*
            const ansMatch = block.match(/\*(?:\()?([Rr]espuesta|[Oo]pción) correcta:?\s*([a-dA-D])(?:\))?\*/i);
            let correctIdx = 0;
            if (ansMatch) {
                const letter = ansMatch[2].toLowerCase();
                correctIdx = letter === 'a' ? 0 : letter === 'b' ? 1 : letter === 'c' ? 2 : 3;
            }

            // Encontrar explicación si existe
            const explMatch = block.match(/\*[Ee]xplicación:\s*([^*]+)\*/);
            const explanation = explMatch ? explMatch[1].trim() : `La opción correcta es la (${String.fromCharCode(65 + correctIdx).toLowerCase()}): "${options[correctIdx]}".`;

            questions.push({
                q: qTitle,
                options: options,
                correct: correctIdx,
                explanation: explanation
            });
        }

        return questions.length >= 8 ? questions : null;
    }

    // Generador dinámico de 10 preguntas somáticas para módulos que no tengan Sección 9 precargada
    function generate10SomaticQuestions(mod) {
        const title = mod.title;
        const badge = mod.badge || "Regulación Somática";
        const trans = mod.transformation;

        return [
            {
                q: `¿Cuál es el principio neurosomático fundamental que rige el módulo "${title}"?`,
                options: [
                    `El dominio y aplicación de ${badge} para expandir la capacidad autorregulatoria del sistema nervioso.`,
                    "La supresión forzada de cualquier sensación fisiológica incómoda en el cuerpo.",
                    "El análisis meramente lógico y abstracto sin involucrar el diafragma ni el nervio vago.",
                    "La resignación pasiva ante el estrés sin aplicar protocolos fisiológicos."
                ],
                correct: 0,
                explanation: `Este módulo se enfoca en integrar ${badge} de forma directa en tu biología somática.`
            },
            {
                q: `¿Cuál es la transformación directa que conquistas al asimilar e integrar este módulo?`,
                options: [
                    "Aislarte de todo estímulo exterior para evitar experimentar detonantes emocionales.",
                    `${trans}`,
                    "Forzar a las demás personas a cambiar su conducta para no alterarte.",
                    "Memorizar conceptos teóricos sin practicar ninguna técnica de respiración."
                ],
                correct: 1,
                explanation: `La transformación clave del módulo es: ${trans}.`
            },
            {
                q: "¿Por qué el enfoque de regulación Bottom-Up (del cuerpo hacia la mente) es el pilar de AURA?",
                options: [
                    "Porque más del 80% de las fibras del nervio vago son aferentes (envían información de los órganos al cerebro).",
                    "Porque la mente consciente nunca comete errores de interpretación.",
                    "Porque el cerebro no tiene ninguna conexión fisiológica con el corazón ni los pulmones.",
                    "Porque el ritmo cardíaco no influye en las emociones."
                ],
                correct: 0,
                explanation: "Las vías aferentes del nervio vago informan al tronco cerebral del estado corporal antes de que el córtex pueda razonar."
            },
            {
                q: `En el protocolo práctico de "${title}", ¿cuál es el rol fundamental de la exhalación lenta y prolongada?`,
                options: [
                    "Disparar adrenalina para acelerar el metabolismo de supervivencia.",
                    "Activar el freno vagal en el nodo sinoauricular cardíaco, reduciendo las pulsaciones y comunicando seguridad biológica.",
                    "Vaciar completamente el oxígeno de los músculos para impedir la movilidad.",
                    "Detener el flujo sanguíneo hacia el córtex prefrontal."
                ],
                correct: 1,
                explanation: "Al alargar la fase exhalatoria, el diafragma asciende y se estimula la rama parasimpática del vago ventral."
            },
            {
                q: "¿Qué ocurre en tu fisiología si intentas calmar una emoción intensa solo con pensamientos lógicos (Top-Down)?",
                options: [
                    "El cuerpo se relaja en menos de 5 segundos de forma garantizada.",
                    "Suele fallar si la amígdala ha secuestrado la corteza prefrontal, requiriendo intervención física y respiratoria primero.",
                    "La adrenalina en sangre se destruye instantáneamente mediante el pensamiento.",
                    "El sistema nervioso simpático se apaga de forma permanente."
                ],
                correct: 1,
                explanation: "Bajo secuestro límbico, el córtex prefrontal tiene baja irrigación; se debe regular el cuerpo primero para recuperar la mente."
            },
            {
                q: "¿Cuál es el tiempo aproximado en que la ola química de adrenalina se disipa si no la reavivas con pensamientos dramáticos?",
                options: [
                    "Aproximadamente 90 segundos.",
                    "Entre 12 y 24 horas continuas sin variación.",
                    "Menos de 2 milisegundos en todos los casos.",
                    "Varios días de descarga química inalterable."
                ],
                correct: 0,
                explanation: "La neurobiología demuestra que la descarga inicial de catecolaminas dura cerca de 90 segundos si no se alimenta con rumiación."
            },
            {
                q: `¿Qué señal somática temprana indica que estás a punto de perder la ventana de regulación en "${title}"?`,
                options: [
                    "Respiración diafragmática fluida y hombros completamente relajados.",
                    "Tensión mandibular, corte del flujo respiratorio o contracción en el plexo solar.",
                    "Somnolencia profunda y sensación de pesadez agradable.",
                    "Sensación de apertura y ligereza en el pecho."
                ],
                correct: 1,
                explanation: "La mandíbula y el diafragma son los primeros en contraerse ante la micro-alarma del sistema nervioso autónomo."
            },
            {
                q: "¿Cómo influye el entrenamiento de este módulo en la plasticidad de tu sistema nervioso?",
                options: [
                    "No genera ningún cambio físico en el cerebro.",
                    "Fortalece la conectividad prefrontal-amigdalina y eleva la línea base de resiliencia frente a futuros estresores.",
                    "Destruye las neuronas del lóbulo temporal para olvidar los recuerdos dolorosos.",
                    "Hace que nunca más vuelvas a sentir ninguna sensación física en el cuerpo."
                ],
                correct: 1,
                explanation: "La práctica repetida mieliniza nuevas vías sinápticas que amplían tu ventana de tolerancia somática permanente."
            },
            {
                q: "¿Qué función cumple la micro-pausa de calibración interoceptiva antes de responder a un conflicto?",
                options: [
                    "Permitir que la amígdala descargue toda su furia de inmediato.",
                    "Crear el espacio consciente entre el estímulo y la respuesta donde reside la soberanía personal.",
                    "Hacer que la otra persona se sienta culpable por nuestro silencio prolongado.",
                    "Evitar respirar para no oxigenar las emociones."
                ],
                correct: 1,
                explanation: "Como enunció Viktor Frankl, en el intervalo consciente entre el estímulo y la respuesta radica nuestra libertad."
            },
            {
                q: `¿Cuál es el criterio de éxito para validar que has integrado la práctica de las 24 horas de este módulo?`,
                options: [
                    "Poder recitar la teoría neurocientífica sin equivocarte.",
                    "Aplicar la técnica somática en un momento de fricción real y comprobar que mantuviste el mando de tu estado interior.",
                    "Evitar salir de casa para no exponerte a ningún estímulo estresante.",
                    "Esperar a que otra persona cambie su actitud para comprobar si te sientes en paz."
                ],
                correct: 1,
                explanation: "La maestría somática se valida en el campo de batalla de la vida diaria, respondiendo desde el centro lúcido."
            }
        ];
    }

    // Obtener las 10 preguntas del módulo (priorizando la extracción del Punto 9 de su contenido)
    function getModuleQuestions(mod) {
        if (!mod) return [];

        let questions = [];

        // 1. Intentar extraer las 10 preguntas originales del Punto 9 del markdown del módulo
        if (window.getRawModuleContent) {
            const raw = window.getRawModuleContent(mod);
            const parsed = parseExamQuestionsFromMarkdown(raw);
            if (parsed && parsed.length > 0) {
                questions = [...parsed];
            }
        }

        // 2. Si son menos de 10, completar con preguntas somáticas del módulo hasta tener exactamente 10
        if (questions.length < 10) {
            const fallback = generate10SomaticQuestions(mod);
            for (let i = 0; questions.length < 10 && i < fallback.length; i++) {
                questions.push(fallback[i]);
            }
        }

        return questions.slice(0, 10);
    }

    // Comprobar si el módulo está aprobado con >= 80% (mínimo 8 de 10)
    function isModuleQuizApproved(globalId) {
        const passed = localStorage.getItem('aura_quiz_passed_' + globalId) === 'true';
        const score = parseInt(localStorage.getItem('aura_quiz_score_' + globalId) || '0', 10);
        return passed || score >= 80;
    }

    function getModuleQuizScore(globalId) {
        return parseInt(localStorage.getItem('aura_quiz_score_' + globalId) || '0', 10);
    }

    // Renderizar el cuestionario interactivo de 10 preguntas dentro del lector
    function renderQuiz(mod, containerEl) {
        if (!containerEl) return;

        const questions = getModuleQuestions(mod);
        const isApproved = isModuleQuizApproved(mod.globalId);
        const currentScore = getModuleQuizScore(mod.globalId);

        let html = `
            <div class="somatic-quiz-card" id="quiz-block-${mod.globalId}">
                <div class="quiz-badge-strip">
                    <span class="quiz-badge-tag"><i class="fas fa-tasks"></i> EVALUACIÓN SOMÁTICA &bull; 10 PREGUNTAS</span>
                    <span class="quiz-threshold-pill"><i class="fas fa-shield-alt"></i> MÍNIMO 80% (8 DE 10) PARA APROBAR Y AVANZAR</span>
                </div>

                <div class="quiz-intro-box">
                    <h3 class="quiz-main-title">Valida tu Maestría: Módulo ${mod.number} (${mod.title})</h3>
                    <p class="quiz-intro-desc">
                        Marca la opción correcta para cada una de las <strong>10 preguntas somáticas</strong> extraídas del módulo. 
                        Para desbloquear el <strong>Siguiente Módulo</strong>, debes aprobar con al menos un <strong>80% (mínimo 8 de 10 respuestas correctas)</strong>.
                    </p>
                    <div class="quiz-status-pill ${isApproved ? 'status-approved' : 'status-pending'}" id="quiz-status-pill">
                        ${isApproved ? `<i class="fas fa-check-circle"></i> MÓDULO APROBADO (${currentScore}% DE ACIERTOS) &bull; AVANCE HABILITADO` : `<i class="fas fa-lock"></i> EVALUACIÓN PENDIENTE (10 PREGUNTAS) &bull; COMPLETA EL TEST PARA AVANZAR`}
                    </div>
                </div>

                <form id="quiz-form-${mod.globalId}" class="quiz-form-body">
        `;

        questions.forEach((qItem, qIdx) => {
            html += `
                <div class="quiz-question-item" id="q-box-${mod.globalId}-${qIdx}">
                    <div class="q-number-bar">
                        <span class="q-num-label">PREGUNTA ${qIdx + 1} DE ${questions.length}</span>
                        <span class="q-result-badge" id="q-badge-${mod.globalId}-${qIdx}"></span>
                    </div>
                    <h4 class="q-question-text">${qItem.q}</h4>
                    <div class="q-options-grid">
            `;

            qItem.options.forEach((optText, optIdx) => {
                const optId = `opt-${mod.globalId}-${qIdx}-${optIdx}`;
                html += `
                    <label class="q-option-card" for="${optId}" id="lbl-${mod.globalId}-${qIdx}-${optIdx}">
                        <input type="radio" 
                               name="q_${mod.globalId}_${qIdx}" 
                               id="${optId}" 
                               value="${optIdx}" 
                               class="q-radio-input"
                               onchange="window.AuraQuizEngine.onOptionSelected('${mod.globalId}', ${qIdx}, ${optIdx})"
                        >
                        <span class="q-radio-custom"></span>
                        <div class="q-opt-content">
                            <span class="q-opt-letter">${String.fromCharCode(65 + optIdx)}</span>
                            <span class="q-opt-text">${optText}</span>
                        </div>
                    </label>
                `;
            });

            html += `
                    </div>
                    <div class="q-explanation-box" id="q-exp-${mod.globalId}-${qIdx}" style="display: none;">
                        <i class="fas fa-info-circle"></i>
                        <span>${qItem.explanation}</span>
                    </div>
                </div>
            `;
        });

        html += `
                </form>

                <div class="quiz-footer-actions">
                    <button type="button" 
                            class="btn-aura-cta btn-submit-quiz" 
                            id="btn-eval-quiz-${mod.globalId}" 
                            onclick="window.AuraQuizEngine.submitQuiz('${mod.globalId}')">
                        <i class="fas fa-check-double"></i> Evaluar 10 Respuestas & Validar Avance (Mínimo 80%)
                    </button>
                    <button type="button" 
                            class="btn-glass-nav btn-retry-quiz" 
                            id="btn-retry-quiz-${mod.globalId}" 
                            style="display: ${isApproved ? 'inline-flex' : 'none'};" 
                            onclick="window.AuraQuizEngine.resetQuiz('${mod.globalId}')">
                        <i class="fas fa-redo"></i> Volver a Responder para Practicar
                    </button>
                </div>

                <div class="quiz-results-card" id="quiz-result-${mod.globalId}" style="display: none;"></div>
            </div>
        `;

        containerEl.innerHTML = html;

        // Si ya estaba aprobado, pre-cargar el estado exitoso
        if (isApproved) {
            markQuizAsPassedUI(mod.globalId, currentScore);
        }
    }

    // Al seleccionar una opción en tiempo real
    function onOptionSelected(globalId, qIdx, optIdx) {
        const questionBox = document.getElementById(`q-box-${globalId}-${qIdx}`);
        if (!questionBox) return;

        // Limpiar seleccionados previos en esta pregunta
        const allLabels = questionBox.querySelectorAll('.q-option-card');
        allLabels.forEach(lbl => lbl.classList.remove('selected'));

        const targetLabel = document.getElementById(`lbl-${globalId}-${qIdx}-${optIdx}`);
        if (targetLabel) targetLabel.classList.add('selected');
    }

    // Evaluar respuestas enviadas
    function submitQuiz(globalId) {
        const mod = window.AuraApp ? window.AuraApp.findModule(globalId) : null;
        if (!mod) return;

        const questions = getModuleQuestions(mod);
        const form = document.getElementById(`quiz-form-${globalId}`);
        if (!form) return;

        // Comprobar si se respondieron todas las 10 preguntas
        let answeredCount = 0;
        const userAnswers = [];

        for (let i = 0; i < questions.length; i++) {
            const selected = form.querySelector(`input[name="q_${globalId}_${i}"]:checked`);
            if (selected) {
                answeredCount++;
                userAnswers.push(parseInt(selected.value, 10));
            } else {
                userAnswers.push(-1);
            }
        }

        if (answeredCount < questions.length) {
            const missing = questions.length - answeredCount;
            if (window.AuraApp && window.AuraApp.showToast) {
                window.AuraApp.showToast(
                    '⚠️ Preguntas Pendientes', 
                    `Por favor responde todas las 10 preguntas antes de evaluar. Te falta${missing === 1 ? '' : 'n'} ${missing} pregunta${missing === 1 ? '' : 's'}.`, 
                    'fa-exclamation-triangle'
                );
            }
            // Scroll suave a la primera no respondida
            const firstUnanswered = userAnswers.indexOf(-1);
            if (firstUnanswered !== -1) {
                const unBox = document.getElementById(`q-box-${globalId}-${firstUnanswered}`);
                if (unBox) unBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        // Calcular puntaje
        let correctCount = 0;
        questions.forEach((qItem, qIdx) => {
            const userAns = userAnswers[qIdx];
            const isCorrect = userAns === qItem.correct;
            if (isCorrect) correctCount++;

            const badge = document.getElementById(`q-badge-${globalId}-${qIdx}`);
            const expBox = document.getElementById(`q-exp-${globalId}-${qIdx}`);

            if (expBox) expBox.style.display = 'flex';

            // Marcar opciones
            qItem.options.forEach((_, optIdx) => {
                const lbl = document.getElementById(`lbl-${globalId}-${qIdx}-${optIdx}`);
                if (!lbl) return;

                lbl.classList.remove('opt-correct', 'opt-wrong');
                if (optIdx === qItem.correct) {
                    lbl.classList.add('opt-correct');
                } else if (optIdx === userAns && !isCorrect) {
                    lbl.classList.add('opt-wrong');
                }
            });

            if (badge) {
                if (isCorrect) {
                    badge.innerHTML = '<i class="fas fa-check"></i> CORRECTO';
                    badge.className = 'q-result-badge badge-correct';
                } else {
                    badge.innerHTML = '<i class="fas fa-times"></i> INCORRECTO';
                    badge.className = 'q-result-badge badge-wrong';
                }
            }
        });

        const scorePercent = Math.round((correctCount / questions.length) * 100);
        const passed = scorePercent >= 80; // Exige al menos 8 de 10 correctas

        const resultBox = document.getElementById(`quiz-result-${globalId}`);
        const retryBtn = document.getElementById(`btn-retry-quiz-${globalId}`);

        if (resultBox) {
            resultBox.style.display = 'block';
            if (passed) {
                resultBox.className = 'quiz-results-card res-passed';
                resultBox.innerHTML = `
                    <div class="res-icon"><i class="fas fa-award"></i></div>
                    <div class="res-body">
                        <h4>🎉 ¡EXCELENTE! EVALUACIÓN APROBADA (${scorePercent}%)</h4>
                        <p>Has respondido correctamente <strong>${correctCount} de ${questions.length} preguntas</strong>, superando el 80% mínimo requerido. Has demostrado asimilación neurobiológica de este módulo y <strong>el Siguiente Módulo ya está desbloqueado</strong>.</p>
                    </div>
                `;
            } else {
                resultBox.className = 'quiz-results-card res-failed';
                resultBox.innerHTML = `
                    <div class="res-icon"><i class="fas fa-exclamation-circle"></i></div>
                    <div class="res-body">
                        <h4>⚠️ NO SE ALCANZÓ EL UMBRAL DEL 80% (${scorePercent}%)</h4>
                        <p>Obtuviste <strong>${correctCount} de ${questions.length} correctas</strong>. Para consolidar tu avance necesitas al menos un <strong>80% (mínimo 8 de 10 correctas)</strong> para poder avanzar. Revisa las explicaciones de cada pregunta arriba y haz clic en <strong>Reintentar Evaluación</strong>.</p>
                    </div>
                `;
            }
            resultBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        if (retryBtn) retryBtn.style.display = 'inline-flex';

        // Guardar resultado
        localStorage.setItem('aura_quiz_score_' + globalId, scorePercent);

        if (passed) {
            localStorage.setItem('aura_quiz_passed_' + globalId, 'true');
            if (window.setModuleCompleted) {
                window.setModuleCompleted(globalId, true);
            }
            markQuizAsPassedUI(globalId, scorePercent);

            if (window.AuraApp) {
                window.AuraApp.onModuleEvaluationPassed(mod, scorePercent);
            }
        } else {
            localStorage.setItem('aura_quiz_passed_' + globalId, 'false');
            if (window.setModuleCompleted) {
                window.setModuleCompleted(globalId, false);
            }
            markQuizAsFailedUI(globalId, scorePercent);

            if (window.AuraApp) {
                window.AuraApp.onModuleEvaluationFailed(mod, scorePercent);
            }
        }
    }

    function markQuizAsPassedUI(globalId, score) {
        const pill = document.getElementById('quiz-status-pill');
        if (pill) {
            pill.className = 'quiz-status-pill status-approved';
            pill.innerHTML = `<i class="fas fa-check-circle"></i> MÓDULO APROBADO (${score}% DE ACIERTOS) &bull; AVANCE HABILITADO`;
        }
    }

    function markQuizAsFailedUI(globalId, score) {
        const pill = document.getElementById('quiz-status-pill');
        if (pill) {
            pill.className = 'quiz-status-pill status-pending';
            pill.innerHTML = `<i class="fas fa-times-circle"></i> NO APROBADO (${score}% DE ACIERTOS) &bull; REQUIERE MÍNIMO 8 DE 10 PARA AVANZAR`;
        }
    }

    function resetQuiz(globalId) {
        const form = document.getElementById(`quiz-form-${globalId}`);
        if (form) {
            const inputs = form.querySelectorAll('input[type="radio"]');
            inputs.forEach(inp => inp.checked = false);

            const labels = form.querySelectorAll('.q-option-card');
            labels.forEach(lbl => lbl.classList.remove('selected', 'opt-correct', 'opt-wrong'));

            const badges = form.querySelectorAll('.q-result-badge');
            badges.forEach(b => {
                b.innerHTML = '';
                b.className = 'q-result-badge';
            });

            const explanations = form.querySelectorAll('.q-explanation-box');
            explanations.forEach(exp => exp.style.display = 'none');
        }

        const resultBox = document.getElementById(`quiz-result-${globalId}`);
        if (resultBox) resultBox.style.display = 'none';

        if (window.AuraApp && window.AuraApp.showToast) {
            window.AuraApp.showToast('Evaluación Reiniciada', 'Puedes volver a marcar tus 10 respuestas para alcanzar el 80% o más.', 'fa-redo');
        }
    }

    // Exportar módulo al ámbito global
    window.AuraQuizEngine = {
        getQuestions: getModuleQuestions,
        isApproved: isModuleQuizApproved,
        getScore: getModuleQuizScore,
        renderQuiz: renderQuiz,
        submitQuiz: submitQuiz,
        resetQuiz: resetQuiz,
        onOptionSelected: onOptionSelected
    };
})();
