// https://www.grc.nasa.gov/WWW/k-12/airplane/drageq.html ? will probably work with some tweaking
// maybe more knockback upwards and a bit less to the sides so you can more easily chain attacks by hitting them when they fall down again ?
let Cd = 0.102; // experiment with value of Cd to get good drag later
let Density = 0.2; // tweak this too
let grav = 1.5; // also tweak this
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
    e.Vx = e.Vx * (e.grounded ? 0.90 : 0.97);
    e.Vy = e.Vy * 0.99;
    e.Vy += grav;


    e.y += e.Vy;
    e.x += e.Vx;

    // boundaries right / left
    // TWEAK THIS TOO!
    if (e.x + e.width >= 960) {
        e.x = 960 - e.width;
        e.Vx = -e.Vx * 0.5;
    } else if (e.x <= 0) {
        e.x = 0;
        e.Vx = -e.Vx * 0.5;
    }
    //floor
    if (e.y + e.height >= canvas.height) {
        e.y = canvas.height - e.height;
        if (e.y + e.height >= canvas.height) {
            e.y = canvas.height - e.height;
            if (e.stunned == true) {
                e.bounceFactor /= 1.3;
                if (e.bounceFactor <= 0.1) {
                    e.bounceFactor = 0;
                    e.stunned = false;
            }
            } else {
                e.grounded = true;
            }
            e.Vy = -e.Vy * e.bounceFactor; 
        }
    };

}