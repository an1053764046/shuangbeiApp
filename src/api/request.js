import axios from 'axios'
import { Toast } from 'vant'
import { getToken } from './token'
import VueRouter from 'vue-router';

//配置axios对象
const service=axios.create({
    baseURL:'http://39.98.167.66/acustom/v1/',
    timeout:'10000'
})

service.interceptors.request.use(
  config => {
   
      config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    
    return config
  },
  error => {
		Promise.reject(error)
		//console.log(error);
		
	}
	
)
service.interceptors.response.use(

		// response => response,
	 	response => {
    const res = response
    if (res.code == 3) {
      // Toast.fail({
      //   message: '登录信息过期',
      //   //type: 'error',
      //   duration: 5 * 1000
      // })
      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // 请自行在引入 MessageBox
        // import { Message, MessageBox } from 'element-ui'
        // Toast.message('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
        //   confirmButtonText: '重新登录',
        //   cancelButtonText: '取消',
        //   type: 'warning'
        // }).then(() => {
        //   store.dispatch('FedLogOut').then(() => {
        //     location.reload() // 为了重新实例化vue-router对象 避免bug
        //   })
        //})
      }
      //return Promise.reject('error')
    } else {
      return response
    }
  },
		error => {
			 // for debug
			
			 console.log( error )
			if(error.message.includes('timeout')){
				Toast('服务器开小差了！！')
				return
			}
			if(error && error.response.status==401){
				Toast.fail({
					message:'登	录已超时',
					//type: 'error',
					duration: 5 * 1000
				}) 
				window.location.href='http://192.168.1.24:8080/#/login'
			}else{
				Toast.fail({
					message:'服务器开小差了！',
					//type: 'error',
					duration: 5 * 1000
				}) 
			}
		
			//return Promise.reject(error)
		}

)
export default service


