const gameArea = document.querySelector('#gamearea');
const gameSize = 15;
let playerPosition = Math.floor((gameSize * gameSize) - (gameSize / 2));
let playerDirection = 0;
let alienDirection = 1;
let moveRight = true;
const aliens = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
                15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
                30, 31, 32, 33, 34, 35, 36, 37, 38, 39];
                
function checkAlienBoundaries(){
    if(alienDirection === 0){                                           // If this is the first time on this row, change the direction value
        moveRight ? alienDirection = 1 : alienDirection = -1;
        moveRight = !moveRight;
    }
    else if(aliens.some(alien => (alien + 1) % gameSize === 0)){        // If the next turn moves them to a different row
        moveRight = false;
        alienDirection = 0;                                             // Transitory status of 0, so aliens ONLY move down this cycle
        for(let i = 0; i < aliens.length; i++){                         // Move ALL aliens down a row
            aliens[i] += gameSize;
        }
    }
    else if(aliens.some(alien => alien % gameSize === 0)                 // If any of the aliens on are on the left edge
        && aliens.every(alien => alien > 0)){                           // AND it isn't the starting frame
            alienDirection = 0;                                         // Transitory status of 0, so aliens ONLY move down this cycle
            moveRight = true;
            for(let i = 0; i < aliens.length; i++){                     // Move all aliens down a row
                aliens[i] += gameSize;
            }
        }
}

function checkPlayerBoundaries(){                                     // Keeps player on last row
    if(playerPosition > (gameSize * gameSize) - 1){
        playerPosition = (gameSize * gameSize) - 1;
    }
    else if(playerPosition < (gameSize * gameSize) - gameSize){
        playerPosition = (gameSize * gameSize) - gameSize;
    }
}

function gameOver(){
    console.log('Game over man');
    clearInterval(eachTurn);
}

function generateBoard(){                                       // Generates divs inside of game area
    for(let i = 0; i < (gameSize * gameSize); i++){
        const newDiv = document.createElement('div');
        newDiv.className = 'cell';
        newDiv.textContent = i;
        gameArea.appendChild(newDiv);
    }
}

function positionAliens(){
    const gameBoard = document.querySelectorAll('.cell');
    gameBoard.forEach(cell => cell.classList.remove('alien'));          // Removes previous alien locations
    checkAlienBoundaries();
    for(let i = 0; i < aliens.length; i++){                             // Moves all aliens the desired direction
        aliens[i] += alienDirection;
    }
    aliens.forEach(alien => gameBoard[alien].classList.add('alien'));
}

function positionPlayer(){
    const gameBoard = document.querySelectorAll('.cell');
    gameBoard[playerPosition].classList.remove('player');
    playerPosition += playerDirection;                                
    checkPlayerBoundaries();
    gameBoard[playerPosition].classList.add('player');
    playerDirection = 0;
}

function gameTurn(){
    positionPlayer();
    positionAliens();
    if(aliens.some(alien => alien >= gameSize * gameSize - gameSize)){
        gameOver();
    }
}

function init(){
    generateBoard();
    positionPlayer();
    const gameBoard  = document.querySelectorAll('.cell');
    aliens.forEach(alien => gameBoard[alien].classList.add('alien'));
}

init();

const eachTurn = setInterval(gameTurn, 500);

window.addEventListener('keydown', e => {
    if(e.keyCode === 37){
        playerDirection = -1;
        positionPlayer();
    } 
    if(e.keyCode === 39){
        playerDirection = 1;
        positionPlayer();
    }
});