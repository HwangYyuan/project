require(['config'],function(){
    require(['jquery','common'],function(){
        $("#dp_header").load('html/dp-header.html');
        $("#dp_footer").load('html/dp_footer.html');
        jQuery(function($){
            //吸顶菜单
            $(window).scroll(function(){
                if($(window).scrollTop()>500){
                    $("#dp-header-fixed").css("display","block");
                    // $("#dp-header-fixed")
                }else{
                    $("#dp-header-fixed").css("display","none");
                }
            })
            //首页轮播图
            var img = $('.banner img');
            var page = $('.page span');
            var idx = 0;
            img[idx].style.opacity = '1';
            img[idx].style.zIndex = '32';
            var timer = setInterval(autoplay, 2000);
                    
            $('.banner').mouseover(function(event){
                clearInterval(timer);
                if(event.target.tagName.toLowerCase()=="span"){
                    var index = $('.page span').index(event.target);
                    idx = index;
                    for(var j=0;j<page.length;j++){
                        see(j,index);
                    }
                }
            });
            $('.banner').mouseout(()=>{
                timer = setInterval(autoplay, 2000);
            })
            function autoplay(){
                idx++;
                comout();
            }
            function comout(){
                if(idx>img.length-1){
                    idx = 0;
                }
                for(var i = 0;i<page.length;i++){
                    see(i,idx);
                }
            }
            function see(i,index){
                if(i==index){
                    page[i].style.backgroundColor = '#fff';
                    img[i].style.opacity = '1';
                    img[i].style.transition = 'opacity 2s'
                    img[i].style.zIndex = '30';
                }
                else{
                    page[i].style.backgroundColor='';
                    img[i].style.opacity = '0';
                    img[i].style.transition = 'opacity 2s'
                    img[i].style.zIndex = '30';
                }
            }

                $(window).scroll(function(){
                    //数据请求list-l的商品
                $.ajax({
                url:"../api/index.php",
                type:'get',
                dataType:'json',
                data:{type:'a'},
                success:function(data){

                    let res='';
                    $.each(data,function(index,item){
                        res+=`<li data-id=${item.id}><a href="#"><img src="../img/${item.img}"><p>${item.title}</p><span>${item.price}</span><span>${item.oldPrice}</span><h5><i></i>${item.place}</h5></a></li>`
                    })
                    $(".list-l").html(res);
                }  
            })
                    $.ajax({
                    url:"../api/goodslist.php",
                    data:{type:'discount'},
                    type:'get',
                    dataType:'json',
                    success:function(data){
                        let str='';
                        $.each(data,function(index,item){
                            str+=`<li data-id=${item.id}><a href="#"><img src="../img/${item.img}"><p>${item.title}</p><span>${item.price}</span><span>${item.oldPrice}</span></a></li>`
                        })
                        $(".mer-b").html(str);
                    }
                })
                $.ajax({
                    url:"../api/goodslist.php",
                    data:{type:'baby'},
                    type:'get',
                    dataType:'json',
                    success:function(data){
                        let res='';
                        $.each(data,function(index,item){
                            res+=`<li><a href="#"><img src="../img/${item.img}"><p>${item.title}</p><span>${item.price}</span><span>${item.oldPrice}</span></a></li>`
                        })
                        $(".wrap-cb").html(res);
                        $(".wrap-co").html(res);
                        $(".wrap-cf").html(res);
                        $(".wrap-ce").html(res);
                        $(".wrap-ch").html(res);
                        $(".wrap-cp").html(res);
                    }
                })   
            })
              //小轮播图
            //给ul添加第一张照片
            
        let turn=$('.turn');
        let big=$('.big');
        let ul=$('.curosul');
        let dot=$('.dot');
        let g=ul.length;
        let span=$('.dot span')
        
        
        //计算ul的宽度
        // big.style.width=turn.clientWidth*len+'px';
        function cul(turn,big,ul,g,span){
        let r=parseInt($('.turn').css("width"))*g+'px';
        // console.log(r);
        big.css("width",r);
        let index=0;

        setInterval(autoPlay,3000);
        function git(){console.log(00)
               if(index>=g){
                //无缝滚动的关键，在完成复制图片后瞬间回到初始状态
                    // big.style.left=0;
                    big.css("left",0);
                    index=1;
                }else if(index<0){
                    big.style.left=-parseInt($('.turn').css("width"))*(g-1)+'px';
                    // big.css({"left":})
                    console.log(parseInt($('.turn').css("width"))*(g-1))
                    index=g-2;
                }
                let target=-index*parseInt($('.turn').css("width"));
                console.log(target)
                big.animate({left:target})
                for(let i = 0;i<g-1;i++){
                    //高亮页码
                    if(i===index%(g-1)){
                       span[i].style.backgroundColor='#333'; 
                    }else{
                        span[i].style.backgroundColor='';
                    }
                }
            }   
        
        function autoPlay(){
            index++;
            git();
          }   
        }
        cul(turn,big,ul,g,span);
        //health的轮播图
        let turn1=$('.turn1');
        let big1=$('.big1');
        let ul1=$('.curosul1');
        let dot1=$('.dot1');
        let g1=ul1.length;
        let span1=$('.dot1 span');
        cul(turn1,big1,ul1,g1,span1);
          //beauty的轮播图
        let turn2=$('.turn2');
        let big2=$('.big2');
        let ul2=$('.curosul2');
        let dot2=$('.dot2');
        let g2=ul2.length;
        let span2=$('.dot2 span');
        cul(turn2,big2,ul2,g2,span2); 
        //person的轮播图
        let turn3=$('.turn3');
        let big3=$('.big3');
        let ul3=$('.curosul3');
        let dot3=$('.dot3');
        let g3=ul3.length;
        let span3=$('.dot3 span');
        cul(turn3,big3,ul3,g3,span3);
        //home的轮播图
        let turn4=$('.turn4');
        let big4=$('.big4');
        let ul4=$('.curosul4');
        let dot4=$('.dot4');
        let g4=ul4.length;
        let span4=$('.dot4 span');
        cul(turn4,big4,ul4,g4,span4);
        //food的轮播图
        let turn5=$('.turn5');
        let big5=$('.big5');
        let ul5=$('.curosul5');
        let dot5=$('.dot5');
        let g5=ul5.length;
        let span5=$('.dot5 span');
        cul(turn5,big5,ul5,g5,span5);
        //晒单轮播图
        let say=$('.say');
        let word=$('.word');
        let nor=$('.nor');
        let leng=nor.length;
        let r=parseInt($('.say').css("width"))*g+'px';
        console.log(r);
        word.css("width",r);
        let index=0;

        setInterval(autoPlay,3000);
        function git(){console.log(00)
               if(index>=g){
                //无缝滚动的关键，在完成复制图片后瞬间回到初始状态
                    // big.style.left=0;
                    word.css("left",0);
                    index=1;
                }else if(index<0){
                    word.style.left=-parseInt($('.turn').css("width"))*(g-1)+'px';
                    // big.css({"left":})
                    
                    index=g-2;
                }
                let target=-index*parseInt($('.say').css("width"));
                console.log(target)
                word.animate({left:target})
              
            }   
        
        function autoPlay(){
            index++;
            git();
          }  
          //返回顶部
          $(window).scroll(function(){
                console.log(88)
                if($(window).scrollTop()>500){
                    $('.fix').css('display','block');
                }else{
                    $('.fix').css('display','none');
                }
            })
          $('.fix').click(function(){
                $('html,body').animate({scrollTop:0},300);
            })
          //购物车数量
          $.ajax({
            url:'../api/car.php',
            success:function(data){
                data=JSON.parse(data);
                $('.wrap b').html(data.length);
            }
          })
        })
    })//第二个require
})//第一个require
    
