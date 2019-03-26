<template>
	<div>
		<van-nav-bar
        title="单台设备详情"
        left-arrow
				left-text="返回"
        @click-left="$router.back()"
    />
		<div class="query_date">
			<div class="inquireTime">查询日期:</div>
			<div><span>{{starTime}}</span>—<span>{{endTime}}</span></div>
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
		<van-list
        v-model="loading"
        :finished="finished"
        :finished-text=total
      >
        <van-cell class="list_title">
          <span class="span1">设备编号</span>
          <span class="span2">消费时间</span>
          <span class="span3">时长(分钟)</span>
          <span class="span4">金额(元)</span>
        </van-cell>
        <van-cell class="list_site" v-for="item in list" :key='item.id'>
          <span class="span1">{{ devno }}</span>
          <span class="span2">{{item.usetime |fiterTime}}</span>
          <span class="span3">{{item.timelen/60 }}</span>
          <span class="span4" @click="operation(item.orderno)">{{item.income/100}}</span>
        </van-cell>
      </van-list>
			<van-popup v-model="show">
				<div class="operation">
					<van-button type="warning" @click="restartbtn">重 启</van-button>
					<van-button type="warning" @click="refundbtn">退 款</van-button>
				</div>
			</van-popup>
	</div>
</template>
	
<script>
import { NavBar, Actionsheet, Picker, List, Cell,Popup,Button,Toast } from "vant";
import { getsingle,refund,restart } from "../../api";
import store from "../store";
import moment from "moment"
import {getUser} from '../../api/user'
export default {
  components: {
    [NavBar.name]: NavBar,
    [Actionsheet.name]: Actionsheet,
    [Picker.name]: Picker,
    [List.name]: List,
    [Cell.name]: Cell,
    [Popup.name]: Popup,
    [Button.name]: Button,
    [Toast.name]: Toast,
  },
  data() {
    return {
      show2: false,
      columns: ["按摩业务", "充电业务", "刷卡业务"],
      val: "按摩业务",
      list: [],
      loading: false,
      finished: false,
      starTime: "",
      endTime: "",
      devid: "",
      page: 1,
      limit: 1000,
			sort: "id",
			devno:'',
			total:'',
			show:false,
			orderno:''
    };
  },
  methods: {
    //类型
    showTime2() {
      this.show2 = true;
    },
    //点击确定
    onConfirm(value, index) {
      console.log(`当前值：${value}, 当前索引：${index}`);
      this.val = value;
      this.show2 = false;
    },
    //点击取消
    onCancel() {
      console.log("取消");
		},
		operation(data){
			//console.log(getUser());
			if(getUser()){
				this.orderno=data
				let user=JSON.parse(getUser())
				if(user.roles==8){
					this.show=true
				}
			}
		},
		//重启
		restartbtn(){
			restart({orderno:this.orderno}).then(res=>{
					console.log(res);
					// if(){
							Toast(res.data.info)
								this.show=false
					// }
			})
		},
		//退款
		refundbtn(){
			//console.log(this.orderno);
			refund({orderno:this.orderno}).then(res=>{
				//if(res.data.code==0){
						Toast(res.data.info)
						this.show=false
				// }else{
				// 		Toast(res.data.info)
				// 		this.show=false
				// }
			//	console.log(res);
				
			})
		}
  },
  //发送请求加载数据
  created() {
    this.starTime = store.state.datas.start;
    this.endTime = store.state.datas.end;
    this.devid = store.state.datas.devid;
    this.devno = store.state.datas.devno;
    let start = this.starTime + " 00:00:00";
    let end = this.endTime + " 23:59:59";
    getsingle({
      start,
      end,
      devid: this.devid,
      page: this.page,
      limit: this.limit,
      sort: this.sort
    }).then(res => {
      //console.log(res);
			this.list = res.data.list;
			this.loading=false
			this.finished=true
			this.total='总共'+res.data.total+'笔消费'
    });
  },
  //转换时间
  filters: {
    fiterTime(data) {
      return moment(data).format("YYYY-MM-DD HH:mm:ss");
    }
  }
};
</script>

<style lang="less" scoped>
.query_date {
  display: flex;
  padding: 1rem 2rem;
  font-size: 14px;
  div {
    padding-right: 1.5rem;
    span {
      color: orange;
      font-size: 16px;
    }
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
.inquireTime {
  padding: 0;
}
.span1{
	width: 20%
}
.span2{
	width: 40%
}
.span3{
	width: 20%
}
.span4{
	width: 20%
}
.operation{
	width: 15rem;
	padding: 3rem;
	background-color: rgba(0,0,0,.7);
	display: flex;
	justify-content: space-between;
}
</style>