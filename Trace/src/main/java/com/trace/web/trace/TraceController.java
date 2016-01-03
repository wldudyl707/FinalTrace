package com.trace.web.trace;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;


import com.trace.service.domain.MinMaxLatLon;
import com.trace.service.domain.Member;
import com.trace.service.domain.Trace;
import com.trace.service.trace.TraceService;

import net.coobird.thumbnailator.Thumbnails;
import net.coobird.thumbnailator.name.Rename;



@Controller
@RequestMapping("/trace/*")
public class TraceController {
	@Autowired ServletContext servletCtx;

	@Autowired
	@Qualifier("traceServiceImpl")
	private TraceService traceService;
		
	public TraceController() {
		System.out.println("\nCommon :: "+this.getClass()+"\n");
	}
		
	@RequestMapping( value="addTrace", method=RequestMethod.POST )
	public @ResponseBody Trace addTrace(@RequestParam("files") List<MultipartFile> images,
				@RequestParam("comment") String comment,@RequestParam("memberId") String memberId,
				@RequestParam("latitude") String latitude, @RequestParam("longtitude") String longtitude, @RequestParam("addr") String addr) throws Exception{

		System.out.println("jsonAddTrace with Images...");
		
		int fileIndex = 0;
		int totalFile = 0;
		
		String genId = null;
		String extName = null;
		String oriImageFileName = "";
		String stoImageFileName = "";

		String filePath = servletCtx.getRealPath("/trace_upload") + "/";
		String thumbPath = servletCtx.getRealPath("/trace_thumb") + "/";
		
		System.out.println(filePath);
		
		for(MultipartFile mpf: images){
			
			totalFile++;
			genId = UUID.randomUUID().toString();
			fileIndex = mpf.getOriginalFilename().lastIndexOf(".");
			extName = mpf.getOriginalFilename().substring(fileIndex, mpf.getOriginalFilename().length());
			
			if(totalFile != images.size()){
				oriImageFileName += mpf.getOriginalFilename() + ",";
				stoImageFileName += genId + extName + ",";
			} else{
				oriImageFileName += mpf.getOriginalFilename();
				stoImageFileName += genId + extName;
			}
			
			try{
				FileCopyUtils.copy(mpf.getBytes(),
						new FileOutputStream(filePath + genId + extName));
				
				Thumbnails.of(new File(filePath+genId+extName))
							.size(1000, 1000)
							.toFiles(new File(thumbPath), Rename.NO_CHANGE);
			}catch(IOException e){
				e.printStackTrace();
			}
		}
		
		Trace trace = new Trace();
		trace.setTraceId(memberId);
		trace.setTraceLikes(0);
		trace.setOriImgName(oriImageFileName);
		trace.setStoImgName(stoImageFileName);
		trace.setText(comment);
		trace.setLatitude(latitude);
		trace.setLongtitude(longtitude);
		trace.setAddr(addr);
		
		System.out.println(trace);
		
		traceService.jsonAddTrace(trace);
		return trace;
	}

	@RequestMapping(value="listTrace")
	public void listTrace(Model model, @RequestParam("memberId") String memberId) throws Exception{
		System.out.println("/trace/listTrace");

		Trace trace = new Trace();
		trace.setTraceId(memberId);
		/*trace.setTraceId("user01");*/
		
		Map<String, Object> map = traceService.getTraceList(trace.getTraceId());
		System.out.println("�솕�땲"+map.get("list"));
		
		List<Trace> list2 = (List<Trace>)map.get("list");
		//List<Trace> newlist = new ArrayList<>();
		List<Trace> newlist2 = new ArrayList<>();
		for (Trace trace2 : list2) {
			Trace trace3 =new Trace();
	        trace3.setAddr(trace2.getAddr());
	        trace3.setTraceNo(trace2.getTraceNo());
	        trace3.setMember(trace2.getMember());
	        trace3.setText(trace2.getText());
	        trace3.setStoImgName(trace2.getStoImgName());
	        newlist2.add(trace3);
		}
		/*for (Trace trace2 : list2) {		   
		   String[] image = trace2.getStoImgName().split(",");
		   
		   
		   Trace trace3 =new Trace();
           trace3.setAddr(trace2.getAddr());
           trace3.setTraceNo(trace2.getTraceNo());
           trace3.setMember(trace2.getMember());
           newlist2.add(trace3);
		   for (String string : image) {
			   Trace trace1 = new Trace();
			   	trace1.setTraceNo(trace2.getTraceNo());
			   	trace1.setStoImgName(string);
			   	newlist.add(trace1); 
		   }
		}*/
		model.addAttribute("list",newlist2);
		//model.addAttribute("list",newlist);
		
		
	}
	
	@RequestMapping(value="updateTrace")
	public void updateTrace(@RequestBody Map<String,Object> map ,Trace trace) throws Exception{
		System.out.println("trace/updateTrace");
		System.out.println("text"+map.get("text"));
		System.out.println("traceNo"+map.get("traceNo"));
		System.out.println("addr"+map.get("addr"));
		System.out.println("latitude"+map.get("latitude"));
		System.out.println("longtitude"+map.get("longtitude"));
		
		
		trace.setAddr(map.get("addr").toString());
		trace.setLatitude(map.get("latitude").toString());
		trace.setLongtitude(map.get("longtitude").toString());
		trace.setTraceNo(Integer.parseInt(map.get("traceNo").toString()));
		trace.setText(map.get("text").toString());
		traceService.updateTrace(trace);
		
		//return traceService.updateTrace(trace);
	}
	
	@RequestMapping(value="getmapList",method=RequestMethod.POST)
	public void getmapList(Model model, @RequestBody Trace trace) throws Exception{
	System.out.println("getmapList");
		  
	  Map<String, Object> map = traceService.getmapList(trace);
      List<Trace> list = (List<Trace>)map.get("list");
      model.addAttribute("list", list);
   }

	@RequestMapping(value="selectTraceRadius", method=RequestMethod.POST)
	   public void selectTraceRadius(@RequestBody MinMaxLatLon minMaxLatLon, Model model) throws Exception{
		   Map<String, Object> map = traceService.selectTraceRadius(minMaxLatLon);
		   List<Trace> list = (List<Trace>)map.get("list");

		   model.addAttribute("list", list);
		  
	   }
   
   @RequestMapping(value="listTrace2", method=RequestMethod.POST)
   public void listTrace(Model model, @RequestBody Trace trace) throws Exception{
      System.out.println("/trace/listTrace2");

      //Trace trace = new Trace();
      trace.setTraceNo(trace.getTraceNo());
      System.out.println("asdasdasd"+trace.getTraceNo());
      /*trace.setTraceId("user01");*/
      
      Trace map = traceService.getTraceList2(trace.getTraceNo());
      System.out.println("123456   "+map);
      
		List<Trace> newlist = new ArrayList<>();
		List<Trace> newlist2 = new ArrayList<>();
		
		Trace trace3 = new Trace();
		trace3.setText(map.getText());
		trace3.setAddr(map.getAddr());
		trace3.setLatitude(map.getLatitude());
		trace3.setLongtitude(map.getLongtitude());
		newlist2.add(trace3);
		
		String[] image = map.getStoImgName().split(",");

		for (String string : image) {
			Trace trace1 = new Trace();
			trace1.setTraceNo(map.getTraceNo());
			trace1.setStoImgName(string);
			newlist.add(trace1);
		}
      
      
      model.addAttribute("list4",newlist2);
      model.addAttribute("list3",newlist);
     

   }
   
   @RequestMapping(value = "deleteImage", method = RequestMethod.POST)
	public void deleteImage(Model model, @RequestBody Map<String, Object> map, Trace trace) throws Exception {
		System.out.println("/trace/deleteImage");
		System.out.println("asdfasdf" + map.get("traceNo"));
		System.out.println("asdfasdf" + map.get("stoImgName"));

		int traceNo = Integer.parseInt(map.get("traceNo").toString());
		String stoImgName = map.get("stoImgName").toString();

		System.out.println("traceNo" + traceNo);
		System.out.println("stoImgName" + stoImgName);

		Trace trace2 = traceService.getTraceList2(traceNo);
		System.out.println("123456   " + trace2);

		String[] image = trace2.getStoImgName().split(",");
		String imgName = "";
		int imgCount = 0;

		for (String string : image) {
			imgCount++;
			if (string.equals(stoImgName)) {
			} else {
				if (image.length != imgCount) {
					imgName += string + ",";
				} else {
					imgName += string;
				}
			}
		}
		trace.setStoImgName(imgName);
		trace.setTraceNo(traceNo);

		traceService.updateTrace(trace);

		System.out.println(imgName);

		/*
		 * String[] image2 = trace2.getStoImgName().split(","); final
		 * List<String> list = new ArrayList<String>(); Collections.addAll(list,
		 * image2); for (String string : list) {
		 * 
		 * if(string.equals(stoImgName)){ System.out.println(string);
		 * list.remove(string); System.out.println(list); }
		 * 
		 * }
		 */

	}
   
   @RequestMapping(value="selectmapList/{traceNo}", method=RequestMethod.GET)
   public void selectmapList(@PathVariable int traceNo, Model model)throws Exception{

      
	   	  System.out.println("여기는 selectmapList");
	    /*  Trace trace = traceService.selectmapOne(traceNo);
	      System.out.println("안녕"+trace);
	      model.addAttribute("list", trace);*/
	   	  
	   	Map<String, Object> map = traceService.selectmapList(traceNo);
		System.out.println("�솕�땲"+map.get("list"));
		
		List<Trace> list2 = (List<Trace>)map.get("list");
		List<Trace> newlist = new ArrayList<>();
		
		for (Trace trace2 : list2) {		   
		   String[] image = trace2.getStoImgName().split(",");
		   
		   
		   for (String string : image) {
			    Trace trace1 = new Trace();
			   	trace1.setTraceNo(trace2.getTraceNo());
			   	trace1.setStoImgName(string);
			   	trace1.setLatitude(trace2.getLatitude());
			   	trace1.setLongtitude(trace2.getLongtitude());
			   	trace1.setText(trace2.getText());
			   
			   	newlist.add(trace1); 
		   }
		}
		
		model.addAttribute("list",newlist);
	      
   }
   
   @RequestMapping(value="updateLikes", method=RequestMethod.POST)
   public void updateLikes(@RequestBody Trace trace, Model model) throws Exception{
	  System.out.println("들어옵니다 이야이호");
	  System.out.println(trace);
	  
	  Trace selectTrace = traceService.selectTrace(trace.getTraceNo());
	  
	  System.out.println("selectTrace"+selectTrace);
	  int addLikes = selectTrace.getTraceLikes()+1;
	  
	  selectTrace.setTraceLikes(addLikes);
	  
	  int likeResult = traceService.updateLikes(selectTrace);
	  Trace likesTrace = traceService.selectTrace(trace.getTraceNo());
	  
	  model.addAttribute("result", likeResult);
	  model.addAttribute("likes", likesTrace);
   }
   
   @RequestMapping(value="updateunLikes", method=RequestMethod.POST)
   public void updateunLikes(@RequestBody Trace trace, Model model) throws Exception{
	  System.out.println("들어옵니다 이야이호");
	  System.out.println(trace);
	  
	  Trace selectTrace = traceService.selectTrace(trace.getTraceNo());
	  System.out.println("selectTrace"+selectTrace);
	  int addLikes = selectTrace.getTraceLikes()-1;
	  selectTrace.setTraceLikes(addLikes);
	  int likeResult = traceService.updateLikes(selectTrace);
	  Trace likesTrace = traceService.selectTrace(trace.getTraceNo());
	  
	  model.addAttribute("result", likeResult);
	  model.addAttribute("likes", likesTrace);
   }
   
   @RequestMapping(value = "likeTotal", method=RequestMethod.POST)
   public void likeTotal(@RequestBody Trace trace, Model model) throws Exception{
	   Trace selectTrace = traceService.selectTrace(trace.getTraceNo());
	   model.addAttribute("liketotal",selectTrace);
   }
}