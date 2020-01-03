//Setup
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
document.addEventListener("keydown", key_is_pressed);  
setInterval(game, 50);

let game_ended = false;

let score = 0;

class Snake {
    constructor() {
        //The snake begins to move right at the start of the game
        this.x_velocity = 1;
        this.y_velocity = 0;
        //The snake has an initial length of this.length
        this.length = 10;
        //We have a head to keep track of the initial body element
        this.head = new Position(250, 300);
        //We have a body array to keep track of all elements in the snake body
        this.body = [];
        this.body.push(this.head);
        for(let i = 0; i < this.length - 1; i++){
            this.body.push(new Position(250 - 10*(i + 1), 300));
        }
        

        
        console.log(this.body);
    }

    eat_food(){
        console.log("EATEN");

        //The initial position of "next_position" doesn't matter since it will be changed with update_position()
        let next_position = new Position(0, 0);
        this.body.push(next_position);
        this.length++;

        //After eating food, we need to generate another one
        //The new position MUST be divisible by 10, since our snake head's position is always divisble by 10
        //Otherwise the snake will never be able to eat the food!
        food.position.x = Math.floor(Math.random() * (canvas.width/10)) * 10;
        food.position.y = Math.floor(Math.random() * (canvas.height/10)) * 10;

        console.log(food.position);

        //update the score whenever we eat some food
        document.getElementById("score").innerHTML = "Score is: " + ++score;
    }

    update_position() {

        //Check if we have hit the food
        if(this.head.x == food.position.x && this.head.y == food.position.y){
            this.eat_food();
        }
  
        
        //Each time step we update x and y according to our velocities
        for(let i = this.length - 1; i > 0; i--){
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;         
        }


        //Update head position according to the current velocity
        this.head.x += this.x_velocity * 10;
        this.head.y += this.y_velocity * 10;

        //Check if the head hit any part of the body
        for(let i = 1; i < this.length; i++){
            if(this.head.x == this.body[i].x && this.head.y == this.body[i].y){
                console.log("GAME ENDED");
                game_ended = true;
            }
        }
        

        //This sequence of if statements is to check if we hit one of the walls
        //This allows us to wrap around
        //Could implement same game without wraparound, where if you hit a wall you die
        //(Exercise for the user)
        if(this.body[0].x > canvas.width){
            this.body[0].x = 0;
        }
        if(this.body[0].y > canvas.height){ 
            this.body[0].y = 0;
        }
        if(this.body[0].x < 0){
            this.body[0].x = canvas.width;
        }
        if(this.body[0].y < 0){
            this.body[0].y = canvas.height;    
        }

        
    }

    update_velocities(new_x_velocity, new_y_velocity) {

        //In snake you can't suddenly move in the opposite direction
        //The left_right and up_down boolean varibles ensure that
        
        let left_right = ((this.x_velocity == -1*new_x_velocity) && this.y_velocity == 0);
        let up_down = ((this.y_velocity == -1*new_y_velocity) && this.x_velocity == 0);
       
        if(left_right || up_down){
            console.log("opp direction");
            return;
        }

        //If the move is valid then update the velocities
        this.x_velocity = new_x_velocity;
        this.y_velocity = new_y_velocity;
    }

    draw() {
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

    draw(){
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

snake = new Snake();
var food = new Food(new Position(300, 400));

function key_is_pressed(){
    switch(event.keyCode){
        case 37:
            snake.update_velocities(-1, 0);
            // console.log("left key");
            break;
        case 38:
            snake.update_velocities(0, -1);
            // console.log("up key");
            break;
        case 39:
            snake.update_velocities(1, 0);
            // console.log("right key");
            break;
        case 40:
            snake.update_velocities(0, 1);
            // console.log("down key");
    }
}

function game(){
    
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    snake.update_position();



    snake.draw();
    food.draw();

    if(game_ended){
        snake = new Snake();
        game_ended = false;
    }
    
    
}