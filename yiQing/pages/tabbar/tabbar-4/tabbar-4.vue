<template>
	<view>
		<swiper class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000" duration="500">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
				<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
			</swiper-item>
		</swiper>
		<view>
			<!--概况记录-->
			<view id="segmented" class="margin-top-sm" style="margin-top: 30px;">
				<uni-segmented-control :current="current" :values="items" style-type="text" :active-color="activeColor" @clickItem="onClickItem" />
			</view>
			<!-- class="scroll" -->
			<scroll-view id="scroll" scroll-y = "true" :style="{height:scrollHeight}">
				<view class="cu-list menu card-menu margin-top-sm" >
					<navigator class="cu-item" v-for="(item,key) in logList" :key = "key">
						<view class="content padding-tb-sm">
							<view>
								<text class="cuIcon-peoplefill text-blue margin-right-xs"></text>{{item.city}}
							</view>
							<view class="text-gray ">
								<text style="margin-right: 10rpx;">汽车</text>{{item.car}}
							</view>
							<view class="text-gray ">
								<text style="margin-right: 10rpx;">火车</text>{{item.train}}
							</view>
							<view class="text-gray ">
								<text style="margin-right: 10rpx;">飞机</text>{{item.plane}}
							</view>
						</view>
						<view class="action">
							<view class="cu-tag round bg-green light">
								<uni-icons type="person-filled" size="16"></uni-icons>&nbsp&nbsp{{item.num}}
							</view>
						</view>
					</navigator>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import {post,get,showModal} from '../../../utils/index.js';
	import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue';
	import uniIcons from "@/components/uni-icons/uni-icons.vue"		
	var that;
	export default {
		components: {
			uniSegmentedControl,
			uniIcons
		},
		data() {
			return {
				swiperList: [{
					id: 0,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
				}, {
					id: 1,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg',
				}, {
					id: 2,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
				}, {
					id: 3,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
				}, {
					id: 4,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
				}, {
					id: 5,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
				}, {
					id: 6,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
				}],
				dotStyle: true,
				current: 0,
				items: ['迁入', '迁出'],
				activeColor: '#66ccff',
				scrollHeight:'',
				today:{
					total: 10,
					in_num: 11,
					out_num: 22
				},
				shequ:{},
				logList:[]
			}
		},
		onReady() {
			let _this = this;
			let segmented = uni.createSelectorQuery().select("#segmented");
			let sysinfo = uni.getSystemInfoSync();
			let Height = sysinfo.windowHeight;
			segmented.boundingClientRect(data=>{
				// console.log(data);
				let sH = (Height - data.top - 32).toFixed();
				_this.scrollHeight = sH+'px';
				// console.log(_this.scrollHeight);
			}).exec();
		},
		onLoad() {
			that = this;
			that.getLogList('in');
		},
		methods: {
			onClickItem(obj) {
				const index = obj.currentIndex;
				if (this.current !== index) {
					this.current = index
				}
				if(index === 0){//进入记录
					that.getLogList('in')
				}else if(index === 1){ //外出记录
					that.getLogList('out')
				}
			},
			getLogList(type){
				if (type === "in"){
					const res = require('../../static/self/qianxi-in.json')
					// get('/static/self/qianxi-in.json').then(res=>{
						let rowList = res.data;
						that.logList = [];
						rowList.forEach((arr,k) => {
							const obj = {
								city: `${arr[0]}-北京`,
								num: arr[1],
								car: arr[2],
								train: arr[3],
								plane: arr[4],
							}
							that.logList.push(obj);
						})
						
					// })
				}else{
					const res = require('../../static/self/qianxi-ou.json')
					// get('/static/self/qianxi-ou.json').then(res=>{
						let rowList = res.data;
						that.logList = [];
						rowList.forEach((arr,k) => {
							const obj = {
								city: `北京-${arr[0]}`,
								num: arr[1],
								car: arr[2],
								train: arr[3],
								plane: arr[4],
							}
							that.logList.push(obj);
						// })
						
					})
				}
			}
		}
	}
</script>

<style>	
	.main{		
		width: 100%;
	}
	.head_box{
		width: 700upx;
		height: 230upx;
		background-color: #ffffff;
		border-radius: 15upx;
	}
	.btn-box{
		width: 310upx;
		height: 150upx;
		border-radius: 20upx;
	}
	.scroll{
		height: 700rpx;
	}
</style>
