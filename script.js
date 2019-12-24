class Position{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

class Snake{
    constructor(position){
        self.position = position;
        this.x_velocity = 1;
        this.y_velocity = 1;
    }

    update_position(){
        self.position.x += self.x_velocity * 10;
        self.position.y += self.y_velocity * 10;
    }

    update_velocities(new_x_velocity, new_y_velocity){
        self.x_velocity = new_x_velocity;
        self.y_velocity = new_y_velocity;
    }
    
    draw(ctx){
        ctx.fillRect(self.position.x, self.position.y, 10, 10)
    }
}


let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
initial_position = new Position(250, 250);
snake = new Snake(initial_position);
ctx.fillRect(250, 250, 10, 10);


document.onkeydown = function(event){
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

snake.draw(ctx);
snake.update_position();
console.log(snake.position);
console.log(snake.position);

// ctx.clearRect(0, 0, canvas.width, canvas.height);


