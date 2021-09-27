function badrender(){



      var scene1 = new THREE.Scene();
var scene2 = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera
    ( 40,( window.innerWidth)/(window.innerHeight), 0.1, 1000 );
    
    const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
    
    var light = new THREE.PointLight(0xffffff);
    light.position.set(-10,20,10);
    scene1.add(light); 
    const red = new THREE.Color("rgb(255, 0, 0)");
    const blue = new THREE.Color("rgb(0, 0, 255)");
    const yellow = new THREE.Color("rgb(252, 244, 0)");
    const green = new THREE.Color("rgb(0, 255, 0)");








    ///adding sun
    var geometry = new THREE.SphereGeometry( 5, 32, 32 );
    var material  = new THREE.MeshBasicMaterial({color: yellow}); 
    var sun = new THREE.Mesh( geometry, material );    
    sun.position.set(-10,20,0);
    scene2.add( sun );

    ///adding cube 2, the red one
    var geometry = new THREE.BoxGeometry( 4,4,4 );
    var material  = new THREE.MeshLambertMaterial({color: red}); 
    var cube1 = new THREE.Mesh( geometry, material );    
    cube1.position.set(5,1,5);
    scene1.add( cube1 );
    
    ///adding cube 2, the blue one
    var geometry = new THREE.BoxGeometry( 4,4,4 );
    var material  = new THREE.MeshLambertMaterial({color: blue}); 
    var cube2 = new THREE.Mesh( geometry, material );   
    cube2.position.set(-15,-1,-5);
    scene1.add( cube2 );

    ///adding cube 3, the green one
    var geometry = new THREE.BoxGeometry( 4,4,4 );
    var material  = new THREE.MeshLambertMaterial({color: green}); 
    var cube3 = new THREE.Mesh( geometry, material );   
    cube3.position.set(30, 15, -30);
    scene1.add( cube3 );
    
    camera.position.z = 100;


controls = new THREE.OrbitControls (camera, renderer.domElement);



const loader = new THREE.OBJLoader();

// load a resource
loader.load(
	// resource URL
	'pic/truck.obj',
	// called when resource is loaded
	function ( object ) {

		scene1.add( object );

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


  cube1.rotation.x += 0.01;
  cube1.rotation.y += 0.03;

  cube2.rotation.x -= 0.01;
  cube2.rotation.y -= 0.03;

  cube3.rotation.x += 0.02;
  cube3.rotation.y -= 0.02;
  
}
animate();


}