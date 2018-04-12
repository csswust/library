/**
 * Created by Sunny on 2018/4/5.
 */
$(function () {
   var program = {
       username: "",
       checkLogin: function() {
           $.ajax({
               type: "POST",
               url: "/library/user/login",
               dataType: "json",
               async: false,
               data: {
                   username: program.username
               },
               success: function (result) {
                   console.log(result);
                   if(result.status == "-1"){
                       document.getElementById("dialogs").innerHTML='<h3>您尚未登录！</h3>';
                       dialog();
                       window.location.href = "login.html";
                   }else {
                        return result.username;
                   }
               }
           })
       },
   }
});
