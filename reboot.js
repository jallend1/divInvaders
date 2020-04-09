const gameArea = document.querySelector('#gamearea');
const gameSize = 15;
const cells = generateBoard();
let playerPosition = 202;
let direction = 1;
const aliens = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
                15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
                30, 31, 32, 33, 34, 35, 36, 37, 38, 39];
const lasers = [];



function gameOver(){
    cells.forEach(cell => {
        if(cell.classList.contains('player') && cell.classList.contains('alien')){              // Ends game if player and aliens collide
            console.log('LOSER');
            clearInterval(gameProgress);
        }
    })
    aliens.forEach(alien => {
        if(alien > (gameSize * gameSize) - (gameSize * 2)){
            console.log('LOSER AGAIN');
            clearInterval(gameProgress);
        }
    })
}

function generateBoard(){
    for(let i = 0; i < gameSize * gameSize; i++){
        const newDiv = document.createElement('div');
        newDiv.classList.add('cell');
        gameArea.appendChild(newDiv);
    }
    return document.querySelectorAll('.cell');
}

function generateAliens(){
    aliens.forEach(alien => {
        cells[alien].classList.add('alien')
    });
}

function init(){
    cells[playerPosition].classList.add('player');
    generateAliens();
}

function moveAliens(){
    aliens.forEach(alien => cells[alien].classList.remove('alien'))     // Clears alien classlist
    if((aliens[aliens.length - 1] + 1) % gameSize !== 0 && direction === 1){    //Advance aliens if they aren't on the right edge
        for(let i = 0; i < aliens.length; i++){
            aliens[i] += direction;
        }
    }
    else if((aliens[0] % gameSize !== 0 && direction === -1)){                    // Move aliens left if they aren't on edge
        for(let i = 0; i < aliens.length; i++){
            aliens[i] += direction;
        }
    }else{
        for(let i = 0; i < aliens.length; i++){
            aliens[i] += gameSize;
        }
        direction = direction * -1;
        
    }
    generateAliens();
}

function movePlayer(e){
    if(e.keyCode === 37 && playerPosition % gameSize !== 0){            // If left arrow pressed and not on left edge, move left
            cells[playerPosition].classList.remove('player');               // Removes styling for previous square
            playerPosition--;
            cells[playerPosition].classList.add('player');                  // Adds player styling to current square
    }
    else if(e.keyCode === 39 && (playerPosition + 1) % gameSize !== 0){
        cells[playerPosition].classList.remove('player');
        playerPosition++;
        cells[playerPosition].classList.add('player');
    }
}

function update(){
    moveAliens();
    gameOver();
}

function updateLasers(){
    for(let i = 0; i < lasers.length; i++){
        cells[lasers[i]].classList.remove('laser');
        lasers[i] -= gameSize;
    }
    lasers.forEach((laser) => {
            cells[laser].classList.add('laser');
            cells[laser-gameSize].classList.remove('laser');
        })
}

init();

window.addEventListener('keydown', e => {
    if(e.keyCode === 37 || e.keyCode === 39){
        movePlayer(e);
    }
    else if(e.keyCode === 32){
        lasers.push(playerPosition);
        updateLasers();
    }
});

const gameProgress = setInterval(update, 500);