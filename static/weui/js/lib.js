var urlPre = "http://127.0.0.1:8888";

/*获取get传参*/
function getQueryString(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]); return null;
}

//返回今日str
function getToday(){
    var year = (new Date()).getFullYear();
    var day = (new Date()).getDate();
    var month = (new Date()).getMonth() + 1;
    month = month < 10? '0'+month : month;
    day = day < 10? '0' + day : day;
    var today = year + '-' + month + '-' + day;
    return today;
}

//返回次日str
function getTomorrow(date){
    var a = new Date(date);
    n = 1;
    var b = new Date(a -0+n* 86400000)
    var year = b.getFullYear();
    var day = b.getDate();
    var month = b.getMonth() + 1;

    month = month <10 ? '0' + month: month;
    day = day < 10? '0' + day: day;

    return year + '-' + month + '-' + day;
}