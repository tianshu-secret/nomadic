//JavaScript Document
function send_email(){
	var liuyan = document.getElementById("liuyan");
	if(liuyan.value == ""){
	    liuyan.value = "留言不能为空";
		return false;
	}
	else{
		jQuery.post(
                'http://42.96.184.223/nomadic/liuyanSave',
                {
                    the_liuyan:liuyan.value
                });
		liuyan.value = "留言已成功，感谢您的关注";
		return false;
	}
}

function showDialog(){
	var b="";
	b += "<p><textarea name = \"article\" id=\"liuyan\"></textarea></p>";
	
	easyDialog.open({
	  container : {
		content : b,
		yesFn : send_email,
		noFn : true,
		yesText : '留言'
	  },
	  drag:false,
	  lock:true
	});
}

