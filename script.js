class Position{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
ctx.fillRect(10, 20, 80, 90); //start point is (x, y), we then give it the length and width
initial_position = new Position(250, 250);
let snake = [initial_position]
console.log(snake[0].x)
