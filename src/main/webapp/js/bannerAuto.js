$(function(){
	
//	bannerAuto( $("#hotSell .hotSell_bottom .hotSell_tab a") , 
//	$("#hotSell .hotSell_bottom .hotSell_btn a") , 
//	$("#hotSell .hotSell_bottom .hotSell_Main .slide_wrap2 .slide_wrap2Content") , 
//	$("#hotSell .hotSell_bottom") , "click" ,
//	$("#hotSell .hotSell_bottom .hotSell_Main .slide_wrap2") , 2000 );
//	
//	bannerAuto( $(".hotSell_bottom .hotSell_tab a") , 
//	$(".hotSell_bottom .hotSell_btn") , 
//	$(".hotSell_bottom .hotSell_Main .slide_wrap2 .slide_wrap2Content .hotSell_content>ul") , 
//	$(".hotSell_bottom") , "click" ,
//	$(".hotSell_bottom .hotSell_Main .slide_wrap2") , 3000 );
	
	function bannerAuto( $tabA , $btnA , $wrapUl , $box , event , $w , T ){
		var index1 = 0;
		var nowDate = new Date();
		var timer = null;
		var W = $w.width();
			
		$tabA[event](function(){
			index1 = $(this).index();
			$(this).addClass("active").siblings().removeClass("active");
			$wrapUl.animate({"marginLeft":-W*(index1+1)},500);
		});

		$btnA.click(function(){
			if(	new Date() - nowDate > 600 ){
				nowDate = new Date();
				var n = $(this).index();
				n?index1++:index1--;

				play();
			}
		});
		
		$box.hover(function(){//鼠标移入
			clearInterval(timer);
		},function(){//鼠标移开
			timeAuto();
		});

		timeAuto();
		function timeAuto(){
			timer = setInterval(function(){
				index1++;
				play();
			},T);
		};

		function play(){
			var aindex = index1;
			if( aindex == $tabA.length){
				aindex = 0;
			}else if(aindex < 0){
				aindex = $tabA.length-1;
			}
			$tabA.eq(aindex).addClass("active").siblings().removeClass("active");
			
			$wrapUl.animate({"marginLeft":-W*(index1+1)},500,function(){
				if(index1 == $tabA.length){
					$wrapUl.css("marginLeft",-W+"px");
					index1 = 0
				}else if(index1 < 0){
					$wrapUl.css("marginLeft",-W*( $tabA.length )+"px");
					index1 = $tabA.length-1;
				}
			});
		}
	};
});
