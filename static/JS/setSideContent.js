// JavaScript Document

//添加监听事件
function addButtonListener(str){
	var fanye = document.getElementById("fanye");
	fanye.onclick=newoldButtonOnclick;
	if(str == "old")
	{
		var myxin = document.getElementById("myxin");
		var myjiu = document.getElementById("myjiu");
		myLineMin = Math.min(Array_min(myidArray0),Array_min(myidArray1));
		myLineMax = Math.max(Array_max(myidArray0),Array_max(myidArray1));
		for(var i = 0; i < mynameArray0.length; i++) {
			var the_div = document.createElement("div");
			the_div.id = "xin"+i;
			the_div.className = "xin_button my_button";
			the_div.name = i;
			the_div.innerHTML = mynameArray0[i]+"<img id=\""+the_div.id+"image"+"\" class=\"mytick\" src=\"/a_test/static/image/tick.png\"/>";

			//添加drag监听
			the_div.draggable="true";
			the_div.ondragstart = dragIt;
			the_div.ondragend = endDrag;
			
			//添加单击监听和双击监听，单击监听显示线路，双击监听显示dialog
			the_div.onclick = function(ev){
				var ev = ev ? ev : window.event; // 事件 
    				var my_event  =  ev.srcElement ? ev.srcElement : ev.target; // 获得事件源 
				myclick(1,my_event.id);
			};
			the_div.ondblclick = function(ev){
				var ev = ev ? ev : window.event; // 事件
                                var my_event  =  ev.srcElement ? ev.srcElement : ev.target; // 获得事件源
				myclick(2,my_event.id);
			};

			//添加元素
			myxin.appendChild(the_div);
			showXinLine(i);
		}
		for(var i = 0; i < sublineArray0.length; i++) {
                        showSubXinLine(i);
                }
		for(var i = 0; i < mynameArray1.length; i++) {
			var the_div = document.createElement("div");
                        the_div.id = "jiu"+i;
                        the_div.className = "jiu_button my_button";
                        the_div.name = i;
                        the_div.innerHTML = mynameArray1[i]+"<img id=\""+the_div.id+"image"+"\" "+"class=\"mytick\" src=\"/a_test/static/image/tick.png\"/>";
			
			//添加drag监听
                        the_div.draggable="true";
			the_div.ondragstart = dragIt;
			the_div.ondragend = endDrag;

			//添加单击监听和双击监听，单击监听显示线路，双击监听显示dialog
			the_div.onclick = function(ev){
				var ev = ev ? ev : window.event; // 事件
                                var my_event  =  ev.srcElement ? ev.srcElement : ev.target; // 获得事件源
				myclick(1,my_event.id);
			};
                        the_div.ondblclick = function(ev){
				var ev = ev ? ev : window.event; // 事件
                                var my_event  =  ev.srcElement ? ev.srcElement : ev.target; // 获得事件源
				myclick(2,my_event.id);
			};

			//添加元素
			myjiu.appendChild(the_div);
		//	myjiustr += "<div id=\"jiu"+i+"\""+" class=\"jiu_button my_button\" name=" +"\"" + i + "\"" + ">" + mynameArray1[i] + "</div>";
			showJiuLine(i);
		}
		for(var i = 0; i < sublineArray1.length; i++) {
                        showSubJiuLine(i);
                }
		//dragenter,dragleave,dragend,drop
	}
	else
	{
		var zidong = document.getElementById("zidong");
		var shoudong = document.getElementById("shoudong");
		var sousuo = document.getElementById("sousuo");
		var shengcheng = document.getElementById("shengcheng");
		var qingchu = document.getElementById("qingchu");
		var cunchu2 = document.getElementById("cunchu2");
		zidong.onclick=handleButtinOnclick;
		shoudong.onclick=handleButtinOnclick;
		sousuo.onclick=handleButtinOnclick;
		shengcheng.onclick=handleButtinOnclick;
		qingchu.onclick=handleButtinOnclick;
		cunchu2.onclick=cunchuButtonOnclick;
	}
	$(function(){
		//设置按钮的处理
		$("#tool").click(function(){
                        showSet();
                });

		//滑动块的处理
		$("#zidong").click(function(){
			$('#zidongContent').slideToggle(800);
		});
		$("#shoudong").click(function(){
			//只有当slideToggle中的参数为'media'的时候才会改变display，为数值时是不会改变的
				$('#zidongContent').slideUp(800);
		});
		$(".divTitle").click(function(){
			$(this).next(".divContent").slideToggle(800);
		});

		//input框的处理
		$('input').focus(function(e){
			stopDefault(e);
			if(this.value==this.defaultValue){
				this.value='';
				$(this).css("color","#000");
		}
		$(this).css("border","2px solid #0089EC");
		});
		$('input').blur(function(){
			$(this).css("border","");
			if(!this.value){
				this.value=this.defaultValue;
				$(this).css("color","#999");
		}
		});

		//textarea框的处理
		$('textarea').focus(function(e){
			stopDefault(e);
			if(this.value==this.defaultValue){
				this.value='';
				$(this).css("color","#000");
		}
		$(this).css("width","83%");
		$(this).css("border","2px solid #0089EC");
		});
		$('textarea').blur(function(){
			$(this).css("border","");
			$(this).css("width","84%");
			if(!this.value){
				this.value=this.defaultValue;
				$(this).css("color","#999");
		}
		});

		//类别存储框的处理
		$("#newoldText").click(function(){
			$("#newoldOps").show(200);
		});
		$("#newoldOp1").click(function(){
			$("#newoldText").val($(this).html());
			$("#newoldText").css("color","#000");
			$("#newoldOps").hide(200);
		});
		$("#newoldOp1").mousedown(function(){   
            $("#newoldOp1").click();      
        });
		$("#newoldOp2").click(function(){
			$("#newoldText").val($(this).html());
			$("#newoldText").css("color","#000");
			$("#newoldOps").hide(200);
		});
		$("#newoldOp2").mousedown(function(){   
            $("#newoldOp2").click();      
        });
		$("#newoldText").blur(function(ev){
			$(this).css("border","");
			if(!$(this).val()){
				this.value=this.defaultValue;
				$(this).css("color","#999");
		}
		$("#newoldOps").hide(200);
		});

		//时间存储框的处理
		$( '#picker_classic' ).pickadate();
	});
}
//控制左边栏是旧的足迹页面还是绘制新路线的页面
function setSideContent(str){
	
	var side = document.getElementById("side");
	var s = "";
	if(str == "old")
	{
		window.sessionStorage.setItem("FanyeKey", "new");

		//翻页
		s += "<div class=\"tool_line\">                                                      \
		      <img id=\"fanye\" class=\"my_button my_tool\" src=\"/a_test/static/image/fanye.png\" title=\"翻页\"/>  \
		      <img id=\"tool\" class=\"my_button my_tool\" src=\"/a_test/static/image/tool.png\" title=\"设置\"/>  \
		      <img id=\"eye\" class=\"my_button my_tool\" src=\"/a_test/static/image/eye.png\" title=\"探索\"/>  \
                      </div>                                                                          \
                                                                                                           \
		<!--头像的位置--->                                                                       \
		<div class=\"head_main\">                                                                \
			<img id=\"head_image\" src=\"/a_test/static/image/Head_Image/"
		s +=myHead_image;
		s += "\" width=\"100\" height=\"100\"/>          \
			<p>                                                                                  \
				<div id=\"head_name\">"
		s += myName;
		s += "</div>                                       \
				<div class=\"head_other\">                                                       \
					里程："
		s += myMile;
		s += "公里                                                                \
				</div>                                                                           \
				<div class=\"head_other\">                                                       \
					城市："
		s += myCitynum;
		s += "座                                                                   \
				</div>                                                                           \
			</p>                                                                                 \
		</div>                                                                                   \
		                                                                                         \
		<!--新的探索与旧的足迹--->                                                               \
		<div class=\"divGap\"></div>                                                             \
		<div class=\"dot_rectangle my_button divTitle\" id=\"tansuo\">新的探索</div>             \
			<div class=\"divContent\" id=\"myxin\" ondrop=\"dropIt(this, event)\" ondragenter=\"enterIt(this,event)\" ondragleave=\"leaveIt(this,event)\" ondragover=\"enterIt(this,event)\">        \
			</div>                                                                               \
		<div class=\"divGap\"></div>                                                             \
		<div class=\"dot_rectangle my_button divTitle\" id=\"zuji\">旧的足迹</div>               \
			<div class=\"divContent\" id=\"myjiu\" ondrop=\"dropIt(this, event)\" ondragenter=\"enterIt(this,event)\" ondragleave=\"leaveIt(this,event)\" ondragover=\"enterIt(this,event)\">         \
			</div>                                                                               \
		<div class=\"divGap\"></div>                                                             \
		<div class=\"dot_rectangle my_button\" id=\"shijian\">时间轴</div>                              \
		<div id=\"recycle\" ondrop=\"trashIt(this, event)\" ondragenter=\"enterIt(this,event)\" ondragleave=\"leaveIt(this,event)\" ondragover=\"enterIt(this,event)\"><img src=\"/a_test/static/image/recycle.png\" width=\"60px\" heigth=\"60px\"/></div>    "                      
	}
	else
	{
		//如果页面更改，强制刷新
		for(var i = myLineMin; i <= myLineMax; i++){
		    if(window.sessionStorage.getItem(i))
			window.location.reload();
		}

		window.sessionStorage.setItem("FanyeKey", "old");

		//翻页
		s += "<div class=\"tool_line\">                                                      \
                      <img id=\"fanye\" class=\"my_button my_tool\" src=\"/a_test/static/image/fanye.png\" title=\"翻页\"/>  \
                      <img id=\"tool\" class=\"my_button my_tool\" src=\"/a_test/static/image/tool.png\" title=\"设置\"/>  \
                      <img id=\"eye\" class=\"my_button my_tool\" src=\"/a_test/static/image/eye.png\" title=\"探索\"/>  \
                      </div>                                                                             \
                                                                                                        \
		<!--搜索部分--->                                                                         \
			<div class=\"divGap\"></div>                                                         \
			<div class=\"dot_rectangle\">                                                                    \
			<form>                                                                                                      \
				<input type=\"text\" value=\"Search\" autocomplete=\"on\" id=\"sousuokuang\"                           \
				onFocus=\"if(value==defaultValue){value='';this.style.color='#000'}\"                                   \
					onBlur=\"if(!value){value=defaultValue;this.style.color='#999'}\"/>                                  \
				<div id=\"sousuo\" class=\"my_button\">搜索</div>                                    \
			</form>                                                                                                      \
			</div>                                                                                                      \
			<div class=\"divGap\"></div>                                                                    \
		<!--自动手动部分--->                                                                    \
			<div class=\"dot_rectangle\">                                                                    \
			<span id=\"zidong\" class=\"my_button\">自动</span><span>|</span><span id=\"shoudong\" class=\"my_button\">手动</span>   \
			</div>                                                                                                      \
			<div id=\"zidongContent\">                                                                    \
			<form>                                                                                                      \
				<input type=\"checkbox\" id=\"qixing\">骑行<br/>                                            \
				<input type=\"checkbox\" id=\"youhua\">路线优化<br/>                                  \
				<input type=\"checkbox\" id=\"bikai\">避开主干道<br/>                                  \
				<div id=\"shengcheng\" class=\"my_button little_dot_rectangle\">生成</div>            \
				<div id=\"qingchu\" class=\"my_button little_dot_rectangle\">清除</div>                  \
			</form>                                                                                                      \
			</div>                                                                                                      \
		                                                                                                      \
		<!--存储部分--->                                                                               \
			<div class=\"dot_rectangle my_button divTitle\" id=\"cunchu\">存储</div>                                  \
			<div class=\"divContent\">                                                                    \
			<form name=\"cunchuform\" id=\"cunchuform\" method=\"post\" action=\"add\">                          \
				<input type=\"text\" name=\"the_name\" value=\"名字\"/>                             \
				<input type=\"text\" id=\"newoldText\" readonly=\"readonly\" name=\"the_class\" value=\"类别\"/>   \
				<div id=\"newoldOps\">                \
				<div id=\"newoldOp1\"class=\"newoldOp\">新的探索</div>               \
				<div id=\"newoldOp2\" class=\"newoldOp\">旧的足迹</div>               \
				</div>                                                                    \
				<input id=\"picker_classic\" type=\"text\" name=\"the_time\" value=\"时间\">             \
				<textarea type=\"text\" name=\"the_beizhu\">备注</textarea>                    \
				<input type=\"hidden\" name=\"the_line\" id=\"thehidden\"/>                            \
				<input type=\"hidden\" name=\"the_subline\" id=\"thehidden2\"/>                            \
				<input type=\"hidden\" name=\"the_title\" id=\"thehidden3\"/>                            \
				<div class=\"my_button little_dot_rectangle\" id=\"cunchu2\">存储</div>                                  \
			</form>                                                                                                      \
			</div>                                                                                                      "
	}
	side.innerHTML = s; 
	addButtonListener(str);
}
