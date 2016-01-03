var keywordNo = sessionStorage.getItem("memberId");
var keywordNos = JSON.parse(keywordNo);





//수정///////////////////////////////
  $(document).on("click",".btn-theme", function() {
	  
      var temp = $(this).parents(".desc").attr('val');
      console.log(temp);
       location.href = "write3.html?traceNo="+temp;
  });
//////////////////////////////////////////////////


               
//////////////////calendar////////////////////   
$(function() {
  $( "#datepicker" ).datepicker({
    changeMonth: true,
    changeYear: true
  });
});
//////////////////calendar////////////////////   

///////////////gallery///////////////////////////////
$(function() {

$.getJSON('/trace/listTrace',{memberId : keywordNos}, function(obj){

Handlebars.registerHelper('imgTag', function(stoImgName, traceNo) {
console.log("스토어이미지네임");
console.log(stoImgName);
console.log(traceNo);
var imgName = [];
imgName = stoImgName.split(",");
var imgTag='';
if(imgName.length == 1){
	imgTag = "<img src='trace_thumb/"+imgName[0]+"' value='"+traceNo+"' width='100%' height='350' id='share-img'>";
}

else if(imgName.length == 2){
	for(var i=0 ; i<imgName.length ; i++){
	imgTag += "<img src='trace_thumb/"+imgName[i]+"' value='"+traceNo+"' width='100%' height='175' id='share-img'>";
	}
}

else if(imgName.length == 3){
	
	imgTag += "<img src='trace_thumb/"+imgName[0]+"' value='"+traceNo+"' width='100%' height='220' id='share-img'>";
	for(var i=1 ; i<3 ; i++){
		imgTag += "<img src='trace_thumb/"+imgName[i]+"' value='"+traceNo+"' width='50%' height='130' id='share-img'>";
		
	}
	//imgTag += "<div class='count' style='position:absolute; top:57%; right:22%; font-size:300%; font-weight:bolder; color:white;'>+6</div>"
}

else if(imgName.length > 3){
	
	imgTag += "<img src='trace_thumb/"+imgName[0]+"' value='"+traceNo+"' width='100%' height='220' id='share-img'>";
	
	imgTag += "<img src='trace_thumb/"+imgName[1]+"' value='"+traceNo+"' width='50%' height='130' id='share-img'>";
	
	imgTag += "<img src='trace_thumb/"+imgName[2]+"' value='"+traceNo+"' width='50%' height='130' id='share-img' " +
				"style='-webkit-filter:grayscale(100%);-moz-filter: grayscale(100%);-ms-filter: grayscale(100%);-o-filter: grayscale(100%);filter: grayscale(100%);'>";

	imgTag += "<div class='count' style='position:absolute; top:66%; right:22%; font-size:300%; font-weight:bolder; color:white;'>+"+(imgName.length-3)+"</div>"
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
	carouselTag += "<div class='item active'>"+
					"<img src='trace_thumb/"+carouselName[0]+"' width='100%' height='400' class='carousel-img'>"+
					"</div>";
}

else if(carouselName.length > 1){
	carouselTag += "<div class='item active'>"+
					"<img src='trace_thumb/"+carouselName[0]+"' width='100%' height='400'class='carousel-img'>"+
					"</div>";
	for(var i=1 ; i<carouselName.length ; i++){
		carouselTag += "<div class='item'>"+
			"<img src='trace_thumb/"+carouselName[i]+"' width='100%' height='400' class='carousel-img'>"+
			"</div>";
	}				
	
}

return carouselTag;

});  

var div;
var templateSource = $("#boardTrTemplate").html();
var template = Handlebars.compile(templateSource);
div = template(obj);

var divs;
var templateSource2 = $("#boardTrTemplate3test").html();
var template2 = Handlebars.compile(templateSource2);
divs = template2(obj);

$(divs).appendTo("#addr");

$("#addTr").append(div);


for(var i =0; i < obj.list.length; i++){
if(obj.list[i].member.memberId != keywordNos){
	$(".updateClass").remove();
}
}

$(document).on("click",".col-md-4",function() {

var owl = $(this).next().find("#owl-demo");

owl.owlCarousel({
  navigation : true,
  singleItem : true,
  transitionStyle : "backSlide"
});

});
});
});

//////////////////gallery////////////////////////////////////////
//////////////////gallery2//////////////////////////////////////
 $(function() {
    $(document).on("click","#reply", function() {
       location.href = 'gallery.html';
    /*$.getJSON('/trace/listTrace',{memberId : keywordNos }, function(obj){
       var div;
       var templateSource = $("#boardTrTemplate").html();
         var template = Handlebars.compile(templateSource);
       div = template(obj);
         
         $("#addTr").append(div).hide().show( "slide", {direction: "left" }, 1000 );
         
         $("#memberBar").hide().show( "slide", {direction: "right" }, 1000 );
         
         $(".col-xs-6").mouseenter(function(){
            alert("이벤트") 
        
           $(this).css("transform","rotate3d(1,-1,1,60deg)");
           
        });
         
         
         
         $(".col-xs-6").mouseleave(function(){
            alert("이벤트") 
        
           $(this).css("transform","rotate3d(0,0,0,0deg)");
        
        });
     });*/
  });
});
/////////////////gallery2/////////////////////////////////////
 $(document).on("click",".details", function() {
     console.log("111");
     //jsonTraceNo();
     var temp = $(this).parent().attr('val');
     console.log(temp);
      $.ajax({
            type:"POST",
            async: false,
            headers : {
               "Accept" : "application/json",
               "Content-Type" : "application/json"
            },
            data: JSON.stringify({
               traceNo : temp
            }),
            url:"/trace/listTrace2",
            dataType:"json",
            success:function(data){
               $.getJSON('/trace/listTrace2',{memberId : keywordNos }, function(obj){
                 alert("왔다");
                 console.log(data);
                 var div;
                 var templateSource = $("#boardTrTemplate3").html();
                 var template = Handlebars.compile(templateSource);
                  console.log(template);
                  div = template(data);
                  console.log(div);
                  $("#addTr").empty();
                 
                  /*$(div).appendTo("#addTr2");*/
                  $("#addTr").append(div).hide().show( "slide", {direction: "left" }, 1000 );

                  });
               }
      });
  });         
////////////////////////////////////////
/* $(function() {
    
     
       $.getJSON('/trace/listTrace',{memberId : keywordNos }, function(obj){
          var div;
          var templateSource = $("#boardTrTemplate2").html();
            var template = Handlebars.compile(templateSource);
            
          div = template(obj);
            console.log(div);
            $(div).appendTo("#addr");
            
       });
     
 });   */
 ////////////////////////////////////////
/*Add class when scroll down*/
$(window).scroll(function(event){
        var scroll = $(window).scrollTop();
           if (scroll >= 50) {
                 $(".go-top").addClass("show");
            } else {
                $(".go-top").removeClass("show");
            }
         });
            /*Animation anchor*/
$('.go-top').click(function(){
                $('html, body').animate({
                    scrollTop: $( $(this).attr('href') ).offset().top
                }, 500);
 });
            

            
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
               alert("왔다");
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




$(document).on("click",".col-md-4", function(){

	$(this).next().find('#create').click(function(){
		
		$(this).parents('.modal').prev().attr("role","false"); 
	});
	
	$(this).next().find('#commcreate').click(function(){
		
		$(this).parents('.modal').prev().attr("role","false"); 
	});
	
	$(this).next().find('#commcreate2').click(function(){
		
		$(this).parents('.modal').prev().attr("role","false"); 
	});
	
   
    if($(this).attr('role')== 'true'){
      
	  //$(this).next().children().children().children(".modal-footer").children("#footerscroll").children.remove();
	   
      var tttt = $(this).children();
      console.log("내가 선택한 것만");
      console.log(tttt);
      console.log($(this).attr('value'));
      console.log($(this).next().children().children().children(".modal-footer").attr("class"));
      var traceNo = $(this).attr('value');
      var importtext = $(this).next().children().children().children(".modal-footer").children("#footerscroll").attr("class");
      var im = $(this).next().children().children().children(".modal-footer").children("#footerscroll");
      console.log($(this).next().children().children().children(".modal-footer").children("#footerscroll"));
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
            console.log(data.list);
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
                    $(tttt).attr("class","false");
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

$(document).on("click",".col-md-4", function(){
	console.log("짜증난다");
	console.log($(this).children().attr("value"));
	var traceNo = $(this).children().attr("value");
	console.log(traceNo);
	var replycount = $(this);
	console.log(replycount);
	getLikeState(traceNo);
	
	//댓글 갯수
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
	        		 var importvalue = replycount.next().children().children().children(".like-body");
		        	 importvalue.children(".fa").remove();
	        		 $(importvalue).append("<i class='fa fa-comment' id='commentid'style='float:right'>"+data.replyCount+"</i>");
	        		 TraceTotalLike(traceNo);
	        	 }else{
	        		 
	        	 
	        	 console.log(data.replyList);
	        	 var importvalue = replycount.next().children().children().children(".like-body");
	        	 importvalue.children(".fa").remove();
	        	 $(importvalue).append("<i class='fa fa-comment' id='commentid'style='float:right'>"+data.replyCount+"</i>");
	        	 $(importvalue).append("<i class='fa fa-heart' id='likesid'style='float:right'>"+data.replyList[0].replyTrace.traceLikes+"</i>");
	        	 console.log(data.replyList[0].replyTrace.traceLikes);
	        	 }
	        	 
	        	 
	        	 
	         }
	 });
	 
	 
});

////////////////////////////////좋아요 수 확인//////////////////////
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
	        	 $(".like-body").append("<i class='fa fa-heart' id='likesid'style='float:right'>"+data.liketotal.traceLikes+"</i>");
	        	 
	        	 
	        	 
	         }
	 });
}


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
        		 $(test).append("<a target='_blank' class='w3-btn' id='unlike'>좋아요 취소<i class='fa fa-thumbs-o-down' style='float:right'></i></a>");
        		 $(test).append("<i class='fa fa-heart' id='likesid'style='float:right'>"+data.likes.traceLikes+"</i>");
        		 
        		 
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
        		 $(test).append("<i class='fa fa-heart' id='likesid'style='float:right'>"+data.likes.traceLikes+"</i>");
        		 
        		 
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
$(document).on("click", "#centereds", function(){
	   console.log("첫걸음");
	   location.href="updatemember.html";
	});




	
