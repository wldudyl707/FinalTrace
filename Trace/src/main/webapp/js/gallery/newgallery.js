var keywordNo = sessionStorage.getItem("memberId");
var keywordNos = JSON.parse(keywordNo);





//수정///////////////////////////////
$(function() {
  
	$(document).on("click","#update", function() {
      var temp = $("#desc").attr('val');
       location.href = "write3.html?traceNo="+temp;
       
  });
});
//////////////////////////////////////////////////


$(function(){
	console.log("keywordNos : "+keywordNos);
	 var memberId = $(location).attr('href').split("?")[1].split("=")[1];
	 console.log("안녕"+memberId);
	
	 
	 $.getJSON('/trace/listTrace',{memberId : memberId}, function(obj){
		 console.log(obj);
		    
		    var div;
		    var templateSource = $("#boardTrTemplate").html();
		    var template = Handlebars.compile(templateSource);
		    div = template(obj);
		    
		    
		    var divs;
		    var templateSource2 = $("#searchTemplate").html();
		    var template2 = Handlebars.compile(templateSource2);
		    divs = template2(obj);
		    
		    $(divs).appendTo("#addr");
		    $("#addTr").append(div).hide().show( "slide", {direction: "left" }, 1000 );
		    
		    
		    for(var i =0; i < obj.list2.length; i++){
		    	if(obj.list2[i].member.memberId != keywordNos){
		    		$(".updateClass").remove();
		    	}
		    }

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
                 $("#addTr").empty();;
                
                 /*$(div).appendTo("#addTr2");*/
                 $("#addTr").append(div).hide().show( "slide", {direction: "left" }, 1000 );

                 });
              }
     });
 });         
/////////////////////////////////////////////////////////////////////////////////////////////////////////
           
//////////////////calendar////////////////////   
/*$(function() {
  $( "#datepicker" ).datepicker({
    changeMonth: true,
    changeYear: true
  });
});*/
//////////////////calendar////////////////////   


/*Add class when scroll down*/
$(window).scroll(function(event){
        var scroll = $(window).scrollTop();
           if (scroll >= 50) {
                 $(".go-top").addClass("show");
            } else {
                $(".go-top").removeClass("show");
            }
         });
            
$('.go-top').click(function(){
                $('html, body').animate({
                    scrollTop: $( $(this).attr('href') ).offset().top
                }, 500);
 });
            

            
///////////////////////댓글//////////////////////
$(document).on("click", "#create", function(){
   
    
 var test = $(this).prev().prev().attr('class');
 var text = $(this).prev().children().attr('id');
 
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
                
                //$(div).appendto(.modal0)
                $("#"+text).empty(); 
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
             traceNo : $(this).parent().parent().parent().parent().parent().children('.modal-body').children("#test").attr('value'),
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
             traceNo : $(this).parent().parent().parent().parent().parent().parent().children('.modal-body').children("#test").attr('value'),
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
		
		 alert("변화가있나?");
		alert($(this).children().html()); 
		$(this).parent().parent().parent().parent().prev().children().attr("class","false"); 
	});
	
   
    if($(this).children().attr('class')== 'true'){
      
	  //$(this).next().children().children().children(".modal-footer").children("#footerscroll").children.remove();
	   
      var tttt = $(this).children();
      console.log("내가 선택한 것만");
      console.log(tttt);
      console.log($(this).children().attr('value'));
      console.log($(this).next().children().children().children(".modal-footer").attr("class"));
      var traceNo = $(this).children().attr('value');
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
	var replycount = $(this);
	console.log(replycount);
	
	//댓글 갯수
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
	         url:"/reply/getReply",
	         dataType:"json",
	         success:function(data){
	        	 console.log(data.replyList);
	        	 var importvalue = replycount.next().children().children().children(".modal-body");
	        	 importvalue.children(".fa").remove();
	        	 $(importvalue).append("<i class='fa fa-comment' id='commentid'>"+data.replyCount+"</i>");
	        	 $(importvalue).append("<i class='fa fa-heart' id='likesid'>"+data.replyList[0].replyTrace.traceLikes+"</i>");
	        	 console.log(data.replyList[0].replyTrace.traceLikes);
	        	 
	        	 
	        	 
	         }
	 });
	 
	 
});

$(document).on("click", "#liketest", function(){
	console.log("들어왔다!!!! 씐난다!!!!");
	console.log($(this).parent().children("#test").attr("value"));
	var traceNo = $(this).parent().children("#test").attr("value");
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
        		 test.children("#likesid").remove();
        		 test.children("#liketest").remove();
        		 $(test).append("<a target='_blank' class='w3-btn' id='unlike'>좋아요 취소<i class='fa fa-thumbs-o-down'></i></a>");
        		 $(test).append("<i class='fa fa-heart' id='likesid'>"+data.likes.traceLikes+"</i>");
        		 
        		 
        	 }
         }
	});
	
});

$(document).on("click", "#unlike", function(){
	console.log("들어왔다!!!! 씐난다!!!!");
	console.log($(this).parent().children("#test").attr("value"));
	var traceNo = $(this).parent().children("#test").attr("value");
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
         url:"/trace/updateunLikes",
         dataType:"json",
         success:function(data){
        	 if(data.result==1){
        		 alert("업데이트 완료!!!");
        		 test.children("#likesid").remove();
        		 test.children("#liketest").remove();
        		 test.children("#unlike").remove();
        		 $(test).append("<a target='_blank' class='w3-btn' id='liketest'>좋아요<i class='fa fa-thumbs-o-up'></i></a>");
        		 $(test).append("<i class='fa fa-heart' id='likesid'>"+data.likes.traceLikes+"</i>");
        		 
        		 
        	 }
         }
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
if(data.list.length > 0){
for(i=0 ; i<data.list.length ; i++){
if(data.list[0].friendState == 1){
var div;
var templateSource = $("#friendTemplate").html();
var template = Handlebars.compile(templateSource);
div = template(data);

$("#friendList").append(data.listsize);

console.log(div);

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




	
