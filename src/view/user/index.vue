<template>
    <!-- 我的页面 -->
    <div>
        <div class="user">
            <h3>我的爽呗</h3>
            <div class="account">
                <p>爽呗当前账号</p>
                <p>{{ username }}</p>
            </div>
            <div class="btn">
                <van-button type="default" block @click="alert">退出登录</van-button>
            </div>
        </div>
        <van-tabbar v-model="active" class="menuBottom">               
            <van-tabbar-item icon="balance-o" to='/home'>爽呗收益</van-tabbar-item>
            <van-tabbar-item icon="user-o" >我的爽呗</van-tabbar-item>
        </van-tabbar>       
    </div>
</template>

<script>
import { Tabbar, TabbarItem, Button,Dialog  } from "vant"
import store from '../store'
import { removeToken } from '../../api/token'
export default {
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Button.name]: Button,
    [Dialog .name]: Dialog ,
  },
  data() {
    return {
			active: 1, //切换状态
			username:''
    };
  },
  methods:{
    alert(){
      Dialog.confirm({
        title: '',
        message: '您确定要退出登录吗？'
      }).then(() => {
				// on confirm
				removeToken()
				location.reload()
      }).catch(() => {
        // on cancel
      });
    }
	},
	created(){
		this.username=store.state.datas.username
	}
};
</script>

<style lang="less" scoped>
.user {
  h3 {
    text-align: center;
    padding: 0.8rem;
    background-color: #12b7f5;
    color: #fff;
  }
  .account {
    display: flex;
    justify-content: space-between;
    padding: 1.5rem;
  }
  .btn {
    padding: 3rem 1.5rem;
    button {
      color: #fff;
      background-color: #12b7f5;
      border-radius: 0.4rem;
      font-size: 16px;
    }
  }
}
.menuBottom {
  box-shadow: 0px 0px 5px #aaa9cf;
}
</style>