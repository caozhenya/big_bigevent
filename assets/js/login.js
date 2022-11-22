$(function () {
    // 点击 去注册账号的连接
    $("#link_reg").click(function () {
        $(this).parent().hide();
        $(".reg-box").show();
    });
    // 点击 去登录的连接
    $("#link_login").click(function () {
        $(this).parent().hide();
        $(".login-box").show();
    });
});