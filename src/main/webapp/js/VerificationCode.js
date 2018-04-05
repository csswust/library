$(function(){
	(function(){
		var code;
		function creatCode(){
			code='';
			var codeLength = 4;
			var codeV = $(".codeContent");
			var random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R', 'S','T','U','V','W','X','Y','Z');
			for(var i = 0; i < codeLength; i++){
				var index = Math.floor(Math.random()*36);
				code += random[index];
			}
			codeV.text(code);
		}
		creatCode();
		
		$(".codeContent").bind('click',function() {  
            creatCode();  
        });
        $(".change").bind("click",function(){
        	creatCode();
        });
		//用立即注册的按钮点击后进行验证
		$("#send").bind("click",function(){
			var oValue = $("#code").val().toUpperCase();
			$("#verification").html();
			if(oValue ==""){  
                $("#verification").html("<font color='red'>请输入验证码</font>");  
            }else if(oValue != code){  
                $("#verification").html("<font color='red'>验证码不正确，请重新输入</font>");  
                oValue = "";  
                creatCode();  
            }else{  
                $("#verification").html("<font color='blue'>验证码正确</font>");  
            }  
		});
	})();
});
