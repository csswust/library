/**
 * Created by Sunny on 2018/4/18.
 */
$(function () {
    var shoppingCart = {
        book_id: "",
        book_img: "",
        book_title: "",
        book_money: "",
        book_price: "",
        count: "",
        myShoppingCart: function () {
            $.ajax({
                type: "GET",
                url: "/library/shoppingCart/selectByCondition",
                dataType: "json",
                async: false,
                data:{
                    bookId: shoppingCart.book_id,
                    number: shoppingCart.count
                },
                success: function (result) {
                    console.log(result);
                    shoppingCart.count = result.total;
                    var shoppingCartList = result.list;
                    var bookList = result.bookInfoList;

                    var html="";
                    for(var i = 0; i < bookList.length; i++) {
                        bookList[i].list_id = shoppingCartList[i].id;
                        // console.log(bookList[i].list_id);
                        bookList[i].reduceShoppingCartId = shoppingCartList[i].id;
                        bookList[i].addShoppingCartId = shoppingCartList[i].id;
                        bookList[i].number = result.list[i].number;
                        bookList[i].sumCount = bookList[i].number * bookList[i].money;
                        html+= template("myShoppingCart_content", bookList[i]);
                    }
                    document.getElementById("content").innerHTML = html;
                }
            });
        }
    };
    var request = new urlSearch();
    shoppingCart.book_id = request.id;
    shoppingCart.myShoppingCart();

    var postShoppingCart = {
        id: "",
        book_id: "",
        book_img: "",
        book_title: "",
        book_money: "",
        book_price: "",
        count: "",
        shoppingCartData: function () {
            $.ajax({
                type: "POST",
                url: "/library/shoppingCart/updateById",
                dataType: "json",
                async: false,
                data:{
                    id: postShoppingCart.id,
                    number: postShoppingCart.count
                },
                success: function (result) {
                    console.log(result);
                }
            });
        }
    }
    $(".reduce").click(function () {
        postShoppingCart.id = this.id;
        postShoppingCart.count = $(".yyyyyy"+postShoppingCart.id).val()-1;
        postShoppingCart.shoppingCartData();
    });
    $(".plus").click(function () {
        postShoppingCart.id = this.id;
        postShoppingCart.count = $(".yyyyyy"+postShoppingCart.id).val()+1;
        postShoppingCart.shoppingCartData();
    });
    
    var deleteShoppingCart = {
        id:"",
        goodstatus: "",
        deleteShoppingCartGood: function () {
            $.ajax({
                type: "POST",
                url: "/library/shoppingCart/deleteByIds",
                dataType: "json",
                async: false,
                data:{
                    ids: deleteShoppingCart.id
                },
                success: function (result) {
                    console.log(result);
                    if(result.status != 0){
                        // document.getElementById("dialogs").innerHTML='<h3>删除成功！</h3>';
                        // dialog();
                        alert(1);
                    }
                },
                error:function () {
                    alert(1111111);
                }
            });
        }
    }
    $(".delBtn").click(function () {
        $(".model_box").fadeIn(300);
        $(".model_content").fadeIn(300);
        deleteShoppingCart.id = this.id.split("-")[1];
    });
    $("body").on("click",".sure",function () {
        deleteShoppingCart.deleteShoppingCartGood();
        $(".model_box").fadeOut(300);
        $(".model_content").fadeOut(300);
    });


    var createOrder = {
        id:"",
        arr:"",
        createOrderList: function () {
            $.ajax({
                type: "POST",
                url: "/library/bookOrder/createOrder",
                dataType: "json",
                async: false,
                data:{
                    ids: createOrder.arr
                },
                success: function (result) {
                    if(result.status == -1){
                        alert(result.desc);
                    }else if(result.status == 1){
                        alert(result.desc);
                        window.location.href = "writeAddress.html?createOrderId=" + result.data.orderId;
                    }
                },
                error:function () {
                    alert(1111111);
                }
            });
        }
    }

    $(".calBtn").click(function () {
        obj = document.getElementsByClassName("son_check");
        check_val = [];
        for(k in obj){
            if(obj[k].checked){
                check_val.push(obj[k].id);
            }
        }
        // alert(check_val);
        // console.log(check_val);
        createOrder.arr = check_val.join(",");
        console.log(check_val);
        createOrder.createOrderList();
    });
});
