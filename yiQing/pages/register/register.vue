<template>
	<view>
		<image src="../../static/1.jpg" mode="widthFix" style="width: 100%;"></image>
		<view style="font-size: 30px;text-align: center;margin-top: 15rpx;margin-bottom: 15rpx;">每日打卡~</view>
		<form @submit="formSubmit">
			<view class="cu-form-group">
				<view class="title">姓名</view>
				<input placeholder="请输入姓名" name="username"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">今日体温</view>
				<input placeholder="请输入今日体温℃" name="temperature"></input>
			</view>
			<radio-group name="contact_virus" class="block" @change="RadioChangeA">
				<view class="cu-form-group margin-top">
					<view class="title">近期是否发热、发烧</view>
					<!-- #ifndef MP-ALIPAY -->
					<view class="cu-form-group">
						<view class="title">无
							<radio style="margin-left: 20rpx;" :class="contact=='A'?'checked':''" :checked="contact=='A'?true:false" value="A"></radio>
						</view>
						<view class="title">有
							<radio style="margin-left: 20rpx;" :class="contact=='B'?'checked':''" :checked="contact=='B'?true:false" value="B"></radio>
						</view>
					</view>	
					<!-- #endif -->
				</view>
			</radio-group>
			<radio-group name="have_symptom" class="block" @change="RadioChangeB">
				<view class="cu-form-group margin-top">
					<view class="title">有无疑似症状</view>
					<!-- #ifndef MP-ALIPAY -->
					<view class="cu-form-group">
						<view class="title">无
							<radio style="margin-left: 20rpx;" :class="symptom=='A'?'checked':''" :checked="symptom=='A'?true:false" value="A"></radio>
						</view>
						<view class="title">有
							<radio style="margin-left: 20rpx;" :class="symptom=='B'?'checked':''" :checked="symptom=='B'?true:false" value="B"></radio>					
						</view>
					</view>				
					<!-- #endif -->
				</view>
			</radio-group>
			<radio-group name="current_location" class="block" @change="RadioChangeC">
				<view class="cu-form-group margin-top">
					<view class="title">当前位置</view>
				</view>
				<!-- #ifndef MP-ALIPAY -->
				<view class="cu-form-group">
					<view class="title">居家
						<radio style="margin-left: 20rpx;" :class="location=='A'?'checked':''" :checked="location=='A'?true:false" value="A"></radio>
					</view>
					<view class="title">校内
						<radio style="margin-left: 20rpx;" :class="location=='B'?'checked':''" :checked="location=='B'?true:false" value="B"></radio>					
					</view>
					<view class="title">校外
						<radio style="margin-left: 20rpx;" :class="location=='C'?'checked':''" :checked="location=='C'?true:false" value="C"></radio>					
					</view>
				</view>
				<!-- #endif -->
			</radio-group>

			<checkbox-group class="block" @change="CheckboxChange" name="health">
				<view class="cu-form-group margin-top">
					<view class="title">当前健康状况</view>					
				</view>
				<!-- #ifndef MP-ALIPAY -->
				<view class="cu-form-group">
					<view class="title">良好
						<checkbox style="margin-left: 15rpx;" :class="health[0].checked?'checked':''" :checked="health[0].checked?true:false" value="A"></checkbox>
					</view>
					<view class="title">咳嗽
						<checkbox style="margin-left: 15rpx;" :class="health[1].checked?'checked':''" :checked="health[1].checked?true:false" value="B"></checkbox>
					</view>
					<view class="title">乏力
						<checkbox style="margin-left: 15rpx;" :class="health[2].checked?'checked':''" :checked="health[2].checked?true:false" value="C"></checkbox>
					</view>
					<view class="title">发热
						<checkbox style="margin-left: 15rpx;" :class="health[3].checked?'checked':''" :checked="health[3].checked?true:false" value="D"></checkbox>
					</view>
				</view>
				<!-- #endif -->
			</checkbox-group>
			<view class="padding-tb-sm">
				<button form-type="submit" class="cu-btn block bg-blue margin-tb-sm lg">
					<text class="cuIcon-upload margin-right-sm"></text>提交
				</button>
			</view>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				contact: 'A',
				symptom: 'A',
				location: 'A',
				health: [{
					value: 'A',
					checked: true
				}, {
					value: 'B',
					checked: false
				}, {
					value: 'C',
					checked: false
				}, {
					value: 'D',
					checked: false
				}]	
			};
		},
		methods: {
			RadioChangeA(e) {
				this.contact = e.detail.value
			},
			RadioChangeB(e) {
				this.symptom = e.detail.value
			},
			RadioChangeC(e) {
				this.location = e.detail.value
			},
			CheckboxChange(e) {
				let items = this.health;
				let values = e.detail.value;
				for (let i = 0, lenI = items.length; i < lenI; ++i) {
					items[i].checked = false;
					for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
						if (items[i].value == values[j]) {
							items[i].checked = true;
							break
						}
					}
				}
			},
			formSubmit: function(e) {				
				let formData = e.detail.value;
				formData.health = formData.health.join();
				//let submitData = Object.assign(formData, data);
				console.log(formData)
				uni.showModal({
					content: '上传成功',
					showCancel: false
				});
			}
		}
	}
</script>

<style>
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
</style>
