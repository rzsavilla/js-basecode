/**
 * Base class allows objects to be transformed.
 * @constructor
 */
function Transformable() {
    /**
     * Objects position
     * @type {Vector2D}
     */
    var position = new Vector2D(0.0,0.0);
    /**
     * Objects position in previous tick, used for interpolation
     * @type {Vector2D}
     */
    var prevPos = new Vector2D(0.0,0.0);
    /**
     * Objects heading (normalized)
     * @type {Vector2D}
     */
    var heading = new Vector2D(0.0,0.0);
    /**
     * Objects origin
     * @type {Vector2D}
     */
    var origin = new Vector2D(0.0,0.0);
    /**
     * Objects scale (x,y);
     * @type {Vector2D}
     */
    var scale = new Vector2D(1.0,1.0);

    //------------Setters-----------------------
    /**
     * Set position variable.
     * @param newX New X position
     * @param newY New Y position
     */
    this.setPosition = function(newX,newY) {
        prevPos = new Vector2D(position.x,position.y);
        position.x = newX;
        position.y = newY;
    }
    /**
     * Set X position
     * @param newX {number} New position.x
     */
    this.setPosX = function(newX) { prevPos.x = position.x; position.x = newX; }
    /**
     * Set Y position
     * @param newY {number} New position.y
     */
    this.setPosY = function(newY) { prevPos.y = position.y; position.y = newY; }
    /**
     * Set heading
     * @param x [number] New heading.x
     * @param y [number] New heading.y
     */
    this.setHeading = function(newX,newY) { heading.x = newX, heading.y = newY; }
    /**
     * Set Origin
     * @param newX {number} New origin.x
     * @param newY {number} New origin.y
     */
    this.setOrigin = function(newX,newY) { origin.x = newX, origin.y = newY; }
    /**
     * Set Scale
     * @param newX {number} New scale.x
     * @param newY {number} New scale.y
     */
    this.setScale = function(newX,newY) { scale.x = newX, scale.y = newY; }

    //------------Getters-----------------------
    /**
     * Return position
     * @returns {Vector2D} Returns position
     */
    this.getPos = function() { return position; }
    /**
     * Get previous tick position
     * @returns {Vector2D} Returns prevPos
     */
    this.getPrevPos = function() { return prevPos; }
    /**
     * Get heading
     * @returns {Vector2D} Returns heading
     */
    this.getHeading = function() { return heading; }
    /**
     * get Origin
     * @returns {Vector2D} Returns origin
     */
    this.getOrigin = function() { return origin; }
    /**
     * get scale
     * @returns {Vector2D} Returns scale
     */
    this.getScale = function() { return scale; }
}

Movable.prototype = new Transformable();    //Inherit Transformable
Movable.prototype.constructor=Movable;      //Set constructor
/**
 * Movable base clas
 * @constructor
 */
function Movable() {
    Transformable.call(this);   //super
    /**
     * Force applied to the object
     * @type {number}
     */
    var force = 0.0;
    /**
     * Objects mass
     * @type {number}
     */
    var mass = 1.0;

    /**
     * Set force applied to object
     * @param newForce {number}
     */
    this.setForce = function(newForce) { force = newForce; }
    /**
     * Set objects mass
     * @param newMass {number}
     */
    this.setMass = function(newMass) { mass = newMass; }

    /**
     * Get force being applied to object
     * @returns {number}
     */
    this.getForce = function() { return force; }
    /**
     * Get objects mass
     * @returns {number}
     */
    this.getMass = function() { return mass; }
    /**
     * Calculate acceleration (A=F/M)
     * @returns {number} Returns acceleration
     */
    this.getAcceleration = function() { return force / mass; }
    /**
     * Update objects position
     * @param delta Applies time-step to the movement.
     */
    this.updateMove = function(delta) {
        var acc = this.getAcceleration();
        this.setPosition(
            this.getPos().x += this.getHeading().x * acc * delta,
            this.getPos().y += this.getHeading().y * acc * delta
        )
    }
}