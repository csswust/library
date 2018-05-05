/**
 * Created by Sunny on 2018/5/5.
 */
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
        firstId:0,
        searchFirstClassifyList: function () {
            $.ajax({
                type: "GET",
                url: "/library/firstClassify/selectByCondition",
                dataType: "json",
                async: false,
                data: {
                    page: program.page,
                    rows: program.rows
                },
                success: function (result) {
                    program.total = result.total;
                    var html = "";
                    var firstClassifyList = result.list;
                    for (var i = 0; i < firstClassifyList.length; i++) {
                        var firstClassify = bookCommentList[i];
                        firstClassify.index = index;
                        index += 1;
                        firstClassify.editId = firstClassify.id;
                        firstClassify.deleteId = firstClassify.id;
                        html += template("classification", firstClassify);
                    }
                    document.getElementById("content").innerHTML = html;
                    $(".edit-firstClassify").click(function () {
                        program.firstId = this.id;
                        program.deleteFirstClassifyById();
                    });
                    $(".del_btn").click(function () {
                        window.location.href = "classificationListFirstEdit.html?id="+this.id;
                    });
                }

            });
        },
        deleteFirstClassifyById: function () {
            $.ajax({
                type: "GET",
                url: "/library/firstClassify/deleteByIds",
                dataType: "json",
                async: false,
                data: {
                    ids:program.firstId+""
                },
                success: function (result) {
                    location.reload();
                }
            });
        }
    };

    program.searchFirstClassifyList();
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
                program.searchFirstClassifyList()
            }
        });
    });
});