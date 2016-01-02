 //로그아웃
    $("#myBtn").on('click', function(){
    	
    		var keywordNo = sessionStorage.getItem("memberId");
    		var keywordNos = JSON.parse(keywordNo);
    		
    		 $.ajax({
    	    	 type:"POST",
    	         async: false,
    	         headers : {
    	            "Accept" : "application/json",
    	            "Content-Type" : "application/json"
    	         },
    	         url:"/member/lastLogin",
    	         dataType:"json",
    	         data: JSON.stringify({
    	        	 memberId : keywordNos
    	          }),
    	         success:function(data){
    	        	 if(data.update == "1"){
    	        	 
    	        		   /* $(keywordNos).remove(); */
    	        	       sessionStorage.removeItem("memberId"); 
    	        	           
    	        	              location="../index.html"
    	        	 }
    	         }
    	     });
    	
       
           
        
     });