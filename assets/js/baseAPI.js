// 每次调用 $.get 或 $.post() $.ajax() 的时候会自动调用这个方法
$.ajaxPrefilter(function (options) {
    // console.log(options);
    // options.url
})