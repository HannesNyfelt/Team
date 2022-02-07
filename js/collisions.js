// NEEDS TO BE REDONE FOR SQUARES INSTEAD OF CIRCLES + CREATE NEW SYSTEM FOR KNOCKBACK AND GRAVITY


function calcObjects(a) {
    // a = array
    for (let i = 0; i < a.length; i++) {
        a[i].Fx = -0.5 * 0.47 * Math.PI * a[i].r * a[i].r / (10000) * 1.22 * a[i].vx * a[i].vx / a[i].vx;
        a[i].Fy = -0.5 * 0.47 * Math.PI * a[i].r * a[i].r / (10000) * 1.22 * a[i].vy * a[i].vy / Math.abs(a[i].vy);



        // Fx = (isNaN(Fx) ? 0 : Fx);
        // Fy = (isNaN(Fy) ? 0 : Fy);

        a[i].vx += a[i].Fx / a[i].m;
        a[i].vy += gravity + (a[i].Fy / a[i].m);


        a[i].y += a[i].vy;
        a[i].x += a[i].vx;

        // right wall
        if (a[i].x + a[i].r >= canvas.width) {
            a[i].x = canvas.width - a[i].r;
            a[i].vx = -a[i].vx * a[i].b;
        } else if (a[i].x - a[i].r <= 0) {
            a[i].x = a[i].r;
            a[i].vx = -a[i].vx * a[i].b;
        }
        //floor
        if (a[i].y + a[i].r >= canvas.height) {
            a[i].y = canvas.height - a[i].r;
            a[i].vy = -a[i].vy * a[i].b;
        };

        // a.forEach(e => {
        //     console.log("a")
        //     console.log(cirCollision(a[i].x, a[i].y, a[i].r, e.x, e.y, e.r));
        // });
    }
}
