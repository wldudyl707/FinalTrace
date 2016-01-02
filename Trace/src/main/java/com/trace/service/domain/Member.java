package com.trace.service.domain;

import java.sql.Date;

public class Member {
	private String memberId;
	private String memberPwd;
	private String memberName;
	private String email;
	private String handphone;
	private String role;
	private String oriImgName;
	private String stoImgName;
	private Date lastLogin;
	
	public String getMemberId() {
		return memberId;
	}
	public void setMemberId(String memberId) {
		this.memberId = memberId;
	}
	public String getMemberPwd() {
		return memberPwd;
	}
	public void setMemberPwd(String memberPwd) {
		this.memberPwd = memberPwd;
	}
	public String getMemberName() {
		return memberName;
	}
	public void setMemberName(String memberName) {
		this.memberName = memberName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getHandphone() {
		return handphone;
	}
	public void setHandphone(String handphone) {
		this.handphone = handphone;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public String getOriImgName() {
		return oriImgName;
	}
	public void setOriImgName(String oriImgName) {
		this.oriImgName = oriImgName;
	}
	public String getStoImgName() {
		return stoImgName;
	}
	public void setStoImgName(String stoImgName) {
		this.stoImgName = stoImgName;
	}	
	public Date getLastLogin() {
		return lastLogin;
	}
	public void setLastLogin(Date lastLogin) {
		this.lastLogin = lastLogin;
	}
	@Override
	public String toString() {
		return "Member [memberId=" + memberId + ", memberPwd=" + memberPwd + ", memberName=" + memberName + ", email="
				+ email + ", handphone=" + handphone + ", role=" + role + ", oriImgName=" + oriImgName + ", stoImgName="
				+ stoImgName + ", lastLogin=" + lastLogin + "]";
	}
	
	
	
}
