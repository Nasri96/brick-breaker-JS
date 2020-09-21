import Paddle from "./paddle.js";
import Game from "./game.js";
import Projectile from "./projectile.js";

const GAME_STATE = {
    RUNNING: 0,
    PAUSED: 1,
    NEXTLEVEL: 2,
    COMPLETED: 3,
    GAMEOVER: 4,
    MAINMENU: 5
}

const POWER_ACTIVES = {
    NONE: 0,
    POWERBOTTOMWALL: 1,
    POWERPADDLEFIRE: 2
}

export default class inputHandler {
    constructor(paddle, game) {
        document.addEventListener("keydown", (event) => {
            if(event.keyCode === 37) {
                paddle.moveLeft();
            }
            else if(event.keyCode === 39) {
                paddle.moveRight();
            }

            else if(event.keyCode === 27) {
                game.togglePause();
                if(game.powerUp.paused === false && game.powerUp.active !== 0) {
                    game.powerUp.pauseInterval();
                } else if(game.powerUp.paused === true && game.powerUp.active !== 0) {
                    game.powerUp.resumeInterval(game.powerUp.power_timeoutIntervalElapsed * 1000);
                }
            }

            else if(event.keyCode === 32) {
                if(game.gameState === GAME_STATE.NEXTLEVEL) {
                    game.nextLevel();
                }
            }

            else if(event.keyCode === 38) {
                if(game.powerUp.active === POWER_ACTIVES.POWERPADDLEFIRE) {
                    setTimeout(() => {
                        let projectile1 = new Projectile(game, { x: game.paddle.position.x, y: game.gameHeight - 10 - game.paddle.height });
                        let projectile2 = new Projectile(game, { x: game.paddle.position.x + game.paddle.width - 10, y: game.gameHeight - 10 - game.paddle.height });
                        game.projectiles.push(projectile1, projectile2);
                    }, 100);
                }
            }

            else if(event.keyCode === 13) {
                game.gameState = GAME_STATE.RUNNING;
            }
        });

        document.addEventListener("keyup", (event) => {
            if(event.keyCode === 37) {
                paddle.stop();
            }
            else if(event.keyCode === 39) {
                paddle.stop();
            }
        });
    }
}