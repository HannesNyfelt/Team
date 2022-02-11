import { ctx,canvas } from "./main.js";

export function hitbox(ent,direction) {
    ctx.fillStyle = "#00cc00"
    ctx.fillRect(ent.x + ent.AxOffset - (direction == 1 ? ent.Ax + ent.width : (direction == 2 || direction == 0 ? (ent.Ax + ent.width)/2 : 0)),ent.y + ent.AyOffset - (direction == 0 ? ent.Ay : (direction == 2 && !ent.grounded ? -ent.Ay/2 : 0)), ent.Ax,ent.Ay);
}