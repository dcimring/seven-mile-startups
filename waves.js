export class WaveAnimation {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.waves = [];
        this.cursor = { x: 0, y: 0 };
        
        this.init();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => {
            this.cursor.x = e.clientX;
            this.cursor.y = e.clientY;
        });
    }

    init() {
        this.resize();
        // Create multiple waves with different properties - Speeds significantly reduced for calm effect
        this.waves = [
            { y: this.height * 0.5, length: 0.01, amplitude: 50, speed: 0.001, color: 'rgba(0, 119, 190, 0.2)' }, // Cayman Blue
            { y: this.height * 0.5, length: 0.007, amplitude: 70, speed: 0.0007, color: 'rgba(100, 255, 218, 0.15)' }, // Cyan
            { y: this.height * 0.55, length: 0.02, amplitude: 30, speed: 0.0015, color: 'rgba(255, 127, 80, 0.05)' }  // Coral (Subtle)
        ];
    }

    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    drawWave(wave, time) {
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.height);

        for (let i = 0; i < this.width; i++) {
            // Base wave
            let y = wave.y + Math.sin(i * wave.length + time * wave.speed) * wave.amplitude;
            
            // Interaction: Affect amplitude based on cursor distance
            const dist = Math.abs(i - this.cursor.x);
            if (dist < 200) {
                const force = (200 - dist) / 200;
                y += Math.sin(i * 0.05) * force * 20;
            }

            this.ctx.lineTo(i, y);
        }

        this.ctx.lineTo(this.width, this.height);
        this.ctx.closePath();
        this.ctx.fillStyle = wave.color;
        this.ctx.fill();
    }

    animate() {
        const time = Date.now();
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        this.waves.forEach(wave => {
            this.drawWave(wave, time);
        });

        requestAnimationFrame(() => this.animate());
    }
}
