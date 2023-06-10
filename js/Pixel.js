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
        const rnd = Math.floor(Math.random() * 3);
        let cat;
        switch (rnd) {
            case 0:
                cat = 'summer';
                break;
            case 1:
                cat = 'shazam';
                break;
            case 2:
                cat = 'hiro';
                break;
        }
        this.node.innerHTML = `<img src="/img/${cat}.png" alt="${cat}">`;
    }

    removeFood() {
        this.node.classList.remove('food');
        this.node.innerHTML = ``;
    }

    isSnake() {
        return this.node.classList.contains('snake');
    }

    isFood() {
        return this.node.classList.contains('food');
    }

    clearAll() {
        this.node.className = 'pixel';
        this.node.innerHTML = ``;
    }

    isHead() {
        let player = 'carlo';
        this.node.innerHTML = `<img src="/img/${player}.png" alt="${player}">`;
    }

    removeHead() {
        this.node.innerHTML = '';
    }
}