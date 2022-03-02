<template>
	<view>
		<view class='UCenter-bg'>
			<view class="padding">
				<view class="cu-avatar lg round margin-left" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg);"></view>
			</view>
			<view class='text-xl' style="font-size: 36upx;">{{shequ.name}}</view>
			<view class='padding-top-sm' style="padding-top: 10upx">
				<text>编号：{{shequ.shequ_id}}</text>
			</view>
			<image src='https://api.szyashu.com/static/wave.gif' mode='scaleToFill' class='gif-wave'></image>
		</view>
		<view class="cu-list menu sm-border card-menu padding-top-xs">
			<view class="cu-item arrow" @tap="SelectShequ">
				<view class="content">
					<text class="cuIcon-list text-lg"/>
					<text class="text-left">数据列表</text>
				</view>				
			</view>
			<navigator v-if="type == 1" url="../member_detail/list" class="cu-item arrow">
				<view class="content">
					<text class="cuIcon-friend text-lg"/>
					<text class="text-left">成员管理</text>
				</view>				
			</navigator>
			
		</view>
		<view class="cu-list menu sm-border card-menu">
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-apps text-lg"/>
					<text class="text-left">当前版本</text>
				</view>
				<view class="action">
					<text>v{{version}}</text>
				</view>
			</view>
			
			<navigator url="about_us" class="cu-item arrow">
				<view class="content">
					<text class="cuIcon-info text-lg"/>
					<text class="text-left">关于我们</text>
				</view>				
			</navigator>
		</view>	
		<view class="flex padding-top-sm justify-center flex-direction align-center margin-bottom-lg">
			<view class="text-gray">我的二维码</view>
			<view class="padding-top-sm">
				<tki-qrcode cid="qrcode2" ref="qrcode2" :val="val" :background="background" :foreground="foreground" :pdground="pdground" :size="200" :onval="true" :loadMake="true" :usingComponents="true" @result="qrR" />
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex';
	import {post,get,showModal} from '../../utils/index.js';
	import {version} from 'utils/config.js';
	import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue';
	var that;
	export default {
		computed:mapState(['login_info','WsClient']),
		components: {tkiQrcode},
		data() {
			return {
				version:'',
				src: '', // 二维码生成后的图片地址或base64
				foreground: '#000000', // 前景色
				pdground: '#309286', // 角标色
				background:'#ffffff',
				shequ:{
					name: '长孙无忌',
					shequ_id: '01102'
				},
				type:0,
				val:'http://www.bjcsghxh.com:9002/'
			}
		},
		onLoad() {
			that = this;
			this.version = version;
		},
		methods: {
			qrR(res) {
				this.src = res
			},
			SelectShequ(){
			},
		}
	}
</script>

<style>
	.UCenter-bg {
	  /* background-image: url('https://api.szyashu.com/static/index.jpg'); */
	  /* background-size: cover; */
	  background-color: #66ccff;
	  height: 312upx;
	  display: flex;
	  justify-content: center;	  
	  overflow: hidden;
	  position: relative;
	  flex-direction: column;
	  align-items: center;
	  color: #fff;
	  font-weight: 300;
	  text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
	}
	
	.UCenter-bg text {
	  opacity: 0.8;
	}
	
	.UCenter-bg image {
	  width: 200rpx;
	  height: 200rpx;
	}
	
	.UCenter-bg .gif-wave{
	  position: absolute;
	  width: 100%;
	  bottom: 0;
	  left: 0;
	  z-index: 99;
	  mix-blend-mode: screen;  
	  height: 100rpx;   
	}
</style>