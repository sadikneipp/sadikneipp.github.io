document.getElementById('demosButton').addEventListener('click', function (e) {
    e.preventDefault(); // Prevent default link behavior

    // Select all elements you want to animate
    const elements = document.body.querySelectorAll('header, nav, main, a, h1');

    // Assign a continuous rotation direction and initial values for each element
    elements.forEach(el => {
        el.dataset.rotation = Math.random() < 0.5 ? -1 : 1; // Decide initial rotation direction
        el.dataset.rotationDegree = 0;
    });

    // Function to apply transformations
    const scramble = () => {
        elements.forEach(el => {
            const rotationDirection = parseInt(el.dataset.rotation);
            el.dataset.rotationDegree = parseInt(el.dataset.rotationDegree) + rotationDirection * (Math.random() * 5);
            const rotationDegree = el.dataset.rotationDegree;

            const randomScale = 0.9 + Math.random() * 0.2; // 0.9 to 1.1 scale
            const randomX = Math.random() * 5 - 2.5; // -2.5 to +2.5 pixels
            const randomY = Math.random() * 5 - 2.5; // -2.5 to +2.5 pixels

            el.style.transition = 'transform 0.1s linear';
            el.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${rotationDegree}deg) scale(${randomScale})`;
        });
    };

    // Function to reset transformations
    const reset = () => {
        elements.forEach(el => {
            el.style.transition = 'transform 0.5s ease-out';
            el.style.transform = '';
        });
    };

    // Apply transformations at a higher frequency for smoother animation
    const intervalId = setInterval(scramble, 100);

    // Stop the animation after 10 seconds and reset
    setTimeout(() => {
        clearInterval(intervalId);
        reset();
    }, 10000);
});
