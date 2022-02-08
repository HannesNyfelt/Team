// NEEDS TO BE REDONE FOR SQUARES INSTEAD OF CIRCLES + CREATE NEW SYSTEM FOR KNOCKBACK AND GRAVITY
// https://www.grc.nasa.gov/WWW/k-12/airplane/drageq.html ? will probably work with some tweaking
// maybe more knockback upwards and a bit less to the sides so you can more easily chain attacks by hitting them when they fall down again ?
let Cd = 0.5; // experiment with value of Cd to get good drag later
let Density = 1.1; // tweak this too
let grav = 5; // also tweak this
function calculatePhysics(a = []) {
    // a = array

    
    for (let i = 0; i < a.length; i++) {
        a[i].Fx = Cd * ((Density * a[i].Vx) / 2) * (a[i].width * a[i].height);
        a[i].Fy = Cd * ((Density * a[i].Vy) / 2) * (a[i].width * a[i].height);




        a[i].vx += a[i].Fx;
        a[i].vy += grav + a[i].Fy;


        a[i].y += a[i].vy;
        a[i].x += a[i].vx;

        // boundaries right / left
        // TWEAK THIS TOO!
        if (a[i].x + a[i].width >= 1000) {
            a[i].x = 1000 - a[i].r;
            a[i].Vx = -a[i].Vx * 0; // only keeping the bounce if needed for later but for now its multiplied by zero
        } else if (a[i].x - a[i].width <= 0) {
            a[i].x = a[i].width;
            a[i].Vx = -a[i].Vx * 0;
        }
        //floor
        if (a[i].y + a[i].height >= canvas.height) {
            a[i].y = canvas.height - a[i].height;
            a[i].Vy = -a[i].Vy * 0; // maybe add bounce IF knocked out or whatever 
        };

    }
}
