package com.trace.service.trace;

import java.util.List;

import com.trace.service.domain.MinMaxLatLon;
import com.trace.service.domain.Trace;

public interface TraceDao {
	//SELECT member
	public void jsonAddTrace(Trace Trace) throws Exception;
	
	public List<Trace> getPurchaseList(String traceId) throws Exception;
	
	public int updateTrace(Trace trace) throws Exception;
	
	public List<Trace> getmapList(Trace trace) throws Exception;
	   
	public Trace selectmapOne(int traceNo) throws Exception;
	
	public List<Trace> selectmapList2(Trace trace) throws Exception;
	
	public List<Trace> selectTraceRadius(MinMaxLatLon minMaxLatLon) throws Exception;
	
	public Trace getPurchaseList2(int traceNo) throws Exception;
	
	public List<Trace> selectmapList(int traceNo) throws Exception;
	
	public Trace selectTrace(int traceNo) throws Exception;
	
	public int updateLikes(Trace trace) throws Exception;
}
