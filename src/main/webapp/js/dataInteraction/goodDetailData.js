/**
 * Created by Sunny on 2018/4/7.
 */
$(function () {
    $("#searchButton").click(function () {
       var goodDetail_title = $("#keyword").val();
       window.location.href =  "goodList.html?goodDetail_title="+goodDetail_title;
    });
});