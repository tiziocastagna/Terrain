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
        if(showMap) {
            render();
            drawMap();
        }
    }
}

function humidityButtonClick() {
    showTemperature = false;
    showHeight = false;
    if(showHumidity) {
        showHumidity = false;
    } else {
        showHumidity = true;
        if(showMap) {
            render();
            drawMap();
        }
    }
}

function heightButtonClick() {
    showTemperature = false;
    showHumidity = false;
    if(showHeight) {
        showHeight = false;
    } else {
        showHeight = true;
        if(showHeight) {
            render();
            drawMap();
        }
    }}

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

function drawMap() {
    const imageData = ctx.getImageData(0, 0, mapWidth, mapHeight);
    const pixels = imageData.data;
    let globalIndex = 0;
    for(let i = 0; i < mapHeight; i++) {
        for(let j = 0; j < mapWidth; j++) {
            const tile = getTile(j, i);
            let color;
            if(showTemperature) {
                const gray = (tile.temperature + 1) * 255 / 2;
                color = [gray, gray, gray, 255];
            } else if(showHumidity) {
                const gray = (tile.humidity + 1) * 255 / 2;
                color = [gray, gray, gray, 255];
            } else if(showHeight) {
                const gray = (tile.height + 1) * 255 / 2;
                color = [gray, gray, gray, 255];
            } else if(Math.abs(j - playerX) < 5 && Math.abs(i - playerY) < 5) {
                color = [255, 0, 0, 255];
            } else {
                const biome = tile.biome;
                color = biomeToColor(biome);
            }
            pixels[globalIndex * 4] = color[0];
            pixels[globalIndex * 4 + 1] = color[1];
            pixels[globalIndex * 4 + 2] = color[2];
            pixels[globalIndex * 4 + 3] = color[3];
            globalIndex++;
        }
    }
    ctx.putImageData(imageData, 0, 0);
}

function inputXchange() {
    if(!inputX) {
        inputX = document.getElementById("inputX");
    }
    playerX = inputX.value;
    render();
}

function inputYchange() {
    if(!inputY) {
        inputY = document.getElementById("inputY");
    }
    playerY = inputY.value;
    render();
}