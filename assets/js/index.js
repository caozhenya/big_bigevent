var url = 'http://www.liulongbin.top:3007'
$(function () {
    getUserInfo();
    // 点击按钮实现点击退出功能
    $('#btnlogout').on('click', function () {
        // 提示用户是否确认退出
        layui.layer.confirm('是否退出?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            // 1.清空本地存储中的token
            localStorage.removeItem('token');
            // 2.重新跳转到登录首页
            location.href = './login.html'
            // 关闭询问框
            layui.layer.close(index)
        });
    });
});

// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'get',
        url: `${url}/my/userinfo`,
        // 请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ""
        // },
        success: function (resp) {
            if (resp.status !== 0) {
                return layui.layer.msg('获取用户信息失败!')
            }
            // 调用renderAvatar 渲染用户的头像
            renderAvatar(resp.data);
        }
    })
};
// 渲染用户的头像
function renderAvatar(user) {
    // 1.获取用户名称
    var name = user.nickname || user.username;
    // 2.设置欢迎的文本
    $("#welcome").html('欢迎&nbsp;&nbsp;' + name);
    // 3.按需渲染用户的头像
    if (user.user_pic !== null) {
        // 渲染图片头像
        $(".layui-nav-img").attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        // 渲染文本头像
        $(".layui-nav-img").hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }

}
