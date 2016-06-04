/**
 * Key press event
 */
document.addEventListener("keydown",
    /**
     * Check which key is down
     * @param event
     */
    function(event) {
        if (event.keyCode == 27) {          //ESC

        }
        else if (event.keyCode == 87) {     //W

        }
        else if (event.keyCode == 83) {     //S

        }
        else if (event.keyCode == 65) {     //A

        }
        else if (event.keyCode == 68) {     //D

        }
        else if (event.keyCode == 32) {     //SPACE

        }
    }
);

/**
 * Key Release Event
 */
document.addEventListener("keyup",
    function(event) {
        if (event.keyCode == 27) {          //ESC

        }
        else if (event.keyCode == 87) {     //W

        }
        else if (event.keyCode == 83) {     //S

        }
        else if (event.keyCode == 65) {     //A

        }
        else if (event.keyCode == 68) {     //D

        }
        else if (event.keyCode == 32) {     //SPACE

        }
    }
)

/**
 * Left mouse button down
 * @type {boolean}
 */
var leftClick = false;
/**
 * Right mouse button down
 * @type {boolean}
 */
var rightClick = false;
/**
 * Middle mouse button down
 * @type {boolean}
 */
var middleClick = false;
/**
 * Raw mouse position
 * @type {Vector2D}
 */
var mousePos = new Vector2D(0.0,0.0);

/**
 * Disable brownser right click context menu
 * @returns {boolean}
 */
//document.oncontextmenu = function() { return false; }

/** Mouse button DOWN event */
document.addEventListener("mousedown",
    function(event) {
        if (event.which == 1) {         //Left click
            console.log("down");
        }
        else if (event.which == 2) {    //Middle Click
            console.log("middle");
        }
        else if (event.which == 3) {    //Right Click
            console.log("right");
        }
        console.log("Down");
    }
);

/** Mouse button UP event */
document.addEventListener("mouseup",
    function(event) {
        if (event.which == 1) {         //Left Click
            console.log("left");
        }
        else if (event.which == 2) {    //Middle Click
            console.log("middle");
        }
        else if (event.which == 3) {    //Right Click
            console.log("right");
        }
        console.log("Up");
    }
);

/** Mouse moved event */
document.addEventListener("mousemove",
    function(event) {
        mousePos.x = event.clientX;
        mousePos.y = event.clientY;
    }
)

/**
 * Get mouse position relative to canvas position
 * @param canvas Relative this canvas position
 */
function getMousePos(canvas) {
    var relative = canvas.getBoundingClientRect();
    return new Vector2D(
        mousePos.x - relative.left,
        mousePos.y - relative.top
    )
}