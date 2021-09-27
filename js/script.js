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