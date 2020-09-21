export default class Paddle {
    constructor(game) {
        this.game = game;
        this.width = 200,
        this.height = 35,
        this.position = { x: game.gameWidth / 2 - this.width / 2, y: game.gameHeight - this.height - 10 },
        this.speed = 0,
        this.images = {
            base: [
                document.querySelector("#paddle-base-1"),
                document.querySelector("#paddle-base-2"),
                document.querySelector("#paddle-base-3")
            ],
            fireMode: [
                document.querySelector("#paddle-fire-mode-1"),
                document.querySelector("#paddle-fire-mode-2"),
                document.querySelector("#paddle-fire-mode-3")
            ],
            wallMode: [
                document.querySelector("#paddle-wall-mode"),
                document.querySelector("#paddle-wall-mode"),
                document.querySelector("#paddle-wall-mode")
            ],
            widthMode: [
                document.querySelector("#paddle-width-mode"),
                document.querySelector("#paddle-width-mode"),
                document.querySelector("#paddle-width-mode")
            ],
            fireballMode: [
                document.querySelector("#paddle-fireball-mode"),
                document.querySelector("#paddle-fireball-mode"),
                document.querySelector("#paddle-fireball-mode")
            ],
            threeballMode: [
                document.querySelector("#paddle-threeball-mode"),
                document.querySelector("#paddle-threeball-mode"),
                document.querySelector("#paddle-threeball-mode")
            ]
        }
        this.currentImage = 0;
    }

    draw(ctx) {
        if(this.game.powerUp.active === 5) {
            ctx.drawImage(this.images.threeballMode[this.currentImage], this.position.x, this.position.y, this.width, this.height);
        }
        if(this.game.powerUp.active === 4) {
            ctx.drawImage(this.images.fireballMode[this.currentImage], this.position.x, this.position.y, this.width, this.height);
        }
        if(this.game.powerUp.active === 3) {
            ctx.drawImage(this.images.widthMode[this.currentImage], this.position.x, this.position.y, this.width, this.height);
        }
        if(this.game.powerUp.active === 2) {
            ctx.drawImage(this.images.fireMode[this.currentImage], this.position.x, this.position.y, this.width, this.height);
        }
        if(this.game.powerUp.active === 1) {
            ctx.drawImage(this.images.wallMode[this.currentImage], this.position.x, this.position.y, this.width, this.height);
        }
        if(this.game.powerUp.active === 0) {
            ctx.drawImage(this.images.base[this.currentImage], this.position.x, this.position.y, this.width, this.height);
        }
    }

    update() {
        this.position.x += this.speed;

        if(this.position.x + this.width > this.game.gameWidth) {
            this.position.x = this.game.gameWidth - this.width;
        } 

        if(this.position.x < 0) {
            this.position.x = 0;
        }

        setInterval(() => {
            this.currentImage ++;
            if(this.currentImage === 2) {
                this.currentImage = 0;
            }
        }, 1000/60)
    }

    moveRight() {
        this.speed = 12;
    }

    moveLeft() {
        this.speed = -12;
    }

    stop() {
        this.speed = 0;
    }

    reset() {
        this.position = { x: this.game.gameWidth / 2 - this.width / 2, y: this.game.gameHeight - this.height - 10 };
    }
}