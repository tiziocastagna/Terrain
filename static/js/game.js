let playerX = 0;
let playerY = 0;
let northNeighbor;
let eastNeighbor;
let westNeighbor;
let southNeighbor;
let moveCooldown = 0;

function click() {
    if(northNeighbor.interactable) {
        northNeighbor.interact();
    } else if(eastNeighbor.interactable) {
        eastNeighbor.interact();
    } else if(westNeighbor.interactable) {
        westNeighbor.interact();
    } else if(southNeighbor.interactable) {
        southNeighbor.interact();
    }
}

function setUpWorld(gridContainer) {
    for(let i = 0; i < 9; i++) {
        for(let j = 0; j < 9; j++) {
            const visualSquare = document.createElement('div');
            visualSquares.push(visualSquare);
            gridContainer.appendChild(visualSquare);
            createTile(j - 4, i - 4);
        }
    }
    readyToRender = true;
    update();
}

function updateNeighbors() {
    northNeighbor = getTile(playerX, playerY - 1);
    eastNeighbor = getTile(playerX + 1, playerY);
    westNeighbor = getTile(playerX - 1, playerY);
    southNeighbor = getTile(playerX, playerY + 1);    
}

function update() {
    updateNeighbors();
    if(readyToRender === true) {
        render();
    }
}

function moveUp() {
    if((northNeighbor.walkable || noClip) && moveCooldown === 0) {
        playerY--;
        moveCooldown = 5;
        update();
    }
}

function moveDown() {
    if((southNeighbor.walkable || noClip) && moveCooldown === 0) {
        playerY++;
        moveCooldown = 5;
        update();
    }
}

function moveLeft() {
    if((westNeighbor.walkable || noClip) && moveCooldown === 0) {
        playerX--;
        moveCooldown = 5;
        update();
    }
}

function moveRight() {
    if((eastNeighbor.walkable || noClip) && moveCooldown === 0) {
        playerX++;
        moveCooldown = 5;
        update();
    }
}