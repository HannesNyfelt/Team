// NEEDS TO BE REDONE FOR SQUARES INSTEAD OF CIRCLES + CREATE NEW SYSTEM FOR KNOCKBACK AND GRAVITY
// https://www.grc.nasa.gov/WWW/k-12/airplane/drageq.html ? will probably work with some tweaking
// maybe more knockback upwards and a bit less to the sides so you can more easily chain attacks by hitting them when they fall down again ?
let Cd = 0.102; // experiment with value of Cd to get good drag later
let Density = 0.2; // tweak this too
let grav = 1; // also tweak this
export function calculateArray(a = []) {
    // a = array
    a.forEach(element => {
        calcPhysics(element);
    });
}

export function calcPhysics(e) {
    // ok this  is just accelerating it to infinity // needs tweaking // Cd is 0 right now to ignore this
    // e.Fx = Cd * ((Density * e.Vx) / 2) * (e.width * e.height);
    // e.Fy = Cd * ((Density * e.Vy) / 2) * (e.width * e.height);
    e.Vx = e.Vx * 0.90;
    e.Vy = e.Vy * 0.99;
    e.Vy += grav;


    e.y += e.Vy;
    e.x += e.Vx;

    // boundaries right / left
    // TWEAK THIS TOO!
    if (e.x + e.width >= 600) {
        e.x = 600 - e.Vx;
        e.Vx = -e.Vx * 1; // only keeping the bounce if needed for later but for now its multiplied by zero
    } else if (e.x - e.width <= 0) {
        e.x = e.width;
        e.Vx = -e.Vx * 1;
    }
    //floor
    if (e.y + e.height >= canvas.height) {
        e.y = canvas.height - e.height;
        e.Vy = -e.Vy * 0.5; // maybe add bounce IF knocked out or whatever 
    };

}