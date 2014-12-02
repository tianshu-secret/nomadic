function myfocus(ev){
	var ev = ev ? ev : window.event; // 事件     
    	var l  =  ev.srcElement ? ev.srcElement : ev.target; // 获得事件源
	var str = l.name + "_img";
	var img = document.getElementById(str);
	img.style.display = "none";
	if(l.value==l.defaultValue || l.value == "您的邮箱尚未注册，请先注册，谢谢")
	{l.value='';l.style.color='#000';}	
} 
function myblur(ev){
	var ev = ev ? ev : window.event; // 事件     
    	var l  =  ev.srcElement ? ev.srcElement : ev.target; // 获得事件源
	if(!l.value || l.value==l.defaultValue)
	{l.value=l.defaultValue;l.style.color='#999'}
}

function changeFormByName(txt){
	var form = document.getElementById("form");
	var s="";
	//prompt('', txt);
	if(txt == "登陆")
	{
		s +="   \
		<p>     \
                <input class=\"username\" id=\"username\" name=\"username\"  value=\"请输入用户名\">                          \
	        <div class=\"mywrong\" id=\"username_img\"><img src=\"./static/image/wrong.png\" width=\"30px\" height=\"30px\"/></div>   \
                </p>     \
                <p>       \
                <input type=\"text\" value=\"请输入密码\" class=\"passwd_txt\" id=\"loginPwd_txt\"    \
                onfocus=\"p1()\">      \
                <input name=\"passwd\" type=\"password\" class=\"passwd\" id=\"loginPwd\"          \
                onblur=\"p2()\">            \
	        <div class=\"mywrong\" id=\"passwd_img\"><img src=\"./static/image/wrong.png\" width=\"30px\" height=\"30px\"/></div>       \
                </p>            \
	        <p>             \
	        <input class=\"check\" name=\"check\" style=\"display:none\">    \
	        </p>     \
                <p>      \
                <span>    \
                <input class=\"submit\" name=\"submit\" type=\"submit\" value=\"登陆\">         \
                </span>      \
                <span class=\"squaredThree\">            \
		<input type=\"checkbox\" value=\"None\" id=\"squaredThree\"/>                    \
		<label for=\"squaredThree\"></label><span id=\"jizhuwo\">记住我</span>           \
		</span>            \
                </p>                 ";
		form.innerHTML=s;
		form.name = "logcl";
		var username = document.getElementById("username");
		username.onfocus = myfocus;
		username.onblur = myblur;
		form.action="logcl";
		form.style.width="300px";
	}
	else if(txt == "注册")
	{
		s+="<p><input class=\"username\" id=\"username\" name=\"username\"  value=\"请输入用户名\"><div class=\"mywrong\" id=\"username_img\"><img src=\"./static/image/wrong.png\" width=\"30px\" height=\"30px\"/></div></p>";

		s+="<p><input type=\"text\" value=\"请输入密码\" class=\"passwd_txt\" id=\"loginPwd_txt\" onfocus=\"p1()\"><input name=\"passwd\" type=\"password\" class=\"passwd\" id=\"loginPwd\" onblur=\"p2()\"><div class=\"mywrong\" id=\"passwd_img\"><img src=\"./static/image/wrong.png\" width=\"30px\" height=\"30px\"/></div> </p>";

		s+="<p><input type=\"text\" value=\"请确认密码\" class=\"passwd_txt\" id=\"loginPwd_txt_test\" onfocus=\"p3()\"><input name=\"passwd_test\" type=\"password\" class=\"passwd\" id=\"loginPwd_test\" onblur=\"p4()\"><div class=\"mywrong\" id=\"passwd_test_img\"><img src=\"./static/image/wrong.png\" width=\"30px\" height=\"30px\"/></div> </p>";

		s+="<p><input class=\"username\" id=\"email\" name=\"email\"  value=\"请输入email\"><div class=\"mywrong\" id=\"email_img\"><img src=\"./static/image/wrong.png\" width=\"30px\" height=\"30px\"/></div></p>";

		s+="<p><span><input class=\"submit\" name=\"submit\" type=\"submit\" value=\"注册\"></span><span><input class=\"reset\" name=\"reset\" type=\"reset\" value=\"重置\" ></span></p>";

		form.innerHTML=s;
		form.name = "registercl";
		var username = document.getElementById("username");
		username.onfocus = myfocus;
		username.onblur = myblur;
		var email = document.getElementById("email");
		email.onfocus = myfocus;
		email.onblur = myblur;
		form.action="registercl";
		form.style.width="300px";
	}
	else if(txt == "忘记密码")
	{
		s+="<p><input class=\"username\" id=\"email\" name=\"email\"  value=\"请输入email\"><div class=\"mywrong\" id=\"email_img\"><img src=\"./static/image/wrong.png\" width=\"30px\" height=\"30px\"/></div></p>";
		s+="<p><span class=\"submit\"></span><span><input class=\"submit\" name=\"submit\" type=\"submit\" value=\"重设密码\"></span></p>";

		form.innerHTML=s;
		form.name = "emailcl";
		var email = document.getElementById("email");
		email.onfocus = myfocus;
		email.onblur = myblur;
		form.action="emailcl";
		form.style.width="300px";
	}
	else if(txt == "日志")
	{
		s+="<br>2013.4.01   &nbsp&nbsp&nbsp  开始制作<br>";
		s+="2013.4.10   &nbsp &nbsp&nbsp  实现google api调用，可以绘制折线和地理定位，并根据经纬度自动填充地名<br>";
		s+="2013.4.13    &nbsp &nbsp&nbsp  添加搜索功能和自动绘图功能<br>";
		s+="2013.4.14   &nbsp &nbsp&nbsp标记清除和显示<br>";
		s+="2013.4.18   &nbsp &nbsp&nbsp完成存储和显示<br>";
		s+="2013.4.20   &nbsp &nbsp&nbsp实现拖拽删除和更改路线类别，异步删除<br>";
		s+="2013.4.23   &nbsp &nbsp&nbsp添加更多存储信息，双击可显示路线详细信息并编辑<br>";
		s+="2013.4.24   &nbsp &nbsp&nbsp完善路线隐藏<br>";
		s+="2013.4.25   &nbsp &nbsp&nbsp完整存储折线段，即使没有点在折线上<br>";
		s+="2013.4.26   &nbsp &nbsp&nbsp实现可以编辑路线上点的信息并存储<br>";
		s+="2013.4.30   &nbsp &nbsp&nbsp增加登录注册模块。添加多用户模式<br>";
		s+="2013.5.1   &nbsp &nbsp&nbsp搭建邮件发送<br>";
		s+="2013.5.2   &nbsp &nbsp&nbsp解决双击单击问题<br>";
		s+="2013.5.3   &nbsp &nbsp&nbsp完善类别输入框和时间输入框<br>";
		s+="2013.5.5   &nbsp &nbsp&nbsp编写设置模块和用户修改页面<br>";
		s+="2013.5.6   &nbsp &nbsp&nbsp增加上传头像功能<br>";
		s+="2013.5.5   &nbsp &nbsp&nbsp编写欢迎页面、帮助页面<br>";
		form.innerHTML=s;
		form.style.width="600px";
	}
}
