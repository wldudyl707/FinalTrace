package com.trace.service.domain;

import java.sql.Date;
import java.util.Arrays;

public class Trace {
	
	private int traceNo;
	private String traceId;
	private String latitude; 
	private String longtitude; 
	private Date tracedate; 
	private String text;
	private int traceLikes;
	private String oriImgName;
	private String stoImgName;
	private String[] image ;
	private String addr;
	private Member member;
	private Friend friend;
	
	public Friend getFriend() {
		return friend;
	}
	public void setFriend(Friend friend) {
		this.friend = friend;
	}
	public int getTraceNo() {
		return traceNo;
	}
	public void setTraceNo(int traceNo) {
		this.traceNo = traceNo;
	}
	public String getTraceId() {
		return traceId;
	}
	public void setTraceId(String traceId) {
		this.traceId = traceId;
	}
	public String getLatitude() {
		return latitude;
	}
	public void setLatitude(String latitude) {
		this.latitude = latitude;
	}
	public String getLongtitude() {
		return longtitude;
	}
	public void setLongtitude(String longtitude) {
		this.longtitude = longtitude;
	}
	public Date getTracedate() {
		return tracedate;
	}
	public void setTracedate(Date tracedate) {
		this.tracedate = tracedate;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
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
	public String[] getImage() {
		return image;
	}
	public void setImage(String[] image) {
		this.image = image;
	}
	public String getAddr() {
		return addr;
	}
	public void setAddr(String addr) {
		this.addr = addr;
	}
	public Member getMember() {
		return member;
	}
	public void setMember(Member member) {
		this.member = member;
	}
	@Override
	public String toString() {
		return "Trace [traceNo=" + traceNo + ", traceId=" + traceId + ", latitude=" + latitude + ", longtitude="
				+ longtitude + ", tracedate=" + tracedate + ", text=" + text + ", traceLikes=" + traceLikes
				+ ", oriImgName=" + oriImgName + ", stoImgName=" + stoImgName + ", image=" + Arrays.toString(image)
				+ ", addr=" + addr + ", member=" + member + ", friend=" + friend + "]";
	}
	public int getTraceLikes() {
		return traceLikes;
	}
	public void setTraceLikes(int traceLikes) {
		this.traceLikes = traceLikes;
	}

	
}
