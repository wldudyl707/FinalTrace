var map;
var markers =[];

function initialize() {
   window.onresize = function () {
        lastCenter = map.getCenter();
        google.maps.event.trigger(map, 'resize');
        map.setCenter(lastCenter);
    }
         
   var mapProp = {
      zoom:15,
      disableDefaultUI:true,
      mapTypeId:google.maps.MapTypeId.ROADMAP
   }
     
   map = new google.maps.Map(document.getElementById('map'), mapProp);
    
   if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(function(position){
         var latitude = position.coords.latitude;
         var longitude = position.coords.longitude;
                  
         initialLocation = new google.maps.LatLng(latitude, longitude);
         map.setCenter(initialLocation);
      });
   }
       
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
      
    var markers=[];
   // Listen for the event fired when the user selects a prediction and retrieve
   // more details for that place.
   searchBox.addListener('places_changed', function(){
      var places= searchBox.getPlaces();
      
      if(places.length==0){
         return;
      }
      
      markers.forEach(function(marker){
         marker.setMap(null);
      });
      
      markers=[];
      
      // For each place, get the icon, name and location.
      var bounds = new google.maps.LatLngBounds();
       places.forEach(function(place) {
         
         var icon = new google.maps.MarkerImage("/images/mymarker.png", null, null, null, new google.maps.Size(100,100));
         
         // Create a marker for each place.
         markers.push(new google.maps.Marker({
           map: map,
           icon: icon,
           title: place.name,
           position: place.geometry.location
           
         }));

         if (place.geometry.viewport) {
           // Only geocodes have viewport.
           bounds.union(place.geometry.viewport);
         } else {
           bounds.extend(place.geometry.location);
         }

          map.setCenter(bounds.getCenter());
           $.jStorage.set("latitude",place.geometry.location.lat());
           $.jStorage.set("longtitude",place.geometry.location.lng());
         
       });

        moveToPlace();      
   });
    
    var keywordNo = sessionStorage.getItem("memberId");
    var keywordNos = JSON.parse(keywordNo);
}

function moveToPlace(){
   console.log("");
   console.log("여기는 moveToPlaces 들어오자 마자 좌표 날리는 곳");
   console.log($.jStorage.get("latitude"));
   console.log($.jStorage.get("longtitude"));
   var latitude = $.jStorage.get("latitude");
   var longitude = $.jStorage.get("longtitude");
   
   var kmInLongitudeDegree = 111.320 * Math.cos(latitude / 180.0 * Math.PI);
    var deltaLat = 5 / 111.1;
    var deltaLong = 5 / kmInLongitudeDegree;
    
    var minLat = latitude - deltaLat;
    var maxLat = latitude + deltaLat;
    var minLong = longitude - deltaLong;
    var maxLong = longitude + deltaLong;
    
    console.log(minLat+', '+minLong+' / '+maxLat+', '+maxLong);
   
    $.ajax({
         url:'/trace/selectTraceRadius',
         data: JSON.stringify({
             minLatitude : minLat,
             minLongitude: minLong,
             maxLatitude : maxLat,
             maxLongitude: maxLong
         }),
         type:'POST',
         headers : 
          {
                "Accept" : "application/json",
                "Content-Type" : "application/json"
          },
         dataType: 'json',
             success : function(data){
                
               console.log(data);
             
               /*stateDisplay();*/
               
             var div;
              var templateSource = $("#boardTrTemplate").html();
              var template = Handlebars.compile(templateSource);
              div = template(data);
              $("#addTr").children().remove();  
              $("#addTr").append(div).hide().show( "slide", {direction: "left" }, 1000 );
              
              
             var div;
              var templateSource = $("#boardTrTemplate2").html();
              var template = Handlebars.compile(templateSource);
              div = template(data);
              $("#members").children().remove();  
              $("#members").append(div).hide().show( "slide", {direction: "left" }, 1000 );
              
              for(i=0 ; i<data.list.length ; i++){
                  if(data.list[i].member.memberId == keywordNos){
                   console.log("내이름 : "+keywordNos);
                   $("#"+keywordNos).remove();
                  }
                  ////////////////////////////////////////////////////////////////////////////////////////////////
                  if((data.list[i].friend.friendId == keywordNos) && ((data.list[i].friend.friendState) == 1)){
                   console.log("프렌트리스트왔나요1 :"+(data.list[i].friend.friendMemberId));
                   $("."+data.list[i].friend.friendMemberId).attr("class","fa fa-google-wallet fa-lg "+data.list[i].friend.friendMemberId);
                   
                  }
                  
                  if((data.list[i].friend.friendMemberId == keywordNos) && ((data.list[i].friend.friendState) == 1)){
                   $("."+data.list[i].friend.friendId).attr("class","fa fa-google-wallet fa-lg "+data.list[i].friend.friendId);
                  }
                  ////////////////////////////////////////////////////////////////////////////////////////////////
                  ////////////////////////////////////////////////////////////////////////////////////////////////
                 if((data.list[i].friend.friendId == keywordNos) && ((data.list[i].friend.friendState) == 2)){
                   console.log("프렌트리스트왔나요1 :"+(data.list[i].friend.friendMemberId));
                   $("."+data.list[i].friend.friendMemberId).attr("class","fa fa-user-timesfa-lg "+data.list[i].friend.friendMemberId);
                   
                  }
                  
                  if((data.list[i].friend.friendMemberId == keywordNos) && ((data.list[i].friend.friendState) == 2)){
                   $("."+data.list[i].friend.friendId).attr("class","fa fa-user-times fa-lg "+data.list[i].friend.friendId);
                  }
                  
                  
                  ////////////////////////////////////////////////////////////////////////////////////////////////
               }
              $(".fa-google-wallet").on("click",function(){
                 alert("친구요청 대기중입니다.");
             });
           
           for(var i=0; i<data.list.length; i++){
              var traceNo = data.list[i].traceNo;
              var la = data.list[i].latitude
              var lo = data.list[i].longtitude
              console.log("la ;; "+la);
              console.log("lo :: "+lo);
              var latlng = new google.maps.LatLng(la, lo);


           map.setCenter(latlng);
           var suIcon = new google.maps.MarkerImage("/images/markers.png", null, null, null, new google.maps.Size(100,100));
           var marker = new google.maps.Marker({
            map: map,
            animation: google.maps.Animation.DROP,
            icon : suIcon
           });
           
           marker.set("id", traceNo);
           marker.setPosition(latlng);
           marker.setVisible(true);
           
           var infowindows = new google.maps.InfoWindow();
            
           marker.addListener('click',(function(marker,i){
              return function(){
                 console.log(marker);
                 console.log(marker.getPosition().lat());
                 console.log(marker.getPosition().lng());
                 console.log(marker.id);
                 var traceNo = marker.id;
                 $.getJSON('/trace/selectmapList/'+traceNo, function(data){
                        
                         console.log(data);
                         console.log("난 뭐지"+data.list[0].stoImgName);
                         console.log(data.list[0].stoImgName);
                         var contentString = '<img src="trace_thumb/'+data.list[0].stoImgName+ '" width="100%" height="100px">';
                          infowindows.setContent(contentString);
                          infowindows.open(map, marker);
                        
                     });
                  
              }
           })(marker,i));
           
           markers.push(marker);
           
           }
           
        }
                    
     });
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

   // Shows any markers currently in the array.
   function showMarkers() {
     setMapOnAll(map);
   }

   // Deletes all markers in the array by removing references to them.
   function deleteMarkers() {
     clearMarkers();
     markers = [];
   }
   
   
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
              memberId: keywordNos
           }),
           url:"/member/getJsonMember",
           dataType:"json",
           success : function(data){
              $("#centereds").append(data.member.memberId);
              $(".img-circle").attr("src", "mem_thumb/"+data.member.stoImgName);

           }
        });
  });

$(function(){
       $.getJSON('/reply/alramReply',{ id : keywordNos }, function(data){
          //console.log(data.alramcount);
          console.log(data.alramlist);
          var listsize = data.alramlist.length;
          $("#arlam").append(listsize);
          
         var div;
        var templateSource = $("#alramTemplate").html();
        var template = Handlebars.compile(templateSource);
        div = template(data);
        console.log(div);
        
        $("#alram").append(div);
          
       });
      
   });


//////////////////////////////////////요청//////////////////////////////
$(document).on("click",".fa-user-plus",function(){
   
   var faThis = $(this).attr("id");
   
   var frId = $(this).attr("id");
   var frBtn = $(this).attr("class");
   console.log(frId);
   
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
          //memberId: keywordNos
          friendMemberId : keywordNos,
          friendId : frId,
          friendState : '1'
          
       }),
       url:"/friend/addFriend",
       dataType:"json",
       success : function(data){
          
          $("."+faThis).attr("class","fa fa-google-wallet fa-lg "+faThis);
          
          $(".fa-google-wallet").on("click",function(){
            alert("친구요청 대기중입니다.");
        });
          
          //$("."+frBtn).attr("display","none");
          //$(".img-circle").attr("src", "mem_thumb/"+data.member.stoImgName);*/
          
          

       }
    });
    
   
});

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

/////////////////////////////////////친구삭제///////////////////////////////////////

$(document).on("click",".fa-user-times",function (){
   
   if(confirm("친구를 삭제 하시겠습니까?")){

   var deleteFr = $(this).attr("id");
   
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
          
          friendMemberId : deleteFr,
          friendId : keywordNos             

       }),
       url:"/friend/deleteFriend",
       dataType:"json",
       success : function(data){
          
          $("."+deleteFr).attr("class","fa fa-user-plus fa-lg "+deleteFr);
          
        

       }
    });
   }
});

$(document).on("click",".details",function(){
   var traceNo = $(this).parent().find(".traceNo").val();
   var addr = $(this).parent().find(".addr").val();
   console.log("traceNo"+traceNo);
   
   $.getJSON('/trace/selectmapList/'+traceNo, function(data){
      console.log(data.list[0].latitude);
       console.log(data);
       console.log(data.list[0].longtitude);
       
       moveToselect(data);
   });
});

function moveToselect(data){
   
   
   console.log("");
   console.log("여기는 moveToselect 클릭시 좌표 뜨는곳");

   console.log(data.list[0].latitude);
   console.log(data);
   console.log(data.list[0].longtitude);       
   console.log("moveToPlace : " + map);
   
   var div;
    var templateSource = $("#boardTrTemplate").html();
    var template = Handlebars.compile(templateSource);
    div = template(data);
    $("#addTr").children().remove();  
    $("#addTr").append(div).hide().show( "slide", {direction: "left" }, 1000 );
   
   
   var latlng = new google.maps.LatLng(data.list[0].latitude, data.list[0].longtitude);
   map.setCenter(latlng);
   
   
    var suIcon = new google.maps.MarkerImage("/images/maker2.png", null, null, null, new google.maps.Size(30,40));

    for(var i=0; i<markers.length; i++){
        if(markers[i].id == data.list[0].traceNo){
           for(var j=0; j<markers.length; j++){
              markers[j].setAnimation(null);
           }
            markers[i].setAnimation(google.maps.Animation.BOUNCE);
            break;
        }   
    }
}

$(document).on("click",".fa-picture-o",function(){
   
   var memberId = $(this).parent().attr('value');
   console.log("안녕"+memberId);
   
   location.href="newgallery.html?memberId="+memberId;
   
});

$(document).on("click", "#centereds", function(){
	   console.log("첫걸음");
	   location.href="updatemember.html";
	});