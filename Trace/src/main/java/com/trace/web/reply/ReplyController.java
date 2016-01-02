package com.trace.web.reply;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.swing.plaf.synth.SynthSeparatorUI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.trace.service.domain.Member;
import com.trace.service.domain.Reply;
import com.trace.service.domain.Trace;
import com.trace.service.reply.ReplyService;



@Controller
@RequestMapping("/reply/*")
public class ReplyController {

	@Autowired
	@Qualifier("replyServiceImpl")
	private ReplyService replyService;
		
	public ReplyController() {
		System.out.println("\nCommon :: "+this.getClass()+"\n");
	}
	
	
	@RequestMapping( value="jsonAddReply", method=RequestMethod.POST )
	public void jsonAddReply(@RequestBody Reply reply,HttpServletRequest request, Model model) throws Exception{
		
		System.out.println("jsonAddTrace : POST");
		System.out.println("값 확인"+reply);
		reply.setId(reply.getId());
		System.out.println("tostring"+reply.toString());
		replyService.jsonAddReply(reply);
		
		List<Reply> list = replyService.jsonGetReply(reply.getTraceNo());
		System.out.println("list.get(0)"+list.get(0).getCommNo());
		model.addAttribute("list", list.get(0));

	}
	
	@RequestMapping(value="jsonGetReply/{traceNo}", method=RequestMethod.GET)
	public void jsonGetReply(){
		
	}
	
	@RequestMapping(value="jsonListReply", method=RequestMethod.POST)
	public void jsonListReply(@RequestBody Reply reply, Model model) throws Exception{
		System.out.println("여기까지만 확인");
		System.out.println(reply.getTraceNo());
		//replyService.jsonListReply(reply.getTraceNo());
		
		model.addAttribute("list",replyService.jsonListReply(reply.getTraceNo()));
	}
	
	@RequestMapping(value="jsonDeleteReply", method=RequestMethod.POST)
	public void jsonDeleteReply(@RequestBody Reply reply, Model model) throws Exception{
		System.out.println("삭제될꺼얌");
	
		int rows = replyService.jsonDeleteReply(reply.getCommNo());
		System.out.println("end");
		
		model.addAttribute("result",rows);
		
	}
	
	@RequestMapping(value ="getReply", method=RequestMethod.POST)
	public void getReply(@RequestBody Reply reply, Model model) throws Exception{
		System.out.println("Hello");
		
		Reply zeroReply = new Reply();
		Trace zeroTrace = new Trace();
		List<Reply> resultReply = replyService.getReply(reply);
		System.out.println(resultReply);
		if( resultReply.size() == 0){
			zeroTrace.setTraceLikes(0);
			zeroTrace.setTraceNo(reply.getTraceNo());
			zeroReply.setReplyTrace(zeroTrace);
			
			resultReply.add(zeroReply);
			System.out.println(zeroReply);
			model.addAttribute("replyList", resultReply);
			model.addAttribute("replyCount", 0);
		}else{
			model.addAttribute("replyList", resultReply);
			model.addAttribute("replyCount", resultReply.size());
		}
		
		
	}
	
	@RequestMapping(value ="alramReply")
	public void alramReply(@RequestParam String id, Model model) throws Exception{
		System.out.println("들어옵니다");

		List<Reply> list = replyService.alramReply(id);
		List<Reply> newlist = new ArrayList<>();
		/*int count = 0;
		for(int i =0; i<list.size(); i++){
			Reply reply = list.get(i);
			count += replyService.checkReply(reply).size();
			
		}*/
		
		for(int i =0; i<list.size(); i++){
			Reply reply = list.get(i);
			List<Reply> lists = replyService.checkReply(reply);
			for(int j =0; j<lists.size(); j++){
				Reply replys = lists.get(j);
				newlist.add(replys);				
			}
			
			
		}
		
		System.out.println("d"+newlist.size());
		System.out.println("d "+newlist);
		//model.addAttribute("alramcount", newlist.size());
		model.addAttribute("alramlist", newlist);
		
		
	}
	
	
	
	
}
