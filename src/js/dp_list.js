require(['config'],function(){
    require(['jquery','common'],function(){
        $('#dp_header').load('../html/dp-header.html');
        $('#dp_footer').load('../html/dp_footer.html');
        jQuery(function($){
            $('.second').css('display','none');
            $('.nav-l').mouseover(function(){
                $('.second').show();
            })
            $('.nav-l').mouseout(function(){
                $('.second').css('display','none');
            })
            $('.nav-rb').css('display','none');
            $('.show').click(function(){
                $('ul').css('display','block');
                $('p').html('');
            })
            $('.hide').css('display','none');
            $('.dt').click(function(){
                $('.hide').toggle();
            })

            $('.hide1').css('display','none');
            $('.dt1').click(function(){
                $('.hide1').toggle();
            })

            $('.hide2').css('display','none');
            $('.dt2').click(function(){
                $('.hide2').toggle();
            })

            $('.hide3').css('display','none');
            $('.dt3').click(function(){
                $('.hide3').toggle();
            })

            $('.hide4').css('display','none');
            $('.dt4').click(function(){
                $('.hide4').toggle();
            })

            //发送ajax生成页码
            let qty=16; 
            $.ajax({
                url:'../api/list.php',
                success:function(data){
                    // console.log(data)
                    data=JSON.parse(data);
                    getPage(data);
                }
            })
            $.ajax({
                url:'../api/dp_list.php',
                data:{type:'list'},
                success:function(data){
                    data=JSON.parse(data);
                    console.log(data)
                    get(data);
                }
            })
            //封装页码函数
            function getPage(data){
                let page=Math.ceil(data/qty);
                for(let i = 0;i<page;i++){
                    let span=$('<span>');
                    span.addClass('num');
                    span.html((i+1));
                    if(i===0){
                        $(span).addClass('active');
                    }
                    $('.page').append(span);
                }
            }

            //点击页码切换页面
            $('.page').click(function(e){
                if(e.target.className==='num'){
                    let a =e.target.innerHTML;
                    $(e.target).addClass('active').siblings('.num').removeClass('active');
                    $.ajax({
                        url:'../api/dp_list.php',
                        data:{page:a},
                        success:function(data){
                            data=JSON.parse(data);
                            get(data);
                        }
                    })
                }
            })

            //生成页面结构
            function get(data){
                $('.please').html('');
                let res=$.map(data,function(item){
                    return `<li data-id=${item.id}>
                    <a href="#">
                    <div class="photo"><img src="../img/${item.img}"></div>
                    <div class="price"><h4>￥${item.price}</h4></div>
                    <div class="title"><p>${item.title}</p></div>
                    </a>
                    <button class="btnAdd">加入购物车</button>
                    <div class="pla">${item.place}</div>
                    </li>`
                });
                $('.please').html(res);

                //加入购物车
                $('.btnAdd').click(function(e){
                var num = 1;
                if(e.target.className==='btnAdd'){
                    var li=e.target.parentNode;
                    var id=$(li).attr('data-id');
                }
                $.ajax({
                    url:'../api/dp_detail.php',
                    data:{id:id},
                    success:function(data){
                        //点击显示弹窗
                        $('.a').show();
                        $('.b').show();
                        //点击隐藏弹窗
                        $('.contin').click(function(){
                            $('.a').hide();
                            $('.b').hide();
                        })
                         $('.span').click(function(){
                               $('.a').hide();
                            $('.b').hide(); 
                            })
                        data=JSON.parse(data);
                        let list=data;
                        $.ajax({
                            url:'../api/dp_car.php',
                            data:{
                                img:list.img,
                                id:list.id,
                                title:list.title,
                                place:list.place,
                                price:list.price,
                                oldPrice:list.oldPrice,
                                qty:num
                            }
                        })

                    }
                })
            })
            }
            //点击li生成url
            $('.please').click(function(e){
                if(e.target.tagName.toLowerCase()==='img'){
                    var li=e.target.parentNode.parentNode.parentNode;
                    var id=$(li).attr('data-id');
                    var  a=$('a');
                    a.attr('href','dp_details.html?id=' + id);
                }else if(e.target.className==='pic'||e.target.className==='title'){
                    var li=e.target.parentNode.parentNode;
                    console.log(li)
                    var id=$(li).attr('data-id');
                    console.log(id);
                    var a=$('a');
                    a.attr('href','dp_details.html?id='+id);
                }
            })
            //返回顶部的效果
            $(window).scroll(function(){
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
    })
})