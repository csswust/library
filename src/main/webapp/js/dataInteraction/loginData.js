/**
 * Created by Sunny on 2018/4/5.
 */
$(function(){
	function dialog(){
		$("#myModal").modal("toggle");
	};
	$("#userName").focus();
	var program = {
		username: "",
		confirmPassword: "",
		login: function(){
			$.ajax({
				type: "POST",
				url: "",
				dataType: "json",
				data: {
					username: program.username,
					confirmPassword: program.confirmPassword
				},
				success: function (result){
					console.log(result);
//					var exp = new Date();
					document.cookie = "userId=" + escape(result.userId);
					document.cookie = "username=" + escape(result.username);
					if(result.loginRe.status == "1"){
						window.location.href = "index.html";
					}
					else{
						document.getElementById("dialogs").innerHTML='<h3>' + result.loginRe.desc + '</h3>';  
            			dialog();
//						program.alertInfo("alert-error", result.loginRe.desc);
					}
				},
				error: function(){
					document.getElementById("dialogs").innerHTML="<h3>登录失败！</h3>";  
            		dialog();
//					program.alertInfo("alert-error", "登录失败！");
					$("#userName").val("");
					$("#confirmPassword").val("");
				}
			});
		},
		judge: function () {
            program.username = $("#userName").val();
            program.confirmPassword = $("#confirmPassword").val();
            if (program.username != "" && program.confirmPassword != "") {
                program.login();
            } else {
            	document.getElementById("dialogs").innerHTML="<h3>账号和密码不能为空！</h3>";  
            	dialog();
//              program.alertInfo("alert-danger", "账号和密码不能为空！");
            }
        }
	}
	 $("#send").click(function () {
	        program.judge();
	  });
	    $("body").keydown(function () {
	        if (event.keyCode == "13") {        //keyCode=13是回车键
	            program.judge();
	        }
	    });
});
