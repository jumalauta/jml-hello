
Demo.prototype.sceneCat = function () {
  this.setScene('cat');

  // This shows an animation of 2D image
  this.loader.addAnimation({
    image: 'assets/cat_head.png',
    // you can use functions to dynamically calculate values for animations
    // this example calculates image's X position using sine function
    position: [{x:()=>Math.sin(getSceneTimeFromStart())*0.3, y:0}],
    // this example rotates the image around Z axis
    // the rotation is an example of a static animation without functions
    angle: [
      // start position
      {degreesZ: 0},
      // rotate 360 degrees (counter clockwise) in 3 seconds
      {duration: 3, degreesZ: 360},
      // wait for 5 seconds in last calculated angle
      {duration: 5},
      // rotate back clockwise from 360 degrees to 0 degrees in 3 seconds
      {duration: 3, degreesZ: 0},
    ],
    // scale the image to 80% of its original size
    // instead of x and y you can also use "uniform2d" or "uniform3d"
    // for uniform scaling of X, Y and Z axes without need to specify each axis separately
    scale: [{x: 0.8, y: 0.8}]
  });
};
