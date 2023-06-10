export class Pixel {

    x;
    y;
    node;

    constructor(node, x, y) {
        this.node = node;
        this.x = x;
        this.y = y;
    }

    isSnake() {
        this.node.classList.add('active');
    }

    removeTail() {
        this.node.classList.remove('active');
    }

    addFood() {
        this.node.classList.add('food', 'active');
    }

    removeFood() {
        this.node.classList.remove('food');
    }

    isFood() {
        return this.node.classList.contains('food');
    }
}