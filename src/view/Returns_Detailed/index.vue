<template>
  <div>
    <van-nav-bar
        title="收益明细"
        left-text="返回"
        left-arrow
        @click-left="$router.back()"
        />
    <div class="inquire_title">
      可选择时间段查询,最多查30天或自然月的明细情况...
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
        <img src="./profit_detail.png" alt="">
        收益明细列表
      </div>
        <van-button plain type="primary" size="small" @click="inquire" :loading=loadings loading-text="加载中">查询</van-button>
    </div>    
    <div class="inquire_mongey">
      <p>查询总收益：<span>{{list1.income/100}}</span> 元</p>
      <div class="refund">
        <p> 查询总退款：<span>{{list1.refund/100}}</span> 元   </p>   
        <van-button plain type="primary" size="small" @click="details(starTime,endTime,list1.refund/100)">详情</van-button>
      </div>
    </div>
    <van-list
      v-model="loading"
      :finished="finished"
      :finished-text=total
			@load="onLond"
    >
      <van-cell class="list_title">
        <span class="span1">场所名称</span>
        <span class="span2">设备</span>
        <span class="span2">订单数</span>
        <span class="span4">收益(元)</span>
        <span class="span4">均收(元)</span>
        <span>   </span>
      </van-cell>
      <van-cell class="list_site" v-for="item in list" :key='item.id'>
        <span class="span1">{{ item.placename }}</span>
        <span class="span2">{{ item.cnte}}</span>
        <span class="span3">{{item.cnto}}</span>
        <span class="span4">{{ item.income/100 }}</span>
        <span class="span5">{{item.avgincome/100 | finished}}</span>
        <span class="img"> <img src="./go_more.png" alt="" @click="add(item.placename,starTime,endTime,item.placeno,item.placeid)">  </span>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import {
  NavBar,
  DatetimePicker,
  Actionsheet,
  Button,
  List,
  Cell,
  Row,
	Col,
	Loading 
} from "vant";
import { getEarning, getEarningList } from "../../api";
import store from "../store";
import moment from "moment";
export default {
  components: {
    [NavBar.name]: NavBar,
    [DatetimePicker.name]: DatetimePicker,
    [Actionsheet.name]: Actionsheet,
    [Button.name]: Button,
    [List.name]: List,
    [Cell.name]: Cell,
    [Row.name]: Row,
    [Col.name]: Col,
    [Loading .name]: Loading ,
  },
  data() {
    return {
      list1: {
        income: 0,
        refund: 0
      },

      total: "",
      currentDate: new Date(),
      show: false,
      show1: false,
      minDate: new Date(2018),
      maxDate: new Date(),
      minDate1: new Date(2018),
      maxDate1: new Date(),
      list: [],
      loading: false,
      finished: false,
      starTime: "",
			endTime: "",
			loadings:false,
    };
  },
  filters: {
    finished(value) {
      return value.toFixed(2);
    }
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
    //获取收益数据
    getList(data) {
      getEarning(data).then(res => {
        if(res.data.list[0]!=''){
					//this.loadings=false;
					this.list1 = res.data.list[0];
					console.dir(Promise);	
				}
      });
    },
    //获取收益列表
    getearnings(data) {
      getEarningList(data).then(res => {
        this.list = res.data.list;
        this.loading = false;
				this.finished = true;
				
        this.total = "总共" + res.data.total + "个场所";
      });
    },
    //点击查询按钮
    inquire() {
			this.loadings=true
      let start = this.starTime + " 00:00:00";
      let end = this.endTime + " 23:59:59";

			getEarning({ start, end }).then(res => {
					if(res.data.list[0]!=''){
						//this.loadings=false;
						this.list1 = res.data.list[0];
					}

					getEarningList({ start, end }).then(res => {
						this.list = res.data.list;
						this.loading = false;
						this.finished = true;
						this.total = "总共" + res.data.total + "个场所";
						this.loadings=false				
					});
				})
			},

			//跳转
			add(name, star, end, placeno, placeid) {
				store.commit("sell", name);
				store.commit("sell1", star);
				store.commit("sell2", end);
				store.commit("sell3", placeno);
				store.commit("sell4", placeid);
				this.$router.push({ name: "place_benefits" });
			},

    //退款详情
    details(star, end, refund) {
      store.commit("sell1", star);
      store.commit("sell2", end);
      store.commit("sell7", refund);
      this.$router.push({ name: "refund" });
    },
    onLond() {
      this.getList({ starTime: this.starTime, endTime: this.endTime });
      this.getearnings();
    }
  },
  created() {
    //判断时间是否小于10 否则前面加一个0
    if (new Date().getMonth() < 10) {
      this.starTime = `${new Date().getFullYear()}-0${new Date().getMonth() +
        1}-${new Date().getDate()}`;
      this.endTime = `${new Date().getFullYear()}-0${new Date().getMonth() +
        1}-${new Date().getDate()}`;
    } else {
      this.starTime = `${new Date().getFullYear()}-${new Date().getMonth() +
        1}-${new Date().getDate()}`;
      this.endTime = `${new Date().getFullYear()}-${new Date().getMonth() +
        1}-${new Date().getDate()}`;
    }
    //页面加载获取退款收益

    //获取列表
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
.van-button--primary {
  color: orange;
  border: 1px solid orange;
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
.inquire_mongey {
  padding: 0.5rem 2rem;
  line-height: 2rem;
  font-size: 14px;
  .refund {
    display: flex;
    justify-content: space-between;
  }
  span {
    color: orange;
    font-size: 18px;
    font-weight: bold;
  }
}
.list_title {
  border-top: 1px solid #eee;
  .span1 {
    width: 35%;
  }
  .span2 {
    width: 15%;
  }
  .span3 {
    width: 15%;
  }
  .span4 {
    width: 15%;
  }
  .span5 {
    width: 15%;
  }
  span {
    display: inline-block;
    text-align: center;
    font-weight: bold;
    font-size: 12px;
  }
}
.list_site {
  img {
    width: 1rem;
  }
  .span1 {
    width: 35%;
  }
  .span2 {
    width: 15%;
  }
  .span3 {
    width: 15%;
  }
  .span4 {
    width: 15%;
  }
  .span5 {
    width: 15%;
  }
  span {
    display: inline-block;
    height: 100%;
    text-align: center;
    font-size: 12px;
  }
}
.van-cell:nth-of-type(even) {
  background-color: #f9f9f9;
}
.inp {
  color: gray;
}
</style>