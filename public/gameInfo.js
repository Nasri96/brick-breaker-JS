export default class GameInfo {
    constructor(game) {
        this.game = game;
        this.width = game.gameWidth;
        this.height = 50;

        this.heartWidth = 35;
        this.heartHeight = 30;
        this.heartPositionX = game.gameWidth / 2 - this.heartWidth * 4.5;
        this.heartPositionY = this.height / 2 - this.heartHeight / 2;
        this.heartImage = document.querySelector("#lives");
        
    }

    draw(ctx) {
        // draw player lives
        ctx.drawImage(this.heartImage, this.heartPositionX, this.heartPositionY, this.heartWidth, this.heartHeight);
        ctx.font = "30px Do Hyeon";
        ctx.textAlign = "center";
        ctx.fillStyle = "#fafafa";
        ctx.textBaseline = "top";
        ctx.fillText(this.game.lives, this.game.gameWidth / 2 - this.heartWidth * 3, this.height / 2 - this.heartHeight / 2);
        // draw power ups
        ctx.font = "30px Do Hyeon";
        ctx.textAlign = "left";
        ctx.fillStyle = "#fafafa";
        if(this.game.powerUp.active === 0) {
            ctx.fillText("Power Up - None", this.game.gameWidth / 2 - this.heartWidth / 3, this.height / 2 - this.heartHeight / 2);
        } else if(this.game.powerUp.active !== 0) {
            ctx.fillText(`Power Up - Active ${this.game.powerUp.power_timeoutIntervalElapsed}s remaining`, this.game.gameWidth / 2 - this.heartWidth / 3, this.height / 2 - this.heartHeight / 2);
        }
    }

    update() {

    }
}