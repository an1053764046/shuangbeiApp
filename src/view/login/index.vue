<template>
  <!-- 登录页面 -->
  <div class="register">
    <!-- logo图 -->
    <div class="logo">
      <img src="./logologin.png" alt="" srcset="">
    </div>
    <div>
      <h2>爽呗收益</h2>
    </div>
    <!-- 登录框 -->
    <div class="regBox">
      <!-- <van-cell-group> -->
        <van-field
          v-model="username"
          clearable
          label="用户名："
          placeholder="请输入用户名"
        />
        <p class="warning" v-show="flag">内容不能为空</p>
        <van-field
          v-model="password"
          type="password"
          label="密码："
          placeholder="请输入密码"   
					@keyup.enter="register"    
        />
        <p class="warning" v-show="flag1">密码不能为空</p>
				<van-checkbox v-model="checked" class="checkBox">记住密码</van-checkbox>
        <div class="btn">
          <van-button size="large" type="primary" @click='register'>登录</van-button>
        </div>
      <!-- </van-cell-group> -->
    </div>
  </div>
</template>

<script>
import { Field, Button,Checkbox } from "vant";
import { reg } from '../../api'
import { setToken } from '../../api/token'
import { getUser,setUser,removeUser } from '../../api/user'
import store  from '../store'
export default {
  components: {
    [Field.name]: Field,
		[Button.name]: Button,
		[Checkbox.name]:Checkbox
    //[Cellgroup.name]: Cellgroup
  },
  data() {
    return {
      username: "", //用户名和密码
      password: "",
      flag: false,  //标杆判断是否隐藏提示文字
			flag1: false,
			name:'',
			checked: false
    };
  },
  methods: {
    //点击按钮提交事件
    register() {
      if (this.username != "" && this.password != "") {
				//提交密码
				reg({username:this.username,password:this.password}).then(data=>{
			
					//返回0 保存token然后跳转
					this.name=data.data.username
						store.commit('sell0',this.name)		
						if(data.data.code==0){
							setToken(data.data.token)
							this.$router.push({ name: "home" });
							if(this.checked){
								setUser({username:this.username,password:this.password,roles:data.data.roles[0]})
							}else{
								removeUser()
							}
						}else{
							alert('账号密码错误！')
						}					
				})	
				//非空验证			
      } else if (this.username == "") {
				this.flag = true;
				//非空验证			
      } else if (this.password == "") {
        this.flag1 = true;
      }
		},
	
	},
	created(){
	
		if(getUser()){
			let user=JSON.parse(getUser())
			this.username=user.username
			this.password=user.password
			this.checked=true
		}
		
	}
};
</script>

<style lang="less" scoped>
.register {
  .logo {
    padding-top: 2rem;
  }
  div {
    text-align: center;
  }
  h2 {
    text-align: center;
    margin-top: 2rem;
    font-size: 1.7rem;
    font-weight: normal;
    color: orange;
    margin-bottom: 1.5rem;
  }
  .regBox {
    padding: 1rem;
  }
  .btn {
    margin-top: 4rem;
  }
  .warning {
    color: red;
    font-size: 12px;
    text-align: right;
    padding-right: 2rem;
  }
  .van-button--primary {
    background-color: #27a9e3;
  }
}
.checkBox{
	padding-right: 12rem;
	padding-top: 1rem;
	font-size: 14px;
}
</style>