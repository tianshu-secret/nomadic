// JavaScript Document
//获得浏览器类型
function getOs()  
{  
    var OsObject = "";  
    if(navigator.userAgent.indexOf("MSIE")>0) {  
         return "MSIE";  
    }  
    if(navigator.userAgent.indexOf("Firefox")>0){  
         return "Firefox";  
    }  
    if(navigator.userAgent.indexOf("Safari")>0) {  
         return "Safari";  
    }   
    if(navigator.userAgent.indexOf("Camino")>0){  
         return "Camino";  
    }  
    if(navigator.userAgent.indexOf("Gecko/")>0){  
         return "Gecko";  
    }
}  

//控制左边栏是旧的足迹页面还是绘制新路线的页面
function newoldButtonOnclick(){
	var str = window.sessionStorage.getItem("FanyeKey");
	setSideContent(str);
}
//拖拽函数
function dragIt(ev) {
    ev = ev ? ev : window.event;
    var target  =  ev.srcElement ? ev.srcElement : ev.target; // 获得事件源 
    ev.dataTransfer.setData('DragDiv', target.id);
    var recycle = document.getElementById("recycle");
    recycle.style.display="block";
}
function endDrag(ev) {
    var recycle = document.getElementById("recycle");
    recycle.style.display="none";
}

//控制普通按钮事件的函数
function handleButtinOnclick(ev){
	var ev = ev ? ev : window.event; // 事件 
    var my_event  =  ev.srcElement ? ev.srcElement : ev.target; // 获得事件源 
	var l = my_event.id;
	//alert(l);
	var zidong = document.getElementById("zidong");
	var shoudong = document.getElementById("shoudong");
	//var sousuo = document.getElementById("sousuo");
	var sousuokuang = document.getElementById("sousuokuang");
	if(l == "shoudong")
	{
		mapdrawer.setOptions({
  			drawingControl: true
		});
		zidong.style.color="#CCC";
		shoudong.style.color="#000";
 
	}
	else if(l == "zidong")
	{
		mapdrawer.setOptions({
  			drawingControl: false
		});
		zidong.style.color="#000";
		shoudong.style.color="#CCC";
	}
	else if(l == "sousuo")
	{
		codeAddress(sousuokuang.value);
	}
	else if(l == "shengcheng")
	{
		calcRoute();
		var qingchu = document.getElementById("qingchu");
		qingchu.style.display="block";
	}
	else if(l == "qingchu")
	{
		directionsDisplay.setMap(null);
		var qingchu = document.getElementById("qingchu");
		qingchu.style.display="none";
	}
}
function init(){
	getMyLocation();
	window.sessionStorage.setItem("FanyeKey", "old");
	setSideContent("new");
}
function uninit_work(idstr,classstr){
	if(idstr != "") {
            jQuery.post(
            'leave',
            {
                the_id:idstr,
                the_class:classstr
            });
	    alert("更改已保存");
        }
	sessionStorage.clear();
}
function uninit(){
	var str;
        var idstr = "";
        var classstr = "";
        for(var i = myLineMin; i <= myLineMax; i++){
                str = window.sessionStorage.getItem(i);
                if(str == "myxin"){
                        idstr += i+",";
                        classstr += "0,";
                }
                if(str == "myjiu"){
                        idstr += i+",";
                        classstr += "1,";
                }
		if(str == "trash"){
                        idstr += i+",";
                        classstr += "2,";
                }
        }
	if(idstr != "" && getOs() == "Safari"){
	    uninit_work(idstr,classstr);
	    return "更改已保存";
	}
	else
	    uninit_work(idstr,classstr);
}
window.onload=init;
window.onbeforeunload=uninit;
