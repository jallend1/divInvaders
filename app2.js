const gameArea = document.querySelector('#gamearea');
const boardSize = 204;
const width = boardSize / 17;
const romulanFleet = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let currentShift = 0;
let currentDirection = 1;

function generateBoard(){
    for(let i = 0; i < boardSize; i++){
        const newSpace = document.createElement('div');
        newSpace.classList.add('gamecell');
        newSpace.textContent = i;
        gameArea.appendChild(newSpace);
    }
}

function createRomulans(){
    const currentBoard = document.querySelectorAll('.gamecell');
    for(let i = 0; i < romulanFleet.length; i++){
        const newWarbird = document.createElement('img');
        newWarbird.setAttribute('src', 'images/warbird.png');
        currentBoard[romulanFleet[i]].appendChild(newWarbird);
        currentBoard[romulanFleet[i]].classList.add('romulan');
    }
}

function eraseRomulans(){
    const currentBoard = document.querySelectorAll('.gamecell');
    currentBoard.forEach(cell => {
        if(cell.classList.contains('romulan')){
            cell.innerHTML = ' ';
        }
        cell.classList.remove('romulan');
    })
}

function moveRomulans(){
    currentShift++;
    const currentBoard = document.querySelectorAll('.gamecell');
    if(((romulanFleet[romulanFleet.length - 1]) + currentShift) % width === 0 ){                                 // Reverses direction on hitting the edge of board
        currentDirection = currentDirection * -1;
        currentShift += 12;
    }
    for(let i = 0; i < romulanFleet.length; i++){
        const newWarbird = document.createElement('img');
        newWarbird.setAttribute('src', 'images/warbird.png');
        currentBoard[romulanFleet[i] + (currentShift * currentDirection)].appendChild(newWarbird);
        currentBoard[romulanFleet[i] + (currentShift * currentDirection)].classList.add('romulan');
    }
}

generateBoard();
createRomulans();

function turn(){
    eraseRomulans();
    moveRomulans();
}