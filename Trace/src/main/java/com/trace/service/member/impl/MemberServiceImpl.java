package com.trace.service.member.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.trace.service.domain.Member;
import com.trace.service.member.MemberDao;
import com.trace.service.member.MemberService;

@Service("memberServiceImpl")
public class MemberServiceImpl implements MemberService {
	
	@Autowired
	@Qualifier("memberDaoImpl")
	private MemberDao memberDao;
	public void setMemberDao(MemberDao memberDao){
		this.memberDao = memberDao;
	}
	
	public MemberServiceImpl() {
		System.out.println(this.getClass());
	}

	@Override
	public Member getMember(String memberId) throws Exception {
		return memberDao.getMember(memberId);
	}
	
	@Override
	public int jsonAddMember(Member member) throws Exception {
		return memberDao.jsonAddMember(member);
	}

	@Override
	public int updateMember(Member member) throws Exception {
		return memberDao.updateMember(member);
	}

	@Override
	public int deleteMember(String memberId) throws Exception {
		return memberDao.deleteMember(memberId);
	}


	@Override
	public int updateLogin(String memberId) throws Exception {
		return memberDao.updateLogin(memberId);
	}
	
	 public int updateProfile(Member member) throws Exception{
	      return memberDao.updateProfile(member);
	   }

}
