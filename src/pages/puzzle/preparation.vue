<template>
	<div style="padding:10vh;">
		<div id="componentView" class="ComponentViewS"></div>
		<q-btn style="margin:5px" color="primary" no-caps @click="saveToJSON()">Generate JSON</q-btn>
		<br>
		<q-btn
			style="margin:5px"
			color="primary"
			no-caps
			@click="rotateSelected()"
			:disabled="selectedObj === null"
		>Rotate</q-btn>
	</div>
</template>

<script>
	export default {
		name: "PreparationPage",
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
				stageW: 0,
				stageH: 0,
				stage: null,
				selectedObj: null
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

				//this.frame.loadAssets(["rotateIcon.png"], "../../assets/");
				this.frame.on("ready", () => {
					zog("ready from ZIM Frame");

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

					var rotIcon = [];
					//rotIcon = this.frame.asset("rotateIcon.png").clone();
					//this.sTri1.addChild(rotIcon);

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

					rightPanel.addChild(this.sTri1);
					rightPanel.addChild(this.sTri2);
					rightPanel.addChild(this.lTri1);
					rightPanel.addChild(this.lTri2);
					rightPanel.addChild(this.mTri);
					rightPanel.addChild(this.mRect);
					rightPanel.addChild(this.mParel);
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

					leftPanel.x = 0;
					leftPanel.y = 0;

					this.stage.addChild(leftPanel);
					this.stage.addChild(rightPanel);

					this.stage.update();

					// EVENT HANDLE

					this.sTri1.on("click", e => {
						this.selectedObj = this.sTri1;
						this.stage.update();
					});
					this.sTri2.on("click", e => {
						this.selectedObj = this.sTri2;
						this.stage.update();
					});
					this.lTri1.on("click", e => {
						this.selectedObj = this.lTri1;
						this.stage.update();
					});
					this.lTri2.on("click", e => {
						this.selectedObj = this.lTri2;
						this.stage.update();
					});
					this.mTri.on("click", e => {
						this.selectedObj = this.mTri;
						this.stage.update();
					});

					this.mRect.on("click", e => {
						this.selectedObj = this.mRect;
						this.stage.update();
					});

					this.mParel.on("click", e => {
						this.selectedObj = this.mParel;
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
						this.onMoveEvent(this.mTri, 40000);
					});
					this.mRect.on("pressmove", e => {
						this.mRect.x =
							parseFloat(parseInt(this.mRect.x / 3)) * Math.sqrt(8);
						this.mRect.y =
							parseFloat(parseInt(this.mRect.y / Math.sqrt(8))) *
							Math.sqrt(8);
					});
					this.mParel.on("pressmove", e => {
						this.mParel.x =
							parseFloat(parseInt(this.mParel.x / Math.sqrt(8))) *
							Math.sqrt(8);
						this.mParel.y =
							parseFloat(parseInt(this.mParel.y / Math.sqrt(8))) *
							Math.sqrt(8);
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
			rotateSelected() {
				this.selectedObj.rotation = (this.selectedObj.rotation + 45) % 360;
				this.stage.update();
			},
			saveToJSON() {
				var shapeData = {
					sTri1: {
						used: this.sTri1.x > 0 ? false : true,
						x: this.sTri1.x,
						y: this.sTri1.y,
						rot: this.sTri1.rotation
					},
					sTri2: {
						used: this.sTri2.x > 0 ? false : true,
						x: this.sTri2.x,
						y: this.sTri2.y,
						rot: this.sTri2.rotation
					},
					mTri: {
						used: this.mTri.x > 0 ? false : true,
						x: this.mTri.x,
						y: this.mTri.y,
						rot: this.mTri.rotation
					},
					lTri1: {
						used: this.lTri1.x > 0 ? false : true,
						x: this.lTri1.x,
						y: this.lTri1.y,
						rot: this.lTri1.rotation
					},
					lTri2: {
						used: this.lTri2.x > 0 ? false : true,
						x: this.lTri2.x,
						y: this.lTri2.y,
						rot: this.lTri2.rotation
					},
					mRect: {
						used: this.mRect.x > 0 ? false : true,
						x: this.mRect.x,
						y: this.mRect.y,
						rot: this.mRect.rotation
					},
					mParel: {
						used: this.mParel.x > 0 ? false : true,
						x: this.mParel.x,
						y: this.mParel.y,
						rot: this.mParel.rotation
					}
				};

				this.$emit("jsonGenerated", shapeData);
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