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
	},
	randomString(size) {
    size = size || 6;
    var code_string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var max_num = code_string.length + 1;
    var new_pass = '';
    while (size > 0) {
      new_pass += code_string.charAt(Math.floor(Math.random() * max_num));
      size--;
    }
		return new_pass;
	},
	randomNumber(n){
		n = n ||4;
		var t=''; 
		for(var i=0;i<n;i++){ 
		t+=Math.floor(Math.random()*10); 
		} 
		return t; 
	}
}