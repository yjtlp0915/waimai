//获取不同型号手机屏幕的高度
//初始化页面高度
function starHeight(){
  var sh = $(window).height() - $("header").outerHeight() - $(".tabs").outerHeight()-$("footer").outerHeight()+"px";
    //获取食物栏高度使其在此区域内滚动
    $(".goods").css("height",sh);
    //获取屏幕中间区域高度，目的是适应各种型号
    $("#tabs-container").css("height",sh);
    $(".ratings").css("height",sh);
    $(".business").css("height",sh);

}
starHeight();
//实时监听更改页面高度
$(window).resize(function(){
  starHeight();
});