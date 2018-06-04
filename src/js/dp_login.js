require(['config'],function(){
    require(['jquery','common'],function(){
        jQuery(function($){
            $(".log-btn").click(function(){
                let userNum=$("#userNum").val();
                userNum=$.trim(userNum);
                let password=$("#password").val();
                password=$.trim(password);
                if(userNum.length==0){
                    $(".pwd").html("帐号不能为空");
                }else if(password.length==0){
                    $(".pwd").html("密码不能为空");
                }
                else{
                    $.ajax({
                    url:'../api/dp_login.php',
                    data:{
                        userNum:userNum,
                        password:password
                    },
                    success:function(data){
                        if(data==='fail'){
                            $(".pwd").html("用户名或密码错误");
                        }else{
                            location.href="../index.html";
                        }
                        
                    }
                   })
                }
            })
        })
    })
})
