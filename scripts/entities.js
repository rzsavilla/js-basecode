Sprite.prototype= new Movable(); //Sprite Inherits Movable
Sprite.prototype.constructor=Sprite;
/** Sprite */
function Sprite() {
    this.image = new Image();
    this.scaledSize = new Vector2D(0,0);
    this.size = new Vector2D(0,0);

    /**
     * Set the size of the sprite
     * @param newWidth Sprite width.
     * @param newHeight Sprite height.
     */
    this.setSize = function(newWidth,newHeight) { this.size.x = newWidth; this.size.y = newHeight; }
    this.setImage = function(newImage) {
        this.image = newImage;
        this.setSize(newImage.width,newImage.height);
    }

    /**
     * Draw sprite image
     * @param c Canvas to draw on.
     * @param interpolate Interpolate position of the drawn image
     */
    this.draw = function (c,interpolate) {
        c.drawImage(this.image,
            (this.prevPos.x + (this.position.x - this.prevPos.x) * interpolate) - this.origin.x,
            (this.prevPos.y + (this.position.y - this.prevPos.y) * interpolate) - this.origin.y
        )
    }
}

/**
 * Stores animation information for a sprite.
 * @param {int} numFrames Number of frames in the animation.
 * @param {float} startX X position on sprite sheet for the first frame.
 * @param {float} startY Y position on sprite sheet for the first frame.
 * @param {int} frameWidth Width of animation frame.
 * @param {int} frameHeight Height of animation frame.
 * @param {int} fps Animation frames per second.
 * @param {image} spriteSheet Sprite sheet
 */
function Animation(numFrames,startX,startY,frameWidth,frameHeight,fps,spriteSheet) {
    this.frameCount = numFrames;
    this.x = startX;
    this.y = startY;
    this.width = frameWidth;
    this.height = frameHeight;
    this.fps = fps;
    this.spriteSheet = spriteSheet;
}

AnimatedSprite.prototype = new Sprite();                //Animated Sprite Inherits Sprite
AnimatedSprite.prototype.constructor=AnimatedSprite;
/** Animated sprite */
function AnimatedSprite() {
    /** Frame Position */
    var framePos = new Vector2D(0.0,0.0);
    /** Size of each frame */
    var frameSize = new Vector2D(0.0,0.0);
    /** Total number of animation frames */
    var frameCount = 0;
    /** Current animation frame */
    var currFrame = 0;
    /** Animation Speed (milliseconds) */
    var framesSpeed = 1000;
    /** Frame Timer */
    var timer = new Timer();

    /** Current animation */
    var anim;

    var playAnimation = true;

    /** Set sprite animation*/
    this.setAnimation = function(newAnimation) { anim = newAnimation; this.setFPS(anim.fps); currFrame = 0; }
    /** Return animation */
    this.getAnimation = function() { return anim; }
    /** Return current frame number */
    this.getCurrFrame = function() { return currFrame; }
    /**
     * Play or pause animation.
     * @param {boolean} play Play or pause stop animation
     */
    this.play = function(play) { playAnimation = play; }

    /** Reset animation */
    this.reset = function() { currFrame = 0; }

    /** Change animation frame. */
    this.nextFrame = function() {
        if (timer.elapsed() >= framesSpeed) {
            if (currFrame < anim.frameCount -1) {
                //Next Frame
                currFrame += 1;
            } else {
                //Reset animation
                currFrame = 0;
            }
            //console.log("Next"+this.currFrame);
            //clearInterval(this.timer);

            //console.log(timer.elapsed());
            timer.reset();
        }
    }
    /** Compute milliseconds to achieve animation frame speed */
    this.setFPS = function(frames) { framesSpeed = (1/frames) * 1000; }
}

/**
 * Draw and animate sprite, overrides
 * @param c Canvas to draw on
 * @param interpolate Value used to to interpolate position
 */
AnimatedSprite.prototype.draw = function(c,interpolate) {
    this.nextFrame(); //Update frame
    //Draw frame
    c.drawImage(
        this.getAnimation().spriteSheet,
        this.getAnimation().x + (this.getCurrFrame() * this.getAnimation().width),this.getAnimation().y,
        this.getAnimation().width,this.getAnimation().height,
        (this.prevPos.x + (this.position.x - this.prevPos.x) * interpolate) - this.origin.x,
        (this.prevPos.y + (this.position.y - this.prevPos.y) * interpolate) - this.origin.y,
        this.getAnimation().width * this.scale.x,this.getAnimation().height * this.scale.y
    )
}