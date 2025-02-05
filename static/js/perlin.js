// AI generated crap code
class PerlinNoise {
    constructor() {
        this.gradients = {}; // Store gradient vectors
        this.permutation = []; // Permutation table for randomness
        // Generate a random permutation table
        this.permutation = Array.from({ length: 256 }, () => Math.floor(Math.random() * 256));
        this.permutation = [...this.permutation, ...this.permutation]; // Repeat it to avoid wrapping
    }

    // Get a pseudo-random gradient vector for a given grid point
    getGradient(ix, iy) {
        const key = `${ix},${iy}`;
        if (!this.gradients[key]) {
        const angle = Math.random() * Math.PI * 2; // Random angle
        this.gradients[key] = [Math.cos(angle), Math.sin(angle)]; // Unit vector
        }
        return this.gradients[key];
    }

    // Dot product between gradient and distance vectors
    dotGridGradient(ix, iy, x, y) {
        const [gradX, gradY] = this.getGradient(ix, iy);
        const dx = x - ix; // Distance from grid point
        const dy = y - iy;
        return dx * gradX + dy * gradY;
    }

    // Smooth interpolation function
    fade(t) {
        return t * t * t * (t * (t * 6 - 15) + 10); // 6t^5 - 15t^4 + 10t^3
    }

    // Perlin noise at (x, y)
    noise(x, y) {
        // Determine grid cell coordinates
        const x0 = Math.floor(x);
        const x1 = x0 + 1;
        const y0 = Math.floor(y);
        const y1 = y0 + 1;

        // Calculate dot products at the corners
        const n0 = this.dotGridGradient(x0, y0, x, y);
        const n1 = this.dotGridGradient(x1, y0, x, y);
        const n2 = this.dotGridGradient(x0, y1, x, y);
        const n3 = this.dotGridGradient(x1, y1, x, y);

        // Interpolate along x for top and bottom edges
        const u = this.fade(x - x0); // Interpolation factor
        const nx0 = n0 + u * (n1 - n0);
        const nx1 = n2 + u * (n3 - n2);

        // Interpolate along y
        const v = this.fade(y - y0);
        const nxy = nx0 + v * (nx1 - nx0);

        return nxy; // Return final noise value
    }
}