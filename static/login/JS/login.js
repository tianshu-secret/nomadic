// JavaScript Document
	function p1(){
		var img = document.getElementById("passwd_img");
		img.style.display = "none";

		var pwd = document.getElementById("loginPwd");
		var pwd_text = document.getElementById("loginPwd_txt");

		pwd.style.display = "inline";
		pwd_text.style.display = "none";
		pwd.focus();

	}

	function p2(){
		var pwd = document.getElementById("loginPwd");
		var pwd_text = document.getElementById("loginPwd_txt");
		if(pwd.value==null || pwd.value=="" || pwd.value=="请输入密码"){
			pwd.style.display="none"; 
			pwd_text.style.display="inline";
		}
	} 

	function p3(){
		var img = document.getElementById("passwd_test_img");
		img.style.display = "none";

		var pwd = document.getElementById("loginPwd_test");
		var pwd_text = document.getElementById("loginPwd_txt_test");
		pwd.style.display = "inline";
		pwd_text.style.display = "none";
		pwd.focus();

	}

	function p4(){
		var pwd = document.getElementById("loginPwd_test");
		var pwd_text = document.getElementById("loginPwd_txt_test");
		if(pwd.value==null || pwd.value=="" || pwd.value=="请确认密码"){
			pwd.style.display="none"; 
			pwd_text.style.display="inline";
		}
	} 
	


function handleButtonOnclick(ev){
	var l1 = document.getElementById("l1");
	var l1_txt = l1.innerHTML;
	var ev = ev ? ev : window.event; // 事件     
    var l2  =  ev.srcElement ? ev.srcElement : ev.target; // 获得事件源
	var l2_txt = l2.innerHTML;
	l1.innerHTML = l2_txt;
	l2.innerHTML = l1_txt;
	changeFormByName(l2_txt);
}
