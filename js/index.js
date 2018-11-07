$(function(){
  $.ajax({
    type:"GET",
    url:"data/data.json",
    success:function(msg){
      // 头部数据
      $(".header_top .logo").attr("src",msg.seller.avatar);
      $(".header_top .text .brand span").html(msg.seller.name);
      $(".header_top .text .timer").html(msg.seller.description + "/" + msg.seller.deliveryTime +"分钟送达");
      $(".header_top .text .discounts span").html(msg.seller.supports[0].description);
      $(".notic p").html(msg.seller.bulletin);

      //中间商品栏数据
      var oli = "";
      var divs = "";
      for(var i=0;i<msg.goods.length;i++){
        //左边导航栏数据
        if (i==0) {
          oli += "<li class='swiper-slide on'><span><a>" +"<img src='images/special_3@2x.png'>" + msg.goods[i].name + "</a></span></li>";
        }else if(i==1){
          oli += "<li class='swiper-slide'><span><a>" +"<img src='images/special_3@2x.png'>" + msg.goods[i].name + "</a></span></li>";
        }
        else{
          oli += "<li class='swiper-slide'><span>" + msg.goods[i].name + "</span></li>";
        };

        //右边食品栏的数据
        divs+="<div class='swiper-slide'>";
        divs+="<h4>"+msg.goods[i].name+"</h4>";
        for(var j = 0;j<msg.goods[i].foods.length;j++){
          divs+="<div class='preserved_egg'>";
          divs+="<img src="+msg.goods[i].foods[j].image+">";
          divs+="<div class='mx'>";
          divs+="<p class='txt_one'>"+msg.goods[i].foods[j].name+"</p>";
          //如果数据库中商品介绍不为空，则显示，否则不显示
          if (msg.goods[i].foods[j].description!="") {
            divs+="<p class='txt_two'>"+msg.goods[i].foods[j].description+"</p>";
          }
          divs+="<p class='txt_three'>"+"月售"+msg.goods[i].foods[j].sellCount+"份"+"&nbsp;&nbsp;"+"好评率"+msg.goods[i].foods[j].rating+"%"+"</p>";
          divs+="<p class='txt_four'>";
          //如果数据库中有原价格，就显示两个价格，否则只显示当前的价格
          if(msg.goods[i].foods[j].oldPrice != ""){
            divs+="<span class='price1'>"+"￥"+msg.goods[i].foods[j].price+"</span>";
            divs+="<span class='price2'>"+"￥"+msg.goods[i].foods[j].oldPrice+"</span>";
          }else{
            divs+="<span class='price1'>"+"￥"+msg.goods[i].foods[j].price+"</span>";
          }
          divs+="</p>";
          divs+="</div>";
          divs+="<p class='subtract'>"+"-"+"</p>";
          divs+="<p class='add'>"+"+"+"</p>";
          divs+="</div>";
        }
        divs+="</div>";
      }
      $(".gallery-left ul").append(oli);
      $(".gallery-thumbs .menu").append(divs);


      //评价页数据
      //判断几颗星的函数
      function star(score){
        var arr=[];
        var score1 = Math.floor(score*2)/2;
        var zhengshu = Math.floor(score1);
        var xiaoshu = score1 % 1 ==0;
        for(var i=0;i<zhengshu;i++){
          arr.push("star24_on@2x");
        }
        if(xiaoshu == false){
          arr.push("star24_half@2x");
        }
        while(arr.length<5){
          arr.push("star24_off@2x");
        }
        return arr;
      }
      // 调用星级函数，以此导入星星数据
      var f=star(4.1);
      var star_img="";
      for(var n=0;n<f.length;n++){
        star_img+=("<img src='images/"+f[n]+".png'>");
      };
      $(".starLevel .star_one .star_img").append(star_img);
      $(".starLevel .star_two .star_img").append(star_img);
      //评价页头部数据
      $(".ratings .grade .score_one").html(msg.seller.score);
      $(".ratings .grade .score_three").html("高于周边商家"+msg.seller.rankRate+"%");
      $(".ratings .starLevel .star_one .minute").html(msg.seller.serviceScore);
      $(".ratings .starLevel .star_two .minute").html(msg.seller.foodScore);
      $(".ratings .starLevel .star_three .minute").html(msg.seller.deliveryTime+"分钟");
      // 评价页网友评论数据
      var lists = "";
      for(var i=0;i<msg.ratings.length;i++){
        lists+="<div class='evaluate_txt'>";
        lists+="<a>";
        lists+="<img src="+msg.ratings[i].avatar+">";
        lists+="</a>";
        lists+="<div class='list'>";
        lists+="<p class='name'>";
        lists+="<span class='name_l'>"+msg.ratings[i].username+"</span>";
        lists+="<span class='name_r'>"+"2016-07-13 20:30"+"</span></p>";
        lists+="</p>";
        lists+="<p class='star'>";
        //网友点赞星级的数据
        var img = "";
        var scoreStar = star(msg.ratings[i].score);//调用上边的星级函数
        for(var j=0;j<5;j++){
          img+=("<img src='images/"+scoreStar[j]+".png'>"); //循环照片数组
        }
        lists+=img;
        if (msg.ratings[i].deliveryTime!="") {
          lists+="<span>"+msg.ratings[i].deliveryTime+"分钟送达"+"</span>";
        }
        lists+="</p>";
        lists+="<p class='text'>"+msg.ratings[i].text+"</p>";
        lists+="<ul class='label'>";
        //判断是赞还是踩
        if (msg.ratings[i].score>3) {
          lists+="<img src='images/zan.png'>";
        }else{
          lists+="<img src='images/cai.png'>";
        }
        //判断食物标签
        if (msg.ratings[i].recommend!="") {
          for (var j=0; j < msg.ratings[i].recommend.length; j++) {
            lists+="<li>"+msg.ratings[i].recommend[j]+"</li>";
          }
        }
        lists+="</ul>";
        lists+="</div>";
        lists+="</div>";
      }
      $(".evaluate_txt_f").html(lists);
      //评价栏中的网友所有评价点击事件
      $(".all a").html(msg.ratings.length);
      $(".evaluate_title .title_one .all").click(function(){
      var lists = "";
      for(var i=0;i<msg.ratings.length;i++){
        lists+="<div class='evaluate_txt'>";
        lists+="<a>";
        lists+="<img src="+msg.ratings[i].avatar+">";
        lists+="</a>";
        lists+="<div class='list'>";
        lists+="<p class='name'>";
        lists+="<span class='name_l'>"+msg.ratings[i].username+"</span>";
        lists+="<span class='name_r'>"+"2016-07-13 20:30"+"</span></p>";
        lists+="</p>";
        lists+="<p class='star'>";
        //网友点赞星级的数据
        var img = "";
        var scoreStar = star(msg.ratings[i].score);//调用上边的星级函数
        for(var j=0;j<5;j++){
          img+=("<img src='images/"+scoreStar[j]+".png'>"); //循环照片数组
        }
        lists+=img;
        if (msg.ratings[i].deliveryTime!="") {
          lists+="<span>"+msg.ratings[i].deliveryTime+"分钟送达"+"</span>";
        }
        lists+="</p>";
        lists+="<p class='text'>"+msg.ratings[i].text+"</p>";
        lists+="<ul class='label'>";
        //判断是赞还是踩
        if (msg.ratings[i].score>3) {
          lists+="<img src='images/zan.png'>";
        }else{
          lists+="<img src='images/cai.png'>";
        }
        //判断食物标签
        if (msg.ratings[i].recommend!="") {
          for (var j=0; j < msg.ratings[i].recommend.length; j++) {
            lists+="<li>"+msg.ratings[i].recommend[j]+"</li>";
          }
        }
        lists+="</ul>";
        lists+="</div>";
        lists+="</div>";
      };
      $(".evaluate_txt_f").html(lists);
      });
      //评价栏中的网友满意评价点击事件
      $(".evaluate_title .title_one .satisfaction").click(function(){
        $(this).addClass('on').siblings().removeClass("on");
        var lists = "";
        var l=0;
        for(var i=0;i<msg.ratings.length;i++){
          if(msg.ratings[i].rateType == 0){
            l++;
          lists+="<div class='evaluate_txt'>";
          lists+="<a>";
          lists+="<img src="+msg.ratings[i].avatar+">";
          lists+="</a>";
          lists+="<div class='list'>";
          lists+="<p class='name'>";
          lists+="<span class='name_l'>"+msg.ratings[i].username+"</span>";
          lists+="<span class='name_r'>"+"2016-07-13 20:30"+"</span></p>";
          lists+="</p>";
          lists+="<p class='star'>";
          //网友点赞星级的数据
          var img = "";
          var scoreStar = star(msg.ratings[i].score);//调用上边的星级函数
          for(var j=0;j<5;j++){
            img+=("<img src='images/"+scoreStar[j]+".png'>"); //循环照片数组
          }
          lists+=img;
          if (msg.ratings[i].deliveryTime!="") {
            lists+="<span>"+msg.ratings[i].deliveryTime+"分钟送达"+"</span>";
          }
          lists+="</p>";
          lists+="<p class='text'>"+msg.ratings[i].text+"</p>";
          lists+="<ul class='label'>";
          //判断是赞还是踩
          if (msg.ratings[i].score>3) {
            lists+="<img src='images/zan.png'>";
          }else{
            lists+="<img src='images/cai.png'>";
          }
          //判断食物标签
          if (msg.ratings[i].recommend!="") {
            for (var j=0; j < msg.ratings[i].recommend.length; j++) {
              lists+="<li>"+msg.ratings[i].recommend[j]+"</li>";
            }
          }
          lists+="</ul>";
          lists+="</div>";
          lists+="</div>";
        }
        }
        $(".evaluate_txt_f").html(lists);
        $(".satisfaction a").html(l);
      });
      //评价栏中的网友不满意评价点击事件
      $(".evaluate_title .title_one .discontent").click(function(){
      $(this).addClass('on').siblings().removeClass("on");
      var lists = "";
      var l=0;
      for(var i=0;i<msg.ratings.length;i++){
        if(msg.ratings[i].rateType == 1){
          l++;
        lists+="<div class='evaluate_txt'>";
        lists+="<a>";
        lists+="<img src="+msg.ratings[i].avatar+">";
        lists+="</a>";
        lists+="<div class='list'>";
        lists+="<p class='name'>";
        lists+="<span class='name_l'>"+msg.ratings[i].username+"</span>";
        lists+="<span class='name_r'>"+"2016-07-13 20:30"+"</span></p>";
        lists+="</p>";
        lists+="<p class='star'>";
        //网友点赞星级的数据
        var img = "";
        var scoreStar = star(msg.ratings[i].score);//调用上边的星级函数
        for(var j=0;j<5;j++){
          img+=("<img src='images/"+scoreStar[j]+".png'>"); //循环照片数组
        }
        lists+=img;
        if (msg.ratings[i].deliveryTime!="") {
          lists+="<span>"+msg.ratings[i].deliveryTime+"分钟送达"+"</span>";
        }
        lists+="</p>";
        lists+="<p class='text'>"+msg.ratings[i].text+"</p>";
        lists+="<ul class='label'>";
        //判断是赞还是踩
        if (msg.ratings[i].score>3) {
          lists+="<img src='images/zan.png'>";
        }else{
          lists+="<img src='images/cai.png'>";
        }
        //判断食物标签
        if (msg.ratings[i].recommend!="") {
          for (var j=0; j < msg.ratings[i].recommend.length; j++) {
            lists+="<li>"+msg.ratings[i].recommend[j]+"</li>";
          }
        }
        lists+="</ul>";
        lists+="</div>";
        lists+="</div>";
      }
      }
      $(".evaluate_txt_f").html(lists);
      $(".discontent a").html(l);
      })



      // 商家页数据导入
      $(".merchant_tit h3").html(msg.seller.name);
      var star_a = "";
      for(var m=0;m<f.length;m++){
        star_a += ("<img src='images/"+f[m]+".png'>");
      };
      $(".merchant_tit .title_img").append(star_a);
      $(".merchant_tit a").html("(661)月售&nbsp;&nbsp;&nbsp;"+msg.seller.sellCount+"单");
      $(".merchant_time .time_one p .count").html(msg.seller.minPrice);
      $(".merchant_time .time_two p .count").html(msg.seller.deliveryPrice);
      $(".merchant_time .time_three p .count").html(msg.seller.ratingCount);
      $(".declare .declare_txt").html(msg.seller.bulletin);
      $(".business .one span").html(msg.seller.supports[0].description);
      $(".business .two span").html(msg.seller.supports[1].description);
      $(".business .three span").html(msg.seller.supports[2].description);
      $(".business .four span").html(msg.seller.supports[3].description);
      $(".business .five span").html(msg.seller.supports[4].description);
      //循环商家实景图片
      var imgs = "";
      for(var i=0;i<msg.seller.pics.length;i++){
        imgs += "<div class='swiper-slide a'>"+"<img src="+msg.seller.pics[i]+">"+"</div>";
        $(".new_house .swiper-wrapper").html(imgs);
      };
      //循环商家信息
      var li = "";
      for(var i=0;i<msg.seller.infos.length;i++){
        li += "<p>"+msg.seller.infos[i]+"</p>";
        $(".information .invoice").html(li);
      }

      //优惠信息页数据导入
      $(".reduce_price .title h4").html(msg.seller.name);
      var star_b = "";
      for(var k=0;k<f.length;k++){
        star_b += ("<img src='images/"+f[k]+".png'>");
      };
      $(".reduce_price .title .xing").append(star_b);
      $(".youhui .lists_one span").html(msg.seller.supports[0].description);
      $(".youhui .lists_two span").html(msg.seller.supports[1].description);
      $(".youhui .lists_three span").html(msg.seller.supports[2].description);
      $(".youhui .lists_four span").html(msg.seller.supports[3].description);
      $(".youhui .lists_five span").html(msg.seller.supports[4].description);
      $(".reduce_price .reduce_price_txt").html(msg.seller.bulletin);

      //食物详情页面数据导入
      $(".preserved_egg img").click(function(){
        $(".shop_details").animate({left: '0'}, "slow");
        var x= $(this).parent().index()-1;//获取div的下标
        var y= $(this).parent().parent().index();

        $(".big_img .big_imgs").html("<img src="+msg.goods[y].foods[x].image+">")
        $(".foods_title .txt_one").html(msg.goods[y].foods[x].name);
        $(".foods_title .txt_three").html("月售"+msg.goods[y].foods[x].sellCount+"份&nbsp;&nbsp;"+"好评率"+msg.goods[y].foods[x].rating+"%");
        $(".foods_title .txt_four .price1").html("￥"+msg.goods[y].foods[x].price);
          if(msg.goods[y].foods[x].oldPrice != ""){
            $(".foods_title .txt_four .price2").html("￥"+msg.goods[y].foods[x].oldPrice);
          }
        $(".product_presentation_txt p").html(msg.goods[y].foods[x].info);
        var details="";
        for(var s = 0;s < msg.goods[y].foods[x].ratings.length;s++){
          details+="<div class='user-slide'>";
          details+="<div class='user'>";
          details+="<img src="+msg.goods[y].foods[x].ratings[s].avatar+">";
          details+="</div>";
          details+="<div class='user_name'>";
          details+="<p class='ju'>"+msg.goods[y].foods[x].ratings[s].username+"</p>";
          details+="<b>"+"2016-07-13 20:33"+"</b>"
          details+="<p class='user_name_txt'>"+msg.goods[y].foods[x].ratings[s].text+"</p>";
          details+="<p class='user_name_icon'>";
          if(msg.goods[y].foods[x].ratings[s].rateType!==0){
            details+="<span class='iconfont icon-cai'></span>";
          }else{
            details+="<span class='iconfont icon-dianzan1'></span>";
          }
          details+="</p>";
          details+="</div>"
          details+="</div>";
        }
        $(".user-slide_fus").html(details);
      })
      $(".shop_details_cha").click(function(){
        $(".shop_details").animate({left: '100%'}, "slow");
      })
     /* //点击加号，减号显示出来
      $(".add").click(function(){
        var y = $(this).parent().parent().index();
        var x = $(this).parent().index()-1;


        for(var s = 0;s < msg.goods[y].foods[x].ratings.length;s++){

          $(".preserved_egg .subtract").eq(s).animate({right: '50px'}, "slow");
        }
      })
      //点击减号，减号返回去
      $(".subtract").click(function(){
        $(this).animate({right: '0px'}, "slow");
      })
*/
    // 所有事件函数
      //左边菜单栏
      var galleryLeft = new Swiper('.gallery-left', {
        direction: 'vertical', //方向垂直
        slidesPerView: 'auto', //显示的数量
        freeMode:true,       //取消自动贴合
        autoHeight:true,
        slideToClickedSlide:true, //设置为true则点击slide会过渡到这个slide
        normalizeSlideIndex:false,//使活动块不指示最上边的slide
      });

      //右侧食物栏
      var galleryThumbs = new Swiper('.gallery-thumbs', {
        direction: 'vertical', //方向垂直
        slidesPerView: 'auto', //显示的数量
        freeMode:true,       //取消自动贴合
        autoHeight:true,
        on:{
          slideChange:function(){ //回调函数
            // var i = this.activeIndex;
            $(".gallery-left").find(".swiper-slide").eq(this.activeIndex). addClass('on').siblings().removeClass("on");
            galleryLeft.slideTo(this.activeIndex);
          },
        },
      });
      //给左边增加点击事件，和右边联动起来
      galleryLeft.on("click",function(){
        var i = this.activeIndex;
        $(".gallery-left").find(".swiper-slide").eq(i).addClass('on').siblings(). removeClass("on");
        galleryThumbs.slideTo(i);
      });



      //商品、商家、评价导航栏滑动效果
      var tabsSwiper = new Swiper("#tabs-container",{
        speed:500,
        on:{
          slideChangeTransitionStart:function(){
            $(".tabs .active").removeClass("active");
            $(".tabs span").eq(this.activeIndex).addClass('active');
          }
        }
      })
      $(".tabs span").on("click",function(e){
        e.preventDefault()
        $(".tabs .active").removeClass("active")
        $(this).addClass('active')
        tabsSwiper.slideTo($(this).index())
      });


      //商家实景滑动效果
      var new_house_swiper = new Swiper(".new_house",{
        slidesPerView: 'auto',
        freeMode:true,
      });

      // 公告栏和5个按钮点击事件
      $(".notic,.count").click(function(){
        $(".reduce_price").fadeIn();
        $(".reduce_price").css("display","flex");
        $(".reduce_price").css("z-index",5);
      })
      //点击关闭按钮
      $(".close").click(function(){
        $(".reduce_price").fadeOut();
      })

      // 商家栏爱心收藏按钮切换点击事件
      var toggle = true;
      $(".xin").click(function(){
        if(toggle){
          $(this).children("img").attr("src","images/xin.png");
          $(".merchant_tit .ysc").css("display","block");
          $(".merchant_tit .sc").css("display","none");
          toggle = false;
        }else{
          $(this).children("img").attr("src","images/huixin.png");
          $(".merchant_tit .ysc").css("display","none");
          $(".merchant_tit .sc").css("display","block");
          toggle = true;
        }
      });
    }
  })
})


    // //商品、商家、评价导航栏显示隐藏切换效果
      // $("nav span").click(function(){
      //   $(this).addClass('on').siblings().removeClass("on");
      //   $(".bd").children().eq($(  this).index()).css("display","").siblings().css("display","none");
      // });
