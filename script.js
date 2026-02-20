document.addEventListener('DOMContentLoaded', () => {
    // --- Ripple Effect ---
    const buttons = document.querySelectorAll('.md-button');

    buttons.forEach(button => {
        // Use mousedown for immediate feedback as requested
        button.addEventListener('mousedown', function (e) {
            const existingRipples = this.querySelectorAll('.ripple');
            existingRipples.forEach(r => r.remove());

            const ripple = document.createElement('span');
            ripple.classList.add('ripple');

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);

            ripple.style.width = ripple.style.height = `${size}px`;

            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            this.appendChild(ripple);

            ripple.addEventListener('animationend', () => {
                ripple.remove();
            });
        });
    });

    // --- Dynamic Orbs ---
    const orbsContainer = document.querySelector('.orbs');

    function createOrb() {
        const orb = document.createElement('div');
        orb.classList.add('orb');

        // Random size between 200px and 500px
        const size = Math.floor(Math.random() * 300) + 200;
        orb.style.width = `${size}px`;
        orb.style.height = `${size}px`;

        // Random position
        orb.style.top = `${Math.floor(Math.random() * 110) - 10}%`;
        orb.style.left = `${Math.floor(Math.random() * 110) - 10}%`;

        // Random color between blue (200) and magenta (300)
        const hue = Math.floor(Math.random() * 100) + 200;
        orb.style.background = `hsl(${hue}, 80%, 50%)`;

        // Faster random duration (5s to 12s)
        const duration = Math.floor(Math.random() * 7) + 5;
        orb.style.animationDuration = `${duration}s`;

        orbsContainer.appendChild(orb);

        // Trigger fade in
        requestAnimationFrame(() => {
            orb.classList.add('visible');
        });

        // Remove orb after animation cycle to keep count stable
        // (float animation is 2 cycles for alternate, so let's say 2x duration)
        setTimeout(() => {
            orb.classList.remove('visible');
            orb.classList.add('exiting');
            setTimeout(() => orb.remove(), 5000); // Wait for fadeOut animation
        }, duration * 2000);
    }

    // Initial orbs
    for (let i = 0; i < 5; i++) {
        createOrb();
    }

    // Spawn new orbs periodically
    setInterval(createOrb, 4000);
});
