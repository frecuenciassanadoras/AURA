/**
 * app.js - AURA Platform & Somatic Methods Controller
 * Control central del Método AURA:
 * - Selección interactiva de los 3 Pasos Somáticos
 * - Renderizado dinámico de los 10 módulos por cada paso
 * - Filtros, búsqueda y guardado de progreso en localStorage
 * - Lector inmersivo Markdown y generador de ondas Alfa 14 Hz
 */

let currentStepNumber = 1;
let currentFilter = 'all';
let currentSearch = '';
let activeModuleGlobalId = 'p1-m1';

// Audio Binaural Global State
let audioContext = null;
let oscillatorLeft = null;
let oscillatorRight = null;
let isPlayingAudio = false;

// ====================================================================
// INICIALIZACIÓN
// ====================================================================
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar visualización del Paso 1 por defecto
    selectStep(1, false);

    // Actualizar estados de bloqueo (Paso 2 y 3)
    refreshLockStates();

    // Actualizar badges globales
    refreshGlobalStats();

    // Eventos de barra de herramientas (Búsqueda & Filtros)
    setupToolbarEvents();
});

// ====================================================================
// SELECCIÓN DE PASO (PASO 1, PASO 2, PASO 3) CON CONTROL DE BLOQUEO
// ====================================================================
function selectStep(stepNum, shouldScroll = true) {
    if (stepNum < 1) stepNum = 1;
    if (stepNum > 3) stepNum = 3;

    // Verificar si el paso está desbloqueado
    if (window.isStepUnlocked && !window.isStepUnlocked(stepNum)) {
        const notice = window.getStepRequirementNotice ? window.getStepRequirementNotice(stepNum) : 'Completa el paso previo para desbloquear este nivel.';
        showLockedAlert(stepNum, notice);
        return;
    }

    currentStepNumber = stepNum;

    const stepData = window.AURA_STEPS ? window.AURA_STEPS.find(s => s.stepNumber === stepNum) : null;
    if (!stepData) return;

    // 1. Actualizar Nav Tabs superiores
    for (let i = 1; i <= 3; i++) {
        const navBtn = document.getElementById(`nav-step-${i}`);
        if (navBtn) {
            if (i === stepNum) {
                navBtn.classList.add('active');
            } else {
                navBtn.classList.remove('active');
            }
        }
    }

    // 2. Actualizar las 3 Master Cards del Hero
    for (let i = 1; i <= 3; i++) {
        const card = document.getElementById(`card-step-${i}`);
        const indicator = document.getElementById(`ind-step-${i}`);
        if (card) {
            if (i === stepNum) {
                card.classList.add('active-step');
            } else {
                card.classList.remove('active-step');
            }
        }
        if (indicator) {
            indicator.style.display = (i === stepNum) ? 'inline-flex' : 'none';
        }
    }

    // 3. Actualizar Banner del Hub con Información y Promesa de Transformación
    updateHubBanner(stepData);

    // 4. Renderizar los 10 módulos de este paso
    renderStepModules();

    // 5. Actualizar barras de progreso y estados de bloqueo
    refreshStepProgressBars();
    refreshLockStates();
    refreshGlobalStats();

    // 6. Scroll suave hacia el Hub de módulos si se solicita
    if (shouldScroll) {
        const hubSection = document.getElementById('modules-hub');
        if (hubSection) {
            hubSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
}

// Alerta elegante de paso bloqueado con vibración visual
function showLockedAlert(stepNum, message) {
    const card = document.getElementById(`card-step-${stepNum}`);
    if (card) {
        card.classList.add('shake-card');
        setTimeout(() => card.classList.remove('shake-card'), 600);
    }

    const stepTitle = stepNum === 2 ? 'Paso 2: Expande Su Sistema Nervioso' : 'Paso 3: Practica Sostenidamente';
    showToast(`🔒 Nivel Bloqueado • ${stepTitle}`, message, 'fa-lock');
}

// Actualiza visualmente las tarjetas de Paso 2 y 3 si están bloqueadas o desbloqueadas
function refreshLockStates() {
    for (let i = 2; i <= 3; i++) {
        const isUnlocked = window.isStepUnlocked ? window.isStepUnlocked(i) : false;
        const card = document.getElementById(`card-step-${i}`);
        const navBtn = document.getElementById(`nav-step-${i}`);
        const lockIndicator = document.getElementById(`lock-ind-${i}`);
        const actionBtn = document.getElementById(`btn-card-action-${i}`);

        const prevStepProg = window.getStepProgress ? window.getStepProgress(`paso-${i - 1}`) : { completed: 0 };
        const remaining = Math.max(0, 10 - prevStepProg.completed);

        if (card) {
            if (!isUnlocked) {
                card.classList.add('step-card-locked');
                if (lockIndicator) lockIndicator.style.display = 'inline-flex';
                if (actionBtn) {
                    actionBtn.classList.add('btn-locked');
                    actionBtn.innerHTML = `<i class="fas fa-lock"></i> Bloqueado (Faltan ${remaining} del Paso ${i - 1})`;
                }
            } else {
                card.classList.remove('step-card-locked');
                if (lockIndicator) lockIndicator.style.display = 'none';
                if (actionBtn) {
                    actionBtn.classList.remove('btn-locked');
                    actionBtn.innerHTML = `<i class="fas fa-layer-group"></i> Explorar Módulos`;
                }
            }
        }

        if (navBtn) {
            if (!isUnlocked) {
                navBtn.classList.add('nav-locked');
                navBtn.title = `Bloqueado: Completa los 10 módulos del Paso ${i - 1}`;
                navBtn.innerHTML = `<i class="fas fa-lock" style="color: var(--text-dim); margin-right: 4px;"></i> <span class="tab-step-text"><strong class="step-num-label">Paso ${i}</strong><span class="step-sub-label">${i === 2 ? 'Expande' : 'Practica'}</span></span>`;
            } else {
                navBtn.classList.remove('nav-locked');
                navBtn.title = '';
                const icon = i === 2 ? 'fa-wave-square' : 'fa-tree';
                const color = i === 2 ? 'var(--aura-purple)' : 'var(--aura-cyan)';
                navBtn.innerHTML = `<i class="fas ${icon}" style="color: ${color};"></i> <span class="tab-step-text"><strong class="step-num-label">Paso ${i}</strong><span class="step-sub-label">${i === 2 ? 'Expande' : 'Practica'}</span></span>`;
            }
        }
    }
}

// Actualiza el encabezado del Hub y la promesa Antes vs Después
function updateHubBanner(stepData) {
    const badge = document.getElementById('hub-step-badge');
    const title = document.getElementById('hub-step-title');
    const subtitle = document.getElementById('hub-step-subtitle');
    const transBefore = document.getElementById('hub-trans-before');
    const transAfter = document.getElementById('hub-trans-after');
    const bannerBox = document.getElementById('hub-banner-box');

    if (badge) {
        const iconClass = stepData.stepNumber === 1 ? 'fa-mountain' :
                          stepData.stepNumber === 2 ? 'fa-wave-square' : 'fa-tree';
        badge.innerHTML = `<i class="fas ${iconClass}"></i> ${stepData.tag} &bull; 10 MÓDULOS DE TRANSFORMACIÓN`;
        badge.className = `step-badge-pill pill-${stepData.badgeColor}`;
    }

    if (title) title.textContent = stepData.title;
    if (subtitle) subtitle.textContent = stepData.parenthesis;
    if (transBefore) transBefore.textContent = stepData.promiseBefore;
    if (transAfter) transAfter.textContent = stepData.promiseAfter;

    // Cambiar sutilmente el acento luminoso del contenedor
    if (bannerBox) {
        bannerBox.className = `step-hub-banner accent-${stepData.badgeColor}`;
    }
}

// ====================================================================
// RENDERIZADO DE LOS 10 MÓDULOS DEL PASO
// ====================================================================
function renderStepModules() {
    const grid = document.getElementById('modules-grid-container');
    if (!grid) return;

    grid.innerHTML = '';

    const stepData = window.AURA_STEPS ? window.AURA_STEPS.find(s => s.stepNumber === currentStepNumber) : null;
    if (!stepData || !stepData.modules) return;

    // Filtrar módulos por estado y término de búsqueda
    const filteredModules = stepData.modules.filter(mod => {
        const isDone = window.isModuleCompleted ? window.isModuleCompleted(mod.globalId) : false;

        // Filtro por píldoras
        if (currentFilter === 'completed' && !isDone) return false;
        if (currentFilter === 'pending' && isDone) return false;

        // Filtro por búsqueda
        if (currentSearch) {
            const query = currentSearch.toLowerCase();
            const matchTitle = mod.title.toLowerCase().includes(query);
            const matchSub = mod.subtitle.toLowerCase().includes(query);
            const matchDesc = mod.description.toLowerCase().includes(query);
            const matchType = mod.type.toLowerCase().includes(query);
            if (!matchTitle && !matchSub && !matchDesc && !matchType) return false;
        }

        return true;
    });

    if (filteredModules.length === 0) {
        grid.innerHTML = `
            <div class="empty-modules-notice">
                <i class="fas fa-search" style="font-size: 2rem; color: var(--text-dim); margin-bottom: 12px;"></i>
                <h3>No se encontraron módulos</h3>
                <p>Prueba con otro término de búsqueda o selecciona "Todos los 10 Módulos".</p>
                <button class="btn-glass-nav" style="margin-top: 14px;" onclick="resetFilters()">
                    <i class="fas fa-redo"></i> Restablecer Filtros
                </button>
            </div>
        `;
        return;
    }

    // Crear tarjetas de módulos con validación secuencial
    filteredModules.forEach(mod => {
        const modIndex = stepData.modules.findIndex(m => m.globalId === mod.globalId);
        const isAccessible = window.isModuleAccessible ? window.isModuleAccessible(mod.stepNumber, modIndex) : true;
        const isDone = window.isModuleCompleted ? window.isModuleCompleted(mod.globalId) : false;
        const isApproved = window.isModuleApproved ? window.isModuleApproved(mod.globalId) : false;
        const score = window.AuraQuizEngine ? window.AuraQuizEngine.getScore(mod.globalId) : 0;

        const card = document.createElement('article');
        card.className = `module-card ${isDone ? 'is-completed' : ''} ${!isAccessible ? 'module-card-locked' : ''}`;

        card.innerHTML = `
            <div class="mod-card-header">
                <span class="mod-num-badge">MÓDULO ${mod.number}</span>
                <span class="mod-type-badge">${mod.type}</span>
                <span class="mod-duration">
                    <i class="fas fa-clock"></i> ${mod.duration}
                </span>
            </div>

            <h3 class="mod-card-title">${mod.title}</h3>
            <span class="mod-card-sub">${mod.subtitle}</span>

            <!-- Transformation pill -->
            <div class="mod-transformation-box">
                <i class="fas fa-arrow-right"></i>
                <span>${mod.transformation}</span>
            </div>

            <p class="mod-card-desc">${mod.description}</p>

            <div class="mod-card-footer">
                <div class="mod-status-box">
                    ${!isAccessible ? `
                        <span class="status-badge-locked">
                            <i class="fas fa-lock"></i> Requiere Módulo Anterior
                        </span>
                    ` : (isApproved ? `
                        <span class="status-badge-done">
                            <i class="fas fa-check-circle"></i> Aprobado (${score}%)
                        </span>
                    ` : `
                        <span class="status-badge-pending">
                            <i class="fas fa-clipboard-check"></i> Evaluación Pendiente (80%)
                        </span>
                    `)}
                </div>

                ${!isAccessible ? `
                    <button class="btn-module-open btn-locked-mod" onclick="showLockedModuleAlert('${mod.number}')">
                        <i class="fas fa-lock"></i> Bloqueado
                    </button>
                ` : `
                    <button class="btn-module-open" onclick="openModuleReader('${mod.globalId}')">
                        <i class="fas ${isApproved ? 'fa-book-open' : 'fa-play-circle'}"></i> 
                        ${isApproved ? 'Repasar Módulo' : 'Iniciar & Evaluar'}
                    </button>
                `}
            </div>
        `;

        grid.appendChild(card);
    });
}

// Alerta al hacer clic en un módulo bloqueado
window.showLockedModuleAlert = function(modNum) {
    showToast(
        '🔒 Módulo Bloqueado',
        `Para acceder al Módulo ${modNum}, primero debes completar y aprobar la evaluación interactiva del módulo anterior con al menos el 80% de aciertos.`,
        'fa-lock'
    );
};

// ====================================================================
// EVENTOS DE LA BARRA DE HERRAMIENTAS
// ====================================================================
function setupToolbarEvents() {
    // Filtros de categoría / estado
    const pills = document.querySelectorAll('.filter-pill');
    pills.forEach(pill => {
        pill.addEventListener('click', () => {
            pills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            currentFilter = pill.getAttribute('data-filter');
            renderStepModules();
        });
    });

    // Búsqueda en vivo
    const searchInput = document.getElementById('module-search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentSearch = e.target.value.trim();
            renderStepModules();
        });
    }
}

function resetFilters() {
    currentSearch = '';
    currentFilter = 'all';
    const searchInput = document.getElementById('module-search-input');
    if (searchInput) searchInput.value = '';
    const pills = document.querySelectorAll('.filter-pill');
    pills.forEach(p => {
        if (p.getAttribute('data-filter') === 'all') p.classList.add('active');
        else p.classList.remove('active');
    });
    renderStepModules();
}

// ====================================================================
// ACTUALIZACIÓN DE PROGRESO Y ESTADÍSTICAS
// ====================================================================
function refreshStepProgressBars() {
    // Actualizar mini-barras en las 3 Master Cards
    for (let i = 1; i <= 3; i++) {
        const stepProg = window.getStepProgress ? window.getStepProgress(`paso-${i}`) : { completed: 0, total: 10, percent: 0 };
        const label = document.getElementById(`step-${i}-pct-label`);
        const bar = document.getElementById(`step-${i}-pct-bar`);
        if (label) label.textContent = `${stepProg.completed}/10 (${stepProg.percent}%)`;
        if (bar) bar.style.width = `${stepProg.percent}%`;
    }

    // Actualizar barra y contador del Paso Activo en el Banner
    const currentStepProg = window.getStepProgress ? window.getStepProgress(`paso-${currentStepNumber}`) : { completed: 0, total: 10, percent: 0 };
    const hubCount = document.getElementById('hub-completed-count');
    const hubPct = document.getElementById('hub-progress-pct');
    const hubFullBar = document.getElementById('hub-full-bar-fill');

    if (hubCount) hubCount.textContent = `${currentStepProg.completed} / 10`;
    if (hubPct) hubPct.textContent = `${currentStepProg.percent}%`;
    if (hubFullBar) hubFullBar.style.width = `${currentStepProg.percent}%`;
}

function refreshGlobalStats() {
    const globalProg = window.getGlobalProgress ? window.getGlobalProgress() : { completed: 0, total: 30, percent: 0 };
    const navPct = document.getElementById('nav-global-pct');
    if (navPct) navPct.textContent = `${globalProg.percent}%`;
}

// ====================================================================
// LECTOR INMERSIVO (MODAL DE ESTUDIO / MASTERCLASS)
// ====================================================================
function findModuleByGlobalId(globalId) {
    if (!window.AURA_STEPS) return null;
    for (const step of window.AURA_STEPS) {
        const found = step.modules.find(m => m.globalId === globalId);
        if (found) return found;
    }
    return null;
}

window.openModuleReader = function(globalId) {
    const mod = findModuleByGlobalId(globalId);
    if (!mod) return;

    // Validar accesibilidad secuencial
    const stepData = window.AURA_STEPS ? window.AURA_STEPS.find(s => s.stepNumber === mod.stepNumber) : null;
    const modIdx = stepData ? stepData.modules.findIndex(m => m.globalId === globalId) : 0;
    const isAccessible = window.isModuleAccessible ? window.isModuleAccessible(mod.stepNumber, modIdx) : true;

    if (!isAccessible) {
        showToast(
            '🔒 Módulo Bloqueado', 
            `Para acceder al Módulo ${mod.number}, primero debes completar y aprobar la evaluación interactiva del módulo previo con al menos el 80% de aciertos.`, 
            'fa-lock'
        );
        return;
    }

    activeModuleGlobalId = globalId;

    // Actualizar título general
    document.getElementById('player-course-title').textContent = mod.title;
    document.getElementById('player-course-subtitle').textContent = `Paso ${mod.stepNumber}: Módulo ${mod.number}`;

    // Renderizar lista de módulos del paso en la barra lateral
    renderReaderSidebar(mod.stepNumber);

    // Cargar contenido Markdown en el cuerpo principal y la evaluación somática interactiva
    loadReaderModuleContent(mod);

    // Abrir modal
    const modal = document.getElementById('player-modal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Evitar scroll del fondo
    }
};

function renderReaderSidebar(stepNumber) {
    const list = document.getElementById('player-modules-list');
    const label = document.getElementById('sidebar-step-label');
    if (!list) return;

    list.innerHTML = '';
    const stepData = window.AURA_STEPS ? window.AURA_STEPS.find(s => s.stepNumber === stepNumber) : null;
    if (!stepData) return;

    if (label) label.textContent = `MÓDULOS DE ${stepData.tag} (10)`;

    stepData.modules.forEach((m, idx) => {
        const isDone = window.isModuleCompleted ? window.isModuleCompleted(m.globalId) : false;
        const isApproved = window.isModuleApproved ? window.isModuleApproved(m.globalId) : false;
        const isActive = m.globalId === activeModuleGlobalId;
        const isAccessible = window.isModuleAccessible ? window.isModuleAccessible(stepNumber, idx) : true;
        const score = window.AuraQuizEngine ? window.AuraQuizEngine.getScore(m.globalId) : 0;

        const item = document.createElement('div');
        item.className = `reader-sidebar-item ${isActive ? 'active' : ''} ${isDone ? 'done' : ''} ${!isAccessible ? 'sidebar-mod-locked' : ''}`;

        if (isAccessible) {
            item.onclick = () => {
                activeModuleGlobalId = m.globalId;
                loadReaderModuleContent(m);
                renderReaderSidebar(stepNumber);
            };
        } else {
            item.onclick = () => {
                showToast(
                    '🔒 Módulo Bloqueado', 
                    `Debes aprobar la evaluación somática del módulo anterior con al menos el 80% para desbloquear el Módulo ${m.number}.`, 
                    'fa-lock'
                );
            };
        }

        const iconMarkup = !isAccessible ? '<i class="fas fa-lock mod-dot" style="color: var(--text-dim); opacity: 0.6;"></i>' :
                          isDone ? '<i class="fas fa-check-circle mod-dot" style="color: #10b981;"></i>' :
                          isActive ? '<i class="fas fa-dot-circle mod-dot" style="color: var(--aura-gold);"></i>' :
                          '<i class="far fa-circle mod-dot"></i>';

        item.innerHTML = `
            ${iconMarkup}
            <div class="sidebar-mod-info">
                <span class="sidebar-mod-title">${m.number}. ${m.title}</span>
                <span class="sidebar-mod-meta">${m.duration} &bull; ${m.badge} ${!isAccessible ? '(Bloqueado)' : (isApproved ? `✓ ${score}%` : '(Pendiente)')}</span>
            </div>
        `;

        list.appendChild(item);
    });
}

function loadReaderModuleContent(mod) {
    const badge = document.getElementById('reader-module-badge');
    const title = document.getElementById('reader-module-title');
    const body = document.getElementById('reader-body');
    const quizContainer = document.getElementById('reader-quiz-container');

    if (badge) badge.textContent = `PASO ${mod.stepNumber} &bull; MÓDULO ${mod.number} &bull; ${mod.badge}`;
    if (title) title.textContent = mod.title;

    // Actualizar estado del botón de completado
    const isDone = window.isModuleCompleted ? window.isModuleCompleted(mod.globalId) : false;
    updateDoneButtonUI(isDone);

    // Cargar contenido Markdown a través del motor somático
    const rawMarkdown = window.getAuraModuleContent ? window.getAuraModuleContent(mod) : `# ${mod.title}\n\nContenido en desarrollo...`;

    if (body) {
        body.innerHTML = parseMarkdownToHTML(rawMarkdown);
    }

    // Cargar evaluación somática interactiva (exige 80% para aprobar)
    if (quizContainer && window.AuraQuizEngine) {
        window.AuraQuizEngine.renderQuiz(mod, quizContainer);
    }

    // Actualizar botones de navegación inferior (Siguiente Módulo bloqueado/desbloqueado)
    updatePagerButtonsUI(mod);

    // Scroll al inicio del visor
    const mainView = document.getElementById('player-main-view');
    if (mainView) mainView.scrollTop = 0;
}

function updatePagerButtonsUI(mod) {
    const nextBtn = document.getElementById('btn-next-mod');
    const prevBtn = document.getElementById('btn-prev-mod');
    if (!mod) return;

    const stepData = window.AURA_STEPS ? window.AURA_STEPS.find(s => s.stepNumber === mod.stepNumber) : null;
    if (!stepData) return;
    const modIdx = stepData.modules.findIndex(m => m.globalId === mod.globalId);

    // Botón anterior
    if (prevBtn) {
        prevBtn.disabled = modIdx <= 0;
        prevBtn.style.opacity = modIdx <= 0 ? '0.35' : '1';
        prevBtn.style.cursor = modIdx <= 0 ? 'not-allowed' : 'pointer';
    }

    // Botón siguiente (condicionado por aprobación >= 80%)
    if (nextBtn) {
        const isLast = modIdx >= stepData.modules.length - 1;
        const isApproved = window.isModuleApproved ? window.isModuleApproved(mod.globalId) : false;

        if (isLast) {
            nextBtn.className = 'btn-glass-nav';
            nextBtn.innerHTML = 'Fin del Paso <i class="fas fa-check-double" style="color: #10b981;"></i>';
            nextBtn.disabled = false;
        } else if (isApproved) {
            nextBtn.className = 'btn-glass-nav btn-unlocked-pager';
            nextBtn.innerHTML = 'Siguiente Módulo <i class="fas fa-arrow-right"></i>';
            nextBtn.title = 'Aprobado (80%+): Haz clic para avanzar';
        } else {
            nextBtn.className = 'btn-glass-nav btn-locked-pager';
            nextBtn.innerHTML = '<i class="fas fa-lock"></i> Siguiente Módulo (Requiere 80% &bull; 8/10)';
            nextBtn.title = 'Bloqueado: Aprueba la evaluación con mínimo 80% (8 de 10) para avanzar';
        }
    }
}

function updateDoneButtonUI(isDone) {
    const btn = document.getElementById('btn-toggle-done');
    if (!btn) return;
    if (isDone) {
        btn.classList.add('completed');
        btn.innerHTML = '<i class="fas fa-check-circle"></i> Módulo Aprobado (✓ 80%+)';
    } else {
        btn.classList.remove('completed');
        btn.innerHTML = '<i class="far fa-circle"></i> Marcar como Completado';
    }
}

window.toggleCurrentModuleCompletion = function() {
    const mod = findModuleByGlobalId(activeModuleGlobalId);
    if (!mod) return;

    const isApproved = window.isModuleApproved ? window.isModuleApproved(mod.globalId) : false;
    if (!isApproved) {
        const quizContainer = document.getElementById('reader-quiz-container');
        if (quizContainer) {
            quizContainer.classList.add('shake-card');
            setTimeout(() => quizContainer.classList.remove('shake-card'), 600);
            quizContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        showToast(
            '🔒 Evaluación Requerida (Mínimo 80%)',
            'Para completar este módulo y registrar tu progreso, responde las 10 preguntas de evaluación al final de la lección y obtén al menos un 80% de aciertos (mínimo 8 de 10).',
            'fa-clipboard-check'
        );
        return;
    }

    const currentStatus = window.isModuleCompleted ? window.isModuleCompleted(mod.globalId) : false;
    const newStatus = !currentStatus;

    if (window.setModuleCompleted) {
        window.setModuleCompleted(mod.globalId, newStatus);
    }

    // Actualizar UI
    updateDoneButtonUI(newStatus);
    updatePagerButtonsUI(mod);
    renderReaderSidebar(mod.stepNumber);
    renderStepModules();
    refreshStepProgressBars();
    refreshLockStates();
    refreshGlobalStats();

    // Comprobar si acaba de desbloquear un nuevo paso
    if (newStatus) {
        if (mod.stepNumber === 1 && window.isStepUnlocked && window.isStepUnlocked(2)) {
            showToast('🎉 ¡PASO 2 DESBLOQUEADO!', 'Has completado los 10 módulos del Paso 1. El Paso 2 (Expande Su Sistema Nervioso) ya está disponible.', 'fa-unlock-alt');
        } else if (mod.stepNumber === 2 && window.isStepUnlocked && window.isStepUnlocked(3)) {
            showToast('🎉 ¡PASO 3 DESBLOQUEADO!', 'Has completado los 10 módulos del Paso 2. El Paso 3 (Practica Sostenidamente) ya está disponible.', 'fa-unlock-alt');
        }
    }
};

window.navigateAdjacentModule = function(delta) {
    const mod = findModuleByGlobalId(activeModuleGlobalId);
    if (!mod) return;

    const stepData = window.AURA_STEPS ? window.AURA_STEPS.find(s => s.stepNumber === mod.stepNumber) : null;
    if (!stepData) return;

    const currentIndex = stepData.modules.findIndex(m => m.globalId === activeModuleGlobalId);

    if (delta > 0) {
        // Bloqueo estricto: exige al menos 80% (8 de 10) en la evaluación del módulo actual para poder pasar
        const isApproved = window.isModuleApproved ? window.isModuleApproved(mod.globalId) : false;
        if (!isApproved) {
            const quizContainer = document.getElementById('reader-quiz-container');
            if (quizContainer) {
                quizContainer.classList.add('shake-card');
                setTimeout(() => quizContainer.classList.remove('shake-card'), 600);
                quizContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            showToast(
                '🔒 Evaluación Requerida (Mínimo 80%)',
                `Para avanzar al siguiente módulo, debes responder las 10 preguntas de evaluación abajo y obtener un puntaje mínimo del 80% (al menos 8 de 10 correctas).`,
                'fa-lock'
            );
            return;
        }
    }

    let nextIndex = currentIndex + delta;
    if (nextIndex >= 0 && nextIndex < stepData.modules.length) {
        const nextMod = stepData.modules[nextIndex];
        activeModuleGlobalId = nextMod.globalId;
        loadReaderModuleContent(nextMod);
        renderReaderSidebar(mod.stepNumber);
    }
};

window.closePlayerModal = function() {
    const modal = document.getElementById('player-modal');
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
};

// Hooks para comunicarse con AuraQuizEngine
window.AuraApp = {
    findModule: findModuleByGlobalId,
    showToast: showToast,
    refreshLockStates: refreshLockStates,
    renderModules: renderStepModules,
    onModuleEvaluationPassed: function(mod, score) {
        showToast(
            '🎉 ¡EVALUACIÓN APROBADA!', 
            `Obtuviste ${score}% de aciertos. Superaste el 80% mínimo requerido (al menos 8 de 10). El siguiente módulo ha sido desbloqueado con éxito.`, 
            'fa-check-circle'
        );
        updateDoneButtonUI(true);
        updatePagerButtonsUI(mod);
        renderReaderSidebar(mod.stepNumber);
        renderStepModules();
        refreshStepProgressBars();
        refreshLockStates();
        refreshGlobalStats();

        // Si completó los 10 módulos del paso 1 o 2
        if (mod.stepNumber === 1 && window.isStepUnlocked && window.isStepUnlocked(2)) {
            setTimeout(() => {
                showToast('🎉 ¡PASO 2 DESBLOQUEADO!', 'Has completado y aprobado los 10 módulos del Paso 1. El Paso 2 ya está disponible.', 'fa-unlock-alt');
            }, 1200);
        } else if (mod.stepNumber === 2 && window.isStepUnlocked && window.isStepUnlocked(3)) {
            setTimeout(() => {
                showToast('🎉 ¡PASO 3 DESBLOQUEADO!', 'Has completado y aprobado los 10 módulos del Paso 2. El Paso 3 ya está disponible.', 'fa-unlock-alt');
            }, 1200);
        }
    },
    onModuleEvaluationFailed: function(mod, score) {
        showToast(
            '⚠️ Evaluación No Aprobada', 
            `Calificación: ${score}%. Necesitas al menos el 80% (8 de 10 correctas) para habilitar el pase al siguiente módulo. Revisa las explicaciones y reintenta.`, 
            'fa-times-circle'
        );
        updatePagerButtonsUI(mod);
        renderReaderSidebar(mod.stepNumber);
        renderStepModules();
    }
};

// Tecla Escape para cerrar el lector
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closePlayerModal();
    }
});

// Parser de Markdown enriquecido para AURA
function parseMarkdownToHTML(md) {
    if (!md) return '';

    return md
        // Encabezados
        .replace(/^# (.*$)/gim, '<h1 class="md-h1">$1</h1>')
        .replace(/^## (.*$)/gim, '<h2 class="md-h2">$1</h2>')
        .replace(/^### (.*$)/gim, '<h3 class="md-h3">$1</h3>')
        
        // Bloques de cita (Quotes)
        .replace(/^\> (.*$)/gim, '<blockquote class="md-quote">$1</blockquote>')

        // Negrita y cursiva
        .replace(/\*\*\*(.*?)\*\*\*/gim, '<strong><em>$1</em></strong>')
        .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/gim, '<em>$1</em>')

        // Tablas Markdown
        .replace(/\| (.*) \|\n\| :--- \| :--- \|\n\| (.*) \| (.*) \|\n\| (.*) \| (.*) \|\n\| (.*) \| (.*) \|/gim, 
            '<div class="md-table-wrap"><table><thead><tr><th>$1</th></tr></thead><tbody><tr><td>$2</td><td>$3</td></tr><tr><td>$4</td><td>$5</td></tr><tr><td>$6</td><td>$7</td></tr></tbody></table></div>')

        // Listas con viñetas
        .replace(/^\* (.*$)/gim, '<li class="md-li">$1</li>')
        .replace(/<\/li>\n<li class="md-li">/gim, '</li><li class="md-li">')

        // Separadores horizontales
        .replace(/^---/gim, '<hr class="md-divider">')

        // Párrafos
        .replace(/\n\n/gim, '</p><p class="md-p">')
        .replace(/^(?!<[h|p|b|t|l|d])(.*$)/gim, '<p class="md-p">$1</p>');
}

// ====================================================================
// GENERADOR DE ONDAS BINAURALES (WEB AUDIO API - 14 HZ ALFA)
// ====================================================================
window.toggleSimulator = function() {
    const modalBtn = document.getElementById('btn-play-sim');
    const quickLabel = document.getElementById('quick-audio-label');
    const statusPill = document.getElementById('binaural-status-pill');

    if (!isPlayingAudio) {
        try {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Oído Izquierdo: 214 Hz
            oscillatorLeft = audioContext.createOscillator();
            const gainLeft = audioContext.createGain();
            gainLeft.gain.value = 0.07;
            oscillatorLeft.frequency.value = 214;
            
            // Oído Derecho: 200 Hz -> Diferencia = 14 Hz (Ondas Alfa)
            oscillatorRight = audioContext.createOscillator();
            const gainRight = audioContext.createGain();
            gainRight.gain.value = 0.07;
            oscillatorRight.frequency.value = 200;

            // Paneo estéreo si el navegador lo soporta
            if (audioContext.createStereoPanner) {
                const panLeft = audioContext.createStereoPanner();
                panLeft.pan.value = -1;
                oscillatorLeft.connect(gainLeft);
                gainLeft.connect(panLeft);
                panLeft.connect(audioContext.destination);

                const panRight = audioContext.createStereoPanner();
                panRight.pan.value = 1;
                oscillatorRight.connect(gainRight);
                gainRight.connect(panRight);
                panRight.connect(audioContext.destination);
            } else {
                oscillatorLeft.connect(gainLeft);
                gainLeft.connect(audioContext.destination);
                oscillatorRight.connect(gainRight);
                gainRight.connect(audioContext.destination);
            }

            oscillatorLeft.start();
            oscillatorRight.start();
            isPlayingAudio = true;

            if (modalBtn) modalBtn.innerHTML = '<i class="fas fa-pause"></i> Pausar Ondas Alfa';
            if (quickLabel) quickLabel.textContent = 'Pausar 14 Hz';
            if (statusPill) {
                statusPill.textContent = 'SONANDO (14 Hz)';
                statusPill.style.color = 'var(--aura-green)';
            }
        } catch (err) {
            console.log('Aviso Audio:', err);
        }
    } else {
        if (oscillatorLeft) { oscillatorLeft.stop(); oscillatorLeft.disconnect(); }
        if (oscillatorRight) { oscillatorRight.stop(); oscillatorRight.disconnect(); }
        if (audioContext) audioContext.close();
        isPlayingAudio = false;

        if (modalBtn) modalBtn.innerHTML = '<i class="fas fa-play"></i> Reproducir Ondas Alfa';
        if (quickLabel) quickLabel.textContent = 'Ondas 14 Hz';
        if (statusPill) {
            statusPill.textContent = 'LISTO';
            statusPill.style.color = 'var(--aura-gold-light)';
        }
    }
};

// ====================================================================
// CIERRE DE SESIÓN
// ====================================================================
window.logout = function() {
    if (window.auth && typeof window.auth.logout === 'function') {
        window.auth.logout();
    } else {
        localStorage.removeItem('aura_session');
        window.location.href = 'login.html';
    }
};
