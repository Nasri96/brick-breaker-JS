export default class Projectile {
    constructor(game, position) {
        this.game = game;

        this.width = 10;
        this.height = 30;
        this.image = document.querySelector("#projectile");

        this.position = position;
        this.speed = { x: 0, y: 12 }
        this.health = 1;
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.position.y -= this.speed.y;
    }
}