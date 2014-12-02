//JavaScript Document
//(result,subresult,name,head_image,citynum,mile)
var myUserName;
var myHead_image;
var myCitynum;
var myMile;

var myLineMin;
var myLineMax;

var map;
var geocoder;
var mapdrawer;
var directionsDisplay;
var directionsService;

var mapArray = new Array();
var lineArray = new Array();
var titleArray = new Array();
var tempArray = new Array();
var tempArray2 = new Array();

var mylineArray0 = new Array();
var mynameArray0 = new Array();
var myidArray0 = new Array();
var mybeizhuArray0 = new Array();
var mytitleArray0 = new Array();
var mytimeArray0 = new Array();

var mylineArray1 = new Array();
var mynameArray1 = new Array();
var myidArray1 = new Array();
var mybeizhuArray1 = new Array();
var mytitleArray1 = new Array();
var mytimeArray1 = new Array();

var sublineArray0 = new Array();
var subidArray0 = new Array();

var sublineArray1 = new Array();
var subidArray1 = new Array();

//星星图标
var goldStar = {
  path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
  fillColor: "gold",
  fillOpacity: 0.8,
  scale: 0.1,
  strokeColor: "gold"
};

function my_location(lat,lng){
  this.lat=lat;
  this.lng=lng;
}
