let network;
let gui;

document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
});

function setup() {
    createCanvas(windowWidth, windowHeight);
    network = new Network(20, windowWidth, windowHeight, 200, 100);
    gui = new GraficInterface(network);
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
