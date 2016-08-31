jQuery(document).ready(function() {
	getContextualOffer();
});
var isFlashSupported;
var isTYCall;
var actionURL;
//Page def for the page is assigned to variable ScreenId.This is done in toplayout.jsp 

var fmnv=5;
var fmav=10;
var n=navigator;
var locationId='';
if(typeof selectedAccountIndex == 'undefined'){
	var selectedAccountIndex= '';
}

if(typeof selectedDestinationAccountIndex == 'undefined'){
	var selectedDestinationAccountIndex = '';
}
if(typeof isDashboardAcctSummaryCall == 'undefined'){
	var isDashboardAcctSummaryCall = '';
}

function fc(){
	try{
		return parseInt(n.plugins["Shockwave Flash"].description.replace(/\D*(\d+)\..*/,"$1"),10);
	}catch(e){}
	for(var i=fmav;i>=0;i--){
		try{
	    	if(new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+i)){
	        	return i;
	        }
	    }
	    catch(e){}
	}
	return 0;
}

function getContextualOffer(){
     if(pageDef=='undefined'||pageDef=='')
        return false;
	var flashVersion = fc();
	if (fc()>=fmnv)	{
		isFlashSupported ="true";
	}else{
		isFlashSupported = "false";
	}
	var actionURL = (pageDef == 'jJPSINFRA_Home')?'/JRS/som/GetContextualOfferDetailsForDashboard.do':'/JRS/som/GetContextualOfferDetails.do';
	var isDashboardCall = (pageDef == 'jJPSINFRA_Home'||pageDef == 'jJPSINFRA_MyCitiHome')?'Y':'N';
	/* Page Def for thankyou */
	isTYCall = (pageDef == 'jJRSRREWARDS_UpgradeToDebitCardConfirm'||pageDef == 'jJRSRREWARDS_ThankYouRewardsEnrolled' || pageDef == 'jJRSRREWARDS_ThankYouAccountList' )?'Y':'N';
	



 /*RUSA P2R3 Changes - RainbowFallback condition is checked for displaying the Contextual Offers*/
    
    if(isRainbowOffersFallback){
	 jQuery.ajax({

		url : actionURL, 
		data : { screenID : pageDef, isFlashSupported : isFlashSupported, locationID :locationId ,selectedAccountIndex : selectedAccountIndex, selectedDestinationAccountIndex: selectedDestinationAccountIndex,isDashboardCall : isDashboardCall, isTYCall : isTYCall},
		success: function(data, status, request){ displayOffer(data, status, request);}, 
		error: function(request, status, errorThrown){  }, 
		timeout : 500000000
	});		
}else {
	if ((pageDef.indexOf('jJRSLINKACCTS_LinkStatus') == -1 || (pageDef.indexOf('jJRSLINKACCTS_LinkStatus') > -1 && selectedAccountIndex != '')) && pageDef.indexOf('jJPSINFRA_Home') == -1) {
	     jQuery.ajax({
	      url: "/US/REST/manageoffers/getoffers.jws",
		  dataType: "json",
		  data: {
			   "pageDef" : pageDef, "isFlashSupported" : isFlashSupported, "LocationID":"CNTX1","selectedAccountIndex" : selectedAccountIndex, "selectedDestinationAccountIndex": selectedDestinationAccountIndex,"isDashboardCall" : isDashboardCall, isTYCall : isTYCall
		  },
		  contentType :'application/x-www-form-urlencoded',
		  type: 'POST',
		  complete: function(request, status) {
		  },
		  error: function(XMLHttpRequest, status, errorThrown) {
		  }, 
		  success: function(data, status, request) {
			 
			 displayOffer(data, status, request);
			 
		  },
		  timeout : 500000000
		});
	}
}
} 

    function displayOffer(data, status, request) {
	var jsonData = jQuery.parseJSON(data);
    
        if(isRainbowOffersFallback)
	     jsonData = jQuery.parseJSON(data);
	    else{
	      jsonData=data;
	    }
	if(jsonData == null) return;
	var screenId = jsonData.screenId;
	if(jsonData.categorizedOffers==null){return;}
	if(jsonData.screenId=='jJPSINFRA_Home'){
		
		jQuery.each(jsonData.categorizedOffers.ContextualOffers, function(idx,coOffer){
			var locId = '';
			var containerId = '';
			
			if((coOffer.locationId.substr(0,3))=='RWT' || (coOffer.locationId.substr(0,3))=='RWA' || (coOffer.locationId.substr(0,3))=='RWH'){
			 locId='cntxoffer_'+coOffer.locationId.substr(0,3);
			 containerId = coOffer.locationId;
			}
			else if((coOffer.locationId.substr(0,3))=='RWC'){
				 locId = 'cntxoffer_RWC_'+coOffer.accountIndex;
				 containerId = coOffer.locationId+'_'+coOffer.accountIndex;
			}
			else{
				 locId = 'cntxoffer_'+coOffer.accountIndex;
				 containerId = coOffer.locationId+'_'+coOffer.accountIndex;
			}	
			
			var linkURL = coOffer.linkUrl;
			var aoOffersIndicator = 'Cards.do';
			var aoOfferParams = 'screenId:'+screenId+'|offerName:'+coOffer.name+'|locID:'+coOffer.locationId;
			var cbolOfferIndicator='&source=1';
			var cbolOfferIndicator1='?source=1';
			var isCBOLOffer=(linkURL.indexOf(cbolOfferIndicator) != -1||linkURL.indexOf(cbolOfferIndicator1) != -1)
							?true:false;
			
			if(linkURL.indexOf(aoOffersIndicator) != -1){
				jQuery.each(coOffer.fields, function(paramKey, paramValue){
			    aoOfferParams = aoOfferParams+'|'+paramKey+':'+paramValue;
				});
				linkURL = linkURL+'&selectedCCIndex='+coOffer.accountIndex+'&aoOfferParams='+aoOfferParams;
			}
			else if(isCBOLOffer){
			var cbolOfferParam='source';
			var valOfCbolOfferParam='cntx_offr';
			linkURL=changeParamValueOfUrl(linkURL,cbolOfferParam,valOfCbolOfferParam);
			linkURL = linkURL+'&screen='+screenId+'&placementID='+coOffer.locationId+'&offerName='+coOffer.name+'&waveId='+coOffer.waveID+'&campaignId='+coOffer.campaignID+'&origin='+coOffer.offerSource+'&selectedAccountIndex='+coOffer.accountIndex;
			}
			
			
			jQuery("#"+locId).removeClass('appHidden');
			if(coOffer.contentType=="IMAGE"){
				if(coOffer.speedBump=="NW")
					jQuery("#"+locId).after('<div id="'+containerId+'"><a href=javascript:updateSOMImgForCO("'+screenId+'","'+coOffer.name+'","'+coOffer.locationId+'","'+coOffer.waveID+'","'+coOffer.campaignID+'","'+coOffer.offerSource+'","'+coOffer.accountIndex+'");javascript:launchPopup("'+linkURL+'","","resizable=yes,status=yes,scrollbars=yes,menubar=yes,location=yes,toolbar=yes,width=715,height=600");><img src="'+coOffer.content+'" alt=""></a></div>');
				else
					jQuery("#"+locId).after('<div id="'+containerId+'"><a href=javascript:updateSOMImgForCO("'+screenId+'","'+coOffer.name+'","'+coOffer.locationId+'","'+coOffer.waveID+'","'+coOffer.campaignID+'","'+coOffer.offerSource+'","'+coOffer.accountIndex+'");javascript:lnk("'+linkURL+'");><img src="'+coOffer.content+'" alt=""></a></div>');
			}
			else if(coOffer.contentType=="CMS"){
				var contentId = coOffer.contentId;
				var extraParams = contentId+"_params"; 
				jQuery("#"+locId).after('<div id="'+containerId+'" class="CO_container"><div class="CO_top"></div><div class="CO_box">'+coOffer.content+'<span id="'+extraParams+'" class="appHidden">"'+coOffer.name+'"||"'+ coOffer.locationId +'"||"'+ coOffer.waveID +'"||"'+ coOffer.campaignID +'"||"'+ coOffer.offerSource+'"||"'+ coOffer.accountIndex +'"</span></div><div class="CO_bottom"></div></div>');
				eval(coOffer.contentId+"=linkURL");
			}
			else if(coOffer.contentType=="JS"){
					if(idx == 0 && coOffer.content != '')
						jQuery('head').append('<scr'+'ipt src="'+coOffer.content+'&location='+containerId+'"></scr'+'ipt>');
					if(linkURL != ''){
						if(coOffer.speedBump == 'NW')
							jQuery("#"+locId).after('<a class="CO_noTextDecoration" href=javascript:updateSOMImgForCO("'+screenId+'","'+coOffer.name+'","'+coOffer.locationId+'","'+coOffer.waveID+'","'+coOffer.campaignID+'","'+coOffer.offerSource+'","'+coOffer.accountIndex+'");javascript:launchPopup("'+linkURL+'","","resizable=yes,status=yes,scrollbars=yes,menubar=yes,location=yes,toolbar=yes,width=715,height=600");><div id="'+containerId+'"></div></a>');
						else
							jQuery("#"+locId).after('<a class="CO_noTextDecoration" href=javascript:updateSOMImgForCO("'+screenId+'","'+coOffer.name+'","'+coOffer.locationId+'","'+coOffer.waveID+'","'+coOffer.campaignID+'","'+coOffer.offerSource+'","'+coOffer.accountIndex+'");javascript:lnk("'+linkURL+'");><div id="'+containerId+'"></div></a>');
					}else
						jQuery("#"+locId).after('<div id="'+containerId+'"></div>');	
			}
			else{
					jQuery('#'+locId).html(coOffer.content);
			}
		 });
	/* R115 Sunrise changes */	
	}else if(jsonData.screenId=='ThankYouRewardsEnrolled' || jsonData.screenId=='UpgradeToDebitCardConfirm' || jsonData.screenId=='ThankYouAccountList'){
		jQuery.each(jsonData.categorizedOffers.ContextualOffers, function(idx,coOffer){
			var locId = 'cntxoffer_'+coOffer.locationId;
			
			var linkURL = coOffer.linkUrl;
			var aoOffersIndicator = 'Cards.do';
			var aoOfferParams = 'screenId:'+screenId+'|offerName:'+coOffer.name+'|locID:'+coOffer.locationId;
			var cbolOfferIndicator='&source=1';
			var cbolOfferIndicator1='?source=1';
			var isCBOLOffer=(linkURL.indexOf(cbolOfferIndicator) != -1||linkURL.indexOf(cbolOfferIndicator1) != -1)
							?true:false;
			if(linkURL.indexOf(aoOffersIndicator) != -1){
				jQuery.each(coOffer.fields, function(paramKey, paramValue){
					aoOfferParams = aoOfferParams+'|'+paramKey+':'+paramValue;
				});
				linkURL = linkURL+'&selectedCCIndex='+coOffer.accountIndex+'&aoOfferParams='+aoOfferParams;
			}
			else if(isCBOLOffer){
				var cbolOfferParam='source';
				var valOfCbolOfferParam='cntx_offr';
				linkURL=changeParamValueOfUrl(linkURL,cbolOfferParam,valOfCbolOfferParam);
				linkURL = linkURL+'&screen='+screenId+'&placementID='+coOffer.locationId+'&offerName='+coOffer.name+'&waveId='+coOffer.waveID+'&campaignId='+coOffer.campaignID+'&origin='+coOffer.offerSource+'&selectedAccountIndex='+coOffer.accountIndex;
			}
			
			jQuery("#tyCtnxOffers").removeClass('appHidden');
			if(coOffer.contentType=="CMS"){
				var contentId = coOffer.contentId;
				var extraParams = contentId+"_params"; 
				var divId = "#ctnxOffer"+idx;
				
				var divContentToRepalce = '<div id="'+locId+'">'+coOffer.content+'<span id="'+extraParams+'" class="appHidden">"'+coOffer.name+'"||"'+ coOffer.locationId +'"||"'+ coOffer.waveID +'"||"'+ coOffer.campaignID +'"||"'+ coOffer.offerSource +'"||"'+coOffer.accountIndex +'"</span></div>';

				jQuery(divId).html(divContentToRepalce);
				eval(coOffer.contentId+"=linkURL");
	        }
			
			else{
				jQuery("#ctnxOffers1").after('<div id="'+locId+'"></div>');
				jQuery('#'+locId).html(coOffer.content);
			}
		 });
		jQuery.each(jsonData.categorizedOffers.Offers, function(idx,coOffer){
			var locId = 'cntxoffer_'+coOffer.locationId;
			
			var linkURL = coOffer.linkUrl;
			var aoOffersIndicator = 'Cards.do';
			var aoOfferParams = 'screenId:'+screenId+'|offerName:'+coOffer.name+'|locID:'+coOffer.locationId;
			var cbolOfferIndicator='&source=1';
			var cbolOfferIndicator1='?source=1';
			var isCBOLOffer=(linkURL.indexOf(cbolOfferIndicator) != -1||linkURL.indexOf(cbolOfferIndicator1) != -1)
							?true:false;
			if(linkURL.indexOf(aoOffersIndicator) != -1){
				jQuery.each(coOffer.fields, function(paramKey, paramValue){
					aoOfferParams = aoOfferParams+'|'+paramKey+':'+paramValue;
				});
				linkURL = linkURL+'&selectedCCIndex='+coOffer.accountIndex+'&aoOfferParams='+aoOfferParams;
			}
			else if(isCBOLOffer){
				var cbolOfferParam='source';
				var valOfCbolOfferParam='cntx_offr';
				linkURL=changeParamValueOfUrl(linkURL,cbolOfferParam,valOfCbolOfferParam);
				linkURL = linkURL+'&screen='+screenId+'&placementID='+coOffer.locationId+'&offerName='+coOffer.name+'&waveId='+coOffer.waveID+'&campaignId='+coOffer.campaignID+'&origin='+coOffer.offerSource+'&selectedAccountIndex='+coOffer.accountIndex;
			}
			
				jQuery("#tyCtnxOffers").removeClass('appHidden');
			if(coOffer.contentType=="CMS"){
				var contentId = coOffer.contentId;
				var extraParams = contentId+"_params"; 
				var divId = "#ctnxOffer"+idx;
				
				var divContentToRepalce = '<div id="'+locId+'">'+coOffer.content+'<span id="'+extraParams+'" class="appHidden">"'+coOffer.name+'"||"'+ coOffer.locationId +'"||"'+ coOffer.waveID +'"||"'+ coOffer.campaignID +'"||"'+ coOffer.offerSource +'"||"'+coOffer.accountIndex +'"</span></div>';

				jQuery(divId).html(divContentToRepalce);
				eval(coOffer.contentId+"=linkURL");
		    }
			
			else{
				jQuery("#ctnxOffers1").after('<div id="'+locId+'"></div>');
				jQuery('#'+locId).html(coOffer.content);
			}
		 });
	}
		else if(jsonData.screenId=='jJRSLINKACCTS_LinkCardStatus' || jsonData.screenId=='jJRSLINKACCTS_LinkStatus'){
			jQuery.each(jsonData.categorizedOffers.OverlayOffers, function(idx,coOffer){
				var locId = 'somDeobOffer_'+coOffer.locationId;
				jQuery('#'+locId).html('<a id="'+locId+'_banner" href=javascript:SvcHubFireUrl("'+coOffer.linkUrl+'","'+coOffer.speedBump+'","'+jsonData.screenId+'","'+coOffer.name+'","'+coOffer.locationId+'","'+coOffer.accountIndex+'","'+coOffer.offerSource+'");  alt=""><img src="'+coOffer.content+'" ></img></a>');
			});
			jQuery("#somDeobOffer_CONF").removeClass('appHidden');
			
	}else{
		jQuery.each(jsonData.categorizedOffers.ContextualOffers, function(idx,coOffer){
		var locId = 'cntxoffer_'+coOffer.locationId;
		
		var linkURL = coOffer.linkUrl;
		var aoOffersIndicator = 'Cards.do';
		var aoOfferParams = 'screenId:'+screenId+'|offerName:'+coOffer.name+'|locID:'+coOffer.locationId;
		var cbolOfferIndicator='&source=1';
		var cbolOfferIndicator1='?source=1';
		var isCBOLOffer=(linkURL.indexOf(cbolOfferIndicator) != -1||linkURL.indexOf(cbolOfferIndicator1) != -1)
						?true:false;
		if(linkURL.indexOf(aoOffersIndicator) != -1){
			jQuery.each(coOffer.fields, function(paramKey, paramValue){
				aoOfferParams = aoOfferParams+'|'+paramKey+':'+paramValue;
			});
			linkURL = linkURL+'&selectedCCIndex='+coOffer.accountIndex+'&aoOfferParams='+aoOfferParams;

		}
		else if(isCBOLOffer){
			var cbolOfferParam='source';
			var valOfCbolOfferParam='cntx_offr';
			linkURL=changeParamValueOfUrl(linkURL,cbolOfferParam,valOfCbolOfferParam);
			linkURL = linkURL+'&screen='+screenId+'&placementID='+coOffer.locationId+'&offerName='+coOffer.name+'&waveId='+coOffer.waveID+'&campaignId='+coOffer.campaignID+'&origin='+coOffer.offerSource+'&selectedAccountIndex='+coOffer.accountIndex;
		}
		
		jQuery("#ctnxOffers1").removeClass('appHidden');
		if(coOffer.contentType=="IMAGE"){
			if(coOffer.speedBump=="NW"){
				jQuery("#ctnxOffers1").after('<div id="'+locId+'"><a href=javascript:updateSOMImgForCO("'+screenId+'","'+coOffer.name+'","'+coOffer.locationId+'","'+coOffer.waveID+'","'+coOffer.campaignID+'","'+coOffer.offerSource+'","'+coOffer.accountIndex+'");javascript:launchPopup("'+linkURL+'","","resizable=yes,status=yes,scrollbars=yes,menubar=yes,location=yes,toolbar=yes,width=715,height=600");><img src="'+coOffer.content+'" alt=""></a></div>');
			}
			else{
				jQuery("#ctnxOffers1").after('<div id="'+locId+'"><a href=javascript:updateSOMImgForCO("'+screenId+'","'+coOffer.name+'","'+coOffer.locationId+'","'+coOffer.waveID+'","'+coOffer.campaignID+'","'+coOffer.offerSource+'","'+coOffer.accountIndex+'");javascript:lnk("'+linkURL+'");><img src="'+coOffer.content+'" alt=""></a></div>');
			}
		}
		else if(coOffer.contentType=="CMS"){
			var contentId = coOffer.contentId;
			var extraParams = contentId+"_params";
			// added for 1301015 TY Suite value prop
			var content = coOffer.content;
			jQuery.each(coOffer.fields, function(paramKey, paramValue){
				if(paramKey=="Dynamic"){					
					if(paramValue != null && paramValue != ""){
						var dynamicValueArray = paramValue.split(",");						
						jQuery.each(dynamicValueArray, function(index, value){					
							if(value.indexOf("https://online.citi.com/")==-1){
								value = value.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
							}
							content = content.replace("placeHolder"+(index+1),value );
						});
					}									
				}
				return (paramKey != "Dynamic");
			});

			  jQuery("#ctnxOffers1").after('<div id="'+locId+'" class="CO_container"><div class="CO_top"></div><div class="CO_box">'+content+'<span id="'+extraParams+'" class="appHidden">"'+coOffer.name+'"||"'+ coOffer.locationId +'"||"'+ coOffer.waveID +'"||"'+ coOffer.campaignID +'"||"'+ coOffer.offerSource +'"||"'+coOffer.accountIndex +'"</span></div><div class="CO_bottom"></div></div>');

            eval(coOffer.contentId+"=linkURL");
              }
              				
		else if(coOffer.contentType=="JS"){
				if(idx == 0 && coOffer.content != '')
					jQuery('head').append('<scr'+'ipt src="'+coOffer.content+'&location='+locId+'"></scr'+'ipt>');
				if(linkURL != ''){
					if(coOffer.speedBump == 'NW')
						jQuery("#ctnxOffers1").after('<a class="CO_noTextDecoration" href=javascript:updateSOMImgForCO("'+screenId+'","'+coOffer.name+'","'+coOffer.locationId+'","'+coOffer.waveID+'","'+coOffer.campaignID+'","'+coOffer.offerSource+'","'+coOffer.accountIndex+'");javascript:launchPopup("'+linkURL+'","","resizable=yes,status=yes,scrollbars=yes,menubar=yes,location=yes,toolbar=yes,width=715,height=600");><div id="'+locId+'"></div></a>');
					else
						jQuery("#ctnxOffers1").after('<a class="CO_noTextDecoration" href=javascript:updateSOMImgForCO("'+screenId+'","'+coOffer.name+'","'+coOffer.locationId+'","'+coOffer.waveID+'","'+coOffer.campaignID+'","'+coOffer.offerSource+'","'+coOffer.accountIndex+'");javascript:lnk("'+linkURL+'");><div id="'+locId+'"></div></a>');
				}else
					jQuery("#ctnxOffers1").after('<div id="'+locId+'"></div>');
			 }
		else{
			jQuery("#ctnxOffers1").after('<div id="'+locId+'"></div>');
			jQuery('#'+locId).html(coOffer.content);
		}
	 });
	}
}

  //DEOB Related changes	
	function SvcHubFireUrl(url,speedBump,screenID,offerName,locID,accountIndex,origin){
		
		if(locID != 'MOBP' && locID != 'TABP' && locID != 'CTMB'){
			updateSOMImgForCO(screenID,offerName,locID,'','',origin);			
		}
		if(speedBump =="NW"){
			launchPopup(url,'','resizable=yes,status=yes,scrollbars=yes,menubar=yes,location=yes,toolbar=yes,width=715,height=600');
		}else{
			lnk(url);
		}
	} 
	
    
function updateSOMForCO(obj,contentId){
	if(isTYCall == 'Y')	pageDef = screenID;	
	aIndex = contentId.indexOf('_');
	oContent = contentId.substring(aIndex+1,contentId.length);
	var span_id = "#" + oContent + "_params";
	var splitContent = trim(jQuery(span_id).html()).split('||');
    var origin = splitContent[4].replace(/"/g,'');
	var campaignId = splitContent[3].replace(/"/g,'');
	var waveId = splitContent[2].replace(/"/g,'');
	var placementID = splitContent[1].replace(/"/g,'');
	var offerName= splitContent[0].replace(/"/g,'');
	var acctIndex= splitContent[5].replace(/"/g,'');

 /*RUSA P2R3 Changes - RainbowFallback condition is checked for updating the Contextual Offers*/
	if(isRainbowOffersFallback){

    jQuery.ajax({
		 url: '/JRS/som/UpdateContextualOfferDetails.do',
		 data : { screenID: pageDef, placementID: placementID, offerName: offerName }
	   });
	   }
	   else 
	   {
	      jQuery.ajax({
		  url: "/US/REST/manageoffers/updateofferstatus.jws",
		  dataType: "json",
		  data : { screenID: pageDef,selectedAccountIndex:acctIndex, placementID: placementID, offerName: offerName,waveID:waveId,origin:origin,campaignId:campaignId,copOfferStatus:"Interested",somOfferStatus:"Clicked" },
		  contentType :'application/x-www-form-urlencoded',
		  type: 'POST',
		  complete: function(request, status) {
		  },
		  error: function(XMLHttpRequest, status, errorThrown) { 
		  }, 
		  success: function(data, status, xhr) {  
		  }
	   });
	   }
}

function updateSOMImgForCO(screenID,offerName,locID,waveId,campaignId,origin,accountIndex){
/*RUSA P2R3 Changes - RainbowFallback condition is checked for updating the Contextual Offers*/
if(isRainbowOffersFallback){
   jQuery.ajax({
		 url: '/JRS/som/UpdateContextualOfferDetails.do',
		 data : { screenID: screenID, placementID: locID, offerName: offerName }
	   });
}
else 
	   {
	    
	   jQuery.ajax({
		  url: "/US/REST/manageoffers/updateofferstatus.jws",
		  dataType: "json",
	      data : { screenID: pageDef, placementID: locID, offerName: offerName,waveID:waveId,origin:origin,campaignId:campaignId,selectedAccountIndex:accountIndex,copOfferStatus:"Interested",somOfferStatus:"Clicked" },
		  contentType :'application/x-www-form-urlencoded',
		  type: 'POST',
		  complete: function(request, status) {
		  },
		  error: function(XMLHttpRequest, status, errorThrown) { 
		  }, 
		  success: function(data, status, xhr) {  
		  }
	});
	  }
}

function changeParamValueOfUrl(url,param,newValueOfParam){
	var value=newValueOfParam;
	var changedUrl;
	var pattern;
	if(url.indexOf('&'+param+'=')!=-1) pattern='&'+param+'=';
	else if(url.indexOf('?'+param+'=')!=-1) pattern='?'+param+'=';
	var splittedUrl=url.split(pattern);
	var tail;
	if(splittedUrl[1]==null){
			return url;
	}
	else{
		tail=(splittedUrl[1].indexOf('&')!=-1)?splittedUrl[1].substring(splittedUrl[1].indexOf('&')):null;
		changedUrl=tail!=null?splittedUrl[0]+pattern+value+tail:splittedUrl[0]+pattern+value;
		return changedUrl;
	}

}