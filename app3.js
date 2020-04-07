const $gameArea = document.querySelector('#gamearea');

const width = 800;
const height = 600;
const speed = 10;
const gameStatus = {
    playerWidth: 25,
    playerHeight: 80,
    playerX: 0,
    playerY: 0,
    keyLeft: false,
    keyRight: false,
    spaceBar: false
}

function buttonPressed(e){
    if(e.keyCode === 39){
        gameStatus.keyRight = true;
    }
    else if(e.keyCode === 37){
        gameStatus.keyLeft = true;
    }
    if(e.keyCode === 32){
        gameStatus.spaceBar = true;
    }
}

function buttonReleased(e){
    if(e.keyCode === 39){
        gameStatus.keyRight = false;
    }
    else if(e.keyCode === 37){
        gameStatus.keyLeft = false;
    }
    if(e.keyCode === 32){
        gameStatus.spaceBar = false;
    }
}

function createLasers(x){
    const $laser = document.createElement('img');
    $laser.src = 'images/phaser.png';
    $laser.classList.add('laser');
    $gameArea.appendChild($laser);
    placeElement($laser, x, (height - gameStatus.playerHeight * 2 ) );  
}

function createPlayer(){
    gameStatus.playerX = width / 2;
    gameStatus.playerY = height - gameStatus.playerHeight;
    const $enterprise = document.createElement('img');
    $enterprise.src = 'images/enterprise.png';
    $enterprise.classList.add('player');
    $gameArea.appendChild($enterprise);
    placeElement($enterprise, gameStatus.playerX, gameStatus.playerY);
    window.requestAnimationFrame(update);
}

function handleMovement(){
    if (gameStatus.keyLeft){
        gameStatus.playerX -= speed;
        if(gameStatus.playerX < gameStatus.playerWidth){
            gameStatus.playerX = gameStatus.playerWidth;
        }
    }
    else if (gameStatus.keyRight){
        gameStatus.playerX += speed;
        if(gameStatus.playerX > width - gameStatus.playerWidth){
            gameStatus.playerX = width - gameStatus.playerWidth;
        }
    }
    if(gameStatus.spaceBar){
        createLasers(gameStatus.playerX);
    }
}

function moveLasers(){
    const $lasers = document.querySelectorAll('.laser');
    $lasers.forEach(laser => placeElement(laser, laser.x, laser.y - speed));
}

function placeElement($element, x, y){
    $element.style.transform = `translate(${x}px, ${y}px)`;
}

function update(){
    const $enterprise = document.querySelector('.player');
    handleMovement();
    placeElement($enterprise, gameStatus.playerX, gameStatus.playerY);
    moveLasers();  
    window.requestAnimationFrame(update);
}

createPlayer();

window.addEventListener('keydown', buttonPressed);
window.addEventListener('keyup', buttonReleased);