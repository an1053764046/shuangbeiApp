<template>
<div>
    <van-nav-bar
    title="设备详情信息"
    left-text="返回"
    left-arrow
    @click-left="$router.back()"
    />
    <div class="inquire_title">
      查看当前设备情况...
    </div>
    <div class="place">
        <div>场所名称</div>
        <div class="colorG">{{placename}}</div>
    </div>
    <div class="place">
        <div>场所编号</div>
        <div class="colorG">{{ placeno }}</div>
    </div>
    <!-- <div class="timeStr">
      <p>选择开始时间：</p>
      <p @click="showTime" class="inp">{{ starTime }}</p>
      <van-actionsheet v-model="show" title="请选择开始时间">
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          :min-date="minDate"
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
          :min-date="minDate"
					@change='changeEnd'
					@confirm='confirm1'
					@cancel='cancel1'
        />
      </van-actionsheet>
    </div>   -->
		<div class="inquire_list">
      <div>
        <img src="./device_use.png" alt="">
        设备详细信息
      </div>
        <van-button plain type="primary" size="small">查询</van-button>
    </div>  
		<van-list
      v-model="loading"
      :finished="finished"
      :finished-text=total
			@load="onLoad"
    >
      <van-cell class="list_title">
        <span>设备编号</span>
        <span>设备状态</span>
      </van-cell>
      <van-cell class="list_site" v-for="item in list" :key='item.id'>
        <span>{{ item.devno }}</span>
        <span>{{ item.onlinestate |statefilter }}</span>
      </van-cell>
    </van-list>  
</div>
</template>

<script>
import { NavBar, DatetimePicker, Actionsheet, Button, List, Cell } from "vant"
import { devicestate } from '../../api'
import store from '../store'
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
      list: [ ],
			placename:'',
			placeno:'',
			placeid:'',
			page:1,
			limit:20,
			sort:'id',
			total:''
    };
  },
  methods: {
		getList(data){
			devicestate(data).then(res=>{
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
		onLoad(){
			let page=this.page++
			this.getList({placeid:this.placeid,page,limit:this.limit,sort:this.sort})
		}
	},
	//tryy
	created(){
		this.placename=store.state.datas.name
		this.placeno=store.state.datas.serialnum
		this.placeid=store.state.datas.placeid
		//this.getList({placeid:this.placeid,page:this.page,limit:this.limit,sort:this.sort})
	},
	filters:{
		statefilter(data){
			if(data==1){
				return '在线'
			}else{
				return '离线'
			}
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
    width: 50%;
    text-align: center;
    font-weight: bold;
    font-size: 12px;
  }
}
.list_site {
  span {
    display: inline-block;
    width: 50%;
    height: 100%;
    text-align: center;
    font-size: 12px;
    img {
      width: 1rem;
    }
  }
}
</style>