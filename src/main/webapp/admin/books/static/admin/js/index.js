$(document).ready(function ()
{
    /*if (emptyFn(sessionStorage.getItem('admin_account')))
    {
        layerMsg('您还没有登录，请登录后进行相应操作~', 6, 1.5e3);
        delayTask(
            {
                fn: function()
                {
                    window.top.location = './login.html';
                },
                time: 1.5e3
            });
    }
    else
    {
        $('#admin_account').html(sessionStorage.getItem('admin_account'));
        $('#admin_role').html(sessionStorage.getItem('admin_role')+'<b class="caret"></b>');
    }*/

    $('body #login_out').on('click', function ()
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