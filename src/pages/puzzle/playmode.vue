<template>
	<div style="padding:10vh;">
		<div id="componentView" class="ComponentViewS"></div>
		<q-btn style="margin-left:5px" color="primary" no-caps @click="showHint()" id="hintBut">Show Hint</q-btn>
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
				HsTri1: null,
				HsTri2: null,
				HmTri: null,
				HlTri1: null,
				HlTri2: null,
				HmRect: null,
				stageW: 0,
				stageH: 0,
				stage: null,
				completed: false,
				hintShow: false
			};
		},
		methods: {
			initMapFields() {
				this.frame = new zim.Frame({
					scaling: "componentView",
					width: "950px",
					height: "600px",
					color: "#FFFFFF"
				});

				this.frame.on("ready", () => {
					zog("ready from ZIM Frame");
					console.log(this.mapData);

					this.stage = this.frame.stage;
					this.stageW = this.frame.width;
					this.stageH = this.frame.height;
					var specRed = "#E46B52";

					var rightPanel = new zim.Container();
					var leftPanel = new zim.Container();

					this.sTri1 = new zim.Container()
						.place("triangle")
						.rot(90)
						.loc(50, 100);
					this.sTri1.addChild(
						new zim.Triangle(Math.sqrt(20000), 100, 100, specRed)
					);
					this.sTri1.addChild(
						new zim.Triangle(
							Math.sqrt(20000),
							100,
							100,
							this.frame.clear,
							this.frame.tin
						)
					);

					this.sTri1.regX = 0;
					this.sTri1.regY = -Math.sqrt(20000) / 4;

					this.lTri1 = new zim.Container()
						.place("triangle")
						.rot(180)
						.loc(190, 110);
					this.lTri1.addChild(
						new zim.Triangle(Math.sqrt(80000), 200, 200, specRed)
					);
					this.lTri1.addChild(
						new zim.Triangle(
							Math.sqrt(80000),
							200,
							200,
							this.frame.clear,
							this.frame.tin
						)
					);
					this.lTri1.regX = 0;
					this.lTri1.regY = -Math.sqrt(80000) / 4;

					this.lTri2 = new zim.Container()
						.place("triangle")
						.rot(135)
						.loc(185, 270);
					this.lTri2.addChild(
						new zim.Triangle(Math.sqrt(80000), 200, 200, specRed)
					);
					this.lTri2.addChild(
						new zim.Triangle(
							Math.sqrt(80000),
							200,
							200,
							this.frame.clear,
							this.frame.tin
						)
					);
					this.lTri2.regX = 0;
					this.lTri2.regY = -Math.sqrt(80000) / 4;

					this.mRect = new zim.Container()
						.place("Rectangle")
						.rot(135)
						.loc(280, 370);
					this.mRect.addChild(
						new zim.Rectangle(100, 100, specRed).centerReg()
					);
					this.mRect.addChild(
						new zim.Rectangle(
							100,
							100,
							this.frame.clear,
							this.frame.tin
						).centerReg()
					);

					this.sTri2 = new zim.Container()
						.place("triangle")
						.rot(45)
						.loc(285, 500);
					this.sTri2.addChild(
						new zim.Triangle(Math.sqrt(20000), 100, 100, specRed)
					);
					this.sTri2.addChild(
						new zim.Triangle(
							Math.sqrt(20000),
							100,
							100,
							this.frame.clear,
							this.frame.tin
						)
					);
					this.sTri2.regX = 0;
					this.sTri2.regY = -Math.sqrt(20000) / 4;

					this.mTri = new zim.Container()
						.place("triangle")
						.rot(135)
						.loc(140, 570);
					this.mTri.addChild(
						new zim.Triangle(Math.sqrt(45000), 150, 150, specRed)
					);
					this.mTri.addChild(
						new zim.Triangle(
							Math.sqrt(45000),
							150,
							150,
							this.frame.clear,
							this.frame.tin
						)
					);
					this.mTri.regX = 0;
					this.mTri.regY = -Math.sqrt(45000) / 4;

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
						var kObj = new zim.Triangle(
							Math.sqrt(20000),
							100,
							100,
							"#CCCCCC"
						);
						kObj.regY -= Math.sqrt(20000) / 4;
						kObj.x = this.mapData.sTri1.x + 600;
						kObj.y = this.mapData.sTri1.y;
						kObj.rotation = this.mapData.sTri1.rot;
						leftPanel.addChild(kObj);

						this.HsTri1 = new zim.Triangle(
							Math.sqrt(20000),
							100,
							100,
							this.frame.clear,
							this.frame.tin
						);
						this.HsTri1.borderColor = "#CCCCCC";
						this.HsTri1.regY -= Math.sqrt(20000) / 4;
						this.HsTri1.x = this.mapData.sTri1.x + 600;
						this.HsTri1.y = this.mapData.sTri1.y;
						this.HsTri1.rotation = this.mapData.sTri1.rot;
						leftPanel.addChild(this.HsTri1);
					}
					if (this.mapData.sTri2.used === true) {
						var kObj = new zim.Triangle(
							Math.sqrt(20000),
							100,
							100,
							"#CCCCCC"
						);
						kObj.regY -= Math.sqrt(20000) / 4;
						kObj.loc(this.mapData.sTri2.x + 600, this.mapData.sTri2.y);
						kObj.rot(this.mapData.sTri2.rot);
						leftPanel.addChild(kObj);

						this.HsTri2 = new zim.Triangle(
							Math.sqrt(20000),
							100,
							100,
							this.frame.clear,
							this.frame.tin
						);
						this.HsTri2.borderColor = "#CCCCCC";
						this.HsTri2.regY -= Math.sqrt(20000) / 4;
						this.HsTri2.x = this.mapData.sTri2.x + 600;
						this.HsTri2.y = this.mapData.sTri2.y;
						this.HsTri2.rotation = this.mapData.sTri2.rot;
						leftPanel.addChild(this.HsTri2);
					}
					if (this.mapData.lTri1.used === true) {
						var kObj = new zim.Triangle(
							Math.sqrt(80000),
							200,
							200,
							"#CCCCCC"
						);
						kObj.regY -= Math.sqrt(80000) / 4;
						kObj.loc(this.mapData.lTri1.x + 600, this.mapData.lTri1.y);
						kObj.rot(this.mapData.lTri1.rot);
						leftPanel.addChild(kObj);

						this.HlTri1 = new zim.Triangle(
							Math.sqrt(80000),
							200,
							200,
							this.frame.clear,
							this.frame.tin
						);
						this.HlTri1.borderColor = "#CCCCCC";
						this.HlTri1.regY -= Math.sqrt(80000) / 4;
						this.HlTri1.x = this.mapData.lTri1.x + 600;
						this.HlTri1.y = this.mapData.lTri1.y;
						this.HlTri1.rotation = this.mapData.lTri1.rot;
						leftPanel.addChild(this.HlTri1);
					}
					if (this.mapData.lTri2.used === true) {
						var kObj = new zim.Triangle(
							Math.sqrt(80000),
							200,
							200,
							"#CCCCCC"
						);
						kObj.regY -= Math.sqrt(80000) / 4;
						kObj.loc(this.mapData.lTri2.x + 600, this.mapData.lTri2.y);
						kObj.rot(this.mapData.lTri2.rot);
						leftPanel.addChild(kObj);

						this.HlTri2 = new zim.Triangle(
							Math.sqrt(80000),
							200,
							200,
							this.frame.clear,
							this.frame.tin
						);
						this.HlTri2.borderColor = "#CCCCCC";
						this.HlTri2.regY -= Math.sqrt(80000) / 4;
						this.HlTri2.x = this.mapData.lTri2.x + 600;
						this.HlTri2.y = this.mapData.lTri2.y;
						this.HlTri2.rotation = this.mapData.lTri2.rot;
						leftPanel.addChild(this.HlTri2);
					}
					if (this.mapData.mTri.used === true) {
						var kObj = new zim.Triangle(
							Math.sqrt(45000),
							150,
							150,
							"#CCCCCC"
						);
						kObj.regY -= Math.sqrt(45000) / 4;
						kObj.loc(this.mapData.mTri.x + 600, this.mapData.mTri.y);
						kObj.rot(this.mapData.mTri.rot);
						leftPanel.addChild(kObj);
						this.HmTri = new zim.Triangle(
							Math.sqrt(45000),
							150,
							150,
							this.frame.clear,
							this.frame.tin
						);
						this.HmTri.borderColor = "#CCCCCC";
						this.HmTri.regY -= Math.sqrt(45000) / 4;
						this.HmTri.x = this.mapData.mTri.x + 600;
						this.HmTri.y = this.mapData.mTri.y;
						this.HmTri.rotation = this.mapData.mTri.rot;
						leftPanel.addChild(this.HmTri);
					}
					if (this.mapData.mRect.used === true) {
						var kObj = new zim.Rectangle(100, 100, "#CCCCCC");
						kObj.centerReg();
						kObj.loc(this.mapData.mRect.x + 600, this.mapData.mRect.y);
						kObj.rot(this.mapData.mRect.rot);
						leftPanel.addChild(kObj);

						this.HmRect = new zim.Rectangle(
							100,
							100,
							this.frame.clear,
							this.frame.tin
						);
						this.HmRect.centerReg();
						this.HmRect.borderColor = "#CCCCCC";
						this.HmRect.x = this.mapData.mRect.x + 600;
						this.HmRect.y = this.mapData.mRect.y;
						this.HmRect.rotation = this.mapData.mRect.rot;
						leftPanel.addChild(this.HmRect);
					}
					/* map End */

					leftPanel.x = 0;
					leftPanel.y = 0;

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

					this.sTri1.on("pressmove", e => {
						this.onMoveEvent(this.sTri1, 20000);
					});
					this.sTri2.on("pressmove", e => {
						this.onMoveEvent(this.sTri2, 20000);
					});
					this.lTri1.on("pressmove", e => {
						this.onMoveEvent(this.lTri1, 80000);
					});
					this.lTri2.on("pressmove", e => {
						this.onMoveEvent(this.lTri2, 80000);
					});
					this.mTri.on("pressmove", e => {
						this.onMoveEvent(this.mTri, 45000);
					});
					this.mRect.on("pressmove", e => {
						this.mRect.x = this.mRect.x - (this.mRect.x % 10);
						this.mRect.y = this.mRect.y - (this.mRect.y % 10);
					});
				}); // end of ready
			},
			onMoveEvent(obj, r) {
				{
					obj.x = obj.x - (obj.x % 10);
					obj.y = obj.y - (obj.y % 10);
				}
				this.stage.update();
			},
			checkAnswer() {},
			showHint() {
				this.hintShow = !this.hintShow;
				var bColor = this.hintShow ? "#AAAAAA" : "#CCCCCC";
				if (this.HsTri1) this.HsTri1.borderColor = bColor;
				if (this.HsTri2) this.HsTri2.borderColor = bColor;
				if (this.HlTri1) this.HlTri1.borderColor = bColor;
				if (this.HlTri2) this.HlTri2.borderColor = bColor;
				if (this.HmTri) this.HmTri.borderColor = bColor;
				if (this.HmRect) this.HmRect.borderColor = bColor;

				$("#hintBut").html(this.hintShow ? "Hide Hint" : "Show Hint");

				this.stage.update();
			}
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