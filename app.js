const gameArea = document.querySelector('#gamearea');
const gameSize = 15;
let playerPosition = Math.floor((gameSize * gameSize) - (gameSize / 2));
let playerDirection = 0;
let alienDirection = 1;
const aliens = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
                15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
                30, 31, 32, 33, 34, 35, 36, 37, 38, 39];
                
function checkPlayerBoundaries(){                                     // Keeps player on last row
    if(playerPosition > (gameSize * gameSize) - 1){
        playerPosition = (gameSize * gameSize) - 1;
    }
    else if(playerPosition < (gameSize * gameSize) - gameSize){
        playerPosition = (gameSize * gameSize) - gameSize;
    }
}

function determineDirection(){
    if(aliens.some(alien => (alien + 1) % gameSize === 0)){
        alienDirection = -1;
        for(let i = 0; i < aliens.length; i++){
            aliens[i] += gameSize;
        }
    }
    else if(aliens.some(alien => alien % gameSize === 0)){
        alienDirection = 1;
        for(let i = 0; i < aliens.length; i++){
            aliens[i] += gameSize;
        }
    }
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
    for(let i = 0; i < aliens.length; i++){
        aliens[i] += alienDirection;
    }
    aliens.forEach(alien => gameBoard[alien].classList.add('alien'));
    determineDirection();                                               // Makes sure aliens are inside game area
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
    positionPlayer()
    positionAliens();
    determineDirection();
}

generateBoard();
positionPlayer();
positionAliens();


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