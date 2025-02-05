const chunkSize = 9;
const chunks = [];

class Chunk {
    x;
    y;
    tiles = [];
    constructor(x, y) {
        this.x = x;
        this.y = y;
        for(let i = 0; i < chunkSize; i++) {
            const row = [];
            for(let j = 0; j < chunkSize; j++) {
                const tileX = x * chunkSize + i;
                const tileY = y * chunkSize + j;
                row.push(generateTile(tileX, tileY));
            }
            this.tiles.push(row);
        }
    }
}

function createTile(x, y) {
    const expectedChunkX = Math.floor(x / chunkSize);
    const expectedChunkY = Math.floor(y / chunkSize);
    for(let chunk of chunks) {
        if(chunk.x === expectedChunkX && chunk.y === expectedChunkY) {
            return;
        }
    }
    const newChunk = new Chunk(expectedChunkX, expectedChunkY);
    chunks.push(newChunk);
}

function getTile(x, y) {
    const expectedChunkX = Math.floor(x / chunkSize);
    const expectedChunkY = Math.floor(y / chunkSize);
    // negative modulos don't work like negative modulos because fuck you. This implementation corrects them
    const inChunkX = x >= 0 ? x % chunkSize : ((x % chunkSize) + chunkSize) % chunkSize;
    const inChunkY = y >= 0 ? y % chunkSize : ((y % chunkSize) + chunkSize) % chunkSize;
    for(let chunk of chunks) {
        if(chunk.x === expectedChunkX && chunk.y === expectedChunkY) {
            return chunk.tiles[inChunkX][inChunkY];
        }
    }
    const newChunk = new Chunk(expectedChunkX, expectedChunkY);
    chunks.push(newChunk);
    return newChunk.tiles[inChunkX][inChunkY];
}