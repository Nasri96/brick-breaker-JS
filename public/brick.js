import { collisionDetection, collisionDetectionSpecial } from "./collisionDetection.js";

const POWER_ACTIVES = {
    NONE: 0,
    POWERBOTTOMWALL: 1,
    POWERPADDLEFIRE: 2
}

export default class Brick {
    constructor(game, position, image, health) {
        this.width = (game.gameWidth / 10) - 1;
        this.height = 40;

        this.game = game;
        this.position = position;
        this.image = image;
        this.health = health;
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.game.balls.forEach(ball => {
            if(collisionDetection(ball, this)) {
                ball.sound.play();
                ball.speed.y = -ball.speed.y;
                this.health--;
                this.image = document.querySelector(`#brick-health-${this.health}`);
            }
        });

        if(this.game.powerUp.active === POWER_ACTIVES.POWERPADDLEFIRE && this.game.projectiles.length > 0) {
            this.game.projectiles.forEach((projectile) => {
                if(collisionDetectionSpecial(projectile, this)) {
                    projectile.health--;
                    this.health--;
                    this.image = document.querySelector(`#brick-health-${this.health}`);
                }
            });
        }
    }
}