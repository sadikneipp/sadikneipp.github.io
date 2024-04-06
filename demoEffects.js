document.getElementById('demosButton').addEventListener('click', function (e) {
    e.preventDefault(); // Prevent default link behavior

    // Select all elements you want to animate
    const elements = document.body.querySelectorAll('header, nav, main, a, h1');

    // Function to apply random transformations
    const scramble = () => {
        elements.forEach(el => {
            const randomRotation = Math.random() * 20; // 0 to +20 degrees
            const randomScale = 0.9 + Math.random() * 0.2; // 0.9 to 1.1 scale
            const randomX = Math.random() * 20 - 10; // -10 to +10 pixels
            const randomY = Math.random() * 20 - 10; // -10 to +10 pixels
            el.style.transition = 'transform 0.1s';
            el.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotation}deg) scale(${randomScale})`;
        });
    };

    // Function to reset transformations
    const reset = () => {
        elements.forEach(el => {
            el.style.transition = 'transform 0.1s';
            el.style.transform = '';
        });
    };

    // Scramble elements every 0.1 seconds
    const intervalId = setInterval(scramble, 100);

    // Stop scrambling after 10 seconds and reset
    setTimeout(() => {
        clearInterval(intervalId);
        reset();
    }, 10000);
});
