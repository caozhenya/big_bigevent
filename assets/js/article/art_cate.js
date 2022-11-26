$(function () {
    var layer = layui.layer
    // 获取文章分类列表
    initArtCateList();
    // 为添加类别绑定点击事件
    var index = null;
    $('#btnAddCate').on('click', function (e) {
        var index =
            layer.open({
                type: 1,
                area: ['500px', '250px'],
                title: '添加文章分类'
                , content: $('#dialog-add').html()
            })
    });
    // 为添加按钮添加点击事件
    // 通过代理的方式实现绑定 事件委派
    $('body').on('submit', '#form-add', function (e) {
        // 阻止默认提交行为
        e.preventDefault();
        // 发起ajax请求
        $.ajax({
            method: 'post',
            url: `${window.parent.url}/my/article/addcates`,
            // 快速拿到表单数据
            data: $(this).serialize(),
            success: function (resp) {
                if (resp.status !== 0) {
                    return layer.msg(resp.message)
                }
                initArtCateList();
                layer.msg('添加成功')
                layer.close(index)
            }
        })
    })
})
function initArtCateList() {
    $.ajax({
        method: 'get',
        url: `${window.parent.url}/my/article/cates`,
        success: function (res) {
            var result = template('tpl_tab', res);
            $('tbody').html(result);
        }
    })
};