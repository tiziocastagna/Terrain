class Tile {
    x;
    y;
    walkable = true;
    interactable = false;
    temperature;
    humidity;
    height;
    biome;
    constructor(x, y, temperature, humidity, height, biome) {
        this.x = x;
        this.y = y;
        this.temperature = temperature;
        this.humidity = humidity;
        this.height = height;
        this.biome = biome;
    }
}

class Tree extends Tile {
    walkable = false;
    interactable = true;
    variants = 1;
    constructor(x, y, temperature, humidity, height, biome) {
        super(x, y, temperature, humidity, height, biome);
    }
    interact() {
        alert('you got one log');
    }
    render() {
        return 'url("../static/images/tree.png"), url("../static/images/grass.png")';
    }
}

class Grass extends Tile {
    variants = 1;
    constructor(x, y, temperature, humidity, height, biome) {
        super(x, y, temperature, humidity, height, biome);
    }
    render() {
        return 'url("../static/images/grass.png")';
    }
}

class Ocean extends Tile {
    walkable = false;
    variants = 1;
    constructor(x, y, temperature, humidity, height, biome) {
        super(x, y, temperature, humidity, height, biome);
    }
    render() {
        return 'url("../static/images/ocean.png")';
    }
}

class Sand extends Tile {
    variants = 1;
    constructor(x, y, temperature, humidity, height, biome) {
        super(x, y, temperature, humidity, height, biome);
    }
    render() {
        return 'url("../static/images/sand.png")';
    }
}

class Cactus extends Tile {
    walkable = false;
    variants = 1;
    constructor(x, y, temperature, humidity, height, biome) {
        super(x, y, temperature, humidity, height, biome);
    }
    render() {
        return 'url("../static/images/cactus.png"), url("../static/images/sand.png")';
    }
}

class Stone extends Tile {
    stoneVariants = 4;
    flowerVariants = 3;     // counting no-flower
    constructor(x, y, temperature, humidity, height, biome) {
        super(x, y, temperature, humidity, height, biome);
        const rand = Math.random();
        if(rand < 0.6) {
            this.stoneVariant = 0;
        } else if(rand < 0.8) {
            this.stoneVariant = 1;
        } else {
            this.stoneVariant = 2;
        }
        this.flowerVariant = Math.floor(Math.random() * this.flowerVariants);
    }
    render() {
        let texture = '';
        switch(this.flowerVariant) {
            case 1:
                texture += 'url("../static/images/stone_flower1.png"), ';
                break;
            case 2:
                texture += 'url("../static/images/stone_flower2.png"), ';
                break;
        }
        switch(this.stoneVariant) {
            case 0:
                texture += 'url("../static/images/stone.png")';
                break;
            case 1:
                texture += 'url("../static/images/stone2.png")';
                break;
            case 2:
                texture += 'url("../static/images/stone3.png")';
                break;
            case 3:
                texture += 'url("../static/images/stone4.png")';
                break;
        }
        return texture;
    }
}

class Stone_sand extends Tile {
    constructor(x, y, temperature, humidity, height, biome) {
        super(x, y, temperature, humidity, height, biome);
    }
    render() {
        return 'url("../static/images/stone_sand.png")';
    }
}

class Tall_grass extends Tile {
    constructor(x, y, temperature, humidity, height, biome) {
        super(x, y, temperature, humidity, height, biome);
    }
    render() {
        return 'url("../static/images/tall_grass.png"), url("../static/images/grass.png")';
    }
}

class Dry_grass extends Tile {
    constructor(x, y, temperature, humidity, height, biome) {
        super(x, y, temperature, humidity, height, biome);
    }
    render() {
        return 'url("../static/images/dry_grass.png")';
    }
}

class Hey extends Tile {
    constructor(x, y, temperature, humidity, height, biome) {
        super(x, y, temperature, humidity, height, biome);
    }
    render() {
        return 'url("../static/images/hey.png"), url("../static/images/dry_grass.png")';
    }
}