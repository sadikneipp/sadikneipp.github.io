document.getElementById('startGameButton').addEventListener('click', function (e) {
    e.preventDefault();
    startGame();
});

function startGame() {
    // Hide non-game related elements
    document.querySelector('header').style.display = 'none';
    document.querySelector('nav').style.display = 'none';
    document.querySelector('main').style.display = 'none';
    // Add here more elements you wish to hide

    // Prepare the game area
    const gameArea = document.createElement('div');
    gameArea.id = 'gameArea';
    gameArea.style.position = 'relative';
    gameArea.style.width = '600px';
    gameArea.style.height = '400px';
    gameArea.style.backgroundColor = 'black';
    gameArea.style.overflow = 'hidden';
    gameArea.style.margin = 'auto';
    document.body.appendChild(gameArea);

    // Player creation
    const player = document.createElement('div');
    player.id = 'player';
    player.style.position = 'absolute';
    player.style.bottom = '10px';
    player.style.left = '275px'; // Center player
    player.style.width = '50px';
    player.style.height = '50px';
    player.style.backgroundColor = 'green';
    gameArea.appendChild(player);

    // Move player
    document.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'ArrowLeft':
                player.style.left = Math.max(0, player.offsetLeft - 10) + 'px';
                break;
            case 'ArrowRight':
                player.style.left = Math.min(gameArea.offsetWidth - player.offsetWidth, player.offsetLeft + 10) + 'px';
                break;
        }
    });

    // Create invaders
    for (let i = 0; i < 5; i++) {
        const invader = document.createElement('div');
        invader.className = 'invader';
        invader.style.position = 'absolute';
        invader.style.top = '50px';
        invader.style.left = i * 100 + 'px';
        invader.style.width = '40px';
        invader.style.height = '40px';
        invader.style.backgroundColor = 'red';
        gameArea.appendChild(invader);
    }

    // Basic collision detection (player running into an invader)
    function checkCollision() {
        const invaders = document.querySelectorAll('.invader');
        invaders.forEach((invader) => {
            if (player.offsetLeft < invader.offsetLeft + invader.offsetWidth &&
                player.offsetLeft + player.offsetWidth > invader.offsetLeft &&
                player.offsetTop < invader.offsetTop + invader.offsetHeight &&
                player.offsetTop + player.offsetHeight > invader.offsetTop) {
                // Collision detected, game over
                gameOver();
            }
        });
    }

    // Continuously check for collision
    const collisionInterval = setInterval(checkCollision, 100);

    function gameOver() {
        clearInterval(collisionInterval); // Stop checking for collision
        document.body.removeChild(gameArea); // Remove game area
        // Show all elements back
        document.querySelector('header').style.display = '';
        document.querySelector('nav').style.display = '';
        document.querySelector('main').style.display = '';
        // Restore any other elements you hid
    }
}
