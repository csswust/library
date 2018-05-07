/**
 * Created by Sunny on 2018/5/5.
 */
/**
 * Created by Sunny on 2018/5/4.
 */
$(function () {
    var index = 1;
    var program = {
        page: 1,
        rows: 10,
        total: 0,
        bookCommentId:0,
        searchBookCommentList: function () {
            $.ajax({
                type: "GET",
                url: "/library/bookComment/selectByCondition",
                dataType: "json",
                async: false,
                data: {
                    page: program.page,
                    rows: program.rows
                },
                success: function (result) {
                    program.total = result.total;
                    var html = "";
                    var bookCommentList = result.list;
                    var userInfoList = result.userInfoList;
                    for (var i = 0; i < bookCommentList.length; i++) {
                        var bookComment = bookCommentList[i];
                        bookComment.index = index;
                        index += 1;
                        bookComment.userName = userInfoList[i].username;
                        html += template("bookComments", bookComment);
                    }
                    document.getElementById("content").innerHTML = html;
                    $(".delete-user").click(function () {
                        program.bookCommentId = this.id;
                        program.deletebookCommentById();
                    });
                }

            });
        },
        deletebookCommentById: function () {
            $.ajax({
                type: "GET",
                url: "/library/bookComment/deleteByIds",
                dataType: "json",
                async: false,
                data: {
                    ids:program.bookCommentId+""
                },
                success: function (result) {
                    location.reload();
                }
            });
        }
    };

    program.searchBookCommentList();
    $(function () {
        $('.M-box2').pagination({
            totalData: program.total,
            showData: program.row,
            coping: true,
            homePage: '<<',
            endPage: '>>',
            prevContent: '<',
            nextContent: '>',
            callback: function (api) {
                program.page = api.getCurrent();
                program.searchBookCommentList()
            }
        });
    });
});