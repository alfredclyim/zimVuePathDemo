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
				mParel: null,
				HsTri1: null,
				HsTri2: null,
				HmTri: null,
				HlTri1: null,
				HlTri2: null,
				HmRect: null,
				HmParel: null,
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
						.loc(120, 100);
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
						.rot(45)
						.loc(300, 10);
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
						.rot(0)
						.loc(180, 115);
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
						.rot(45)
						.loc(200, 360);
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
						.rot(270)
						.loc(230, 485);
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
						.rot(0)
						.loc(150, 460);
					this.mTri.addChild(
						new zim.Triangle(
							200,
							Math.sqrt(20000),
							Math.sqrt(20000),
							specRed
						)
					);
					this.mTri.addChild(
						new zim.Triangle(
							200,
							Math.sqrt(20000),
							Math.sqrt(20000),
							this.frame.clear,
							this.frame.tin
						)
					);
					this.mTri.regX = 0;
					this.mTri.regY = -50;

					this.mParel = new zim.Container()
						.place("Shape")
						.setBounds(
							50,
							350 - Math.sqrt(5000),
							Math.sqrt(5000),
							3 * Math.sqrt(5000)
						)
						.reg(50, 350);
					this.mParel.y += 350;
					this.mParel.x += 50;
					var _par = new zim.Shape();
					_par.graphics
						.setStrokeStyle(1)
						.beginStroke("#666666")
						.beginFill(specRed)
						.moveTo(50, 350)
						.lineTo(50, 350 + 2 * Math.sqrt(5000))
						.lineTo(50 + Math.sqrt(5000), 350 + Math.sqrt(5000))
						.lineTo(50 + Math.sqrt(5000), 350 - Math.sqrt(5000))
						.lineTo(50, 350);
					this.mParel.addChild(_par);

					if (this.mapData.sTri1.used) rightPanel.addChild(this.sTri1);
					if (this.mapData.sTri2.used) rightPanel.addChild(this.sTri2);
					if (this.mapData.lTri1.used) rightPanel.addChild(this.lTri1);
					if (this.mapData.lTri2.used) rightPanel.addChild(this.lTri2);
					if (this.mapData.mTri.used) rightPanel.addChild(this.mTri);
					if (this.mapData.mRect.used) rightPanel.addChild(this.mRect);
					if (this.mapData.mParel.used) rightPanel.addChild(this.mParel);

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
						var kObj = new zim.Container()
							.rot(this.mapData.sTri1.rot)
							.reg()
							.loc(this.mapData.sTri1.x + 600, this.mapData.sTri1.y);
						kObj.addChild(
							new zim.Triangle(Math.sqrt(20000), 100, 100, "#CCCCCC")
						);

						this.HsTri1 = new zim.Triangle(
							Math.sqrt(20000),
							100,
							100,
							this.frame.clear,
							this.frame.tin
						);
						this.HsTri1.borderColor = "#CCCCCC";
						kObj.addChild(this.HsTri1);

						kObj.regX = 0;
						kObj.regY = -Math.sqrt(20000) / 4;
						leftPanel.addChild(kObj);
					}
					if (this.mapData.sTri2.used === true) {
						var kObj = new zim.Container()
							.rot(this.mapData.sTri2.rot)
							.loc(this.mapData.sTri2.x + 600, this.mapData.sTri2.y);
						kObj.addChild(
							new zim.Triangle(Math.sqrt(20000), 100, 100, "#CCCCCC")
						);
						this.HsTri2 = new zim.Triangle(
							Math.sqrt(20000),
							100,
							100,
							this.frame.clear,
							this.frame.tin
						);
						this.HsTri2.borderColor = "#CCCCCC";
						kObj.addChild(this.HsTri2);
						kObj.regX = 0;
						kObj.regY = -Math.sqrt(20000) / 4;
						leftPanel.addChild(kObj);
					}
					if (this.mapData.lTri1.used === true) {
						var kObj = new zim.Container()
							.rot(this.mapData.lTri1.rot)
							.loc(this.mapData.lTri1.x + 600, this.mapData.lTri1.y);
						kObj.addChild(
							new zim.Triangle(Math.sqrt(80000), 200, 200, "#CCCCCC")
						);
						this.HlTri1 = new zim.Triangle(
							Math.sqrt(80000),
							200,
							200,
							this.frame.clear,
							this.frame.tin
						);
						this.HlTri1.borderColor = "#CCCCCC";
						kObj.addChild(this.HlTri1);
						kObj.regX = 0;
						kObj.regY = -Math.sqrt(80000) / 4;

						leftPanel.addChild(kObj);
					}
					if (this.mapData.lTri2.used === true) {
						var kObj = new zim.Container()
							.rot(this.mapData.lTri2.rot)
							.loc(this.mapData.lTri2.x + 600, this.mapData.lTri2.y);
						kObj.addChild(
							new zim.Triangle(Math.sqrt(80000), 200, 200, "#CCCCCC")
						);
						this.HlTri2 = new zim.Triangle(
							Math.sqrt(80000),
							200,
							200,
							this.frame.clear,
							this.frame.tin
						);
						this.HlTri2.borderColor = "#CCCCCC";
						kObj.addChild(this.HlTri2);
						kObj.regX = 0;
						kObj.regY = -Math.sqrt(80000) / 4;
						leftPanel.addChild(kObj);
					}
					if (this.mapData.mTri.used === true) {
						var kObj = new zim.Container()
							.rot(this.mapData.mTri.rot)
							.loc(this.mapData.mTri.x + 600, this.mapData.mTri.y);
						kObj.addChild(
							new zim.Triangle(
								200,
								Math.sqrt(20000),
								Math.sqrt(20000),
								"#CCCCCC"
							)
						);
						this.HmTri = new zim.Triangle(
							200,
							Math.sqrt(20000),
							Math.sqrt(20000),
							this.frame.clear,
							this.frame.tin
						);
						this.HmTri.borderColor = "#CCCCCC";
						kObj.addChild(this.HmTri);
						kObj.regX = 0;
						kObj.regY = -50;

						leftPanel.addChild(kObj);
					}
					if (this.mapData.mRect.used === true) {
						var kObj = new zim.Container()
							.rot(this.mapData.mRect.rot)
							.loc(this.mapData.mRect.x + 600, this.mapData.mRect.y);
						kObj.addChild(
							new zim.Rectangle(100, 100, "#CCCCCC").centerReg()
						);
						this.HmRect = new zim.Rectangle(
							100,
							100,
							this.frame.clear,
							this.frame.tin
						).centerReg();

						this.HmRect.borderColor = "#CCCCCC";

						kObj.addChild(this.HmRect);
						leftPanel.addChild(kObj);
					}
					if (this.mapData.mParel.used === true) {
						var kObj = new zim.Container()
							.setBounds(
								50,
								350 - Math.sqrt(5000),
								Math.sqrt(5000),
								3 * Math.sqrt(5000)
							)
							.reg(50, 350)
							.rot(this.mapData.mParel.rot);

						kObj.y = this.mapData.mParel.y;
						kObj.x = this.mapData.mParel.x + 600;
						this.HmParel = new zim.Shape();
						this.HmParel.graphics
							.setStrokeStyle(1)
							.beginStroke("#CCCCCC")
							.beginFill("#CCCCCC")
							.moveTo(50, 350)
							.lineTo(50, 350 + 2 * Math.sqrt(5000))
							.lineTo(50 + Math.sqrt(5000), 350 + Math.sqrt(5000))
							.lineTo(50 + Math.sqrt(5000), 350 - Math.sqrt(5000))
							.lineTo(50, 350);
						kObj.addChild(this.HmParel);
						leftPanel.addChild(kObj);
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
					this.mParel.on("dblclick", e => {
						this.mParel.rotation = (this.mParel.rotation + 45) % 360;
						this.stage.update();
					});

					this.sTri1.on("pressmove", e => {
						this.onMoveEvent(this.sTri1, 20000);
						this.checkAnswer();
					});
					this.sTri2.on("pressmove", e => {
						this.onMoveEvent(this.sTri2, 20000);
						this.checkAnswer();
					});
					this.lTri1.on("pressmove", e => {
						this.onMoveEvent(this.lTri1, 80000);
						this.checkAnswer();
					});
					this.lTri2.on("pressmove", e => {
						this.onMoveEvent(this.lTri2, 80000);
						this.checkAnswer();
					});
					this.mTri.on("pressmove", e => {
						this.onMoveEvent(this.mTri, 40000);
						this.checkAnswer();
					});
					this.mRect.on("pressmove", e => {
						this.mRect.x =
							parseFloat(parseInt(this.mRect.x / Math.sqrt(8))) *
							Math.sqrt(8);
						this.mRect.y =
							parseFloat(parseInt(this.mRect.y / Math.sqrt(8))) *
							Math.sqrt(8);
						this.checkAnswer();
					});
					this.mParel.on("pressmove", e => {
						this.mParel.x =
							parseFloat(parseInt(this.mParel.x / Math.sqrt(8))) *
							Math.sqrt(8);
						this.mParel.y =
							parseFloat(parseInt(this.mParel.y / Math.sqrt(8))) *
							Math.sqrt(8);
						this.checkAnswer();
					});
				}); // end of ready
			},
			onMoveEvent(obj, r) {
				{
					obj.x =
						parseFloat(parseInt(obj.x / Math.sqrt(8))) * Math.sqrt(8);
					obj.y =
						parseFloat(parseInt(obj.y / Math.sqrt(8))) * Math.sqrt(8);
				}
				this.stage.update();
			},
			checkAnswer() {
				if (this.completed) return;
				if (this.mapData.sTri1.used) {
					if (
						!this.compareObjects(
							this.sTri1,
							this.sTri2,
							this.mapData.sTri1
						)
					)
						return false;
				}

				if (this.mapData.sTri2.used) {
					if (
						!this.compareObjects(
							this.sTri1,
							this.sTri2,
							this.mapData.sTri2
						)
					)
						return false;
				}

				if (this.mapData.lTri1.used) {
					if (
						!this.compareObjects(
							this.lTri1,
							this.lTri2,
							this.mapData.lTri1
						)
					)
						return false;
				}
				if (this.mapData.lTri2.used) {
					if (
						!this.compareObjects(
							this.lTri1,
							this.lTri2,
							this.mapData.lTri2
						)
					)
						return false;
				}
				if (this.mapData.mTri.used) {
					if (
						!this.compareObjects(
							this.mTri,
							this.mTri,
							this.mapData.mTri
						)
					)
						return false;
				}
				if (this.mapData.mRect.used) {
					if (
						!this.compareObjects(
							this.mRect,
							this.mRect,
							this.mapData.mRect
						)
					)
						return false;
				}
				if (this.mapData.mParel.used) {
					if (
						!this.compareObjects(
							this.mParel,
							this.mParel,
							this.mapData.mParel
						)
					)
						return false;
				}
				this.completed = true;
				$("#componentView").html("Completed");
				$("#hintBut").hide();
				this.stage.update();
				return true;
			},
			compareObjects(obj1, obj2, obj3) {
				console.log(obj1.x + " " + obj3.x);
				console.log(obj1.y + " " + obj3.y);
				console.log(obj1.rotation + " " + obj3.rot);
				return (
					(obj1.x === obj3.x &&
						obj1.y === obj3.y &&
						obj1.rotation === obj3.rot) ||
					(obj2.x === obj3.x &&
						obj2.y === obj3.y &&
						obj2.rotation === obj3.rot)
				);
			},
			showHint() {
				this.hintShow = !this.hintShow;
				var bColor = this.hintShow ? "#AAAAAA" : "#CCCCCC";
				if (this.HmParel) {
					this.HmParel.graphics.clear();
					this.HmParel.graphics
						.setStrokeStyle(1)
						.beginFill("#CCCCCC")
						.beginStroke(bColor)
						.moveTo(50, 350)
						.lineTo(50, 350 + 2 * Math.sqrt(5000))
						.lineTo(50 + Math.sqrt(5000), 350 + Math.sqrt(5000))
						.lineTo(50 + Math.sqrt(5000), 350 - Math.sqrt(5000))
						.lineTo(50, 350);
				}
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
		text-align: center;
		font-size: 72px;
	}
</style>