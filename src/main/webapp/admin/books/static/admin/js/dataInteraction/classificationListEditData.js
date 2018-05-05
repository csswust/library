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
        searchFirstClassifyById: function () {
            $.ajax({
                type: "GET",
                url: "/library/firstClassify/selectById",
                dataType: "json",
                async: false,
                data: {
                    id: program.id
                },
                success: function (result) {
                    $("#first-classify").val(result.name);
                }
            });
        },
        updateFirstClassify: function () {
            $.ajax({
                type: "GET",
                url: "/library/firstClassify/updateById",
                dataType: "json",
                async: false,
                data: {
                    id:program.id,
                    name: program.name
                },
                success: function (result) {
                    window.location.href = "classificationListFirst.html";
                }
            });
        }
    }
    var request = new urlSearch();
    program.id = request.id;
    program.searchFirstClassifyById();
    $("#submit_btn").click(function () {
        program.name = $("#first-classify").val();
        program.updateFirstClassify();
    });

});
