/**
 * Created by Sunny on 2018/4/7.
 */
$(function () {
    $("#searchButton").click(function () {
       var index_title = $("#keyword").val();
       window.location.href = "goods/goodList.html?index_title=" + index_title;
    });
});