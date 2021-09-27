function newCar(){
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
			mesh.position.y = -0.225;
			mesh.rotation.x = - Math.PI / 2;
			mesh.receiveShadow = true;
			scene.add( mesh );














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



function navigate(e) {
  if (e.type != 'keydown' && e.type != 'keyup') return;
  var keyup = e.type == 'keyup';
  vehicle.setBrake(0, 0);
  vehicle.setBrake(0, 1);
  vehicle.setBrake(0, 2);
  vehicle.setBrake(0, 3);

  var engineForce = 800,
      maxSteerVal = 0.3, maxForce = 4000;
  switch(e.keyCode) {

    case 87: // forward
      vehicle.applyEngineForce(keyup ? 0 : -engineForce, 2);
      vehicle.applyEngineForce(keyup ? 0 : -engineForce, 3);
      break;
    case 81: // mega boost
      vehicle.applyEngineForce(keyup ? 0 : -maxForce, 2);
      vehicle.applyEngineForce(keyup ? 0 : -maxForce, 3);
      break;

    case 83: // backward
      vehicle.applyEngineForce(keyup ? 0 : engineForce, 2);
      vehicle.applyEngineForce(keyup ? 0 : engineForce, 3);
      break;

    case 68: // right
      vehicle.setSteeringValue(keyup ? 0 : -maxSteerVal, 2);
      vehicle.setSteeringValue(keyup ? 0 : -maxSteerVal, 3);
      break;

    case 65: // left
      vehicle.setSteeringValue(keyup ? 0 : maxSteerVal, 2);
      vehicle.setSteeringValue(keyup ? 0 : maxSteerVal, 3);
      break;
    case 32: // brake
      vehicle.setBrake(10, 0);
  vehicle.setBrake(10, 1);
  vehicle.setBrake(10, 2);
  vehicle.setBrake(10, 3);
      break;
  }
}

window.addEventListener('keydown', navigate)
window.addEventListener('keyup', navigate)






var geometry = new THREE.PlaneGeometry(10, 10, 10);
var material = new THREE.MeshBasicMaterial({color: 0xff0000, side: THREE.DoubleSide});
var plane = new THREE.Mesh(geometry, material);
plane.rotation.x = Math.PI/2;

var sunlight = new THREE.DirectionalLight(0xffffff, 1.0);
sunlight.position.set(-10, 10, 0);
scene.add(sunlight)

/**
* Physics
**/

var world = new CANNON.World();
world.broadphase = new CANNON.SAPBroadphase(world);
world.gravity.set(0, -10, 0);
world.defaultContactMaterial.friction = 0;

var groundMaterial = new CANNON.Material('groundMaterial');
var wheelMaterial = new CANNON.Material('wheelMaterial');
var wheelGroundContactMaterial = new CANNON.ContactMaterial(wheelMaterial, groundMaterial, {
    friction: 0.3,
    restitution: 0,
    contactEquationStiffness: 1000,
});

world.addContactMaterial(wheelGroundContactMaterial);

// car physics body

var chassisShape = new CANNON.Box(new CANNON.Vec3(1, 0.3, 2));
var chassisBody = new CANNON.Body({mass: 150});
chassisBody.addShape(chassisShape);
chassisBody.position.set(0, 3, 0);
chassisBody.angularVelocity.set(0, 0, 0); // initial velocity

// car visual body
var geometry = new THREE.BoxGeometry(2, 0.9, 4); // double chasis shape
var material = new THREE.MeshBasicMaterial({color: 0xffff00, side: THREE.DoubleSide});
var box = new THREE.Mesh(geometry, material);




////loading the model
var loader = new THREE.GLTFLoader();



// Load a glTF resource
loader.load(
	// resource URL
  
	'pic/NoWheel.glb',
	// called when the resource is loaded
	function ( gltf ) {
    box.material.visible = false;
    ///box.position.y = 0.15;
    gltf.scene.rotation.y = Math.PI / 2;
    gltf.scene.position.y = -0.50;
		box.add( gltf.scene );
		// Object
  
	});
scene.add(box);



// parent vehicle object
vehicle = new CANNON.RaycastVehicle({
  chassisBody: chassisBody,
  indexRightAxis: 0, // x
  indexUpAxis: 1, // y
  indexForwardAxis: 2, // z
});

// wheel options
var options = {
  radius: 0.25,
  directionLocal: new CANNON.Vec3(0, -1, 0),
  suspensionStiffness: 85,
  suspensionRestLength: 0.4,
  frictionSlip: 5,
  dampingRelaxation: 1.3,
  dampingCompression: 2.3,
  maxSuspensionForce: 200000,
  rollInfluence:  0.01,
  axleLocal: new CANNON.Vec3(-1, 0, 0),
  chassisConnectionPointLocal: new CANNON.Vec3(1, 1, 0),
  maxSuspensionTravel: 0.20,
  customSlidingRotationalSpeed: -30,
  useCustomSlidingRotationalSpeed: true,
};

var axlewidth = 0.7;
options.chassisConnectionPointLocal.set(axlewidth, 0, -1);
options.directionLocal = new CANNON.Vec3(-0.575,-1.3,0.625);
vehicle.addWheel(options);

options.chassisConnectionPointLocal.set(-axlewidth, 0, -1);
options.directionLocal = new CANNON.Vec3(0.575,-1.3,0.625);
vehicle.addWheel(options);

options.chassisConnectionPointLocal.set(axlewidth, 0, 1);
options.directionLocal = new CANNON.Vec3(-0.575,-1.3,-0.35);
vehicle.addWheel(options);

options.chassisConnectionPointLocal.set(-axlewidth, 0, 1);
options.directionLocal = new CANNON.Vec3(0.575,-1.3,-0.35);
vehicle.addWheel(options);

vehicle.addToWorld(world);



wheelNum = 0;
// car wheels
var wheelBodies = [],
    wheelVisuals = [];
vehicle.wheelInfos.forEach(function(wheel) {
  var shape = new CANNON.Cylinder(wheel.radius, wheel.radius, wheel.radius / 2, 20);
  var body = new CANNON.Body({mass: 1, material: wheelMaterial});
  var q = new CANNON.Quaternion();
  q.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), Math.PI / 2);
  body.addShape(shape, new CANNON.Vec3(), q);
  wheelBodies.push(body);
  // wheel visual body
  var geometry = new THREE.CylinderGeometry( wheel.radius, wheel.radius, 0.2, 32 );
  var material = new THREE.MeshPhongMaterial({
    color: 'rgb(16, 16, 16)',
    emissive: 'rgb(16, 16, 16)',
    side: THREE.DoubleSide,
    flatShading: true,
  });
  var cylinder = new THREE.Mesh(geometry, material);
  cylinder.geometry.rotateZ(Math.PI/2);
  wheelVisuals.push(cylinder);
  scene.add(cylinder);
  var loader = new THREE.GLTFLoader();



// Load a glTF resource
loader.load(
	// resource URL
  
	'pic/wheel.glb',
	// called when the resource is loaded
	function ( gltf ) {
    cylinder.material.visible = false;
    ///box.position.y = 0.15;
    gltf.scene.position.y = 0.0;
    console.log(wheelNum);
    if(wheelNum == 0 || wheelNum==2){
      
      gltf.scene.rotation.y = Math.PI / -2;
    }
    else{
      gltf.scene.rotation.y = Math.PI / 2;
    }
    
		cylinder.add( gltf.scene );
    wheelNum+=1;
		// Object
  
	});
  
});

// update the wheels to match the physics
world.addEventListener('postStep', function() {
  for (var i=0; i<vehicle.wheelInfos.length; i++) {
    vehicle.updateWheelTransform(i);
    var t = vehicle.wheelInfos[i].worldTransform;
    // update wheel physics
    wheelBodies[i].position.copy(t.position);
    wheelBodies[i].quaternion.copy(t.quaternion);
    // update wheel visuals
    wheelVisuals[i].position.copy(t.position);
    wheelVisuals[i].quaternion.copy(t.quaternion);
  }
});

var q = plane.quaternion;
var planeBody = new CANNON.Body({
  mass: 0, // mass = 0 makes the body static
  material: groundMaterial,
  shape: new CANNON.Plane(),
  quaternion: new CANNON.Quaternion(-q._x, q._y, q._z, q._w)
});
world.add(planeBody)

/**
* Main
**/

function updatePhysics() {
  world.step(1/60);
  // update the chassis position
  box.position.copy(chassisBody.position);
  box.quaternion.copy(chassisBody.quaternion);
}

clock = new THREE.Clock();
function animate() {
  updatePhysics();
  light.position.copy(camera.position);
  scene.add(light); 







    

    lastPos = new THREE.Vector3().copy(box.position);
     let diff = new THREE.Vector3().copy(box.position).sub(lastPos);
    camera.position.add(diff);
    controls.target.copy(box.position)
    controls.update();
    lastPos.copy(box.position);
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