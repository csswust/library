$(document).ready(function ()
{
	$('.refresh_btn').on('click', reload);
	//添加会员
    $('.add-user').on('click', function (){
        lay_iframe_fn({
            title: '添加用户',
            area: ['550px', '300px'],
            content: 'html/user/userAdd.html',
            end: function ()
            {
            }
        });
    });
    //修改用户信息
    $('.edit-user').on('click', function (){
        lay_iframe_fn({
            title: '修改用户信息',
            area: ['550px', '300px'],
            content: 'html/user/userEdit.html',
            end: function (){
            }
        });
    });
});