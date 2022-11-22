$(function () {
    // 点击 去注册账号的连接
    $("#link_reg").click(function () {
        $(".login-box").hide();
        $(".reg-box").show();
    });
    // 点击 去登录的连接
    $("#link_login").click(function () {
        $(".reg-box").hide();
        $(".login-box").show();
    });
    // layui中获取form对象
    var form = layui.form
    var layer = layui.layer
    var url = 'http://www.liulongbin.top:3007'
    // 通过form.verify函数自定义规则
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        //   校验两次密码是否一致的规则
        reowd: function (value) {
            // value拿到的是确认密码框中的内容
            // 拿到密码框中的内容
            var pwd = $(".reg-box [name=passwd]").val();
            if (pwd !== value) {
                layer.msg('密码不一致');
            }
        }
    })
    // 监听注册表单的点击事件
    $("#form_reg").submit(function (e) {
        // 阻止默认的提交行为
        e.preventDefault();
        var data = {
            username: $("#form_reg [name=username]").val(),
            password: $("#form_reg [name=passwd]").val(),
        }
        // 发起Ajax请求
        $.post(`${url}/api/reguser`, data, function (resp) {
            if (resp.status !== 0) {
                layer.msg(resp.message);
                $("#form_reg [name=username]").val("");
            }
            else {
                layer.msg(resp.message);
                // 模拟人点击取登录
                $("#link_login").click();
            }
        });
    })
});