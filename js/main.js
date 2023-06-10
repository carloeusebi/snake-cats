import { Pixel } from './Pixel.js';
import { Snake } from './Snake.js';

const playarea = document.getElementById('playarea');

const pixels = [];

let game;
let snake;
let direction = 'up';
let difficulty = 75;
let startingLength = 5;

export { pixels };

/* ------------------------------------------- */
/* ------ FUNCTIONS -------------------------- */
/* ------------------------------------------- */

const getRandomPixel = () => {
    const x = Math.floor(Math.random() * 50);
    const y = Math.floor(Math.random() * 50);

    return pixels[x][y];
}

const generateFood = () => {
    const pixel = getRandomPixel();
    pixel.addFood();
}

function gameOver() {
    clearInterval(game);
}

function gameplay() {
    let nextPixel;

    switch (direction) {
        case 'down':
            nextPixel = snake.lookDown();
            break;
        case 'left':
            nextPixel = snake.lookLeft();
            break;
        case 'right':
            nextPixel = snake.lookRight();
            break;
        default:
            nextPixel = snake.lookUp();
    }

    if (nextPixel.isFood()) {
        snake.eat();
        nextPixel.removeFood();
        generateFood();
    } else if (nextPixel.isSnake()) {
        gameOver();
    }

    snake.move();
}

function startGame() {

    clearInterval(game);

    for (let row of pixels) {
        for (let pixel of row) {
            pixel.clearAll();
        }
    }

    snake = null;
    direction = 'up';

    const head = getRandomPixel();
    snake = new Snake(head);
    snake.grow(startingLength);

    generateFood();

    game = setInterval(gameplay, difficulty)
}

/* ------------------------------------------- */
/* ------ MAIN ------------------------------- */
/* ------------------------------------------- */


for (let i = 0; i < 50; i++) {
    pixels[i] = [];
    for (let j = 0; j < 50; j++) {
        const pixelEelement = document.createElement('div');
        pixelEelement.className = 'pixel';
        playarea.appendChild(pixelEelement);

        const pixel = new Pixel(pixelEelement, i, j);

        pixels[i][j] = pixel;
    }
}

startGame();


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

window.addEventListener('keypress', (event) => {
    if (event.key === ' ') {
        gameOver();
        startGame();
    }
})