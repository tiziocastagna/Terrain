const visualSquares = [];
let cameraX = 0;
let cameraY = 0;
let readyToRender = false;

function updateCamera() {
    cameraX = playerX;
    cameraY = playerY;
}

function render() {
    updateCamera();
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const visualSquare = visualSquares[i * 9 + j];

            visualSquare.style.backgroundColor = 'white';
            visualSquare.style.backgroundImage = 'none';

            const isPlayer = i === 4 + playerX - cameraX && j === 4 + playerY - cameraY;
            if(isPlayer) {
                visualSquare.style.backgroundColor = 'red';
                continue;
            }

            const square = getTile(j + cameraX - 4, i + cameraY - 4);

            // debug settings
            if(showHumidity) {
                const gray = (square.humidity + 1) / 2 * 255;
                visualSquare.style.backgroundColor = `rgb(${gray}, ${gray}, ${gray})`;
                continue;
            }
            if(showTemperature) {
                const gray = (square.temperature + 1) / 2 * 255;
                visualSquare.style.backgroundColor = `rgb(${gray}, ${gray}, ${gray})`;
                continue;
            }
            if(showHeight) {
                const gray = (square.height + 1) / 2 * 255;
                visualSquare.style.backgroundColor = `rgb(${gray}, ${gray}, ${gray})`;
                continue;
            }
            
            visualSquare.style.backgroundImage = square.render();
        }
    }

    // the indicator on the map must change position
    if(showMap) {
        simpleMoveMapUpdate(playerX, playerY);
    }
}