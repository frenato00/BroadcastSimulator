class Network {
	constructor(number_of_nodes, width = 100, height = 100, min_range = 10, max_range_diff = 50, closenessFactor = 0.5) {
		this.nodes = [];
		this.min_range = min_range;
		this.max_range_diff = max_range_diff;
		for (let i = 0; i < number_of_nodes; i++) {
			let x, y, range;
			for (let j = 0; j < 5; j++) {
				x = Math.random() * width;
				y = Math.random() * height;
				range = Math.random() * max_range_diff + min_range; // range between 10 and 60

				if (this.nodeTooClose(x, y, closenessFactor * range) == -1) {
					break
				}
			}
			this.nodes.push(new Node(x, y, range));
		}
	}

	addNodeAt(x, y) {
		const range = Math.random() * this.max_range_diff + this.min_range;
		this.nodes.push(new Node(x, y, range));
	}

	click(x, y, mousePressed) {
		let index = this.nodeTooClose(x, y, 20);
		if (mousePressed == LEFT) {

			if (index == -1) {
				this.addNodeAt(x, y);
			}
			else {
				this.nodes[index].switchStatus();
			}
		}
		else if (mousePressed == RIGHT && index != -1) {
			this.nodes.splice(index, 1);
		}
	}

	nodeTooClose(x, y, closeness) {
		for (let i = 0; i < this.nodes.length; i++) {
			const dx = this.nodes[i].position.x - x;
			const dy = this.nodes[i].position.y - y;
			if (sqrt(dx * dx + dy * dy) <= closeness)
				return i;
		}
		return -1;
	}

	getActiveNodes() {
		return this.nodes.filter((node) => node.status === true);
	}

	activateAll() {
		this.nodes.forEach((node) => node.activate());
	}

	deactivateAll() {
		this.nodes.forEach((node) => node.deactivate());
	}

	draw(isToDrawConnections = true, isToDrawRanges = false, lineThickness = 1) {
		// Draw connections between nodes in range
		if (isToDrawConnections) {
			this.drawConnections(lineThickness);
		}

		// Draw the nodes themselves
		this.nodes.forEach(node => node.draw(isToDrawRanges));
	}

	drawConnections(thickness) {
		strokeWeight(thickness);

		for (let i = 0; i < this.nodes.length; i++) {
			for (let j = i + 1; j < this.nodes.length; j++) {
				const nodeA = this.nodes[i];
				const nodeB = this.nodes[j];
				if (nodeA.status == false || nodeB.status == false) {
					continue;
				}

				const AtoB = nodeA.isWithinRange(nodeB);
				const BtoA = nodeB.isWithinRange(nodeA);

				if (AtoB && BtoA) {
					// Mutual range: green thick line
					stroke('green');
					line(nodeA.position.x, nodeA.position.y, nodeB.position.x, nodeB.position.y);
				} else if (AtoB || BtoA) {
					// One way range: yellow thin line with arrow
					stroke('yellow');
					strokeWeight(thickness / 2);
					let fromNode, toNode;
					if (AtoB) {
						fromNode = nodeA;
						toNode = nodeB;
					} else {
						fromNode = nodeB;
						toNode = nodeA;
					}
					line(fromNode.position.x, fromNode.position.y, toNode.position.x, toNode.position.y);

					// Draw arrow pointing from 'fromNode' to 'toNode'
					push();
					stroke('yellow');
					fill('yellow');
					const dx = toNode.position.x - fromNode.position.x;
					const dy = toNode.position.y - fromNode.position.y;
					const angle = atan2(dy, dx);

					// Find midpoint of line
					const midX = (fromNode.position.x + toNode.position.x) / 2;
					const midY = (fromNode.position.y + toNode.position.y) / 2;

					translate(midX, midY);
					rotate(angle);

					// Draw small triangle (arrowhead) pointing right
					const arrowSize = 8;
					triangle(0, 0, -arrowSize, arrowSize / 2, -arrowSize, -arrowSize / 2);
					pop();

					strokeWeight(thickness);
				}
			}
		}
	}
}
