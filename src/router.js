import Vue from 'vue';
import Router from 'vue-router';
import {Toast} from 'vant'

import { getToken } from './api/token'
Vue.use(Router);

const routes = [
  {
    path: '*',
    redirect: '/login'
  },
  {
		name: 'login',
    component: () => import('./view/login'),
    meta: {
			title: '登录',
    }
  },
  {
    name: 'home',
    component: () => import('./view/home'),
    meta: {
			title: '首页',
			//keepAlive: true
    }
  },
  {
    name: 'user',
    component: () => import('./view/user'),
    meta: {
			title: '我的爽呗',
		//	keepAlive: true
    }
  },
  {
    name: 'Returns_Detailed',
    component: () => import('./view/Returns_Detailed'),
    meta: {
			title: '收益明细',
		//	keepAlive: true
    }
  },
  {
    name: 'site',
    component: () => import('./view/site'),
    meta: {
			title: '场所详情',
			//keepAlive: true
    }
  },
  {
    name: 'massage',
    component: () => import('./view/massage'),
    meta: {
			title: '订单查询',
			//keepAlive: true
    }
  },
  {
    name: 'equipment',
    component: () => import('./view/equipment'),
    meta: {
			title: '设备使用情况',
			//keepAlive: true
    }
  },
  {
    name: 'testing',
    component: () => import('./view/testing'),
    meta: {
			title: '设备检测',
			//keepAlive: true
    }
  },
  {
    name: 'place_benefits',
    component: () => import('./view/place_benefits'),
    meta: {
			title: '场所收益明细',
			//keepAlive: false
    }
  },
  {
    name: 'place_order',
    component: () => import('./view/place_order'),
    meta: {
			title: '场所订单详情',
			//keepAlive: false
    }
  },
  {
    name: 'refund',
    component: () => import('./view/refund'),
    meta: {
			title: '退款明细',
			//keepAlive: false
    }
  },
  {
    name: 'details_refund',
    component: () => import('./view/details_refund'),
    meta: {
			title: '退款详细明细',
			//keepAlive: false
    }
  },
  {
    name: 'equipment_details',
    component: () => import('./view/equipment_details'),
    meta: {
			title: '设备详情',
			//keepAlive: false
    }
  },
  {
    name: 'equipment_single',
    component: () => import('./view/equipment_single'),
    meta: {
			title: '单台设备详情',
			//keepAlive: false
    }
  },

];

// add route path
routes.forEach(route => {
  route.path = route.path || '/' + (route.name || '');
});

const router = new Router({ routes });

// router.beforeEach((to, from, next) => {
//   const title = to.meta && to.meta.title;
//   if (title) {
//     document.title = title;
// 	}
// 	if(getToken()){
// 			//alert('登录超时')
// 		router.push({path:'register'})
// 		//this.routes.push({ name: "register" });
// 		//next({name:'register'})
// 	}else{
// 		next();
// 	}
// });

router.beforeEach((to, from, next) => {
	//console.log(to)

  const title = to.meta && to.meta.title;
  if (title) {
    document.title = title;
  }
	// if(from.name=='home'){
	// 	to.meta.keepAlive=false;
	// 	console.log(to.meta.keepAlive);
	// }else{
	// 	to.meta.keepAlive=true;
	// 	console.log(to.meta.keepAlive);
	// }
  if(to.name=='login' || getToken()) {
    next();
  } else {
    Toast.fail({
      duration: 2000,
      message: '请先登录'
    })
    router.push({ name: 'login' })
  }
});

export {
  router
};
