<template>
	<div style="padding:10vh;">
		<div id="componentView" class="ComponentViewS"></div>
		<q-btn style="margin-left:5px" color="primary" no-caps @click="showHint()">Show Hint</q-btn>
	</div>
</template>

<script>
	export default {
		name: "PlayModePage",
		props: ["mapData"],
		data() {
			return {
				frame: null,
				sTri1: null,
				sTri2: null,
				mTri: null,
				lTri1: null,
				lTri2: null,
				mRect: null,
				stageW: 0,
				stageH: 0,
				stage: null
			};
		},
		methods: {
			initMapFields() {
				console.log(this.mapData);
				this.frame = new zim.Frame({
					scaling: "componentView",
					width: "950px",
					height: "600px",
					color: "#FFFFFF"
				});

				this.frame.on("ready", () => {
					zog("ready from ZIM Frame");

					this.stage = this.frame.stage;
					this.stageW = this.frame.width;
					this.stageH = this.frame.height;
					console.log(this.stage);
					var specRed = "#E46B52";

					var rightPanel = new zim.Container();
					var leftPanel = new zim.Container();

					this.sTri1 = new zim.Container()
						.place("triangle")
						.rot(225)
						.loc(50, 100);
					this.sTri1.addChild(new zim.Triangle(100, 141, 100, specRed));
					this.sTri1.addChild(
						new zim.Triangle(
							100,
							141,
							100,
							this.frame.clear,
							this.frame.tin
						)
					);

					this.lTri1 = new zim.Container()
						.place("triangle")
						.rot(180)
						.loc(190, 110);
					this.lTri1.addChild(new zim.Triangle(200, 282, 200, specRed));
					this.lTri1.addChild(
						new zim.Triangle(
							200,
							282,
							200,
							this.frame.clear,
							this.frame.tin
						)
					);

					this.lTri2 = new zim.Container()
						.place("triangle")
						.rot(135)
						.loc(185, 270);
					this.lTri2.addChild(new zim.Triangle(200, 282, 200, specRed));
					this.lTri2.addChild(
						new zim.Triangle(
							200,
							282,
							200,
							this.frame.clear,
							this.frame.tin
						)
					);

					this.mRect = new zim.Container()
						.place("Rectangle")
						.rot(135)
						.loc(280, 370);
					this.mRect.addChild(new zim.Rectangle(100, 100, specRed));
					this.mRect.addChild(
						new zim.Rectangle(
							100,
							100,
							this.frame.clear,
							this.frame.tin
						)
					);

					this.sTri2 = new zim.Container()
						.place("triangle")
						.rot(45)
						.loc(285, 500);
					this.sTri2.addChild(new zim.Triangle(100, 141, 100, specRed));
					this.sTri2.addChild(
						new zim.Triangle(
							100,
							141,
							100,
							this.frame.clear,
							this.frame.tin
						)
					);

					this.mTri = new zim.Container()
						.place("triangle")
						.rot(135)
						.loc(140, 570);
					this.mTri.addChild(new zim.Triangle(150, 212, 150, specRed));
					this.mTri.addChild(
						new zim.Triangle(
							150,
							212,
							150,
							this.frame.clear,
							this.frame.tin
						)
					);

					rightPanel.addChild(this.sTri1);
					rightPanel.addChild(this.sTri2);
					rightPanel.addChild(this.lTri1);
					rightPanel.addChild(this.lTri2);
					rightPanel.addChild(this.mTri);
					rightPanel.addChild(this.mRect);
					rightPanel.x = 600;
					rightPanel.y = 0;

					var backRect = new zim.Rectangle(600, 600, "#EEEEEE").pos(0, 0);
					leftPanel.addChild(backRect);
					leftPanel.addChild(
						new zim.Rectangle(
							600,
							600,
							this.frame.clear,
							this.frame.tin,
							2,
							null,
							null,
							true
						).pos(0, 0)
					);

					/* load map */
					if (this.mapData.sTri1.used === true) {
						leftPanel.addChild(
							new zim.Triangle(100, 141, 100, "#CCCCCC")
								.loc(
									this.mapData.sTri1.x + 600,
									this.mapData.sTri1.y
								)
								.rot(this.mapData.sTri1.rot)
						);
					}
					if (this.mapData.sTri2.used === true) {
						leftPanel.addChild(
							new zim.Triangle(100, 141, 100, "#CCCCCC")
								.loc(
									this.mapData.sTri2.x + 600,
									this.mapData.sTri2.y
								)
								.rot(this.mapData.sTri2.rot)
						);
					}
					if (this.mapData.lTri1.used === true) {
						leftPanel.addChild(
							new zim.Triangle(200, 282, 200, "#CCCCCC")
								.loc(
									this.mapData.lTri1.x + 600,
									this.mapData.lTri1.y
								)
								.rot(this.mapData.lTri1.rot)
						);
					}
					if (this.mapData.lTri2.used === true) {
						leftPanel.addChild(
							new zim.Triangle(200, 282, 200, "#CCCCCC")
								.loc(
									this.mapData.lTri2.x + 600,
									this.mapData.lTri2.y
								)
								.rot(this.mapData.lTri2.rot)
						);
					}
					if (this.mapData.mTri.used === true) {
						leftPanel.addChild(
							new zim.Triangle(150, 212, 150, "#CCCCCC")
								.loc(this.mapData.mTri.x + 600, this.mapData.mTri.y)
								.rot(this.mapData.mTri.rot)
						);
					}
					if (this.mapData.mRect.used === true) {
						leftPanel.addChild(
							new zim.Rectangle(100, 100, "#CCCCCC")
								.loc(
									this.mapData.mRect.x + 600,
									this.mapData.mRect.y
								)
								.rot(this.mapData.mRect.rot)
						);
					}
					/* map End */

					leftPanel.x = 0;
					leftPanel.y = 0;
					console.log(rightPanel);

					this.stage.addChild(leftPanel);
					this.stage.addChild(rightPanel);

					this.stage.update();

					this.sTri1.on("dblclick", e => {
						this.sTri1.rotation = (this.sTri1.rotation + 45) % 360;
						this.stage.update();
					});
					this.sTri2.on("dblclick", e => {
						this.sTri2.rotation = (this.sTri2.rotation + 45) % 360;
						this.stage.update();
					});
					this.lTri1.on("dblclick", e => {
						this.lTri1.rotation = (this.lTri1.rotation + 45) % 360;
						this.stage.update();
					});
					this.lTri2.on("dblclick", e => {
						this.lTri2.rotation = (this.lTri2.rotation + 45) % 360;
						this.stage.update();
					});
					this.mTri.on("dblclick", e => {
						this.mTri.rotation = (this.mTri.rotation + 45) % 360;
						this.stage.update();
					});
					this.mRect.on("dblclick", e => {
						this.mRect.rotation = (this.mRect.rotation + 45) % 360;
						this.stage.update();
					});
				}); // end of ready
			},
			showHint() {}
		},
		mounted() {
			this.initMapFields();
		},
		beforeDestroy() {}
	};
</script>

<style>
	.ComponentViewS {
		width: 952px;
		height: 602px;
		border: 1px solid black;
		float: left;
	}
</style>