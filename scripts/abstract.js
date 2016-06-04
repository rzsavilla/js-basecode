/**
 * Transforamtion base class
 * @constructor
 */
function Transformable() {
    this.position = new Vector2D(0.0,0.0);
    this.prevPos = new Vector2D(0.0,0.0);
    this.heading = new Vector2D(0.0,0.0);
    this.origin = new Vector2D(0.0,0.0);
    this.scale = new Vector2D(1.0,1.0);

    this.setPosition = function(newX,newY) {
        this.prevPos = new Vector2D(this.position.x,this.position.y);
        this.position.x = newX;
        this.position.y = newY;
    }
}

Movable.prototype = new Transformable();
Movable.prototype.constructor=Movable;
/**
 * Movable base clas
 * @constructor
 */
function Movable() {this.force = 0.0;
    this.mass = 1.0;
    this.getAcceleration = function() { return this.force / this.mass; }
    this.updateMove = function(delta) {
        var acc = this.getAcceleration();
        this.setPosition(
            this.position.x += this.heading.x * acc * delta,
            this.position.y += this.heading.y * acc * delta
        )
    }
}

Movable.prototype.force = 0.0;
Movable.prototype.mass = 1.0;
Movable.prototype.getAcceleration = function() { return this.force / this.mass; }
Movable.prototype.updateMove = function(delta) {
    var acc = this.getAcceleration();
    Movable.prototype.setPosition(
        this.position.x += this.heading.x * acc * delta,
        this.position.y += this.heading.y * acc * delta
    )

}