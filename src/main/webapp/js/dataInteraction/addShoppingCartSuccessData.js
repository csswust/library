/**
 * Created by Sunny on 2018/4/13.
 */
$(function () {
    var addShoppingCart = {
        bookId: "",
        addShoppingCartSuccess: function () {
            $.ajax({
                type: "GET",
                url: "/library/shoppingCart/selectById",
                dataType: "json",
                async: false,
                data:{
                    id: addShoppingCart.bookId
                },
                success: function (result) {
                    console.log(result);
                    $(".addShoppingCart_goodInfo").empty();
                    var addShoppingCartrander = template("addShoppingCartSuccess", result.bookInfo);
                    $(".addShoppingCart_goodInfo").append(addShoppingCartrander);
                }
            });
        }
    };

    var request = new urlSearch();
    addShoppingCart.bookId = request.id;
    addShoppingCart.addShoppingCartSuccess();
});
