function oldcube(){


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 50, (window.innerWidth / window.innerHeight), 0.1, 1000 );
camera.position.x = 15;
camera.position.y = 15;


const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );









const size = 100;
const divisions = 100;

const gridHelper = new THREE.GridHelper( size, divisions, 0x444444, 0x444444);
scene.add( gridHelper );


var geometry = new THREE.BoxGeometry();
var material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
var cube = new THREE.Mesh( geometry, material );
cube.position.set(0,0.5,0);

controls = new THREE.OrbitControls (camera, renderer.domElement);

scene.add( cube );



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

///renderer
function animate() {
  if(rightPressed) {
        cube.position.z -= 0.1;
    }
    else if(leftPressed) {
        cube.position.z += 0.1;
    }
    if(downPressed) {
        cube.position.x += 0.1;
    }
    else if(upPressed) {
        cube.position.x -= 0.1;
    }
    lastPos = new THREE.Vector3().copy(cube.position);
     let diff = new THREE.Vector3().copy(cube.position).sub(lastPos);
    camera.position.add(diff);
    controls.target.copy(cube.position)
    controls.update();
    lastPos.copy(cube.position);
  controls.update();
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();





}