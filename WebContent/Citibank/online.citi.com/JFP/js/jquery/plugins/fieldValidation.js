if (!mobile)
{
var StyleTag = '<style>div.appReq input{ background-color: #EAF5FB;}div.appReqError label.appLabel{ color: #C00; }div.appReqError input{ background-color: #FFE5E6;}div.appNonReqError label.appLabel{ color: #C00; }div.appNonReqError input         { background-color: #FFE5E6 !important;}div.appNonReq input{ background-color: #FFFFFF;}span.appReqError { color: #C00 !important; }input.appReqError {  background-color: #FFE5E6 !important; }input.appReqNonError {  background-color: #FFE5E6 !important; }</style>';
jQuery("head").append(StyleTag);
}
jQuery.validateFields = jQuery.fn.validateFields  = function(opts) {
   var def = { 
              flg: false 
       };
        var opt =  jQuery.extend(def, opts);  
        var flag = opt.flg;
      
         if(!flag && jQuery(this).length > 0) {
            jQuery(this).each(function() {
                    var eleID = "#" + jQuery(this).attr('id');
                if (jQuery(eleID).attr('class').indexOf("appReq") != -1) jQuery(eleID).removeClass('appReq').addClass('appReqError');
                else  if (jQuery(eleID).attr('class').indexOf("appNonReq") != -1)jQuery(eleID).removeClass('appNonReq').addClass('appNonReqError');                    
            });
        }
        else {
            jQuery(this).each(function() {
                var eleID = "#" + jQuery(this).attr('id');
               
                if (jQuery(eleID).attr('class').indexOf("appReq") != -1) jQuery(eleID).removeClass('appReqError').addClass('appReq');
                else  if (jQuery(eleID).attr('class').indexOf("appNonReq") != -1) jQuery(eleID).removeClass('appNonReqError').addClass('appNonReq');    
                if(typeof jQuery(this).children('label').attr('class')!= 'undefined'){
                 if  (jQuery(this).children('label').attr('class').indexOf("appReq") != -1) jQuery(this).children('label').removeClass('appReqError').addClass('appReq');
                 else if  (jQuery(this).children('label').attr('class').indexOf("appNonReq") != -1) jQuery(this).children('label').removeClass('appReq').addClass('appNonReq');
                 }
                  if(typeof jQuery(this).children('input').attr('class')!= 'undefined'){
                if  (jQuery(this).children('input').attr('class').indexOf("appReq") != -1) jQuery(this).children('input').removeClass('appReqError').addClass('appReq');
                 else if  (jQuery(this).children('input').attr('class').indexOf("appNonReq") != -1) jQuery(this).children('input').removeClass('appReq').addClass('appNonReq');
                }
                if(typeof jQuery(this).children('span').attr('class')!= 'undefined'){
                 if  (jQuery(this).children('span').attr('class').indexOf("appReq") != -1) jQuery(this).children('span').removeClass('appReqError').addClass('appReq');
                 else if  (jQuery(this).children('span').attr('class').indexOf("appNonReq") != -1) jQuery(this).children('span').removeClass('appReq').addClass('appNonReq');
                 }
            });
            
    }
};