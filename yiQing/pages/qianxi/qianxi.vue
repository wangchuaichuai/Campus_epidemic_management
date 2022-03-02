<template>
	<view>
		<view style="position: relative;">
			<image style="width: 100px;height: 50px;position: absolute;z-index: 10;right: 0;left: auto;" src="../../static/2.jpg"></image>
			<image src="../../static/banner2.jpg" mode="widthFix" style="width: 100%;"></image>
		</view>
		<view class="text-xs" style="position:absolute;top:250upx;left:40upx;z-index:100000;color:#fff;">
			<text class="text-sm">来自腾讯人口迁徙大数据 | {{modifyTime}}更新</text>
		</view>
		<view style="font-size: 30px;text-align: center;margin-top: 15rpx;margin-bottom: 15rpx;">全国人口迁入迁出数据
		<br/>
			<view style="color: #999999;font-size: 10px;">
				(请在首页切换城市以便找到自己的地区)
			</view>
		</view>
		<view style="float: right;color: #999999;font-size: 10px;">联系我们:<view>负责人电话:17696164952</view></view>
		<br />
		<view>
			<!--概况记录-->
			<view id="segmented" class="margin-top-sm" style="margin-top: 30px;">
				<uni-segmented-control :current="current" :values="items" style-type="text" :active-color="activeColor" @clickItem="onClickItem" />
			</view>
			<!-- class="scroll" -->
			<view class="cu-list menu card-menu margin-top-sm" >
				<navigator class="cu-item" v-for="(item,key) in logList" :key = "key">
					<view class="content padding-tb-sm">
						<view>
							<text class="cuIcon-peoplefill text-blue margin-right-xs"></text><text class="text-df">{{item.city}}</text>
							<text class="text-gray text-sm margin-left">{{item.num}}(人)</text>
						</view>
						<view class="text-gray margin-tb-sm">
							<view class='cu-tag bg-blue'><view class="icon icon-car"></view>: {{item.car}}</view>
							<view class='cu-tag bg-cyan'><view class="icon icon-train"></view>: {{item.train}}</view>
							<view class='cu-tag bg-olive'><view class="icon icon-plane"></view>: {{item.plane}}</view>
						</view>
					</view>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	import {post,get,showModal} from '../../utils/index.js';
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
				logList:[],
				modifyTime: ''
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
			that.todayDate();
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
								car: this.toPercent(arr[2]),
								train: this.toPercent(arr[3]),
								plane: this.toPercent(arr[4]),
							}
							that.logList.push(obj);
						// })
						
					})
				}else{
					const res = require('../../static/self/qianxi-ou.json')
					// get('/static/self/qianxi-ou.json').then(res=>{
						let rowList = res.data;
						that.logList = [];
						rowList.forEach((arr,k) => {
							const obj = {
								city: `北京-${arr[0]}`,
								num: arr[1],
								car: this.toPercent(arr[2]),
								train: this.toPercent(arr[3]),
								plane: this.toPercent(arr[4]),
							}
							that.logList.push(obj);
						// })
						
					})
				}
			},
			toPercent(point) {
			    let str=Number(point*100).toFixed(2);
			    str+="%";
			    return str;
			},
			todayDate() {
				let global_yesterday = null;
				if(new Date().getHours() >= 5 ){
					global_yesterday = new Date( new Date().getTime() - 60 * 60 * 1000 * 24 );
				}else{
					global_yesterday = new Date( new Date().getTime() - 60 * 60 * 1000 * 24 * 2);
				}
				let date = global_yesterday;
				let year = date.getFullYear();
				let month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
				let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
				this.modifyTime = `${year}年${month}月${day}日`;
			}
		}
	}
</script>

<style>	
	.main{		
		width: 100%;
	}
	.head_box{
		width: 700rpx;
		height: 230rpx;
		background-color: #ffffff;
		border-radius: 15rpx;
	}
	.btn-box{
		width: 310rpx;
		height: 150rpx;
		border-radius: 20rpx;
	}
	.scroll{
		height: 700rpx;
	}
	.icon {
	    display: inline-block;
	    width: 16px;
	    height: 16px;
	    background: url(../../static/icon.png) no-repeat;
	    vertical-align: middle;
	    background-size: 165px;
	}
	.icon-plane {
	    background-position: -116px 0;
	}
	.icon-train {
	    background-position: -82px 0;
	}
	.icon-car {
	    background-position: -99px 0;
	}
</style>
