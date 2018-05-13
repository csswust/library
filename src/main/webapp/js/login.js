$(function(){
    $("form :input").blur(function(){
        var $parent = $(this).parent();
        $parent.find(".msg").remove();
        //验证用户名
        if($(this).is("#userName")) {
            var nameVal = $.trim(this.value);
            var regName = /[~#^$@%&!*()<>:;'"{}【】  ]/;

            if (nameVal == "" || nameVal.length < 6 || regName.test(nameVal)) {
                var errorMsg = "姓名非空，长度6位以上，不包含特殊字符！"
                $parent.append("<span class='msg error'>" + errorMsg + "</span>");
            } else {
                var rightMsg = "输入数据正确！";
                $parent.find(".inputError").remove();
                $parent.append("<span class='msg right'>" + rightMsg + "</span>")
            }
        }
        //邮箱
        if($(this).is("#userEmail")){
            var emailVal = $.trim(this.value);
            var regEmail = /.+@.+\.[a-zA-Z]{2,4}$/;
            if(emailVal =="" || (emailVal != "" && !regEmail.test(emailVal))){
                var errorMsg = "请输入正确的Email地址！";
                $parent.append("<span class='msg error'>"+errorMsg+"</span>");
            }else{
                var rightMsg = "输入正确！";
                $parent.find(".inputError").remove();
                $parent.append("<span class='msg right'>"+rightMsg+"</span>");
            }
        }
    });
});
