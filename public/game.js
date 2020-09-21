import Paddle from "./paddle.js";
import Ball from "./ball.js";
import Brick from "./brick.js";
import Power from "./powerUp.js";
import Projectile from "./projectile.js";
import GameInfo from "./gameInfo.js";

import { buildLevel, level1, level2 } from "./level.js";

const GAME_STATE = {
    RUNNING: 0,
    PAUSED: 1,
    NEXTLEVEL: 2,
    COMPLETED: 3,
    GAMEOVER: 4,
    MAINMENU: 5
}

export default class Game {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.gameState = GAME_STATE.MAINMENU;
        this.currentLevel = 0;
        this.levels = [level1, level2];
        this.bricks = buildLevel(this, this.levels[this.currentLevel]);
        this.projectiles = [];
        this.lives = 10;

        this.ball = new Ball(this);
        this.balls = [this.ball];
        this.paddle = new Paddle(this);
        this.powerUp = new Power(this);
        this.gameInfo = new GameInfo(this);
        this.gameObjects = [this.paddle, this.powerUp, ...this.balls];
        this.gameObjects2 = [this.gameInfo];
    }

    nextLevel() {
        // load new level
        this.currentLevel++;
        this.bricks = buildLevel(this, this.levels[this.currentLevel]);
        // reset ball and paddle
        this.ball.reset();
        this.paddle.reset();
        // start rendering
        this.gameState = GAME_STATE.RUNNING;
    }

    draw(ctx, ctx2){
        this.bricks = this.bricks.filter((brick) => {
            return brick.health !== 0;
        });

        this.projectiles = this.projectiles.filter((projectile) => {
            return projectile.health !== 0;
        });

        [...this.bricks, ...this.gameObjects, ...this.projectiles].forEach(object => object.draw(ctx));

        if(this.gameState !== GAME_STATE.MAINMENU) {
            this.gameObjects2.forEach(object => object.draw(ctx2));
        }

        if(this.gameState === GAME_STATE.PAUSED) {

            ctx.fillStyle = "rgb(0, 0, 0, 0.8)";
            ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);
            ctx.font = "45px Do Hyeon";
            ctx.textAlign = "center";
            ctx.fillStyle = "white";
            ctx.fillText("Press ESC to continue", this.gameWidth / 2, this.gameHeight / 2);

        }

        if(this.gameState === GAME_STATE.NEXTLEVEL) {

            ctx.fillStyle = "rgb(0, 0, 0, 0.5)";
            ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);
            ctx.font = "45px Do Hyeon";
            ctx.textAlign = "center";
            ctx.fillStyle = "white";
            ctx.fillText(`Level ${this.currentLevel + 1} Completed. Press Spacebar to continue`, this.gameWidth / 2, this.gameHeight / 2);

        } else if(this.gameState === GAME_STATE.COMPLETED) {

            ctx.fillStyle = "rgb(0, 0, 0, 0.5)";
            ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);
            ctx.font = "45px Do Hyeon";
            ctx.textAlign = "center";
            ctx.fillStyle = "white";
            ctx.fillText("Good Job. U have completed the game! Reload page to Play Again", this.gameWidth / 2, this.gameHeight / 2);

        }

        if(this.gameState === GAME_STATE.GAMEOVER) {
            ctx.fillStyle = "rgb(0, 0, 0, 0.5)";
            ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);
            ctx.font = "45px Do Hyeon";
            ctx.textAlign = "center";
            ctx.fillStyle = "white";
            ctx.fillText("Game Over", this.gameWidth / 2, this.gameHeight / 2);
        }

        if(this.gameState === GAME_STATE.MAINMENU) {

            ctx.fillStyle = "rgba(0, 0, 0, 1)";
            ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);
            ctx.textAlign = "center";
            ctx.fillStyle = "white";
            ctx.font = "65px Do Hyeon";
            ctx.fillText("Brick Breaker", this.gameWidth / 2, this.gameHeight / 4);
            ctx.font = "45px Do Hyeon";
            ctx.fillText("Play Game", this.gameWidth / 2, this.gameHeight / 2);

            let arrowRight = document.querySelector("#arrow-right");
            let arrowWidth = 55;
            let arrowHeight = 35;

            ctx.drawImage(arrowRight, this.gameWidth / 2 - arrowWidth * 3, this.gameHeight / 2 - arrowHeight + 5, arrowWidth, arrowHeight);

        }
    }

    update() {
        this.bricks = this.bricks.filter((brick) => {
            return brick.health !== 0;
        });

        this.projectiles = this.projectiles.filter((projectile) => {
            return projectile.health !== 0;
        });

        if(this.gameState === GAME_STATE.RUNNING) {

            [...this.bricks, ...this.gameObjects, ...this.projectiles].forEach(object => object.update());

        }

        if(this.gameState !== GAME_STATE.MAINMENU) {
            this.gameObjects2.forEach(object => object.update());
        }

        if(this.bricks.length === 0) {

            this.gameState = GAME_STATE.NEXTLEVEL;

        }

        if(this.currentLevel >= this.levels.length) {

            this.gameState = GAME_STATE.COMPLETED;

        }

        if(this.lives === 0) {
            clearTimeout(this.powerUp.power_timeoutInterval);
            clearInterval(this.powerUp.power_setInterval);
            this.gameState = GAME_STATE.GAMEOVER;
        } 

    }

    togglePause() {
        if(this.gameState === GAME_STATE.RUNNING) {

            this.gameState = GAME_STATE.PAUSED;

        } else if(this.gameState === GAME_STATE.PAUSED) {

            this.gameState = GAME_STATE.RUNNING;

        }
    }
}