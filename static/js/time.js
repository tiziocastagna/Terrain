function tick() {
    if(moveCooldown != 0) {
        moveCooldown--;
    }
    updateWeather();
}