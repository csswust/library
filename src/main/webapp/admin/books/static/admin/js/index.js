$(document).ready(function ()
{
    var program = {
        userName: "",
        initMassage: function () {
            $("#discription").text("欢迎登录Sunny图书网");
            $("#logout").hide();
        },
        queryUserInfo: function () {
            $.ajax({
                type: "POST",
                url: "/library/userInfo/check",
                dataType: "json",
                async: false,
                data: {},
                success: function (result) {
                    var userInfo = result.data.userInfo;
                    if (userInfo != null) {
                        program.userName = userInfo.username;
                        if (program.userName != null && program.userName.length > 0) {
                            $("#username").text(program.userName);
                        }
                    }
                }

            });
        },
        logout: function () {
            $.ajax({
                type: "POST",
                url: "/library/userInfo/logout",
                dataType: "json",
                async: false,
                data: {},
                success: function (result) {
                    window.top.location = 'login.html';
                    alert(result.desc);
                }
            });
        }
    }
    program.queryUserInfo();
    $("#logout").click(function () {
        program.logout();
    });
    $('body #login_out').on('click', function ()
    {
        layer.confirm('是否继续退出?', {icon: 3, title:'提示'}
            // function (index)
            // {
            //     sessionStorage.clear();
            //     layer_msg('成功退出登录~', 6, 1.5e3);
            //     delay_task(
            //         {
            //             fn: function()
            //             {
            //                 window.top.location = 'login.html';
            //             },
            //             time: 1.5e3
            //         });
            // }

        );
    });

    $('body #login_out_right').on('click', function ()
    {
        layer.confirm('是否继续退出?', {icon: 3, title:'提示'},
            function (index)
            {
                sessionStorage.clear();
                layer_msg('成功退出登录~', 6, 1.5e3);
                delay_task(
                    {
                        fn: function()
                        {
                            window.top.location = 'login.html';
                        },
                        time: 1.5e3
                    });
            }
        );
    });

    $('body #edit_pwd').on('click', function ()
    {
        lay_iframe_fn(
            {
                title: '修改密码',
                area: ['550px', '350px'],
                content: 'html/admin/adminEditPwd.html',
                end: function ()
                {
                }
            });
    });
});