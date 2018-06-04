require(['config'],function(){
    require(['jquery','xZoom'],function(){
        $('#dp_header').load('../html/dp-header.html');
        $('#dp_footer').load('../html/dp_footer.html');
        jQuery(function($){
            var url=decodeURI(location.search.slice(1));
            var str=url.split('=');
            var id=str[1];
            $.ajax({
                url:'../api/dp_detail.php',
                data:{id:id},
                success:function(data){
                    data=JSON.parse(data);
                    get(data);
                    $('.xzoom-t').xZoom({
                        width:400,
                        height:400
                    })
                }
            })
            function get(data){
                    $('.xzoom-t img').attr('src','../img/'+data.img);
                    $('.xzoom-b li img').attr('src','../img/'+data.img);
                    $('.fangdajing').attr('src',data.img);
                    $('.title-t').html(data.title);
                    $('.pri span').html(data.price);
                    $('.action span').html(data.oldPrice);
                    $('.words').html(data.title)
            }
            //点击+数量加一
            $('.btnJia').click(function(){
                var num = $('#count').val()*1;
                num++;
                $('#count').val(num);
            })
            //点击-数量减一
            $('.btnJian').click(function(){
                var num = $('#count').val()*1;
                num--;
                $('#count').val(num);
                if($('#count').val()*1<=1){
                    $('#count').val(1);
                }
            })


            //点击按钮加入购物车
            $('.addCar').click(function(){
                var num = $('#count').val()*1;
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
            


            //请求热卖商品
            //
            $.ajax({
                url:'../api/goodslist.php',
                data:{type:'new'},
                success:function(data){
                    data=JSON.parse(data);
                    getHot(data);
                }
                
            })
            function getHot(data){
                let res=$.map(data,function(item){
                    return `<li data-id=${item.id}><a href="#">
                    <div class="pic"><img src="../img/${item.img}"></div>
                    <p class="title">${item.title}</p>
                    <div class="price">￥${item.price}</div> 
                    </a>
                    </li>`
                })
                $('.renqi').html(res);
            }
            
        })
    })
})