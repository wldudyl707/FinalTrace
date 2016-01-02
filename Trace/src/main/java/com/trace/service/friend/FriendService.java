package com.trace.service.friend;

import java.util.List;
import java.util.Map;

import com.trace.service.domain.Friend;

public interface FriendService {
	
	public int addFriend(Friend friend) throws Exception;
	
	public Map<String, Object> listFriend(String friendId) throws Exception;
	
	public int agreeFriend(Friend friend) throws Exception;
	
	public int disAgreeFriend(Friend friend) throws Exception;
	
	public int deleteFriend(Friend friend) throws Exception;
}
