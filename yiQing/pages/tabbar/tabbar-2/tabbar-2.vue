<template>
	<view class="content">		
		<map id="maps" :latitude="latitude" :longitude="longitude" :markers="markers" :scale="scale"></map>
	</view>
</template>

<script>
	import json from '../../../static/self/xiaoqu.js';
	const vps = markers => {
		let sObj = [];
		markers.forEach(obj => {
			const { id, title, latitude, longitude, iconPath, status } = obj;			
			let m = {
				id,
				latitude,
				longitude,
				iconPath,
				callout: {
					content: `${title}\n\n${status}`,
					color:'#00aaff',
					fontSize:14,
					borderRadius:5,
					padding:10,
					display:'BYCLICK',
				}
			}
			sObj.push(m);
		})
		return sObj;
	}
	export default {
		data() {
			return {				
				latitude: 39.909,
				longitude: 116.39742,
				scale: 11,
				markers:[]
			}
		},
		onReady() {
			let mps = json.markers;
			let markers = vps(mps);
			//console.log(ns);
			this.startDraw(markers);
		},
		methods: {			
			startDraw(markers){
				let that = this;
				that.markers = markers;
			},
		}
	}
</script>

<style scoped lang="scss">
	.content {
		position: absolute;
		width: 100%;
		height: 100%;
		#maps {
			width: 100%;
			height: 100%;
		}
	}
</style>
