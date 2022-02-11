export let canvas = document.querySelector('canvas');
export let ctx = canvas.getContext('2d');
canvas.width = 960;
canvas.height = 720;

import { drawSprite } from "./draw.js";
import { calcPhysics, calculateArray } from "./phys.js";
import { updatePlayer } from "./player.js";

// new class for generic object person thing umm
class Creature {
    constructor(x, y, width, height, sprite, hitOffsetX, hitOffsetY, AxOffset, AyOffset, Ax, Ay, damage, knockback, knockbackMult, speed, jumpHeight, health) {
        this.x = x; //  x/y position for initial spawn
        this.y = y;
        this.Vx = 10; // won't need to change velocity at spawn ?
        this.Vy = 0;
        //this.sprite = array[sprite].sprite;  // make an array with objects for each sprite with basic things like what sprite it uses and other things 
        this.width = width; //  width/height is creature size (make sure it's correct with what sprite you use)
        this.height = height;
        this.hitOffsetX = hitOffsetX; //  hitOffset is x/y offset of the hitbox
        this.hitOffsetY = hitOffsetY;
        this.sprite = sprite; //  sprite is a number input [0 for player, 1 for normal enemy, 2 for advanced enemy, etc ] (also good for keeping track of how many of each enemy there is)
        this.AxOffset = AxOffset; //  AxOffset / AyOffset is offset for where the hitbox for attacks is
        this.AyOffset = AyOffset;
        this.Ax = Ax; //  Ax/Ay is attack hitbox size 
        this.Ay = Ay;
        this.damage = damage; //  damage is how much damage is dealt per attack (could be random within range ? or if on low health does more ? not added yet)
        this.knockback = knockback; //  knockback is the modifier on deafult knockback ( 2 would be double the deafult knockback )
        this.knockbackMult = knockbackMult; //  knockbackMult is the modifier on knockback taken (1 would be zero knockback, 0.5 would be half)
        this.speed = speed; //  speed is default speed (could be modified with ?? maybe random powerups or w/e)
        this.jumpHeight = jumpHeight; //  jumpHeight is default jump height (could also be modified with random powerups? maybe jetpacks? double jump?)
        this.health = health; //  health is default health (maybe default player attack does 1 damage and health of normal enemy would be 2/3? )
        this.grounded = false; // if on floor or not
        this.stunned = false; // if stunned or not
        this.state = "idle"; // state is for what state you are in // like umm you can only attack down while in the air
        this.bounceFactor = 0; // BOUNCE FACTOR
        // this.direction = 0; // 0 left, 1 up, 2 right, 3 down // for attack direction
    }
}
// Very Incredibly temporary physics test
let test = [
    new Creature(0, 80, 10, 10, 0, 0, 0, 0, 0, 10, 1, 1, 1, 1, 3),
    new Creature(0, 60, 10, 10, 0, 0, 0, 0, 0, 10, 1, 1, 1, 1, 3),
    new Creature(0, 40, 10, 10, 0, 0, 0, 0, 0, 10, 1, 1, 1, 1, 3),
    new Creature(0, 20, 10, 10, 0, 0, 0, 0, 0, 10, 1, 1, 1, 1, 3),
    new Creature(0, 80, 10, 10, 0, 0, 0, 0, 0, 10, 1, 1, 1, 1, 3),
    new Creature(0, 60, 10, 10, 0, 0, 0, 0, 0, 10, 1, 1, 1, 1, 3),
    new Creature(0, 40, 10, 10, 0, 0, 0, 0, 0, 10, 1, 1, 1, 1, 3),
    new Creature(0, 20, 10, 10, 0, 0, 0, 0, 0, 10, 1, 1, 1, 1, 3),
    new Creature(0, 80, 10, 10, 0, 0, 0, 0, 0, 10, 1, 1, 1, 1, 3),
    new Creature(0, 60, 10, 10, 0, 0, 0, 0, 0, 10, 1, 1, 1, 1, 3),
    new Creature(0, 40, 10, 10, 0, 0, 0, 0, 0, 10, 1, 1, 1, 1, 3),
    new Creature(0, 20, 10, 10, 0, 0, 0, 0, 0, 10, 1, 1, 1, 1, 3),
    new Creature(0, 80, 10, 10, 0, 0, 0, 0, 0, 10, 1, 1, 1, 1, 3),
    new Creature(0, 60, 10, 10, 0, 0, 0, 0, 0, 10, 1, 1, 1, 1, 3),
    new Creature(0, 40, 10, 10, 0, 0, 0, 0, 0, 10, 1, 1, 1, 1, 3),
    new Creature(0, 20, 10, 10, 0, 0, 0, 0, 0, 10, 1, 1, 1, 1, 3),
    new Creature(0, 80, 10, 10, 0, 0, 0, 0, 0, 10, 1, 1, 1, 1, 3),
    new Creature(0, 60, 10, 10, 0, 0, 0, 0, 0, 10, 1, 1, 1, 1, 3),
    new Creature(0, 40, 10, 10, 0, 0, 0, 0, 0, 10, 1, 1, 1, 1, 3),
    new Creature(0, 20, 10, 10, 0, 0, 0, 0, 0, 10, 1, 1, 1, 1, 3),
    new Creature(0, 80, 10, 10, 0, 0, 0, 0, 0, 10, 1, 1, 1, 1, 3),
    new Creature(0, 60, 10, 10, 0, 0, 0, 0, 0, 10, 1, 1, 1, 1, 3),
    new Creature(0, 40, 10, 10, 0, 0, 0, 0, 0, 10, 1, 1, 1, 1, 3),
    new Creature(0, 20, 10, 10, 0, 0, 0, 0, 0, 10, 1, 1, 1, 1, 3),
    new Creature(0, 0, 10, 10, 0, 0, 0, 0, 0, 10, 1, 1, 1, 1, 3)
]

window.test = test;

let player = new Creature(0, 0, 40, 80, 0, 30, 30, 40, 0, 60, 80)


let gameloop = setInterval(() => {
    calculateArray(test);
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#000000";
    test.forEach(e => {
        ctx.fillRect(e.x, e.y, e.width, e.height)
    });
    updatePlayer(player);
    ctx.fillStyle= "#cc0000";
    ctx.globalAlpha = 0.5;
    ctx.fillRect(player.x,player.y, player.width, player.height);
    ctx.globalAlpha = 1;
    drawSprite(player);
}, 16.66);

gameloop;