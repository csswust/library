/*
 * datatables 实例化函数
 * */
function table_render_init (url, model)
{
    var table = $(model['tab_element_id']).DataTable(
        {
            bProcessing : true, // DataTables载入数据时，是否显示‘进度’提示
            // serverSide: true, // 是否启动服务器端数据导入
            // 本地虚拟数据导入
            data:model['data'],
            // 是否打开客户端状态记录功能,此功能在ajax刷新纪录的时候不会将个性化设定回复为初始化状态
            bStateSave : false,
            bJQueryUI : true, // 是否使用 jQury的UI theme
            // aLengthMenu : [20, 40, 60], // 更改显示记录数选项
            iDisplayLength : 10, // 默认显示的记录数
            bAutoWidth : true, // 是否自适应宽度
            // 是否开启DataTables的高度自适应，当数据条数不够分页数据条数的时候，插件高度是否随数据条数而改变
            bScrollCollapse : true,
            bFilter: false,      // 取消搜索框
            bLengthChange: false, // 去掉每页显示多少条数据方法
            bPaginate: true, // 是否显示（应用）分页器
            bInfo : true, // 是否显示页脚信息，DataTables插件左下角显示记录数
            // //是否启动各个字段的排序功能
            bSort:true,
            // 对指定列关闭排序
            columnDefs: model['columnDefs'],
            destroy : true,
            //当处理大数据时，延迟渲染数据，有效提高Datatables处理能力
            // deferRender: true,
            /*ajax:
                {
                    url: url,
                    method:'post',
                    data: {'action':'list'},
                    dataType: 'json',
                    dataFilter: function(data)
                    {
                        var json = jQuery.parseJSON(data);
                        json.draw = json.draw;
                        json.recordsTotal = json.total;
                        json.recordsFiltered = json.total;
                        return JSON.stringify(json); // return JSON string
                    }
                },*/
            columns: model['columns'],
            ordering:true,
            order: model['order'],
            sPaginationType: "bootstrap",
            // pagingType 设置分页类型
            // numbers - 只有只有数字按钮
            // simple - 只有上一页、下一页两个按钮
            // simple_numbers - 除了上一页、下一页两个按钮还有页数按钮，Datatables默认是这个
            // full - 有四个按钮首页、上一页、下一页、末页
            // full_numbers - 除首页、上一页、下一页、末页四个按钮还有页数按钮
            // first_last_numbers - 除首页、末页两个按钮还有页数按钮
            pagingType: "full_numbers",
            //  国际化配置
            oLanguage: {
                sLengthMenu: "每页显示 _MENU_ 条记录",
                sZeroRecords: "抱歉， 没有找到",
                sInfo: "从 _START_ 到 _END_ /共 _TOTAL_ 条数据",
                sInfoEmpty: "记录数为0",
                sSearch: "模糊搜索",
                sInfoFiltered: "(从 _MAX_ 条数据中检索)",
                oPaginate: {
                    sFirst: "首页",
                    sPrevious: "前一页",
                    sNext: "后一页",
                    sLast: "尾页"
                },
                sZeroRecords: "没有检索到数据",
                sProcessing: "正在获取数据，请稍后..."
            }
        });

    $(model['tab_element_id']+' tbody').on('click', 'td button.details-control', function ()
    {
        var e = this,
            tr = $(e).closest('tr'),
            row = table.row(tr);
        if (row.child.isShown())
        {
            row.child.hide();
            $(e).html('<i class="fa fa-eye"></i>');
            tr.removeClass('shown');
        }
        else
        {
            // Open this row
            row.child(format(row.data())).show();
            $(e).html('<i class="fa fa-eye-slash"></i>');
            tr.addClass('shown');
        }
    });

    function format (d)
    {
        // `d` is the original data object for the row
        if (model.hasOwnProperty('formatFn'))
        {
            return model.formatFn(d);
        }
        else
        {
            return '<button type="button">空数据</button>';
        }
    }

    /*
     * 当表格重绘后，点击事件失效 搜索有用live实现效果，但引入live，提示该函数不存在
     */
    /*$(model['tabElementId']+' tbody tr').live('click', function ()
    {
        var e = this,
            checkbox = $(e).children('td').eq(0).children('input');
        $(e).css('cursor','pointer');
        $(e).toggleClass('selected');
        if ($(e).hasClass('selected'))
        {
            $(checkbox).prop('checked',true);
        }
        else
        {
            $(checkbox).removeProp('checked');
        }
    });*/
    return table;
}