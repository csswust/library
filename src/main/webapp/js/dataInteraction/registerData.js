$(function(){
    function dialog(){
        $("#myModal").modal("toggle");
    };
    var program = {
        username: "",
        useremail: "",
        setpassword: "",
        confirmPassword: "",
        verificationCode: "",
        register: function () {
            $.ajax({
                type: "POST",
                url: "/library/user/register",
                dataType: "json",
                data: {
                    username: program.username,
                    email: program.useremail,
                    password: program.setpassword,
                    confimpassword: program.confirmPassword
                },
                success: function (result) {
                    console.log(result);
                    if(result.status == "1"){
                        window.location.href = "login.html";
                    }else {
                        document.getElementById("dialogs").innerHTML='<h3>' + result.desc + '</h3>';
                        dialog();
                    }
                },
                error: function () {
                    console.log("请求错误");
                }
            });
        },
        judge: function () {
            program.username = $("#userName").val();
            program.useremail = $("#userEmail").val();
            program.setpassword = $("#setPassword").val();
            program.confirmPassword = $("#confirmPassword").val();
            if(program.username != "" && program.useremail != "" && program.setpassword != "" && program.confirmPassword != "" && (program.setpassword == program.confirmPassword)){
                program.register();
            }else if(program.username == ""){
                document.getElementById("dialogs").innerHTML="<h3>用户名不能为空！</h3>";
                dialog();
            }else if(program.useremail == ""){
                document.getElementById("dialogs").innerHTML="<h3>邮箱不能为空！</h3>";
                dialog();
            }else if(program.setpassword == ""){
                document.getElementById("dialogs").innerHTML="<h3>密码不能为空！</h3>";
                dialog();
            }else{
                document.getElementById("dialogs").innerHTML="<h3>注册信息不能为空！</h3>";
                dialog();
            }
        },
    }
    $("#send").click(function () {
        program.judge();
    });
    $("body").keydown(function () {
        if(event.keyCode == "13"){
            program.judge();
        }
    });
});