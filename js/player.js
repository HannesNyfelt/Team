import { getKey, keyCodes } from "./input.js";
import { calcPhysics } from "./phys.js";
import { hitbox } from "./attack.js";
let extrajump = 0;

export function updatePlayer(player) {

    calcPhysics(player);

    if (getKey(keyCodes.arrowUp)) {
        if (player.grounded) {   
            player.Vy -= 8;
            player.grounded = false;
            extrajump = 4;
        }
        player.Vy += -extrajump;
        if (extrajump * 0.7 >= 0.2) {
            extrajump = extrajump * 0.7;
        } 
    } else {
        extrajump = 0;
    }

    if (getKey(keyCodes.arrowLeft)) {
        player.Vx -= (player.grounded ? 2 : 1.5);
        player.state = "left";
    }
    if (getKey(keyCodes.arrowRight)) {
        player.Vx += (player.grounded ? 2 : 1.5);
        player.state = "right";
    }



    player.delay--;
    if (player.delay <= 0) {
        if(getKey(keyCodes.W)) {
            hitbox(player,0);
            player.delay = 10;
        } else if(getKey(keyCodes.A)) {
            hitbox(player,1);
            player.delay = 10;
        } else if(getKey(keyCodes.S)) {
            hitbox(player,2);
            player.delay = 10;
        } else if(getKey(keyCodes.D)) {
            hitbox(player,3);
            player.delay = 10;
        } 
    }

    // if (player.y > 450 - player.height) {
    //     player.y = 450 - player.height;
    //     player.Vy = 0;
    //     player.grounded = true;
    // }
}