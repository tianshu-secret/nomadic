//JavaScript Document
var cropper;
var fileExt;

function getFileExt(obj)
{
    var pos = obj.value.lastIndexOf(".");
    return obj.value.substring(pos+1);
}
function getFileName(obj)
{
    var pos = obj.value.lastIndexOf("/");
    return obj.value.substring(pos+1);
}

function init()
{	
	var username = document.getElementById("username");
        username.onfocus = myfocus;
        username.onblur = myblur;

	var passwd = document.getElementById("passwd1");
        passwd.onfocus = myfocus;
        passwd.onblur = myblur;

	var passwd = document.getElementById("passwd2");
        passwd.onfocus = myfocus;
        passwd.onblur = myblur;

	var passwd = document.getElementById("passwd3");
        passwd.onfocus = myfocus;
        passwd.onblur = myblur;

	cropper = new ImageCropper(300, 300, 180, 180);
	cropper.setCanvas("cropper");
	cropper.addPreview("preview");

	if(!cropper.isAvaiable())
	{
		var warning = document.getElementById("warning");
		warning.innerHTML="您的浏览器不支持HTML5，无法在本网站上传图片";
	}
}

function selectImage(obj)
{
	fileExt = getFileExt(obj);
	cropper.loadImage(obj.files[0]);
}

function nameSave(){
	var name = document.getElementById("username");
	if(name.value == "请输入新的昵称" || name.value == ""){
		var warning = document.getElementById("warning");
		warning.innerHTML="不能保存空的昵称";
		var img = document.getElementById("username_img");
		img.style.display = "block";
		return;
	}
	var name_form = document.getElementById("name_form");
	name_form.submit();
}
function passSave(){
		var passwd1 = document.getElementById("passwd1");
		var passwd2 = document.getElementById("passwd2");
		var passwd3 = document.getElementById("passwd3");
		if(passwd1.value == "请输入旧的密码" || passwd1.value == ""){
			var warning = document.getElementById("warning");
			warning.innerHTML="旧的密码不能为空";
			var img = document.getElementById("passwd1_img");
			img.style.display = "block";
			return;
		}
		if(passwd2.value == "请输入新的密码" || passwd2.value == ""){
			var warning = document.getElementById("warning");
			warning.innerHTML="新的密码不能为空";
			var img = document.getElementById("passwd2_img");
			img.style.display = "block";
			return;
		}
		if(passwd3.value == "请重复新的密码" || passwd3.value == ""){
			var warning = document.getElementById("warning");
			warning.innerHTML="请重复新的密码";
			var img = document.getElementById("passwd3_img");
			img.style.display = "block";
			return;
		}
		if(passwd1.value == passwd2.value){
			var warning = document.getElementById("warning");
			warning.innerHTML="新旧密码不能相同";
			var img = document.getElementById("passwd2_img");
			img.style.display = "block";
			return;
		}
		if(passwd2.value != passwd3.value){
			var warning = document.getElementById("warning");
			warning.innerHTML="两次新密码不匹配，请重新输入";
			var img = document.getElementById("passwd3_img");
			img.style.display = "block";
			return;
		}
		var pass_form = document.getElementById("pass_form");
		pass_form.submit();
}
function photoSave()
{
	var warning = document.getElementById("warning");
	warning.innerHTML="头像上传成功";

	var photo_form = document.getElementById("photo_form");
	var name_input = document.getElementById("name_input");
	name_input.value = fileExt;

	photo_form.submit();	
}
window.onload=init;

