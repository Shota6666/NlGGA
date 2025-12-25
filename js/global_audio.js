document.addEventListener('DOMContentLoaded', () => {
    // Attempt to create audio, handle missing file gracefully
    let audio = null;
    try {
        audio = new Audio('music/button.m4a');
        audio.volume = 0.5;
    } catch (e) {
        console.error("Failed to init audio:", e);
    }

    // Function to play sound safely
    const playButtonSound = () => {
        if (!audio) return;
        try {
            const sound = audio.cloneNode();
            sound.volume = 0.5;
            sound.play().catch(e => {
                // Ignore autoplay block errors or load errors
                console.warn('Audio play prevented:', e);
            });
        } catch (e) {
            console.error("Error playing sound:", e);
        }
    };

    // Use document instead of body for wider capture
    document.addEventListener('click', (event) => {
        const target = event.target.closest('button, a, [role="button"], .btn, .button, [data-nav-target]');

        if (target) {
            const navTarget = target.getAttribute('data-nav-target');

            if (navTarget) {
                event.preventDefault();
                event.stopPropagation(); // Ensure we control the flow

                // Play sound (non-blocking)
                playButtonSound();

                // Navigate after very short delay (just enough to start the sound)
                setTimeout(() => {
                    window.location.href = navTarget;
                }, 100);
            } else {
                playButtonSound();
            }
        }
    }, true); // Use capture phase
});
