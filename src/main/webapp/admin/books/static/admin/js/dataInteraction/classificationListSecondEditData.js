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
        name: "",
        id: 0,
        firstId: 0,
        searchSecondClassifyById: function () {
            $.ajax({
                type: "GET",
                url: "/library/secondClassify/selectById",
                dataType: "json",
                async: false,
                data: {
                    id: program.id
                },
                success: function (result) {
                    var secondClassify = result.secondClassify;
                    var firstClassifyList = result.firstClassifyList;
                    var firstClassify = result.firstClassify;

                    $(".m-b").prepend("<option value='" + firstClassify.id + "'>" + firstClassify.name + "</option>");
                    for (var i = 0; i < firstClassifyList.length; i++) {
                        $(".m-b").append("<option value='" + firstClassifyList[i].id + "'>" + firstClassifyList[i].name + "</option>");
                    }
                    $("#second-classify").val(secondClassify.name);
                }
            });
        },
        updateSecondClassify: function () {
            $.ajax({
                type: "GET",
                url: "/library/secondClassify/updateById",
                dataType: "json",
                async: false,
                data: {
                    id: program.id,
                    firstId: program.firstId,
                    name: program.name
                },
                success: function (result) {
                    window.location.href = "classificationListSecond.html";
                }
            });
        }
    }
    var request = new urlSearch();
    program.id = request.id;
    program.searchSecondClassifyById();
    $("#submit_btn").click(function () {
        program.name = $("#second-classify").val();
        program.firstId = $(".m-b").val();
        program.updateSecondClassify();
    });

});
