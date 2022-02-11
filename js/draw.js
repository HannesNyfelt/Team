// draw here 
// camera follow player + have to add sprites

// Thid SUCKS do it again

import { ctx,canvas } from "./main.js";

class Sprite {
    constructor(image,x,y,sizeX,sizeY,frames,speed,scaleX,scaleY) {
        this.image = image;
        this.x = x;
        this.y = y;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.frames = frames;
        this.frameIndex = 0;
        this.speed = speed;
        this.speedCount = 0;
        this.scaleX = scaleX;
        this.scaleY = scaleY;
    }

}

function imgLoad(images) {
    for (var i = 0; i < images.length; ++i) {
        var img = new Image();
        img.src = `./sprites/${images[i]}`;
    }
}

// let images = [
//     "idle-player.png"
// ]

// window.images = images;

// // window.onload = () => {
// //     imgLoad(images);
// // }

const sprites = [
    new Sprite("player",-23,0,64,64,12,24,1.3,1.3)
];

export function drawSprite(creature) {
    let sprite = sprites[creature.sprite];
    ctx.drawImage(
         document.getElementById(sprite.image),
         sprite.frameIndex * sprite.sizeX,
         0,
         sprite.sizeX,
         sprite.sizeY,
         sprite.x  + creature.x,
         sprite.y  + creature.y,
         sprite.sizeX * sprite.scaleX,
         sprite.sizeY * sprite.scaleY
        );
        if (sprite.frameIndex < sprite.frames - 1) {   
            sprite.frameIndex++;
        } else {
            sprite.frameIndex = 0
        };
};

// export function drawSprite(creature) {
//     let sprite = sprites[creature.sprite];
//     ctx.fillStyle= "#FF0000";
//     ctx.fillRect(sprite.x + creature.x,sprite.y + creature.y,sprite.sizeX,sprite.sizeY);
// }