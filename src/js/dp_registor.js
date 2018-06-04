require(["config"],function(){
    require(["jquery","common"],function(){
        jQuery(function($){
            //验证手机号
            $("#phone").focusout(function(){
                let phone=$("#phone").val();
                phone=$.trim(phone);
                if(phone.length == 0 ||!(/^1[3,8]\d{9}$/g.test(phone))){
                    $(".num").addClass("error").html("手机号格式不正确");
                    return false;
                }else{
                    $(".num").removeClass("error").html("");
                }
            })
            //验证密码
            $("#pwd").focusout(function(){
                let pwd=$("#pwd").val();
                pwd=$.trim(pwd);
                if(pwd.length==0||!(/^[\w\-]{6,16}$/i.test(pwd))){
                    $(".mima").addClass("error").html("密码格式不正确");
                    return false;
                }else{
                    $(".mima").removeClass("error").html("");
                }
            })
            //验证确认密码
            $("#pwdAgain").focusout(function(){
                let pwd=$("#pwd").val();
                pwd=$.trim(pwd);
                let pwdAgain=$("#pwdAgain").val();
                pwdAgain=$.trim(pwdAgain);
                if(pwdAgain.length==0||pwdAgain!=pwd){
                    $(".queren").addClass("error").html("两次密码不一致");
                    return false;
                }else{
                    $(".queren").removeClass("error").html("");
                }
            })
            //生成验证码
            var randomLetter=randomLetterNum();
            $(".yanma").html(randomLetter);
            $(".yanma").click(function(){
                var randomLetter=randomLetterNum();
            $(".yanma").html(randomLetter);
            })
            //校验验证码
            $("#sure").focusout(function(){
                let randomCode=$(".yanma").html();
                randomCode=$.trim(randomCode);
                let sure=$("#sure").val();
                sure=$.trim(sure);
                if(sure.length==0||sure!=randomCode){
                    $(".yanzhengma").addClass("error").html("验证码错误，请重新获取");
                    return false;
                }else{
                    $(".yanzhengma").removeClass("error").html("");
                }
            });
            //点击提交注册信息
            $(".btn").click(function(){
                var _phone=$("#phone").val();
                phone=$.trim(phone);
                var _pwd=$("#pwd").val();
                pwd=$.trim(pwd);
                let pwdAgain=$("#pwdAgain").val();
                pwdAgain=$.trim(pwdAgain);
                var randomCode=$(".yanma").html();
                randomCode=$.trim(randomCode);
                var sure=$("#sure").val();
                sure=$.trim(sure);
                if(_phone.length===0||_pwd.length===0||pwdAgain===0||_pwd!=pwdAgain||sure!=randomCode){
                   alert("注册信息错误，请重新填写");
                }else{
                    $.ajax({
                        url:"../api/dp_registor.php",
                        data:{
                            phone:_phone,
                            password:_pwd
                        },
                        success:function(data){
                            location.href="../index.html"
                        }
                    })
                }
            })
        })
    })//第二个require
})//第一个require