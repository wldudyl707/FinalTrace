package com.trace.service.reply;

import java.util.List;

import com.trace.service.domain.Reply;

public interface ReplyDao {
	//SELECT member
	public void jsonAddReply(Reply reply) throws Exception;
	
	public List<Reply> jsonGetReply(int traceNo) throws Exception;
	
	public List<Reply> jsonListReply(int traceNo) throws Exception;
	
	public int jsonDeleteReply(int commNo) throws Exception;
	
	public List<Reply> getReply (Reply reply) throws Exception;
	
	public List<Reply> checkReply (Reply reply) throws Exception;
	
	public List<Reply> alramReply (String id) throws Exception;
	
	
}
