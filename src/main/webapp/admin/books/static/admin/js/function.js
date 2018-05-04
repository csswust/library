// 调用layer弹出层 进行二次封装
function lay_iframe_fn (obj)
{
    var model = {
        title: 'iframe弹出层',
        closeBtn: false,
        area: ['340px', '500px'],
        content: ['http://www.zi-han.net', 'no'],
        end: function ()
        {
            console.dir(0);
        }
    };
    model = jQuery.extend(true,{},model,obj);
    //layer iframe窗
    parent.layer.open(
        {
            type: 2,
            title: model.title,
            closeBtn: model.close_btn,
            shade: model.shade, // 阴影设置
            shadeClose: true, // 点击遮罩关闭
            anim: 1, // 弹出层出现方式
            area: model.area, // 宽+高
            content: model.content, //iframe的url，no代表不显示滚动条
            end: model.end
        });
}

// 调用layerMsg
function layer_msg (msg,icon,time)
{
    layer.msg(msg, {icon:icon, time:time});
}

// 关闭当前layer弹出层
function close_current_layer ()
{
    // 获取窗口索引
    var index = parent.layer.getFrameIndex(window.name);
    // 关闭弹出层
    parent.layer.close(index);
}

// 重载当前页面
function reload ()
{
    window.location.reload();
}

// 获取url参数
function get_url_param(n)
{
    var reg = new RegExp("(^|&)"+n+"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

// 检测是否为空
function empty (obj)
{
    if (!!!obj || +obj===0)
    {
        return true;
    }
    else
    {
        return false;
    }
}

// 延迟执行函数
function delay_task (obj)
{
    setTimeout(function()
    {
        obj.fn();
    },obj.hasOwnProperty('time')?obj.time:1e3);
}

// jquery的ajax二次包装
function ajax_request (url,ajax_obj)
{
    if (!url) throw new Error('Lack of url parameter');

    var ajax_model =
        {
            type: 'get',
            data: '',
            dataType: 'json',
            async: true,
            contentType: 'application/x-www-form-urlencoded',
            processData: true,
            beforeSendFn: function()
            {
                parent.layer.load(2);
            },
            successFn: function(data) {}
        };

    ajaxModel = jQuery.extend(true,{},ajax_model,ajax_obj);
    url = '/apis/admin/'+url;
    jQuery.ajax(
        {
            type: ajax_model.type,
            url: url,
            data: ajax_model.data,
            dataType: ajax_model.dataType,
            async: ajax_model.async,
            contentType: ajax_model.contentType,
            processData: ajax_model.processData,
            beforeSend: function()
            {
                ajax_model.beforeSendFn();
            },
            complete: function()
            {
                parent.layer.closeAll('loading');
            },
            success: function (data)
            {
                ajax_model.successFn(data);
            },
            error: function()
            {
                layer_msg('请求超时', 6, 1.5e3);
            }
        });
}

function del_refer_ajax (url,ids,callBackFn)
{
    layer.confirm('您确定要删除这些数据吗？', {icon: 3}, function() {

        layer_msg('您要删除的数据id为：'+ids+' 删除的接口为：'+url+'  在function.js的delReferAjax函数里面存在一个return false 阻止了进一步发送请求');
        return false;
        ajax_request(url,
            {
                data: {ids: ids},
                successFn: function (data) {
                    callBackFn(data);
                }
            });
    });
}

function find_refer_ajax(url,find_model)
{
    ajax_request(url,
        {
            successFn: function(data)
            {
                find_model.callback(data);
            }
        });
}

function form_reset (form_id)
{
    document.getElementById(form_id).reset();
}