
// Location of the seal flash file and static image file in your server. 
// Change the directory path if the locations are different in your
// web server 
seal_gif_url="../../../images/verisignseal.html";

/* DON'T CHANGE BELOW */
// dn field is your server host name that hosts the seal that must also 
// match the SSL certificate common name 
dn=document.domain;
sap="getverisignsealimage.html";
splash_url="https://seal.verisign.com/";
tpt="transparent";

language="en";
u1=splash_url+"/splash?form_file=fdf/splash.fdf&dn="+dn+"&lang="+language;

function vrsn_splash() {
	tbar = "location=yes,status=yes,resizable=yes,scrollbars=yes,width=560,height=500";
	sw = window.open(u1,'VRSN_Splash',tbar);
	sw.focus();
}

var VerisignControl =
{

    maction : function (){
			var e = arguments[0];
      if (document.addEventListener) {
        var seal=(e.target.name=="seal");
        if (seal) { vrsn_splash(); return false; }
      } else if(document.captureEvents) {
        var tgt=e.target.toString(); 
        var seal=(tgt.indexOf("splash")!=-1);
        if (seal){ vrsn_splash(); return false; }
      }
      return true;
    },

    mouseDown : function () {
			ua=navigator.userAgent.toLowerCase();
			oie=(ua.indexOf("msie")!=-1);
			if(oie) oie=(ua.indexOf("msie 5")==-1 && ua.indexOf("msie 6")==-1 && ua.indexOf("msie 7")==-1);
      if (typeof event != 'undefined' && event.button==1){
        if (oie) { return true; } else { vrsn_splash(); return false; }
      } else if (typeof event != 'undefined' && event.button==2) { vrsn_splash(); return false; }
    },

		image : function () {
			    document.write('<a href="'+u1+'" tabindex="-1" onmousedown="return VerisignControl.mouseDown();" target="VRSN_Splash"><img name="seal" border="0" src="'+seal_gif_url+'" oncontextmenu="return false;" alt="VeriSign Secured" title="VeriSign Secured"></a>');
		}

}

if (document.addEventListener){ 
	document.addEventListener('mouseup', VerisignControl.maction, true); 
} else {
	if (document.layers){
		document.captureEvents(Event.MOUSEDOWN); document.onmousedown=VerisignControl.maction;
	}
}
