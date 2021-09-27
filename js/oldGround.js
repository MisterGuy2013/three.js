function ground(){

var clock = new THREE.Clock();





////key presses

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












      var scene1 = new THREE.Scene();
var scene2 = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera
    ( 40,( window.innerWidth)/(window.innerHeight), 0.1, 1000 );
    
    const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

scene1.background = new THREE.Color( 'rgb(135,206,250)' );




///adding host for the model
var geometry = new THREE.BoxGeometry();
var material = new THREE.MeshBasicMaterial( { color: 'rgb(255,0,0)' } );
var cube = new THREE.Mesh( geometry, material );

cube.material.visible = false;

var color = 0xFFFFFF;
var intensity = 1.5;
var light = new THREE.AmbientLight(color, intensity);
scene1.add(light);
var light2 = new THREE.PointLight(0xffffff);
    light2.position.set(0,200,0);
    



    camera.position.z = 15;
    camera.position.y = 15;
    
///orbit controls aka camera
controls = new THREE.OrbitControls (camera, renderer.domElement);






///global vars
var mixer;
var idleAction;
var left;
var action;

var model;
var clips;








var groundTexture = new THREE.TextureLoader().load( 'pic/grass.jpg' );
groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
groundTexture.repeat.set( 1000, 1000 );
groundTexture.anisotropy = 16;
groundTexture.encoding = THREE.sRGBEncoding;



var groundMaterial = new THREE.MeshStandardMaterial( { map: groundTexture } );

			var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 1000, 1000 ), groundMaterial );
			mesh.position.y = 0;
			mesh.rotation.x = - Math.PI / 2;;
      
			mesh.receiveShadow = true;
			scene1.add( mesh );
     




// Instantiate a loader






function turn(direction){
  if(direction == "left"){

  }

}



function render() {
  requestAnimationFrame(render);
  renderer.render(scene1, camera);
}
render();









}