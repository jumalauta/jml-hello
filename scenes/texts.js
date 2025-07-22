
Demo.prototype.sceneTexts = function () {
  this.loader.setScene('texts');

  this.drawText(0, 9999, 0, 0, 1, "hello world");
}


Demo.prototype.drawText = function (startTime, durationTime, x, y, scale, textString) {

  const bpm = 160;
  const beat = 60 / bpm;

  this.loader.addAnimation([{
    start: startTime * beat, duration: durationTime * beat,
    text: {
      string: textString, name: "fonts/monoSpace.ttf"
    },
    perspective: "3d",
    color: [{ "r": 1.0, "g": 1.0, "b": 1.0, "a": 0.0 }
      , { duration: beat }, { a: 1 }
      , { duration: durationTime * beat - beat * 2 }, { a: 1 }
      , { duration: beat }, { a: 0 }
    ],
    position: [{ x: x + .25, y: y - .25, z: -20 }],
    scale: [{ uniform3d: scale }],
  }]);
}
