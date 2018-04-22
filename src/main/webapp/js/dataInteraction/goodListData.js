/**
 * Created by Sunny on 2018/4/6.
 */
$(function () {
    var program = {
        book_id: "",
        book_image: "",
        book_title: "",
        book_author: "",
        book_date: "",
        book_press: "",
        book_money: "",
        book_price: "",
        book_spcial: "",
        page: "1",
        row: 13,
        bookInfoList: [],
        bookList: function () {
            $.ajax({
                type: "GET",
                url: "/library/bookInfo/selectByCondition",
                dataType: "json",
                async: false,
                data: {
                    sTitle: program.stitle,
                    sAuthor: program.sauthor,
                    sPress: program.spress,
                    isbn: program.sIsbn,
                    page: program.page,
                    rows: program.row
                },
                success: function (result) {
                    console.log(result);
                    program.count = result.data.total;
                    var list = result.data.bookInfoList;

                    $(".goodList_leftContent").empty();
                    for(var i = 0; i < list.length; i++){
                        list[i].pressTime=list[i].pressTime.split(" ")[0];//获取日期的年、月、日
                        var rander = template("getcontent", list[i]);
                        $(".goodList_leftContent").append(rander);
                    }
                    $(".addShoppingCart").click(function () {
                        var bookListId = this.name;
                        addShoppingCart.addShoppingCart_success(bookListId);
                    });
                }
            });
        }
    };
    var request = new urlSearch();//实例化
    //高级搜索部分
    program.stitle = request.title;
    program.sauthor = request.author;
    program.spress = request.press;
    program.sIsbn = request.ISBN;

    //商品详情页面搜索框
    program.stitle = request.goodDetail_title;
    //首页搜索框
    program.stitle = request.index_title;

    program.bookList();
    $(function () {
        $('.M-box2').pagination({
            coping: true,
            homePage: '首页',
            endPage: '末页',
            prevContent: '上页',
            nextContent: '下页',
            callback:function(api){
                program.page =api.getCurrent();
                program.bookList()
            }
        });
    });
    $("#searchButton").click(function () {
        program.stitle = $("#keyword").val();
        program.bookList();
    });

    //添加购物车
    var addShoppingCart = {
        book_number: "1",
        addShoppingCart_success: function (bookListId) {
            $.ajax({
                type: "POST",
                url: "/library/shoppingCart/insertOne",
                dataType: "json",
                async: false,
                data:{
                    bookId: bookListId,
                    number: addShoppingCart.book_number
                },
                success: function (result) {
                    console.log(result);
                    if(result.status == 1){
                        window.location.href = "../ShoppingCart/addShoppingCart_success.html?id="+ result.id;
                    }
                }
            });
        }
    };

});