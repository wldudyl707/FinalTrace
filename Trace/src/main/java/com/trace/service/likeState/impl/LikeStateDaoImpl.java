package com.trace.service.likeState.impl;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import com.trace.service.domain.LikeState;
import com.trace.service.likeState.LikeStateDao;

@Repository("likeStateDaoImpl")
public class LikeStateDaoImpl implements LikeStateDao{

	@Autowired
	@Qualifier("sqlSessionTemplate")
	private SqlSession sqlSession;
	public void setSqlSession(SqlSession sqlSession){
		this.sqlSession = sqlSession;
	}
	
	public LikeStateDaoImpl() {
		// TODO Auto-generated constructor stub
	}

	@Override
	public int AddLikeState(LikeState likeState) throws Exception {
		return sqlSession.insert("LikeStateMapper.insertLikeState", likeState);
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<LikeState> getLikeState(LikeState likeState) throws Exception {
		System.out.println("왜 안넘어와!!!!"+likeState);
		return sqlSession.selectList("LikeStateMapper.getLikeState", likeState);
	}

	@Override
	public int updateLikeState(LikeState likeState) throws Exception {
		
		return sqlSession.delete("LikeStateMapper.updateLikeState", likeState);
	}

}
