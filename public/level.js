import Brick from "./brick.js";

export function buildLevel(game, level) {
    let bricks = [];

    level.forEach((row, rowIndex) => {
        row.forEach((brick, brickIndex) => {
            if(brick.isBrick) {
                bricks.push(new Brick(game, { x: 1 + (brickIndex * game.gameWidth / 10), y: 5 + (rowIndex * 41) }, document.querySelector(`#brick-health-${brick.health}`), brick.health));
            }
        });
    })

    return bricks;
}

export const level1 = [
    [
        { isBrick: true, health: 2 },
        { isBrick: true, health: 2 },
        { isBrick: true, health: 2 },
        { isBrick: true, health: 2 },
        { isBrick: true, health: 2 },
        { isBrick: true, health: 2 },
        { isBrick: true, health: 2 },
        { isBrick: true, health: 2 },
        { isBrick: true, health: 2 },
        { isBrick: true, health: 2 },
    ],
    [
        { isBrick: true, health: 2 },
        { isBrick: true, health: 2 },
        { isBrick: true, health: 2 },
        { isBrick: true, health: 2 },
        { isBrick: true, health: 2 },
        { isBrick: true, health: 2 },
        { isBrick: true, health: 2 },
        { isBrick: true, health: 2 },
        { isBrick: true, health: 2 },
        { isBrick: true, health: 2 },
    ],
    [
        { isBrick: true, health: 2 },
        { isBrick: true, health: 2 },
        { isBrick: true, health: 2 },
        { isBrick: true, health: 2 },
        { isBrick: true, health: 2 },
        { isBrick: true, health: 2 },
        { isBrick: true, health: 2 },
        { isBrick: true, health: 2 },
        { isBrick: true, health: 2 },
        { isBrick: true, health: 2 },
    ],
    [
        { isBrick: true, health: 6 },
        { isBrick: true, health: 6 },
        { isBrick: true, health: 6 },
        { isBrick: true, health: 6 },
        { isBrick: true, health: 6 },
        { isBrick: true, health: 6 },
        { isBrick: true, health: 6 },
        { isBrick: true, health: 6 },
        { isBrick: true, health: 6 },
        { isBrick: true, health: 6 },
    ]
]

export const level2 = [
    // [
    //     { isBrick: true, health: 3 },
    //     { isBrick: true, health: 3 },
    //     { isBrick: true, health: 3 },
    //     { isBrick: true, health: 3 },
    //     { isBrick: true, health: 3 },
    //     { isBrick: true, health: 3 },
    //     { isBrick: true, health: 3 },
    //     { isBrick: true, health: 3 },
    //     { isBrick: true, health: 3 },
    //     { isBrick: true, health: 3 },
    // ],
    // [
    //     { isBrick: true, health: 3 },
    //     { isBrick: true, health: 3 },
    //     { isBrick: true, health: 3 },
    //     { isBrick: true, health: 3 },
    //     { isBrick: true, health: 3 },
    //     { isBrick: true, health: 3 },
    //     { isBrick: true, health: 3 },
    //     { isBrick: true, health: 3 },
    //     { isBrick: true, health: 3 },
    //     { isBrick: true, health: 3 },
    // ],
    // [
    //     { isBrick: true, health: 3 },
    //     { isBrick: true, health: 3 },
    //     { isBrick: true, health: 3 },
    //     { isBrick: true, health: 3 },
    //     { isBrick: true, health: 3 },
    //     { isBrick: true, health: 3 },
    //     { isBrick: true, health: 3 },
    //     { isBrick: true, health: 3 },
    //     { isBrick: true, health: 3 },
    //     { isBrick: true, health: 3 },
    // ],
    [
        { isBrick: true, health: 1 },
        { isBrick: true, health: 0 },
        { isBrick: true, health: 0 },
        { isBrick: true, health: 0 },
        { isBrick: true, health: 0 },
        { isBrick: true, health: 0 },
        { isBrick: true, health: 0 },
        { isBrick: true, health: 0 },
        { isBrick: true, health: 0 },
        { isBrick: true, health: 0 },
    ]
]