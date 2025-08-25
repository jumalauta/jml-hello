// This is an example of typical demo structure

// It's usually a good idea to split scenes or larger common portions to separate files
// This makes the project more maintainable and more suitable for collaboration
// includeFile is a function that loads and executes the specified JavaScript file
includeFile('scenes/texts.js');
includeFile('scenes/cat.js');

// All scenes with 3d objects need lights, so this is a convenience function to setup lights for all scenes
Demo.prototype.setupCameraAndLights = function () {
  // Camera
  this.loader.addAnimation({
    camera: 'cam1',
    position:{x:0,y:0,z:5},
    lookAt:{x:0.0,y:0.0,z:0.0}
  });

  // Directional lighting
  this.loader.addAnimation({
    light: {
      type: 'Directional',
      properties: { intensity: 0.80 },
      castShadow: false
    },
    color: {
      r: 1.0, g: 1.0, b: 1.0
    },
    position: {
      x: 2.0, y: 1.0, z: 2.0
    }
  });    

  // Ambient lighting
  this.loader.addAnimation({
    light: {
      type: 'Ambient',
      properties: { intensity: 0.35 },
      castShadow: false
    },
    color: {
      r: 1.0, g: 0.5, b: 0.5
    }
  });    
};

// Convenience function to set the current scene with camera and lights
Demo.prototype.setScene = function (sceneName) {
  this.loader.setScene(sceneName);
  this.setupCameraAndLights();
};

// This is the main entry point of the demo. It is called during demo loading and it defines all animations
Demo.prototype.init = function () {
  // Change demo settings
  // Full list of settings documented here: https://github.com/jumalauta/jml-engine-webgl/blob/main/src/Settings.js#L31
  const settings = new Settings();
  // defaults to 'music.mp3', we change default so that music is not loaded by default
  settings.demo.music.musicFile = undefined;
  settings.demo.duration = 60000; // Demo duration is 60 seconds, if music file is specified, duration is not mandatory

  // Scene methods are defined in scenes/*.js files
  this.sceneTexts();
  this.sceneCat();

  // 'main' scene is the default scene that is rendered and shown to the user
  // a scene is a group of animations that are played together when a scene is rendered
  // you don't have to define a scene or use scenes but scene makes grouping animations easier
  // if you don't define it, the demo will use the 'main' scene by default
  this.setScene('main');

  // This defines the timeline and when scenes are placed in the demo
  const scenes = [
    { start:  0, duration: 60, fadeIn: 1.0, fadeOut: 2.0, name: 'texts' },
    { start: 10, duration: 20, fadeIn: 2.0, fadeOut: 2.0, name: 'cat' },
    { start: 38, duration: 20, fadeIn: 2.0, fadeOut: 2.0, name: 'cat' },
  ];

  // This is where each scene is rendered to its framebuffer object (FBO)
  // FBO textures are accessible as images by referencing, e.g., 'textsFbo.color.fbo' or 'textsFbo.depth.fbo'
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

  // This is where each scene's FBO is shown
  scenes.forEach((scene) => {
    const fadeIn = scene.fadeIn || 0.0;
    const fadeOut = scene.fadeOut || 0.0;
    this.loader.addAnimation({
      start: scene.start,
      duration: scene.duration,
      image: scene.name + 'Fbo.color.fbo',
      // Simple alpha color based fades to support crossfades of scenes
      color: [
        {a: 0},
        {a: 1, duration: fadeIn},
        {duration: scene.duration-(fadeIn+fadeOut)},
        {a: 0, duration: fadeOut}
      ]
    });
  });

  // Example of a simple fragment shader, a "pulsating" vignette overlay that is applied to an image
  this.loader.addAnimation({
    // _embedded/ is a special directory containing some shared engine resources: https://github.com/jumalauta/jml-engine-webgl/tree/main/src/_embedded
    // you may use you own or any other image
    image: '_embedded/defaultTransparent.png',
    // Shaders can be applied to any objects (e.g., image/object/text)
    shader:{
      name:'vignette.fs',
      variable: [
        // uniform vec2 fade from the fragment shader is controlled here.
        // uniforms can take functions or static values as input,
        // functions are called per each frame and their return value is given to the uniform
        { name: 'fade', value: [
          () => Math.sin(getSceneTimeFromStart()*10.0) * 0.4 + 0.4,
          1.0] },
      ]}
  });
};
