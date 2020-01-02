class Snake {
    constructor() {
        //Snake begins in top right corner of the screen and moves left
        this.x_velocity = 1;
        this.y_velocity = 0;
        this.position = new Position(0, 0);
        this.length = 5;
        this.body = [this.position];
        for(let i = 1; i <= this.length - 1; i++){
            let next_position = new Position(this.body[i - 1].x + 10, 0);
            this.body.push(next_position);
        }
        console.log(this.body);
    }

    update_position() {
        //Each time step we update x and y according to our velocities
        for(let i = 0; i < this.length; i++){
            this.position.x += this.x_velocity;
            this.position.y += this.y_velocity;
        }
    }

    update_velocities(new_x_velocity, new_y_velocity) {
        this.x_velocity = new_x_velocity;
        this.y_velocity = new_y_velocity;
    }

    draw(ctx) {
        ctx.fillStyle = "lime";
        for(let i = 0; i < this.length; i++){
            ctx.fillRect(this.body[i].x, this.body[i].y, 10, 10);
        }    
    }
}

class Food {
    constructor(position){
        this.position = position;
    }

    draw(ctx){
        ctx.fillStyle = "red";
        ctx.fillRect(this.position.x, this.position.y, 10, 10);
    }
}

class Position{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

//Setup
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
document.addEventListener("keydown", key_is_pressed);   
setInterval(game, 10);


//Global properties of the game
let no_of_tiles = 20;
snake = new Snake();
food = new Food(new Position(300, 300));

function key_is_pressed(){
    switch(event.keyCode){
        case 37:
            snake.update_velocities(-1, 0);
            console.log("left key");
            break;
        case 38:
            snake.update_velocities(0, -1);
            console.log("up key");
            break;
        case 39:
            snake.update_velocities(1, 0);
            console.log("right key");
            break;
        case 40:
            snake.update_velocities(0, 1);
            console.log("down key");
    }
}

function game(){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    snake.update_position();



    snake.draw(ctx);
    food.draw(ctx);
    

    if(snake.position.x > canvas.width){
        snake.position.x = 0;
    }
    if(snake.position.y > canvas.height){
        snake.position.y = 0;
    }
    if(snake.position.x < 0){
        snake.position.x = canvas.width;
    }
    if(snake.position.y < 0){
        snake.position.y = canvas.height;    
    }
    
}
// document.onkeydown = function(event){
//     switch(event.keyCode){
//         case 37:
//             snake.update_velocities(-1, 0);
//             console.log("left key");
//             break;
//         case 38:
//             snake.update_velocities(0, -1);
//             console.log("up key");
//             break;
//         case 39:
//             snake.update_velocities(1, 0);
//             console.log("right key");
//             break;
//         case 40:
//             snake.update_velocities(0, 1);
//             console.log("down key");
//     }
// }

// ctx.clearRect(0, 0, canvas.width, canvas.height);