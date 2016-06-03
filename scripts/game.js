//Canvas
var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");
document.body.appendChild(canvas);

var delta = 0;
var timestep = 1000 / 60;
var lastFrameTimeMs = 0;
var maxFPS = 30;
var fps = 60;
var framesThisSecond = 0;
var lasFPSUpdate = 0;

/**
 * Update game logic
 * @param delta timestep
 */
function update(delta) {
    //Delta=TimeStep in seconds

}

/**
 * Draws the game
 * @param interpolate
 */
function render(interpolate) {
    //Clear canvas
    ctx.clearRect(0,0,canvas.width,canvas.height);
    //Canvas Background colour
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canvas.width, canvas.height);
    ctx.closePath();

    ///////////Draw////////////////////

}

/**
 * Game loop
 * @param timestamp
 */
function mainLoop(timestamp) {
    // Throttle the frame rate.
    if (timestamp < lastFrameTimeMs + (1000 / maxFPS)) { window.requestAnimationFrame(mainLoop); return; }
    delta += timestamp - lastFrameTimeMs;
    lastFrameTimeMs = timestamp;

    if (timestamp > lasFPSUpdate + 1000) {              //Count frames
        fps = 0.25 * framesThisSecond + 0.75 * fps;
        //console.log(fps);
        lasFPSUpdate = timestamp;
        framesThisSecond = 0;
    }
    framesThisSecond++;

    var numUpdateSteps = 0;
    while (delta >= timestep) {
        update(delta / 1000.0);
        delta -= timestep;
        if (++numUpdateSteps >= 240) { delta = 0; break; }
    }
    render((delta / timestep));
    window.requestAnimationFrame(mainLoop);
}

window.requestAnimationFrame(mainLoop);         //Start Loop/Game