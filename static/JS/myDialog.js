//JavaScript Document
function set_bianji(){
	var the_button = $("#easyDialogYesBtn").html();
	var the_text;
	var the_time;
	//根据按钮的内容作不同的处理
	if(the_button == "编辑"){
		the_text = $("#easyDialogText").html();
		the_time = $("#easyDialogTime").html();
		
		var s = "<textarea type=\"text\" id=\"easyDialogArea\">"+the_text+"</textarea>";
		$("#easyDialogText").html(s);
		
		s = "<input type=\"text\" id=\"easyDialogInput\" value=\""+the_time+"\"  />   ";
		$("#easyDialogTime").html(s);
		
		$("#easyDialogYesBtn").html("保存");
	}
	else{
		the_text = $("#easyDialogArea").val();
		the_time = $("#easyDialogInput").val();
		var the_id = $("#easyDialogLineId").html();
		var the_class = $("#easyDialogLineClass").html();
		
		$("#easyDialogText").html(the_text);
		$("#easyDialogTime").html(the_time);
		
		//异步保存操作
                jQuery.post(
                'dialogSave',
                {
                    the_id:the_id,
                    the_beizhu:the_text,
		    the_time:the_time
                });

		//同步保存操作
		if(the_class == "xin"){
		    mybeizhuArray0[myidArray0.indexOf(the_id)] = the_text;
		    mytimeArray0[myidArray0.indexOf(the_id)] = the_time;
		}
		else{
		    mybeizhuArray1[myidArray1.indexOf(the_id)] = the_text;
                    mytimeArray1[myidArray1.indexOf(the_id)] = the_time;
		}

		$("#easyDialogYesBtn").html("编辑");
	}
	return false;
}

function showDialog(l){
	var name;
	var beizhu;
	var timeinfo;
	var lineid;
	if(l.substr(0,3) == "xin"){
	    name = mynameArray0[l.substr(3)];
	    beizhu = mybeizhuArray0[l.substr(3)];
	    timeinfo = mytimeArray0[l.substr(3)];
	    lineid =  myidArray0[l.substr(3)];
	}
	else{
	    name = mynameArray1[l.substr(3)];
            beizhu = mybeizhuArray1[l.substr(3)];
	    timeinfo = mytimeArray1[l.substr(3)];
	    lineid =  myidArray1[l.substr(3)];
	}

	var a = name;
	var b = "<div id=\"easyDialogText\">";
	b += beizhu;
	b += "</div>";
	b += "<div id=\"easyDialogTime\" class=\"easyDialog_time\">";
	b += timeinfo;
	b += "</div>";
        
        b += "<div id=\"easyDialogLineId\">";
        b += lineid;
        b += "</div>";
	b += "<div id=\"easyDialogLineClass\">";
        b += l.substr(0,3);
        b += "</div>";

	easyDialog.open({
	  container : {
		header : a,
		content : b,
		yesText : "编辑",
		noFn : true,
		yesFn : set_bianji
	  },
	  overlay :false,
	  lock:true
	});
}

//注销处理与设置弹窗
function zhuxiao(){
	delCookie("nomadicid");
	window.location.reload();
	if(getCookie("nomadicid")){
		var zhuxiao_form = document.getElementById("zhuxiao_form");
        	zhuxiao_form.submit();
	}
}
function shezhi(){
	var shezhi_form = document.getElementById("shezhi_form");
	shezhi_form.submit();
}
function showSet(){
	var a="设置";
	var b="";
	b += "<form method=post action=\"shezhi\" id=\"shezhi_form\"></form>";
	b += "<form method=post action=\"zhuxiao\" id=\"zhuxiao_form\"></form>";
	b += "<!--注销部分--->                                                                               \
			<div class=\"radius_rectangle my_button\" onClick=\"zhuxiao()\">注销登录</div>";
	b += "<!--设置界面--->                                                                               \
			<div class=\"radius_rectangle my_button\" onClick=\"shezhi()\">设置页面</div>";
	b += "<!--帮助界面--->                                                                               \
			<div class=\"radius_rectangle my_button\"><a style=\"color:#000\" href=\"./static/HTML/help.html\">帮助页面</a></div>";
	b += "<!--欢迎界面--->                                                                               \
			<div class=\"radius_rectangle my_button\"><a style=\"color:#000\" href=\"./static/HTML/welcome.html\">欢迎页面</a></div>";
	b += "<!--关于页面--->                                                                               \
			<div class=\"radius_rectangle my_button\"><a style=\"color:#000\" href=\"./static/HTML/about.html\">关于页面</a></div>";
	easyDialog.open({
	  container : {
		header : a,
		content : b
	  },
	  overlay:false,
	  lock:true
	});
}
