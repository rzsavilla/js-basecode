Sprite.prototype= new Movable(); //Sprite Inherits Movable
Sprite.prototype.constructor=Sprite;
/** Sprite */
function Sprite() {
    Movable.call(this); //Super
    /**
     * Sprite Image/SpriteSheet
     */
    var image = new Image();
    /**
     * Size of sprite
     * @type {Vector2D}
     */
    var size = new Vector2D(0,0);

    /**
     * Set the size of the sprite
     * @param newWidth Sprite width.
     * @param newHeight Sprite height.
     */
    this.setSize = function(newWidth,newHeight) { size.x = newWidth; size.y = newHeight; }
    this.setImage = function(newImage) {
        image = newImage;
        this.setSize(newImage.width,newImage.height);
    }

    this.getSize = function() { return size; }
    this.getImage = function() { return image; }

    /**
     * Draw sprite image
     * @param c Canvas to draw on.
     * @param interpolate {number} Interpolate position of the drawn image
     */
    this.draw = function (c,interpolate) {
        c.drawImage(image,
            (this.getPrevPos().x + (this.getPos().x - this.getPrevPos().x) * interpolate) - this.getOrigin().x,
            (this.getPrevPos().y + (this.getPos().y - this.getPrevPos().y) * interpolate) - this.getOrigin().y
        )
    }
}

/**
 * Stores animation information for a sprite.
 * @param {number} numFrames Number of frames in the animation.
 * @param {number} startX X position on sprite sheet for the first frame.
 * @param {number} startY Y position on sprite sheet for the first frame.
 * @param {number} frameWidth Width of animation frame.
 * @param {number} frameHeight Height of animation frame.
 * @param {number} fps Animation frames per second.
 * @param {image} spriteSheet Sprite sheet
 */
function Animation(numFrames,startX,startY,frameWidth,frameHeight,fps,spriteSheet) {
    /**
     *
     * @type {number}
     */
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
    //Sprite.call(this);
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
        (this.getPrevPos().x + (this.getPos().x - this.getPrevPos().x) * interpolate) - this.getOrigin().x,
        (this.getPrevPos().y + (this.getPos().y - this.getPrevPos().y) * interpolate) - this.getOrigin().y,
        this.getAnimation().width * this.getScale().x,this.getAnimation().height * this.getScale().y
    )
}