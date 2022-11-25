$(function () {
    var layer = layui.layer
    $.ajax({
        method: 'GET',
        url: `${window.parent.url}/my/userinfo`,
        success: function (resp) {
            if (resp.status !== 0) {
                return layer.msg('获取用户信息失败!');
            }
            var pic = resp.data.user_pic;
            console.log('成功了');
            // $("#image").prop('src',pic)
            $('#image').css('src', pic)
        }

    })
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)
    // 为上传按钮绑定点击事件
    $('#btn').on('click', function () {
        $('#file').click()
    })
    //  为文件选择框绑定change事件
    $('#file').on('change', function (e) {
        // 获取用户选择的文件
        var filelist = e.target.files
        if (filelist.length === 0) {
            return layer.msg('请选择一张照片')
        }
        // 拿到用户选择的文件
        var file = filelist[0];
        // 将上传的文件转化为路径 url
        var newImgURL = URL.createObjectURL(file);
        // 初始化裁剪区
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })
    // 为确定按钮绑定点击事件
    $('#upload').on('click', function () {
        // 1.拿到用户裁剪之后的头像
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        // 调用接口 把头像上传到服务器
        $.ajax({
            method: 'POST',
            url: `${window.parent.url}/my/update/avatar`,
            data: {
                avatar: dataURL
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更换头像失败!')
                }
                layer.msg('更换头像成功!');
                window.parent.getUserInfo();
            }
        })
    });
})