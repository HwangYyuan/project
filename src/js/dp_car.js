require(['config'],function(){
    require(['jquery'],function(){
        $('#dp_footer').load('../html/dp_footer.html');
        jQuery(function($){
            $.ajax({
                url:'../api/car.php',
                success:function(data){
                    console.log(data)
                    data=JSON.parse(data);
                        fun(data);
                        
                        var btnAdd = $('.btnJia');
                        var btnReduce = $('.btnJian');
                        var caozuo = $('.caozuo');
                        del(caozuo);
                        add(btnAdd);
                        reduce(btnReduce);
                    }
                    
                
            })


            function fun(data){
                var arr = [];
                let all=$.map(data,function(item){
                    var sum = item.qty * item.price;
                    arr[arr.length] = sum;
                    allcount(arr);
                    return `              
                 <li data-id=${item.id}>
                    <div class="li-t">
                        <b class="place">${item.place}</b>
                        <b>荷兰直邮</b>
                    </div>
                    <div class="li-c clearfix">
                        <div class="photo fl">
                            <img src="../img/${item.img}" alt="" width="78" height="78"/>
                        </div>
                        <div class="biaoti fl">
                            <p>${item.title}</p>
                        </div>
                        <div class="height fl">460g</div>
                        <div class="yuan fl">${item.price}</div>
                        <div class="shul fl">
                            <div class="num">
                                <b class="btnJian">-</b>
                                <input type="text" value="${item.qty}" id="count"/>
                                <b class="btnJia">+</b>
                            </div>
                        </div>
                        <div class="xiaoji fl">
                          ${sum}
                      </div>
                      <div class="caozuo fr">
                        删除
                    </div>
                </div>
                <div class="li-b">
                    <p>商品金额合计：<b class="mony">￥${sum}</b>重量：460g&nbsp;&nbsp;&nbsp;运费：￥35 <i>关税：￥44（商家承担）</i></p>
                </div>
            </li>`
                })
            $('.item-b').html(all)
            $('.allgoods b').html(data.length)
            }
            //点击-按钮更新数据库中的数据
            function reduce(ele){
                ele.click(function(e){
                    var price = $(e.target).parent().parent().prev().html()*1;
                    var span = $(e.target).parent().parent().next().find();
                    // console.log(span)
                    var data = $(e.target).next().val();
                    console.log(data)
                    var id = $(e.target).parent().parent().parent().parent().attr('data-id');
                    if(data<=1){
                        $(e.target).next().val(1);
                        var total = data*price;
                        // console.log(total)
                        span.html(total)
                    }else{
                        data--;
                        $(e.target).next().val(data);
                        var number=$(e.target).next().val();
                        var xiaoji = price*number;
                        $(e.target).parent().parent().parent().next().children().children().first().html(xiaoji);
                        $(e.target).parent().parent().next().html(xiaoji);
                        var total = data*price;

                        // console.log(total)
                        span.html(total);
                        var zongjia = ($('.total').html()*1)-(price);
                        // console.log(zongjia)
                        $('.total').html('');
                        $('.total').html(zongjia);
                        $('b.toggle').html(zongjia);
                        $.ajax({
                            url:'../api/car.php',
                            data:{qty:data,type:'reduce',id:id}
                        })
                    }
                 })
                

            }
            //点击+按钮更新数据库中的数据
            function add(ele){
                ele.click(function(e){
                    var price = $(e.target).parent().parent().prev().html()*1;
                    // console.log(price)
                    var span =$(e.target).parent().parent().next().find();
                    var data = $(e.target).prev().val();
                    // console.log(data)
                    data++;
                   $(e.target).prev().val(data);
                   var number=$(e.target).prev().val();
                   var xiaoji = price*number;
                   $(e.target).parent().parent().parent().next().children().children().first().html(xiaoji);
                   $(e.target).parent().parent().next().html(xiaoji);
                   var id = $(e.target).parent().parent().parent().parent().attr('data-id');

                   var total = data*price;
                  // console.log(total)
                   var zongjia = ($('.total').html()*1)+(price)
                   $('.total').html('');
                   $('.total').html(zongjia);
                   $('b.toggle').html(zongjia);

                  span.html(total);
                   $.ajax({
                        url:'../api/car.php',
                        data:{qty:data,type:'add',id:id}
                   })
                })
            }
                //点击删除从数据库中删除整个商品信息
                function del(ele){
                    ele.click(function(e){console.log(333)
                        var id=$(e.target).parent().parent().attr('data-id');
                        console.log(id)
                        var all=$(e.target).prev().html()*1;
                        var zongjia=($('.total').html()*1)-all;
                        $('.total').html(zongjia);
                        $('b.toggle').html(zongjia);
                        $.ajax({
                            url:'../api/car.php',
                            data:{
                                id:id,
                                type:"delete"
                            },
                            success:function(data){
                                data=JSON.parse(data)
                                $(e.target).parent().parent().remove();
                                $('.allgoods b').html(data.length);
                            }
                        })
                    })
                }
            function allcount(str){
                var sum = 0;
                for(var i = 0; i < str.length; i++){
                    sum+=str[i];
                }
                $('.total').html(sum);
                // console.log(str);
            }
        })
    })
})