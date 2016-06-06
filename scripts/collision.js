/* Check for collision between bounding box/circle */

AABB.prototype = new Rectangle();
AABB.prototype.constructor=AABB;
/**
 * Axis-Aligned Bounding Box
 * @constructor
 */
function AABB() {
    Rectangle.call(this);
    /**
     * Check for collision
     * @param other Bounding to collide with
     * @returns {boolean} Returns true if collision has occured
     */
    this.collision = function (other) {
        if (other instanceof AABB) {
            //Collision with am Axis Aligned Bounding Box
            console.log("Box");
            var pos1 = this.getPos().subtract(this.getOrigin().x, this.getOrigin().y);
            var pos2 = other.getPos().subtract(other.getOrigin().x,other.getOrigin().y);
            if (
                pos1.x < pos2.x + other.getWidth() &&
                pos1.x + this.getWidth() > pos2.x &&
                pos1.y < pos2.y + other.getHeight() &&
                pos1.y + this.getHeight() > pos2.y
            )
            { return true; /* Collision*/ }
            return false; //No Collision
        }
    }
}

BC.prototype = new Circle();
BC.prototype.constructor=BC;
/**
 * Bounding Circle
 * @constructor
 */
function BC() {
    Circle.call(this);
    /**
     * Check for collision.
     * @param other Bounding to collide with
     * @returns {boolean} Returns true if collision has occured
     */
    this.collision = function(other) {
        if (other instanceof BC) {
            //Check for collision with bounding circle.
            var x = this.getPos().x - other.getPos().x;
            var y = this.getPos().y - other.getPos().y;
            var dist = Math.sqrt(x * x + y * y);
            if (dist < this.getRadius() + other.getRadius()) {
                return true /* Collision */
            }
            return false; //No Collision
        }
    }
}