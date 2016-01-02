
var map;

function initialize() {
    var mapProp = {
        center: new google.maps.LatLng(37.4955208,127.0262779),
        zoom: 17,
        disableDefaultUI: true,
        mapTypeId:google.maps.MapTypeId.ROADMAP

    };

    map = new google.maps.Map(document.getElementById('map'), mapProp);
    console.log("어디가 먼저인가?");
    

    console.log("initialize : " + map);
    
    var input = /** @type {!HTMLInputElement} */
    (document.getElementById('pac-input'));
    var autocomplete = new google.maps.places.Autocomplete(input);
    
    autocomplete.bindTo('bounds', map);

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

        
        if (place.geometry.viewport) {
          map.fitBounds(place.geometry.viewport);
        } else {
          map.setCenter(place.geometry.location);
          map.setZoom(17);
        }

        marker.setPosition(place.geometry.location);
        marker.setVisible(true);
    });
    
    
    
    var keywordNo = sessionStorage.getItem("memberId");
    var keywordNos = JSON.parse(keywordNo);
    console.log(keywordNos);

    $(function() {
    	   $.getJSON('/trace/getmapList', function(data){
    		   
    	   console.log("getmapList");
           console.log(data);
           console.log(data.list[0].latitude);
           console.log(data.list[0].longtitude);
           
           moveToPlaces(data);
           
    		
    	   });
    	}); 
    
    
    function moveToPlaces(data){
    	console.log("");
    	console.log("여기는 moveToPlaces 들어오자 마자 좌표 날리는 곳");
    	console.log("위도"+data.list[0].latitude);
        console.log("경도"+data.list[0].longtitude);
        console.log("moveToPlaces : " + map);
    	
        for(var i=0; i<data.list.length; i++){
    		var la = data.list[i].latitude
    		var lo = data.list[i].longtitude
    		console.log("la ;; "+la);
    		console.log("lo :: "+lo);
    		var latlng = new google.maps.LatLng(la, lo);
    	
       var myOptions = {  
              zoom : 12,  
              center : latlng,  
              mapTypeId : google.maps.MapTypeId.ROADMAP  
      }  
         
      map.setCenter(latlng);
        
        var marker = new google.maps.Marker({
            map: map,
            anchorPoint: new google.maps.Point(latlng),
            animation: google.maps.Animation.DROP
        });
        marker.setPosition(latlng);
        marker.setVisible(true);
      }
   }



    $(function() {
    	   $.getJSON('/trace/getmapList', function(obj){
    		  var div;
    	      var templateSource = $("#boardTrTemplate").html();
    	      var template = Handlebars.compile(templateSource);
    	      
    	      div = template(obj);
    	      console.log(obj);
    	      $(div).appendTo("#addTr");
    	        
    	        
    	        
    	      $(".trace").click(function(){
    	       	   var traceNo = $(this).parent().find(".traceNo").val();
    	       	   console.log("ㅇㅇ"+traceNo);
    	       	    $.getJSON('/trace/selectmapList/'+traceNo, function(data){
    	       	    	  console.log("");
    	       	    	  console.log("여기는 moveToPlace 이미지 클릭시 좌표 뜨는곳");
    	             	  console.log(data.list[0].latitude);
    	                  console.log(data);
    	                  console.log(data.list[0].longtitude);
    	               
    	       	       moveToPlace(data);
    	       	    });
    	          });
    	  
    	    });
    	});
    
    
    
}


function moveToPlace(data){
	console.log("");
	console.log("여기는 moveToPlace 이미지 클릭시 좌표 뜨는곳");
	
	 console.log(data.list[0].latitude);
     console.log(data);
     console.log(data.list[0].longtitude);

    console.log("moveToPlace : " + map);
	var latlng = new google.maps.LatLng(data.list[0].latitude, data.list[0].longtitude);

    var myOptions = {  
          zoom : 12,  
          center : latlng,  
          mapTypeId : google.maps.MapTypeId.ROADMAP  
  }  
    //map = new google.maps.Map(document.getElementById("map"), myOptions);  
	map.setCenter(latlng);
    
    var marker = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(latlng),
        animation: google.maps.Animation.DROP
    });
    marker.setPosition(latlng);
    marker.setVisible(true);
   
}





////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



