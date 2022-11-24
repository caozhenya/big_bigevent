// 每次调用 $.get 或 $.post() $.ajax() 的时候会自动调用这个方法
$.ajaxPrefilter(function (options) {
    // console.log(options);
    // options.url = ''
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ""
        }
    }
    // 全局统一挂载 complete回调函数
    options.complete = function (resp) {
        // 在该函数中 可以使用resp.responseJSON 拿到服务器响应回来的数据
        // resp.responseJSON
        if (resp.responseJSON.message === "身份认证失败！" && resp.responseJSON.status === 1) {
            // 1.强制清空token
            localStorage.removeItem('token');
            // 2.强制跳转到登录页面
            location.href = './login.html'

        }
    }
})