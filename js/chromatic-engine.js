/**
 * ChromaticFlowEngine - Motor del Fondo Visual Interactivo Chromatic
 * Optimizado para NeuroHub (Plataforma de Cursos NeuroSync)
 */
class ChromaticFlowEngine {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.time = 0;
        this.speed = 0.007;
        this.mouse = { x: this.width / 2, y: this.height / 2, targetX: this.width / 2, targetY: this.height / 2 };
        this.intensityMultiplier = 1.0;
        this.mode = 'normal'; // 'normal', 'focus', 'deep'

        // Paleta de cintas espectrales Chromatic
        this.ribbons = [
            { color: 'rgba(0, 212, 255, 0.42)', offset: 0, frequency: 0.0015, amp: 280, width: 150 },
            { color: 'rgba(166, 75, 244, 0.38)', offset: 2.1, frequency: 0.0018, amp: 320, width: 170 },
            { color: 'rgba(255, 31, 90, 0.32)', offset: 4.2, frequency: 0.0012, amp: 260, width: 140 },
            { color: 'rgba(31, 90, 255, 0.36)', offset: 1.5, frequency: 0.002, amp: 300, width: 160 },
            { color: 'rgba(31, 255, 141, 0.25)', offset: 3.3, frequency: 0.0016, amp: 240, width: 130 }
        ];

        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        
        window.addEventListener('mousemove', (e) => {
            this.mouse.targetX = e.clientX;
            this.mouse.targetY = e.clientY;
        });

        // Suavizar en dispositivos táctiles
        window.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                this.mouse.targetX = e.touches[0].clientX;
                this.mouse.targetY = e.touches[0].clientY;
            }
        });

        this.animate();
    }

    setMode(newMode) {
        this.mode = newMode;
        if (newMode === 'focus') {
            this.speed = 0.012;
            this.intensityMultiplier = 1.35;
        } else if (newMode === 'deep') {
            this.speed = 0.004;
            this.intensityMultiplier = 0.75;
        } else {
            this.speed = 0.007;
            this.intensityMultiplier = 1.0;
        }
    }

    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    animate() {
        this.time += this.speed;

        // Interpolación fluida del cursor
        this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.045;
        this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.045;

        this.ctx.fillStyle = '#05050a';
        this.ctx.fillRect(0, 0, this.width, this.height);

        this.ctx.save();
        this.ctx.globalCompositeOperation = 'screen';

        this.ribbons.forEach((ribbon, idx) => {
            this.drawRibbon(ribbon, idx);
        });

        this.ctx.restore();

        // Viñetado suave y capa de profundidad
        const grad = this.ctx.createRadialGradient(
            this.width / 2, this.height / 2, Math.min(this.width, this.height) * 0.2,
            this.width / 2, this.height / 2, Math.max(this.width, this.height) * 0.85
        );
        grad.addColorStop(0, 'rgba(5, 5, 10, 0.1)');
        grad.addColorStop(1, 'rgba(3, 3, 7, 0.82)');
        this.ctx.fillStyle = grad;
        this.ctx.fillRect(0, 0, this.width, this.height);

        requestAnimationFrame(() => this.animate());
    }

    drawRibbon(ribbon, idx) {
        this.ctx.beginPath();
        const steps = 40;
        const stepWidth = this.width / steps;

        for (let i = 0; i <= steps; i++) {
            const x = i * stepWidth;

            // Ecuación armónica dual de flujo cromático
            const wave1 = Math.sin(x * ribbon.frequency + this.time + ribbon.offset) * ribbon.amp * this.intensityMultiplier;
            const wave2 = Math.cos(x * ribbon.frequency * 1.6 - this.time * 1.2) * (ribbon.amp * 0.5);
            
            // Deformación por influencia del cursor
            const distX = x - this.mouse.x;
            const mouseInfluence = Math.exp(-(distX * distX) / (this.width * 320)) * ((this.mouse.y - this.height / 2) * 0.5);

            const y = (this.height * 0.5) + wave1 + wave2 + mouseInfluence;

            if (i === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }
        }

        this.ctx.lineWidth = ribbon.width * (0.8 + 0.25 * Math.sin(this.time + idx));
        this.ctx.strokeStyle = ribbon.color;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.ctx.filter = 'blur(38px)';
        this.ctx.stroke();
        this.ctx.filter = 'none';
    }
}

// Inicialización automática
document.addEventListener('DOMContentLoaded', () => {
    window.chromaticEngine = new ChromaticFlowEngine('chromatic-canvas');
});
