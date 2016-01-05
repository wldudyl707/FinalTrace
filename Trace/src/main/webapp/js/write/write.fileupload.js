console.log('Starting write.html...')
    //console.log($.jStorage.get('sessionId'));
    var keywordNo = sessionStorage.getItem("memberId");
    
    var keywordNos = JSON.parse(keywordNo);
    console.log(keywordNos);
    var filesList = [];
    var deleteFilesList = [];
    // ////////////////////////////////수정에 사진불러오기////////////////////

/*
 * var url = $(location).attr('href').split("?")[1].split("=")[1];
 * console.log(url)
 */
$(function() {
	var url = $(location).attr('href');
	console.log(url)
	if (url.indexOf("?") != -1) {

		url = url.split("?")[1].split("=")[1];
		console.log(url)
		$.ajax({
			type : "POST",
			async : false,
			headers : {
				"Accept" : "application/json",
				"Content-Type" : "application/json"
			},
			data : JSON.stringify({
				traceNo : url
			}),
			url : "/trace/listTrace2",
			dataType : "json",
			success : function(data) {
				$.getJSON('/trace/listTrace2', {
					memberId : keywordNos
				}, function(obj) {
					// alert("간다");
					console.log(data);
					var div;
					var templateSource = $("#boardTrTemplate4").html();
					var template = Handlebars.compile(templateSource);
					console.log(template);
					div = template(data);
					console.log(div);

					$(div).appendTo("#kky");
					$("#inputSuccess").html(data.list4[0].text);
					$("#addr").text(data.list4[0].addr);
					
					console.log(data.list4[0]);
					console.log(data.list4[0]);
					$("input[name='lat']").val(data.list4[0].latitude);
					$("input[name='lng']").val(data.list4[0].longtitude);
					
					/*$.jStorage.set("wlatitude",data.list4[0].latitude);
				    $.jStorage.set("wlongtitude",data.list4[0].longtitude);*/
				});

				/*
				 * $.getJSON('/trace/listTrace2',{memberId : keywordNos },
				 * function(obj){ alert("텍스뚜"); console.log(data); var div; var
				 * templateSource = $("#boardTrTemplate5").html(); var template =
				 * Handlebars.compile(templateSource); //console.log(template);
				 * div = template(data); // console.log(div);
				 * $(div).appendTo("#inputSuccess");
				 * 
				 * $("#inputSuccess").text(data.list4[0].text); });
				 */
			}

		});
		// ///////////////////////////////사진불러오기/////////////////////////
		    	    // ///////////////////////사진삭제///////////////////////////////
		$(document).on("click", ".fa-times", function() {
			deleteFilesList = $(this).prev().attr('src').split("/")[1];
			console.log($(this).prev().attr('src').split("/")[1]);
			var traceNo = $(this).prev().attr('value');
			console.log(traceNo);
			console.log(deleteFilesList);

			$.ajax({
				type : "POST",
				async : false,
				headers : {
					"Accept" : "application/json",
					"Content-Type" : "application/json"
				},
				data : JSON.stringify({
					traceNo : traceNo,
					stoImgName : deleteFilesList

				}),
				url : "/trace/deleteImage",
				dataType : "json",
				success : function(data) {

				}
			});

			for (var i = 0; i < filesList.length; i++) {
				if ($(this).prev().attr('name') == filesList[i].name) {
					filesList.splice(i, i);

				}
			}
			console.log(filesList.length);

			$(this).prev().remove();
			$(this).remove();
		});

	}
});
// ///////////////////사진삭제 종료///////////////////
    // //////////////////////////////////수정클릭//////////
$(document).on("click", "#update", function() {

	
	var text = $("#inputSuccess").text();
	var addr = $("#addr").text();
	console.log(addr);
	var url = $(location).attr('href').split("?")[1].split("=")[1];

	console.log(url);
	$.ajax({
		type : "POST",
		headers : {
			"Accept" : "application/json",
			"Content-Type" : "application/json"
		},
		data : JSON.stringify({
			text : text,
			traceNo : url,
			latitude : $("input[name='lat']").val(),
			longtitude : $("input[name='lng']").val(),
			addr : addr

		}),
		url : "/trace/updateTrace",
		dataType : "json",
		success : function(data) {

			location.href = 'gallery.html';
			

		}
	});

});
// ////////////////////////////////////////
    
     $(function(){
          $("#fileupload").change(function () {
              if (typeof (FileReader) != "undefined") {
                  var dvPreview = $(".images");
                  var regex = /^([가-힣a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.gif|.png|.bmp)$/;
                  $($(this)[0].files).each(function () {
                      var file = $(this);
                      if (regex.test(file[0].name.toLowerCase())) {
                          var reader = new FileReader();
                          reader.onload = function (e) {
                              var img = $("<img />");
                              
                              img.attr("name",file[0].name);
                             
                              img.attr("id","multi");
                              img.attr("style", "width:150px; height:150px; margin-right: 10px;margin-top:-150px;");
                              img.attr("src", e.target.result);
                              
                              dvPreview.append(img);
                              
                              var x= $("<div />");
                              
                              x.attr("class","fa fa-times");
                              x.attr("style","margin-bottom:150px");
                              dvPreview.append(x);
                              
                              $(".fa-times").on('click',function(){
                            	  
                            	  for(var i=0; i<filesList.length; i++){
                            		  if($(this).prev().attr('name')==filesList[i].name){
                            			filesList.splice(i, i);
                            		  }
                            	  }		
                            	  
                            	  $(this).prev().remove();
                                  $(this).remove();
                                }); 
                              
                          }
                          reader.readAsDataURL(file[0]);
                      }  else {
                          alert(file[0].name + " is not a valid image file.");
                          dvPreview.html("");
                          return false;
                      }
                  });
              } else {
                  alert("This browser does not support HTML5 FileReader.");
              }
          });
       }); 
   
   $(function() { 
	   var filecheck = false;
         $('#fileupload').fileupload({
            autoUpload: false,
            singleFileUploads: false,
            multipart: true,
            url: '/trace/addTrace',
            dataType:'json'
         }).on('fileuploadadd', function(e, data){
            $.each(data.files, function(index, file){
               filesList.push(data.files[index]);
               console.log("Added : " + data.files[index].name);
               filecheck = true;
            });
         });
         
         $('#create').on('click', function(event){
            console.log("multi file submit");
            console.log($.jStorage.get('sessionId'));
            console.log($.jStorage.get("wlatitude"));
    		console.log($.jStorage.get("wlongtitude"));
            if(filecheck == true && ($.jStorage.get("wlatitude")!=null) && ($.jStorage.get("wlongtitude") !=null)){
            	if(filesList.length > 0){
            		event.preventDefault();
               
            		console.log(filesList.length);
               
            		$('#fileupload').fileupload('send', {files: filesList, formData: {comment : $("#inputSuccess").html(), memberId: keywordNos, latitude : $.jStorage.get("wlatitude"), longtitude : $.jStorage.get("wlongtitude"), addr : $.jStorage.get("addr")}})
            		.error(function(jqXHR, textStatus, errorThrown){console.log('error');})
            		.complete(function(result, textStatus, jqXHR){
                  location.href ="gallery.html";
            		});
            	}else{
               console.log("plain default form submit");
            	}
            }else if($.jStorage.get("wlatitude")==null || $.jStorage.get("wlongtitude")==null){
            	alert("위치를 선택해 주세요");
            	return false;
            }else{
            	alert("사진을 업로드 해주세요");
            	return false;
            }
         });
        });
   
   ////////////////////////////////////////////////////////////////////
   
   $('.close').on('click',function(){
	  console.log("나는 모달 save");
	  console.log($.jStorage.get("latitude"));
      console.log($.jStorage.get("longtitude"));
	  
      var geocoder = new google.maps.Geocoder();
      var latitude = $.jStorage.get("wlatitude");
      var longitude =  $.jStorage.get("wlongtitude");
      var latLng = new google.maps.LatLng(latitude,longitude);
      geocoder.geocode({       
              latLng: latLng     
              }, 
              function(responses) 
              {     
                 if (responses && responses.length > 0) 
                 {        
                     $.jStorage.set("addr", responses[0].formatted_address);
                     console.log($.jStorage.get("addr"));
                     	if($("#addr").text()==null){
                     		$("#addr").append("장소 : "+responses[0].formatted_address);
                     	}else{
                     		$("#addr").text(responses[0].formatted_address);
                     	}
                 } 
                 else 
                 {       
                   alert('Not getting Any address for given latitude and longitude.');     
                 }   
              }
      );
		
		
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
$(document).on("click", "#centereds", function(){
	   console.log("첫걸음");
	   location.href="updatemember.html";
	});
  
   