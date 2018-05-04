$(document).ready(function (){
    $('.refresh_btn').on('click', reload);
    
    //添加一级分类
    $('.add-firstClassify').on('click', function(){
        lay_iframe_fn({
        	title: '添加一级分类',
        	area: ['550px','260px'],
        	content: 'html/classificationFirst/classificationListFirstAdd.html',
        	end: function(){
        		
        	}
        });
    });
    
    //编辑一级分类
    $('.edit-firstClassify').on('click', function(){
        lay_iframe_fn({
        	title: '添加一级分类',
        	area: ['550px','260px'],
        	content: 'html/classificationFirst/classificationListFirstEdit.html',
        	end: function(){
        		
        	}
        });
    });
    
    //添加二级分类
    $('.add-secondClassify').on('click', function(){
        lay_iframe_fn({
        	title: '添加二级分类',
        	area: ['550px','320px'],
        	content: 'html/classificationSecond/classificationListSecondAdd.html',
        	end: function(){
        		
        	}
        });
    });
    
    //编辑二级分类
    $('.edit-secondClassify').on('click', function(){
        lay_iframe_fn({
        	title: '添加二级分类',
        	area: ['550px','320px'],
        	content: 'html/classificationSecond/classificationListSecondEdit.html',
        	end: function(){
        		
        	}
        });
    });
//  var table_model =
//          {
//              tab_element_id:'#list',
//              data:book_discussion,
//              columns: [
//                  {
//                      data: "book_discussion_id",
//                      createdCell: function(cell, cellData, rowData, rowIndex, colIndex )
//                      {
//                          $(cell).attr('align','center');
//                          $(cell).html("<input type='checkbox' name='ids[]' value='"+cellData+"'>");
//                      }
//                  },
//                  {
//                      data:"book_discussion_id",
//                      createdCell: function(cell, cellData, rowData, rowIndex, colIndex )
//                      {
//                          $(cell).attr('align','center');
//                      }
//                  },
//                  {
//                      data:"book_discussion_reader",
//                      createdCell: function(cell, cellData, rowData, rowIndex, colIndex )
//                      {
//                          $(cell).attr('align','center');
//                      }
//                  },
//                  {
//                      data: "book_discussion_id",
//                      createdCell: function(cell, cellData, rowData, rowIndex, colIndex )
//                      {
//                          $(cell).attr('align','center');
//                          $(cell).html('<button class="btn-white btn-outline btn-xs details-control" title="查看下级分类"><i class="fa fa-eye"></i></button>&nbsp;&nbsp;<button class="btn-white btn-outline btn-xs" title="编辑"><i class="fa fa-edit"></i></button>&nbsp;&nbsp;<button class="btn-white btn-outline btn-xs" title="删除"><i class="fa fa-close"></i></button>');
//                      }
//                  }],
//              columnDefs: [
//                  {
//                      bSortable: false,
//                      aTargets: [0,3]
//                  }],
//              order: [[1,"asc"]],
//              formatFn: function(data)
//              {
//                  return '这里显示当前分类的下级分类？';
//              }
//          },
//      table_render = table_render_init('', table_model);
});