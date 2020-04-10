const gameArea = document.querySelector('#gamearea');
const scoreBox = document.querySelector('#score');
const gameStatus = document.querySelector('#gamestatus');
const gameSize = 15;
const cells = generateBoard();
let playerPosition = 202;
let direction = 1;
const aliens = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
                15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
                30, 31, 32, 33, 34, 35, 36, 37, 38, 39];
const lasers = [];
let score = 0;

function gameOver(){
    cells.forEach(cell => {
        if(cell.classList.contains('player') && cell.classList.contains('alien')){              // Ends game if player and aliens collide
            clearInterval(gameProgress);
            gameStatus.textContent = 'Game Over, Man.'
        }
    })
    aliens.forEach(alien => {
        if(alien > (gameSize * gameSize) - (gameSize * 2)){
            clearInterval(gameProgress);
            gameStatus.textContent = 'Game Over, Man.'
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
    aliens.forEach((alien, index) => {
        if(cells[alien].classList.contains('laser')){                                   // If the square with an alien also has a laser, boom
            cells[alien].classList.add('boom');
            aliens.splice(index, 1);                                                    // Removes this alien from the array
            setTimeout(() => cells[alien].classList.remove('boom'), 250)
        }else{
            cells[alien].classList.add('alien')
        }
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
    }else{                                                                      // If on an edge, moves them down a row and reverses direction
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
    updateLasers();
    scoreBox.textContent = score;
    gameOver();
}

function updateLasers(){
    cells.forEach((cell, index) => {
        if (cell.classList.contains('boom')){                   // If laser hits alien, adds to score and removes laser
            let explodedLaser = lasers.indexOf(index);
            lasers.splice(explodedLaser, 1);                        
            score++;
        }
    })
    cells.forEach(cell => cell.classList.remove('laser'));
    for(let i = 0; i < lasers.length; i++){
        lasers[i] -= gameSize;
    }
    lasers.forEach((laser, index) => {
        if(cells[laser]){                                       //If the cell exists
            cells[laser].classList.add('laser');
        }else{
            lasers.splice(index, 1);
        }        
    })
}

window.addEventListener('keydown', e => {
    if(e.keyCode === 37 || e.keyCode === 39){
        movePlayer(e);
    }
    else if(e.keyCode === 32){
        lasers.push(playerPosition);
        updateLasers();
    }
});

init();
const gameProgress = setInterval(update, 500);