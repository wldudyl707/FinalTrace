package com.trace.web.friend;

import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.trace.service.domain.Friend;
import com.trace.service.domain.Trace;
import com.trace.service.friend.FriendService;
import com.trace.service.trace.TraceService;

@Controller
@RequestMapping("/friend/*")
public class FriendController {

	@Autowired
	@Qualifier("friendServiceImpl")
	private FriendService friendService;
	
	public FriendController() {
		System.out.println("\nCommon :: "+this.getClass()+"\n");
	}
	
	@RequestMapping(value="addFriend", method=RequestMethod.POST)
	public @ResponseBody int addFriend(@RequestBody Friend friend) throws Exception{
		System.out.println("/friend/addFriend");
		
		int fr =  friendService.addFriend(friend);
		
		System.out.println(fr);
		
		return fr;
	}
	
	@RequestMapping(value="listFriend", method=RequestMethod.POST)
	public void listFriend(@RequestBody Friend friend, Model model) throws Exception{
		System.out.println("/friend/listFriend");
		
		System.out.println(friend.getFriendId());
		
		Map<String, Object> map = friendService.listFriend(friend.getFriendId());
		System.out.println(map);
		List<Friend> list = (List<Friend>)map.get("list");
		
		
		model.addAttribute("list", list);
		model.addAttribute("listsize", list.size());
	}
	
	@RequestMapping(value="agreeFriend", method=RequestMethod.POST)
	public @ResponseBody int agreeFriend(@RequestBody Friend friend) throws Exception{
		System.out.println("/friend/agreeFriend");
		String friendId;
		String friendMemberId;
		
		int fr =  friendService.agreeFriend(friend);
		
		
		if(fr > 0){
			
			friendId = friend.getFriendMemberId();
			friendMemberId= friend.getFriendId();
			
			friend.setFriendState(2);
			friend.setFriendId(friendId);
			friend.setFriendMemberId(friendMemberId);
			friendService.addFriend(friend);
		}
		
		System.out.println(fr);
		
		return fr;
	}
	
	@RequestMapping(value="disAgreeFriend", method=RequestMethod.POST)
	public @ResponseBody int disAgreeFriend(@RequestBody Friend friend) throws Exception{
		System.out.println("/friend/disAgreeFriend");
		
		int fr = friendService.disAgreeFriend(friend);
		
		System.out.println(fr);
		
		return fr;
	}
	
	@RequestMapping(value="deleteFriend", method=RequestMethod.POST)
	public @ResponseBody int deleteFriend(@RequestBody Friend friend) throws Exception{
		System.out.println("/friend/deleteFriend");
		String friendId;
		String friendMemberId;
		
		int fr = friendService.deleteFriend(friend);
		
		if(fr > 0){
			
			friendId = friend.getFriendMemberId();
			friendMemberId= friend.getFriendId();
			
			friend.setFriendId(friendId);
			friend.setFriendMemberId(friendMemberId);
			friendService.deleteFriend(friend);
		}
		
		System.out.println(fr);
		
		return fr;
	}
}
