package com.trace.service.member.impl;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import com.trace.service.domain.Member;
import com.trace.service.member.MemberDao;

@Repository("memberDaoImpl")
public class MemberDaoImpl implements MemberDao {
	@Autowired
	@Qualifier("sqlSessionTemplate")
	private SqlSession sqlSession;
	public void setSqlSession(SqlSession sqlSession){
		this.sqlSession = sqlSession;
	}
	
	public MemberDaoImpl(){
		System.out.println(this.getClass());
	}
	
	public Member getMember(String memberId) throws Exception {
		return sqlSession.selectOne("MemberMapper.getMember", memberId);
	}

	public int jsonAddMember(Member member) throws Exception {
		return sqlSession.insert("MemberMapper.jsonAddMember", member);
	}

	public int updateMember(Member member) throws Exception {
		return sqlSession.update("MemberMapper.updateMember", member);
	}
	public int deleteMember(String memberId) throws Exception {
		return sqlSession.delete("MemberMapper.deleteMember", memberId);
	}
	
	@Override
	public int updateLogin(String memberId) throws Exception {
		// TODO Auto-generated method stub
		return sqlSession.update("MemberMapper.lastLogin",memberId);
	}
	
	public int updateProfile(Member member) throws Exception {
	      return sqlSession.update("MemberMapper.updateProfile", member);
	   }
	
	
	
}
