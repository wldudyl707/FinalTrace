var map;


var counthhhh = 0;
function initialize() {
$(document).on("shown.bs.modal",".onClickMap",function(){
	
	//$(document).on("click", '#desc' ,function () {
		 	 var traceNo = $(this).prev().attr("val");
		     console.log("traceNo : "+traceNo);
		     var thisThis = $(this).attr("id");
		     console.log("thisThis : "+thisThis);
		     var findMap = $(this).find(".map")[0];
		     console.log(findMap)
				
				 $.getJSON('/trace/selectmapList/'+traceNo, function(data){
					
					 console.log(data);
					 
					 var lat = data.list[0].latitude;
					 var log = data.list[0].longtitude; 
					 
			  	     var latlng = new google.maps.LatLng(lat, log);
			  	     console.log(lat);
			  	     console.log(log);
			  	   
			  	   var map = new google.maps.Map(findMap, {
			  		    zoom: 17,
			  		    center: latlng
			  		  });
			  	   
			  	  var suIcon = new google.maps.MarkerImage("/images/markers.png", null, null, null, new google.maps.Size(100,100));
			   	  var marker = new google.maps.Marker({
			   	  map: map,
			   	  animation: google.maps.Animation.DROP,
			   	 icon : suIcon 
			    	
			   });
			   	 marker.setPosition(latlng);
			   	 
				});

		//});
	});
}



	 
	








