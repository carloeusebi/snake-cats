export class Pixel {

    x;
    y;
    node;

    constructor(node, x, y) {
        this.node = node;
        this.x = x;
        this.y = y;
    }

    addToSnake() {
        this.node.classList.add('snake');
    }

    removeFromSnake() {
        this.node.classList.remove('snake');
    }

    addFood() {
        this.node.classList.add('food');
    }

    removeFood() {
        this.node.classList.remove('food');
    }

    isSnake() {
        return this.node.classList.contains('snake');
    }

    isFood() {
        return this.node.classList.contains('food');
    }

    clearAll() {
        this.node.className = 'pixel';
    }
}