Shape.prototype = new Movable();
Shape.prototype.constructor=Shape;
/**
 * Shape base class
 * @constructor
 */
function Shape() {
    Movable.call(this); //Super
    /**
     * Shapes colour
     * @type {string}
     */
    var colour = "green";
    /**
     * Set shapes colour
     * @param newColour {string}
     */
    this.setColour = function(newColour) { colour = newColour; }
    /**
     * Get shapes colour.
     * @returns {string} Shapes colour.
     */
    this.getColour = function() { return colour; }
}

Rectangle.prototype = new Shape();  //Inherit movable
Rectangle.prototype.constructor=Rectangle;  //Set constructor to Box
/**
 * Rectangle shape
 * @constructor
 */
function Rectangle() {
    Shape.call(this);   //Super
    /**
     * Rectangle width.
     * @type {number}
     */
    var width = 100;
    /**
     * Rectangle height.
     * @type {number}
     */
    var height = 100;
    /**
     * Set width and height.
     * @param newWidth {number}
     * @param newHeight {number}
     */
    this.setSize = function(newWidth,newHeight) { width = newWidth; height = newHeight; }
    /**
     * Set width.
     * @param newWidth {number}
     */
    this.setWidth = function(newWidth) { width = newWidth; }
    /**
     * Set height.
     * @param newHeight [height]
     */
    this.setHeight = function(newHeight)  { height = newHeight; }

    this.getWidth = function() { return width; }
    this.getHeight = function() { return height; }
    this.getSize = function() { var size = new Vector2D(width,height); return size;}

    /**
     * Draw Rectangle Shape.
     * @param c {CanvasRenderingContext2D} Canvas to draw on.
     * @param interpolate {number} Interpolation value.
     */
    this.draw = function(c,interpolate) {
        c.fillStyle = this.getColour();
        //interpolate
        c.fillRect(
            (this.getPrevPos().x + (this.getPos().x - this.getPrevPos().x) * interpolate) - this.getOrigin().x,
            (this.getPrevPos().y + (this.getPos().y - this.getPrevPos().y) * interpolate) - this.getOrigin().y,
            width * this.getScale().x,height * this.getScale().y
        )
    }
}

Circle.prototype = new Shape();
Circle.prototype.constructor=Circle;
/**
 * Circle shape
 * @constructor
 */
function Circle() {
    Shape.call(this);
    var radius = 50.0;
    /**
     * Set circle radius.
     * @param newRadius {number}
     */
    this.setRadius = function(newRadius) { radius = newRadius; }
    /**
     * Get circle radius.
     * @returns {number} Returns radius.
     */
    this.getRadius = function() { return radius; }

    /**
     * Draw circle shape.
     * @param c {CanvasRenderingContext2D} Canvas to draw on.
     * @param interpolate.
     */
    Circle.prototype.draw = function(c,interpolate) {
        c.fillStyle = this.getColour();
        c.beginPath();
        c.arc(
            (this.getPrevPos().x + (this.getPos().x - this.getPrevPos().x) * interpolate) - this.getOrigin().x,
            (this.getPrevPos().y + (this.getPos().y - this.getPrevPos().y) * interpolate) - this.getOrigin().y,
            radius * this.getScale().x,0,Math.PI*2
        );
        c.fill();
    }
}
