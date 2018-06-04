require.config({
    paths:{
        jquery:'../lib/jquery-3.3.1',
        common:'./common',
        xZoom:'../lib/jquery-xZoom/jquery.xZoom'
    },
    // 配置依赖
    shim:{
        common:['jquery'],
        xZoom:['jquery']
    }
});