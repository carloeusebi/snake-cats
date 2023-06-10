import { Pixel } from './Pixel.js';
import { Snake } from './Snake.js';

const playarea = document.getElementById('playarea');

const pixels = [];
let direction = 'up';

export { pixels };

for (let i = 0; i < 50; i++) {
    pixels[i] = [];
    for (let j = 0; j < 50; j++) {
        const pixelEelement = document.createElement('div');
        pixelEelement.className = 'pixel';

        const pixel = new Pixel(pixelEelement, i, j);
        playarea.appendChild(pixelEelement);

        pixels[i][j] = pixel;
    }
}

const getRandomPixel = () => {
    const x = Math.floor(Math.random() * 50);
    const y = Math.floor(Math.random() * 50);

    return {
        x: x,
        y: y
    }
}

const generateFood = () => {
    const pixel = getRandomPixel();

    pixels[pixel.x][pixel.y].addFood();
}

const head = getRandomPixel();
const snake = new Snake(head);

generateFood();

const game = setInterval(() => {

    let newPixel;

    switch (direction) {
        case 'down':
            newPixel = snake.moveDown();
            break;
        case 'left':
            newPixel = snake.moveLeft();
            break;
        case 'right':
            newPixel = snake.moveRight();
            break;
        default:
            newPixel = snake.moveUp();
    }

    if (newPixel.isFood()) {
        newPixel.removeFood();
        snake.eat();
        generateFood();
    } else if (newPixel.isSnake()) {
        clearInterval(game);
    }

    snake.move(newPixel);
}, 75)

window.addEventListener('keydown', (event) => {

    switch (event.key) {
        case 'ArrowUp':
            if (direction === 'down') break;
            direction = 'up';
            break;
        case 'ArrowRight':
            if (direction === 'left') break;
            direction = 'right';
            break;
        case 'ArrowDown':
            if (direction === 'up') break;
            direction = 'down';
            break;
        case 'ArrowLeft':
            if (direction === 'right') break;
            direction = 'left';
            break;
    }
})