package com.trace.service.domain;

public class Friend {
	
	private int friendNo;
	private String friendMemberId;
	private String friendId;
	private int friendState;
	private Member friendMember;
	public int getFriendNo() {
		return friendNo;
	}
	public void setFriendNo(int friendNo) {
		this.friendNo = friendNo;
	}
	public String getFriendMemberId() {
		return friendMemberId;
	}
	public void setFriendMemberId(String friendMemberId) {
		this.friendMemberId = friendMemberId;
	}
	public String getFriendId() {
		return friendId;
	}
	public void setFriendId(String friendId) {
		this.friendId = friendId;
	}
	public int getFriendState() {
		return friendState;
	}
	public void setFriendState(int friendState) {
		this.friendState = friendState;
	}
	public Member getFriendMember() {
		return friendMember;
	}
	public void setFriendMember(Member friendMember) {
		this.friendMember = friendMember;
	}
	@Override
	public String toString() {
		return "Friend [friendNo=" + friendNo + ", friendMemberId=" + friendMemberId + ", friendId=" + friendId
				+ ", friendState=" + friendState + ", friendMember=" + friendMember + "]";
	}
	
	
	
	

}
