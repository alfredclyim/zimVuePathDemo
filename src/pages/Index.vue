<template>
	<div>
		<div style="margin: 10px">
			<q-btn color="primary" no-caps @click="navigateModes('prep')">Prepare Game</q-btn>&nbsp;
			<q-btn
				color="primary"
				no-caps
				@click="navigateModes('play')"
				:disabled="mapData === null"
			>Play Game</q-btn>
		</div>
		<q-modal v-model="modeSelected" maximized>
			<div style="position: relative;">
				<preparation-page v-if="currentMode === 'prep'" @jsonGenerated="onGenJson"></preparation-page>
				<play-mode-page v-if="currentMode === 'play'" v-bind:map-data="mapData"></play-mode-page>
			</div>
		</q-modal>
	</div>
</template>

<style>
</style>

<script>
	import PreparationPage from "./puzzle/preparation.vue";
	import PlayModePage from "./puzzle/playmode.vue";

	export default {
		name: "PageIndex",
		components: {
			PreparationPage,
			PlayModePage
		},
		data() {
			return {
				currentMode: "",
				modeSelected: false,
				mapData: null
			};
		},
		methods: {
			onGenJson(data) {
				this.mapData = data;
				console.log(this.mapData);
			},
			navigateModes(mode) {
				this.currentMode = mode;
				this.$nextTick(() => {
					this.modeSelected = true;
				});
			}
		}
	};
</script>
