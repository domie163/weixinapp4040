<template>
	<view class="content">
		<view @tap="onPageTap('../user-info/userinfo')" class="header" v-bind:class="{'status':isH5Plus}"
			:style='{"backgroundColor":"#543622","height":"200rpx"}'>

			<view v-if="tableName=='yonghu'" class="userinfo">
				<view class="face"
					:style='{"width":"100rpx","boxShadow":"0 0 0px rgba(0,0,0,.3)","borderRadius":"100%","height":"100rpx"}'>
					<image :src="user.yonghuPhoto?user.yonghuPhoto:'/static/center/face.jpeg'"></image>
				</view>
				<view class="info">
					<view class="username"
						:style='{"boxShadow":"0 0 16rpx rgba(255,255,255,0)","backgroundColor":"rgba(0,0,0,0)","borderColor":"rgba(255,255,255,.3)","borderRadius":"8rpx","color":"rgba(255, 255, 255, 1.0)","textAlign":"left","borderWidth":"0","width":"240rpx","lineHeight":"36rpx","fontSize":"24rpx","borderStyle":"solid"}'>
						{{user.yonghuName}}
					</view>
					<view class="username"
						:style='{"boxShadow":"0 0 16rpx rgba(255,255,255,0)","backgroundColor":"rgba(0,0,0,0)","borderColor":"rgba(255,255,255,.3)","borderRadius":"8rpx","color":"rgba(255, 255, 255, 1.0)","textAlign":"left","borderWidth":"0","width":"240rpx","lineHeight":"36rpx","fontSize":"24rpx","borderStyle":"solid"}'>
						余额：{{user.newMoney}}</view>
				</view>
			</view>

			<view class="setting" :style='{"color":"#6a4826","fontSize":"40rpx"}'>
				<view class="cuIcon-settings"></view>
			</view>
		</view>
		<view class="list">
			
			<view @tap="chooseLocation"
				:style='{"backgroundColor":"#6a4826","borderColor":"#543622","lineHeight":"80rpx","borderStyle":"solid","borderWidth":"0 0 1rpx  0"}'
				class="li" hover-class="hover">
				<view class="text" :style='{"color":"#fff","fontSize":"28rpx"}'>查看附近餐厅</view>
				<!-- <image class="to" :style='{"color":"#fff","fontSize":"28rpx"}' src="/static/center/to.png"></image> -->
				<view class="cuIcon-right" :style='{"color":"#fff","fontSize":"28rpx"}'></view>
			</view>

			<view @tap="onPageTap('../recharge/recharge')"
				:style='{"backgroundColor":"#6a4826","borderColor":"#543622","lineHeight":"80rpx","borderStyle":"solid","borderWidth":"0 0 1rpx  0"}'
				class="li" hover-class="hover">
				<view class="text" :style='{"color":"#fff","fontSize":"28rpx"}'>用户充值</view>
				<!-- <image class="to" :style='{"color":"#fff","fontSize":"28rpx"}' src="/static/center/to.png"></image> -->
				<view class="cuIcon-right" :style='{"color":"#fff","fontSize":"28rpx"}'></view>
			</view>

			<view v-for="item in menuList" v-bind:key="item.roleName">
				<view v-if="role==item.roleName" v-bind:key="index" v-for=" (menu,index) in item.backMenu">
					<view v-bind:key="sort" v-for=" (child,sort) in menu.child">
						<view
							:style='{"backgroundColor":"#6a4826","borderColor":"#543622","lineHeight":"80rpx","borderStyle":"solid","borderWidth":"0 0 1rpx  0"}'
							@tap="onPageTap('../'+child.tableName+'/list?userid='+user.id)" class="li"
							hover-class="hover">
							<view :style='{"color":"#fff","fontSize":"28rpx"}' class="text">
								{{child.menu}}
							</view>
							<view class="cuIcon-right" :style='{"color":"#fff","fontSize":"28rpx"}'>
							</view>
						</view>
					</view>
				</view>
			</view>



		</view>
	</view>
</template>


<script>
	import menu from '@/utils/menu'
	export default {
		data() {
			return {
				isH5Plus: true,
				user: {},
				tableName: '',
				role: '',
				menuList: [],
			};
		},
		computed: {
			baseUrl() {
				return this.$base.url;
			}
		},
		async onLoad() {
			this.role = uni.getStorageSync("role");
			let table = uni.getStorageSync("nowTable");
			let res = await this.$api.session(table);
			this.user = res.data;
			this.tableName = table;
			let menus = menu.list();
			this.menuList = menus;
		},
		async onShow() {
			this.role = uni.getStorageSync("role");
			let table = uni.getStorageSync("nowTable");
			let res = await this.$api.session(table);
			this.user = res.data;
			this.tableName = table;
			let menus = menu.list();
			this.menuList = menus;
		},
		methods: {
			chooseLocation() {
				uni.chooseLocation({
					success: function(data) {}
				})
			},
			onPageTap(url) {
				uni.navigateTo({
					url: url,
					fail: function() {
						uni.switchTab({
							url: url
						});
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f1f1f1;
	}

	.content:after {
		position: fixed;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		content: '';
		background-attachment: fixed;
		background-size: cover;
		background-position: center;
	}

	.header {
		&.status {
			padding-top: var(--status-bar-height);
		}

		background-color:#ff6364;
		width:100%;
		height:30vw;
		padding:0 4%;
		display:flex;
		align-items:center;

		.userinfo {
			width: 100%;
			display: flex;
			align-items: center;

			.face {
				flex-shrink: 0;
				width: 15vw;
				height: 15vw;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
					// border-radius: 100%
				}
			}

			.info {
				// display: flex;
				flex-flow: wrap;
				padding-left: 30upx;

				.username {
					width: 100%;
					color: #fff;
					font-size: 40upx;
					// margin-bottom: 10upx;
					// margin-left: 10upx;
					margin: 8upx 0;
				}

				.integral {
					display: flex;
					align-items: center;
					padding: 0 8upx;
					// height: 40upx;
					color: #fff;
					background-color: rgba(0, 0, 0, 0.1);
					border-radius: 20upx;
					font-size: 24upx;
					// margin-bottom: 10upx;
					margin: 8upx 0;
				}
			}
		}

		.setting {
			flex-shrink: 0;
			// width: 6vw;
			// height: 6vw;

			image {
				width: 100%;
				height: 100%
			}
		}
	}

	.hover {
		background-color: #eee
	}

	.orders {
		background-color: #ff6364;
		width: 100%;
		height: 11vw;
		padding: 0 4%;
		margin-bottom: calc(11vw + 40upx);
		display: flex;
		align-items: flex-start;
		border-radius: 0 0 100% 100%;
		margin-top: -1upx;

		.box {
			width: 100%;
			padding: 0 1%;
			height: 22vw;
			background-color: #fefefe;
			border-radius: 24upx;
			box-shadow: 0 0 20upx rgba(0, 0, 0, 0.15);
			margin-bottom: 40upx;
			display: flex;
			align-items: center;
			justify-content: center;

			.label {
				display: flex;
				align-items: center;
				justify-content: center;
				flex-flow: wrap;
				width: 100%;
				height: 16vw;
				color: #666666;
				font-size: 26upx;

				.icon {
					position: relative;
					width: 7vw;
					height: 7vw;
					margin: 0 1vw;

					.badge {
						position: absolute;
						width: 4vw;
						height: 4vw;
						background-color: #ec6d2c;
						top: -1vw;
						right: -1vw;
						border-radius: 100%;
						font-size: 20upx;
						color: #fff;
						display: flex;
						align-items: center;
						justify-content: center;
						z-index: 10;
					}

					image {
						width: 7vw;
						height: 7vw;
						z-index: 9;
					}
				}
			}
		}
	}

	.list {
		width: 100%;
		border-bottom: solid 26upx #f1f1f1;

		.li {
			width: 100%;
			height: 100upx;
			padding: 0 4%;
			border-bottom: solid 1upx #e7e7e7;
			display: flex;
			align-items: center;
			background: #FFFFFF;
			font-size: 33upx;

			&.noborder {
				border-bottom: 0
			}

			.icon {
				flex-shrink: 0;
				width: 50upx;
				height: 50upx;

				image {
					width: 50upx;
					height: 50upx
				}
			}

			.text {
				padding-left: 20upx;
				width: 100%;
				color: #666
			}

			.to {
				flex-shrink: 0;
				width: 40upx;
				height: 40upx
			}
		}
	}
</style>
