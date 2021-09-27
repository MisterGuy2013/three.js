function trueGround(){



var groundTexture = new THREE.TextureLoader().load( 'pic/grass.jpg' );
groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
groundTexture.repeat.set( 500, 500 );
groundTexture.anisotropy = 16;
groundTexture.encoding = THREE.sRGBEncoding;






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
var world = new CANNON.World();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 50, (window.innerWidth / window.innerHeight), 0.1, 1000 );
helper = new CannonHelper(scene);
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
///scene.add(light2);


var geometry = new THREE.BoxGeometry();
var material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
var cube = new THREE.Mesh( geometry, material );




controls = new THREE.OrbitControls (camera, renderer.domElement);


const size = 100;
const divisions = 100;




///adding the ground




var groundMaterial = new THREE.MeshStandardMaterial( { map: groundTexture } );


			var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 10000, 10000 ), groundMaterial );
			mesh.position.y = -4.225;
			mesh.rotation.x = - Math.PI / 2;
			mesh.receiveShadow = true;

			scene.add( mesh );


      var geometry = new THREE.PlaneGeometry(10, 10, 10);
var material = new THREE.MeshBasicMaterial({color: 0xff0000, side: THREE.DoubleSide});
var plane = new THREE.Mesh(geometry, material);
plane.rotation.x = Math.PI/2;
///plane.position.y = -4.225;


      var q = plane.quaternion;
var planeBody = new CANNON.Body({
  mass: 0, // mass = 0 makes the body static
  material: groundMaterial,
  shape: new CANNON.Plane(),
  quaternion: new CANNON.Quaternion(-q._x, q._y, q._z, q._w)});
planeBody.position.y = -4.225;
world.add(planeBody) ;



  ///helper.addLights(renderer);
let matrix = [];
		let sizeX = 128,
			sizeY = 128,
			slope = 5,
			steep = 1;

		for (let i = 0; i < sizeX; i++) {
			matrix.push([]);
			for (var j = 0; j < sizeY; j++) {
				var height = Math.cos(i / sizeX * Math.PI * slope) * Math.sin(j/sizeY * Math.PI * slope) * steep + steep;
				//the outer 4 edges of the plane
				if(i===0 || i === sizeX-1 || j===0 || j === sizeY-1)
					height = 0;
				matrix[i].push(height);
			}
		}

		//console.log(matrix);
    var hfShape = new CANNON.Heightfield(matrix, {
			elementSize: 100 / sizeX
		});
		var hfBody = new CANNON.Body({ mass: 0 });
		hfBody.addShape(hfShape);
		hfBody.position.set(-sizeX * hfShape.elementSize / 2, -4, sizeY * hfShape.elementSize / 2);
		hfBody.quaternion.setFromAxisAngle( new CANNON.Vec3(1,0,0), -Math.PI/2);
		world.add(hfBody);
    helper.addVisual(hfBody, 'landscape', "grass");
    hfBody.position.set(-sizeX * hfShape.elementSize / 2, -4, 125);



    matrix = [];
		sizeX = 128,
			sizeY = 128,
			slope = 10,
			steep = 1;

		for (let i = 0; i < sizeX; i++) {
			matrix.push([]);
			for (var j = 0; j < sizeY; j++) {
				var height = Math.cos(i / sizeX * Math.PI * slope) * Math.sin(j/sizeY * Math.PI * slope) * steep + steep;
				//the outer 4 edges of the plane
				if(i===0 || i === sizeX-1 || j===0 || j === sizeY-1)
					height = 0;
				matrix[i].push(height);
			}
		}

		//console.log(matrix);
    var hfShape = new CANNON.Heightfield(matrix, {
			elementSize: 100 / sizeX
		});
		var hfBody = new CANNON.Body({ mass: 0 });
		hfBody.addShape(hfShape);
		hfBody.position.set(-sizeX * hfShape.elementSize / 2, -4, sizeY * hfShape.elementSize / 2);
		hfBody.quaternion.setFromAxisAngle( new CANNON.Vec3(1,0,0), -Math.PI/2);
		world.add(hfBody);
    helper.addVisual(hfBody, 'landscape', "grass");
    hfBody.position.set(-sizeX * hfShape.elementSize / 2, -4, 220);
		



    matrix = [];
		sizeX = 128,
			sizeY = 128,
			slope = 15,
			steep = 1;

		for (let i = 0; i < sizeX; i++) {
			matrix.push([]);
			for (var j = 0; j < sizeY; j++) {
				var height = Math.cos(i / sizeX * Math.PI * slope) * Math.sin(j/sizeY * Math.PI * slope) * steep + steep;
				//the outer 4 edges of the plane
				if(i===0 || i === sizeX-1 || j===0 || j === sizeY-1)
					height = 0;
				matrix[i].push(height);
			}
		}

		//console.log(matrix);
    
    var hfShape = new CANNON.Heightfield(matrix, {
			elementSize: 100 / sizeX
		});
		var hfBody = new CANNON.Body({ mass: 0 });
		hfBody.addShape(hfShape);
		hfBody.position.set(-sizeX * hfShape.elementSize / 2, -4, sizeY * hfShape.elementSize / 2);
		hfBody.quaternion.setFromAxisAngle( new CANNON.Vec3(1,0,0), -Math.PI/2);
		world.add(hfBody);
    helper.addVisual(hfBody, 'landscape', "grass");
    hfBody.position.set(-sizeX * hfShape.elementSize / 2, -4, 315);



  matrix = [0,0.3,0.6,0.9,1.2,1.5,1.7,2,2.4,2.8,3.3];

  function createTetra(verts){
            var offset = -0.35;
            for(var i=0; i<verts.length; i++){
                var v = verts[i];
                v.x += offset;
                v.y += offset;
                v.z += offset;
            }
            return new CANNON.ConvexPolyhedron(verts,
                                                [
                                                    [0,3,2], // -x
                                                    [0,1,3], // -y
                                                    [0,2,1], // -z
                                                    [1,2,3], // +xyz
                                                ]);
        }

         var verts = [new CANNON.Vec3(0,0,5),
                         new CANNON.Vec3(15,5,0),
                         new CANNON.Vec3(0,5,0),
                         new CANNON.Vec3(15,0,5)];
            var offset = -0.35;
            for(var i=0; i<verts.length; i++){
                var v = verts[i];
                v.x += offset;
                v.y += offset;
                v.z += offset;
            }
            var polyhedronShape = createTetra(verts);
            var polyhedronBody = new CANNON.Body({ mass: 0 });
            polyhedronBody.addShape(polyhedronShape);
            polyhedronBody.position.set(-1,-4,-30);


            world.add(polyhedronBody);
        helper.addVisual(polyhedronBody, 'ramp', "normal");

            var verts = [new CANNON.Vec3(0,0,25),
                         new CANNON.Vec3(15,10,0),
                         new CANNON.Vec3(0,10,0),
                         new CANNON.Vec3(15,0,25)];
            var offset = -0.35;
            for(var i=0; i<verts.length; i++){
                var v = verts[i];
                v.x += offset;
                v.y += offset;
                v.z += offset;
            }
            var polyhedronShape = createTetra(verts);
            var polyhedronBody = new CANNON.Body({ mass: 0 });
            polyhedronBody.addShape(polyhedronShape);
            polyhedronBody.quaternion.setFromEuler(0, Math.PI, 0);
            polyhedronBody.position.set(12.5,-4,-50);

    ////make a ramp
        
        world.add(polyhedronBody);
        helper.addVisual(polyhedronBody, 'ramp', material);




        var verts = [new CANNON.Vec3(0,0,0),
                         new CANNON.Vec3(15,10,0),
                         new CANNON.Vec3(0,10,0),
                         new CANNON.Vec3(15,0,0)];
            var offset = -0.35;
            for(var i=0; i<verts.length; i++){
                var v = verts[i];
                v.x += offset;
                v.y += offset;
                v.z += offset;
            }
            var polyhedronShape = createTetra(verts);
            var polyhedronBody = new CANNON.Body({ mass: 0 });
            polyhedronBody.addShape(polyhedronShape);
            polyhedronBody.quaternion.setFromEuler(0, -Math.PI, 0);
            polyhedronBody.position.set(12.5,-4,-50);

    ////make a ramp
        
        world.add(polyhedronBody);
        helper.addVisual(polyhedronBody, 'ramp', "normal");


        var verts = [new CANNON.Vec3(0,5,20),
                         new CANNON.Vec3(15,5,0),
                         new CANNON.Vec3(0,5,0),
                         new CANNON.Vec3(15,5,20)];
            var offset = -0.35;
            for(var i=0; i<verts.length; i++){
                var v = verts[i];
                v.x += offset;
                v.y += offset;
                v.z += offset;
            }
            var polyhedronShape = createTetra(verts);
            var polyhedronBody = new CANNON.Body({ mass: 0 });
            polyhedronBody.addShape(polyhedronShape);
            polyhedronBody.quaternion.setFromEuler(0, Math.PI, 0);
            polyhedronBody.position.set(12.5,-4,-31.40);

    ////make a ramp
        polyhedronBody.addEventListener("collide",function(e){ });
        world.add(polyhedronBody);
        helper.addVisual(polyhedronBody, 'ramp', "normal");

        


/*var geometry = new THREE.PlaneGeometry(100,100,64,64);
var i;
		//make the terrain bumpy
		for (i = 0, l = geometry.vertices.length; i < l; i++) {
		  var vertex = geometry.vertices[i];
		  var value = groundMatrix[i];
		  vertex.z = value ;
		}

		//ensure light is computed correctly
		geometry.computeFaceNormals();
		geometry.computeVertexNormals();

		//create the ground form the geometry and material

		var ground = new THREE.Mesh(geometry,groundMaterial); 
		//rotate 90 degrees around the xaxis so we can see the terrain 
		ground.rotation.x = Math.PI/-2;
    ground.position.y = -4;
		
		//add the ground to the scene
		///scene.add(ground); 






*/





///adding a sphere_geometryvar radius = 1; // m
for(var i = 0; i < 30; i++){
var radius = 2;
var sphereBody = new CANNON.Body({
   mass: 5, // kg
   position: new CANNON.Vec3(50, 10, 0), // m
   shape: new CANNON.Sphere(radius)
});
world.addBody(sphereBody);
helper.addVisual(sphereBody, "normal");
}

var loader = new THREE.FontLoader();
loader.load('pic/font.json', 
function(font){
  var MyWords = "WARNING: EXPLOSIVE";
 var shape = new THREE.TextGeometry(MyWords, {font: font ,size:'4',curveSegments: 20, weight: 'normal',height : 4,hover:30});
 var wrapper = new THREE.MeshBasicMaterial({color: 0x65676,ambient: 0x030303, specular: 0x009900, shininess: 3});
 var words = new THREE.Mesh(shape, wrapper);
 words.position.x=50;
 words.position.z=-10;
 words.position.y=5;
 words.rotateY(-Math.PI/2);
 words.scale.set(0.5, 0.5, 0.5);
 scene.add(words);
});

 

var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var handBrake = false;
var reset = false;
var turbo = false;















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
    if(event.keyCode == 17){
      handBrake = true;
    }
    if(event.keyCode == 70){
      reset = true;
    }
    if(event.keyCode == 32){
      turbo = true;
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
    if(event.keyCode == 17){
      handBrake = false;
    }
    if(event.keyCode == 70){
      reset = false;
    }
    if(event.keyCode == 32){
      turbo = false;
    }
}
var engineForce = 800,
      maxSteerVal = 0.3, maxForce = 4000, brakeF = 3.33, brake = 10;
if(isMobile){
  brakeF = 7.5;
}


function check(){
  
      vehicle.setBrake(0, 0);
			vehicle.setBrake(0, 1);
			vehicle.setBrake(0, 2);
			vehicle.setBrake(0, 3);
      if(turbo){
        vehicle.applyEngineForce(-maxForce, 2);
    vehicle.applyEngineForce(-maxForce, 3);
      }
  else if(upPressed){
    vehicle.applyEngineForce(-engineForce, 2);
    vehicle.applyEngineForce(-engineForce, 3);
  }
  else if(downPressed){
    vehicle.applyEngineForce(engineForce, 2);
    vehicle.applyEngineForce(engineForce, 3);
  }
  else if(handBrake){
    vehicle.applyEngineForce(0, 2);
    vehicle.applyEngineForce(0, 3);
    vehicle.setBrake(brakeF, 0);
			vehicle.setBrake(brakeF, 1);
			vehicle.setBrake(brakeF, 2);
			vehicle.setBrake(brakeF, 3);
  }
  else{
    vehicle.applyEngineForce(0, 2);
    vehicle.applyEngineForce(0, 3);
    vehicle.setBrake(brakeF, 0);
			vehicle.setBrake(brakeF, 1);
			vehicle.setBrake(brakeF, 2);
			vehicle.setBrake(brakeF, 3);
  }
  if(leftPressed){

      vehicle.setSteeringValue(maxSteerVal, 2);
      vehicle.setSteeringValue(maxSteerVal, 3);
  }
  else if(rightPressed){
      vehicle.setSteeringValue( -maxSteerVal, 2);
      vehicle.setSteeringValue( -maxSteerVal, 3);
  }
  else{
    vehicle.setSteeringValue( 0, 2);
      vehicle.setSteeringValue( 0, 3);
  }
  if(reset){
    chassisBody.position.y = 3;
      chassisBody.angularVelocity.set(0, 0, 0); 
      chassisBody.velocity.set(0, 0, 0); // 
      chassisBody.quaternion.setFromEuler(0, 0, 0);
  }
}




window.addEventListener('keydown', keyDownHandler);
window.addEventListener('keyup', keyUpHandler);
setInterval(check,30);





var geometry = new THREE.PlaneGeometry(10, 10, 10);
var material = new THREE.MeshBasicMaterial({color: 0xff0000, side: THREE.DoubleSide});
var plane = new THREE.Mesh(geometry, material);
plane.rotation.x = Math.PI/2;

var sunlight = new THREE.DirectionalLight(0xffffff, 2.0);
sunlight.position.set(-100, 100, 0);
scene.add(sunlight)

/**
* Physics
**/


world.broadphase = new CANNON.SAPBroadphase(world);
world.gravity.set(0, -10, 0);
world.defaultContactMaterial.friction = 0;

var groundMaterial = new CANNON.Material('groundMaterial');
var wheelMaterial = new CANNON.Material('wheelMaterial');
var wheelGroundContactMaterial = new CANNON.ContactMaterial(wheelMaterial, groundMaterial, {
    friction: 0,
    restitution: 0,
});

world.addContactMaterial(wheelGroundContactMaterial);

// car physics body

var chassisShape = new CANNON.Box(new CANNON.Vec3(1, 0.3, 2));
var chassisBody = new CANNON.Body({mass: 250});
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
  radius: 0.45,
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
var lastPos = new THREE.Vector3(0,0,0);
function animate() {
  helper.updateBodies(world);
  updatePhysics();
  ///light.position.copy(camera.position);
  ///scene.add(light); 







    

    
     let diff = new THREE.Vector3().copy(box.position).sub(lastPos);

    camera.position.add(diff);

    controls.target.copy(box.position)
    controls.update();
    lastPos.copy(box.position);
    controls.update();



	requestAnimationFrame( animate );
	renderer.render( scene, camera );
  lastPos = new THREE.Vector3().copy(box.position);
}
animate();






var sense = 50;

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