function movingcube(){

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 50, (window.innerWidth / window.innerHeight), 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const yellow = new THREE.Color("rgb(252, 244, 0)");

///orbit
var geometry = new THREE.BoxGeometry(1,1,1);
var material = new THREE.MeshBasicMaterial( { color: yellow } );
var sun = new THREE.Mesh( geometry, material );
sun.position.set(-5,5,5);
///adds grid
const size = 10;
const divisions = 10;

const gridHelper = new THREE.GridHelper( size, divisions );
scene.add( gridHelper );

var geometry = new THREE.BoxGeometry();
var material = new THREE.MeshLambertMaterial( { color: 0xffff00 } );
const orbit = new THREE.Mesh( geometry, material );


///adds lighting
var light = new THREE.PointLight(0xffffff);
    light.position.set(-5,5,5);
scene.add(light); 

orbit.add( camera ); 
scene.add( orbit );
scene.add( sun );
                


camera.position.z = 15;
camera.position.y = 5;
camera.position.x = 5;


///renderer

camera.lookAt(new THREE.Vector3(0,0,0));
function animate() {
  
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
  orbit.rotation.x += 0.02;
  orbit.rotation.y += 0.02;
}
animate();

}