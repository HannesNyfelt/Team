// new class for generic object person thing umm

//  x/y position for initial spawn
//  width/height is creature size (make sure it's correct with what sprite you use)
//  sprite is a number input [0 for player, 1 for normal enemy, 2 for advanced enemy, etc ] (also good for keeping track of how many of each enemy there is)
//  AxOffset / AyOffset is offset for where the hitbox for attacks is
//  Ax/Ay is attack hitbox size
//  damage is how much damage is dealt per attack (could be random within range ? or if on low health does more ? not added yet)
//  knockback is the modifier on deafult knockback ( 2 would be double the deafult knockback )
//  knockbackResistance is the modifier on knockback taken (1 would be zero knockback, 0.5 would be half)
//  speed is default speed (could be modified with ?? maybe random powerups or w/e)
//  jumpHeight is default jump height (could also be modified with random powerups? maybe jetpacks? double jump?)
//  health is default health (maybe default player attack does 1 damage and health of normal enemy would be 2/3? )
class Creature {
    constructor(x,y,width,height,sprite,AxOffset,AyOffset,Ax,Ay,damage,knockback,knockbackResistance,speed,jumpHeight,health) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.sprite = sprite;
        this.AxOffset = AxOffset;
        this.AyOffset = AyOffset;
        this.Ax = Ax;
        this.Ay = Ay;
        this.damage = damage;
        this.knockback = knockback;
        this.knockbackResistance = knockbackResistance;
        this.speed = speed;
        this.jumpHeight = jumpHeight;
        this.health = health;
    }
}