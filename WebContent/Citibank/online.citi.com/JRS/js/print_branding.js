if(typeof sbCallBackName != 'undefined' && sbCallBackName != "") __close = sbCallBackName;
function closeIt(){
	if(typeof sbCallBackUrl != 'undefined' && typeof doSBSignOff == 'function') doSBSignOff();
	else window.close();
}
var child_win=null;
function launchPopup(url,winName,winParams){
	if(winName=='_top'){top.location.href=url; return;}
	if(winName==null||winName=='')
		winName='childWin';
	if(child_win!=null&&!child_win.closed)
		child_win.close();
	child_win=window.open(url,winName,winParams);
}
function lnkCiti(url) {
	return url + (url.indexOf('?') == -1 ? _bc : '&'+_bc.substring(1));
}
function lnkChat(url) {
	var _bc="?_u="+_u+"&_uid="+_uid+"&BVE="+_d+"&BVP=/cgi-bin/"+_a+"/scripts/&BV_UseBVCookie=yes";
	return url + (url.indexOf('?') == -1 ? _bc : '&'+_bc.substring(1));
}
function topV(v) {
	if(typeof(eval('self.'+v))!='undefined')
		return eval('self.'+v);
	else if(typeof(eval("top."+v))!='undefined')
		return eval('top.'+v);
	else
		return null;
}
if (typeof(isAO)=='undefined') isAO=false;

var PRODUCTS = 'NNNNNNNNNNNNNNNNN';
var PROFILE =	 'NNNNNNNNNNNNNNNN';
//                        1111111
//              01234567890123456
if(_site == 'CBOL' || _site == 'JFP') {
PROFILE=topV('bv_profile')||PROFILE;
PRODUCTS=topV('bv_products')||PRODUCTS;
} else {
PROFILE=topV('_profile')||PROFILE;
PRODUCTS=topV('_products')||PRODUCTS;
}
if(typeof _isCitiGold!='undefined' && _isCitiGold) PROFILE=PROFILE.substring(0,2)+'Y'+PROFILE.substring(3);
function isSSOFromSB() {	return PROFILE.substring(0,1)=='Y'; }
function isCitiGoldCore() {	return PROFILE.substring(1,2)=='Y'; }
function isCitiGold() {	return (PROFILE.substring(2,3)=='Y'||_pid=='LoginGold'||_pid=='MyCitiVisitorGold'); }
function isIPB() {	return PROFILE.substring(3,4)=='Y'; }
function isPBG() {	return PROFILE.substring(4,5)=='Y'; }
function isCalfed() {	return PROFILE.substring(5,6)=='Y'; }
function isCitipro() {	return PROFILE.substring(6,7)=='Y'; }
function isBPActivate() {	return PROFILE.substring(7,8)=='Y'; }
function isNewUser() {	return PROFILE.substring(8,9)=='Y'; }
function hasProductOwned() {	return PROFILE.substring(9,10)=='Y'; }
function isBillPresentment() {	return PROFILE.substring(10,11)=='Y'; }
function isPaperless() {	return PROFILE.substring(11,12)=='Y'; }
function isIIT() {	return PROFILE.substring(12,13)=='Y'; }
function isThankYou() {	return PROFILE.substring(13,14)=='Y'; }
function isMBEligible() {	return PROFILE.substring(14,15)=='Y'; }
function isMBEnrolled() {	return PROFILE.substring(15,16)=='Y'; }
function hasChecking() {	return PRODUCTS.substring(0,1)=='Y'; }
function hasCheckingPlus() {	return PRODUCTS.substring(1,2)=='Y'; }
function hasBrokerage() {	return PRODUCTS.substring(2,3)=='Y'; }
function hasMarginAcct() {	return PRODUCTS.substring(3,4)=='Y'; }
function hasIRA() {	return PRODUCTS.substring(4,5)=='Y'; }
function hasCD() {	return PRODUCTS.substring(5,6)=='Y'; }
function hasCC() {	return PRODUCTS.substring(6,7)=='Y'; }
function hasMortgage() {	return PRODUCTS.substring(7,8)=='Y'; }
function hasSavings() {	return PRODUCTS.substring(8,9)=='Y'; }
function hasIMMA() {	return PRODUCTS.substring(9,10)=='Y'; }
function hasOtherRetmnt() {	return PRODUCTS.substring(10,11)=='Y'; }
function hasUnsecCrdt() {	return PRODUCTS.substring(11,12)=='Y'; }
function hasSecCrdt() {	return PRODUCTS.substring(12,13)=='Y'; }
function hasUnsecLoan() {	return PRODUCTS.substring(13,14)=='Y'; }
function hasSecuredLoan() {	return PRODUCTS.substring(14,15)=='Y'; }
function hasBusinessAcct() {	return PRODUCTS.substring(15,16)=='Y'; }
function hasMiscAcct() {	return PRODUCTS.substring(16,17)=='Y'; }
function isCustomer() { return (_u == 'customer'); }
function isBanker() { return (_u == 'banker'); }
function isInvestor() { return (_u == 'investor'); }
function isFriend() { return (_u == 'friend' || _u == 'registered_user'); }
function isRegisteredUser() { return (_u == 'registered_user'); }
function isVisitor() { return (_u == 'visitor'); }
function isMember() { return (isBanker() || isInvestor() || isCustomer()); }
if(_site=='CBOL'&&typeof top.citiNavigatorData != 'undefined')
	var citiNavigatorData=top.citiNavigatorData;
else if(typeof _cn != 'undefined'){
		var citiNavigatorData=unescape(_cn);
		citiNavigatorData=citiNavigatorData.replace(/@/g,"|");
		citiNavigatorData=citiNavigatorData.replace(/#/g,":");
		citiNavigatorData=citiNavigatorData.replace(/\+/g," ");
	} else if (typeof citiNavigatorData == 'undefined')
		var citiNavigatorData=cnDefault;
var cntMessages=0;
var _uid='';
var _dta='';
var _ll='';
var _mid='';
if(_site != 'CBOL' && _site != 'JFP') {
	cntMessages=_msg;
	if (cntMessages < 0) cntMessages = Math.abs(cntMessages)-1;
	_uid=_loginName;
} else if (!isVisitor()){
	cntMessages=topV('messageCount')||cntMessages;
	if (cntMessages < -1 ) cntMessages = Math.abs(cntMessages)-1;
	_uid=topV('bv_loginName')||_uid;
	_ll=topV('bv_lastLoginTime')||_ll;
	_mid=topV('bv_masterID')||_mid;
	_dta=topV('bv_dateActivated')||_dta;
}

// _jfp: true=converted; false=not converted;
// this variable is expected to be defined as a client-side javascript variable on each page sporting full navigational branding.
if(typeof _jfp == 'undefined')
	var _jfp = false;
else {
	if (_jfp == true || _jfp == 'true') _jfp = true;
	else _jfp = false;
}
var _j = typeof _j == 'undefined'?'':_j;
var _jcontext= typeof _jcontext != 'undefined'?_jcontext:'/US';
var _dh = typeof _dh == 'undefined'?_d:_dh;
var _path = _d+"/cgi-bin/"+_a+"/scripts/";
var _portal = _d+"/cgi-bin/"+_a+"/portal/";
var _bc="?_u="+_u+"&_uid="+_uid+"&_profile="+PROFILE+"&_products="+PRODUCTS+"&_ll="+_ll+"&_mid="+_mid+"&_dta="+_dta+"&_m="+cntMessages+"&_cn="+escape(citiNavigatorData)+"&_j="+_j+"&_jcontext="+_jcontext+"&_jfp="+_jfp+"&BVE="+_d+"&BVP=/cgi-bin/"+_a+"/scripts/&BV_UseBVCookie=yes";

document.write('' +
'<STYLE TYPE="text/css">' +
'div#printbranding-area { margin-bottom:0px; margin-top: 5px; height:53px; background: transparent url(/JRS/images/brand-hd-print-center.gif) top left repeat-x; overflow:hidden; }'+
'div#printbranding-area img { margin-top: 10px; float: left; }'+
'div#printbranding-left	{ float: left; margin: 0; background: transparent url(/JRS/images/brand-hd-print-left.gif) top left no-repeat; height:53px; width: 21px; }'+
'div#printbranding-right { float:right; margin: 0; background: transparent url(/JRS/images/brand-hd-print-right.gif) top left no-repeat; height:53px; width: 16px;}'+
'div#printbranding-area div#printbranding-nav { position:absolute; right:30px; top:21px; *top:17px }'+
'div#printbranding-area ul { margin:0; }'+
'div#printbranding-area ul li { list-style-type:none; display:inline; font:bold 10px verdana; padding-left:16px; background: url(/JRS/cm/img/bullet.gif) no-repeat 6px 4px;}'+
'div#printbranding-area ul li a { color:#2269b9; text-decoration:none; font:bold 10px verdana; }'+
'div#printbranding-area ul li a:hover { color:#42afe5; text-decoration:underline; }'+
'div#body { margin:0 5px 0 10px; _width: 98%; }'+
'div#printfooter { margin:25px 5px 10px 10px; border-top:1px solid #e7e7e7; padding: 0; color:#999; font:normal 11px verdana; }'+
'div#printfooter-copyright { margin-top:5px; color:#989898; font:normal 11px verdana; }'+
'div#printfooter-copy { margin-top:5px; color:#989898; font:normal 11px verdana; }'+
'div#printfooter-copy p { margin:0px 0px .5em; color:#989898; font:normal 11px verdana; }'+
'div#printfooter a { text-decoration: none; font-family: verdana, sans-serif; font-size: 11px; border-bottom:1px solid #92B4DC; color:#2269B9; padding-bottom:1px !important;}'+
'div#printfooter a:hover { border-bottom:1px solid #78d0fd; color:#78dofd; padding-bottom:1px }'+
'</style>');

document.write(''+
'<div id="printbranding-area">'+
	'<div id="printbranding-left"></div>'+
    '<img src="/JRS/images/brand-hd-print-logo.gif" />'+
	'<div id="printbranding-nav">'+
		'<ul>'+
			'<li><a id="link_lkPrintCommand" href="javascript:window.print()">'+__print+'</a></li>'+
			'<li><a id="link_lkWindowClose" href="javascript:closeIt()">'+__close+'</a></li>'+
		'</ul>'+
	'</div>'+
	'<div id="printbranding-right"></div>'+
'</div>');

function footer(){
document.write(''+
'<div id="printfooter">');
if(typeof _bd != 'undefined' || document.getElementById('bottom-disclaimer')){
	if(document.getElementById('bottom-disclaimer')) _bd = document.getElementById('bottom-disclaimer').innerHTML;
	document.write(''+
	'<div id="printfooter-copy"><p>'+
	 _bd +
	'</p></div>');
}
document.write(''+
	'<div id="printfooter-copyright">'+__copy+'</div>');
if(typeof _server != 'undefined')
	document.write('<br/>'+_server);
document.write('<span id="cbol-footer-mlc"><br/>&nbsp;</span>');
document.write(''+
'</div>');
}

function topNavInit(){
	if(window.location.host.indexOf('cbol.citicorp.com') > 0) {
		if(typeof hbx != 'undefined')
			document.getElementById('cbol-footer-mlc').innerHTML='<br/>'+hbx.mlc+'/'+hbx.pn.replace(/\+/g,' ');
	}
	if (_site == 'CBOL' && top != self) top.pageload=true;
}
var topNavInitPreviousOnLoadHandler = (window.onload) ? window.onload : function () {};
window.onload = function () {topNavInitPreviousOnLoadHandler(); topNavInit();}
