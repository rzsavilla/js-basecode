Shape.prototype = new Movable();
Shape.prototype.constructor=Shape;
/**
 * Shape base class
 * @constructor
 */
function Shape() {
    this.colour = "red";
    this.setColour = function(newColour) { this.colour = newColour; }
}

Rectangle.prototype = new Shape();  //Inherit movable
Rectangle.prototype.constructor=Rectangle;  //Set constructor to Box
/**
 * Rectangle shape
 * @constructor
 */
function Rectangle() {
    this.width = 100;
    this.height = 100;
    /**
     * Draw Rectangle Shape
     * @param c
     * @param interpolate
     */
    this.draw = function(c,interpolate) {
        c.fillStyle = this.colour;
        //interpolate
        c.fillRect(
            (this.prevPos.x + (this.position.x - this.prevPos.x) * interpolate) - this.origin.x,
            (this.prevPos.y + (this.position.y - this.prevPos.y) * interpolate) - this.origin.y,
            this.width * this.scale.x,this.height * this.scale.y
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
    this.radius = 50.0;

    /**
     * Draw circle shape
     * @param c
     * @param interpolate
     */
    this.draw = function(c,interpolate) {
        c.fillStyle = this.colour;
        c.beginPath();
        c.arc(
            ((this.prevPos.x + (this.position.x - this.prevPos.x) * interpolate) - this.origin.x),
            ((this.prevPos.y + (this.position.y - this.prevPos.y) * interpolate) - this.origin.y),
            this.radius * this.scale.x,0,Math.PI*2
        );
        c.fill();
    }
}