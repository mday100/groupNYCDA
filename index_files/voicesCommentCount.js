
function CommentCount(){
	var arrayOfCommentsCategory = new Array();
	
	function getCommentCount(){	
		for(var i=0; i<commentCountApiArray.length; i++){
			var obj=commentCountApiArray[i];
			if (!isCategoryIdProcessed(obj.catId)){
				arrayOfCommentsCategory[arrayOfCommentsCategory.length]=getObjectOfCategoryIdAndStreamIDs(obj.catId);
			}
		}
		for(var j=0; j<arrayOfCommentsCategory.length; j++){
			var item = arrayOfCommentsCategory[j];
			var params = {
				categoryID: item.categoryId,
				streamIDs: item.streamIds,
				callback:processResponse,
				context:item.categoryId
			};
			gigya.comments.getStreamInfo(params);
		}
		
	}
	
	function isCategoryIdProcessed(categoryId){
		for(var i=0; i<arrayOfCommentsCategory.length; i++){
			var obj=arrayOfCommentsCategory[i];
			if (obj.categoryId === categoryId) {
				return true;
			}
		}
		return false;
	}
	
	function getObjectOfCategoryIdAndStreamIDs(categoryId){
		var arrayOfStreamIds = new Array();
		for(var i=0; i<commentCountApiArray.length; i++){
			var obj=commentCountApiArray[i];
			if (categoryId === obj.catId){
				if (!isStreamIdAlreadyAddedInArrayOfStreamIds(arrayOfStreamIds,obj.strId)) {
					arrayOfStreamIds[arrayOfStreamIds.length] = obj.strId;
					arrayOfStreamIds[arrayOfStreamIds.length] = obj.strId+'_for';
					arrayOfStreamIds[arrayOfStreamIds.length] = obj.strId+'_against';
				}
			}
		}
		var returnObject = new Object();
		returnObject.categoryId = categoryId;
		returnObject.streamIds = arrayOfStreamIds;
		return returnObject;
	}
	
	function isStreamIdAlreadyAddedInArrayOfStreamIds(arrayOfStreamIds, streamId) {
		for(var j=0; j<arrayOfStreamIds.length; j++){
			var item = arrayOfStreamIds[j];
			if (item === streamId) {
				return true;
			}
		}
		return false;
	}
	
	function processResponse(response) {
		var responseStreamInfo = response.streamInfo;
		var responseCategoryId = response.context;
		if (typeof responseStreamInfo != 'undefined'){
			for(var i=0; i<responseStreamInfo.length; i++){
				var responseObjItem = responseStreamInfo[i];
				if (responseObjItem.status === 'enabled') {
					var index = commentCountDataArray.length;
					commentCountDataArray[index] = responseObjItem;
					commentCountDataArray[index].count=responseObjItem.commentCount;
					commentCountDataArray[index].categoryID=responseObjItem.categoryID;
					commentCountDataArray[index].streamID=responseObjItem.streamID;
				}
			}
			processCommentCount(responseCategoryId);
		}
		
	}
	
	function processCommentCount(categoryId) {
		for(var i=0; i<commentCountApiArray.length; i++){
			var obj = commentCountApiArray[i];
			if (obj.catId === categoryId){
				var commentCountValue = getCommentCountValueFromDataArray(obj.catId, obj.strId);
				if(commentCountValue > 0){
					$('#'+obj.commentCountWrapper).show();
					$('#'+obj.commentCountHolder).append(commentCountValue);
				}
			}
		}
	}
	
	function getCommentCountValueFromDataArray(categoryId, streamId){
		var commentCountValueForStream = 0;
		for(var i=0; i<commentCountDataArray.length; i++){
			var item = commentCountDataArray[i];
			if (item.categoryID === categoryId && (item.streamID === streamId || item.streamID === streamId+'_for' || item.streamID === streamId+'_against')) {
				commentCountValueForStream = commentCountValueForStream + item.count;
			}
		}
		return commentCountValueForStream;
	}
	
	return{
		init:function(){
			getCommentCount();
		}
	}
}


$(document).ready(function() {
	var commentCount = new CommentCount();
	commentCount.init();
	
});
