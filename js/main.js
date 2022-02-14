export let canvas = document.querySelector('canvas');
export let ctx = canvas.getContext('2d');
canvas.width = 960;
canvas.height = 720;

import { drawSprite } from "./draw.js";
import { calcPhysics, calculateArray } from "./phys.js";
import { updatePlayer } from "./player.js";
import { hitbox,calculateHitboxes } from "./attack.js";

// new class for generic object person thing umm
class Creature {
    constructor(x, y, width, height, sprite, hitOffsetX, hitOffsetY, AxOffset, AyOffset, Ax, Ay, damage, knockback, knockbackMult, speed, jumpHeight, health,delay = 16) {
        this.x = x; //  x/y position for initial spawn
        this.y = y;
        this.Vx = 10; // won't need to change velocity at spawn ?
        this.Vy = 0;
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
        this.frameIndex = 0;
        this.delay = delay;
        // this.direction = 0; // 0 left, 1 up, 2 right, 3 down // for attack direction
    }
}

export let player = new Creature(200, 0, 40, 80, 0, 30, 30, 40, 0, 80, 120,10,1,1,1,1,200);
export let enemyArray = [
    new Creature(0, 0, 40, 80, 1, 30, 30, 40, 0, 20, 80,60,10,1,1,1,3,100),
    new Creature(0, 0, 40, 80, 1, 30, 30, 40, 0, 40, 80,60,10,1,1,1,3,100),
    new Creature(0, 0, 40, 80, 1, 30, 30, 40, 0, 10, 80,60,10,1,1,1,3,100),
    new Creature(0, 0, 40, 80, 1, 30, 30, 40, 0, 30, 80,60,10,1,1,1,3,100),
    new Creature(0, 0, 40, 80, 1, 30, 30, 40, 0, 70, 80,60,10,1,1,1,3,100),
    new Creature(0, 0, 40, 80, 1, 30, 30, 40, 0, 60, 80,60,10,1,1,1,3,100),
    new Creature(0, 0, 40, 80, 1, 30, 30, 40, 0, 60, 80,60,10,1,1,1,3,100)
]


let gameloop = setInterval(() => {
    drawScreen();
    updateObjects();    
drawObjects();
}, 16.66);

gameloop;

function drawScreen() {
    ctx.fillStyle = "#eeeccc";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "#000000";
    ctx.fillRect(24,24,200,24);
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(24,24,Math.max(200 * (player.health / 200),0) ,24);
    
}

function updateObjects() {
   updateEnemies(enemyArray); // not a function yet lol
    calculateArray(enemyArray);
    updatePlayer(player);
    calculateHitboxes();
    calcPhysics(player);
    if (player.health <= 0) {
        clearInterval(gameloop);
        ctx.font = "30px Arial";
        ctx.fillStyle = "#FFa000"
        ctx.fillText("game over!", canvas.width/2, 50); 
    }
}

function drawObjects() {
    // also temp while fixing draw sprite function
    enemyArray.forEach(e => {
        ctx.fillStyle = "#Fcc000"

        ctx.fillRect(e.x,e.y,e.width,e.height);

        drawSprite(e);
        // hitbox(e,0);
        // hitbox(e,1);
        // hitbox(e,2);
        // hitbox(e,3);
    });
    ctx.fillStyle = "#000EEe"
    // ctx.fillRect(player.x,player.y,player.width,player.height);
    drawSprite(player);
}


function updateEnemies(array) {
    array.forEach(e => {
        if (!e.stunned) {
            
            if (e.x <= player.x) {
                e.Vx += Math.random() * 0.5;
            } else {
                e.Vx -= Math.random() * 0.5;
            }
            e.delay--;
            if (e.delay <= 0) {
                if (!player.grounded) {
                    hitbox(e,0);
                    e.delay = 100;
                }else {
                    if (e.x <= player.x + 100 && e.x >= player.x) {
                        hitbox(e,1);
                        e.delay = 100;
                    }
                    if (e.x >= player.x - 100 && e.x <= player.x) {
                        hitbox(e,3);
                        e.delay = 100;
                    }
                }
            }
        }
    });
}