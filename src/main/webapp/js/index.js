$(function(){
	//导航
	(function(){
		var nav_Main = $(".topNav_mainRight>ul>li:nth-child(3)");
		var nav_Protuct = $(".topNav_mainRightMenu");
		nav_Main.hover(function(){
			nav_Protuct.css("display","block");
		},function(){
			nav_Protuct.css("display","none")
		});
		nav_Protuct.hover(function(){
			$(this).css("display","block");
		},function(){
			$(this).css("display","none");
		});
	})();
	
	
	//轮播图
	(function(){
		var $tabLi = $('.slide .tab>ul>li');
		var $picLi = $('.slide .slide_wrap>ul>li');
		var $btnDiv = $('.slide .btn');
		var $b_main = $('.slide');
		var index = 0;
		var timer;
		var length = $tabLi.length;
		$tabLi.hover(function(){
			$(this).addClass('click');
		},function(){
			$(this).removeClass('click');
		}).hover(function(){
			index = $(this).index();
			banner();
		});
		$btnDiv.hover(function(){
			$(this).addClass('click');
		},function(){
			$(this).removeClass('click');
		}).click(function(){
			var i = $(this).index();
			if ( i )
			{
				index ++;
				index %= length;
			}
			else
			{
				index --;
				if(index<0)index=length-1;
			}
			banner();
		});
		auto();
		$b_main.hover(function(){
			clearInterval( timer )
		},function(){
			auto();
		});

		function auto(){
			timer = setInterval(function(){
				index ++;
				index %= length;
				banner();
			},3000);
		}

		function banner(){
			$tabLi.eq(index).addClass('click').siblings().removeClass('click');
			$picLi.eq(index).stop(true).fadeIn().siblings().stop(true).fadeOut();
		}

	})();
	//二级导航部分
	(function(){
		var nav = $("#category .categoryLeft .categoryLeftTop>ul>li");
		nav.hover(function(){
			$(this).find(".navList").show();
		},function(){
			$(this).find(".navList").hide();
		});
	})();
	
	//商品列表
	(function(){
		//分页
		list3( $(".websiteRecommend_list>ul>li"),
		$(".websiteRecommend_list>ul>li .websiteRecommend_content"));
//		var goods_list = $(".goods_list>ul>li");
//		var goods_Main = $('.goods_Main');
		list4( $(".editorRecommendation .editorTop>ul>li"), 
		$(".editorRecommendation .editorTop>ul>li .editorContent"));
		
		list4( $(".bestSellListBottom .bestSellListBottom_list>ul>li"), 
		$(".bestSellListBottom .bestSellListBottom_list>ul>li .sellListContent"));
		
		book_list3( $(".childernBooks .bookMain_contentTop .bookMain_List>ul>li"),
		$(".childernBooks .bookMain_contentTop .bookMain_List>ul>li .bookMain_ListContent"));
		book_list4( $(".literaryBooks .bookMain_contentTop .bookMain_List>ul>li"), 
		$(".literaryBooks .bookMain_contentTop .bookMain_List>ul>li .bookMain_ListContent"));
		book_list5( $(".socialBooks .bookMain_contentTop .bookMain_List>ul>li"),
		$(".socialBooks .bookMain_contentTop .bookMain_List>ul>li .bookMain_ListContent"));
		art_list8( $("#bookMian .artBook .artBook_list>ul>li"),
		$("#bookMian .artBook .artBook_list>ul>li .artBook_listContent"));
		press_list10( $("#bookMian .pressBook .pressBook_left .pressBook_leftBottom>ul>li"),
		$("#bookMian .pressBook .pressBook_left .pressBook_leftBottom>ul>li .pressBook_content"));
		function list3( goods_list ,  goods_Main){
			goods_list.hover(function(){
				$(this).addClass('active').siblings().removeClass('active');
				var div = {};
				div = goods_Main;
				for(var i=0;i<3;i++){
					if(i==$(this).index()){/*当循环i=0的时候*/
						div.eq(i).show();
					}else{
						div.eq(i).hide();
					}
				}
			});
		};
		function book_list3( goods_list ,  goods_Main){
			goods_list.hover(function(){
				$(this).addClass('childernBooks_active').siblings().removeClass('childernBooks_active');
				var div = {};
				div = goods_Main;
				for(var i=0;i<3;i++){
					if(i==$(this).index()){/*当循环i=0的时候*/
						div.eq(i).show();
					}else{
						div.eq(i).hide();
					}
				}
			});
		};
		function list4( goods_list ,  goods_Main){
			goods_list.hover(function(){
				$(this).addClass('editorTop_active').siblings().removeClass('editorTop_active');
				var div = {};
				div = goods_Main;
				for(var i=0;i<4;i++){
					if(i==$(this).index()){/*当循环i=0的时候*/
						div.eq(i).show();
					}else{
						div.eq(i).hide();
					}
				}
			});
		};
		function book_list4( goods_list ,  goods_Main){
			goods_list.hover(function(){
				$(this).addClass('literaryBooks_active').siblings().removeClass('literaryBooks_active');
				var div = {};
				div = goods_Main;
				for(var i=0;i<4;i++){
					if(i==$(this).index()){/*当循环i=0的时候*/
						div.eq(i).show();
					}else{
						div.eq(i).hide();
					}
				}
			});
		};
		function list5( goods_list ,  goods_Main){
			goods_list.hover(function(){
				$(this).addClass('goods_active').siblings().removeClass('goods_active');
				var div = {};
				div = goods_Main;
				for(var i=0;i<5;i++){
					if(i==$(this).index()){/*当循环i=0的时候*/
						div.eq(i).show();
					}else{
						div.eq(i).hide();
					}
				}
			});
		};
		function book_list5( goods_list ,  goods_Main){
			goods_list.hover(function(){
				$(this).addClass('socialBooks_active').siblings().removeClass('socialBooks_active');
				var div = {};
				div = goods_Main;
				for(var i=0;i<5;i++){
					if(i==$(this).index()){/*当循环i=0的时候*/
						div.eq(i).show();
					}else{
						div.eq(i).hide();
					}
				}
			});
		};
		function art_list8( goods_list ,  goods_Main){
			goods_list.hover(function(){
				$(this).addClass('artBook_active').siblings().removeClass('artBook_active');
				var div = {};
				div = goods_Main;
				for(var i=0;i<8;i++){
					if(i==$(this).index()){/*当循环i=0的时候*/
						div.eq(i).show();
					}else{
						div.eq(i).hide();
					}
				}
			});
		};
		function press_list10( goods_list ,  goods_Main){
			goods_list.hover(function(){
				$(this).addClass('pressBook_active').siblings().removeClass('pressBook_active');
				var div = {};
				div = goods_Main;
				for(var i=0;i<10;i++){
					if(i==$(this).index()){/*当循环i=0的时候*/
						div.eq(i).show();
					}else{
						div.eq(i).hide();
					}
				}
			});
		};
	})();
	
	//内容
	(function(){
		var contentLi = $(".content .goods_bottom>ul>li");
		contentLi.hover(function(){
			$(this).find(".box_btn").show();
		},function(){
			$(this).find(".box_btn").hide();
		});
		
		var boxTab = $(".content .goods_bottom>ul>li>.box_tab>ul>li");
		var boxWrap = $(".content .goods_bottom>ul>li>.box_wrap");
		var boxLength = boxWrap.length;
		
		boxWrap.each(function(){
			this.a = 0;
		});
		boxTab.click(function(){
			var index = $(this).index();
			var pIndex = $(this).parent().parent().parent().index();
			boxWrap.eq(pIndex)[0].a = index;
			$(this).addClass('on').siblings().removeClass('on');
			boxWrap.eq(pIndex).stop(true).animate({
				marginLeft : -boxWrap.eq(pIndex)[0].a * 296 + 'px'
			},500);
		});
		
		var boxBtn = $(".content .goods_bottom>ul>li>.box_btn>div");
		boxBtn.click(function(){
			var i = $(this).index();
			var pIndex = $(this).parent().parent().index();
			if ( i )
			{
				if ( boxWrap.eq(pIndex)[0].a < boxLength-1 )
				{
					boxWrap.eq(pIndex)[0].a ++;
					
				}else
				{
					return;
				}
			}
			else
			{
				if (boxWrap.eq(pIndex)[0].a>0)
				{
					boxWrap.eq(pIndex)[0].a --;
				}
				else
				{
					return;
				}
			}
			$('.content .goods_bottom>ul>li>.box_tab').eq(pIndex).find('li').eq(boxWrap.eq(pIndex)[0].a).addClass('on').siblings().removeClass('on');
			boxWrap.eq(pIndex).stop(true).animate({
				marginLeft : -boxWrap.eq(pIndex)[0].a * 296 + 'px'
			},500);
		});
		
	})();

});
