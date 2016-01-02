var emailResult = false;
var phoneResult = false;
var nameResult = false;
var idResult = false;
var pwResult = false;

$(document).ready(function() {
	   var value = sessionStorage.getItem("memberId");
			if (value != null){
				self.location = "sharemap.html";
			}else{
				var div = "1";
				var templateSource = $("#indeximport").html();
				var template = Handlebars.compile(templateSource);
				var test = template(div);
				$(test).appendTo("#section");
			}
});

/*아이디 줄복 체크  */
//$("#id").change(function(){
$(document).on("change","#id",function(){
   var id = document.getElementById('id');
   var idms = document.getElementById('idfeedback');
   if(id.value.length < 5){
      idms.textContent='아이디를 5자 이상 입력해 주세요';
   }else{
      idms.textContent='';
      fncIdCheck();
   }
});

function fncIdCheck(){
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
    	  memberId:$("#id").val()
      }),
      url:"/member/getJsonMember",
      dataType:"json",
      success : function(data){
         if(data.member == null){         
            //alert("사용 할 수 있는 아이디 입니다");
            $("#idfeedback").text("사용 할 수 있는 아이디 입니다.").css("color","blue");
            idResult = true;
            console.log("id true");
            return false;
         }else{
            //alert("사용 불가능 아이디 입니다.");
            $("#idfeedback").text("사용 불가능 아이디 입니다.").css("color","#F15F5F");
            return false;
         }
      }
   });
}

$(document).on("change","#pw",function(){
   var pw = document.getElementById('pw');
   var pwms = document.getElementById('pwfeedback');
   if(pw.value.length < 8){
      pwms.textContent='패스워드를 8자 이상 입력해 주세요';
   }else{
      pwms.textContent='';
      pwResult = true;
      console.log("ps true");
   }
});

$(document).on("change","#email",function(){
   var email = document.getElementById('email');
   var emailms = document.getElementById('emfeedback');
   if(email.value.length < 5){
      emailms.textContent='이메일을 다시 입력해주세요';
   }else{
      emailms.textContent='';
      emailResult = true;
      console.log("em true");
   }
});


function phone_check(event){
	
	var phms = document.getElementById('phfeedback');
	var ph = document.getElementById('ph');
	if(event.keyCode >= 48 && event.keyCode <= 57){
		if(ph.value.length >= 10){
			phoneResult = true;
			phms.textContent='';
			console.log("ph true");
		}else{
			phms.textContent='핸드폰 번호를  다시 입력해주세요';
		}	
	}else{
		console.log("숫자가 아닙니다");
		phms.textContent='핸드폰 번호를  다시 입력해주세요';
	}
}

function name_check(event){
	var namecheck = document.getElementById('namecheck');
	console.log(name.value);
	var namems = document.getElementById('nmfeedback');
	namems.textContent='';
	if (!( event.keyCode < 48 || event.keyCode >57 )||((event.keyCode < 48 || event.keyCode >57) && (event.keyCode < 65 || event.keyCode > 90) && (event.keyCode < 97 || event.keyCode > 122) || namecheck.value.length < 2)) {
		namems.textContent='이름을 다시 입력해주세요';
		nameResult = false;
		console.log("id false");
	}else{
		nameResult = true;
		console.log("id true");
	}	
}

/* 선택한 사진 보여주기  */
$(function(){
          $("#fileupload").change(function () {
              if (typeof (FileReader) != "undefined") {
                  var dvPreview = $(".images");
                  dvPreview.html("");
                  var regex = /^([가-힣a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.gif|.png|.bmp)$/;
                  $($(this)[0].files).each(function () {
                      var file = $(this);
                      if (regex.test(file[0].name.toLowerCase())) {
                          var reader = new FileReader();
                          reader.onload = function (e) {
                              var img = $("<img />");
                              img.attr("name",file[0].name);
                              img.attr("id","multi");
                              img.attr("style", "width:50px; height:50px; margin-right: 10px;margin-top: 10px;");
                              img.attr("src", e.target.result);
                              
                              dvPreview.append(img);
                            
                          }
                          reader.readAsDataURL(file[0]);
                      } else {
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

var aFile = null;

$(function(){
	$('#fileupload').fileupload({
		dataType:'json',
		url:'/member/addMember',
		autoUpload: false
	}).on('fileuploadadd', function(e, file){
		aFile = file.files[0];
	});
});

/* 회원가입 */
$(function() {
         $("#register-submit").on("click" , function() {
        	 console.log(id);
        	 console.log(pw);
        	 console.log(namecheck);
        	 console.log(email);
        	 console.log(ph);
        	 
        	if((emailResult && phoneResult && nameResult && idResult && pwResult) == true){
            
            $("#fileupload").fileupload('send', {files:aFile, formData:{memberId : id.value,
														                memberPwd: pw.value,
														                memberName: namecheck.value,
														                email: email.value,
														                handphone: ph.value}
            	})
			   .error(function(jqXHR, textStatus, errorThrown){console.log('error');})
	           .complete(function(result, textStatus, jsXHR){
	               alert("회원가입이 완료되었습니다. 로그인 해주세요.");
	               location.href = "index.html";
	           });
         }else{
        	 var exid = $("input[id='id']").val();
             var expw = $("input[id='pw']").val();
             var exname = $("input[id='namecheck']").val();
             var exemail = $("input[id='email']").val();
             var exph = $("input[id='ph']").val();
             
             
             if(exid == null || exid.length<5){
                var idms = document.getElementById('idfeedback');
                if(id.value.length < 5){
                   $('#idfeedback').attr("style","margin-top:5px;color:#F15F5F;font-size:5px");
                   idms.textContent='아이디를 5자 이상 입력해주세요';
                }else{
                   idms.textContent='';
                }
                //return false;
             }
             
             if(expw == null || expw.length<8){
                var pwms = document.getElementById('pwfeedback');
                if(pw.value.length < 8){
                   $('#pwfeedback').attr("style","margin-top:5px;color:#F15F5F;font-size:5px");
                   pwms.textContent='패스워드를 8자 이상 입력해 주세요';
                }else{
                   pwms.textContent='';
                }
               // return false;
             }
             
             if(exname == null || exname.length<2){
                var nmfeedback = document.getElementById('nmfeedback'); 
                if(namecheck.value.length < 2 ){
                   $('#nmfeedback').attr("style","margin-top:5px;color:#F15F5F;font-size:5px");
                   nmfeedback.textContent = '이름을 잘못 입력하셨습니다';
                }else{
                   nmfeedback.textContent = '';
                }
                //return false;
             }
                         
             if(exemail == null ||  exemail.length<8){
                var emailms = document.getElementById('emfeedback');
                if(email.value.length < 5){
                   $('#emfeedback').attr("style","margin-top:5px;color:#F15F5F;font-size:5px");
                   emailms.textContent='이메일을 다시 입력해주세요';
                }else{
                   emailms.textContent='';
                }
                
               //return false;
             }
             
             if(exph == null || exph.length<10){
                var phms = document.getElementById('phfeedback');
                if(ph.value.length < 10){
                   $('#phfeedback').attr("style","margin-top:5px;color:#F15F5F;font-size:5px");
                   phms.textContent='핸드폰 번호를  다시 입력해주세요';
                }else{
                   phms.textContent='';
                }
                //return false;
             }
         }});
});
      
/* 로그인 */
$(function() {
          $("#login-submit").on("click" , function() {
             jsonLogin();
         });
      });
      
function jsonLogin(){
         $.ajax({
            type:"POST",
            async: false,
            headers : {
               "Accept" : "application/json",
               "Content-Type" : "application/json"
            },
            data: JSON.stringify({
               memberId : $("#logid").val(),
               memberPwd: $("#logpassword").val()
            }),
            url:"/member/jsonLogin",
            dataType:"json",
            success:function(data, status, jXHR){
               if(data.member!=null){

            	
            	  var session =  JSON.stringify(data.memberId);
            	  console.log("check"+session);
            	  sessionStorage.setItem('memberId',session);
            	  
                  console.log(data.memberId);
                  location.href = "sharemap.html";
               
               }else{
                  alert("ID 또는 Password를 확인해주세요.");
                  $("#login-form").on("submit", function(event){
                     event.preventDefault();
                  })
               }
            }
         });
         
        
}




