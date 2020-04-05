// Romulan Warbird from : http://www.iconarchive.com/show/star-trek-ships-icons-by-iconfactory.html
// Enterprise from : http://icon-library.com/icon/star-trek-enterprise-icon-14.html

const gameArea = document.querySelector('#gamearea');
const enterprise = 'images/enterprise.png';
const warbird = 'images/warbird.png';
const warbirdFleet = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                    [12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
                    [24, 25, 26, 27, 28, 29, 30, 31, 32, 33]];
let fleetIndex = 0;
let entLocation = 197;
let direction = 1;


function buildBoard(){
    for(let i = 0; i < 204; i++){
        const newSpace = document.createElement('div');
        newSpace.classList.add('gamecell');
        // newSpace.textContent = i;   
        gameArea.appendChild(newSpace);
    }
    generateRomulans();
}

function generateEnterprise(){
    const board = document.querySelectorAll('#gamearea div');
    const ship = document.createElement('img');
    ship.setAttribute('src', enterprise);
    ship.classList.add('enterprise');
    board[entLocation].appendChild(ship);

}

function generateRomulans(){
    const fleetLocation = document.querySelectorAll('#gamearea div');
    warbirdFleet.forEach(rows => {   
        rows.forEach(row => {
            const newWarbird = document.createElement('img');
            newWarbird.setAttribute('src', warbird);
            fleetLocation[row + fleetIndex].appendChild(newWarbird);
            fleetLocation[row + fleetIndex].classList.add('warbird');
        });
    });
}

function clearRomulans(){
    const fleetLocation = document.querySelectorAll('#gamearea div');
    fleetLocation.forEach(cell => {
        if(cell.classList.contains('warbird')){
            cell.innerHTML = '';
            cell.classList.remove('warbird');
        }
    });
}

function moveRomulans(){
    fleetIndex += direction;
    warbirdFleet.forEach(rows => {
        rows.forEach(row => {
            
        })
    })
}

function gameTurn(){
    clearRomulans();
    moveRomulans();
}

buildBoard();
generateEnterprise();

// setInterval(gameTurn, 500);