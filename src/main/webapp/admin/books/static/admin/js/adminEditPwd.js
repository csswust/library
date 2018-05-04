$(document).ready(function ()
{
    $('body').on('click', '#cancel_btn', close_current_layer);

    $('#admin_edit_pwd').validate(
        {
            rules:
                {
                    old_pwd:
                        {
                            required: !0
                        },
                    new_pwd:
                        {
                            required: !0
                        },
                    new_pwd_repeat:
                        {
                            required: !0,
                            equalTo: '#new_pwd'
                        }
                },
            messages:
                {
                    old_pwd:
                        {
                            required: '请填写旧密码~'
                        },
                    new_pwd:
                        {
                            required: '请填写新密码~'
                        },
                    new_pwd_repeat:
                        {
                            required: '请填写确认新密码~',
                            equalTo: '两次输入的新密码不一样'
                        }
                },
            onkeyup:false,
            focusCleanup:true,
            success:"valid",
            submitHandler:function()
            {
                form_submit();
                return false;
            }
        });

    function form_submit ()
    {

        var data =
                {
                    old_pwd: $('#old_pwd').val(),
                    new_pwd: $('#new_pwd').val()
                },
            ajax_obj =
                {
                    type: 'post',
                    data: data,
                    successFn: function (data)
                    {
                        if (+data.state===50)
                        {
                            layer_msg(data.msg, 6, 1.5e3);
                            delay_task(
                                {
                                    fn: function()
                                    {
                                        window.top.location = './login.html';
                                        close_current_layer();
                                    },
                                    time: 1.5e3
                                });
                        }
                        else
                        {
                            layer_msg(data.msg, 6, 1.5e3);
                        }
                    }
                };

        console.dir(data);
        // ajax_request('admin/admin.php?action=reset_pwd', ajaxObj);
    }
});