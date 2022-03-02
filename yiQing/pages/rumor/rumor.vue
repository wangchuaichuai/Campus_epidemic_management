<template>
	<view class="bg-white">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true"><block slot="backText">返回</block><block slot="content">校园疫情通告</block></cu-custom>
		<view class="cu-card dynamic">
			<uni-collapse accordion>
			    <uni-collapse-item title="校园疫情实事" style="color:#000000">
			        <text style="font-size:18px;color:#666666;margin-top:10px;margin-bottom:10px;margin-left:5px;text-align:center;" @click="getMsg">校园疫情实事</text>
					 <text style="font-size:18px;color:#666666;margin-top:10px;margin-bottom:10px;margin-left:5px;text-align:center;" @click="getMsg">校园疫情实事</text>
					  <text style="font-size:18px;color:#666666;margin-top:10px;margin-bottom:10px;margin-left:5px;text-align:center;" @click="getMsg">关于我校对疫情防疫工作展开的会议</text>
			    </uni-collapse-item>
			    <uni-collapse-item title="校园疫情防疫工作展开" style="color:#000000">
			            <text style="font-size:18px;color:#666666;margin-top:10px;margin-bottom:10px;margin-left:5px;text-align:center;" @click="getMsg" >关于我校对疫情防疫工作展开的会议0</text>
						<text style="font-size:18px;color:#666666;margin-top:10px;margin-bottom:10px;margin-left:5px;text-align:center;" @click="getMsg">关于我校对疫情防疫工作展开的会议1</text>
						<text style="font-size:18px;color:#666666;margin-top:10px;margin-bottom:10px;margin-left:5px;text-align:center;" @click="getMsg">关于我校对疫情防疫工作展开的会议2</text>
			    </uni-collapse-item>
			</uni-collapse>
			<view class="shadow">
				<view class="cu-list menu-avatar comment solids-top ">
					<block v-for="(itemObj,index) in list" :key="index">
						<view class='action margin text-lg text-bold text-center'>
							<text class='cuIcon-title text-blue'></text>{{itemObj.title}}<text class='cuIcon-title text-blue'></text>
						</view>
						<block v-for="(item,cindex) in itemObj.item" :key="cindex">
							<view class="cu-item" style="padding: 20rpx 40rpx;">
								<text>{{cindex+1}}</text>
								<view class="content">
									<view class="padding-sm radius text-sm shadow-blur">
										<view class="flex">
											<view class="flex-sub">
												<text>{{item.query}}</text>
												<text class="text-xs margin-left-sm">{{item.degree}}</text>
											</view>
										</view>
									</view>							
								</view>
								<template v-if="item.type < 1">
									<view class="cu-tag round bg-gray margin-left" style="left: -7px;"><text class="avatar-text"></text>普</view>
								</template>
								<template v-else-if="item.type == 1">
									<view class="cu-tag round bg-red margin-left" style="left: -7px;"><text class="avatar-text">热</text></view>
								</template>		
								<template v-else>
									<view class="cu-tag round bg-blue margin-left" style="left: -7px;"><text class="avatar-text">新</text></view>
								</template>	
							</view>		
						</block>
					</block>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {post,get} from '../../utils/index.js';
	var that
	export default {
		data() {
			return {
				list:[]
			}
		},
		onLoad() {
			that = this;
			that.getInfoList();
		},
		methods: {
			getInfoList() {
				// let url = '/common/self/baidu-opendata.json';
				// get(url).then(res=>{
					// const res = require('../../common/self/baidu-opendata.json')
					// this.list = res.data[0].list;
				// })
			},
			getMsg(){
				uni.showModal({
					content: '暂无相关报告',
					showCancel: false
				});
			}
		}
	}
</script>

<style>

</style>
