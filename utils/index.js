module.exports = {
	codeDefault:{
			data:{},
			code:0,
			status:1,
			msg:''
	},
	resErrorCode(opt){
		return Object.assign({},this.codeDefault,{status:0},opt);
	},
	resSuccessCode(opt){
		return Object.assign({},this.codeDefault,opt);
	},
	res40121Code(opt){
		return Object.assign({},this.codeDefault,{status:0,code:40121,msg:"会话已超时"},opt);
	}
}