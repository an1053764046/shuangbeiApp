<template>
  <div>
    <van-nav-bar
        title="订单查询"
        left-arrow
				left-text="返回"
        @click-left="$router.back()"
    />
    <div class="inquire_title">
    可选择时间段查询,最多查30天或自然月的明细情况...
    </div>
    <div class="timeStr">
      <p>订单业务类型</p>
      <!-- <input @click="showTime2" type="text" placeholder="点击选择订单业务类型" :value="val" class="inp"/> -->
      <p @click="showTime2" class="inp">{{ val }}</p>
      <van-actionsheet v-model="show2" title="请选择订单业务类型">
       <van-picker
        show-toolbar
        :columns="columns"
        @cancel="onCancel"
        @confirm="onConfirm"
        />
      </van-actionsheet>
    </div>
    <div class="timeStr">
      <p>选择开始时间：</p>
      <!-- <input @click="showTime" type="text" placeholder="点击选择开始时间" :value="starTime" class="inp"/> -->
      <p @click="showTime" class="inp">{{ starTime }}</p>
      <van-actionsheet v-model="show" title="请选择开始时间">
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          :min-date="minDate"
          :max-date="maxDate"
					@change='changeStart'
					@confirm='confirm'
					@cancel='cancel'
        />
      </van-actionsheet>
    </div>
    <div class="timeStr">
      <p>选择结束时间：</p>
      <!-- <input @click="showTime1" type="text" placeholder="点击选择结束时间" :value="endTime" class="inp"/> -->
      <p @click="showTime1" class="inp">{{ endTime }}</p>
      <van-actionsheet v-model="show1" title="请选择结束时间">
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          :min-date="minDate1"
          :max-date="maxDate1"
					@change='changeEnd'
					@confirm='confirm1'
					@cancel='cancel1'
        />
      </van-actionsheet>
    </div>  
    <div class="inquire_list">
      <div>
        <img src="./profit_detail.png" alt="">
        订单明细列表
      </div>
        <van-button plain type="primary" size="small" @click="inquire" :loading=loadings>查询</van-button>
    </div>    
    <p class="Orders_num">查询订单数 <span>{{indentnum}}</span> 笔</p>
    <van-list
        v-model="loading"
        :finished="finished"
        :finished-text=total
      >
        <van-cell class="list_title">
          <span class="span1">场所名称</span>
          <span class="span2">订单数</span>
          <span class="span3">收益(元)</span>
          <span>   </span>
        </van-cell>
        <van-cell class="list_site" v-for="item in list" :key='item.id'>
          <span class="span1">{{ item.placename }}</span>
          <span class="span2">{{ item.cnto }}</span>
          <span class="span3">{{item.income/100}}</span>
          <span> <img src="./go_more.png" alt="" @click="add(starTime,endTime,item.placeid)">  </span>
        </van-cell>
      </van-list>
	</div>
</template>

<script>
import {
  NavBar,
  List,
  Cell,
  Button,
  Actionsheet,
  DatetimePicker,
	Picker,
	Pagination
} from "vant";
import store from '../store'
import { getordernum,getorderlist } from '../../api'
import moment from 'moment'
export default {
  components: {
    [NavBar.name]: NavBar,
    [List.name]: List,
    [Cell.name]: Cell,
    [DatetimePicker.name]: DatetimePicker,
    [Actionsheet.name]: Actionsheet,
    [Button.name]: Button,
    [Picker.name]: Picker,
    [Pagination.name]: Pagination,
  },
  data() {
    return {
      currentDate: new Date(),
      show: false,
      show1: false,
      show2: false,
      minDate: new Date(2018),
      columns: ["按摩业务", "充电业务", "刷卡业务"],
      val: "按摩业务",
      starTime: "",
			endTime: "",
			minDate: new Date(2018),
      maxDate: new Date(),
      minDate1: new Date(2018),
      maxDate1: new Date(),
      list: [ ],
      loading: false,
			finished: false,
			indentnum:'',
			page:1,
			limit:1000,
			sort:'id',
			total:'',
			loadings:false,
    };
  },
  methods: {
    //开始时间
    showTime() {
      this.show = true;
    },
    //结束时间
    showTime1() {
      this.show1 = true;
    },
    //类型
    showTime2() {
      this.show2 = true;
    },
    //点击确定
    onConfirm(value,index) {
      //console.log(`当前值：${value}, 当前索引：${index}`);
      this.val = value;
      this.show2 = false;
    },
    //点击取消
    onCancel() {
      //console.log("取消");
    },
     //开始时间change时间
    changeStart(picker) {
      //获取到时间数组
      let arr = picker.getValues();
      //拼接赋值
      this.starTime = arr[0] + "-" + arr[1] + "-" + arr[2];
      let time0 = new Date(arr[0], arr[1], arr[2]);
      let time1 = time0.getTime();
      this.minDate1 = new Date(arr[0], arr[1] - 1, arr[2]);
      this.maxDate1 = new Date(time1);
      this.endTime = moment(time1-86400000).format("YYYY-MM-DD"); //new Date(time1).moment('YYYY-MM-DD')
      //console.log(this.maxDate1);
    },
    //结束时间
    changeEnd(picker) {
      let arr1 = picker.getValues();
      this.endTime = arr1[0] + "-" + arr1[1] + "-" + arr1[2];
      let time0 = new Date(arr1[0], arr1[1] - 1, arr1[2]);
      let time1 = time0.getTime();
      this.minDate = new Date(arr1[0], arr1[1] - 2, arr1[2]);
      this.maxDate = new Date(time1);
      //console.log(this.maxDate1);
    },
    //点击完成按钮
    confirm1() {
      this.show1 = false;
    },
    confirm() {
      this.show = false;
    },
    //点击取消按钮
    cancel() {
      (this.starTime = "点击选择开始时间"), (this.show = false);
    },
    cancel1() {
      this.endTime = "点击选择结束时间";
      this.show1 = false;
		},
		add(start,end,placeid){
			store.commit('sell1',start)
			store.commit('sell2',end)
			store.commit('sell4',placeid)
			//console.log(this.$store.state.add1);
			this.$router.push({name:'place_order'})
			//console.log(store.state.datas);			
		},
		//获取订单笔数
		getindent(data){
			getordernum(data).then(res=>{
				//console.log(res.data.list[0].cnto);
				this.indentnum=res.data.list[0].cnto
			})
		},
		//获取订单列表
		getList(data){
			getorderlist(data).then(res=>{
				//console.log(res.data.list);
				this.list=res.data.list
				this.loading=false
				this.finished=true
				this.total='总共'+res.data.total+'个场所'
			})
		},
		//查询
		inquire(){
			this.loadings=true;
			let start=this.starTime+' 00:00:00'
			let end=this.endTime+' 23:59:59'
				getordernum({start,end}).then(res=>{
				this.indentnum=res.data.list[0].cnto

				getorderlist({page:this.page,limit:this.limit,sort:this.sort,start,end}).then(res=>{
					//console.log(res.data.list);
					this.list=res.data.list
					this.loading=false
					this.finished=true
					this.total='总共'+res.data.total+'个场所'
					this.loadings=false
				})
			})
			// this.getindent({start,end})
			// this.getList({page:this.page,limit:this.limit,sort:this.sort,start,end})
		}

	},
	created(){
			if(new Date().getMonth()<10){
				this.starTime=`${new Date().getFullYear()}-0${new Date().getMonth()+1}-${new Date().getDate()}`
				this.endTime=`${new Date().getFullYear()}-0${new Date().getMonth()+1}-${new Date().getDate()}`
			}else{
				this.starTime=`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`
				this.endTime=`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`
			}
			let start=this.starTime+' 00:00:00'
			let end=this.endTime+' 23:59:59'
			this.getindent({start,end})
			this.getList({page:this.page,limit:this.limit,sort:this.sort,start,end})
			
	}
};
</script>

<style lang="less" scoped>
.timeStr {
  display: flex;
  justify-content: space-between;
  padding: 0.4rem 2rem;
  box-sizing: border-box;
  font-size: 14px;
}
.inquire_title {
  background-color: #eee;
  padding: 0.8rem 2rem;
  font-size: 12px;
  color: #666;
}
.inp {
  color: gray;
}
.inquire_list {
  display: flex;
  justify-content: space-between;
  line-height: 1.8rem;
  padding: 0.5rem 2rem;
  background: #eee;
  color: #666;
  box-sizing: border-box;
  img {
    width: 1rem;
  }
}
.van-button--primary {
  color: orange;
  border: 1px solid orange;
}
.list_title {
  border-top: 1px solid #eee;
  span {
    display: inline-block;
    text-align: center;
    font-weight: bold;
    font-size: 12px;
  }
}
.list_site {
  span {
    display: inline-block;
    height: 100%;
    text-align: center;
    font-size: 12px;
    img {
      width: 1rem;
    }
  }
}
.van-cell:nth-of-type(even) {
  background-color: #f9f9f9;
}
.Orders_num {
  padding: 1rem;
  font-size: 14px;
  span {
    font-size: 18px;
    color: orange;
    font-weight: bold;
  }
}
.span1{
	width: 40%
}
.span2{
	width: 20%
}
.span3{
	width: 30%
}

</style>