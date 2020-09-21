import Projectile from "./projectile.js";

import { collisionDetection, collisionDetectionSpecial } from "./collisionDetection.js";
import Ball from "./ball.js";

const POWER_ACTIVES = {
    NONE: 0,
    POWERBOTTOMWALL: 1,
    POWERPADDLEFIRE: 2,
    POWERPADDLEWIDTH: 3,
    POWERBALLSIZE: 4,
    POWERTHREEBALLS: 5
}

const GAME_STATE = {
    RUNNING: 0,
    PAUSED: 1,
    NEXTLEVEL: 2,
    COMPLETED: 3,
    GAMEOVER: 4
}

export default class Power {
    constructor(game) {
        this.game = game;

        this.image = document.querySelector("#powerUp");
        this.width = 75;
        this.height = 75;
        this.position = this.spawnPosition();
        this.timeFrames = {
            tenSeconds: 600,
            twentySeconds: 1200,
        }
        this.frames = 0;
        this.active = POWER_ACTIVES.NONE;
        this.power_timeoutInterval = undefined;
        this.power_timeoutIntervalElapsed = 10;
        this.power_setInterval = undefined;
        this.paused = false;
    }

    draw(ctx) {
        // draw power up for 10 seconds
        if(this.frames > 0 && this.frames < this.timeFrames.tenSeconds) {
            ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
        } else if(this.frames === this.timeFrames.tenSeconds) {
            this.position = this.spawnPosition();
            this.frames = -this.timeFrames.tenSeconds;
        }

        if(this.game.gameState === GAME_STATE.RUNNING) {
            // draw bottom wall if active
            if(this.active === POWER_ACTIVES.POWERBOTTOMWALL) {
                ctx.fillStyle = "#000000";
                ctx.fillRect(0, this.game.gameHeight - 10, this.game.gameWidth, 10);
            }
            this.frames++;
        }

    }

    update() {
        if(this.game.gameState === GAME_STATE.RUNNING) {
            if(this.frames > 0 && this.frames < this.timeFrames.tenSeconds) {
                // collision detection with ball
                this.game.balls.forEach((ball) => {
                    if(collisionDetection(ball,this)) {
                        this.power_timeoutIntervalElapsed = 10;
                        clearTimeout(this.power_timeoutInterval);
                        clearInterval(this.power_setInterval);
                        this.pickUpPower()();
                    }
                })
            }
        }
    }

    // pick up random power, reset frames, create new pos for next powerup
    pickUpPower() {
        let random = Math.floor(Math.random() * 5);
        // for testing only
        let num = 4;

        switch(random) {
            case 0: 
                return function() {
                    this.powerPaddleWidth(this.power_timeoutIntervalElapsed * 1000);

                    this.frames = - this.timeFrames.twentySeconds;
                    this.position = this.spawnPosition();
                }.bind(this);

            case 1:
                return function() {
                    this.powerBallSize(this.power_timeoutIntervalElapsed * 1000);

                    this.frames = - this.timeFrames.twentySeconds;
                    this.position = this.spawnPosition();
                }.bind(this);

            case 2:
                return function() {
                    this.powerBottomWall(this.power_timeoutIntervalElapsed * 1000);

                    this.frames = - this.timeFrames.twentySeconds;
                    this.position = this.spawnPosition();
                }.bind(this);

            case 3:
                return function() {
                    this.powerPaddleFire(this.power_timeoutIntervalElapsed * 1000);

                    this.frames = - this.timeFrames.twentySeconds;
                    this.position = this.spawnPosition();
                }.bind(this);
            case 4: 
                return function() {
                    this.powerThreeBalls(this.power_timeoutIntervalElapsed * 1000);

                    this.frames = - this.timeFrames.twentySeconds;
                    this.position = this.spawnPosition();
                }.bind(this);
        }
    }

    spawnPosition() {
        let x = Math.floor(Math.random() * (this.game.gameWidth - this.width));
        let y = Math.floor(Math.random() * (this.game.gameHeight - this.height * 5) + this.game.bricks[this.game.bricks.length - 1].position.y + this.height);

        return { x: x, y: y }
    }

    powerPaddleWidth(durationMS) {
        if(this.active === POWER_ACTIVES.NONE) {
            this.game.paddle.width *= 1.5;
        }
        this.active = POWER_ACTIVES.POWERPADDLEWIDTH;

        this.setupIntervals(durationMS);
    }

    powerPaddleFire(durationMS) {
        this.active = POWER_ACTIVES.POWERPADDLEFIRE;

        this.setupIntervals(durationMS);
    }

    powerBallSize(durationMS) {
        if(this.active === POWER_ACTIVES.NONE) {
            this.game.ball.size *= 1.5;
        }
        this.active = POWER_ACTIVES.POWERBALLSIZE;

        this.setupIntervals(durationMS);
    }

    powerBottomWall(durationMS) {
        this.active = POWER_ACTIVES.POWERBOTTOMWALL;

        this.setupIntervals(durationMS);
    }

    powerThreeBalls(durationMS) {
        if(this.active === POWER_ACTIVES.NONE) {
            this.game.ball2 = new Ball(this.game);
            this.game.balls.push(this.game.ball2);
            this.game.gameObjects.push(this.game.ball2);
            setTimeout(() => {
                this.game.ball3 = new Ball(this.game);
                this.game.balls.push(this.game.ball3);
                this.game.gameObjects.push(this.game.ball3);
            }, 300)
        }
        this.active = POWER_ACTIVES.POWERTHREEBALLS;

        this.setupIntervals(durationMS);
    }

    pauseInterval() {

        this.paused = true;

        clearTimeout(this.power_timeoutInterval);
        clearInterval(this.power_setInterval);
    }

    resumeInterval(durationMS) {

        this.paused = false;

        if(this.active === POWER_ACTIVES.POWERBOTTOMWALL) {
            this.powerBottomWall(durationMS);
        } else if(this.active === POWER_ACTIVES.POWERPADDLEFIRE) {
            this.powerPaddleFire(durationMS);
        } else if(this.active === POWER_ACTIVES.POWERPADDLEWIDTH) {
            this.powerPaddleWidth(durationMS);
        } else if(this.active === POWER_ACTIVES.POWERBALLSIZE) {
            this.powerBallSize(durationMS);
        } else if(this.active === POWER_ACTIVES.POWERTHREEBALLS) {
            this.powerThreeBalls(durationMS);
        }
        
    }
    
    setupIntervals(durationMS) {
        this.power_setInterval = setInterval(() => {
            this.power_timeoutIntervalElapsed--;
        }, 1000);

        this.power_timeoutInterval = setTimeout(() => {

            if(this.active === POWER_ACTIVES.POWERPADDLEFIRE) {
                this.game.projectiles = [];
            } else if(this.active === POWER_ACTIVES.POWERPADDLEWIDTH) {
                this.game.paddle.width /= 1.5;
            } else if(this.active === POWER_ACTIVES.POWERBALLSIZE) {
                this.game.ball.size /= 1.5;
            } else if(this.active === POWER_ACTIVES.POWERTHREEBALLS) {
                if(this.game.balls.length > 1) {
                    this.game.balls.splice(1);
                    this.game.gameObjects.splice(3);
                }
            }

            this.active = POWER_ACTIVES.NONE;
        }, durationMS);
    }

}