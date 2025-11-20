class SocialSphere {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.items = Array.from(this.container.querySelectorAll('.social-item'));
        this.radius = this.container.offsetWidth / 2; // Dynamic radius
        this.speed = 0.5; // Base rotation speed
        this.mouseX = 0;
        this.mouseY = 0;
        this.isDragging = false;
        this.lastX = 0;
        this.lastY = 0;
        this.rotation = { x: 0, y: 0 };

        this.init();
    }

    init() {
        this.distributeItems();
        this.animate();
        this.addEventListeners();
    }

    distributeItems() {
        const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

        this.items.forEach((item, i) => {
            const y = 1 - (i / (this.items.length - 1)) * 2; // y goes from 1 to -1
            const radiusAtY = Math.sqrt(1 - y * y); // Radius at y
            const theta = phi * i; // Golden angle increment

            const x = Math.cos(theta) * radiusAtY;
            const z = Math.sin(theta) * radiusAtY;

            item.x = x * this.radius;
            item.y = y * this.radius;
            item.z = z * this.radius;

            // Initial position
            this.updateItemPosition(item);
        });
    }

    updateItemPosition(item) {
        // Apply rotation
        const cosX = Math.cos(this.rotation.x);
        const sinX = Math.sin(this.rotation.x);
        const cosY = Math.cos(this.rotation.y);
        const sinY = Math.sin(this.rotation.y);

        // Rotate around Y axis
        let x = item.x * cosY - item.z * sinY;
        let z = item.z * cosY + item.x * sinY;

        // Rotate around X axis
        let y = item.y * cosX - z * sinX;
        z = z * cosX + item.y * sinX;

        // Perspective scale
        const scale = (this.radius * 2) / (this.radius * 2 - z);
        const alpha = (z + this.radius) / (2 * this.radius);

        item.style.transform = `translate3d(${x}px, ${y}px, ${z}px) scale(${scale})`;
        item.style.opacity = 0.3 + 0.7 * alpha; // Fade items in back
        item.style.zIndex = Math.floor(z + this.radius);
    }

    animate() {
        // Auto rotation if not dragging
        if (!this.isDragging) {
            this.rotation.y += 0.005 * this.speed;
            this.rotation.x += 0.002 * this.speed;
        }

        this.items.forEach(item => {
            this.updateItemPosition(item);
        });

        requestAnimationFrame(() => this.animate());
    }

    addEventListeners() {
        this.container.addEventListener('mousedown', (e) => {
            this.isDragging = true;
            this.lastX = e.clientX;
            this.lastY = e.clientY;
        });

        document.addEventListener('mousemove', (e) => {
            if (this.isDragging) {
                const deltaX = e.clientX - this.lastX;
                const deltaY = e.clientY - this.lastY;

                this.rotation.y += deltaX * 0.01;
                this.rotation.x -= deltaY * 0.01;

                this.lastX = e.clientX;
                this.lastY = e.clientY;
            }
        });

        document.addEventListener('mouseup', () => {
            this.isDragging = false;
        });

        // Touch support
        this.container.addEventListener('touchstart', (e) => {
            this.isDragging = true;
            this.lastX = e.touches[0].clientX;
            this.lastY = e.touches[0].clientY;
        });

        document.addEventListener('touchmove', (e) => {
            if (this.isDragging) {
                const deltaX = e.touches[0].clientX - this.lastX;
                const deltaY = e.touches[0].clientY - this.lastY;

                this.rotation.y += deltaX * 0.01;
                this.rotation.x -= deltaY * 0.01;

                this.lastX = e.touches[0].clientX;
                this.lastY = e.touches[0].clientY;
            }
        });

        document.addEventListener('touchend', () => {
            this.isDragging = false;
        });
        document.addEventListener('touchend', () => {
            this.isDragging = false;
        });

        // Handle resize
        window.addEventListener('resize', () => {
            this.radius = this.container.offsetWidth / 2;
            this.distributeItems();
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new SocialSphere('social-sphere');
});
