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
				url: "/library/userInfo/login",
				dataType: "json",
                async: false,
				data: {
					username: program.username,
					password: program.confirmPassword
				},
				success: function (result){
					console.log(result);
					if(result.status == "1"){
						window.location.href = "index.html";
					}
					else{
						document.getElementById("dialogs").innerHTML='<h3>' + result.desc + '</h3>';
            			dialog();
					}
				},
				error: function(){
					console.log("请求错误");
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
            }
        },
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
