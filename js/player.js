import { getKey, keyCodes } from "./input.js";
import { calcPhysics } from "./phys.js";


export function updatePlayer(player) {

    calcPhysics(player);

    if (player.grounded && getKey(keyCodes.arrowUp)) {
        player.Vy = -10;
        player.grounded = false;
    }

    player.Vx += getKey(keyCodes.arrowLeft) ? -5 : 0;
    player.Vx += getKey(keyCodes.arrowRight) ? 5 : 0;

    // if (player.y > 450 - player.height) {
    //     player.y = 450 - player.height;
    //     player.Vy = 0;
    //     player.grounded = true;
    // }
}