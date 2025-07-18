class GraficInterface {
    constructor(network) {
        this.params = {
            showConnections: true,
            showRanges: false,
            lineThickness: 2,
            lineThicknessMin: 1,
            lineThicknessMax: 5
        };

        this.gui = createGui('Network Controls');
        this.gui.addObject(this.params);
        this.network = network;
    }

    draw() {
        this.network.draw(
            this.params.showConnections,
            this.params.showRanges,
            this.params.lineThickness
        );

        // Hover logic: show range circle if mouse is near any node
        for (let node of this.network.nodes) {
            const dx = mouseX - node.position.x;
            const dy = mouseY - node.position.y;
            const distToNode = Math.sqrt(dx * dx + dy * dy);
            if (distToNode <= node.size) {
                noFill();
                stroke(200);
                strokeWeight(1);
                circle(node.position.x, node.position.y, node.range * 2);
            }
        }
    }
}