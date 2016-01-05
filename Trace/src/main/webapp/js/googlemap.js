var map;
var markers =[];

function initialize() {
   window.onresize = function () {
        lastCenter = map.getCenter();
        google.maps.event.trigger(map, 'resize');
        map.setCenter(lastCenter);
    }
         
   var mapProp = {
      zoom:17,
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
    $.jStorage.set("latitude",null);
    $.jStorage.set("longtitude",null);
   // Listen for the event fired when the user selects a prediction and retrieve
   // more details for that place.
   searchBox.addListener('places_changed', function(){
	   
	   deleteMarkers();
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
	
	 deleteMarkers();
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
            	 $("#owl-demo").remove();
            	 $(".memberTable").after("<div id='owl-demo' style='position: absolute;' class='owl-ca'></div>");
            	 Handlebars.registerHelper('imgTag', function(stoImgName, traceNo) {
 	       			console.log("스토어이미지네임");
 	       			console.log(stoImgName);
 	       			console.log(traceNo);
 	       			var imgName = [];
 	       			imgName = stoImgName.split(",");
 	       			var imgTag='';
 	       			var imgCount = imgName.length - 1;
 	       	     	if(imgName.length == 1){
 	       				imgTag = "<div class='item mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored modal__trigger "+traceNo+"' name='"+imgCount+"' data-toggle='modal' data-target='#myModal"+traceNo+"' value='"+traceNo+"' role='true'><img src='trace_thumb/"+imgName[0]+"' alt='Owl Image' value='"+traceNo+"' class='replycount'></div>";
 	       			}
 	       	     	
 	       	     	else if(imgName.length >= 2){
 	       	     		
 	       				imgTag += "<div class='item mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored modal__trigger "+traceNo+"' name='"+imgCount+"' data-toggle='modal' data-target='#myModal"+traceNo+"' value='"+traceNo+"' role='true'><img src='trace_thumb/"+imgName[0]+"' alt='Owl Image' value='"+traceNo+"' class='replycount'></div>";
 	       				//imgTag += "<div class='count' style='position:absolute;top: 40px;right: 135%; font-size:300%; font-weight:bolder; color:white;'>+"+(imgName.length-1)+"</div>";
 	       	     	
 	       	     	}
 	       			
 	       			return imgTag;
 	       			
 	       		});
            	 
            	 Handlebars.registerHelper('carouselImg', function(stoImgName) {
            		 console.log("캐러셀");
            		 console.log(stoImgName);
            		 var carouselName = [];
            		 carouselName = stoImgName.split(",");
            		 var carouselTag='';
            		 console.log(carouselName.length)
            		 if(carouselName.length == 1){
            		 	carouselTag += "<div class='item active modalItem'>"+
            		 					"<img src='trace_thumb/"+carouselName[0]+"' width='100%' height='400' class='carousel-img'>"+
            		 					"</div>";
            		 }

            		 else if(carouselName.length > 1){
            		 	carouselTag += "<div class='item active modalItem'>"+
            		 					"<img src='trace_thumb/"+carouselName[0]+"' width='100%' height='400'class='carousel-img'>"+
            		 					"</div>";
            		 	for(var i=1 ; i<carouselName.length ; i++){
            		 		carouselTag += "<div class='item modalItem'>"+
            		 			"<img src='trace_thumb/"+carouselName[i]+"' width='100%' height='400' class='carousel-img'>"+
            		 			"</div>";
            		 	}				
            		 	
            		 }

            		 return carouselTag;

            		 });  
            	 
 	       	  
         	  var div;
               var templateSource = $("#boardTrTemplate").html();
               var template = Handlebars.compile(templateSource);
               div = template(data);
               $("#owl-demo").append(div);
               
               var modal;
               var templateSource = $("#boardTrTemplateModal").html();
               var template = Handlebars.compile(templateSource);
               modal = template(data);
               //$("#owl-demo").children().empty(); 
               $("#owl-demo").after(modal);
               	 
               var owl = $("#owl-demo")
             	  owl.owlCarousel({
             	     
             		 items : 9,
             	     /*itemsDesktop : [1199,3],
             	     itemsDesktopSmall : [979,3],*/
             	      
             	    navigation:false,
             	    pagination:true
             	  });
               
               $(document).on("click",".item",function() {
            	   		console.log("sfsf");
            	   		
            	   var data = $(this).attr("value");
            	   console.log(data);
            	   var owl = $(this).parents("#main-content").find("#myModal"+data).find(".owl-carousel");
            	   console.log(owl);
            	   owl.owlCarousel({
            	     navigation : true,
            	     singleItem : true,
            	     transitionStyle : "backSlide"
            	   });

            	   });
               
               $(document).on("mouseenter",".item",function() {
            		$(this).attr("style","-webkit-filter:grayscale(70%);-moz-filter: grayscale(70%);-ms-filter: grayscale(70%);-o-filter: grayscale(70%);filter: grayscale(70%);");
            		
            		var ch = $(this).attr("name");
            		
            		if($(this).attr("name") == 1){
            			
            			$(this).children().after("<div class='count' style='position:absolute; top:66%; right:1%; font-size:350%; font-weight:bolder; color:white;'>+"+ch+"</div>");
            		}
            		
            		else if($(this).attr("name") > 1){
            			
            			$(this).children().after("<div class='count' style='position:absolute; top:66%; right:1%; font-size:350%; font-weight:bolder; color:white;'>+"+ch+"</div>");
            		}
            		
            		
            	});

            	$(document).on("mouseleave",".item",function() {
            		$(this).attr("style","none");
            		$(this).find(".count").remove();
            	});

            	$(document).on("click",".item",function() {
            		$(this).attr("style","none");
            		$(this).find(".count").remove();
            	});
              
              
              var divs;
              var templateSource = $("#boardTrTemplate2").html();
              var template = Handlebars.compile(templateSource);
              divs = template(data);
              $("#members").children().remove();  
              $("#members").append(divs).hide().show( "slide", {direction: "left" }, 1000 );
              $(".memberTable").children("#memberTable").remove();
              $(".memberTable").prepend("<h3 id='memberTable'>TEAM MEMBERS</h3>");
              
              console.log("ss"+$.jStorage.get("latitude"));
              console.log("dd"+$.jStorage.get("longtitude"));
              
              var newlalng = new google.maps.LatLng($.jStorage.get("latitude"),$.jStorage.get("longtitude"));
              $("h3").attr("value",newlalng);
              
              for(i=0 ; i<data.list.length ; i++){
                  if(data.list[i].member.memberId == keywordNos){
                   console.log("내이름 : "+keywordNos);
                   $("#"+keywordNos).remove();
                  }
                  
                  if(data.list[i].member.memberId == keywordNos){
                      console.log("내이름 : "+keywordNos);
                      $("#gallery"+keywordNos).remove();
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


          /* map.setCenter(latlng);*/
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
   var owl = $(this);
   console.log("traceNo"+traceNo);
   
   $.getJSON('/trace/selectmapList/'+traceNo, function(data){
      console.log(data.list[0].latitude);
       console.log(data);
       console.log(data.list[0].longtitude);
       $("#owl-demo").remove();
       $(".memberTable").after("<div id='owl-demo' style='position: absolute;' class='owl-ca'></div>");
       /*moveToselect(data);*/
       var i=0;
       Handlebars.registerHelper('imgTagBottom', function(stoImgName, traceNo) {
   			console.log("스토어이미지네임찍히는것인가?");
   			console.log(stoImgName);
   			console.log(traceNo);
   			var imgName = [];
   			imgName = stoImgName.split(",");
   			var imgTag='';
   			
   			imgTag = "<div class='item mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored modal__trigger' data-toggle='modal' data-target='#myModalBottom"+i+"' value='"+traceNo+"' id='"+i+"'><img src='trace_thumb/"+imgName[0]+"' alt='Owl Image' value='"+traceNo+"'></div>";
   			i++;
   			
   			return imgTag;
   			
   		});
       
       Handlebars.registerHelper('carouselImgBottom', function(stoImgName) {
  		 console.log("캐러셀");
  		 console.log(stoImgName);
  		 var carouselName = [];
  		 carouselName = stoImgName.split(",");
  		 var carouselTag='';
  		 console.log(carouselName.length)
  		 for(var i=0 ; i < carouselName.length ; i++){
  		 	carouselTag += "<div class='item active modalItem'>"+
  		 					"<img src='trace_thumb/"+carouselName[i]+"' width='100%' height='400' class='carousel-img'>"+
  		 					"</div>";
  		 }

  		 return carouselTag;

  		 });  
       
       var div;
       var templateSource = $("#boardTrTemplateBottom").html();
       var template = Handlebars.compile(templateSource);
       div = template(data);
       $("#owl-demo").append(div);
       
       var modal;
       var templateSource = $("#boardTrTemplateModal2").html();
       var template = Handlebars.compile(templateSource);
       modal = template(data); 
       $("#owl-demo").after(modal);
       
       $("#owl-demo").owlCarousel({
   	     
   		 items : 9,
   	     /*itemsDesktop : [1199,3],
   	     itemsDesktopSmall : [979,3],*/
   	      
   	    navigation:false,
   	    pagination:false
   	  });
       
       $(document).on("click",".item",function() {
	   		console.log("바텀모달");
	   		
	   var data = $(this).attr("id");
	   console.log(data);
	   var owl = $(this).parents("#main-content").find("#myModalBottom"+data).find(".owl-carousel");
	   console.log(owl);
	   owl.owlCarousel({
	     navigation : true,
	     singleItem : true,
	     transitionStyle : "backSlide"
	   });

	   });
      
      
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
   });
});

/*function moveToselect(data){
   
   
   console.log("");
   console.log("여기는 moveToselect 클릭시 좌표 뜨는곳");

   console.log(data.list[0].latitude);
   console.log(data);
   console.log(data.list[0].longtitude);       
   console.log("moveToPlace : " + map);
   
   Handlebars.registerHelper('imgTagBottom', function(stoImgName, traceNo) {
			console.log("스토어이미지네임찍히는것인가?");
			console.log(stoImgName);
			console.log(traceNo);
			var imgName = [];
			imgName = stoImgName.split(",");
			var imgTag='';
	     	for(var i=0 ; i<imgName.length ; i++){
	     		imgTag += "<div class='item mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored modal__trigger' data-modal='#modal"+traceNo+"'><img src='trace_thumb/"+imgName[i]+"' alt='Owl Image' value='"+traceNo+"'></div>";
	     	}
			
			return imgTag;
			
		});
   
   var divOwl;
    var templateSource = $("#boardTrTemplateBottom").html();
    var template = Handlebars.compile(templateSource);
    divOwl = template(data);
    $(".owl-ca").children().remove(); 
    $(".owl-ca").append(divOwl);
    
    //var owlBottom = $("#owl-demo")
	  $(".owl-ca").owlCarousel({
	     
		 items : 9,
	     itemsDesktop : [1199,3],
	     itemsDesktopSmall : [979,3],
	      
	    navigation:false,
	    pagination:false
	  });
   
   
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
}*/

$(document).on("click",".fa-picture-o",function(){
   
   var memberId = $(this).parent().attr('value');
   console.log("안녕"+memberId);
   
   location.href="newgallery.html?memberId="+memberId;
   
});

$(document).on("click", "#centereds", function(){
	   console.log("첫걸음");
	   location.href="updatemember.html";
	});


$(document).on("click", "#memberTable", function(){
	   console.log("안녕");
	   moveToPlace();
	   
	});

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////댓글//////////////////////
$(document).on("click", "#create", function(){
   
    
 var test = $(this).prev().prev().attr('class');
 var text = $(this).prev().children().attr('id');
 
 var replycount = $(this).parents(".modal-content").find(".fa-comment").text();
 var replylocation = $(this).parents(".modal-content").find(".fa-comment").attr('id');
 console.log("ddddddddddddddddddddd"+replylocation);
 
 //console.log(test);
 //console.log($(this).prev().children().attr('id'));
 
var pos=$(this).position().top;

$(this).prev().prev("#footerscroll").animate({scrollTop:pos},'slow');

      $.ajax({
            type:"POST",
            async:false,
            headers : {
               "Accept" : "application/json",
               "Content-Type" : "application/json"
            },
            data: JSON.stringify({
               comm : $(this).prev().children().html(),
               traceNo : $(this).attr('value'),
               id : keywordNos,
               repLevel : "1"
            }),
            url:"/reply/jsonAddReply",
            dataType:"json",
            success:function(data){
               console.log(data);
               var div;
               var templateSource = $("#replyTemplate").html();
               var template = Handlebars.compile(templateSource);
                console.log(template);
                div = template(data);
                
                $(div).appendTo("."+test).fadeOut().fadeIn();
                console.log("dddddddddddddss"+replycount);
                //$(div).appendto(.modal0)
                var count = (replycount-0)+1;
                
                console.log("dddsauwdas"+count);
                $("#"+text).empty(); 
                
                $("#"+replylocation).text(count);
                //$("#texteditor").html("");
            
            }
         });    
});


$(document).on("click", "#trash", function(){
	
	var result = confirm('정말로 삭제 하시겠습니까?');

    if(result) {
       //yes
    	var del = $(this).parent().attr('value');
    	console.log(del);
    	
    	var delText = $(this).next().next();
    	      $.ajax({
    	            type:"POST",
    	            headers : {
    	               "Accept" : "application/json",
    	               "Content-Type" : "application/json"
    	            },
    	            data: JSON.stringify({
    	               commNo : del    
    	            }),
    	            
    	            url:"/reply/jsonDeleteReply",
    	            dataType:"json",
    	            success:function(data){
    	            	
    	            
    	            if(data.result == '1'){
    	            delText.text("삭제된 댓글입니다.");
    	            }else{
    	            	console.log("실패했쪙");
    	            }
    	            	
    	            }
    	         });    
    	      
    } else {
       //no
    }
	
	
	});
	
	
	
	
////////////////////////댓글의 댓글//////////////////////////
$(document).on("click", "#pencil" , function() {
   $(this).parent().parent().parent().parent().parent().children("#wtext").children(".texteditor").hide();
   $(this).parent().parent().parent().parent().parent().children("#wtext").next().hide();
   $(".commtextarea").remove();
   
  
    var parent = $(this).parent().parent().parent();
    
    console.log(parent);
    
    
    var templateSource = $("#replyTemplate01").html();
    var template = Handlebars.compile(templateSource);
    
    console.log(template);

    //$(div).appendTo(parent);
     
    parent.after(template); 
});


$(document).on("click", "#commcreate", function(){
   console.log("클릭을 합시다 이야이야호");
   var test2 = $(this).parent().parent().attr('class');
   var buttons = $(this).attr('id');
   var test3 = $(this).parent().parent().prev();
   var displaybar = $(this).parent().parent().parent().parent().children('#create').attr('class');
   var displaytext = $(this).parent().parent().parent().parent().children('#wtext').children().attr('class');
   var commNo = $(this).parent().parent().prev().children('.media').children('.media-body').attr('value');
   console.log(commNo);
   
   var cdcd = $(this).parent().parent().prev().children();
   var i = cdcd.length;
   console.log(cdcd);
    console.log(i);
   //console.log(displaybar);
   //console.log(displaytext);
   
   
   
    $.ajax({
   
       type:"POST",
         async:false,
         headers : {
            "Accept" : "application/json",
            "Content-Type" : "application/json"
         },
         data: JSON.stringify({
             comm : $(this).parent().parent().children('.recommt').children('.commtexteditor').html(),
             traceNo : $(this).parents('.modal-content').find('.owl-carousel').attr("value"),
             repNo : commNo,
             repLevel : "2",
             id : keywordNos
          }),
          url:"/reply/jsonAddReply",
          dataType:"json",
          success:function(data){
             console.log("왔어욤");
             console.log(data);
           var test;
              var templateSource = $("#replyTemplate02").html();
              var template = Handlebars.compile(templateSource);
              
              test = template(data);        
              
              $(test).appendTo(test3).fadeOut().fadeIn();
              
              $("."+test2).remove();
              //$("."+displaybar).attr("style", "display");
              //$("."+displaytext).attr("style", "display; width:70%; height:50px");
              $("."+displaybar).show(500);
              $("."+displaytext).show(500);
          }
   }); 
      
});

$(document).on("click", "#child-trash", function(){
	
	var result = confirm('정말로 삭제 하시겠습니까?');

    if(result) {
       //yes
    	var del = $(this).parent().attr('value');
    	console.log(del);
    	
    	var delText = $(this).next().next();
    	      $.ajax({
    	            type:"POST",
    	            headers : {
    	               "Accept" : "application/json",
    	               "Content-Type" : "application/json"
    	            },
    	            data: JSON.stringify({
    	               commNo : del    
    	            }),
    	            
    	            url:"/reply/jsonDeleteReply",
    	            dataType:"json",
    	            success:function(data){
    	            	
    	            
    	            if(data.result == '1'){
    	            delText.text("삭제된 댓글입니다.");
    	            }else{
    	            	console.log("실패했쪙");
    	            }
    	            	
    	            }
    	         });    
    	      
    } else {
       //no
    }
	
	
	});



////////////////////////댓글의 댓글의 댓글//////////////////////////
$(document).on("click", "#child-pencil" , function() {
      $(this).parent().parent().parent().parent().parent().parent().children("#wtext").children(".texteditor").hide();
      $(this).parent().parent().parent().parent().parent().parent().children("#wtext").next().hide();
      $(".commtextarea").remove();
      
     
       var parent = $(this).parent().parent().parent();
       
       console.log(parent);
       
       
       var templateSource = $("#replyTemplate0101").html();
       var template = Handlebars.compile(templateSource);
       
       console.log(template);

       //$(div).appendTo(parent);
        
       parent.after(template); 
   });
   

$(document).on("click", "#commcreate2", function(){
   console.log("클릭을 합시다 이야이야호");
   var test2 = $(this).parent().parent().attr('class');
   var buttons = $(this).attr('id');
   var test3 = $(this).parent().parent().prev();
   var displaybar = $(this).parent().parent().parent().parent().parent().children('#create').attr('class');
   var displaytext = $(this).parent().parent().parent().parent().parent().children('#wtext').children().attr('class');
   var commNo = $(this).parent().parent().prev('.second-reply').children('.childmedia').children('.media-body').attr('value');
   console.log("dddd"+$(this).parent().parent().parent().parent().parent().parent().children('.modal-body').children("#test").attr('value'));
   console.log(commNo);
   console.log(test3);
  
   
   
   
    $.ajax({
   
       type:"POST",
         async:false,
         headers : {
            "Accept" : "application/json",
            "Content-Type" : "application/json"
         },
         data: JSON.stringify({
             comm : $(this).parent().parent().children('.recommt').children('.commtexteditor').html(),
             traceNo : $(this).parents('.modal-content').find('.owl-carousel').attr("value"),
             repNo : commNo,
             repLevel : "3",
             id : keywordNos
          }),
          url:"/reply/jsonAddReply",
          dataType:"json",
          success:function(data){
             console.log("왔어욤");
             console.log(data);
           var test;
              var templateSource = $("#replyTemplate0202").html();
              var template = Handlebars.compile(templateSource);
              
              test = template(data);        
              
              $(test).appendTo(test3).fadeOut().fadeIn();
              
              $("."+test2).remove();
              //$("."+displaybar).attr("style", "display");
              //$("."+displaytext).attr("style", "display; width:70%; height:50px");
              $("."+displaybar).show(500);
              $("."+displaytext).show(500);
          }
   }); 
      
});


$(document).on("click", "#child-child-trash", function(){
	
	var result = confirm('정말로 삭제 하시겠습니까?');

    if(result) {
       //yes
    	var del = $(this).parent().attr('value');
    	console.log(del);
    	
    	var delText = $(this).next().next();
    	      $.ajax({
    	            type:"POST",
    	            headers : {
    	               "Accept" : "application/json",
    	               "Content-Type" : "application/json"
    	            },
    	            data: JSON.stringify({
    	               commNo : del    
    	            }),
    	            
    	            url:"/reply/jsonDeleteReply",
    	            dataType:"json",
    	            success:function(data){
    	            	
    	            
    	            if(data.result == '1'){
    	            delText.text("삭제된 댓글입니다.");
    	            }else{
    	            	console.log("실패했쪙");
    	            }
    	            	
    	            }
    	         });    
    	      
    } else {
       //no
    }
	
	
	});




$(document).on("click",".item", function(){
	console.log("댓글가져오기여기오나요");
	var data = $(this).attr("value");
	console.log(data);
	var rep = $(this).parents("#main-content").find("#myModal"+data).find("#create");
	var repCh = $(this).parents("#main-content").find("#myModal"+data).find("#commcreate");
	var repChCh = $(this).parents("#main-content").find("#myModal"+data).find("#commcreate2");
	//console.log(owl);

	$(this).parents("#main-content").find("#myModal"+data).find("#create").click(function(){
		
		$(this).parents('#main-content').find("#owl-demo").find("."+data).attr("role","false"); 
	});
	
	$(this).parents("#main-content").find("#myModal"+data).find("#commcreate").click(function(){
		
		$(this).parents('#main-content').find("#owl-demo").find("."+data).attr("role","false"); 
	});
	
	$(this).parents("#main-content").find("#myModal"+data).find("#commcreate2").click(function(){
		
		$(this).parents('#main-content').find("#owl-demo").find("."+data).attr("role","false"); 
	});
	
   
    if($(this).attr('role')== 'true'){
      
	  //$(this).next().children().children().children(".modal-footer").children("#footerscroll").children.remove();
	   
      var tttt = $(this).children();
      console.log("내가 선택한 것만");
      console.log(tttt);
      console.log($(this).attr('value'));
      console.log($(this).next().children().children().children(".modal-footer").attr("class"));
      var traceNo = $(this).attr('value');
      var importtext = $(this).parents("#main-content").find("#myModal"+data).find(".modal-footer").children("#footerscroll").attr("class");
      var im = $(this).parents("#main-content").find("#myModal"+data).find(".modal-footer").children("#footerscroll");
      //console.log($(this).next().children().children().children(".modal-footer").children("#footerscroll"));
   $.ajax({
      type:"POST",
        async:false,
        headers : {
           "Accept" : "application/json",
           "Content-Type" : "application/json"
        },
        data: JSON.stringify({
         traceNo : traceNo
         }),
         url:"/reply/jsonListReply",
         dataType:"json",
         success:function(data){
        $("."+importtext+" > .first-reply").remove();
           for(var i = 0; i < data.list.length; i++){
              console.log(data.list[i].repLevel);
              if(data.list[i].repLevel == 1){
                 console.log("data");
                 var div;
                    var templateSource = $("#replyTemplate11").html();
                    var template = Handlebars.compile(templateSource);
                    console.log(template);
                    div = template(data.list[i]);
                    $(div).appendTo("."+importtext).fadeOut().fadeIn();
                    //$(div).appendTo("#"+data.list[i].commNo).fadeOut().fadeIn();
                    //$(tttt).attr("class","false");
              }else if(data.list[i].repLevel == 2){
                 console.log(im.children().attr("class"));
                 var test;
                    var templateSource = $("#replyTemplate0222").html();
                    var template = Handlebars.compile(templateSource);
                    
                    test = template(data.list[i]);        
                    //data.list[i].repNo
                    //var abc = data.list[i].repNo;
                    //console.log(abc);
                    $(test).appendTo(im.children("#"+data.list[i].repNo)).fadeOut().fadeIn();
                    
              }else if(data.list[i].repLevel ==3){
                 console.log(im.children('.second-reply').attr("class"));
                 
                 var test;
                    var templateSource = $("#replyTemplate0303").html();
                    var template = Handlebars.compile(templateSource);
                    
                    test = template(data.list[i]);
                    //$(test).appendTo(im.children()).fadeOut().fadeIn();
                    $(test).appendTo(im.children(".first-reply").children("#"+data.list[i].repNo)).fadeOut().fadeIn();
              }
           }
         }
      });
    }  
});

$(document).on("click", ".replycount", function(){
	var traceNo = $(this).attr("value");
	console.log("dksdiwndiwk"+traceNo);
	var replycount = $(this);
	getLikeState(traceNo);
	
	$.ajax({
	      type:"POST",
	        headers : {
	           "Accept" : "application/json",
	           "Content-Type" : "application/json"
	        },
	        data: JSON.stringify({
	        	traceNo : traceNo
	         }),
	         url:"/reply/getReply",
	         dataType:"json",
	         success:function(data){
	        	 if(data.replyList[0].replyTrace.traceLikes == 0){
	        		 var importvalue = replycount.parents("#main-content").find("#myModal"+traceNo).find(".like-body");
	        		 console.log("ddddddddddddddddddd"+importvalue);
		        	 importvalue.children(".fa").remove();
	        		 $(importvalue).append("<i class='fa fa-comment' id='commentid' style='float:right'>"+data.replyCount+"</i>");
	        		 TraceTotalLike(traceNo);
	        	 }else{
	        		 
	        	 
	        	 console.log(data.replyList);
	        	 var importvalue = replycount.parents("#main-content").find("#myModal"+traceNo).find(".like-body");
	        	 importvalue.children(".fa").remove();
	        	 $(importvalue).append("<i class='fa fa-comment' id='commentid' style='float:right'>"+data.replyCount+"</i>");
	        	 $(importvalue).append("<i class='fa fa-heart' id='likesid' style='float:right'>"+data.replyList[0].replyTrace.traceLikes+"</i>");
	        	 console.log(data.replyList[0].replyTrace.traceLikes);
	        	 }
	        	 
	        	 
	        	 
	         }
	 });
	
	function TraceTotalLike(data){
		$.ajax({
		      type:"POST",
		        async:false,
		        headers : {
		           "Accept" : "application/json",
		           "Content-Type" : "application/json"
		        },
		        data: JSON.stringify({
		        	traceNo : data
		         }),
		         url:"/trace/likeTotal",
		         dataType:"json",
		         success:function(data){
		        	 console.log(data);
		        	 $(".like-body").append("<i class='fa fa-heart' id='likesid' style='float:right'>"+data.liketotal.traceLikes+"</i>");
		        	 
		        	 
		        	 
		         }
		 });
	}
	 
});

//////////////////////////사용자 별 좋아요 확인//////////////////////
function getLikeState(data){
	console.log("짜증나~~~~~~"+data);
	$.ajax({
		type:"POST",
		headers : {
            "Accept" : "application/json",
            "Content-Type" : "application/json"
         },
		url:"/like/getLikeState",
		dataType:"json",
		data: JSON.stringify({
	        traceNo : data,
	        id: keywordNos,
	    }),
		success : function(data){
			console.log(data);
			if(data.likeState[0].likeState == 1){
				console.log("dddd");
			$(".like-body").children(".w3-btn").remove();
			$(".like-body").children(".fa fa-thumbs-o-up").remove();
			$(".like-body").append("<a target='_blank' class='w3-btn' id='unlike'>좋아요 취소<i class='fa fa-thumbs-o-down'></i></a>");
			
			}else{
				$(".like-body").children(".w3-btn").remove();
				$(".like-body").children(".fa fa-thumbs-o-up").remove();
			$(".like-body").append("<a target='_blank' class='w3-btn' id='liketest'>좋아요<i class='fa fa-thumbs-o-up'></i></a>");
			}
		}
	});
	
}


$(document).on("click", "#liketest", function(){
	//console.log("들어왔다!!!! 씐난다!!!!");
	console.log($(this).parent().find(".owl-carousel").attr("value"));
	var traceNo = $(this).parent().find(".owl-carousel").attr("value");
	var test = $(this).parent();
	$.ajax({
		type:"POST",
        async:false,
        headers : {
           "Accept" : "application/json",
           "Content-Type" : "application/json"
        },
        data: JSON.stringify({
        	traceNo : traceNo
         }),
         url:"/trace/updateLikes",
         dataType:"json",
         success:function(data){
        	 if(data.result==1){
        		 alert("업데이트 완료!!!");
        		 LikeState(traceNo);
        		 test.children("#likesid").remove();
        		 test.children("#liketest").remove();
        		 $(test).append("<a target='_blank' class='w3-btn' id='unlike'>좋아요 취소<i class='fa fa-thumbs-o-down'></i></a>");
        		 $(test).append("<i class='fa fa-heart' id='likesid' style='float:right'>"+data.likes.traceLikes+"</i>");
        		 
        		 
        	 }
         }
	});
	
});

/////////////////////좋아요 insert//////////////////////
function LikeState(data){
	console.log(data);
	console.log(keywordNos);
	$.ajax({
		type:"POST",
		headers : {
            "Accept" : "application/json",
            "Content-Type" : "application/json"
         },
		url:"/like/addLikeState",
		dataType:"json",
		data: JSON.stringify({
	        traceNo : data,
	        id: keywordNos,
	        likeState: 1
	    }),
		success : function(data){
			if(data.result == "1"){
				console.log("ddddd");
			}
		}
	});
}

$(document).on("click", "#unlike", function(){
	console.log("들어왔다!!!! 씐난다!!!!");
	console.log($(this).parent().find(".owl-carousel").attr("value"));
	var traceNo = $(this).parent().find(".owl-carousel").attr("value");
	var test = $(this).parent();
	
	updateLikeState(traceNo);
	$.ajax({
		type:"POST",
        async:false,
        headers : {
           "Accept" : "application/json",
           "Content-Type" : "application/json"
        },
        data: JSON.stringify({
        	traceNo : traceNo
         }),
         url:"/trace/updateunLikes",
         dataType:"json",
         success:function(data){
        	 if(data.result==1){
        		 alert("업데이트 완료!!!");
        		 test.children("#likesid").remove();
        		 test.children("#liketest").remove();
        		 test.children("#unlike").remove();
        		 $(test).append("<a target='_blank' class='w3-btn' id='liketest'>좋아요<i class='fa fa-thumbs-o-up'></i></a>");
        		 $(test).append("<i class='fa fa-heart' id='likesid' style='float:right'>"+data.likes.traceLikes+"</i>");
        		 
        		 
        	 }
         }
	});
});

/////////////////////좋아요 삭제//////////////////////
function updateLikeState(data){
	
	$.ajax({
		type:"POST",
		headers : {
            "Accept" : "application/json",
            "Content-Type" : "application/json"
         },
		url:"/like/updateLikeState",
		dataType:"json",
		data: JSON.stringify({
	        traceNo : data,
	        id: keywordNos
	    }),
		success : function(data){
			if(data.upResult == 1){
				console.log("성공");
			}
		}
	});
	
}