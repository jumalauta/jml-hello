Demo.prototype.sceneTexts = function () {
  this.setScene('texts');

  // Example of an animated 3D model
  this.loader.addAnimation({
    object: {
      name: 'assets/fist.gltf',
      time: () => getSceneTimeFromStart() * 2.0,
      animations: {
        fist: { weight: 1.0, timescale: 1.0, enabled: true, loop: false }
      }
    },
    position: {
      x: 0,
      y: -1,
      z: -5
    },
    angle: {
      degreesY: 0,
      degreesX: 90,
      degreesZ: 0
    },
    scale: { uniform3d: 2.03 }
  });

  const textStartTime = 3;
  for(let i = 0; i < 20; i++) {
    // Utils.random() is a more deterministic equivalent of Math.random()
    this.drawText(textStartTime + i, 20, Utils.random()*10-5, Utils.random()*10-5, Utils.random()*-10, 10, 'hello world');
  }
};


// Example of text drawing
Demo.prototype.drawText = function (startTime, durationTime, x, y, z, scale, textString) {
  this.loader.addAnimation({
    start: startTime, duration: durationTime,
    text: {
      string: textString, name: 'assets/monoSpace.ttf'
    },
    perspective: '3d',
    color: { r: 1.0, g: 1.0, b: 1.0, a: 1.0 },
    position: { x: x, y: y, z: z },
    scale: { uniform3d: scale },
  });
};
