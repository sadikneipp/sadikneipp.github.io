document.getElementById('startGameButton').addEventListener('click', function (e) {
    e.preventDefault();
    startGame();
});

function startGame() {
    // Setup game variables
    let score = 0;
    let player;
    let gameArea;
    let invadersInterval;
    let bullets = [];
    let invaders = [];

    // Hide non-game related elements
    document.querySelector('header').style.display = 'none';
    document.querySelector('nav').style.display = 'none';
    document.querySelector('main').style.display = 'none';

    // Show score
    document.querySelector('score').style.display = '';

    // Prepare the game area
    gameArea = document.createElement('div');
    gameArea.id = 'gameArea';
    gameArea.style.position = 'relative';
    gameArea.style.width = '600px';
    gameArea.style.height = '400px';
    gameArea.style.backgroundColor = 'black';
    gameArea.style.overflow = 'hidden';
    gameArea.style.margin = 'auto';
    document.body.appendChild(gameArea);

    // Score display
    let scoreDisplay = document.createElement('div');
    scoreDisplay.style.color = 'white';
    scoreDisplay.innerHTML = 'Score: ' + score;
    gameArea.appendChild(scoreDisplay);

    // Player creation
    player = document.createElement('div');
    player.id = 'player';
    player.style.position = 'absolute';
    player.style.bottom = '10px';
    player.style.left = '275px'; // Center player
    player.style.width = '50px';
    player.style.height = '50px';
    player.style.backgroundColor = 'green';
    gameArea.appendChild(player);

    // Player movement
    document.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'ArrowLeft':
                player.style.left = Math.max(0, player.offsetLeft - 10) + 'px';
                break;
            case 'ArrowRight':
                player.style.left = Math.min(gameArea.offsetWidth - player.offsetWidth, player.offsetLeft + 10) + 'px';
                break;
            case ' ':
                shoot(); // Player shoots
                break;
        }
    });

    // Create invaders
    function createInvaders() {
        for (let i = 0; i < 5; i++) {
            let invader = document.createElement('div');
            invader.className = 'invader';
            invader.style.position = 'absolute';
            invader.style.top = '50px';
            invader.style.left = i * 100 + 'px';
            invader.style.width = '40px';
            invader.style.height = '40px';
            invader.style.backgroundColor = 'red';
            gameArea.appendChild(invader);
            invaders.push(invader);
        }
    }
    createInvaders();

    // Move invaders
    function moveInvaders() {
        let moveDown = false;
        let direction = 1; // Move right initially

        invadersInterval = setInterval(() => {
            const leftEdge = invaders[0].offsetLeft;
            const rightEdge = invaders[invaders.length - 1].offsetLeft + invaders[invaders.length - 1].offsetWidth;

            if (rightEdge > gameArea.offsetWidth - 10 || leftEdge < 10) {
                direction *= -1;
                moveDown = true;
            }

            invaders.forEach(invader => {
                if (moveDown) {
                    invader.style.top = invader.offsetTop + 40 + 'px';
                }
                invader.style.left = invader.offsetLeft + direction * 10 + 'px';
            });

            moveDown = false;
        }, 500);
    }
    moveInvaders();

    // Player shooting
    function shoot() {
        let bullet = document.createElement('div');
        bullet.className = 'bullet';
        bullet.style.position = 'absolute';
        bullet.style.bottom = '60px';
        bullet.style.left = player.offsetLeft + 25 + 'px';
        bullet.style.width = '5px';
        bullet.style.height = '20px';
        bullet.style.backgroundColor = 'yellow';
        gameArea.appendChild(bullet);
        bullets.push(bullet);
        moveBullet(bullet);
    }

    // Move bullet
    function moveBullet(bullet) {
        let moveBulletInterval = setInterval(() => {
            bullet.style.bottom = bullet.offsetTop + 10 + 'px';
            if (bullet.offsetTop > gameArea.offsetHeight) {
                bullet.remove();
                bullets.splice(bullets.indexOf(bullet), 1);
                clearInterval(moveBulletInterval);
            }
            // Check for collision with invaders
            invaders.forEach(invader => {
                if (isCollision(bullet, invader)) {
                    score++;
                    scoreDisplay.innerHTML = 'Score: ' + score;
                    invader.remove();
                    bullet.remove();
                    invaders.splice(invaders.indexOf(invader), 1);
                    bullets.splice(bullets.indexOf(bullet), 1);
                    clearInterval(moveBulletInterval);
                    if (invaders.length === 0) {
                        gameOver();
                    }
                }
            });
        }, 50);
    }

    // Check collision
    function isCollision(element1, element2) {
        return !(element1.getBoundingClientRect().right < element2.getBoundingClientRect().left ||
            element1.getBoundingClientRect().left > element2.getBoundingClientRect().right ||
            element1.getBoundingClientRect().bottom < element2.getBoundingClientRect().top ||
            element1.getBoundingClientRect().top > element2.getBoundingClientRect().bottom);
    }

    // Game Over
    function gameOver() {
        clearInterval(invadersInterval);
        invaders.forEach(invader => invader.remove());
        bullets.forEach(bullet => bullet.remove());
        gameArea.remove();
        document.querySelector('header').style.display = '';
        document.querySelector('nav').style.display = '';
        document.querySelector('main').style.display = '';
        document.querySelector('score').style.display = 'none';
    }
}
