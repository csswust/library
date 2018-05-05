$(document).ready(function () {
	$('.refresh_btn').on('click', reload);
    //修改用户信息
    $('.edit-user').on('click', function (){
        lay_iframe_fn({
            title: '修改用户信息',
            area: ['550px', '360px'],
            content: 'html/user/userEdit.html',
            end: function (){
            }
        });
    });
});