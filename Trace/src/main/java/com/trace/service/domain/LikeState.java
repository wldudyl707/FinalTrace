package com.trace.service.domain;

public class LikeState {
	
	private String Id;
	private int TraceNo;
	private int LikeState;
	
	public String getId() {
		return Id;
	}
	public void setId(String id) {
		Id = id;
	}
	public int getTraceNo() {
		return TraceNo;
	}
	public void setTraceNo(int traceNo) {
		TraceNo = traceNo;
	}
	public int getLikeState() {
		return LikeState;
	}
	public void setLikeState(int likeState) {
		LikeState = likeState;
	}
	@Override
	public String toString() {
		return "LikeState [Id=" + Id + ", TraceNo=" + TraceNo + ", LikeState=" + LikeState + "]";
	}
		

	

}
