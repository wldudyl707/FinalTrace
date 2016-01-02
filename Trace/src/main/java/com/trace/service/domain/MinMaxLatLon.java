package com.trace.service.domain;

public class MinMaxLatLon {

	private String minLatitude;
	private String minLongitude;
	private String maxLatitude;
	private String maxLongitude;
	public String getMinLatitude() {
		return minLatitude;
	}
	public void setMinLatitude(String minLatitude) {
		this.minLatitude = minLatitude;
	}
	public String getMinLongitude() {
		return minLongitude;
	}
	public void setMinLongitude(String minLongitude) {
		this.minLongitude = minLongitude;
	}
	public String getMaxLatitude() {
		return maxLatitude;
	}
	public void setMaxLatitude(String maxLatitude) {
		this.maxLatitude = maxLatitude;
	}
	public String getMaxLongitude() {
		return maxLongitude;
	}
	public void setMaxLongitude(String maxLongitude) {
		this.maxLongitude = maxLongitude;
	}

	public String toString() {
		return "MinMaxLatLon [minLatitude=" + minLatitude + ", minLongitude=" + minLongitude + ", maxLatitude="
				+ maxLatitude + ", maxLongitude=" + maxLongitude + "]";
	}
	
}
