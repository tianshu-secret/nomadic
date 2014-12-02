function formsub() {
	var form = document.getElementById("form");
	
	if(form.name == "logcl"){
	var name = form['username'];
	var passwd = form['passwd'];
	if(name.value == "请输入用户名" || name.value == ""){
		var img = document.getElementById("username_img");
		img.style.display = "block";
		return false;
	}
	if(passwd.value == "请输入密码" || passwd.value == ""){
		var img = document.getElementById("passwd_img");
		img.style.display = "block";
		return false;
	}
	if(document.getElementById("squaredThree").checked)
		form['check'].value = 1;
	else
		form['check'].value = 0;
	}

	if(form.name == "registercl"){
	var name = form['username'].value;
	var passwd = form['passwd'].value;
	var passwd_test = form['passwd_test'].value;
	var email = form['email'].value;
	if(name == "请输入用户名" || name == ""){
		var img = document.getElementById("username_img");
		img.style.display = "block";
		return false;
	}
	if(passwd == "请输入密码" || passwd == ""){
		var img = document.getElementById("passwd_img");
		img.style.display = "block";
		return false;
	}
	if(passwd_test == "请确认密码" || passwd_test == "" || passwd_test != passwd){
		var img = document.getElementById("passwd_test_img");
		img.style.display = "block";
		return false;
	}
	if(email == "请输入email" || email == ""){
		var img = document.getElementById("email_img");
		img.style.display = "block";
		return false;
	}
	}

	if(form.name == "emailcl"){
	var email = form['email'].value;
	if(email == "请输入email" || email == ""){
		var img = document.getElementById("email_img");
		img.style.display = "block";
		return false;
	}
	}
	return true;
}