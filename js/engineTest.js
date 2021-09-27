
defPhysics();


physics.spot = 0;

console.log(physics.movement(2.7, 0, 30, 10, 10));

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;







function keyDownHandler(event) {
    if(event.keyCode == 68) {
        rightPressed = true;
    }
    else if(event.keyCode == 65) {
        leftPressed = true;
    }
    if(event.keyCode == 83) {
    	downPressed = true;
    }
    else if(event.keyCode == 87) {
    	upPressed = true;
    }
}
function keyUpHandler(event) {
    if(event.keyCode == 68) {
        rightPressed = false;
    }
    else if(event.keyCode == 65) {
        leftPressed = false;
    }
    if(event.keyCode == 83) {
    	downPressed = false;
    }
    else if(event.keyCode == 87) {
    	upPressed = false;
    }
}

var speed = 0;
var current;

function check(){
    console.log("old velocity: " + x);
    if(downPressed) {
    	speed = physics.movement(speed, -100, 30, 10, 10);
      physics.update();
    }
    else if(upPressed) {
    	speed = physics.movement(speed, 100, 30, 10, 10);
      physics.update();
    }
    else{
      speed = physics.movement(speed, 0, 30, 10, 10);
    }
  console.log("speed: " + speed);
}
var run = setInterval(check, 200);