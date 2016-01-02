package com.trace.service.friend.impl;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import com.trace.service.domain.Friend;
import com.trace.service.friend.FriendDao;

@Repository("friendDaoImpl")
public class FriendDaoImpl implements FriendDao {
	
	@Autowired
	@Qualifier("sqlSessionTemplate")
	private SqlSession sqlSession;
	public void setSqlSession(SqlSession sqlSession){
		this.sqlSession = sqlSession;
	}
	
	@Override
	public int addFriend(Friend friend) throws Exception {
		
		return sqlSession.insert("FriendMapper.addFriend", friend);
	}
	
	public List<Friend> listFriend(String friendId) throws Exception {
		System.out.println(sqlSession.selectList("FriendMapper.listFriend", friendId));
		return sqlSession.selectList("FriendMapper.listFriend", friendId);
	}
	
	public int agreeFriend(Friend friend) throws Exception {
		
		return sqlSession.update("FriendMapper.agreeFriend", friend);
	}
	
	public int disAgreeFriend(Friend friend) throws Exception {
		
		return sqlSession.delete("FriendMapper.disAgreeFriend", friend);
	}
	
	public int deleteFriend(Friend friend) throws Exception {
		
		return sqlSession.delete("FriendMapper.deleteFriend", friend);
	}

}
