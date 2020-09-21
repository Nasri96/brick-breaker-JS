export function collisionDetection(ball, gameObject) {
    let leftSideObject = gameObject.position.x;
    let rightSideObject = gameObject.position.x + gameObject.width;
    let topSideObject = gameObject.position.y;
    let bottomSideObject = gameObject.position.y + gameObject.height;

    let leftBall = ball.position.x;
    let rightBall = ball.position.x + ball.size;
    let centerBall = ball.position.x + ball.size / 2;
    let topBall = ball.position.y;
    let bottomBall = ball.position.y + ball.size;

    if(centerBall >= leftSideObject && centerBall <= rightSideObject && bottomBall >= topSideObject && topBall <= bottomSideObject) {
        return true;
    } 
    return false;
}

export function collisionDetectionSpecial(projectile, gameObject) {
    let leftProjectile = projectile.position.x;
    let rightProjectile = projectile.position.x + projectile.width;
    let topProjectile = projectile.position.y;
    let bottomProjectile = projectile.position.y + projectile.height;

    let leftSideObject = gameObject.position.x;
    let rightSideObject = gameObject.position.x + gameObject.width;
    let topSideObject = gameObject.position.y;
    let bottomSideObject = gameObject.position.y + gameObject.height;

    if(leftProjectile >= leftSideObject && leftProjectile <= rightSideObject && bottomProjectile >= topSideObject && topProjectile <= bottomSideObject) {
        return true;
    } 
    return false;
}