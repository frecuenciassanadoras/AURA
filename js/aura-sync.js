/**
 * aura-sync.js - Motor de Sincronización en la Nube AURA con Supabase
 * Permite que cada alumno guarde su progreso individualmente por correo electrónico.
 * Sincroniza módulos completados, notas de quizzes y porcentaje de avance.
 */

(function() {
    const SUPABASE_URL = "https://dothtuwrsplezhaxkjmw.supabase.co";
    const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvdGh0dXdyc3BsZXpoYXhram13Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2NzIzMjEsImV4cCI6MjA3MTI0ODMyMX0.B13yokCG9VQ49kjZ5pHeBdqBtW7i2CP8yg2l2Ekhqnc";

    function getCurrentUserEmail() {
        const email = localStorage.getItem('aura_session') || localStorage.getItem('aura_user_email') || '';
        return email.toLowerCase().trim();
    }

    // Recolectar todo el progreso local del alumno activo
    function collectCurrentProgress() {
        const email = getCurrentUserEmail();
        if (!email) return null;

        const completedModules = [];
        const quizScores = {};
        const quizPassed = {};

        // Recorrer todos los pasos y módulos
        if (window.AURA_STEPS) {
            window.AURA_STEPS.forEach(step => {
                step.modules.forEach(mod => {
                    const gid = mod.globalId;
                    if (window.isModuleCompleted && window.isModuleCompleted(gid)) {
                        completedModules.push(gid);
                    }
                    const score = localStorage.getItem(`aura_quiz_score_${email}_${gid}`) ||
                                  localStorage.getItem(`aura_quiz_score_${gid}`);
                    if (score !== null) {
                        quizScores[gid] = parseInt(score, 10);
                    }
                    const passed = localStorage.getItem(`aura_quiz_passed_${email}_${gid}`) ||
                                   localStorage.getItem(`aura_quiz_passed_${gid}`);
                    if (passed === 'true') {
                        quizPassed[gid] = true;
                    }
                });
            });
        }

        return {
            email: email,
            completed_modules: completedModules,
            quiz_scores: quizScores,
            quiz_passed: quizPassed,
            last_sync: new Date().toISOString()
        };
    }

    // Aplicar progreso descargado de Supabase en la sesión local del alumno
    function applyProgressToLocal(progressData) {
        if (!progressData || !progressData.email) return;
        const email = progressData.email.toLowerCase().trim();

        // Módulos completados
        if (Array.isArray(progressData.completed_modules)) {
            progressData.completed_modules.forEach(gid => {
                localStorage.setItem(`aura_mod_completed_${email}_${gid}`, 'true');
                localStorage.setItem(`aura_mod_completed_${gid}`, 'true');
            });
        }

        // Puntajes de quizzes
        if (progressData.quiz_scores) {
            Object.keys(progressData.quiz_scores).forEach(gid => {
                const score = progressData.quiz_scores[gid];
                localStorage.setItem(`aura_quiz_score_${email}_${gid}`, String(score));
                localStorage.setItem(`aura_quiz_score_${gid}`, String(score));
            });
        }

        // Quizzes aprobados
        if (progressData.quiz_passed) {
            Object.keys(progressData.quiz_passed).forEach(gid => {
                localStorage.setItem(`aura_quiz_passed_${email}_${gid}`, 'true');
                localStorage.setItem(`aura_quiz_passed_${gid}`, 'true');
            });
        }

        // Actualizar UI
        if (window.renderModules) window.renderModules();
        if (window.updateNavProgress) window.updateNavProgress();
    }

    // Actualizar indicador visual en el header si existe
    function updateSyncIndicator(status, text) {
        let el = document.getElementById('aura-cloud-sync-badge');
        if (!el) {
            const navActions = document.getElementById('status-strip-left') || document.querySelector('.nav-actions-wrapper');
            if (navActions) {
                el = document.createElement('div');
                el.id = 'aura-cloud-sync-badge';
                el.className = 'nav-global-pill nav-sync-pill';
                el.style.cssText = 'display:inline-flex; align-items:center; gap:6px; font-size:0.75rem;';
                navActions.insertBefore(el, navActions.firstChild);
            }
        }
        if (el) {
            if (status === 'syncing') {
                el.innerHTML = '<i class="fas fa-sync fa-spin" style="color:var(--aura-gold);"></i> <span>Sincronizando...</span>';
                el.title = 'Guardando progreso en Supabase';
            } else if (status === 'synced') {
                el.innerHTML = '<i class="fas fa-cloud-check" style="color:var(--aura-emerald);"></i> <span>En la nube</span>';
                el.title = 'Progreso sincronizado en Supabase con tu correo';
            } else if (status === 'error') {
                el.innerHTML = '<i class="fas fa-cloud-arrow-up" style="color:var(--aura-cyan);"></i> <span>Local</span>';
                el.title = text || 'Guardado localmente en este navegador';
            }
        }
    }

    // ─── 1. DESCARGAR PROGRESO DESDE SUPABASE AL INICIAR ───
    async function fetchUserProgressFromCloud(email) {
        if (!email) return null;
        updateSyncIndicator('syncing');

        try {
            // Estrategia A: Verificar si existe en taller_usuarios (columna progreso)
            const userUrl = `${SUPABASE_URL}/rest/v1/taller_usuarios?select=email,progreso&email=ilike.${encodeURIComponent(email)}`;
            const resUser = await fetch(userUrl, {
                headers: {
                    'apikey': SUPABASE_ANON_KEY,
                    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
                }
            });

            if (resUser.ok) {
                const rows = await resUser.json();
                if (rows.length > 0 && rows[0].progreso && Object.keys(rows[0].progreso).length > 0) {
                    console.log('☁️ [AURA Sync] Progreso cargado desde taller_usuarios.progreso');
                    applyProgressToLocal({ email, ...rows[0].progreso });
                    updateSyncIndicator('synced');
                    return rows[0].progreso;
                }
            }

            // Estrategia B: Verificar si existe en la tabla aura_progreso
            const progUrl = `${SUPABASE_URL}/rest/v1/aura_progreso?email=ilike.${encodeURIComponent(email)}`;
            const resProg = await fetch(progUrl, {
                headers: {
                    'apikey': SUPABASE_ANON_KEY,
                    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
                }
            });

            if (resProg.ok) {
                const rows = await resProg.json();
                if (rows.length > 0 && rows[0].progreso) {
                    console.log('☁️ [AURA Sync] Progreso cargado desde aura_progreso');
                    applyProgressToLocal({ email, ...rows[0].progreso });
                    updateSyncIndicator('synced');
                    return rows[0].progreso;
                }
            }

            // Si es un usuario nuevo sin progreso previo
            updateSyncIndicator('synced');
            return null;
        } catch (err) {
            console.warn('⚠️ [AURA Sync] No fue posible sincronizar desde la nube en este momento:', err);
            updateSyncIndicator('error', 'Guardado en navegador');
            return null;
        }
    }

    // ─── 2. GUARDAR PROGRESO EN SUPABASE AL COMPLETAR MÓDULO O QUIZ ───
    let debounceTimer = null;
    async function saveUserProgressToCloud() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(async () => {
            const email = getCurrentUserEmail();
            if (!email) return;

            const progressPayload = collectCurrentProgress();
            if (!progressPayload) return;

            updateSyncIndicator('syncing');

            try {
                // Intentar guardar en taller_usuarios si la columna progreso está disponible
                const updateUrl = `${SUPABASE_URL}/rest/v1/taller_usuarios?email=ilike.${encodeURIComponent(email)}`;
                const resPatch = await fetch(updateUrl, {
                    method: 'PATCH',
                    headers: {
                        'apikey': SUPABASE_ANON_KEY,
                        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                        'Content-Type': 'application/json',
                        'Prefer': 'return=minimal'
                    },
                    body: JSON.stringify({
                        progreso: progressPayload
                    })
                });

                if (resPatch.ok) {
                    console.log('☁️ [AURA Sync] Progreso guardado exitosamente en Supabase (taller_usuarios)!');
                    updateSyncIndicator('synced');
                    return;
                }

                // Fallback: Intentar tabla aura_progreso (Upsert)
                const upsertUrl = `${SUPABASE_URL}/rest/v1/aura_progreso`;
                const resUpsert = await fetch(upsertUrl, {
                    method: 'POST',
                    headers: {
                        'apikey': SUPABASE_ANON_KEY,
                        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                        'Content-Type': 'application/json',
                        'Prefer': 'resolution=merge-duplicates'
                    },
                    body: JSON.stringify({
                        email: email,
                        progreso: progressPayload,
                        updated_at: new Date().toISOString()
                    })
                });

                if (resUpsert.ok) {
                    console.log('☁️ [AURA Sync] Progreso guardado en tabla aura_progreso');
                    updateSyncIndicator('synced');
                } else {
                    console.info('ℹ️ [AURA Sync] Progreso guardado localmente (tabla en Supabase en espera de migración SQL)');
                    updateSyncIndicator('error', 'Guardado local (agrega columna en Supabase)');
                }
            } catch (err) {
                console.warn('⚠️ [AURA Sync] Error de red al guardar en la nube:', err);
                updateSyncIndicator('error', 'Guardado en navegador');
            }
        }, 600); // 600ms debounce para optimizar peticiones
    }

    // Inicialización automática al cargar la página
    document.addEventListener('DOMContentLoaded', () => {
        const email = getCurrentUserEmail();
        if (email && window.location.pathname.includes('index.html')) {
            fetchUserProgressFromCloud(email);
        }
    });

    // Exponer API global
    window.AuraSync = {
        fetch: fetchUserProgressFromCloud,
        save: saveUserProgressToCloud,
        collect: collectCurrentProgress,
        getEmail: getCurrentUserEmail
    };
})();
