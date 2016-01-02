package com.trace.service.trace.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.trace.service.domain.MinMaxLatLon;
import com.trace.service.domain.Trace;
import com.trace.service.trace.TraceDao;
import com.trace.service.trace.TraceService;



@Service("traceServiceImpl")
public class TraceServiceImpl implements TraceService {
	
	@Autowired
	@Qualifier("traceDaoImpl")
	private TraceDao traceDao;
	public void setTraceDao(TraceDao traceDao){
		this.traceDao = traceDao;
	}
	
	public TraceServiceImpl() {
		System.out.println("\nCommon :: "+this.getClass()+"\n");
	}	
	
	@Override
	public void jsonAddTrace(Trace trace) throws Exception {
		System.out.println("traceServiceImpl : " + trace);
		traceDao.jsonAddTrace(trace);
	}
	
	@Override
	public Map<String, Object> getTraceList(String traceId) throws Exception {
		Map<String, Object> map = new HashMap<String, Object>();
		List<Trace> list = traceDao.getPurchaseList(traceId);
		map.put("list", list);
		return map;
	}

	@Override
	public int updateTrace(Trace trace) throws Exception {
		return traceDao.updateTrace(trace);
	}
	
	@Override
	public Map<String, Object> getmapList(Trace trace) throws Exception{
	    Map<String, Object> map = new HashMap<String, Object>();
	    List<Trace> list = traceDao.getmapList(trace);
	    map.put("list", list);
	    return map;
	}
	   

	@Override
	public Trace selectmapOne(int traceNo) throws Exception {
		return traceDao.selectmapOne(traceNo);
	}

	@Override
	public Map<String, Object> selectmapList2(Trace trace) throws Exception {
		Map<String, Object> map = new HashMap<String, Object>();
	    List<Trace> list = traceDao.selectmapList2(trace);
	    map.put("list", list);
	    return map;
	}

	@Override
	public Map<String, Object> selectTraceRadius(MinMaxLatLon minMaxLatLon) throws Exception {
		Map<String, Object> map = new HashMap<String, Object>();
		List<Trace> list = traceDao.selectTraceRadius(minMaxLatLon);
		map.put("list", list);
		return map;
	}
	
	@Override
	   public Trace getTraceList2(int traceNo) throws Exception {
		return traceDao.getPurchaseList2(traceNo);
	   }
	
	
	@Override
	public Map<String, Object> selectmapList(int traceNo) throws Exception {
		Map<String, Object> map = new HashMap<String, Object>();
		List<Trace> list = traceDao.selectmapList(traceNo);
		map.put("list", list);
		return map;
	}
	
	@Override
	public Trace selectTrace(int traceNo) throws Exception {
		return traceDao.selectTrace(traceNo);
	}

	@Override
	public int updateLikes(Trace trace) throws Exception {
		return traceDao.updateLikes(trace);
	}
	
}

