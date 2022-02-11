import { ctx,canvas, enemyArray } from "./main.js";

let hitboxes = [];

export function hitbox(ent,direction) {
    ctx.fillStyle = "#00cc00"
    let hit = {
        posX:      ent.x + ent.AxOffset - (direction == 1 ? ent.Ax + ent.width : (direction == 2 || direction == 0 ? (ent.Ax + ent.width)/2 : 0)),
        posY:      ent.y + ent.AyOffset - (direction == 0 ? ent.Ay : (direction == 2 && !ent.grounded ? -ent.Ay/2 : 0)),
        width:     ent.Ax,
        height:    ent.Ay,
        direction: direction,
        type:      ent.sprite,
        knockback: ent.knockback,
        damage:    ent.damage
    }

 ctx.fillRect(hit.posX,hit.posY,hit.width,hit.height);

 hitboxes.push(hit);
//  window.hitboxes = hitboxes;
}

export function calculateHitboxes() {
    hitboxes.forEach(e => {
        if (e.type == 0) {
            enemyArray.forEach(obj => { 
                if (checkCollision(obj,e)) {
                    console.log("A");
                    obj.Vx += (e.direction == 1 ? -10 * obj.knockback : (e.direction == 0 ? 0 : (e.direction == 3 ? -10 * obj.knockback : 0 )));
                    obj.Vy += (e.direction == 1 ? -10 : (e.direction == 0 ? -10 * obj.knockback : (e.direction == 3 ? 10 * obj.knockback : -10 )));
                }
            });
        }
    });
    hitboxes = [];
}

function checkCollision(obj,e) {
        return (
          obj.x < e.x + e.width &&
          obj.x + obj.width > e.x &&
          obj.y < e.y + e.height &&
          obj.y + obj.height > e.y
        );
}