$(document).ready(function ()
{
    $('.refresh_btn').on('click', reload);
	
	//添加图书
    $('.add-book').on('click', function(){
        lay_iframe_fn({
        	title: '添加图书',
        	area: ['550px','600px'],
        	content: 'html/book/bookListAdd.html',
        	end: function(){
        		
        	}
        });
    });
    
    //查看图书详情
    $('.book-detail').on('click', function(){
        lay_iframe_fn({
        	title: '添加图书',
        	area: ['550px','600px'],
        	content: 'html/book/bookListDetail.html',
        	end: function(){
        		
        	}
        });
    });
    
    //编辑图书
    $('.book-edit').on('click', function(){
        lay_iframe_fn({
        	title: '编辑图书',
        	area: ['550px','600px'],
        	content: 'html/book/bookListEdit.html',
        	end: function(){
        		
        	}
        });
    });
//  var table_model =
//      {
//          tab_element_id:'#list',
//          data:book_list_temp_data,
//          columns: [
//          {
//              data: "book_id",
//              createdCell: function(cell, cellData, rowData, rowIndex, colIndex )
//              {
//                  $(cell).attr('align','center');
//                  $(cell).html("<input type='checkbox' title='选项' onclick='ids_click()' name='ids[]' value='"+cellData+"'>");
//              }
//          },
//          {
//              data:"book_id",
//              createdCell: function(cell, cellData, rowData, rowIndex, colIndex )
//              {
//                  $(cell).attr('align','center');
//              }
//          },
//          {
//              data:"book_name",
//              createdCell: function(cell, cellData, rowData, rowIndex, colIndex )
//              {
//                  $(cell).attr('align','center');
//              }
//          },
//          {
//              data:"book_author",
//              createdCell: function(cell, cellData, rowData, rowIndex, colIndex )
//              {
//                  $(cell).attr('align','center');
//              }
//          },
//          {
//              data:"book_isbn",
//              createdCell: function(cell, cellData, rowData, rowIndex, colIndex )
//              {
//                  $(cell).attr('align','center');
//              }
//          },
//          {
//              data:"book_price",
//              createdCell: function(cell, cellData, rowData, rowIndex, colIndex )
//              {
//                  $(cell).attr('align','center');
//              }
//          },
//          {
//              data:"book_classify",
//              createdCell: function(cell, cellData, rowData, rowIndex, colIndex )
//              {
//                  $(cell).attr('align','center');
//              }
//          },
//          {
//              data: "book_id",
//              createdCell: function(cell, cellData, rowData, rowIndex, colIndex )
//              {
//                  $(cell).attr('align','center');
//                  $(cell).html('<button class="btn-white btn-outline btn-xs details-control" title="查看更多"><i class="fa fa-eye"></i></button>&nbsp;&nbsp;<button class="btn-white btn-outline btn-xs edit_btn" title="编辑"><i class="fa fa-pencil-square"></i></button>&nbsp;&nbsp;<button class="btn-white btn-outline btn-xs del_btn" title="删除" data-id="'+cellData+'"><i class="fa fa-close"></i></button>');
//              }
//          }],
//          columnDefs: [
//          {
//              bSortable: false,
//              aTargets: [0,2,3,4,6,7]
//          }],
//          order: [[1,"asc"]],
//          formatFn: function(data)
//          {
//              return '<button class="btn-white btn-xs btn-outline">查看更多</button>';
//          }
//      },
//  table_render = table_render_init('', table_model);
//
//
//  // 绑定各种事件等
//
//  $('body').on('click', '.search_btn', function()
//  {
//      var keywords = $('input[name=keywords]').val();
//
//      if (!!!keywords)
//      {
//          layer_msg('请输入您要搜索的内容', 6, 1.5e3);
//      }
//      else
//      {
//          layer_msg('搜索的关键字：'+keywords);
//      }
//  });
//
//  $('body').on('click', '.undo_btn', function()
//  {
//      if (!!$('input[name=keywords]').val())
//      {
//          $('input[name=keywords]').val('');
//      }
//  });
//
//
//  $('body').on('click', 'input[name=check_all]', function()
//  {
//      var e = this;
//      if ($(e).prop('checked')===true)
//      {
//          $(':checkbox:not(input[name=check_all]):not(:checked)').prop('checked', true);
//      }
//      else
//      {
//          $(':checkbox:not(input[name=check_all])').prop('checked', false);
//
//      }
//  });
//
//  $('body').on('click', '.multi_del_btn', function ()
//  {
//      var ids = [];
//      $(':checkbox:checked').each(function ()
//      {
//          +$(this).val() && ids.push(+$(this).val());
//      });
//      if (ids.length===0)
//      {
//          layer_msg('您还没有选择需要删除的记录', 6, 1.5e3);
//          return false;
//      }
//      del(ids.join(','));
//  });
//
//  $('body').on('click', '.del_btn', function()
//  {
//      del($(this).attr('data-id'));
//  });
//
//  function del (ids)
//  {
//      return false;
//      del_refer_ajax('region.php?action=del',ids, function(data)
//      {
//          if (+data.state===9)
//          {
//              layer_msg(data.msg, 6, 1.5e3);
//              $('input[name=check_all]').prop('checked', false);
//              table.draw();
//          }
//          else
//          {
//              layer_msg(data.msg, 6, 1.5e3);
//          }
//      });
//  }
});

function ids_click ()
{
    // 这里可能会存在错误 $ is undefined
    $('input[name=check_all]').prop('checked') && $('input[name=check_all]').prop('checked', false);
}