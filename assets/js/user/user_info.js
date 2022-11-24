$(function () {
    const form = layui.form;
    const layer = layui.layer;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在1 - 6 个字符之间!'
            }
        }
    })
    initUserInfo();
    // 初始化用户的基本信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: `${window.parent.url}/my/userinfo`,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                // 调用form.val()快速为表单赋值

                // 第一个参数通过  lay-filter="formuserinfo"
                form.val('formuserinfo', res.data)
            }
        })
    }
    // 重置表单数据
    $('#reset').on('click', function (e) {
        // 阻止表单的默认重置行为
        e.preventDefault();
        initUserInfo();
    });
    // 监听表单的提交事🗡
    $('.layui-form').on('submit', function (e) {
        console.log($(this).serialize());
        // 阻止表单的默认提交行为
        e.preventDefault();
        // 发起ajax数据请求
        $.ajax({
            method: 'POST',
            url: `${window.parent.url}/my/userinfo`,
            data:$(this).serialize(), //快速拿到表单数据
            success: function (resp) {
                if (resp.status !== 0) {
                    return layer.msg('修改失败!')
                }
                layer.msg(resp.message)
                window.parent.getUserInfo();
            }
        })
    })

});