/**
 * Created by Sunny on 2018/5/5.
 */

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
        secondId:0,
        searchSecondClassifyList: function () {
            $.ajax({
                type: "GET",
                url: "/library/secondClassify/selectByCondition",
                dataType: "json",
                async: false,
                data: {
                    page: program.page,
                    rows: program.rows
                },
                success: function (result) {
                    program.total = result.total;
                    var html = "";
                    var secondClassifyList = result.list;
                    var firstClassifyList = result.firstClassifyList;
                    for (var i = 0; i < secondClassifyList.length; i++) {
                        var secondClassify = secondClassifyList[i];
                        secondClassify.index = index;
                        index += 1;
                        secondClassify.editId = secondClassify.id;
                        secondClassify.deleteId = secondClassify.id;
                        secondClassify.secondName = secondClassify.name;
                        secondClassify.firstName = firstClassifyList[i].name;
                        html += template("classificationSecond", secondClassify);
                    }
                    document.getElementById("content").innerHTML = html;
                    $(".del_btn").click(function () {
                        program.secondId = this.id;
                        program.deleteSecondClassifyById();
                    });
                    $(".edit-secondClassify").click(function () {
                        window.location.href = "classificationListSecondEdit.html?id="+this.id;
                    });
                }
            });
        },
        deleteSecondClassifyById: function () {
            $.ajax({
                type: "GET",
                url: "/library/secondClassify/deleteByIds",
                dataType: "json",
                async: false,
                data: {
                    ids:program.secondId+""
                },
                success: function (result) {
                    location.reload();
                }
            });
        }
    };

    program.searchSecondClassifyList();
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
                program.searchSecondClassifyList();
            }
        });
    });
});
