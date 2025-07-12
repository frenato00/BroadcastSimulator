// Node.js-style JavaScript (or use in browser with module bundler)
let nodeIdCounter = 0;
class Node {
    constructor(x, y, range, size = 10, color = null, status = false) {
        this.id = nodeIdCounter++;
        this.position = { x, y };
        this.range = range;
        this.sq_range = range*range;
        if (color == null) this.color = [255,0,0];
        else this.color = color;
        this.status = status;
        this.size = size;
    }
  
    activate() {
        this.status = true;
        this.color = [0,255,0];
    }
  
    deactivate() {
        this.status = false;
        this.color = [255,0,0];
    }

    switchStatus() {
        this.status = !this.status;
        this.color = this.status? [0,255,0] : [255,0,0];
    }
  
    isWithinRange(otherNode) {
        const dx = this.position.x - otherNode.position.x;
        const dy = this.position.y - otherNode.position.y;
        return dx * dx + dy * dy <= this.sq_range;
    }

    draw(isToDrawRange = false) {
        if (isToDrawRange) {
            noFill();
            stroke(150);
            circle(this.position.x, this.position.y, this.range * 4);
          }
        fill(...this.color);
        noStroke();
        circle(this.position.x, this.position.y, this.size); // small circle
    }
}
