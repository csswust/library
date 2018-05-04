/**
 * Created by Sunny on 2018/5/4.
 */
$(function () {
    var index = 1;
    var program = {
        userId: "",
        page: 1,
        rows: 10,
        total: 0,
        userName: "",
        password: "",
        email: "",
        searchUserInfoById: function () {
            $.ajax({
                type: "GET",
                url: "/library/userInfo/selectById",
                dataType: "json",
                async: false,
                data: {
                    id: program.userId
                },
                success: function (result) {
                    $("#userName").val(result.username);
                    $("#email").val(result.email);
                    $("#pwd").val(result.password);
                }
            });
        },
        updateUserInfo: function () {
            $.ajax({
                type: "GET",
                url: "/library/userInfo/updateById",
                dataType: "json",
                async: false,
                data: {
                    id: program.userId,
                    username: program.userName,
                    password: program.password,
                    email: program.email
                },
                success: function (result) {
                    window.location.href = "userList.html";
                }
            });
        }
    }
    var request = new urlSearch();
    program.userId = request.id;
    program.searchUserInfoById();
    $("#submit_btn").click(function () {
        program.userName = $("#userName").val();
        program.password = $("#pwd").val();
        program.email = $("#email").val();
        program.updateUserInfo();
    });
    $("#cancel_btn").click(function () {
        window.location.href = "userList.html";
    });

});
