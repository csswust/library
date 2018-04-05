$(function(){
	
	(function(){
		$(".goodDetail_nav>ul>li").click(function(){
            $(".goodDetail_nav>ul>li").removeClass("click");
            $(".goodDetail_nav>ul>li>a").css("color","#3B3B3B");
			$(this).addClass("click");
			$(this).children("a").css("color","white");
		});
	})();
});
