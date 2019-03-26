import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state : {
				datas:{
					name:{},
					start:{},
					end:{},
					serialnum:{},
					placeid:{},
					devid:{},
					devno:{},
					refund:{},
					username:{}
				},
				
    },    
    mutations : {
			sell(state,data){
				state.datas.name=data
			},
			sell0(state,data){
				state.datas.username=data
			},
			sell(state,data){
				state.datas.name=data
			},
			sell1(state,data){
				state.datas.start=data
			},
			sell2(state,data){
				state.datas.end=data
			},
			sell3(state,data){
				state.datas.serialnum=data
			},
			sell4(state,data){
				state.datas.placeid=data
			},
			sell5(state,data){
				state.datas.devid=data
			},
			sell6(state,data){
				state.datas.devno=data
			},
			sell7(state,data){
				state.datas.refund=data
			},
    },
    actions: {

    }
});

// 3. 结果
export default store;