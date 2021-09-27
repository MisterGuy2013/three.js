function car(){



const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 50, (window.innerWidth / window.innerHeight), 0.1, 1000 );
camera.position.x = 15;
camera.position.y = 15;


///sky
scene.background = new THREE.Color( 'rgb(135,206,250)' );




const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var light = new THREE.PointLight(0xffffff);
    light.position.set(0,200,0);
var color = 0xFFFFFF;
var intensity = 1.5;
var light2 = new THREE.AmbientLight(color, intensity);
scene.add(light2);


var geometry = new THREE.BoxGeometry();
var material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
var cube = new THREE.Mesh( geometry, material );

cube.material.visible = false;


controls = new THREE.OrbitControls (camera, renderer.domElement);


const size = 100;
const divisions = 100;




///adding the ground
var groundTexture = new THREE.TextureLoader().load( 'pic/grass.jpg' );
groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
groundTexture.repeat.set( 10000, 10000 );
groundTexture.anisotropy = 16;
groundTexture.encoding = THREE.sRGBEncoding;



var groundMaterial = new THREE.MeshStandardMaterial( { map: groundTexture } );

			var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 10000, 10000 ), groundMaterial );
			mesh.position.y = 0.0;
			mesh.rotation.x = - Math.PI / 2;
			mesh.receiveShadow = true;
			scene.add( mesh );








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
    cube.position.y = 0.15;
		cube.add( gltf.scene );
left.play();
		// Object
  
	});

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


///wheel works
function seekAnimationTime(animMixer, timeInSeconds){
    animMixer.time=0;
    for(var i=0;i<animMixer._actions.length;i++){
      animMixer._actions[i].time=0;
    }
    animMixer.update(timeInSeconds)
  }






///renderer
var clock = new THREE.Clock();





function animate() {
  light.position.copy(camera.position);
  scene.add(light); 

  const delta = clock.getDelta();



try{

  mixer.update( delta);
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


    if(downPressed) {
        cube.translateX( 0.1 );
        if(leftPressed){
          cube.rotation.y += 0.015;
        }
        else if(rightPressed){
          cube.rotation.y -= 0.015;
        }
    }
    else if(upPressed) {
        cube.translateX( -0.3 );
        if(leftPressed){
          cube.rotation.y += 0.025;
        }
        else if(rightPressed){
          cube.rotation.y -= 0.025;
        }
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