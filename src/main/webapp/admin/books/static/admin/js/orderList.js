/**
 * Created by Sunny on 2018/5/4.
 */
$(document).ready(function () {
    $('.refresh_btn').on('click', reload);
    //查看订单详情
    $('.order-detail').on('click', function(){
        lay_iframe_fn({
            title: '查看订单详情',
            area: ['550px','590px'],
            content: 'html/order/orderListDetail.html',
            end: function(){

            }
        });
    });
    //修改用户信息
    $('.edit-order').on('click', function (){
        lay_iframe_fn({
            title: '修改订单信息',
            area: ['550px', '590px'],
            content: 'html/order/orderEdit.html',
            end: function (){
            }
        });
    });
});
