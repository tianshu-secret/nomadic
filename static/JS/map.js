// JavaScript Document
//获取本机地址的位置信息，并以此为中心显示地图
function getMyLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
			displayLocation, 
			displayError);
	}
	else {
		alert("糟糕，您的浏览器不支持geolocation，请换用chrome或firefox");
	}
}

//显示地图，并向地图上增加监听
function displayLocation(position) {
	showMap(position.coords);
	addListener();
}

//地图初始化
function showMap(coords) {
	var googleLatAndLong = new google.maps.LatLng(coords.latitude, coords.longitude);
	var mapOptions = {      
		zoom: 7,                //缩放级别  
		center: googleLatAndLong,       
		mapTypeId: google.maps.MapTypeId.ROADMAP,   //ROADMAP-默认视图 SATELLITE-卫星图像 HYBRID-混合视图 TERRAIN-地形图 
		scaleControl: true,    //比例尺
		panControl: false,  //平移盘
		streetViewControl: false,   //街景小人
		mapTypeControl: true,    //卫星-街道地图转换
		mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
	};
	map = new google.maps.Map(document.getElementById("map"),mapOptions);
	//geocoder api与map同时生成
	geocoder = new google.maps.Geocoder();
	//绘图工具与地图同时生成
	mapdrawer = new google.maps.drawing.DrawingManager({
		drawingControl: true,
  		drawingControlOptions: {
    		position: google.maps.ControlPosition.TOP_CENTER,
			//图形绘制工具显示选项：折线、矩形、多边形，没有用到的选项还有：MARKER,默认必有的选项有：手型
    		drawingModes: [google.maps.drawing.OverlayType.POLYLINE, google.maps.drawing.OverlayType.CIRCLE,google.maps.drawing.OverlayType.RECTANGLE,google.maps.drawing.OverlayType.POLYGON]
  		}
	});
	mapdrawer.setMap(map);
}

//监听函数
function addListener(){
	//监听放置图标
	google.maps.event.addListener(map, 'click', function(event) {
	var googleLatAndLong = new google.maps.LatLng(event.latLng.lat(),event.latLng.lng()); 
    placeMarker(googleLatAndLong);
  });
	//监听获取路径
	google.maps.event.addListener(mapdrawer, 'overlaycomplete', function(event) {
	  if (event.type == google.maps.drawing.OverlayType.POLYLINE) {
		tempArray = event.overlay.getPath().getArray();
		lineArray.push(tempArray);
	  }
  });
}

//放置标记
function placeMarker(location) {
	 var marker = new google.maps.Marker({
      position: location,
	  //icon:goldStar,
      map: map
  });
	//将经纬度由小数点后10多位缩减成小数点后5位以方便保存
        var the_lat = Math.round(location.lat()*100000)/100000;
        var the_lng = location.lng().toFixed(5);	
	 //将新的标记存入数组中去
	 mapArray.push("\u0028"+the_lat+","+the_lng+"\u0029");
	 //清除标记操作
	 google.maps.event.addListener(marker, 'rightclick', function() {
    	marker.setMap(null);
		mapArray.splice(mapArray.indexOf(location),1);
		titleArray.splice(mapArray.indexOf(location),1);
	//infowindow.open(map,marker);
  });
	 //将标记所在位置的经纬度转化为省市名称
	 geocoder.geocode({'latLng': location}, function(results, status) {
         if (status == google.maps.GeocoderStatus.OK) {
		//有些地方可能很生僻根本没有市级名称或区级名称，但是有国级名称，这样的话需要特殊处理
		if(results.length < 4) {
			marker.setTitle(results[0].address_components[0].long_name);
                        titleArray.push(results[0].address_components[0].long_name);
		}
		//根据地图缩放比例来决定将经纬度转化为市级名称还是区/县级
		else if(map.getZoom() <= 7) {
			marker.setTitle(results[results.length-3].address_components[0].long_name);
			titleArray.push(results[results.length-3].address_components[0].long_name);
		}
		else {
			marker.setTitle(results[results.length-4].address_components[0].long_name);
			titleArray.push(results[results.length-4].address_components[0].long_name);
		}
         } else {
	 //Geocoder查不到地方的设为未知
	        marker.setTitle("未知");
	 	titleArray.push("未知");
         }
    });
	//向infowindow内写入详细信息
	var str1;
	var str2;
	var str;
	str1 = "<input type=\"text\" name=\"the_address\" value=\"";
	str2 = "\" ";
	str2 += "style=\"padding:10px 0px 0px 10px;border:none;font-size:20px\" ";
	str2 += "onFocus=\"if(value==defaultValue){value=\'\';this.style.color=\'#000\'}\" ";
	str2 += "onBlur=\" ";
        str2 += "if(value==\'\'){value=defaultValue;this.style.color=\'#999\'} ";
        str2 += "else{var the_button = document.getElementById(\'";
	str2 += "input_address" + the_lat + the_lng;
	str2 += "\'); ";
        str2 += " the_button.name=value;the_button.click();} ";
        str2 += "\" ";
	str2 += "/>";
	str = str1 + "编辑地名" + str2;

	//创建infowindow
	var infowindow = new google.maps.InfoWindow(
      	{   content: str,
            size: new google.maps.Size(50,50)
      	});
  	google.maps.event.addListener(marker, 'click', function() {
    	    infowindow.open(map,marker);
  	});

	//创建隐藏元素专门监听message
	var the_content = document.getElementById("content");
	var the_button = document.createElement("div");
	the_button.id = "input_address" + the_lat + the_lng;
	the_button.value = "\u0028"+the_lat+","+the_lng+"\u0029";
	the_button.style = "display:none";
	the_content.appendChild(the_button);

	//添加Message监听
	google.maps.event.addDomListener(the_button, 'click', function() {
    	    marker.setTitle(the_button.name);
	    str = str1 + the_button.name + str2;
    	    infowindow.setContent(str);
	    //根据the_button.value所记录的经纬度信息(location),更新titleArray
	    titleArray[mapArray.indexOf(the_button.value)] = the_button.name;
	});
}
//简版放置标记
function placeMarker_simple(location,the_id,the_title) {
         var marker = new google.maps.Marker({
      position: location,
      icon: "/a_test/static/image/Google_Maps_Markers/brown_MarkerO.png",
      title:the_title,
      zIndex:9900,
  });
	var the_button = document.getElementById(the_id);
         //添加标记监听
         google.maps.event.addDomListener(the_button, 'click', function() {
		if(marker.getMap())
			marker.setMap(null);
		else
        		marker.setMap(map);
  });
}

//按名查询地址并放置标记
function codeAddress(query) {
  	geocoder.geocode({'address': query}, function(results, status) {
   	 if (status == google.maps.GeocoderStatus.OK) {
		//转移地图中心到所查找地点
    	map.setCenter(results[0].geometry.location);
		//放置标记
    	var marker = new google.maps.Marker({
			animation: google.maps.Animation.DROP,
     		map: map,
     		position: results[0].geometry.location
    	});
		//将经纬度由小数点后10多位缩减成小数点后5位以方便保存
        var the_lat = Math.round(results[0].geometry.location.lat()*100000)/100000;
        var the_lng = results[0].geometry.location.lng().toFixed(5);
         //将新的标记存入数组中去
         mapArray.push("\u0028"+the_lat+","+the_lng+"\u0029");
		//清除标记操作
	 	google.maps.event.addListener(marker, 'rightclick', function() {
    		marker.setMap(null);
		mapArray.splice(mapArray.indexOf(location),1);
                titleArray.splice(mapArray.indexOf(location),1);
  		});
		//向title写入详细信息
		marker.setTitle(query);
		titleArray.push(query);

		//向infowindow内写入详细信息
    	attachMarkerMessage(marker, query);
   	}
	else {
    	alert("未能找到该地址: " + status);
   	}
  });
}

//像标记添加详细内容
function attachMarkerMessage(marker, message) {
  var infowindow = new google.maps.InfoWindow(
      { content: message,
        size: new google.maps.Size(50,50)
      });
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map,marker);
  });
}

//自动生成路线
function calcRoute() {
	//获取生成路线的选择框情况
	var qixing = document.getElementById("qixing");
	var youhua = document.getElementById("youhua");
	var bikai = document.getElementById("bikai");
	//alert(qixing.checked);
	//初始化路线服务和路线显示服务
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  //google maps自动生成路线免费版最多支持八个路标
  //if(mapArray.length>8)
  	//alert("google maps自动生成路线免费版最多支持八个路标！");
  //取起点和终点
  var start = mapArray.shift();
  var end = mapArray.pop();
  //取路标
  var waypts = [];
  for (var i = 0; i < mapArray.length; i++) {
	  waypts.push({
          location:mapArray[i],
          stopover:true
      });
  }
  //描述请求
  var request = {
    origin:start,
    destination:end,
	waypoints:waypts,
	optimizeWaypoints:false,
	provideRouteAlternatives: false,
    travelMode: google.maps.TravelMode.DRIVING,
	avoidHighways:false
  };
  //骑行判断
  if(qixing.checked)
  	request.travelMode = google.maps.TravelMode.WALKING;
  //优化判断
  if(youhua.checked)
  	request.optimizeWaypoints = true;
  //避开主要干道判断
  if(bikai.checked)
  	request.avoidHighways = true;
  //请求服务
  directionsService.route(request, function(result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(result);
    }
  });
  //展示请求
  directionsDisplay.setMap(map);
}
//按从数据库读取的信息生成路线
function lineWork(the_id){
	//放置标记
	 the_id = the_id+"image";
	 for(var i =0; i < tempArray.length-1; i++){
         var location = tempArray[i].split(",");
         var lat = location[0].substring(1,location[0].length-2);
         var lng = location[1].substring(0,location[1].length-2);
         var googlatlng = new google.maps.LatLng(lat,lng);
	placeMarker_simple(googlatlng,the_id,tempArray2[i]);
        }
}
function sublineWork(polyOptions,the_id){
        //新建折线
        var poly = new google.maps.Polyline(polyOptions);
        var the_button = document.getElementById(the_id);
        var the_image = document.getElementById(the_id+"image");
        //设置路线
        var path = poly.getPath();
         for(var i =0; i < tempArray.length-1; i++){
         var location = tempArray[i].split(",");
         var lat = location[0].substring(1,location[0].length-2);
         var lng = location[1].substring(0,location[1].length-2);
         var googlatlng = new google.maps.LatLng(lat,lng);
         path.push(googlatlng);
        }
        //添加折线的监听
        google.maps.event.addDomListener(the_image, 'click', function() {
                if(poly.getMap()) {
                    poly.setMap(null);
                    the_image.style.display="none";
                }
                else {
                    poly.setMap(map);
                    the_image.style.display="block";
                }
        });
}
//按照mylineArray0生成新的路线
function showXinLine(xin_index) {
	//获取数组
	var xinline = mylineArray0[xin_index];
	tempArray = xinline.split("!");
	xinline = mytitleArray0[xin_index];
	tempArray2 = xinline.split("!");
	//开始放置标记
	var the_id = "xin" + xin_index;
	lineWork(the_id);
}

//按照sublineArray0生成新的路线
function showSubXinLine(xin_index) {
        //获取数组
        var xinline = sublineArray0[xin_index];
        tempArray = xinline.split("!");
        //开始放置折线
        var polyOptions = {
           strokeColor: '#1d953f',
           strokeOpacity: 1.0,
           strokeWeight: 3,
	   zIndex:9800
        }
        var the_id = "xin" + myidArray0.indexOf(subidArray0[xin_index]);
        sublineWork(polyOptions,the_id);
}

//按照mylineArray1生成旧的路线
function showJiuLine(jiu_index) {
	var jiuline = mylineArray1[jiu_index];
	tempArray = jiuline.split("!");
	jiuline = mytitleArray1[jiu_index];
	tempArray2 = jiuline.split("!");
	//开始放置标记
	var the_id = "jiu" + jiu_index;
	lineWork(the_id);
}
//按照sublineArray1生成旧的路线
function showSubJiuLine(jiu_index) {
        //获取数组
        var jiuline = sublineArray1[jiu_index];
        tempArray = jiuline.split("!");
        //开始放置折线
        var polyOptions = {
           strokeColor: '#181d4b',
           strokeOpacity: 1.0,
           strokeWeight: 3,
	   zIndex:9800
        }
        var the_id = "jiu" + myidArray1.indexOf(subidArray1[jiu_index]);
        sublineWork(polyOptions,the_id);
}

//google api 错误信息
function displayError(error) {
	var errorTypes = {
		0: "Unknown error",
		1: "Permission denied",
		2: "Position is not available",
		3: "Request timeout"
	};
	var errorMessage = errorTypes[error.code];
	if (error.code == 0 || error.code == 2) {
		errorMessage = errorMessage + " " + error.message;
	}
	var div = document.getElementById("location");
	div.innerHTML = errorMessage;
}
