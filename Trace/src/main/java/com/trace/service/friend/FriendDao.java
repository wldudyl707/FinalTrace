package com.trace.service.friend;

import java.util.List;

import com.trace.service.domain.Friend;
import com.trace.service.domain.Trace;

public interface FriendDao {
	
	public int addFriend(Friend friend) throws Exception;
	
	public List<Friend> listFriend(String friendId) throws Exception;
	
	public int agreeFriend(Friend friend) throws Exception;
	
	public int disAgreeFriend(Friend friend) throws Exception;
	
	public int deleteFriend(Friend friend) throws Exception;

}
