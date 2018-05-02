/**
 * Created by Sunny on 2018/4/7.
 */
$(function () {
    $("#searchButton").click(function () {
        var index_title = $("#keyword").val();
        window.location.href = "goods/goodList.html?index_title=" + index_title;
    });
    var program = {
        userName: "",
        initMassage: function () {
            $("#discription").text("欢迎登录Sunny图书网");
            $("#logout").hide();
        },
        queryUserInfo: function () {
            $.ajax({
                type: "POST",
                url: "/library/userInfo/check",
                dataType: "json",
                async: false,
                data: {},
                success: function (result) {
                    var userInfo = result.data.userInfo;
                    if (userInfo != null) {
                        program.userName = userInfo.username;
                        if (program.userName != null && program.userName.length > 0) {
                            $("#discription").text("欢迎" + program.userName + "登录Sunny图书网");
                            $("#logout").show();
                            $("#please").hide();
                            $("#loginSpan").hide();
                            $("#line").hide();
                            $("#registSpan").hide();
                        }
                    }
                }

            });
        },
        logout: function () {
            $.ajax({
                type: "POST",
                url: "/library/userInfo/logout",
                dataType: "json",
                async: false,
                data: {},
                success: function (result) {
                  alert(result.desc);
                }
            });
        }
    }
    program.initMassage();
    program.queryUserInfo();
    $("#logout").click(function () {
        program.logout();
        location.reload();
    });
});