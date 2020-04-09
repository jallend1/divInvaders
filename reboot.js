const gameArea = document.querySelector('#gamearea');
const resultDisplay = document.querySelector('#score');
const gameDimensions = 15;

let width = 15;
let currentShooterIndex = 202;
let currentInvaderIndex = 0;
let alienInvadersTakenDown = [];
let result = 0;
let direction = 1;
let invaderId;

const alienInvaders = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39 
];

function checkGameOver(){
    const cells = document.querySelectorAll('.cell');
    if(cells[currentShooterIndex].classList.contains('invader', 'shooter')){
        resultDisplay.textContent = 'Game Over';
        cells[currentShooterIndex].classList.add('boom');
        clearInterval(invaderId);
    }
    for(let i = 0; i <= alienInvaders.length - 1; i++){
        if(alienInvaders[i] > cells.length - (width - 1)){
            resultDisplay.textContent = 'Game Over';
            clearInterval(invaderId);
        }
    }
    if(alienInvadersTakenDown.length === alienInvaders.length){
        resultDisplay.textContent = 'You Win!'
        clearInterval(invaderId);
    }
}

function createEnterprise(){
    const cells = document.querySelectorAll('.cell');
    cells[currentShooterIndex].classList.add('shooter');
}

function createRomulans(){
    const cells = document.querySelectorAll('.cell');
    alienInvaders.forEach(invader => cells[invader + currentInvaderIndex].classList.add('invader'));

}

function firePhasers(e){
    let phaserId;
    let currentLaserIndex = currentShooterIndex;
    
    function movePhasers(){
        const cells = document.querySelectorAll('.cell');
        cells[currentLaserIndex].classList.remove('laser');
        currentLaserIndex -= width;
        cells[currentLaserIndex].classList.add('laser');
        if(cells[currentLaserIndex].classlist.contains('invader')){
            cells[currentLaserIndex].classList.remove('laser');
            cells[currentLaserIndex].classList.remove('invader');
            cells[currentLaserIndex].classList.add('boom');

            setTimeout(() => cells[currentLaserIndex].classList.remove('boom'), 250)
            clearInterval(phaserId);

            const alienTakenDown = alienInvaders.indexOf(currentLaserIndex);
            alienInvadersTakenDown.push(alienTakenDown);
            result++;
            resultDisplay.textContent = result;
        }
        if(currentLaserIndex < width){
            clearInterval(phaserId);
            setTimeout(() => cells[currentLaserIndex].classList.remove('laser'), 100);
        }    
    }
        if(e.keyCode === 32){
            phaserId = setInterval(movePhasers, 100);
        }
}

window.addEventListener('keyup', firePhasers)


function generateBoard(){
    for(let i = 0; i < (gameDimensions * gameDimensions); i++){
        const newCell = document.createElement('div');
        newCell.classList.add('cell');
        gameArea.appendChild(newCell);
    }
}

function moveEnterprise(e){
    const cells = document.querySelectorAll('.cell');
    cells[currentShooterIndex].classList.remove('shooter');
    if(e.keyCode === 37){
        if(currentShooterIndex % width !== 0){
            currentShooterIndex -= 1;
        }
    }
    else if(e.keyCode === 39){
        if(currentShooterIndex % width < width - 1){
                currentShooterIndex += 1;
            }
    }
    cells[currentShooterIndex].classList.add('shooter');
}

function moveRomulans(){
    const cells = document.querySelectorAll('.cell');
    const leftEdge = alienInvaders[0] % width === 0;
    const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1;
    
    if((leftEdge && direction === -1) || (rightEdge && direction === 1)){
        direction = width;
    } else if(direction === width){
        leftEdge ? direction = 1 : direction = -1;
    }
    for(let i = 0; i <= alienInvaders.length - 1; i++){                 // Clears existing Romulans
        cells[alienInvaders[i]].classList.remove('invader');
    }
    for(let i = 0; i <= alienInvaders.length - 1; i++){                 // Adds Romulans to new location
        alienInvaders[i] += direction;
        if(!alienInvadersTakenDown.includes(i)){
            cells[alienInvaders[i]].classList.add('invader');
        }
    }
    checkGameOver();
}





generateBoard();
createRomulans();
createEnterprise();

window.addEventListener('keydown', moveEnterprise);
invaderId = setInterval(moveRomulans, 500);