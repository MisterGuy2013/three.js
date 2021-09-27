function cube(){






  
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 50, (window.innerWidth / window.innerHeight), 0.1, 1000 );
const new_camera = new THREE.PerspectiveCamera( 50, (window.innerWidth / window.innerHeight), 0.1, 1000 );
new_camera.position.z = 15;

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );



///cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;


///renderer


function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.03;
}
animate();







}