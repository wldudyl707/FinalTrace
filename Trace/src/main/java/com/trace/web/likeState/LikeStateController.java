package com.trace.web.likeState;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.trace.service.domain.LikeState;
import com.trace.service.likeState.LikeStateService;

@Controller
@RequestMapping("/like/*")
public class LikeStateController {

	@Autowired
	@Qualifier("likeStateServiceImpl")
	private LikeStateService LikeStateService;
		
	public LikeStateController() {
		System.out.println("\nCommon :: "+this.getClass()+"\n");
	}
	
	@RequestMapping(value="addLikeState", method=RequestMethod.POST)
	public void addLikeState(@RequestBody LikeState likeState, Model model) throws Exception{
		System.out.println("Hello???");
		
		System.out.println(likeState);
		
		int result = LikeStateService.AddLikeState(likeState);
		model.addAttribute("result", result);
	}
	
	@RequestMapping(value="getLikeState", method=RequestMethod.POST)
	public void getLikeState(@RequestBody LikeState likeState, Model model) throws Exception{		
		System.out.println(likeState);
		List<LikeState> list = LikeStateService.getLikeState(likeState);
		List<LikeState> newlist = new ArrayList<>();
		if(list.size() == 0){
			System.out.println("힝");
			LikeState likeState2 = new LikeState();
			likeState2.setLikeState(0);
			newlist.add(likeState2);
			
			model.addAttribute("likeState", newlist);
		}else{
			model.addAttribute("likeState", list);
		}
		

	}
	
	@RequestMapping(value="updateLikeState", method=RequestMethod.POST)
	public void updateLikeState(@RequestBody LikeState likeState, Model model) throws Exception{
		System.out.println("update 중입니다");
		int upResult = LikeStateService.updateLikeState(likeState);
		
		model.addAttribute("upResult", upResult);
		
	}
	
	
		
	
}
