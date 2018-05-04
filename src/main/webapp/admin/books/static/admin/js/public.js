$(document).ready(function ()
{
    $(".i-checks").iCheck({checkboxClass:"icheckbox_square-green",radioClass:"iradio_square-green"});

	$('body').on('click', '#cancel_btn', close_current_layer);
});

// 关闭当前layer弹出层
function close_current_layer ()
{
    // 获取窗口索引
    var index = parent.layer.getFrameIndex(window.name);
    // 关闭弹出层
    parent.layer.close(index);
}