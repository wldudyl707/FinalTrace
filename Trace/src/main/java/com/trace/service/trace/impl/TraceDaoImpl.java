package com.trace.service.trace.impl;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import com.trace.service.domain.MinMaxLatLon;
import com.trace.service.domain.Trace;
import com.trace.service.trace.TraceDao;


@Repository("traceDaoImpl")
public class TraceDaoImpl implements TraceDao {
	@Autowired
	@Qualifier("sqlSessionTemplate")
	private SqlSession sqlSession;
	public void setSqlSession(SqlSession sqlSession){
		this.sqlSession = sqlSession;
	}
	
	public TraceDaoImpl(){
		System.out.println("\nCommon :: "+this.getClass()+"\n");
	}
	
	public void jsonAddTrace(Trace trace) throws Exception {
		System.out.println("traceDaoImpl : " + trace);
		sqlSession.insert("TraceMapper.jsonAddTrace", trace);
	}
	
	public List<Trace> getPurchaseList(String traceId) throws Exception {
		return sqlSession.selectList("TraceMapper.getTraceList", traceId);
	}

	@Override
	public int updateTrace(Trace trace) throws Exception {
		return sqlSession.update("TraceMapper.updateTrace", trace);
	}
	
	public List<Trace> getmapList(Trace trace) throws Exception{
	      return sqlSession.selectList("TraceMapper.getmapList", trace);
	}
	   
	   
	public Trace selectmapOne(int traceNo) throws Exception{
	      return sqlSession.selectOne("TraceMapper.selectmapOne", traceNo);
	}
	
	public List<Trace> selectmapList2(Trace trace) throws Exception{
			System.out.println("checkOut"+trace);
	      return sqlSession.selectList("TraceMapper.selectmapList2", trace);
	}

	public List<Trace> selectTraceRadius(MinMaxLatLon minMaxLatLon) throws Exception {
		return sqlSession.selectList("TraceMapper.selectTraceRadius", minMaxLatLon);
	}
	
	public Trace getPurchaseList2(int traceNo) throws Exception {
	      System.out.println(traceNo);
	      return sqlSession.selectOne("TraceMapper.getTraceList2", traceNo);
	      
	   }
	
	public List<Trace> selectmapList(int traceNo) throws Exception {
		return sqlSession.selectList("TraceMapper.selectmapList", traceNo);
	}
	
	@Override
	public Trace selectTrace(int traceNo) throws Exception {
		return sqlSession.selectOne("TraceMapper.getTraceLike", traceNo);
	}

	@Override
	public int updateLikes(Trace trace) throws Exception {
		return sqlSession.update("TraceMapper.updatelikes", trace);
	}
	
}
