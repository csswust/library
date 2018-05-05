/**
 * Created by Sunny on 2018/5/5.
 */
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
                    $("#account").val(result.username);
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
                },
                success: function (result) {
                    window.location.href = "adminList.html";
                }
            });
        }
    }
    var request = new urlSearch();
    program.userId = request.id;
    program.searchUserInfoById();
    $("#submit_btn").click(function () {
        program.userName = $("#account").val();
        program.password = $("#pwd").val();
        program.updateUserInfo();
    });

});
