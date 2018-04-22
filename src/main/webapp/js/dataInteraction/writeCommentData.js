/**
 * Created by Sunny on 2018/4/22.
 */
$(function () {
    var writeComment = {
        orderId: "",
        writeCommentMain: function () {
            $.ajax({
                type: "GET",
                url: "/library/bookOrder/selectById",
                dataType: "json",
                async: false,
                data:{
                    id: writeComment.orderId
                },
                success: function (result) {
                    console.log(result);
                }
            });
        }
    }
    writeComment.writeCommentMain();
});