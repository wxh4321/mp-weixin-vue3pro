<template>
	<view>
		<view class="banner" @click="goDetail(banner)">
			<image class="banner-img" :src="banner.cover"></image>
			<view class="banner-title">{{ banner.title }}</view>
		</view>
		<view class="uni-list">
			<block v-for="(value, index) in listData" :key="index">
				<view class="uni-list-cell" hover-class="uni-list-cell-hover" @click="goDetail(value)">
					<view class="uni-media-list">
						<image class="uni-media-list-logo" :src="value.cover"></image>
						<view class="uni-media-list-body">
							<view class="uni-media-list-text-top">{{ value.title }}</view>
							<view class="uni-media-list-text-bottom">
								<text>{{ value.author_name }}</text>
								<text>{{ value.published_at }}</text>
							</view>
						</view>
					</view>
				</view>
				<!-- #ifdef APP-PLUS -->
				<view class="ad-view" v-if="(index > 0 && (index+1) % 10 == 0)">
					<ad :adpid="adpid" @error="aderror"></ad>
				</view>
				<!-- #endif -->
			</block>
		</view>
		<uni-load-more :status="status" :icon-size="16" :content-text="contentText" />
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import { dateUtils } from  '../../../common/util.js';
	import { computed, defineComponent, reactive, toRefs,ref, 
	 onMounted,onBeforeMount,onBeforeUpdate,onUpdated,onBeforeUnmount,onUnmounted,onRenderTracked,
	 onRenderTriggered
	} from 'vue';
	
	export default defineComponent({
		components: {
			uniLoadMore
		},
		data() {
			return{
				banner:{},
				listData:[],
				last_id: '',
				reload: false,
				status: 'more',
				adpid: '',
				contentText: {
					contentdown: '上拉加载更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				}
			}
		},
		setup() {
			// console.log('setup')
			// onBeforeMount(() => {
			// console.log('onBeforeMount')
			// })
			// onMounted(() => {
			// console.log('onMounted')
			// })
			// onBeforeUpdate(() => {
			// console.log('onBeforeUpdate')
			// })
			// onUpdated(() => {
			// console.log('onUpdated')
			// })
			// onBeforeUnmount(() => {
			// console.log('onBeforeUnmount')
			// })
			// onUnmounted(() => {
			// console.log('onUnmounted')
			// })
			// onRenderTracked((event) => {
			//   console.log("状态跟踪组件----------->");
			//   console.log(event);
			// })
			// onRenderTriggered((event) => {
			//   console.log("状态触发组件--------------->");
			//   console.log(event);
			// })
			
			const record = reactive({ name: "test reactive", count: 0,value:100 }); // 处理复杂响应式,ref用于基本数据类型,reactive处理复杂类型
			const increase = () => {
			  ++record.count
			}
			const nextCount = computed(() => {
			  return +record.count + 10
			});
			const changenextCount = computed({
			  get() {
				 return +record.value + 100
			  },
			  set(value) {
				console.log('set value : ', value)  //  输出新修改的值
				return record.value = value -100
			  }
			});
			// 函数往下写
			const testJZApi = () => {
				console.log('start ...');
				const data = {
					"curpage":"1",
					"catalogid": "2",
					"curpage": "1",
					"funcNo": "200000",
					"market": "SZ",
					"market_stockCode": "30107",
					"query_flag": "2",
					"rowofpage": "20",
					"stock_code": "301078",
					"urlName": "INFO_URL"
				};
				uni.request({
					url: 'http://jzcapph5.com/servlet/json?curpage=1&query_flag=2&market=SZ&urlName=INFO_URL&rowofpage=20&funcNo=200000&catalogid=2&stock_code=301078&market_stockCode=30107',
					header: {
						'content-type': 'application/json'
					},
					method:'POST',
					data: data,
					success: data => {
						console.log('data : ',data);
					},
					fail: (data, code) => {
						console.log('fail' + JSON.stringify(data));
					}
				});
			}
			
			const testStoreContent = () => {
				console.log($store);
			}
			
			return {
				record, 
				nextCount,
				increase,
				changenextCount,
				testJZApi,
				testStoreContent
			};
		},
		onLoad() {
			// console.log('p-weixin onload');
			this.adpid = this.$adpid;
			this.getBanner();
			this.getList();
			// this.testJZApi();
			this.testStoreContent();
		},
		onPullDownRefresh() {
			this.reload = true;
			this.last_id = '';
			this.getBanner();
			this.getList();
		},
		onReachBottom() {
			this.status = 'more';
			this.getList();
		},
		methods: {
			getBanner() {
				let data = {
					column: 'id,post_id,title,author_name,cover,published_at' //需要的字段名
				};
				uni.request({
					url: 'https://unidemo.dcloud.net.cn/api/banner/36kr',
					data: data,
					success: data => {
						uni.stopPullDownRefresh();
						if (data.statusCode == 200) {
							this.banner = data.data;
						}
					},
					fail: (data, code) => {
						console.log('fail' + JSON.stringify(data));
					}
				});
			},
			getList() {
				var data = {
					column: 'id,post_id,title,author_name,cover,published_at' //需要的字段名
				};
				if (this.last_id) {
					//说明已有数据，目前处于上拉加载
					this.status = 'loading';
					data.minId = this.last_id;
					data.time = new Date().getTime() + '';
					data.pageSize = 10;
				}
				uni.request({
					url: 'https://unidemo.dcloud.net.cn/api/news',
					data: data,
					success: data => {
						if (data.statusCode == 200) {
							let list = this.setTime(data.data);
							this.listData = this.reload ? list : this.listData.concat(list);
							this.last_id = list[list.length - 1].id;
							this.reload = false;
						}
					},
					fail: (data, code) => {
						console.log('fail' + JSON.stringify(data));
					}
				});
			},
			goDetail: function(e) {
				// 				if (!/前|刚刚/.test(e.published_at)) {
				// 					e.published_at = dateUtils.format(e.published_at);
				// 				}
				let detail = {
					author_name: e.author_name,
					cover: e.cover,
					id: e.id,
					post_id: e.post_id,
					published_at: e.published_at,
					title: e.title
				};
				this.increase();
				console.log('this.record.count nextCount changenextCount ',this.record.count,this.nextCount,this.changenextCount);
				this.changenextCount = 10;
				console.log('changenextCount record.value ',this.changenextCount,this.record.value);
				uni.navigateTo({
					url: '/details/news-detail/news-detail?detailDate=' + encodeURIComponent(JSON.stringify(detail))
					// url:'/hello/index/index'
				});
			},
			setTime: function(items) {
				var newItems = [];
				items.forEach(e => {
					newItems.push({
						author_name: e.author_name,
						cover: e.cover,
						id: e.id,
						post_id: e.post_id,
						published_at: dateUtils.format(e.published_at),
						title: e.title
					});
				});
				return newItems;
			},
			aderror(e) {
				console.log("aderror: " + JSON.stringify(e.detail));
			}
		}
});
</script>

<style>
	.banner {
		height: 360rpx;
		overflow: hidden;
		position: relative;
		background-color: #ccc;
	}

	.banner-img {
		width: 100%;
	}

	.banner-title {
		max-height: 84rpx;
		overflow: hidden;
		position: absolute;
		left: 30rpx;
		bottom: 30rpx;
		width: 90%;
		font-size: 32rpx;
		font-weight: 400;
		line-height: 42rpx;
		color: white;
		z-index: 11;
	}
	.uni-media-list {
		/* background-color: red; */
		box-sizing: border-box;
		display: flex;
		width: 100%;
		flex-direction: row;
	}
	.uni-media-list-logo {
		width: 180rpx;
		height: 140rpx;
	}

	.uni-media-list-body {
		height: auto;
		justify-content: space-around;
	}

	.uni-media-list-text-top {
		height: 74rpx;
		font-size: 28rpx;
		overflow: hidden;
	}

	.uni-media-list-text-bottom {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
</style>
