<template>
	<div>
		<van-nav-bar
        title="退款明细"
				left-text="返回"
        left-arrow
        @click-left="$router.back()"
    />
		<div class="query_date">
			<div>查询日期：</div>
			<div><span>{{ starTime }}</span>—<span>{{endTime}}</span></div>
		</div>
		<div class="timeStr">
      <p> 查询总退款：</p>
      <!-- <input @click="showTime2" type="text" placeholder="点击选择订单业务类型" :value="val" class="inp"/> -->
      <p> <span class="inp"> {{ val/100 }}  </span>元</p>
      <van-actionsheet v-model="show2" title="请选择订单业务类型">
       <van-picker
        show-toolbar
        :columns="columns"
        @cancel="onCancel"
        @confirm="onConfirm"
        />
      </van-actionsheet>
    </div>
		<van-list
        v-model="loading"
        :finished="finished"
        :finished-text=total
      >
        <van-cell class="list_title">
          <span class="span1">场所名称</span>
          <span class="span2">退款订单数</span>
          <span class="span3">金额(元)</span>
          <span> </span>
        </van-cell>
        <van-cell class="list_site" v-for="item in list" :key='item.id'>
          <span class="span1">{{ item.placename }}</span>
          <span class="span2">{{ item.cnto }}</span>
          <span class="span3">{{item.refund/100}}</span>
					<span> <img src="./go_more.png" alt="" @click="add(item.placename,item.placeno,item.placeid)">  </span>
        </van-cell>
      </van-list>
	</div>
</template>
	
<script>
import { NavBar,Actionsheet,Picker,List,Cell   } from "vant"
import store from '../store'
import { getrefundmon,getrefund } from '../../api'
	export default {
		components: {
				[NavBar.name]: NavBar,
				[Actionsheet.name]: Actionsheet,
				[Picker.name]: Picker,
				[List.name]: List,
				[Cell.name]: Cell,
    },
		data(){
				return{
					show2: false,
					columns: ['按摩业务', '充电业务', '刷卡业务'],
					val:'',
					list: [],
					loading: false,
					finished: false,
					starTime:'',
					endTime:'',
					page:1,
					limit:1000,
					sort:'id',
					total:''
				}
		},
		methods:{
			  //类型
        showTime2(){
            this.show2=true
        },
        //点击确定
        onConfirm(value, index) {
            console.log(`当前值：${value}, 当前索引：${index}`);
            this.val=value
            this.show2=false;
        },
        //点击取消
        onCancel() {
           console.log('取消');
				},
				//$router.push({name:'details_refund'})
				add(placename,placeno,placeid){
					store.commit('sell',placename)
					store.commit('sell3',placeno)
					store.commit('sell4',placeid)
					
					this.$router.push({name:'details_refund'})
				
				},
		},
		created(){
			//this.val=store.state.datas.refund
			this.starTime=store.state.datas.start
			this.endTime=store.state.datas.end
			let start=this.starTime+' 00:00:00'
			let end=this.endTime+' 23:59:59'
			getrefund({start,end,page:this.page,limit:this.limit,sort:this.sort}).then(
				res=>{
					this.list=res.data.list
					this.loading=false
					this.finished=true
					this.total='总共'+res.data.total+'个场所'
				}
			)
			getrefundmon({start,end}).then(res=>{
				//console.log(res.data.list);
				this.val=res.data.list[0].refund
			})
		}
	}
</script>

<style lang="less" scoped>
.query_date{
	display: flex;
	padding: 1rem 2rem;
	font-size: 14px;
	div{
		padding-right: 1.5rem;
		span{
			color: orange;
			font-size: 16px;
		}
	}
}
.timeStr{
  display: flex;
  padding: .4rem 2rem;
	box-sizing: border-box;
	font-size: 14px;
	.inp{
		color:orange;
		font-size: 16px;
		font-weight: bold;
	}
}
.list_title{
  border-top: 1px solid #eee;
 span{
   display: inline-block;
   text-align: center;
   font-weight: bold;
   font-size: 12px;
 }
}
.list_site{
 span{
   display: inline-block;
   height: 100%;
   text-align: center;
   font-size: 12px;
  img{
     width: 1rem;
  }  
 }
}
.span1{
	width: 40%
}
.span2{
	width: 25%
}
.span3{
	width: 25%
}


</style>