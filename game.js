import Matrix from "./Matrix.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const pieceSize = 64;

const board = new Matrix(pieceSize);

document.getElementById("3puzzle").addEventListener("click", function(){
    board.setup(3);
});
document.getElementById("4puzzle").addEventListener("click", function(){
    board.setup(4);
});
document.getElementById("5puzzle").addEventListener("click", function(){
    board.setup(5);
});

document.addEventListener("keydown", function(event) {
    if(event.key == "w" || event.key == "a" || event.key == "s" || event.key == "d") board.move(event.key);
});

function gameLoop(){
    board.draw(canvas, ctx);
}

setInterval(gameLoop, 1000/60);