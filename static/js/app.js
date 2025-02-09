document.addEventListener('DOMContentLoaded', function() {
    // TODO: remove before shipping
    enableDebug();
    enableMap();
    
    const gridContainer = document.getElementById('game_grid');
    setUpWorld(gridContainer);
});

document.addEventListener('keydown', function(event) {
    if(event.key === 'w') {
        moveUp();
    } else if(event.key === 's') {
        moveDown();
    } else if(event.key === 'a') {
        moveLeft();
    } else if(event.key === 'd') {
        moveRight();
    }
});

document.addEventListener('click', click);

setInterval(tick, 100);  // 10 tk/s