<template>
    <div> 
        <!-- 头部 -->
        <div class="today_earning">
            <p class="title">爽呗收益</p>
            <p class="subtitle">今日收益(元)</p>
            <h3 class="money">{{ list.income/100 }}</h3>
            <div class="detail">
                <!-- <a href="/#/Returns_Detailed">查看收益明细 ></a> -->
                <span @click="$router.push({name:'Returns_Detailed'})">查看收益明细 ></span>
            </div>
        </div>
        <!-- 中间菜单 -->
        <van-row class="menu_earning">
          <!-- <a href="/#/site"> -->
            <van-col span="8" class="submenu"  >  
                <div @click="$router.push({name:'site'})">              
                <img src="./profit_place.png" alt="">
                <p class="font12">场所数</p>
                <p class="num">{{list.cntp}}个</p>               
                </div>            
            </van-col>
          <!-- </a> -->
            <van-col span="8" class="submenu">  
                <div @click="$router.push({name:'massage'})">              
                <img src="./profit_order.png" alt="">
                <p class="font12">按摩订单查询</p>
                <p class="num">{{list.cnto}}笔</p>               
                </div>            
            </van-col>
            <van-col span="8" class="submenu">  
                <div @click="$router.push({name:'equipment'})">              
                <img src="./profit_equip.png" alt="">
                <p class="font12">设备使用情况</p>
                <p class="num">{{list.cnte}}台</p>               
                </div>            
            </van-col>
            <van-col span="8" class="submenu">  
                <div @click="$router.push({name:'massage'})">              
                <img src="./sk.png" alt="">
                <p class="font12">刷卡订单查询</p>
                <p class="num">0次</p>               
                </div>            
            </van-col>
            <van-col span="8" class="submenu">  
                <div @click="$router.push({name:'massage'})">              
                <img src="./charge_order_icon.png" alt="">
                <p class="font12">充电订单查询</p>
                 <p class="num">0次</p>               
                </div>            
            </van-col>
            <van-col span="8" class="submenu">  
                <div @click="$router.push({name:'testing'})">              
                <img src="./jc.png" alt="">
                <p class="font12">设备检测</p>
                </div>            
            </van-col>
        </van-row>
        <van-tabbar v-model="active" class="menuBottom">               
            <van-tabbar-item icon="balance-o">爽呗收益</van-tabbar-item>
            <van-tabbar-item icon="user-o" to='/user'>我的爽呗</van-tabbar-item>
        </van-tabbar>       
    </div>
</template>

<script>
import { Col, Row, Tabbar, TabbarItem } from "vant";
import {getList} from '../../api'
import {getToken} from '../../api/token'
export default {
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  data() {
    return {
			active: 0 ,//选中状态默认值
			list:{
				income:0
			}
    };
	},
	created(){
		//获取信息
		getList().then(data=>{
			//console.log(data.data.list);
				this.list=data.data.list[0]
				//console.log(this.list);			
		}).catch(error=>{
			console.log(error);
			
		})
		
	}
};
</script>

<style lang="less" scoped>
.today_earning {
  background: url("./profit_topbg.png") top center no-repeat;
  background-size: cover;
  width: 100%;
  color: #fff;
  padding: 1.5rem 1rem;
  box-sizing: border-box;
  margin-bottom: 1.5rem;
  box-shadow: 0px 0px 15px #666;
  .title {
    text-align: center;
    font-size: 1.1rem;
    margin-bottom: 2.5rem;
  }
  .subtitle {
    font-size: 0.8rem;
  }
  .money {
    font-size: 2.1rem;
    padding: 1rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  }
  .detail {
    text-align: right;
    padding-top: 1.5rem;
    span{
      color: #fff;
      text-decoration: none;
      font-size: 12px;
    }
  }
}
.menu_earning {
  box-shadow: 0px 0px 10px #aaa9cf;
  .submenu {
    border: 1px solid #eee;
    text-align: center;
    padding: 1.5rem 1rem;
    line-height: 1.2rem;
    height: 7.5rem;
    img {
      width: 1.6rem;
    }
  }
}

.font12 {
  font-size: 12px;
}
.num {
  color: #f39800;
  font-size: 18px;
}
.menuBottom {
  box-shadow: 0px 0px 5px #aaa9cf;
}
</style>