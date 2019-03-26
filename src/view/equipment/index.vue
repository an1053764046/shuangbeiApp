<template>
  <div>
    <van-nav-bar
        title="设备使用情况"
        left-arrow
				left-text="返回"
        @click-left="$router.back()"
    />
    <div class="inquire_title">
    可选择时间段查询,最多查30天或自然月的明细情况...
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
		<div class="timeStr">
			<p>设备编号：</p>
			 <van-field v-model="devno" placeholder="请输入设备编号" style="width:6.5rem"/>
		</div> 
    <div class="inquire_list">
      <div>
        <img src="./profit_detail.png" alt="">
        设备分类汇总
      </div>
        <van-button plain type="primary" size="small" @click="inquire()" :loading=Loadings>查询</van-button>
    </div>    
    <p class="Orders_num">设备总收益： <span>{{list1.income/100}}</span> 元</p>
    <van-list
        v-model="loading"
        :finished="finished"
        :finished-text=total
				@load="onLoad"
      >
        <van-cell class="list_title">
          <span class="span1">设备编号</span>
          <span class="span2">收益(元)</span>
          <span class="span3">当前状态</span>
          <span class="span4">场所</span>
          <span>   </span>
        </van-cell>
        <van-cell class="list_site" v-for="item in list" :key='item.id'>
          <span class="span1">{{ item.devno }}</span>
          <span class="span2">{{ item.income/100 }}</span>
          <span class="span3">{{item.onlinestate | statefilter}}</span>
          <span class="span4">{{item.placename}}</span>
          <span> <img src="./go_more.png" alt="" @click="add(starTime,endTime,item.devid,item.devno)">  </span>
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
	Loading,
	Field
} from "vant"
import store from '../store'
import { getequipment, getEarning } from '../../api'
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
    [Loading.name]: Loading,
    [Field.name]: Field,
  },
  data() {
    return {
      currentDate: new Date(),
      show: false,
      show1: false,
      show2: false,
      starTime: "",
			endTime: "",
			minDate: new Date(2018),
      maxDate: new Date(),
      minDate1: new Date(2018),
      maxDate1: new Date(),
      list: [],
      loading: false,
      finished: false,
      page: 1,
      limit: 20,
			sort: "id",
			list1:{
				income:0
			},
			total:'',
			Loadings:false,
			devno:''
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
    //点击确定
    onConfirm(value, index) {
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
      
    },
    //结束时间
    changeEnd(picker) {
      let arr1 = picker.getValues();
      this.endTime = arr1[0] + "-" + arr1[1] + "-" + arr1[2];
      let time0 = new Date(arr1[0], arr1[1] - 1, arr1[2]);
      let time1 = time0.getTime();
      this.minDate = new Date(arr1[0], arr1[1] - 2, arr1[2]);
      this.maxDate = new Date(time1);
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
		//从store取值
		add(start,end,devid,devno){
			store.commit('sell1',start)
			store.commit('sell2',end)
			store.commit('sell5',devid)
			store.commit('sell6',devno)
			this.$router.push({name:'equipment_single'})	
		},
		//获取列表
		getlist(data){
			getequipment(data).then(res=>{
				for (let i = 0; i < res.data.list.length; i++) {
					this.list.push(res.data.list[i])
				}
					this.loading=false
					this.total='共有'+res.data.total+'台设备'
				if(res.data.list==''){
					this.finished=true
				}
			})
		},
		//查询
		inquire(){
			this.Loadings=true
			let start=this.starTime+' 00:00:00'
			let end=this.endTime+' 23:59:59'
			//console.log(this.devno);
			
			// this.getlist({page:this.page,limit:this.limit,sort:this.sort,start,end})
			// this.gainincome({start,end})
			getequipment({page:this.page,limit:this.limit,sort:this.sort,start,end,devno:this.devno}).then(res=>{
				//this.list=[]
				// for (let i = 0; i < res.data.list.length; i++) {
				// 	this.list.push(res.data.list[i])
				// }
				this.list=res.data.list
					this.loading=false
					this.total='共有'+res.data.total+'台设备'
				if(res.data.list==''){
					this.finished=true
				}
				getEarning({start,end,devno:this.devno}).then(res=>{
				//console.log(res.data.list[0])
				
				this.list1=res.data.list[0]
				this.Loadings=false
			})

			})
			
		},
		//获取总收益
		gainincome(data){
			getEarning(data).then(res=>{
				//console.log(res.data.list[0])
				this.list1=res.data.list[0]
			})
		},
		onLoad(){
			let start=this.starTime+' 00:00:00'
			let end=this.endTime+' 23:59:59'
			let page=this.page++
			this.getlist({page,limit:this.limit,sort:this.sort,start,end,devno:this.devno})
		}
  },
  created() {
    if (new Date().getMonth() < 10) {
      this.starTime = `${new Date().getFullYear()}-0${new Date().getMonth() +1}-${new Date().getDate()}`;
      this.endTime = `${new Date().getFullYear()}-0${new Date().getMonth() +1}-${new Date().getDate()}`;
    } else {
      this.starTime = `${new Date().getFullYear()}-${new Date().getMonth() +1}-${new Date().getDate()}`;
      this.endTime = `${new Date().getFullYear()}-${new Date().getMonth() +1}-${new Date().getDate()}`;
		}
		this.gainincome()
	},
	filters:{
		statefilter(data){
			if(data=='1'){
				return '在线'
			}else{
				return '离线'
			}
		}
	}
};
// $router.push({name:'place_order'})
</script>

<style lang="less" scoped>
.timeStr {
  display: flex;
  justify-content: space-between;
  padding: 0.4rem 2rem;
  box-sizing: border-box;
	font-size: 14px;
	.van-cell{
		padding: 0;
	}
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
	width: 20%
}
.span2{
	width: 20%
}
.span3{
	width: 15%
}
.span4{
	width: 40%
}

</style>