<template>
<div>
    <van-nav-bar
    title="退款详情明细"
    left-text="返回"
    left-arrow
    @click-left="$router.back()"
    />
    <div class="inquire_title">
      可选择时间段查询,最多查30天或自然月的明细情况...
    </div>
    <div class="place">
        <div>场所名称</div>
        <div class="colorG">{{ placename }}</div>
    </div>
    <div class="place">
        <div>场所编号</div>
        <div class="colorG">{{ placeno }}</div>
    </div>
    <div class="timeStr">
      <p>选择开始时间：</p>
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
		<div class="inquire_list">
      <div>
        <img src="./device_use.png" alt="">
        退款详情明细
      </div>
        <van-button plain type="primary" size="small" @click="getList({start:starTime,end:endTime,placeid})">查询</van-button>
    </div>  
		<van-list
      v-model="loading"
      :finished="finished"
      :finished-text=total
    >
      <van-cell class="list_title">
        <span class="span1">设备编号</span>
        <span class="span2">退款金额(元)</span>
        <span class="span3">退款时间</span>
      </van-cell>
      <van-cell class="list_site" v-for="item in list" :key='item.id'>
        <span class="span1">{{ item.devno }}</span>
        <span class="span2">{{ item.refund/100 }}</span>
        <span class="span3">{{ item.refundtime | fiterTime }}</span>
      </van-cell>
    </van-list>  
</div>
</template>

<script>
import { NavBar, DatetimePicker, Actionsheet, Button, List, Cell } from "vant"
import store from '../store'
import { refundDetails } from '../../api'
import moment from 'moment'
export default {
  components: {
    [NavBar.name]: NavBar,
    [DatetimePicker.name]: DatetimePicker,
    [Actionsheet.name]: Actionsheet,
    [Button.name]: Button,
    [List.name]: List,
    [Cell.name]: Cell
  },
  data() {
    return {
      currentDate: new Date(),
      show: false,
      show1: false,
      minDate: new Date(2018),
      loading: false,
      finished: false,
      starTime: "",
			endTime: "",
			minDate: new Date(2018),
      maxDate: new Date(),
      minDate1: new Date(2018),
      maxDate1: new Date(),
			list: [],
			placename:'',
			placeno:'',
			placeid:'',
			total:''
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
			//(this.starTime = "点击选择开始时间"), 
			(this.show = false);
    },
    cancel1() {
      //this.endTime = "点击选择结束时间"
      this.show1 = false;
		},
		//获取退款详情列表
		getList(data){
			refundDetails(data).then(res=>{
				//console.log(res.data.list);
				this.list=res.data.list
				this.loading=false
				this.finished=true
				this.total='总共'+res.data.total+'笔退款'
			})
		}
	},
	created(){
		this.starTime=store.state.datas.start
		this.endTime=store.state.datas.end
		this.placeno=store.state.datas.serialnum
		this.placeid=store.state.datas.placeid
		this.placename=store.state.datas.name
		let start=this.starTime
		let end=this.end
		this.getList({start,end,placeid:this.placeid})
	},
	filters: {
    fiterTime(data) {
      return moment(data).format("YYYY-MM-DD HH:mm:ss");
    }
  }
};
</script>

<style lang="less" scoped>
.inquire_title {
  background-color: #eee;
  padding: 0.8rem 2rem;
  font-size: 12px;
  color: #666;
}
.place {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 2rem;
  .colorG {
    color: gray;
  }
}
.timeStr {
  display: flex;
  justify-content: space-between;
  padding: 0.4rem 2rem;
  box-sizing: border-box;
  font-size: 14px;
  .inp {
    color: gray;
  }
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
    width: 1.2rem;
    position: relative;
    top: 4px;
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
.span1{
	width: 30%
}
.span2{
	width: 30%
}
.span3{
	width: 40%
}


</style>