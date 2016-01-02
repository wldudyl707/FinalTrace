package com.trace.service.friend.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.trace.service.domain.Friend;
import com.trace.service.domain.Trace;
import com.trace.service.friend.FriendDao;
import com.trace.service.friend.FriendService;
import com.trace.service.member.MemberDao;
import com.trace.service.trace.TraceDao;

@Service("friendServiceImpl")
public class FriendServiceImpl implements FriendService {
	
	@Autowired
	@Qualifier("friendDaoImpl")
	private FriendDao friendDao;
	public void setFriendDao(FriendDao friendDao){
		this.friendDao = friendDao;
	}	
	
	public int addFriend(Friend friend) throws Exception {
		return friendDao.addFriend(friend);
	}
	
	public Map<String, Object> listFriend(String friendId) throws Exception {
		System.out.println(friendDao.listFriend(friendId));
		Map<String, Object> map = new HashMap<String, Object>();
		List<Friend> list = friendDao.listFriend(friendId);
		map.put("list", list);
		
		return map;
	}
	
	public int agreeFriend(Friend friend) throws Exception {
		
		return friendDao.agreeFriend(friend);
	}
	
	public int disAgreeFriend(Friend friend) throws Exception {
		
		return friendDao.disAgreeFriend(friend);
	}
	
	public int deleteFriend(Friend friend) throws Exception {
		
		return friendDao.disAgreeFriend(friend);
	}


}
