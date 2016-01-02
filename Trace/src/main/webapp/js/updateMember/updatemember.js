var keywordNo = sessionStorage.getItem("memberId");
var keywordNos = JSON.parse(keywordNo);
var password ="";

console.log(keywordNos);
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
           password = data.member.memberPwd;
             console.log("dddd");
            console.log(data);
            $(".userId").append(data.member.memberId);
            $(".memberName").append(data.member.memberName);
            $("#inputEmail").val(data.member.email);
            $("#inputPhnumber").val(data.member.handphone);

          }
    });
});


var nowpassword = false;
$(document).on("change", "#nowPwd", function(){
   if(password == $("#nowPwd").val()){
      nowpassword = true;
      $(".checkPwd").text("비밀 번호를 변경 할 수 있습니다");
      $(".checkPwd").attr("style","margin-left: 18%; color:blue;");
      
   }else{
      nowpassword = false;
      $(".checkPwd").text("비밀번호가 맞지 않습니다");
      $(".checkPwd").attr("style","margin-left: 18%; color:red;")
   }
});

var chpwd1 =false;
$(document).on("change", "#changePwd1", function(){
   if(nowpassword == true){
      console.log(document.getElementById('changePwd1').value.length);
      if( document.getElementById('changePwd1').value.length <8){
         $(".cgpwd1").text("비밀번호를 8자 이상 입력해 주세요");
         $(".cgpwd1").attr("style", "margin-left: 18%; color: red;");
         chpwd1 =false;
      }else{
         
         if($("#changePwd1").val() == $("#nowPwd").val()){
            $(".cgpwd1").text("기존비밀 번호와 같습니다 다시 입력해 주세요");
            $(".cgpwd1").attr("style", "margin-left: 18%; color: red;");
            chpwd1 =false;
         }else{
            $(".cgpwd1").text("");
            chpwd1 = true;
         }
         
      }
   }else{
      chpwd1 = false;

   }
});

var chpwd2 =false;
$(document).on("change", "#changePwd2", function(){
   if(nowpassword == true){
      console.log(document.getElementById('changePwd2').value.length);
      if( document.getElementById('changePwd2').value.length <8){
         $(".cgpwd2").text("비밀번호를 8자 이상 입력해 주세요");
         $(".cgpwd2").attr("style", "margin-left: 18%; color: red;");
         chpwd2 =false;
      }else{
         if($("#changePwd1").val() == $("#changePwd2").val()){
            $(".cgpwd2").text("비밀번호가 일치합니다");
            $(".cgpwd2").attr("style","margin-left: 18%; color:blue;");
            chpwd2 = true;
         }else{
            $(".cgpwd2").text("비밀번호가 일치하지 않습니다");
            $(".cgpwd2").attr("style", "margin-left: 18%; color: red;");
            chpwd2 =false;
         } 
         
      }
   }else{
      chpwd2 = false;

   }
});


var checkEmail = true;
$(document).on("change", "#inputEmail", function(){
   if( document.getElementById('inputEmail').value.length <5){
      $(".checkEamil").text("이메일을 다시 입력해 주세요");
      $(".checkEamil").attr("style", "margin-left: 18%; color: red;");
      checkEmail = false;
   }else{
      $(".checkEamil").text("");
      checkEmail = true;
   }
});

var checkPhone = true;
$(document).on("change", "#inputPhnumber", function(){
   if(document.getElementById('inputPhnumber').value.length <10){
      $(".chekcPh").text("핸드폰 번호를 다시 입력해 주세요");
      $(".chekcPh").attr("style", "margin-left: 18%; color: red;");
      checkPhone = false;
   }else{
      $(".chekcPh").text("");
      checkPhone = true;
   }
});




 $(document).on("click","#update", function() {
       var memberId =document.getElementById("memberId").innerHTML;
       var memberPwd =$("#memberPwd").val();
       
       console.log(memberPwd);
       
       if(checkPhone & nowpassword & chpwd1 & chpwd2 & checkEmail == true){
          $.ajax({
                type:"POST",
                async: false,
                headers : 
                {
                   "Accept" : "application/json",
                   "Content-Type" : "application/json"
                },
                data: JSON.stringify({
                  memberId:document.getElementById("memberId").innerHTML,
                   memberPwd:$("#changePwd2").attr('value') ,
                   email:$("#inputEmail").val() ,
                 handphone:$("#inputPhnumber").val()
                    
                }),
                url:"/member/updateMember",
                dataType:"json",
                success : function(data){
                   
                   $("#profileupdate").remove();
                   $(".form-horizontal").append("<div id='resultUp' style='margin-left:5% font-weight: bold; text-align: center;'><h3>수정 완료 되었습니다</h3></div>");
                   setTimeout("location.href='sharemap.html'", 1000);
                   /*$('head').append("<meta http-equiv='refresh' content='1; url=http://192.168.0.26:8080/sharemap.html'>");*/
                   
                   /*$(".form-horizontal").append("<div id='resultUp' style='margin-left:5%'>수정 완료 되었습니다</div>" +
                         "<button type='button' class='btn btn-primary' id='updateResult' style='float: right; margin-right: 2%'>Go Home</button>");*/
      
                }
          });
       }else{
          $(".lastcheck").text("정보를 확인해 주세요");
          $(".lastcheck").attr("style","margin-left: 65%; margin-top: 1%; color:red;")
          return false;
       }
});
    
$(document).on("click", "#updateResult", function(){
   console.log("메인");
   location.href="sharemap.html";
});




//////////////상단바//////////////////////
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
   
$(".btn-default").on("click", function(){
      location.href="sharemap.html";
});