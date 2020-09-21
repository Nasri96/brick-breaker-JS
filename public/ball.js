import { collisionDetection } from "./collisionDetection.js";


const POWER_ACTIVES = {
    NONE: 0,
    POWERBOTTOMWALL: 1,
    POWERPADDLEFIRE: 2,
    POWERPADDLEWIDTH: 3,
    POWERBALLSIZE: 4
}

export default class Ball {
    constructor(game) {
        this.game = game;

        this.image = document.querySelector("#ball");
        this.size = 25;
        this.position = { x: game.gameWidth / 2 - this.size / 2, y: game.gameHeight / 2 };
        this.speed = { x: 0, y: 8 };
        this.sound = new Howl({
            src: ['./sfx/ball-impact.mp3']
        });
    }

    reset() {
        this.position = { x: this.game.gameWidth / 2 - this.size / 2, y: this.game.gameHeight / 2 };
        this.speed = { x: 0, y: 8 }; 
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);
    }

    update() {
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        // collision detection left and right wall
        if(this.position.y <= 0) {
            this.speed.y = -this.speed.y;
        }

        // collision detection bottom and top wall
        if(this.position.x + this.size >= this.game.gameWidth || this.position.x <= 0) {
            this.speed.x = -this.speed.x;
        }

        // check for powerbottom wall or lives
        if(this.position.y + this.size >= this.game.gameHeight) {
            if(this.game.powerUp.active === POWER_ACTIVES.POWERBOTTOMWALL) {
                this.speed.y = -this.speed.y;
            } else {
                // check for threeball power
                let index = this.game.balls.indexOf(this);
                let index2 = this.game.gameObjects.indexOf(this);
                if(this.game.balls.length > 1) {
                    this.game.balls.splice(index, 1);
                    this.game.gameObjects.splice(index2, 1);
                } else {
                    this.game.lives--;
                    this.game.paddle.reset();
                    this.reset();
                }
            }
        }

        // collision detection between paddle and ball
        if(collisionDetection(this, this.game.paddle)) {
            // more precise collision between paddle and ball
            if(this.position.x + this.size / 2 <= this.game.paddle.position.x + (this.game.paddle.width / 7)) {
                this.speed.x = -9;
            } else if(this.position.x + this.size / 2 <= this.game.paddle.position.x + (this.game.paddle.width / 7) * 2) {
                this.speed.x = -8;
            } else if(this.position.x + this.size / 2 <= this.game.paddle.position.x + (this.game.paddle.width / 7) * 3) {
                this.speed.x = -7;
            } else if(this.position.x + this.size / 2 <= this.game.paddle.position.x + (this.game.paddle.width / 7) * 4) {
                this.speed.x = 0;
            } else if(this.position.x + this.size / 2 <= this.game.paddle.position.x + (this.game.paddle.width / 7) * 5) {
                this.speed.x = 7;
            } else if(this.position.x + this.size / 2 <= this.game.paddle.position.x + (this.game.paddle.width / 7) * 6) {
                this.speed.x = 8;
            } else if(this.position.x + this.size / 2 <= this.game.paddle.position.x + (this.game.paddle.width / 7) * 7) {
                this.speed.x = 9;
            } 

            this.speed.y = -this.speed.y;
        }
    }
}