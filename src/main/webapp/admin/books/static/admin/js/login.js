/**
 * Created by Sunny on 2018/5/17.
 */
$(document).ready(function () {
    var program = {
        username: "",
        confirmPassword: "",
        login: function () {
            $.ajax({
                type: "POST",
                url: "/library/userInfo/login",
                dataType: "json",
                async: false,
                data: {
                    username: program.username,
                    password: program.confirmPassword
                },
                success: function (result) {
                    console.log(result);
                    if (result.status == "1") {
                        window.location.href = "index.html";
                    }
                    else {
                        document.getElementById("dialogs").innerHTML = '<h3>' + result.desc + '</h3>';
                        dialog();
                    }
                },
                error: function () {
                    console.log("请求错误");
                }
            });
        }
    }
    $("#login").click(function () {
        program.username = $(".uname").val();
        program.confirmPassword = $(".pword").val();
        program.login();
    });
});