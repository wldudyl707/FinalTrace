package com.trace.web.member;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.trace.service.domain.Member;
import com.trace.service.member.MemberService;

import net.coobird.thumbnailator.Thumbnails;
import net.coobird.thumbnailator.name.Rename;

@Controller
@RequestMapping("/member/*")
public class MemberController {
	@Autowired ServletContext servletCtx;
	
	@Autowired
	@Qualifier("memberServiceImpl")
	private MemberService memberService;
		
	public MemberController() {
		System.out.println(this.getClass());
	}
	
	@RequestMapping(value="getJsonMember", method=RequestMethod.POST)
	public void getJsonMember(@RequestBody Member member, Model model) throws Exception{

		Member members = memberService.getMember(member.getMemberId());
		model.addAttribute("member", members);
	}
	
	@RequestMapping(value="lastLogin", method=RequestMethod.POST)
	public void lastLogin(@RequestBody Member member, Model model) throws Exception{

		System.out.println("LastLogin");
		System.out.println(member.getMemberId());
		int result = memberService.updateLogin(member.getMemberId());
		model.addAttribute("update", result);
		
	}
	
	@RequestMapping(value="updateMember")
	   public void updateMember(@RequestBody Member member ,Model model) throws Exception{
	      
	      
	      System.out.println("updateMember 들어옴"+member);
	      
	      
	      int upResult = memberService.updateProfile(member);
	      
	      model.addAttribute("upResult", upResult);

	   }
	
	@RequestMapping(value="jsonLogin", method=RequestMethod.POST)
	public void jsonLogin(@RequestBody Member member, 
			HttpSession session, Model model) throws Exception{
		
		Member dbMember = memberService.getMember(member.getMemberId());
		System.out.println("dbMember :" + dbMember);
		if(dbMember != null && member.getMemberPwd().equals(dbMember.getMemberPwd())){
			//session.setAttribute("members", dbMember);
			model.addAttribute("member", dbMember);

			model.addAttribute("memberId", dbMember.getMemberId());
			
			
		} else {
			model.addAttribute("member", null);
		}
	}
	
	@RequestMapping(value="addMember", method=RequestMethod.POST)
	public @ResponseBody int addMember(@RequestParam("files") MultipartFile image, Member member) throws Exception{
		System.out.println("/member/addMember");
		
		int fileIndex = 0;
		int totalFile = 0;
		
		String genId = null;
		String extName = null;

		String filePath = servletCtx.getRealPath("/mem_upload") + "/";
		String thumbPath = servletCtx.getRealPath("/mem_thumb") + "/";
		
		genId = UUID.randomUUID().toString();
		fileIndex = image.getOriginalFilename().lastIndexOf(".");
		extName = image.getOriginalFilename().substring(fileIndex, image.getOriginalFilename().length());
		
		member.setOriImgName(image.getOriginalFilename());
		member.setStoImgName(genId+extName);
		
		int row = memberService.jsonAddMember(member);
		
		if(row > 0){
			try{
				FileCopyUtils.copy(image.getBytes(),
						new FileOutputStream(filePath+genId+extName));
				
				Thumbnails.of(new File(filePath+genId+extName))
							.size(216, 146)
							.toFiles(new File(thumbPath), Rename.NO_CHANGE);
				
			}catch(IOException e){
				e.printStackTrace();
			}
		}
		
		return row;
	}
	
	@RequestMapping(value="updateStoredImageName")
	public void updateMember(Member member) throws Exception{
		
		int rows = memberService.updateMember(member);
		System.out.println(rows);
	}
	
	
	@RequestMapping(value="deleteMember")
	public void deleteMember(Member member) throws Exception{
		int rows = memberService.deleteMember(member.getMemberId());
	}
	
}
