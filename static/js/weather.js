const weatherCycleLength = 1000;
let weather = 'sunny';
let rainticks;

function addRain() {
    for(let i = 0; i < visualSquares.length; i++) {
        visualSquares[i].classList.add('rain');
    }
    rainticks = 0;
}

function removeRain() {
    for(let i = 0; i < visualSquares.length; i++) {
        visualSquares[i].classList.remove('rain');
    }
}

function updateWeather() {
    const humidity = getTile(playerX, playerY).humidity;
    const rand = Math.random();
    if(weather === 'sunny' && rand < humidity * 10 / weatherCycleLength) {
        addRain();
        weather = 'rainy';
    } else if(weather === 'rainy') {
        if(humidity < -0.5 || rainticks > weatherCycleLength) {
            removeRain();
            weather = 'sunny';
        } else {
            rainticks += 1 - humidity;
        }
    }
}