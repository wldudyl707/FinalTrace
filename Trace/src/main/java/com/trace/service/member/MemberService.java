
package com.trace.service.member;

import com.trace.service.domain.Member;

public interface MemberService {
	
	public Member getMember(String memberId) throws Exception;
	public int jsonAddMember(Member member) throws Exception;
	public int updateMember(Member member) throws Exception;

	public int deleteMember(String memberId) throws Exception;

	public int updateLogin(String memberId) throws Exception;
	
	public int updateProfile(Member member) throws Exception;

}
