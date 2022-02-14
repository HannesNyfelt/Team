import { ctx,canvas, enemyArray, player } from "./main.js";

let hitboxes = [];

export function hitbox(ent,direction) {
    ctx.fillStyle = "#00cc00"
    if (!(direction == 2 && ent.grounded)) {
        
        let hit = {
            x:      ent.x + ent.AxOffset - (direction == 1 ? ent.Ax + ent.width : (direction == 2 || direction == 0 ? (ent.Ax + ent.width)/2 : 0)),
            y:      ent.y + ent.AyOffset - (direction == 0 ? ent.Ay - 20 : (direction == 2 && !ent.grounded ? -ent.Ay/2 : 0)),
            width:     ent.Ax,
            height:    ent.Ay,
            direction: direction,
            type:      ent.sprite,
            knockback: ent.knockback,
            damage:    ent.damage
        }
        
        ctx.fillRect(hit.x,hit.y,hit.width,hit.height);
        
        hitboxes.push(hit);
    }
//  window.hitboxes = hitboxes;
}

export function calculateHitboxes() {
    hitboxes.forEach(e => {
        if (e.type == 0) {
            enemyArray.forEach(obj => { 
                if (checkCollision(obj,e)) {
                    let xDir = 0;
                    let yDir = 0;
                    switch (e.direction) {
                        case 0:
                            //up
                            xDir = (Math.random() * 15) - 7.5;
                            yDir = -20;
                        break;
                        case 1:
                            //left
                            xDir = -15;
                            yDir = -20;
                        break;
                        case 2:
                            //down
                            xDir = 0;
                            yDir = 50;
                        break;
                        case 3:
                            //right
                            xDir = 15;
                            yDir = -20;
                        break;
                        default:
                            xDir = 0;
                            yDir = 0;
                            break;
                    }
                    obj.Vx += xDir;
                    obj.Vy += yDir;
                    obj.grounded = false;
                    obj.stunned = true;
                    if (e.direction == 2) {
                        obj.health -= 1;
                        console.log(obj.health);
                    }
                    obj.bounceFactor = 1;
                }
            });
        } else {
            if (checkCollision(player,e)) {
            player.Vy -= 10;
            player.health -= 10;
            player.grounded = false;
            }
        }
    });
    hitboxes = [];
}

function checkCollision(obj1,obj2) {
    return (obj1.x < obj2.x + obj2.width &&
        obj1.x + obj1.width > obj2.x &&
        obj1.y < obj2.y + obj2.height &&
        obj1.height + obj1.y > obj2.y);
}