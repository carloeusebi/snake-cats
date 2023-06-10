import { pixels } from './main.js'

export class Snake {

    snake = [];
    hasEaten = false;

    constructor(newHead) {

        this.snake.push(pixels[newHead.x][newHead.y]);
        this.snake[0].addToSnake();

        // grow
        do {
            const snake = this;

            let x = snake.tail().x;
            let y = snake.tail().y;

            if (y === 49) y = -1;

            this.snake.push(pixels[x + 1][y]);
            snake.tail().addToSnake();
        } while (this.snake.length < 5);
    }


    tail() {
        return this.snake[this.snake.length - 1];
    }

    moveUp() {
        const snake = this.snake;

        let x = snake[0].x;
        let y = snake[0].y;

        if (x === 0) x = 50;

        const newPixel = pixels[x - 1][y];

        return newPixel;
    }


    moveRight() {
        const snake = this.snake;

        let x = snake[0].x;
        let y = snake[0].y;

        if (y === 49) y = -1;

        const newPixel = pixels[x][y + 1];

        return newPixel;
    }


    moveDown() {
        const snake = this.snake;

        let x = snake[0].x;
        let y = snake[0].y;

        if (x === 49) x = -1;

        const newPixel = pixels[x + 1][y];

        return newPixel;
    }


    moveLeft() {
        const snake = this.snake;

        let x = snake[0].x;
        let y = snake[0].y;

        if (y === 0) y = 50;

        const newPixel = pixels[x][y - 1];

        return newPixel;
    }

    move(newPixel) {
        const snake = this.snake;

        snake.unshift(newPixel);
        snake[0].addToSnake();

        if (!this.hasEaten) snake.pop().removeFromSnake();
        this.hasEaten = false;
    }

    eat() {
        this.hasEaten = true;
    }
}