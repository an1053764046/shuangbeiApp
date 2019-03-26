import service from './request'

//首页
export const getList=function(params){
	return service({
		url: '/home',
		method: 'get',
		params
	})
}

//获取收益明细
export const getEarning=function(params){
	return service({
		url: '/income',
		method: 'get',
		params
	})
}
//获取收益列表
export const getEarningList=function(params){
	return service({
		url: '/income1',
		method: 'get',
		params
	})
}
//获取场所收益列表
export const getplaceList=function(params){
	return service({
		url: '/income2',
		method: 'get',
		params
	})
}
//获取场所详情
export const getplacedetails=function(params){
	return service({
		url: '/place',
		method: 'get',
		params
	})
}
//获取场所详情
export const devicestate =function(params){
	return service({
		url: '/place1',
		method: 'get',
		params
	})
}
//获取订单笔数
export const getordernum =function(params){
	return service({
		url: '/ordercnt',
		method: 'get',
		params
	})
}
//获取订单列表
export const getorderlist =function(params){
	return service({
		url: '/order',
		method: 'get',
		params
	})
}
//获取场所订单列表
export const getplacerder =function(params){
	return service({
		url: '/order1',
		method: 'get',
		params
	})
}
//获取设备使用情况
export const getequipment =function(params){
	return service({
		url: '/equ',
		method: 'get',
		params
	})
}
//获取设备使用情况
export const getsingle =function(params){
	return service({
		url: '/equ1',
		method: 'get',
		params
	})
}
//获取退款明细
export const getrefundmon =function(params){
	return service({
		url: '/refund',
		method: 'get',
		params
	})
}
//获取退款明细列表
export const getrefund =function(params){
	return service({
		url: '/refund1',
		method: 'get',
		params
	})
}
//获取退款详情列表
export const refundDetails =function(params){
	return service({
		url: '/refund2',
		method: 'get',
		params
	})
}
//获取二维码
export const generatecode =function(params){
	return service({
		url: '/checkdevno',
		method: 'get',
		params
	})
}
//退款
export const refund =function(params){
	return service({
		url: '/refundequ',
		method: 'get',
		params
	})
}
//重启
export const restart =function(params){
	return service({
		url:'/restartequ',
		method: 'get',
		params
	})
}


//登录
export const reg=function(data){
	return service({
		url: 'auth/login',
		method: 'post',
		data
	})
}

