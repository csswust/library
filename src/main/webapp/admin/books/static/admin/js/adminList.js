$(document).ready(function ()
{
	$('.refresh_btn').on('click', reload);
	//添加管理员
    $('.add-admin').on('click', function (){
        lay_iframe_fn({
            title: '添加管理员',
            area: ['550px', '300px'],
            content: 'html/admin/adminListAdd.html',
            end: function ()
            {
            }
        });
    });
    //修改管理员信息
    $('.edit-admin').on('click', function (){
        lay_iframe_fn({
            title: '修改管理员信息',
            area: ['550px', '300px'],
            content: 'html/admin/adminListEdit.html',
            end: function (){
            }
        });
    });
});