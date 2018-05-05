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
        name: "",
        addFirstClassify: function () {
            $.ajax({
                type: "GET",
                url: "/library/firstClassify/insertOne",
                dataType: "json",
                async: false,
                data: {
                    name: program.name
                },
                success: function (result) {
                    window.location.href = "classificationListFirst.html";
                }

            });
        }
    };
    $("#submit_btn").click(function () {
        program.name = $("#first-classify").val()
        program.addFirstClassify();
    });
});