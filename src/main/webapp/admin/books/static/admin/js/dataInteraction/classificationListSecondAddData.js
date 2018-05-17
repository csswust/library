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
    var program = {
        searchFirstClassifyById: function () {
            $.ajax({
                type: "GET",
                url: "/library/firstClassify/selectByCondition",
                dataType: "json",
                async: false,
                data: {
                },
                success: function (result) {
                    var firstClassifyList = result.list;
                    for (var i = 0; i < firstClassifyList.length; i++) {
                        $(".m-b").append("<option value='" + firstClassifyList[i].id + "'>" + firstClassifyList[i].name + "</option>");
                    }
                }
            });
        },
        addSecondClassify: function () {
            $.ajax({
                type: "GET",
                url: "/library/secondClassify/insertOne",
                dataType: "json",
                async: false,
                data: {
                    firstId: program.firstId,
                    name: program.name
                },
                success: function (result) {
                    window.location.href = "classificationListSecond.html";
                }
            });
        }
    }
    program.searchFirstClassifyById();
    $("#submit_btn").click(function () {
        program.name = $("#second-classify").val();
        program.firstId = $(".m-b").val();
        program.addSecondClassify();
    });

});
