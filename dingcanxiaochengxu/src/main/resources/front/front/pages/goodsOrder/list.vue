<template>
    <view>
        <scroll-view  scroll-x class="bg-white nav">
            <view class='flex text-center'>
                <view class="cu-item flex-sub text-df " @click="navselect(0)"
                      :class="[currentIndex == 0 ? 'text-red cur' : '']">
                    全部
                </view>
                <view class="cu-item flex-sub text-df " @click="navselect(nav.codeIndex)" v-for="(nav,index) in navlist" :key="index"
                      :class="[currentIndex == nav.codeIndex ? 'text-red cur' : '']">
                    {{nav.indexName}}
                </view>
            </view>
        </scroll-view>
        <mescroll-uni :top="88" @init="mescrollInit" :up="upOption" :down="downOption" @down="downCallback" @up="upCallback">
            <view v-for="(item,index) in list" :key="index">
                <view class="bg-white margin-sm padding-sm solids-bottom radius text-content">
                    <view class="flex justify-between">
                        <view class="text-bold" style="flex-shrink: 0;">
                            <text class="text-green">{{ item.goodsOrderTypes == 1?item.goodsOrderValue:'' }}</text>
                            <text class="text-red">{{ item.goodsOrderTypes == 2?item.goodsOrderValue:'' }}</text>
                            <text class="text-grey">{{ item.goodsOrderTypes == 3?item.goodsOrderValue:'' }}</text>
                            <text class="text-blue">{{ item.goodsOrderTypes == 4?item.goodsOrderValue:'' }}</text>
                            <text class="text-brown">{{ item.goodsOrderTypes == 5?item.goodsOrderValue:'' }}</text>
                        </view>
                        <view><text class="icon-goods padding-right-sm"></text><text class="text-bold solids-bottom">{{ item.goodsOrderUuidNumber }}</text></view>
                    </view>
                    <view class="bg-white margin-xs padding-xs  radius text-content">
                        <view class="flex padding-top-sm solids-top">
                            <image :src="item.goodsPhoto" style="flex-shrink: 0;" mode="aspectFill" class=" cover radius solids"></image>
                            <view class="text-content padding-left" style="flex-grow: 1;">
                                <view>{{ item.goodsName }}</view>
                                <view>{{ item.goodsValue }}</view>
                                <view >{{ item.buyNumber }} x ￥{{ item.goodsNewMoney }}</view>
                            </view>
                        </view>
                        <view class="flex justify-end">合计{{ item.goodsOrderTruePrice }}元</view>
                    </view>
                    <view class="flex justify-end"></view>
                    <view class="flex justify-end" style="font-size: 24upx;">
                        <view v-if="item.goodsOrderTypes == 2">
                            <view @tap="refund(item)" class="round cu-btn lines-grey mid  margin-right-sm">退款</view>
                        </view>
                        <view v-if="item.goodsOrderTypes == 2 && item.shangjia == user.id">
                            <view @tap="deliver(item.id)" class="round cu-btn lines-grey mid  margin-right-sm">发货</view>
                        </view>
                        <view v-if="item.goodsOrderTypes == 3">
                            <view @tap="receiving(item.id)" class="round cu-btn lines-grey mid  margin-right-sm">取餐</view>
                        </view>
                        <view v-if="item.goodsOrderTypes == 4">
                            <view @tap="commentback(item.id)" class="round cu-btn lines-grey mid  margin-right-sm">评价</view>
                        </view>
                    </view>
                </view>
            </view>
            <uni-popup class="popup-content" ref="popup" type="center">
                <form class="popup-form">
                    <view class="uni-flex uni-column" style="background-color: #FFFFFF;border-radius: 10rpx;width: 500rpx;">
                        <view class="flex-item flex-item-V" style="text-align: center;font-size: 40upx;font-weight: bold;margin: 20upx;">评论内容</view>
                        <view class="flex-item flex-item-V">
                            <textarea style="width: 400rpx;margin: 10rpx 0 10rpx 50rpx;border-style:dotted;border-width:1rpx;border-radius: 10rpx" v-model="goodsCommentbackText" placeholder="评论内容"></textarea>
                        </view>
                        <view class="flex-item flex-item-V" style="text-align: right;background: #FFFFFF;">
                            <button @tap="onCloseWinTap" style="margin: 0 0 10rpx 50rpx;" class="cu-btn bg-cyan">取消</button>
                            <button @tap="onFinishTap" style="float: right;margin: 0 50rpx 10rpx 0;" class="cu-btn bg-red">确认</button>
                        </view>
                    </view>
                </form>
            </uni-popup>


        </mescroll-uni>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                navlist: [
                ],
                currentIndex: 0,
                pages: 1,
                list: [],
                mescroll: null, //mescroll实例对象
                downOption: {
                    auto: false //是否在初始化后,自动执行下拉回调callback; 默认true
                },
                upOption: {
                    page: {
                        // num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
                        // size: 5 // 每页数据的数量
                    },
                    noMoreSize: 3, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
                    textNoMore: '~ 没有更多了 ~',
                },
                hasNext: true,
                goodsLiuyanText: '',
                user: '',
                //评价
                goodsId:null,
                goodsCommentbackText: null,

            }
        },
        async onShow() {
            let table = uni.getStorageSync("nowTable");
            let res = await this.$api.session(table)
            this.user = res.data
            this.hasNext = true

            let params = {
                page: 1,
                limit: 100,
                dicCode: 'goods_order_types',
            }
            let goodsOrderTypesRes = await this.$api.page(`dictionary`, params);

            this.navlist = goodsOrderTypesRes.data.list

            // 重新加载数据
            if (this.mescroll) this.mescroll.resetUpScroll()
        },
        methods: {
            navselect(nav) {
                this.currentIndex = nav
                this.goodsOrderTypes = nav
                this.hasNext = true
                // 重新加载数据
                if (this.mescroll) this.mescroll.resetUpScroll()
            },
            // mescroll组件初始化的回调,可获取到mescroll对象
            mescrollInit(mescroll) {
                this.mescroll = mescroll;
            },
            /*下拉刷新的回调 */
            downCallback(mescroll) {
                this.hasNext = true
                // 重置分页参数页数为1
                mescroll.resetUpScroll()
            },
            /*上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10 */
            async upCallback(mescroll) {
                let params = {
                    page: mescroll.num,
                    limit: mescroll.size,
                }
                if (this.goodsOrderTypes) {
                    params['goodsOrderTypes'] = this.goodsOrderTypes
                }
                let res = await this.$api.page('goodsOrder', params);
                // 如果是第一页数据置空
                if (mescroll.num == 1) this.list = [];
                this.list = this.list.concat(res.data.list);
                if (res.data.list.length == 0) this.hasNext = false;
                mescroll.endSuccess(mescroll.size, this.hasNext);
            },
            //退款
            async refund(order) {
                let _this = this;
                uni.showModal({
                    title: '提示',
                    content: '是否确认退款',
                    success: async function(res) {
                        if(res.confirm){
                            var value = [
                                {
                                    key:'id',
                                    val:order.id,
                                }
                            ]
                            var returnVal = await _this.$api.requestCondition("goodsOrder", "refund",value);
                            _this.$utils.msg('退款成功');
                            if (_this.mescroll) _this.mescroll.resetUpScroll()
                        }
                    }
                });
            },
            //发货
            async deliver(order) {
                let _this = this;
                uni.showModal({
                    title: '提示',
                    content: '是否确认发货',
                    success: async function(res) {
                        if(res.confirm){
                            var value = [
                                {
                                    key:'id',
                                    val:order.id,
                                }
                            ]
                            var returnVal = await _this.$api.requestCondition("goodsOrder", "deliver",value);
                            _this.$utils.msg('成功发货');
                            if (_this.mescroll) _this.mescroll.resetUpScroll()
                        }
                    }
                });
            },
            //取餐
            async receiving(id){
                let _this = this;
                uni.showModal({
                    title: '提示',
                    content: '是否确认已取餐吗？',
                    success: async function(res) {
                        if(res.confirm){
                            let order = [
                                {
                                    key: 'id',
                                    val: id
                                }
                            ]
                            var returnVal = await _this.$api.requestCondition("goodsOrder","receiving",order);
                            _this.$utils.msg('操作成功');
                            if (_this.mescroll) _this.mescroll.resetUpScroll()
                        }
                    }
                });
            },
            //评价
            commentback(id) {
                 this.goodsId = null
                 this.goodsId = id
                 this.$refs.popup.open()
            },
            //评价内容
            async onFinishTap() {
                let _this = this
                if (!_this.goodsCommentbackText) {
                    _this.$utils.msg('请填写评价内容');
                    return
                }
                let data = [
                    {
                        key:'id',
                        val:_this.goodsId,
                    },{
                        key:'commentbackText',
                        val:_this.goodsCommentbackText,
                    }
                ]
                await _this.$api.requestCondition("goodsOrder",'commentback', data);
                _this.$utils.msg('评论成功');
                _this.$refs.popup.close();
                if (_this.mescroll) _this.mescroll.resetUpScroll()
            },
            // 关闭窗口
            onCloseWinTap() {
                this.$refs.popup.close()
            },

        }
    }
</script>

<style>
    .cover {
        width: 150upx;
        height: 150upx;
    }
</style>
