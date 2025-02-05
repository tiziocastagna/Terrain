const worldScale = 10;

const heightFrequencyVector = [16, 4];
const heightAmplitudeVector = [0.4, 0.6];
const perlinHeight = new PerlinNoise();
function getHeight(x, y) {
    let height = 0;
    for(let i = 0; i < 2; i++) {
        const frequency = heightFrequencyVector[i] * worldScale;
        height += perlinHeight.noise(x / frequency, y / frequency) * heightAmplitudeVector[i];
    }
    const frequency = 5 * worldScale;
    height *= (perlinHeight.noise(x / frequency, y / frequency) + 1.5) / 4;
    return height;
}

const temperatureScale = 5;
const perlinTemperature = new PerlinNoise();
const humidityScale = 5;
const perlinHumidity = new PerlinNoise();
function getBiome(temperature, humidity, height) {
    if(height > 0.1) {
        if(temperature > 0.3 && humidity < -0.1) {
            return 'desert-mountain'
        }
        return 'mountain';
    } else if(height < -0.1) {
        return 'ocean';
    } else if(temperature > 0.3 && humidity < -0.1) {
        return 'desert';
    } else if(temperature > 0.1 && humidity > 0.1) {
        return 'dry-plains';
    } else if(humidity > 0) {
        return 'forest';
    } else {
        return 'plains';
    }
}

function generateTile(x, y) {
    const temperatureFrequency = temperatureScale * worldScale;
    const temperature = perlinTemperature.noise(x / temperatureFrequency, y / temperatureFrequency);
    const humidityFrequency = humidityScale * worldScale;
    const humidity = perlinHumidity.noise(x / humidityFrequency, y / humidityFrequency);
    const height = getHeight(x, y);

    const isOrigin = x === 0 && y === 0;
    const biome = getBiome(temperature, humidity, height);
    const rand = Math.random();
    switch(biome) {
        case 'forest':
            if(rand < 0.05 && !isOrigin) {
                return new Tree(x, y, temperature, humidity, height, 'forest');
            }
            return new Grass(x, y, temperature, humidity, height, 'forest');
        case 'plains':
            if(rand < 0.05) {
                return new Tall_grass(x, y, temperature, humidity, height, 'plains');
            }
            return new Grass(x, y, temperature, humidity, height, 'plains');
        case 'ocean':
            return new Ocean(x, y, temperature, humidity, height, 'ocean');
        case 'desert':
            if(rand < 0.05) {
                return new Cactus(x, y, temperature, humidity, height, 'desert');
            }
            return new Sand(x, y, temperature, humidity, height, 'desert');
        case 'mountain':
            return new Stone(x, y, temperature, humidity, height, 'mountain');
        case 'desert-mountain':
            return new Stone_sand(x, y, temperature, humidity, height, 'desert-mountain');
        case 'dry-plains':
            if(rand < 0.05) {
                return new Hey(x, y, temperature, humidity, height, 'dry-plains');
            }
            return new Dry_grass(x, y, temperature, humidity, height, 'dry-plains');
    }
}