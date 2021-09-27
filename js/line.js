function line(){




const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
camera.position.set( 0, 0, 100 );
camera.lookAt( 0, 0, 0 );

const scene = new THREE.Scene();


///line adding 
const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
const new_material = new THREE.LineBasicMaterial( { color: 0x00ffff } );

///new THREE.Vector3( x, y, z(backwards) ) );
const points = [];
points.push( new THREE.Vector3( -50, 0, 0 ) );
points.push( new THREE.Vector3( 0, 10, 0 ) );
points.push( new THREE.Vector3( 10, 0, 0 ) );
points.push( new THREE.Vector3( 0, -20, 0 ) );
points.push( new THREE.Vector3( -50, 0, 0 ) );

const geometry = new THREE.BufferGeometry().setFromPoints( points );

const line = new THREE.Line( geometry, new_material );
scene.add( line );
renderer.render( scene, camera );



}