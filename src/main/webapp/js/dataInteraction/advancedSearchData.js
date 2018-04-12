/**
 * Created by Sunny on 2018/4/7.
 */
$(function () {
    $("#searchBook").click(function () {
        var title = $("#bookName").val();
        var author = $("#bookAuthor").val();
        var press = $("#bookPress").val();
        var ISBN = $("#bookISBN").val();
        window.location.href = "goods/goodList.html?title="+title + "&author="+author + "&press="+press + "&ISBN="+ISBN;
    });
});