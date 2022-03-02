<template>
	<view>
		<cover-image src = "../../../static/bg.png"></cover-image>
		<view style="position: absolute;top:10upx;width: 100%;padding-left: 40upx;">
			<view class="flex justify-left align-center margin-top-sm">
				<text class="text-white text-bold text-xxl">科学防护 共渡难关</text>				
			</view>
			<view class="flex justify-left align-center margin-top-sm">
				<text class="text-white text-lg">肺炎疫情实时动态播报</text>
			</view>			
		</view>
		
		<view>	
			<!--社区出行概况-->
			<view class="flex justify-center align-center">
				<view class="head_box">
					<view class="flex justify-around text-df padding-top">
						<text>北京市疫情数据</text>
						<text>（截至2020-02-13 16:36）</text>
					</view>
					<view class="flex justify-around padding-top-xl">
						<view class="flex flex-direction align-center">
							<text class="text-red text-bold">{{confirmed}}</text>
							<text>确诊</text>
							<text class="text-sm text-red">较昨日+{{confirmedRelative}}</text>
						</view>
						<view class="flex flex-direction align-center">
							<text class="text-orange text-bold">{{died}}</text>
							<text>死亡</text>
							<text class="text-sm text-orange">较昨日+{{diedRelative}}</text>
						</view>
						<view class="flex flex-direction align-center">
							<text class="text-blue text-bold">{{crued}}</text>
							<text>治愈</text>
							<text class="text-sm text-blue">较昨日+{{curedRelative}}</text>
						</view>
					</view>
				</view>
			</view>	
		</view>
		
		<view>
			<!--社区出行概况-->
			<view class="flex justify-center align-center">
				<view class="head_box">					
					<view class="flex justify-around padding-top-xl margin-top-sm">
						<view class="flex flex-direction align-center">
							<image style="width: 100upx; height: 100upx;" :src="srcOne"></image>
							<text>同乘患者查询</text>
						</view>
						<view class="flex flex-direction align-center">
							<image style="width: 100upx; height: 100upx;" :src="srcTwo"></image>
							<text>小区疫情查询</text>
						</view>						
					</view>
				</view>
			</view>	
		</view>
		
		<view>
			<view>
				<uni-section title="北京 现有/新增确诊 趋势图" type="line"></uni-section>
				<view>
					<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" disable-scroll=true @touchstart="touchLineA" @touchmove="moveLineA" @touchend="touchEndLineA"></canvas>										
				</view>
			</view>	
			
			<view>
				<uni-section title="北京市详细疫情" type="line"></uni-section>
				<scroll-view id="scroll" scroll-y = "true">
					<view class="cu-list menu card-menu margin-top-sm" >
						<navigator class="cu-item" v-for="(item,key) in subList" :key = "key">
							<view class="content padding-tb-sm">
								<view>
									<text class="cuIcon-peoplefill text-blue margin-right-xs"></text>{{item.city}}
								</view>
								<view class="text-gray margin-right">
									<text>确诊：{{item.confirmed}}</text>
								</view>
								<view class="text-gray margin-right">
									<text>治愈：{{item.crued}}</text>
								</view>
								<view class="text-gray">
									<text>死亡：{{item.died}}</text>
								</view>
							</view>
							<view class="action">
								<view class="cu-tag round bg-green light">
									<text class="cuIcon-search text-blue margin-right-xs"></text>查看详情
								</view>
							</view>							
						</navigator>
					</view>
				</scroll-view>				
			</view>
		</view>
	</view>
</template>
<script>
	import uniSection from '@/components/uni-section/uni-section.vue';
	import uniList from '@/components/uni-list/uni-list.vue';
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue';
	import uCharts from '../../../components/u-charts/u-charts.js';
	import {post,get,showModal} from '../../../utils/index.js';
	var _self;
	var canvasObj = {};
	export default {
		components: {
			uniSection,
			uniList,
			uniListItem
		},
		data() {
			return {
				title: 'Hello',
				subList: [],
				confirmed: 0, //确诊
				died: 0, //死亡
				crued: 0, //治愈
				confirmedRelative: 0, //相对昨日确认
				diedRelative: 0,
				curedRelative: 0,
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				scrollHeight: '',
				srcOne: '../../../static/train.png',
				srcTwo: '../../../static/xiaoqu.png',
				srcThree: '../../../static/img/3.png',
				srcFour: '../../../static/img/4.png',				
			};
		},
		onLoad() {
			_self = this;
			//#ifdef MP-ALIPAY
			uni.getSystemInfo({
				success: function(res) {
					if (res.pixelRatio > 1) {
						//正常这里给2就行，如果pixelRatio=3性能会降低一点
						//_self.pixelRatio =res.pixelRatio;
						_self.pixelRatio = 2;
					}
				}
			});
			//#endif
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);
			this.scrollHeight = uni.upx2px(500);
		},
		onReady() {
			this.getServerData();
			this.getServerList();			
		},
		methods: {
			switchChange(e) {
				uni.showToast({
					title: 'change:' + e.value,
					icon: 'none'
				})
			},
			getServerData() {
				const res = require('../../static/self/udata.json')
				// get('/static/self/udata.json').then(res=>{
					_self.fillData(res);
				// })
			},
			getServerList() {
				const res = require('../../static/self/yiqing-in.json')
				// get('/static/self/yiqing-in.json').then(res=>{
					_self.fillList(res);
				// })
			},
			fillList(data) {
				data.forEach((v,k) => {
					if (v.area==='北京'){
						const {confirmed,died,crued,
							confirmedRelative,diedRelative,curedRelative,subList} = v;
						this.confirmed = confirmed;
						this.died = died;
						this.crued = crued;
						this.confirmedRelative = confirmedRelative;
						this.diedRelative = diedRelative;
						this.curedRelative = curedRelative;
						this.subList = subList;
					}
				});
			},
			fillData(data) {
				this.serverData = data;
				let LineA = {
					categories: [],
					series: []
				};
				LineA.categories = data.LineA.categories;
				LineA.series = data.LineA.series;								
				this.showLineA("canvasLineA", LineA);
			},			
			showLineA(canvasId, chartData) {
				canvasObj[canvasId] = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'line',
					fontSize: 11,
					padding:[0,15,0,15],
					legend:{
						show:true,
						padding:5,
						lineHeight:11,
						margin:5,
					},
					dataLabel: false,
					dataPointShape: false,
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: false,
					enableScroll: true, //开启图表拖拽功能
					colors: ['#da415d', '#e0c162'],
					xAxis: {
						disableGrid: false,
						type: 'grid',
						gridType: 'dash',
						itemCount: 10, 
						scrollShow: false, 
						//scrollAlign: 'left',
						//scrollBackgroundColor:'#F7F7FF',//可不填写，配合enableScroll图表拖拽功能使用，X轴滚动条背景颜色,默认为 #EFEBEF
						//scrollColor:'#DEE7F7',//可不填写，配合enableScroll图表拖拽功能使用，X轴滚动条颜色,默认为 #A6A6A6
					},
					yAxis: {
						//disabled:true
						gridType: 'dash',
						splitNumber: 8,
						min: 0,
						max: 400,
						format: (val) => {
							return val.toFixed(0);
						} //如不写此方法，Y轴刻度默认保留两位小数
					},
					legend: {
					    show: true, //是否显示各类别的图例标识
						position: 'top',
						float: 'right',
						padding: 10,
						margin: 0
						// itemGap:10,//各个item之间的间隔，单位px，默认为10，横向布局时为水平间隔，纵向布局时为纵向间隔
						// fontColor:'666666',
						// lineHeight:17,//默认opts.fontSize+5
						// fontSize:12,//默认opts.fontSize
						// backgroundColor:rgba(0,0,0,0),//图例背景颜色
						// borderColor:rgba(0,0,0,0),//图例边框颜色
						// format:()=>{}//未来预留，暂未生效】自定义显示数据内容
					},
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					dataLabel: true,
					dataPointShape: true,
					extra: {
						lineStyle: 'straight'
					},
				});
			
			},
			touchLineA(e) {
				canvasObj['canvasLineA'].scrollStart(e);
			},
			moveLineA(e) {
				canvasObj['canvasLineA'].scroll(e);
			},
			touchEndLineA(e) {
				canvasObj['canvasLineA'].scrollEnd(e);
				//下面是toolTip事件，如果滚动后不需要显示，可不填写
				canvasObj['canvasLineA'].showToolTip(e, {
					format: function(item, category) {
						return category + ' ' + item.name + ':' + item.data
					}
				});
			}
		}
	}
</script>

<style>	
	@keyframes show {
		0% {
			transform: translateY(-50px);
		}
	
		60% {
			transform: translateY(40upx);
		}
	
		100% {
			transform: translateY(0px);
		}
	}
	
	@-webkit-keyframes show {
		0% {
			transform: translateY(-50px);
		}
	
		60% {
			transform: translateY(40upx);
		}
	
		100% {
			transform: translateY(0px);
		}
	}
	
	cover-image {
		position: absolute;
		left: 0;
		top: 0;
		height: 300upx;
		width: 100%;
	}
	.main{
		position: absolute;
		top: 300upx;
		width: 100%;
	}
	.head_box{
		width: 100%;
		height: 246upx;
		background-color: #ffffff;
		border-radius: 15upx;
	}
	.charts {
		width: 100%;
		height: 500upx;
	}
</style>
