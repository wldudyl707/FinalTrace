package com.trace.service.trace;

import java.util.List;
import java.util.Map;

import com.trace.service.domain.MinMaxLatLon;
import com.trace.service.domain.Trace;

public interface TraceService {
	//SELECT member
	public void jsonAddTrace(Trace trace) throws Exception;
	
	public Map<String, Object> getTraceList(String traceId) throws Exception;
	
	public int updateTrace(Trace trace) throws Exception;

	public Map<String, Object> getmapList(Trace trace) throws Exception;

    public Trace selectmapOne(int traceNo) throws Exception;
    
    public Map<String, Object> selectmapList2(Trace trace) throws Exception;
	
	public Map<String, Object> selectTraceRadius(MinMaxLatLon minMaxLatLon) throws Exception;
    
	public Trace getTraceList2(int traceNo) throws Exception;
	
	public Map<String, Object> selectmapList(int traceNo) throws Exception;
	
	public Trace selectTrace(int traceNo) throws Exception;
	
	public int updateLikes(Trace trace) throws Exception;	
}
