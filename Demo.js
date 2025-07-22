includeFile('scenes/texts.js');

Demo.prototype.init = function () {
  const start = 0;
  const duration = 74;
  const bpm = 160;
  const beat = 60 / bpm;
  const pattern = beat * 8;

  this.sceneTexts();

  // is this even required?
  this.loader.setScene('main');

  const scenes = [
    { start: 0, duration: 100, name: 'texts', dof: false },
  ];

  scenes.forEach((scene) => {
    this.loader.addAnimation({
      start: scene.start,
      duration: scene.duration,
      scene: {
        name: scene.name,
        fbo: {
          name: scene.name + 'Fbo'
        }
      }, ...(scene.parameters || {})
    });
  });
};
