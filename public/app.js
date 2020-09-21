import Paddle from "./paddle.js";
import Ball from "./ball.js";
import inputHandler from "./inputHandler.js";
import Game from "./game.js";

let canvas = document.querySelector("#gameScreen");
let canvas2 = document.querySelector("#gameScreen2");
/** @type {CanvasRenderingContext2D} */
let ctx = canvas.getContext("2d");
let ctx2 = canvas2.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 50;
canvas2.width = window.innerWidth;
canvas2.height = 50;

const GAME_WIDTH = canvas.width;
const GAME_HEIGHT = canvas.height;

let game = new Game(GAME_WIDTH, GAME_HEIGHT);
new inputHandler(game.paddle, game);

function gameLoop(){
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);

    game.update();
    game.draw(ctx, ctx2);

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);