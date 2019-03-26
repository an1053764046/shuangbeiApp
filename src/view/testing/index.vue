<template>
  <div>
    <van-nav-bar
        title="设备检测"
        left-text="返回"
        left-arrow
        @click-left="$router.back()"
    />
    <div class="equipment_label">
        <van-field
            v-model="equnumber"
            clearable
            label="设备编号："
            placeholder="请输入设备编号"
        />
    </div>
    <div class="btn">
        <van-button size="normal">设备检测</van-button>
        <van-button size="normal" @click="generate">二维码生成</van-button>
    </div>
		<div id="qrcode" ref='qrCodeDiv'></div>
  </div>
</template>

<script>
import { NavBar,Field,Button,Toast  } from "vant"
import { reg,generatecode } from '../../api'
import QRCode from 'qrcodejs2'
export default {
	components: {
			[NavBar.name]: NavBar,
			[Field .name]: Field ,
			[Button .name]: Button ,
			[Toast .name]: Toast ,
	},
	data(){
			return{
					equnumber:'',
					url:''
			}
	},
	methods:{
		generate(){
			
			generatecode({devno:this.equnumber}).then(res=>{
				let qrcodea=document.getElementById("qrcode")
					//console.log(res.data);
					if(res.data.code==0){
							this.$nextTick(function () {
									if(qrcodea.innerHTML==''){
										this.qrcode1();
									}else{
										qrcodea.innerHTML = "";
										this.qrcode1();
									}
							})
					}else{
						Toast.fail(res.data.info);
						qrcodea.innerHTML = "";
					}
					
			})
		},
		qrcode1(){
			let imgs='http://www.shuangbeizn.com/xpay/v1/device?devno='+this.equnumber
			new QRCode(this.$refs.qrCodeDiv, {
          text: imgs,
          width: 200,
          height: 200,
          colorDark: "#333333", //二维码颜色
          colorLight: "#ffffff", //二维码背景色
          //correctLevel: QRCode.CorrectLevel.L//容错率，L/M/H
			})
			//console.log(imgs);
		}
	},
	mounted(){
		
	}
	
}
</script>

<style lang="less" scoped>
#qrcode{
	text-align: center;
	padding: 1rem 5rem;
}
.equipment_label{
    padding: 1rem;
}
.btn{
    background-color: #eee;
    padding: .5rem 1rem;
    display: flex;
    justify-content: space-around;
    button{
        color: orange;
        border: 1px solid orange;
    }
}
</style>