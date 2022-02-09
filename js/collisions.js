// NEEDS TO BE REDONE FOR SQUARES INSTEAD OF CIRCLES + CREATE NEW SYSTEM FOR KNOCKBACK AND GRAVITY
// https://www.grc.nasa.gov/WWW/k-12/airplane/drageq.html ? will probably work with some tweaking
// maybe more knockback upwards and a bit less to the sides so you can more easily chain attacks by hitting them when they fall down again ?
let Cd = 0.102; // experiment with value of Cd to get good drag later
let Density = 0.2; // tweak this too
let grav = 1; // also tweak this
export function calculatePhysics(a = []) {
    // a = array

    
    for (let i = 0; i < a.length; i++) {

        // ok this  is just accelerating it to infinity // needs tweaking // Cd is 0 right now to ignore this
        // a[i].Fx = Cd * ((Density * a[i].Vx) / 2) * (a[i].width * a[i].height);
        // a[i].Fy = Cd * ((Density * a[i].Vy) / 2) * (a[i].width * a[i].height);




        a[i].Vx = a[i].Vx * 0.90;
        a[i].Vy = a[i].Vy * 0.99;
        a[i].Vy += grav;


        a[i].y += a[i].Vy;
        a[i].x += a[i].Vx;

        // boundaries right / left
        // TWEAK THIS TOO!
        if (a[i].x + a[i].width >= 600) {
            a[i].x = 600 - a[i].Vx;
            a[i].Vx = -a[i].Vx * 1; // only keeping the bounce if needed for later but for now its multiplied by zero
        } else if (a[i].x - a[i].width <= 0) {
            a[i].x = a[i].width;
            a[i].Vx = -a[i].Vx * 1;
        }
        //floor
        if (a[i].y + a[i].height >= canvas.height) {
            a[i].y = canvas.height - a[i].height;
            a[i].Vy = -a[i].Vy * 0.5; // maybe add bounce IF knocked out or whatever 
        };

    }
}
