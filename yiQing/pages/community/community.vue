<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true"><block slot="backText">返回</block><block slot="content">疫情实时数据</block></cu-custom>
		<image src="../../static/banner4.jpg" style="height: 300upx;width: 100%;"></image>
		<view class="text-xs" style="position:absolute;top:150upx;left:40upx;z-index:100000;color:#fff;">
			<text class="text-xxl text-bold">新冠肺炎小区查询</text>
		</view>
		<view class="text-xs" style="position:absolute;top:250upx;left:40upx;z-index:100000;color:#fff;">
			<text class="text-sm">来自卫健委等机构发布数据 | {{modifyTime}}更新</text>
		</view>
		<view class="grid col-2 bg-white padding"  @tap="showModal" data-target="clicklist">
			<view class="text-center solids-right" >
				<view class="title">选择区域</view>
			</view>
			<view class="text-center">
				<view class="title">{{cityone}} <text class="cuIcon-unfold"></text></view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='clicklist'?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop>
				<view class="cu-list grid col-4">
					<view class="cu-item" @click="clickcity(index)" v-for="(item,index) in citylist" :key="index">							
						<text>{{item}}</text>							
					</view>
				</view>
			</view>
		</view>
		<view class="cu-list menu">
			<block v-for="(itemObj,kindex) in communitylist" :key="kindex">
				<block v-for="(item,index) in itemObj" :key="index">
					<view class="cu-bar bg-white">
						<view class="action">
							<text class="cuIcon-title text-red"></text>
							<text class="text-xl text-bold">{{index}}（{{item.length > 1 ? item.length : 1 }}个确定地点）</text>
						</view>
					</view>
					<view class="cu-list grid col-2" style="border-bottom: 4upx solid #666;color: #999;">
						<view class="padding-xs text-lg">逗留地点</view>
						<view class="padding-xs text-lg">逗留人数</view>							
					</view>
					
					<view class="cu-list grid col-2" style="padding:0;margin-top: 0;">
						<block v-for="(item1,index1) in item" :key="index1">
							<view class="padding-xs text-df text-left padding-left-xl">{{item1.community ? item1.community : item1.show_address}}</view>
							<view class="padding-xs text-df padding-left-xl">{{item1.cnt_sum_certain > 0 ? item1.cnt_sum_certain : '未发布'}}</view>								
						</block>
					</view>
				</block>
			</block>
		</view>
		<view class="cu-bar tabbar foot shop no-border status_bar map-right" @tap="openMap">
			<image src="../../static/open-map.png" style="height: 140upx; width: 140upx;"></image>
		</view>
	</view>
</template>

<script>
	import {post,get} from '../../utils/index.js';
	var that;
	export default {
		data() {
			return {
				dataList: [],
				xiaoQuCode: {},
				city: '',
				mdc: '',
				cityone: '',
				communitylist: [],
				setting: {
					click: 11,
					top_thumb: '../../static/bg1.png',
					ewm: '../../static/rank.png',
					jiayou: 45
				},
				citylist:[],
				modalName: null,
				markers: [],
				modifyTime: ''
			}
		},
		onLoad(e) {
			that = this;
			that.city = e.city;
			that.mdc = e.mdc;
			that.cityone = e.cityone;
			// get('/static/self/city-uuid.json').then(res=>{
			const res = require('../../static/self/city-uuid.json')
				this.xiaoQuCode = res.data;
				this.initXiaoQu();
			// })
		},
		onShow() {
			this.today();
		},
		methods: {
			initXiaoQu() {
				let mdc = that.mdc;
				let url = `https://spider.ws.126.net/disease_map_data_v3/data_${mdc}?name=jQuery${mdc}&callback=jQuery${mdc}`;
				uni.showModal({
					content: `${url}`,
					showCancel: false
				});
				get(url).then(res=>{
				// const res = require()
					this.citylist = [];
					let ipos = res.indexOf('(');
					let ilast = res.lastIndexOf(')');
					let jsonStr = res.substring(ipos + 1,ilast);
					let jsonObj = JSON.parse(jsonStr);
					let dataList = jsonObj.data[this.city];				
					let jsonB = this.xiaoQuCode[this.city];
					Object.keys(jsonB).forEach(key => {
						this.citylist.push(key);
					});
					this.communitylist = dataList;
					this.markers = this.getmarkers(dataList[this.cityone]);

				})
				
			},
			getmarkers(obj) {
				let sno = 0;
				let iconPath = '../../static/locationS.png';
				let markers = [];
				Object.keys(obj).forEach(key => {					
					obj[key].forEach((v,k) => {
						const {province,city,district,community,cnt_sum_certain,lng,lat} = v;
						sno = sno + 1;
						let marker = {
							id: sno,
							latitude: lat,
							longitude: lng,
							iconPath,
							callout: {
								content: `${city}${district}${community}\n\n人数: ${cnt_sum_certain}`,
								color:'#00aaff',
								fontSize:14,
								borderRadius:5,
								padding:10,
								display:'BYCLICK',
							}
						}
						markers.push(marker);
					})
				});
				return markers;
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			clickcity(index){
				this.cityone = this.citylist[index];
				let mdc = this.xiaoQuCode[this.city][this.cityone];				
				let url = `https://spider.ws.126.net/disease_map_data_v3/data_${mdc}?name=jQuery${mdc}&callback=jQuery${mdc}`;
				get(url).then(res=>{
					this.citylist = [];
					let ipos = res.indexOf('(');
					let ilast = res.lastIndexOf(')');
					let jsonStr = res.substring(ipos + 1,ilast);
					let jsonObj = JSON.parse(jsonStr);
					let dataList = jsonObj.data[this.city];				
					let jsonB = this.xiaoQuCode[this.city];
					Object.keys(jsonB).forEach(key => {
						this.citylist.push(key);
					});
					this.communitylist = dataList;
					this.markers = this.getmarkers(dataList[this.cityone]);
				})
				this.modalName = null
			},
			openMap() {				
				try {
				    uni.setStorageSync('mapMarkers', this.markers);
					uni.navigateTo({
						url: './map?city=' + this.city + '&cityone=' + this.cityone
					})
				} catch (e) {
				    // error
				}
			},
			today() {
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
	.map-right{	    
	    left: 80%;
	}
</style>
