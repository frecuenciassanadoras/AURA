/**
 * auth.js - Autenticación 100% Estricta contra Supabase (tabla: taller_usuarios)
 * Protege el acceso al Método AURA exigiendo credenciales válidas en la base de datos.
 */

const SUPABASE_URL = "https://dothtuwrsplezhaxkjmw.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvdGh0dXdyc3BsZXpoYXhram13Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2NzIzMjEsImV4cCI6MjA3MTI0ODMyMX0.B13yokCG9VQ49kjZ5pHeBdqBtW7i2CP8yg2l2Ekhqnc";
const SESSION_KEY = 'aura_session';
const LEGACY_KEY  = 'neurohub_session_v2';

// Determinar contexto de página
const onLoginPage = !!document.getElementById('login-form');
const onDashboard = !onLoginPage;

document.addEventListener('DOMContentLoaded', () => {
    const session = localStorage.getItem(SESSION_KEY) || localStorage.getItem(LEGACY_KEY);

    if (onLoginPage) {
        // Si ya tiene sesión activa y no cerró sesión explícitamente, enviar directo al panel
        if (session && sessionStorage.getItem('aura_logged_out') !== '1') {
            window.location.replace('index.html');
            return;
        }

        // Toggle para ver/ocultar contraseña
        const togglePassword = document.getElementById('togglePassword');
        const passwordInput  = document.getElementById('login-password');
        if (togglePassword && passwordInput) {
            togglePassword.addEventListener('click', function () {
                const type = passwordInput.type === 'password' ? 'text' : 'password';
                passwordInput.type = type;
                this.classList.toggle('fa-eye');
                this.classList.toggle('fa-eye-slash');
            });
        }
    } else {
        // En el Dashboard (index.html): 100% Estricto
        // Si no hay sesión válida registrada, expulsar inmediatamente al login
        if (!session) {
            window.location.replace('login.html');
            return;
        }

        // Reflejar el email del usuario en la interfaz si existen contenedores
        const userDisplays = document.querySelectorAll('.user-email-display, #user-email-display, .user-name-display');
        userDisplays.forEach(el => {
            el.textContent = session;
        });
    }
});

// ─── Logout Soberano ─────────────────────────────────────────────
function logout() {
    sessionStorage.setItem('aura_logged_out', '1');
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(LEGACY_KEY);
    localStorage.removeItem('aura_user_email');
    window.location.replace('login.html');
}

// ─── Manejo del Formulario de Login (Validación Supabase en Tiempo Real) ──
async function handleLogin(event) {
    if (event) event.preventDefault();

    const emailEl    = document.getElementById('login-email');
    const passwordEl = document.getElementById('login-password');
    const errorMsg   = document.getElementById('error-msg');
    const loginBtn   = document.getElementById('btn-submit-login') || document.getElementById('login-btn');

    if (!emailEl || !passwordEl) return;

    const emailInput    = emailEl.value.trim();
    const passwordInput = passwordEl.value.trim();

    if (!emailInput || !passwordInput) {
        showError(errorMsg, 'Por favor ingresa tu correo y tu contraseña.');
        return;
    }

    try {
        if (loginBtn) {
            loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Validando en Supabase...';
            loginBtn.disabled  = true;
            loginBtn.style.opacity = '0.85';
        }
        if (errorMsg) errorMsg.style.display = 'none';

        // Consulta estricta a Supabase vía PostgREST con filtro insensible a mayúsculas/minúsculas
        const queryUrl = `${SUPABASE_URL}/rest/v1/taller_usuarios?select=email,password&email=ilike.${encodeURIComponent(emailInput)}`;

        const response = await fetch(queryUrl, {
            method: 'GET',
            headers: {
                'apikey':        SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'Content-Type':  'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: no fue posible conectar con Supabase.`);
        }

        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
            const user = data[0];

            // Comprobación de contraseña
            if (user.password === passwordInput) {
                // Credenciales válidas: registrar sesión y limpiar marcas de logout
                sessionStorage.removeItem('aura_logged_out');
                localStorage.setItem(SESSION_KEY, user.email);
                localStorage.setItem(LEGACY_KEY, user.email);
                localStorage.setItem('aura_user_email', user.email);

                if (loginBtn) {
                    loginBtn.innerHTML = '<i class="fas fa-check-circle"></i> Acceso Concedido';
                    loginBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                }

                setTimeout(() => {
                    window.location.replace('index.html');
                }, 400);
            } else {
                showError(errorMsg, 'Contraseña incorrecta. Por favor verifica tus datos.');
                if (passwordEl) passwordEl.focus();
            }
        } else {
            showError(errorMsg, 'Correo no registrado en la base de datos de alumnos.');
            if (emailEl) emailEl.focus();
        }

    } catch (err) {
        console.error('Error de autenticación:', err);
        showError(errorMsg, 'Error de conexión con el servidor. Verifica tu conexión a internet.');
    } finally {
        if (loginBtn && !localStorage.getItem(SESSION_KEY)) {
            loginBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Acceder a AURA';
            loginBtn.disabled  = false;
            loginBtn.style.opacity = '1';
        }
    }
}

function showError(el, msg) {
    if (!el) return;
    el.innerHTML = `<i class="fas fa-exclamation-triangle" style="margin-right:8px; color:#ef4444;"></i> ${msg}`;
    el.style.display = 'flex';
}
