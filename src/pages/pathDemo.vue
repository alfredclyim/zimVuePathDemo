<template>
  <div></div>
</template>

<script>

export default {
  name: 'zim-game-shell',
  methods: {
    init () {
      var scaling = "fit"; // fit scales to fit the browser window while keeping the aspect ratio
      var width = 1024; // can go higher...
      var height = 768;
      window.frame = new Frame(scaling, width, height); // see docs for more options and info
      frame.on("ready", function() {
        zog("ready from ZIM Frame");

        var stage = frame.stage;
        var stageW = frame.width;
        var stageH = frame.height;
        frame.color = frame.yellow;
        frame.outerColor = frame.dark;
        
        var path = new Squiggle({
          points: [[-169,115.7,0,0,100,0,50,0,"mirror"],[50.1,-36.3,0,0,194.4,11.3,-194.4,-11.3,"mirror"],[141.2,126.7,0,0,-112.1,0,112.1,0,"mirror"],[193.2,-158.4,0,0,186.4,-19.3,-186.4,19.3,"mirror"],[395.6,135.7,0,0,-70.7,4.8,70.7,-4.8,"mirror"],[519.3,-12.2,0,0,184.8,14.5,-184.8,-14.5,"mirror"],[652.9,120.9,0,0,-102.4,40.2,102.4,-40.2,"mirror"]],
          onTop:false
        }).center();

        new Circle(10, red).addTo().animate({path:path}, 10000);

        stage.update();
      }); // end of ready
    }
  },
  mounted () {
    this.init()
  },
  beforeDestroy () {
  }
}
</script>