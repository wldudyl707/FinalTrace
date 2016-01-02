package com.trace.service.likeState;

import java.util.List;

import com.trace.service.domain.LikeState;

public interface LikeStateDao {
	
	public int AddLikeState(LikeState likeState) throws Exception;
	
	public List<LikeState> getLikeState(LikeState likeState) throws Exception;
	
	public int updateLikeState (LikeState likeState) throws Exception;

}
