function model_four(){

const clock = new THREE.Clock();





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

scene1.background = new THREE.Color( 0xff0000 );




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
    
///orbit controls aka camera
controls = new THREE.OrbitControls (camera, renderer.domElement);






///global vars
var mixer;
var idleAction;
var left;
var action;

var model;
var clips;




// Instantiate a loader
var loader = new THREE.GLTFLoader();



// Load a glTF resource
loader.load(
	// resource URL
  
	'pic/scout.glb',
	// called when the resource is loaded
	function ( gltf ) {
    mixer = new THREE.AnimationMixer( gltf.scene );
    model = gltf.scene;
  let left = mixer.clipAction( gltf.animations[ 0 ] );
  left.timescale = 0;
    left.play();
    clips = gltf.scene.animations;
    
		cube.add( gltf.scene );
left.play();
		// Object
  
	},
	// called while loading is progressing
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( error );

	}
);
cube.position.y = 2;

scene1.add(cube);






function seekAnimationTime(animMixer, timeInSeconds){
    animMixer.time=0;
    for(var i=0;i<animMixer._actions.length;i++){
      animMixer._actions[i].time=0;
    }
    animMixer.update(timeInSeconds)
  }



function turn(direction){
  if(direction == "left"){

  }

}

function animate() {
    
light2.position.copy(camera.position);
scene1.add(light2); 
	requestAnimationFrame( animate );
  camera.lookAt(new THREE.Vector3(0,0,0));
  
const delta = clock.getDelta();
try{mixer.update( delta);
  if(leftPressed==true){
  	seekAnimationTime(mixer,2);
  }
  else if(rightPressed==true){
  	seekAnimationTime(mixer,0.833);
  }
  else{
    seekAnimationTime(mixer,0);
  }
}
  catch(err) {}

  renderer.render(scene1, camera);
	
	//don't let renderer eraase canva
  
  
}
animate();









}