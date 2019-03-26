<template>
  <div>
      <van-nav-bar
        title="场所详情"
        left-text="返回"
        left-arrow
        @click-left="$router.back()"
        />

      <van-list
        v-model="loading"
        :finished="finished"
        :finished-text=total
      >
        <van-cell class="list_title">
          <span class="span1">场所名称</span>
          <span class="span2">场所类型</span>
          <span class="span3">设备</span>
          <span class="span4">实时在线</span>
          <span class="span5">在线率</span>
          <span>   </span>
        </van-cell>
        <van-cell class="list_site" v-for="item in list" :key='item.id'>
          <span class="span1">{{ item.placename }}</span>
          <span class="span2">{{ item.areatypename}}</span>
          <span class="span3">{{item.devicecnt}}</span>
          <span class="span4">{{ item.cntonline }}</span>
          <span class="span5">{{item.aliveper |fiteronline}}</span>
          <span> <img src="./go_more.png" alt="" @click="add(item.placename,item.placeno,item.placeid)">  </span>
        </van-cell>
      </van-list>
  </div>
</template>

<script>
import { NavBar,List,Cell  } from "vant"
import {getplacedetails} from '../../api'
import store from '../store'
  export default {
    components: {
        [NavBar.name]: NavBar,
        [List .name]: List ,
        [Cell.name]: Cell,
    },
    data(){
        return{
					list: [],
          loading: false,
					finished: false,
					page:1,
					limit:100,
					sort:'id',
					total:''
        }

    },
    methods:{
			//获取信息
			getList(data){
				getplacedetails(data).then(res=>{
					this.list=res.data.list	
					this.loading=false
					this.finished=true
					this.total='总共'+res.data.total+'个场所'
				})
			},
			//跳转
			add(name,placeno,placeid){
				store.commit('sell',name)
				store.commit('sell3',placeno)
				store.commit('sell4',placeid)
				this.$router.push({name:'equipment_details'})
			}
		},
		created(){
			this.getList({page:this.page,limit:this.limit,sort:this.sort})
		},
		filters:{
			fiteronline(data){
				let data1=data*100
				if(data1>0){
					return data1.toFixed()+'%'
				}else{
						return 0+'%'
				}
			}
		}
  }
</script>

<style lang="less" scoped>
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
.van-cell:nth-of-type(even){
  background-color: #f9f9f9;
}
	.span1{
		width: 35%
	}
	.span2{
		width: 15%
	}
	.span3{
		width: 10%
	}
	.span4{
		width: 15%
	}
	.span5{
		width: 20%
	}
</style>