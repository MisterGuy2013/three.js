function gltf_model(){



      var scene1 = new THREE.Scene();
var scene2 = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera
    ( 40,( window.innerWidth)/(window.innerHeight), 0.1, 1000 );
    
    const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );



///adding host for the model
var geometry = new THREE.BoxGeometry();
var material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
var cube = new THREE.Mesh( geometry, material );

cube.material.visible = false;

var color = 0xFFFFFF;
var intensity = 1;
var light = new THREE.AmbientLight(color, intensity);
var light2 = new THREE.PointLight(0xffffff);
    light2.position.set(0,200,0);
    



    camera.position.z = 5;
    
///orbit controls aka camera
controls = new THREE.OrbitControls (camera, renderer.domElement);



// Instantiate a loader
var loader = new THREE.GLTFLoader();



// Load a glTF resource
loader.load(
	// resource URL
  
	'pic/car.glb',
	// called when the resource is loaded
	function ( gltf ) {

		cube.add( gltf.scene );

		gltf.animations; // Array<THREE.AnimationClip>
		gltf.scene; // THREE.Group
		gltf.scenes; // Array<THREE.Group>
		gltf.cameras; // Array<THREE.Camera>
		gltf.asset; // Object

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


cube.position.z = -0.5;
scene1.add(cube);


scene1.add(light); 
function animate() {


light2.position.copy(camera.position * -1);
scene1.add(light2); 
	requestAnimationFrame( animate );
  camera.lookAt(new THREE.Vector3(0,0,0));
  

  renderer.render(scene1, camera);
	
	//don't let renderer eraase canvas
	renderer.autoClear = false;
	
	//render scene2
    renderer.render(scene2, camera);
	
	//let renderer clean next time
	// (next time is when we render scene1 again)
	renderer.autoClear = true;

  
}
animate();









}