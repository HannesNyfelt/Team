// draw here 
// camera follow player + have to add sprites

// Thid SUCKS do it again

import { ctx,canvas } from "./main.js";

class Sprite {
    constructor(image,x,y,sizeX,sizeY,frames,speed) {
        this.image = image;
        this.x = x;
        this.y = y;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.frames = frames;
        this.frameIndex = 0;
        this.speed = speed;
        this.speedCount = 0;
    }

}

function imgLoad(images) {
    for (var i = 0; i < images.length; ++i) {
        var img = new Image();
        img.src = `./sprites/${images[i]}`;
    }
}

let images = [
    "idle-player.png"
]

window.images = images;

window.onload = () => {
    imgLoad(images);
}

const sprites = [
    new Sprite("idle-player.png",0,0,64,64,12,24)
];

export function drawSprite(creature) {
    let sprite = sprites[creature.sprite];
    ctx.drawImage(
         document.getElementById('idle-player'),
         sprite.frameIndex * sprite.sizeX,
         sprite.y,
         sprite.sizeX,
         sprite.sizeY,
         sprite.x  + creature.x,
         sprite.y  + creature.y,
         sprite.sizeX,
         sprite.sizeY
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