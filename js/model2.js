function landrover(){
var type = prompt("what do you want to model a truck or a van, say 'truck' or 'van'")


      var scene1 = new THREE.Scene();
var scene2 = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera
    ( 40,( window.innerWidth)/(window.innerHeight), 0.1, 1000 );
    
    const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );



var light = new THREE.PointLight(0xffffff);
    light.position.set(0,200,0);
    
    



    camera.position.z = 300;
    
///orbit controls aka camera
controls = new THREE.OrbitControls (camera, renderer.domElement);


if(type=="van"){
  var model = "pic/van.obj";
}
else{
  var model = "pic/truck.obj";
}




///3d model loader
const loader = new THREE.OBJLoader();

// load a resource
loader.load(
	// resource URL
	model,
	// called when resource is loaded
	function ( cube ) {

		scene1.add( cube );

	},
	// called when loading is in progresses
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( error);

	}
);


function animate() {
  light.position.copy(camera.position);
scene1.add(light); 
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