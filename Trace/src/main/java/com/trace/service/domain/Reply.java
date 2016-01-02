package com.trace.service.domain;

import java.sql.Date;

public class Reply {
	
	private int commNo;
	private int traceNo;
	private String id;
	private String comm;
	private Date commDate;
	private int likes;
	private int repNo;
	private int repLevel;
	private int repStep;
	private Member replyMember;
	private Trace replyTrace;
	public int getCommNo() {
		return commNo;
	}
	public void setCommNo(int commNo) {
		this.commNo = commNo;
	}
	public int getTraceNo() {
		return traceNo;
	}
	public void setTraceNo(int traceNo) {
		this.traceNo = traceNo;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getComm() {
		return comm;
	}
	public void setComm(String comm) {
		this.comm = comm;
	}
	public Date getCommDate() {
		return commDate;
	}
	public void setCommDate(Date commDate) {
		this.commDate = commDate;
	}
	public int getLikes() {
		return likes;
	}
	public void setLikes(int likes) {
		this.likes = likes;
	}
	public int getRepNo() {
		return repNo;
	}
	public void setRepNo(int repNo) {
		this.repNo = repNo;
	}
	public int getRepLevel() {
		return repLevel;
	}
	public void setRepLevel(int repLevel) {
		this.repLevel = repLevel;
	}
	public int getRepStep() {
		return repStep;
	}
	public void setRepStep(int repStep) {
		this.repStep = repStep;
	}
	public Member getReplyMember() {
		return replyMember;
	}
	public void setReplyMember(Member replyMember) {
		this.replyMember = replyMember;
	}
	public Trace getReplyTrace() {
		return replyTrace;
	}
	public void setReplyTrace(Trace replyTrace) {
		this.replyTrace = replyTrace;
	}
	@Override
	public String toString() {
		return "Reply [commNo=" + commNo + ", traceNo=" + traceNo + ", id=" + id + ", comm=" + comm + ", commDate="
				+ commDate + ", likes=" + likes + ", repNo=" + repNo + ", repLevel=" + repLevel + ", repStep=" + repStep
				+ ", replyMember=" + replyMember + ", replyTrace=" + replyTrace + "]";
	}
	
	
	
	
	
	
	
}
