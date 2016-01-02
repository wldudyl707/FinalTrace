var map;
var markers =[];


function initialize() {
	console.log("dd");
	var latlng = new google.maps.LatLng(37.4955208,127.0262779);
	var mapProp = {
        center : latlng,
        zoom: 17,
        disableDefaultUI: true,
        mapTypeId:google.maps.MapTypeId.ROADMAP

    };

    map = new google.maps.Map(document.getElementById('map'), mapProp);

    var input = /** @type {!HTMLInputElement} */
    (document.getElementById('pac-input'));
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);

    var geocoder = new google.maps.Geocoder(); 
    var infowindow = new google.maps.InfoWindow();
    
   
    var marker = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29),
        animation: google.maps.Animation.DROP
    });
    
    

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    window.onresize = function () {
        lastCenter = map.getCenter();
        google.maps.event.trigger(map, 'resize');
        map.setCenter(lastCenter);
    }

    autocomplete.addListener('place_changed', function() {
        infowindow.close();
        console.log("왔니");
        marker.setVisible(false);
        var place = autocomplete.getPlace();
        if (!place.geometry) {
          window.alert("Autocomplete's returned place contains no geometry");
          return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
          map.fitBounds(place.geometry.viewport);
        } else {
          map.setCenter(place.geometry.location);
          map.setZoom(17);  // Why 17? Because it looks good.
        }

        //marker.setPosition(place.geometry.location);
        marker.setVisible(true);
    });
    
    $.jStorage.set("wlatitude",null);
    $.jStorage.set("wlongtitude",null);
    
   google.maps.event.addListener(map, 'click', function(event) {

	   deleteMarkers();
       placeMarker(event.latLng);
      
       
	   var location = event.latLng;  
       geocoder.geocode({  
           'latLng' : location  
       },  
       function(results, status){  
           if( status == google.maps.GeocoderStatus.OK ) {
               console.log("위도"+results[0].geometry.location.lat());
               console.log(results[0].geometry.location.lng());
               $.jStorage.set("wlatitude", results[0].geometry.location.lat());
               $.jStorage.set("wlongtitude", results[0].geometry.location.lng());
           }  
           else {  
               alert("Geocoder failed due to: " + status);  
           }  
       }); 
      
     
       
     
   });
}


function drawPolyLine(){
    var drawingManager = new google.maps.drawing.DrawingManager({
    drawingMode: google.maps.drawing.OverlayType.MARKER,
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: [
        google.maps.drawing.OverlayType.MARKER,
        google.maps.drawing.OverlayType.CIRCLE,
        google.maps.drawing.OverlayType.POLYGON,
        google.maps.drawing.OverlayType.POLYLINE,
        google.maps.drawing.OverlayType.RECTANGLE
      ]
    },
    markerOptions: {icon: 'img/logo.png'},
    circleOptions: {
      fillColor: '#ffff00',
      fillOpacity: 1,
      strokeWeight: 5,
      clickable: false,
      editable: true,
      zIndex: 1
    }
  });
  drawingManager.setMap(map);
}





function placeMarker(location) {
	
	  var marker = new google.maps.Marker({
	      position: location, 
	      draggable:true,
	      animation:google.maps.Animation.DROP,
	      map: map
	  });
	  markers.push(marker);
	  map.setCenter(location);
	  
	}


function setMapOnAll(map) {
	  for (var i = 0; i < markers.length; i++) {
	    markers[i].setMap(map);
	  }
	}
	 
	// Removes the markers from the map, but keeps them in the array.
	function clearMarkers() {
	  setMapOnAll(null);
	}
	 

	 
	// Deletes all markers in the array by removing references to them.
	function deleteMarkers() {
	  clearMarkers();
	  markers = [];
	}
	
	

////////////////////////////////////////친구 상단바 알림//////////////////////////////////////

$(function(){
$.ajax({
type:"POST",
async: false,
headers : 
{
"Accept" : "application/json",
"Content-Type" : "application/json"
},
data: JSON.stringify
({

//friendMemberId : keywordNos
friendId : keywordNos
}),
url:"/friend/listFriend",
dataType:"json",
success : function(data){
/*console.log(data.list[0].friendMember.stoImgName);*/
if(data.list.length > 0){
for(i=0 ; i<data.list.length ; i++){
if(data.list[0].friendState == 1){
var div;
var templateSource = $("#friendTemplate").html();
var template = Handlebars.compile(templateSource);
div = template(data);

$("#friendList").append(data.listsize);

/*console.log(div);*/

$(".friend-header").after(div);
}else{
$("#friendList").append("0");
}
}
}else{
$("#friendList").append("0");
}

}
});
});
/////////////////////////////////수락////////////////////////////////////  

$(document).on("click","#agree",function(){
var agRemove = $(this).parent().parent().parent().attr("class");
console.log(agId);
var agId = $(this).prev().text();

$.ajax({
type:"POST",
async: false,
headers : 
{
"Accept" : "application/json",
"Content-Type" : "application/json"
},
data: JSON.stringify
({

friendMemberId : agId,
friendId : keywordNos       	   

}),
url:"/friend/agreeFriend",
dataType:"json",
success : function(data){

$("."+agId).attr("class","fa fa-user-times fa-lg "+agId);
$("."+agRemove).remove();


}
});
});
////////////////////////////////////거절////////////////////////////////////   
$(document).on("click","#disAgree",function (){
var disAgRemove = $(this).parent().parent().parent().attr("class");
var disAgId = $(this).prev().prev().text();

$.ajax({
type:"POST",
async: false,
headers : 
{
"Accept" : "application/json",
"Content-Type" : "application/json"
},
data: JSON.stringify
({

friendMemberId : disAgId,
friendId : keywordNos       	   

}),
url:"/friend/disAgreeFriend",
dataType:"json",
success : function(data){

$("."+disAgId).attr("class","fa fa-user-plus fa-lg "+disAgId);
$("."+disAgRemove).remove();


}
});
});






