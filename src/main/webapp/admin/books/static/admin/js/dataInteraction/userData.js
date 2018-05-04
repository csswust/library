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
        searchUserInfoList: function () {
            $.ajax({
                type: "GET",
                url: "/library/userInfo/selectByCondition",
                dataType: "json",
                async: false,
                data: {
                    username: program.userName,
                    page: program.page,
                    rows: program.rows
                },
                success: function (result) {
                    program.total = result.total;
                    var html = "";

                    for (var i = 0; i < result.list.length; i++) {
                        var userInfo = result.list[i];
                        userInfo.index = index;
                        index += 1;
                        userInfo.userId = userInfo.id;
                        userInfo.deleteId = userInfo.id;
                        html += template("userList", userInfo);
                    }
                    document.getElementById("content").innerHTML = html;
                    $(".delete-user").click(function () {
                        program.userId = this.id;
                        program.deleteUserById();
                    });
                    $(".edit-user").click(function () {
                        window.location.href = "userEdit.html?id=" + this.id;
                    });
                }

            });
        },
        deleteUserById: function () {
            $.ajax({
                type: "GET",
                url: "/library/userInfo/deleteByIds",
                dataType: "json",
                async: false,
                data: {
                    ids:program.userId+""
                },
                success: function (result) {
                    location.reload();
                }
            });
        }
    };

    program.searchUserInfoList();
    $('.search_btn').click(function () {
        program.userName = $("#keywords").val();
        program.searchUserInfoList();
    });
    $(function () {
        $('.M-box2').pagination({
            totalData: program.total,
            showData: program.row,
            coping: true,
            homePage: '首页',
            endPage: '末页',
            prevContent: '上页',
            nextContent: '下页',
            callback: function (api) {
                program.page = api.getCurrent();
                program.bookList()
            }
        });
    });
});