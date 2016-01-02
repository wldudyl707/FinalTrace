package com.trace.service.reply.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.trace.service.domain.Reply;
import com.trace.service.reply.ReplyDao;
import com.trace.service.reply.ReplyService;



@Service("replyServiceImpl")
public class ReplyServiceImpl implements ReplyService {
	
	@Autowired
	@Qualifier("replyDaoImpl")
	private ReplyDao replyDao;
	public void setReplyDao(ReplyDao replyDao){
		this.replyDao = replyDao;
	}
	
	public ReplyServiceImpl() {
		System.out.println("\nCommon :: "+this.getClass()+"\n");
	}

	@Override
	public void jsonAddReply(Reply reply) throws Exception {
		replyDao.jsonAddReply(reply);
		
	}

	@Override
	public List<Reply> jsonGetReply(int traceNo) throws Exception{
		return replyDao.jsonGetReply(traceNo);
	}

	@Override
	public List<Reply> jsonListReply(int traceNo) throws Exception {

		return replyDao.jsonListReply(traceNo);
	}
	
	public int jsonDeleteReply(int commNo) throws Exception {
		return replyDao.jsonDeleteReply(commNo);
	}

	
	
	//지영 TEST
	@Override
	public List<Reply> getReply(Reply reply) throws Exception {
		
		return replyDao.getReply(reply);
	}

	@Override
	public List<Reply> checkReply(Reply reply) throws Exception {
		
		return replyDao.checkReply(reply);
	}

	@Override
	public List<Reply> alramReply(String id) throws Exception {
		return replyDao.alramReply(id);
	}
	


	
}
