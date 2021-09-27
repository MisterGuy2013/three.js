function physicsCar(){


  
var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};
if( isMobile.any() ) {alert('Hello mobile person');}
var isMobile = isMobile.any();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 50, (window.innerWidth / window.innerHeight), 0.1, 1000 );
camera.position.x = 15;
camera.position.y = 15;


///sky
scene.background = new THREE.Color( 'rgb(135,206,250)' );



if(!isMobile){
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );}
else{
  var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth/1.5, window.innerHeight/1.5 );}

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
    cube.material.visible = false;
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

defPhysics();


physics.spot = 0;



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
var max = 0.4;

function check(){
      cube.rotation.z = physics.rotationZ(speed, 0, 0.1, 10,10)
      cube.position.y = 0.15;

    if(downPressed) {
    	speed = physics.movement(speed, -100, max, 10, 10);
      physics.update();
      
    }
    





    else if(upPressed) {

    	speed = physics.movement(speed, 100, max, 10, 10);
      physics.update();

      
      
    }
    





    else{
      speed = physics.movement(speed, 0, max, 10, 10);
    }
    if(speed > 0){
        if(leftPressed){
          cube.rotation.y += 0.025;
          ///physics.update("y", "left");
        }
        else if(rightPressed){
          cube.rotation.y -= 0.025;
          ///physics.update("y", "right");
        }
    }
      else if(speed < 0){
        if(leftPressed){
          cube.rotation.y -= 0.015;
        }
        else if(rightPressed){
          cube.rotation.y += 0.015;
        }
    }

}


///wheel works
function seekAnimationTime(animMixer, timeInSeconds){
    animMixer.time=0;
    for(var i=0;i<animMixer._actions.length;i++){
      animMixer._actions[i].time=0;
    }
    animMixer.update(timeInSeconds);
  }






///renderer
var clock = new THREE.Clock();


///running cube physics and movement
setInterval(check, 30);


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

  cube.translateX(-1*speed);
    

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






var sense = 75;

function mobile(){
  if(isMobile){
  if(joystick.deltaY() < -1*sense){
    upPressed = true;
  }
  else{
    upPressed = false;
  }
  if(joystick.deltaY() > sense){
    downPressed = true;
  }
  else{
    downPressed = false;
  }
  if(joystick.deltaX() < -1*sense){
    leftPressed = true;
  }
  else{
    leftPressed = false;
  }
  if(joystick.deltaX() > sense){
    rightPressed = true;
  }
  else{
    rightPressed = false;
  }
  

  }
}



console.log("touchscreen is", VirtualJoystick.touchScreenAvailable() ? "available" : "not available");
	
			var joystick	= new VirtualJoystick({
				container	: document.getElementById('container'),
				mouseSupport	: true,
			});
			joystick.addEventListener('touchStart', function(){
				console.log('down')
			})
			joystick.addEventListener('touchEnd', function(){
				console.log('up')
			})

			setInterval(mobile
				, 1/30 * 1000);



}