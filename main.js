let network;
let gui;
function setup() {
    createCanvas(windowWidth,windowHeight);
    network = new Network(20,windowWidth,windowHeight, 200, 100);
    gui = new Gui(network);
    network.activateAll();
    console.log(network.getActiveNodes());
}

function draw() {
    background(50);
    gui.draw();
}

function mousePressed() {
	if (network) {
		network.click(mouseX, mouseY, mouseButton);
	}
}
