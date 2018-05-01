/**
 * Created by Sunny on 2018/4/22.
 */
$(function () {
    var writeComment = {
        id: "",
        themeTitle:"",
        themeScore:"",
        themeContent:"",
        bookId:"",
        writeCommentMain: function () {
            $.ajax({
                type: "GET",
                url: "/library/bookOrder/selectById",
                dataType: "json",
                async: false,
                data: {
                    id: writeComment.id
                },
                success: function (result) {
                    var bookInfoList = result.data.bookInfoList;
                    var commTheme = result.data.bookCommentList;
                    var html = "";
                    for (var i = 0; i < bookInfoList.length; i++) {
                        if(commTheme[i] == null){
                            var bookInfo = bookInfoList[i];
                            html += template("themes", bookInfo);
                        }
                    }
                    document.getElementById("content").innerHTML = html;
                    $(".submitTheme").click(function () {
                        var bookId = this.id;
                        writeComment.bookId = bookId;
                        writeComment.themeContent = $("#context"+bookId).val();
                        writeComment.themeScore = $("#score"+bookId+" li.on").length;
                        writeComment.themeTitle = $("#theme"+bookId).val();
                        writeComment.insertTheme();
                    });
                }
            });
        },
        insertTheme:function () {
            $.ajax({
                type: "POST",
                url: "/library/bookComment/insertOne",
                dataType: "json",
                async: false,
                data: {
                     orderId:writeComment.id,
                     bookId:writeComment.bookId,
                     title:writeComment.themeTitle,
                     score:writeComment.themeScore,
                     content:writeComment.themeContent
                },
                success: function (result) {
                    window.location.href = "../goods/writeGoodComment.html?orderId=" + writeComment.id;
                }
            });
        }
    }

    var request = new urlSearch();//实例化
    writeComment.id = request.orderId;

    writeComment.writeCommentMain();
});