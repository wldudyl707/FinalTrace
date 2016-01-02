package com.trace.service.likeState.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.trace.service.domain.LikeState;
import com.trace.service.likeState.LikeStateDao;
import com.trace.service.likeState.LikeStateService;

@Service("likeStateServiceImpl")
public class LikeStateServiceImpl implements LikeStateService {

	@Autowired
	@Qualifier("likeStateDaoImpl")
	private LikeStateDao likeStateDao;
	public void setLikeStateDao(LikeStateDao likeStateDao){
		this.likeStateDao = likeStateDao;
	}
	
	public LikeStateServiceImpl() {
		// TODO Auto-generated constructor stub
	}

	@Override
	public int AddLikeState(LikeState likeState) throws Exception {
		return likeStateDao.AddLikeState(likeState);
		
	}

	@Override
	public List<LikeState> getLikeState(LikeState likeState) throws Exception {
		return likeStateDao.getLikeState(likeState);
	}

	@Override
	public int updateLikeState(LikeState likeState) throws Exception {
		// TODO Auto-generated method stub
		return likeStateDao.updateLikeState(likeState);
	}

}
