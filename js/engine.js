



function roundToTwo(num) {    
    return +(Math.round(num + "e+2")  + "e-2");
}





function defPhysics() {





physics = function(x, power, max, mass){
    




  function movement(x, power, max, mass, density) {
    var spot = Math.round(physics.spot);
    var speed = physics.speed;
    var rate = x;
    var inc = max;
    var chartSpeed = inc/10;

    if(power > 0){
      if(rate < 0){
        physics.reverseZ = true;
      }
      if(rate <= 0 && physics.rotationZ.overRun == false){
      physics.acc = 'forwards';
        physics.rotationZ.overRun = true;
      }
      else if(rate > 0){physics.rotationZ.overRun = false}


      if(max > rate){
        physics.spot += 1;
        spot = Math.round(physics.spot);




        if(physics.spot >= 0){
        return chartSpeed *speed[spot];
        }
        else{
          return -1 * chartSpeed *speed[-1*spot];
        }



        
      }
      else{
        return rate;
      }
    }

    ///If the engine power is reverse
    else if(power < 0){
      if(rate > 0){
        physics.reverseZ = true;
      }
      if(rate >= 0 && physics.rotationZ.overRun == false){
      physics.acc = 'backwards';
        physics.rotationZ.overRun = true;
      }
      else if(rate < 0){physics.rotationZ.overRun = false}
      
      
      
      if((-1*max) < rate){
        physics.spot -= 1;

        spot = Math.round(physics.spot);



        if(physics.spot >= 0){
        return chartSpeed *speed[spot];
        }
        else{
          return -1 * chartSpeed *speed[-1*spot];
        }
        




      }
      else{
        return rate;
      }
    }
    else{
      if(physics.spot < 0){
        physics.spot += 0.3;
        return -1 * chartSpeed *speed[-1*spot];
      }
      else if(physics.spot > 0){
        physics.spot -= 0.3;
        return chartSpeed *speed[spot];
      }
      else{
        return 0;
      }
      
      
    }
  };




  function rotationZ(x, power, maxTurn, mass, density, revForce){
    var speed = physics.speed;
    var max = physics.maxZ[10]/maxTurn;

    //testing to see which direction the car is going
    if(physics.acc == "forwards"){
      ///testing to see in rotation is complete
      if(physics.rotationZ.spot != 10 && physics.rotationZ.movement == "up"){
      physics.rotationZ.spot += 2;
      }


      ///going back to rotation frame 0
      else{
        if(physics.rotationZ.spot == 10 && physics.rotationZ.movement == "up"){
          physics.rotationZ.movement = "down";
        }
        else if(physics.rotationZ.spot == 0){
          physics.acc = false;
          physics.reverseZ = false;
          physics.rotationZ.movement = "up";
          physics.rotationZ.spot = 0;}
        else if(physics.rotationZ.movement == "down"){
          physics.rotationZ.spot -=0.5;
        }
        }
    
        

      var spot = Math.round(physics.rotationZ.spot);
      if(physics.reverseZ == true){
        return 2.25*(physics.maxZ[spot] / -max);
      }
      else{
      return physics.maxZ[spot] / -max;}
    }



    else if(physics.acc == "backwards"){
      ///testing to see in rotation is complete
      if(physics.rotationZ.spot != 10 && physics.rotationZ.movement == "up"){
      physics.rotationZ.spot += 2;
      }


      ///going back to rotation frame 0
      else{
        if(physics.rotationZ.spot == 10 && physics.rotationZ.movement == "up"){
          physics.rotationZ.movement = "down";
        }
        else if(physics.rotationZ.spot == 0){
          physics.acc = false;
          physics.reverseZ = false;
          physics.rotationZ.movement = "up";
          physics.rotationZ.spot = 0;}
        else if(physics.rotationZ.movement == "down"){
          physics.rotationZ.spot -=0.5;
        }
        }
    
        


      var spot = Math.round(physics.rotationZ.spot);
      if(physics.reverseZ == true){
        return 2*(physics.maxZ[spot] / max);
      }
      else{
      return physics.maxZ[spot] / max;}

  }
  else{
    return 0;
  }
  }


///leaving Z command
///leaving Z command
///leaving Z command
///leaving Z command
///leaving Z command





  ///now the command for Y rotation
  function rotationY(x, direction, maxTurn, mass, density, revForce){
    var speed = physics.speed;
    var max = physics.maxY[10]/maxTurn;

    //testing to see which direction the car is going
    if(direction < 0){
      ///testing to see in rotation is complete
      if(physics.rotationY.spot != 10 && physics.rotationY.movement == "up"){
      physics.rotationY.spot += 1;
      }


      ///going back to rotation frame 0
      else{
        if(physics.rotationY.spot == 10 && physics.rotationY.movement == "up"){
          physics.rotationY.movement = "down";
        }
        else if(physics.rotationY.spot == 0){
          physics.acc = false;
          physics.reverseY = false;
          physics.rotationY.movement = "up";
          physics.rotationY.spot = 0;}
        else if(physics.rotationY.movement == "down"){
          physics.rotationY.spot -=0.5;
        }
        }
    
        
      if(physics.reverseY == true){
        return 2.25*(physics.maxY[physics.rotationY.spot] / -max);
      }
      else{
      return physics.maxY[physics.rotationY.spot] / -max;}
    }



    else if(direction > 0){
      ///testing to see in rotation is complete
      if(physics.rotationY.spot != 10 && physics.rotationY.movement == "up"){
      physics.rotationY.spot += 2;
      }


      ///going back to rotation frame 0
      else{
        if(physics.rotationY.spot == 10 && physics.rotationY.movement == "up"){
          physics.rotationY.movement = "down";
        }
        else if(physics.rotationY.spot == 0){
          physics.acc = false;
          physics.reverseY = false;
          physics.rotationY.movement = "up";
          physics.rotationY.spot = 0;}
        else if(physics.rotationY.movement == "down"){
          physics.rotationY.spot -=1;
        }
        }
    
        

      if(physics.reverseY == true){
        return 2*(physics.maxY[physics.rotationY.spot] / -max);
      }
      else{
      return physics.maxY[physics.rotationY.spot] / -max;}

  }
  else{
    return 0;
  }
  }

  var update = function(){

  }

  // Explicitly reveal public pointers to the private functions 
  // that we want to reveal publicly

  return {
    movement: movement,
    rotationZ: rotationZ,
    rotationY: rotationY,
    update: update
  }
}();


physics.speed = [0, 0.3, 0.9, 1.7, 2.1, 2.9, 3.6, 4.1, 4.7, 5.2, 5.6, 6, 6.3, 6.5, 6.7, 6.8, 7, 7.2, 7.4, 7.6, 7.75, 7.9, 8.05, 8.2, 8.35, 8.5, 8.65, 8.8, 8.9, 9, 9.1, 9.2, 9.3, 9.4, 9.5, 9.55, 9.6, 9.65, 9.7, 9.75,9.8,9.84, 9.88, 9.92, 9.96,10];

physics.maxZ = [0,  1,  1.75,  2.5,  3.5,  4,  4.5  ,4.75  ,5,   5.25,5.5];

physics.maxY = [0,  1,  2.02,  3.09,  4.15,  5.25,  6.4  ,7.55  ,8.7,   9.9,11.3];
physics.spot = 0;
physics.rotationZ.spot = 0;
physics.rotationZ.movement = "up";
physics.reverseZ = false, physics.acc = false;
physics.rotationZ.overRun = false;
}