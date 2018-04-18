$(function(){
	//全局的CheckBox选中和未选中的样式
	var $allCheckbox = $("input[type='checkbox']");//全局中所有的checkbox
	var $wholeCheckbox = $(".wholeCheck");
	var $myShoppingCart_box = $(".myShoppingCart_box");//获得每个订单的盒子
	var $orderChoice = $(".orderChoice");//每笔订单的checkbox
	var $sonCheck = $(".son_check");//获取每个订单下商品的checkbox
	
	$allCheckbox.click(function(){
		if($(this).is(':checked')){
			$(this).next('label').addClass('mark');
		}else{
			$(this).next('label').removeClass('mark');
		}
	});

	//设置全选与单选商品的函数
	$wholeCheckbox.click(function(){
		var $checkboxs = $myShoppingCart_box.find('input[type="checkbox"]');
		if($(this).is(':checked')){
			$checkboxs.prop("checked",true);
			$checkboxs.next('label').addClass("mark");
		}else{
			$checkboxs.prop("checked",false);
			$checkboxs.next('label').removeClass('mark');
		}
		totalMoney();
	});

	$sonCheck.each(function(){
		$(this).click(function(){
			//判断：所有单个商品是否勾选
			if($(this).is(':checked')){
				var len = $sonCheck.length;
				var num = 0;
				$sonCheck.each(function(){
					if($(this).is(':checked')){
						num++;
					}
				});
				if(num == len){
					$wholeCheckbox.prop("checked",true);
					$wholeCheckbox.next("label").addClass("mark");
				}
			}else{
				//单个商品取消勾选，全局全选取消勾选
				$wholeCheckbox.prop("checked",false);
				$wholeCheckbox.next("label").removeClass("mark");
			}
		});
	});
	
	//每个订单checkbox与全选checkbox的关系（每个订单与其下商品样式的变化）
	//订单有一个未选中，全局全选按钮取消勾选，若订单全选中，则全局全选按钮改变为选中状态
	$orderChoice.each(function(){
		$(this).click(function(){
			if($(this).is(":checked")){
				//判断：订单全选中，则全局全选按钮打勾
				var len = $orderChoice.length;
				var num = 0;
				$orderChoice.each(function(){
					if($(this).is(":checked")){
						num++;
					}
				});
				if(num == len){
					$wholeCheckbox.prop("checked",true);
					$wholeCheckbox.next("label").addClass("mark");
				}
				//订单下的checkbox选中状态
				$(this).parents('.myShoppingCart_box').find(".son_check").prop("checked",true);
				$(this).parents(".myShoppingCart_box").find(".son_check").next("label").addClass("mark");
			}else{
				//否则，全局全选按钮取消选中状态
				$wholeCheckbox.prop("checked",false);
				$wholeCheckbox.next("label").addClass("mark");

				//订单下的checkbox选中状态
				$(this).parents(".myShoppingCart_box").find(".son_check").prop("checked",false);
				$(this).parents(".myShoppingCart_box").find(".son_check").next("label").removeClass("mark");
			}
			totalMoney();
		});
	});
	
	//每个订单checkbox与其下商品的checkbox的关系
	//每个订单有一个sonCheck未选中，订单的全选按钮则取消选中，若全都选中，则全选是被选中的状态
	$myShoppingCart_box.each(function(){
		var $this = $(this);
		var $sonChecks = $this.find(".son_check");
		$sonChecks.each(function(){
			$(this).click(function(){
				if($(this).is(":checked")){
					//判断：如果所有的sonCheck都选中则订单的全选按钮为选中状态
					var len = $sonChecks.length;
					var num = 0;
					$sonChecks.each(function(){
						if($(this).is(":checked")){
							num++;
						}
					});
					if(num == len){
						$(this).parents(".myShoppingCart_box").find(".orderChoice").prop("checked",true);
						$(this).parents(".myShoppingCart_box").find(".orderChoice").next("label").addClass("mark");
					}
				}else{
					//否则，订单的全选取消
					$(this).parents(".myShoppingCart_box").find(".orderChoice").prop("checked",false);
					$(this).parents(".myShoppingCart_box").find(".orderChoice").next("label").removeClass("mark");
				}
				totalMoney();
			});
		});
	});
	
	
	//商品数量与之对应价格的改变
	var $plus = $(".plus");
	var $reduce = $(".reduce");
	var $all_sum = $(".sum");
	$plus.click(function(){
		var $inputVal = $(this).prev("input");
		var $count = parseInt($inputVal.val())+1;
		var $obj = $(this).parents(".amount_box").find(".reduce");
		var $priceTotalObj = $(this).parents(".myShoppingCart_orderList").find(".sum_price");
		var $price = $(this).parents(".myShoppingCart_orderList").find(".price").html();//获取单价
		var $priceTotal = $count*parseFloat($price.substring(1));
		$priceTotal = $priceTotal.toFixed(2);
		$inputVal.val($count);
		$priceTotalObj.html("¥"+$priceTotal);
		if($inputVal.val()>1 && $obj.hasClass("reSty")){
			$obj.removeClass("reSty");
		}
		totalMoney();
	});
	
	$reduce.click(function(){
		var $inputVal = $(this).next("input");
		var $count = parseInt($inputVal.val())-1;
		var $priceTotalObj = $(this).parents(".myShoppingCart_orderList").find(".sum_price");
		var $price = $(this).parents(".myShoppingCart_orderList").find(".price").html();//获取单价
		var $priceTotal = $count*parseFloat($price.substring(1));
		$priceTotal = $priceTotal.toFixed(2);
		if($inputVal.val()>1){
			$inputVal.val($count);
			$priceTotalObj.html("¥"+$priceTotal);
		}
		if($inputVal.val()==1 && !$(this).hasClass("reSty")){
			$(this).addClass("reSty");
		}
		totalMoney();
	});
	
	$all_sum.keyup(function(){
		var $count = 0;
		var $priceTotalObj = $(this).parents("myShoppingCart_orderList").find(".sum_price");
		var $price = $(this).parents(".myShoppingCart_orderList").find(".price").html();//获取单价
		var $priceTotal = 0;
		if($(this).val()==""){
			$(this).val("1");
		}
		$(this).val($(this).val().replace(/\D|^0/g,''));
		$count = $(this).val();
		$priceTotal = $count*parseInt($price.substring(1));
		$priceTotal = $priceTotal.toFixed(2);
		$(this).attr("value",$count);
		$priceTotalObj.html("¥"+$priceTotal);
		totalMoney();
	});
	
	//移除商品的操作
	// var $myShoppingCart_orderList = null;
	// var $order_content = "";
	// $(".delBtn").click(function(){
	// 	$myShoppingCart_orderList = $(this).parents(".myShoppingCart_orderList");
	// 	$order_content = $myShoppingCart_orderList.parents(".order_content");
	// 	$(".model_box").fadeIn(300);
	// 	$(".model_content").fadeIn(300);
	// });
	
	//关闭自定义模态框
	$(".closeModel").click(function(){
		closeM();
	});
	$(".dialog-close").click(function(){
		closeM();
	});
	function closeM(){
		$(".model_box").fadeOut(300);
		$(".model_content").fadeOut(300);
	};
	
	//点击确定后移除商品
	// $(".dialog-sure").click(function(){
	// 	$myShoppingCart_orderList.remove();
	// 	if($order_content.html().trim() == null || $order_content.html().trim().length == 0){
	// 		$order_content.parents(".myShoppingCart_box").remove();
	// 	}
	// 	closeM();
	// 	$sonCheck = $(".son_check");
	// 	totalMoney();
	// });
	
	//总计金额
	function totalMoney() {
        var total_money = 0;
        var total_count = 0;
        var calBtn = $('.calBtn a');
        $sonCheck.each(function () {
            if ($(this).is(':checked')) {
                var goods = parseFloat($(this).parents('.myShoppingCart_orderList').find('.sum_price').html().substring(1));
                var num =  parseInt($(this).parents('.myShoppingCart_orderList').find('.sum').val());
                total_money += goods;
                total_count += num;
            }
        });
        $('.total_text').html('￥'+total_money.toFixed(2));
        $('.piece_num').html(total_count);


        if(total_money!=0 && total_count!=0){
            if(!calBtn.hasClass('btn_sty')){
                calBtn.addClass('btn_sty');
            }
        }else{
            if(calBtn.hasClass('btn_sty')){
                calBtn.removeClass('btn_sty');
            }
        }
    };







});
