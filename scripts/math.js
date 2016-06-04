/**
 * A 2D vector
 * @param x
 * @param y
 * @constructor
 */
function Vector2D(x,y) {
    this.x = x;
    this.y = y;

    this.set = function(newX, newY) { this.x = newX, this.y = newY; }
    this.add = function(x,y) { return new Vector2D(this.x + x, this.y + y); }
    this.subtract = function(x,y) { return new Vector2D(this.x - x, this.y - y); }
    this.multiply = function(x,y) { return new Vector2D(this.x * x, this.y * y); }
    this.divide = function(x,y) { if (x == 0 || y == 0) { return new Vector2D(0,0); } return new Vector2D(this.x / x, this.y / y); }

    this.getX = function() { return this.x; }
    this.getY = function() { return this.y; }
    this.magnitude = function() { return (Math.sqrt(Math.pow(this.x,2) + Math.pow(this.y,2))) }
    this.normalize = function() {
        var mag = this.magnitude;
        return new Point(this.x / mag, this.y / mag);
    }
}