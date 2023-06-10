import { Pixel } from './Pixel.js';
import { Snake } from './Snake.js';

const playarea = document.getElementById('playarea');
const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('high-score');
const playerSelector = document.getElementById('select-player');

const meow = new Audio('./assets/meow.wav');

const pixels = [];

let currentPlayer = 'carlo';
let game;
let snake;
let direction = 'up';
let currentScore = 0;
let highScore = 0;
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
    currentScore = 0;
}

function gameplay() {
    const updateScore = score => {
        scoreDisplay.innerText = score;
        if (score > highScore) {
            highScoreDisplay.innerText = highScore = score;
        }
    }

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
        meow.play();
        generateFood();
        currentScore++;
    } else if (nextPixel.isSnake()) {
        gameOver();
        return;
    }

    snake.move();
    updateScore(currentScore);
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
    snake = new Snake(head, currentPlayer);
    snake.grow(startingLength);

    generateFood();

    game = setInterval(gameplay, difficulty)
}

/* ------------------------------------------- */
/* ------ MAIN ------------------------------- */
/* ------------------------------------------- */

// Generate the playarea only once on page load
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

playerSelector.addEventListener('change', () => {
    currentPlayer = playerSelector.value.toLowerCase();
    gameOver();
    startGame();
})

// to prevent player to accidentaly trigger player change and gameover while pressing arrow keys while selectbox is selected
playerSelector.addEventListener('keydown', (event) => {
    event.preventDefault();
})