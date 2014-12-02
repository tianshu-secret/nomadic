//JavaScript Document
var TimeNum = 1;
var TimeFn = null;

//阻止js冒泡和浏览器默认事件
function stopBubble(e) {
    //如果提供了事件对象，则这是一个非IE浏览器
    if ( e && e.stopPropagation )
        //因此它支持W3C的stopPropagation()方法
        e.stopPropagation();
    else
       //否则，我们需要使用IE的方式来取消事件冒泡
        window.event.cancelBubble = true;
}
function stopDefault(e) {
    //阻止默认浏览器动作(W3C)
    if ( e && e.preventDefault )
        e.preventDefault();
    //IE中阻止函数器默认动作的方式
    else
        window.event.returnValue = false;
}

//查找数组中的最大最小元素
function Array_min(array){
    if(array.length == 1)
	return array[0];
    return Math.min.apply(Math,array);
}
function Array_max(array){
     if(array.length == 1)
        return array[0];
    return Math.max.apply(Math,array);
}

//解决dblclick和click的冲突问题
function choose_click(id) {
    if (TimeNum == 1) {
       var the_button = document.getElementById(id+"image");
       //阻止冒泡事件
       TimeNum = 0;
       the_button.click();
    }
    if (TimeNum == 2) {
       showDialog(id);
    }
}
function myclick(num,id) {
    if(TimeNum == 0) {
	TimeNum = 1;
	return;
    }
    if(TimeFn == null) {
	TimeNum = 1;
    	TimeFn = setTimeout(function(){choose_click(id);},250);
    }
    else {
	TimeNum = 2;
	clearTimeout(TimeFn);
	choose_click(id);
    }
    setTimeout("TimeFn = null",250);
}

//cookie的设置与删除
function setCookie(name,value,hour)
{
    var hour = hour; //此 cookie 将被保存 hour 小时
    var exp  = new Date();    //new Date("December 31, 9998");
    exp.setTime(exp.getTime() + hour*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
function getCookie(name)//取cookies函数        
{
    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
     if(arr != null) return unescape(arr[2]); return null;

}
function delCookie(name)//删除cookie
{
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}
