package com.trace.service.reply.impl;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import com.trace.service.domain.Reply;
import com.trace.service.reply.ReplyDao;


@Repository("replyDaoImpl")
public class ReplyDaoImpl implements ReplyDao {
	@Autowired
	@Qualifier("sqlSessionTemplate")
	private SqlSession sqlSession;
	public void setSqlSession(SqlSession sqlSession){
		this.sqlSession = sqlSession;
	}
	
	public ReplyDaoImpl(){
		System.out.println("\nCommon :: "+this.getClass()+"\n");
	}
	
	public void jsonAddReply(Reply reply) throws Exception {
		sqlSession.insert("ReplyMapper.jsonAddReply", reply);
	}

	@Override
	public List<Reply> jsonGetReply(int traceNo) throws Exception{
		return sqlSession.selectList("ReplyMapper.jsonGetReply", traceNo);
	}

	@Override
	public List<Reply> jsonListReply(int traceNo) throws Exception {
		return sqlSession.selectList("ReplyMapper.jsonListReply",traceNo);
	}
	
	@Override
	public int jsonDeleteReply(int commNo) throws Exception {
		return sqlSession.update("ReplyMapper.jsonDeleteReply", commNo);
	}

	//지영 TEST
	@Override
	public List<Reply> getReply(Reply reply) throws Exception {
		
		return sqlSession.selectList("ReplyMapper.getReply", reply);
	}

	@Override
	public List<Reply> checkReply(Reply reply) throws Exception {
		return sqlSession.selectList("ReplyMapper.checkReply", reply);
	}

	@Override
	public List<Reply> alramReply(String id) throws Exception {
		return sqlSession.selectList("ReplyMapper.alramReply", id);
	}
	


	
}
