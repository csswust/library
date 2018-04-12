/**
 * Created by Sunny on 2018/4/7.
 */

//

//获取地址中的参数
function urlSearch() {
    var name, value;
    var str = location.href;//获取整个地址栏
    var num = str.indexOf("?");
    str = str.substr(num + 1);//取得所有的参数
    var arr = str.split("&");//将获取的各个参数放到数组中
    for (var i = 0; i < arr.length; i++){
        num = arr[i].indexOf("=");
        if(num > 0){
            name = decodeURIComponent(arr[i].substring(0, num));
            value = decodeURIComponent(arr[i].substr(num + 1));
            this[name] = value;
        }
    }
}
