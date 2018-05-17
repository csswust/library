/**
 * Created by Sunny on 2018/5/5.
 */
/**
 * Created by Sunny on 2018/5/5.
 */
/**
 * Created by Sunny on 2018/5/4.
 */
$(function () {
    var index = 1;
    var program = {
        page: 1,
        rows: 10,
        total: 0,
        bookId:0,
        bookName:"",
        bookIntroduction:"",
        searchBookInfoList: function () {
            $.ajax({
                type: "GET",
                url: "/library/bookInfo/selectByCondition",
                dataType: "json",
                async: false,
                data: {
                    title:program.bookName,
                    page: program.page,
                    rows: program.rows
                },
                success: function (result) {
                    program.total = result.data.total;
                    var html = "";
                    var bookInfoList = result.data.bookInfoList;
                    var secondClassifyList = result.data.secondClassifyList;
                    for (var i = 0; i < bookInfoList.length; i++) {
                        var bookInfo = bookInfoList[i];
                        bookInfo.index = index;
                        index += 1;
                        bookInfo.secondName = secondClassifyList[i].name;
                        bookInfo.editId = bookInfo.id;
                        bookInfo.deleteId = bookInfo.id;
                        html += template("bookList", bookInfo);
                    }
                    document.getElementById("content").innerHTML = html;
                    $(".del_btn").click(function () {
                        program.bookId = this.id;
                        program.deleteBookById();
                    });
                    $(".book-edit").click(function () {
                        window.location.href = "bookListEdit.html?id="+this.id;
                    });
                }

            });
        },
        deleteBookById: function () {
            $.ajax({
                type: "GET",
                url: "/library/bookInfo/deleteByIds",
                dataType: "json",
                async: false,
                data: {
                    ids:program.bookId+""
                },
                success: function (result) {
                    location.reload();
                }
            });
        }
    };

    program.searchBookInfoList();
    $(".search_btn").click(function () {
        program.page = 1;
        program.bookName = $("#keywords").val();
        program.searchBookInfoList();
    });
    $(function () {
        $('.M-box2').pagination({
            totalData: program.total,
            showData: program.row,
            coping: true,
            homePage: '<<',
            endPage: '>>',
            prevContent: '<',
            nextContent: '>',
            callback: function (api) {
                program.page = api.getCurrent();
                program.searchBookInfoList()
            }
        });
    });
});
