let noClip = false;
let showHumidity = false;
let showTemperature = false;
let showHeight = false;
let showMap = false;

const mapWidth = 400;
const mapHeight = 400;
let ctx;
let map;

let inputX;
let inputY;

function enableDebug() {
    const debug = document.getElementById('debug');
    debug.style.display = 'grid';
}

function temperatureButtonClick() {
    showHumidity = false;
    showHeight = false;
    if(showTemperature) {
        showTemperature = false;
    } else {
        showTemperature = true;
    }
    if(showMap) {
        render();
        drawMap();
    }
}

function humidityButtonClick() {
    showTemperature = false;
    showHeight = false;
    if(showHumidity) {
        showHumidity = false;
    } else {
        showHumidity = true;
    }
    if(showMap) {
        render();
        drawMap();
    }
}

function heightButtonClick() {
    showTemperature = false;
    showHumidity = false;
    if(showHeight) {
        showHeight = false;
    } else {
        showHeight = true;
    }
    if(showMap) {
        render();
        drawMap();
    }
}

function noClipButtonClick() {
    noClip ? noClip = false : noClip = true;
}

function mapButtonClick() {
    showMap ? disableMap() : enableMap();
}

function enableMap() {
    if(!map) {
        map = document.getElementById('map');
        ctx = map.getContext('2d');
        map.width = mapWidth;
        map.height = mapHeight;
        map.addEventListener('click', event => mapClick(event));
    }
    map.style.display = 'block';
    drawMap();
    showMap = true;
}

function disableMap() {
    map.style.display = 'none';
    showMap = false;
}

function biomeToColor(biome) {
    switch(biome) {
        case 'plains':
            return [24, 139, 34, 255];
        case 'forest':
            return [0, 100, 0, 255];
        case 'ocean':
            return [30, 144, 255, 255];
        case 'desert':
            return [218, 165, 32, 255];
        case 'mountain':
            return [128, 128, 128, 255];
        case 'desert-mountain':
            return [139, 69, 19, 255];
        case 'dry-plains':
            return [181, 163, 77, 255];
    }
}

function getMapPixelColor(x, y) {
    const tile = getTile(y, x);
    if(showTemperature) {
        const gray = (tile.temperature + 1) * 255 / 2;
        return [gray, gray, gray, 255];
    } else if(showHumidity) {
        const gray = (tile.humidity + 1) * 255 / 2;
        return [gray, gray, gray, 255];
    } else if(showHeight) {
        const gray = (tile.height + 1) * 255 / 2;
        return[gray, gray, gray, 255];
    } else if(Math.abs(y - playerX) < 5 && Math.abs(x - playerY) < 5) {
        return[255, 0, 0, 255];
    } else {
        const biome = tile.biome;
        return biomeToColor(biome);
    }
}

function drawMap() {
    const imageData = ctx.getImageData(0, 0, mapWidth, mapHeight);
    const pixels = imageData.data;
    let globalIndex = 0;
    for(let i = 0; i < mapHeight; i++) {
        for(let j = 0; j < mapWidth; j++) {
            const color = getMapPixelColor(i, j);
            pixels[globalIndex * 4] = color[0];
            pixels[globalIndex * 4 + 1] = color[1];
            pixels[globalIndex * 4 + 2] = color[2];
            pixels[globalIndex * 4 + 3] = color[3];
            globalIndex++;
        }
    }
    ctx.putImageData(imageData, 0, 0);
}

function  mapClick(event) {
    const rect = map.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    tp(playerX, playerY, Math.floor(x), Math.floor(y));
    update();
}

function updateMapPartial(x, y, radius) {
    const imageData = ctx.getImageData(0, 0, mapWidth, mapHeight);
    const pixels = imageData.data;
    const leftSide = Math.max(x - radius, 0);
    const rightSide = Math.min(x + radius, mapWidth);
    const topSide = Math.max(y - radius, 0);
    const bottomSide = Math.min(y + radius, mapHeight);
    for(let i = topSide; i < bottomSide; i++) {
        for(let j = leftSide; j < rightSide; j++) {
            const color = getMapPixelColor(i, j);
            const index = i * mapWidth + j;
            pixels[index * 4] = color[0];
            pixels[index * 4 + 1] = color[1];
            pixels[index * 4 + 2] = color[2];
            pixels[index * 4 + 3] = color[3];
        }
    }
    ctx.putImageData(imageData, 0, 0);
}

// takes new position
// TODO: could be more efficent, but, on the other hand, it is a fucking debug toll
function simpleMoveMapUpdate(x, y) {
    updateMapPartial(x, y, 6);
}

// teleport player from px, py to x, y
function tp(px, py, x, y) {
    playerX = x;
    playerY = y;
    update();

    // only debug-mode
    if(showMap) {
        updateMapPartial(px, py, 5);
        updateMapPartial(x, y, 5);
    }
}

function teleportButtonClick() {
    if(!inputX) {
        inputX = document.getElementById("inputX");
    }
    if(!inputY) {
        inputY = document.getElementById("inputY");
    }
    tp(playerX, playerY, parseInt(inputX.value || 0), parseInt(inputY.value || 0));
    render();
}