<template>
	<view class="map-content">		
		<cu-custom bgColor="bg-gradual-blue" :isBack="true" style="height: 0;"><block slot="backText">返回</block><block slot="content">疫情地图</block></cu-custom>
		<view>
			<map :latitude="latitude" :longitude="longitude" :markers="markers" :scale="scale" @click="mapClick"></map>
		</view>		
	</view>
</template>

<script>
	import {post,get} from '../../utils/index.js';
	var that;
	export default {
		data() {
			return {				
				latitude: 39.909,
				longitude: 116.39742,
				scale: 10,
				markers:[]
			}
		},
		onLoad(e) {
			that = this;
			const {city,cityone} = e;
			console.log(city,cityone)
			that.getLngLat(city,cityone); //省市
		},
		onReady() {
			try {
			    const value = uni.getStorageSync('mapMarkers');
			    if (value) {
					that.startDraw(value);
			    }
			} catch (e) {
			    console.log(e);
			}
		},
		methods: {
			getLngLat(province,city) {
				let url = `../../static/geo/${province}.geoJson`;
				get(url).then(res=>{
					// const res = require(`../../static/geo/${province}.geoJson`)
					let features = res.features;
					for (let item of features){
						const {name,center} = item.properties;
						if (name === city){
							that.longitude = center[0];
							that.latitude = center[1];  
							break;
						}
					}
				})
			},
			startDraw(markers){
				that.markers = markers;
			},
			mapClick() {
				console.log("地图单击事件");
				uni.getLocation({
				    type: 'wgs84',
				    success: function (res) {
				        console.log('当前位置的经度：' + res.longitude);
				        console.log('当前位置的纬度：' + res.latitude);
						console.log(res.address.district);
				    },
					fail: function(e){
						console.log(e);
					},
					complete: function(res){
						console.log("完成");
					}
				});
			}
		}
	}
</script>

<style>
	.map-content {
		width: 100%;
		height: 100%;
	}
	map {
		width: 100%;
		height: 750rpx;
	}
</style>
