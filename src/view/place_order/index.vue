<template>
	<div>
		<van-nav-bar
        title="场所订单详情"
				left-text="返回"
        left-arrow
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
				@load="onLond"
      >
        <van-cell class="list_title">
          <span class="span1">设备编号</span>
          <span class="span2">消费时间</span>
          <span class="span3">时长(分钟)</span>
          <span class="span4">金额(元)</span>
        </van-cell>
        <van-cell class="list_site" v-for="item in list" :key='item.id'>
          <span class="span1">{{ item.devno }}</span>
          <span class="span2">{{item.usetime |fiterTime}}</span>
          <span class="span3">{{item.timelen/60 }}</span>
          <span class="span4">{{item.income/100}}</span>
        </van-cell>
      </van-list>
	</div>
</template>
	
<script>
import { NavBar, Actionsheet, Picker, List, Cell } from "vant";
import { getplacerder } from "../../api";
import store from "../store";
import moment from "moment";
export default {
  components: {
    [NavBar.name]: NavBar,
    [Actionsheet.name]: Actionsheet,
    [Picker.name]: Picker,
    [List.name]: List,
    [Cell.name]: Cell
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
      placeid: "",
      page: 0,
      limit: 20,
			sort: "id",
			total:''
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
		onLond(){
			this.starTime = store.state.datas.start;
			this.endTime = store.state.datas.end;
			this.placeid = store.state.datas.placeid;
			let start = this.starTime + " 00:00:00";
			let end = this.endTime + " 23:59:59";
			let page=this.page++
			getplacerder({
				start,
				end,
				placeid: this.placeid,
				page: this.page,
				limit: this.limit,
				sort: this.sort
			}).then(res => {
				for (let i = 0; i < res.data.list.length; i++) {
					this.list.push(res.data.list[i])
				}
				this.total='共有'+res.data.total+'笔订单'
				this.loading=false
				if(res.data.list==''){
						this.finished=true
				}				
			});
		}
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

</style>