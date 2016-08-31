var cinPattern = /[^0-9]+/;
var cinMinLength = 16;
var cinMaxLength = 22;
var pinPattern = /[^0-9]+/;
var pinMinLength = 4;
var pinMaxLength = 12;
var logonIDTypeName = "";
var logonIDTypeParams;
var lgonIDTypePreselected;
var vkbSupported = false;
var pinPadSupported = false;
var currentForm;
var currentSignonUI;
var currentLogonIDType;
var RANGE = "Range";
var clearFormOnError = false;
var alphaPattern = /[a-zA-Z]+/, alphaNumPattern = /[a-zA-Z0-9]+/, numPattern = /[^0-9]/, expDatePattern = /[^0-9]?[\/|-|\.][^0-9]?[\/|-|\.][^0-9]?/;
var ALPHA_TYPE = 1, ALPHANUMERIC_TYPE = 2, NUMERIC_TYPE = 3, DATE_TYPE = 4;
var FERR = "formatErr", EERR = "emptyErr", LERR = "lengthErr", LRERR = "lengthRangeErr";
var MMDDYYYY = 1, DDMMYYYY = 2, YYYYMMDD = 4;
var addlCharsAllowed;
var whitespace = " \t\n\r";
var mtSupported = false;


function displayNickname(formName, logonIDType)
{
var myLayerID = "nicknameField";
var myLayerIDLabel = "nicknameLabel";
if(typeof logonIDType != 'undefined')
{
myLayerID += logonIDType;
myLayerIDLabel += logonIDType;
}
var remember = document.forms[formName].remember;
if(remember.checked)
{
if(accessLayer(myLayerIDLabel)){accessLayer(myLayerIDLabel).display="block";}
if(accessLayer(myLayerID)){accessLayer(myLayerID).display="block"; document.forms[formName].nickname.focus();}
}
else
{
if(accessLayer(myLayerIDLabel)){accessLayer(myLayerIDLabel).display="none";}
if(accessLayer(myLayerID)){accessLayer(myLayerID).display="none";}
}
}
function accessLayer(layerID)
{
if(document.getElementById && document.getElementById(layerID))
return document.getElementById(layerID).style;
else if(document.all && document.all[layerID])
return document.all[layerID].style;
else if(document.layers && document.layers[layerID])
return document.layers[layerID];
}
function getLogonIDType(logonIDSelStr)
{
var logonParams=(new String(logonIDSelStr)).split(",");
return logonParams[0];
}
function initVars(currentForm)
{
if(currentForm)
{
if(currentForm.cin)
{
eval("cinMinLength=cin" + RANGE + currentLogonIDType + "[2]");
eval("cinMaxLength=cin" + RANGE + currentLogonIDType + "[3]");
}
if(currentForm.nationalID)
{
eval("cinMinLength=nationalID" + RANGE + currentLogonIDType + "[2]");
eval("cinMaxLength=nationalID" + RANGE + currentLogonIDType + "[3]");
}
}
eval("logonIDTypeName=logonIDTypeName" +  currentLogonIDType);
}
function preselectItem(mySelectList, itemToSelect)
{  
for (i = 0; i< mySelectList.options.length; i++)
{
if (mySelectList.options[i].value == itemToSelect)
{

mySelectList.options[i].selected = true;
break;
}
}
}
function onSelectLogonID(layerPrefix, formPrefix, logonIDType){
var myCurrForm = document.forms[formPrefix + logonIDType];
clearForm(logonIDType, myCurrForm);
var logonIDNum = 1;
for(logonIDNum = 1; logonIDNum <= MAX_LOGON_ID_TYPES; logonIDNum++)
{
if(accessLayer(layerPrefix + logonIDNum)){accessLayer(layerPrefix + logonIDNum).display="none";}
}
var lgIDType = myCurrForm.logonIDTypeSelect.value;
if(accessLayer(layerPrefix + lgIDType)){accessLayer(layerPrefix + lgIDType).display="block";}
preselectItem(document.forms[formPrefix + lgIDType].logonIDTypeSelect, lgIDType);
currentForm = document.forms[formPrefix + lgIDType];
if(signonUILayerID){signonUILayerID = signonUILayerID + logonIDType;}
currentLogonIDType = lgIDType;
myForm = document.forms[formPrefix + lgIDType];
}
function clearForm(logonIDType, myCurrForm)
{
if(myCurrForm.cin){myCurrForm.cin.value=""};
if(myCurrForm.pin){myCurrForm.pin.value=""};
if(myCurrForm.nickname){myCurrForm.nickname.value=""};
if(myCurrForm.remember){myCurrForm.remember.checked=false};
displayNickname(myCurrForm.name, logonIDType);
}
function selectRegForm(layerPrefix, formPrefix, logonIDType){
if(accessLayer("validationErrors")){accessLayer("validationErrors").display="none";}
var myCurrForm = document.forms[formPrefix + logonIDType];
var usernameStr = "";
if(myCurrForm.username){ usernameStr = myCurrForm.username.value; }
clearRegForm(logonIDType, myCurrForm);
var logonIDNum = 1;
for(logonIDNum = 1; logonIDNum <= MAX_LOGON_ID_TYPES; logonIDNum++)
{
if(accessLayer(layerPrefix + logonIDNum)){accessLayer(layerPrefix + logonIDNum).display="none";}
}
var lgIDType = myCurrForm.logonIDTypeSelect.value;
if(accessLayer(layerPrefix + lgIDType)){accessLayer(layerPrefix + lgIDType).display="block";}
preselectItem(document.forms[formPrefix + lgIDType].logonIDTypeSelect, lgIDType);
currentForm = document.forms[formPrefix + lgIDType];

currentLogonIDType = lgIDType;
myForm = document.forms[formPrefix + lgIDType];
if(myForm.username){ myForm.username.value = usernameStr; }
}
function clearRegForm(logonIDType, myCurrForm)
{
if(myCurrForm.username){myCurrForm.username.value=""};
if(myCurrForm.cin){myCurrForm.cin.value=""};
if(myCurrForm.pin){myCurrForm.pin.value=""};
if(myCurrForm.dateOfBirth){myCurrForm.dateOfBirth.value=""};
if(myCurrForm.cvv2){myCurrForm.cvv2.value=""};
if(myCurrForm.creditLimit){myCurrForm.creditLimit.value=""};
if(myCurrForm.homePhoneNo){myCurrForm.homePhoneNo.value=""};
if(myCurrForm.officePhoneNo){myCurrForm.officePhoneNo.value=""};
if(myCurrForm.expiredate){myCurrForm.expiredate.value=""};
if(myCurrForm.postalCode){myCurrForm.postalCode.value=""};
if(myCurrForm.motherMaidenName){myCurrForm.motherMaidenName.value=""};
if(myCurrForm.acctNumber){myCurrForm.acctNumber.value=""};
}
function closeKeyPad()
{
if(vkbSupported)
{
hideVkb(this);
}
if(pinPadSupported)
{
disablePinPad();
}
}
function isAdditionalItemValid(field, currentLogonIDType, checkForLength, passthrough, expDate, spaceAllowed)
{

if(field.type == "text" || field.type == "textarea" || field.type == "password")
{
if (isWhitespace(field.value) || field.value.length == 0 )
{
eval("errorStr=" + field.name + "Errors[\"" + EERR + "\"]");
alert(errorStr);
field.focus();
return false;
}
}
else if(field.length > 0 && field[0].type == "radio")
{
var valueChecked = false;
for(var i=0;i<field.length;i++)
if(field[i].checked) {valueChecked = true;}
if(!valueChecked)
{
eval("errorStr=" + field[0].name + "Errors[\"" + EERR + "\"]");
alert(errorStr);
return false;
}
}
var errorStr = "";
var minLength, maxLength, format, logonType;
var spacePattern = /\s+/;
if(checkForLength && typeof field != 'undefined' && typeof field.value != 'undefined' && field.value.length > 0)
{
if(whitespace.indexOf(field.value.charAt(0)) != -1 || whitespace.indexOf(field.value.charAt(field.value.length - 1)) != -1)
{
eval("errorStr=" + field.name + "Errors[\"" + FERR + "\"]");
alert(errorStr);
field.focus();
return false;
}
}
if(field.type == "text" || field.type == "textarea" || field.type == "password")
{
if(checkForLength)
{
eval("minLength=" + field.name + RANGE + currentLogonIDType + "[2]");
eval("maxLength=" + field.name + RANGE + currentLogonIDType + "[3]");
}   
eval("logonType=" + field.name + RANGE + currentLogonIDType + "[0]");
eval("format=" + field.name + RANGE + currentLogonIDType + "[1]");
}
if(passthrough){return true;}
var myVal = field.value;
var formatError = false;
if(typeof spaceAllowed != 'undefined' && !spaceAllowed && spacePattern.test(myVal))
{
formatError = true;
}
else
{
var addlChars = typeof addlCharsAllowed != 'undefined' ? addlCharsAllowed[logonType] : null;
if(format == ALPHA_TYPE)
{
if(!validateAlpha(myVal, addlChars))
formatError = true;
}
else if(format == ALPHANUMERIC_TYPE)
{
if(!validateAlphaNumeric(myVal, addlChars))
formatError = true;
}
else if(format == NUMERIC_TYPE)
{
if(!validateNumeric(myVal, addlChars))
formatError = true;
}
else if(format == DATE_TYPE)
{
if(expDate)
{
if(!validateExpDate(myVal))
formatError = true;
}
else
{
if(!isValidDate(myVal))
formatError = true;
}
}
}
if(formatError)
{
eval("errorStr=" + field.name + "Errors[\"" + FERR + "\"]");
alert(errorStr);
field.focus();
return false;
}
if(checkForLength)
{
if (myVal !="" && (myVal.length<minLength || myVal.length>maxLength)){
if(minLength == maxLength)
{
eval("errorStr=" + field.name + "Errors[\"" + LERR + "\"]");
if(typeof errorStr == 'undefined')
eval("errorStr=" + field.name + "Errors[\"" + FERR + "\"]");
errorStr=errorStr.replace(/\[length\]/, minLength);
}
else
{
eval("errorStr=" + field.name + "Errors[\"" + LRERR + "\"]");
if(typeof errorStr == 'undefined')
eval("errorStr=" + field.name + "Errors[\"" + FERR + "\"]");
errorStr=errorStr.replace(/\[minLength\]/, minLength);
errorStr=errorStr.replace(/\[maxLength\]/, maxLength);
}
alert(errorStr);
field.focus();
return false;
}
}
return true;
}
function validateExpDate(value)
{
var validChars = "0123456789/-.";
var i;
for(i = 0; i < value.length; i++)
{
if (validChars.indexOf(value.substr(i,1)) < 0)
{
return false;
}
}
return true;
}
function validateAlpha(value, addlChars)
{
var i;
for(i = 0; i < value.length; i++)
{
if(!(value.charAt(i) >= 'a' && value.charAt(i) <= 'z') &&
!(value.charAt(i) >= 'A' && value.charAt(i) <= 'Z'))
{
if(typeof addlChars != 'undefined')
{
if(addlChars.indexOf(value.charAt(i)) == -1)
return false;
}
else
{
return false;
}
}
}
return true;
}
function validateAlphaNumeric(value, addlChars)
{
var i;
for(i = 0; i < value.length; i++)
{
if(!(value.charAt(i) >= 'a' && value.charAt(i) <= 'z') &&
!(value.charAt(i) >= 'A' && value.charAt(i) <= 'Z') &&
!(value.charAt(i) >= '0' && value.charAt(i) <= '9'))
{
if(typeof addlChars != 'undefined')
{
if(addlChars.indexOf(value.charAt(i)) == -1)
return false;
}
else
{
return false;
}
}
}
return true;
}
function validateNumeric(value, addlChars)
{
var i;
for(i = 0; i < value.length; i++)
{
if(!(value.charAt(i) >= '0' && value.charAt(i) <= '9'))
{
if(typeof addlChars != 'undefined')
{
if(addlChars.indexOf(value.charAt(i)) == -1)
return false;
}
else
{
return false;
}
}
}
return true;
}
function getDatePattern()
{
if(dateFormat == MMDDYYYY || dateFormat == DDMMYYYY)
{
if(dateSeparator == " ")
return /[0-9]{2}\s+[0-9]{2}\s+[0-9]{4}/;
else if(dateSeparator == ".")
return /[0-9]{2}\.[0-9]{2}\.[0-9]{4}/;
else if(dateSeparator == "https://online.citi.com/")
return /[0-9]{2}\/[0-9]{2}\/[0-9]{4}/;
else if(dateSeparator == "-")
return /[0-9]{2}-[0-9]{2}-[0-9]{4}/;
}
else if(dateFormat == YYYYMMDD)
{
if(dateSeparator == " ")
return /[0-9]{4}\s+[0-9]{2}\s+[0-9]{2}/;
else if(dateSeparator == ".")
return /[0-9]{4}\.[0-9]{2}\.[0-9]{2}/;
else if(dateSeparator == "https://online.citi.com/")
return /[0-9]{4}\/[0-9]{2}\/[0-9]{2}/;
else if(dateSeparator == "-")
return /[0-9]{4}-[0-9]{2}-[0-9]{2}/;
}
}
function isValidDate(dateStr)
{
var validChars = "0123456789";
var unformattedDateStr = "";
var seperator = ".";
var day;
var month;
var year;
var leapYear = false;
var i;
var valid = true;
if(!getDatePattern().test(dateStr)){return false;}
for (i = 0; i < dateStr.length; i++) {
if (validChars.indexOf(dateStr.substr(i,1)) >= 0)
unformattedDateStr = unformattedDateStr + dateStr.substr(i,1);
}
if(unformattedDateStr.length < 8)
return false;
if(dateFormat == MMDDYYYY)
{
month = unformattedDateStr.substr(0,2);
day = unformattedDateStr.substr(2,2);
year = unformattedDateStr.substr(4,4);
}
else if(dateFormat == DDMMYYYY)
{
day = unformattedDateStr.substr(0,2);
month = unformattedDateStr.substr(2,2);
year = unformattedDateStr.substr(4,4);
}
else if(dateFormat == YYYYMMDD)
{
year = unformattedDateStr.substr(0,4);
month = unformattedDateStr.substr(4,2);
year = unformattedDateStr.substr(6,4);
}
if (year == 0) {return false;} 
var date = new Date();
if(year > date.getFullYear()){return false;}
if(year == date.getFullYear() && month > date.getMonth() + 1){return false;}
if(year == date.getFullYear() && (month == date.getMonth() + 1) && day > date.getDate()){   return false;}
if ((month < 1) || (month > 12)) { return false;} 

if ((year % 100 == 0) && (year % 400 == 0))
leapYear = true;
else if(year % 4 == 0)
leapYear = true;
if(day < 1){return false;}
if (leapYear && (month == 2) && (day > 29)) { return false;}
if (!leapYear && (month == 2) && (day > 28)) {return false;}
if ((day > 31) && ((month == "01") || (month == "03") || (month == "05") || (month == "07") || (month == "08") || (month == "10") || (month == "12")))
return false;
if ((day > 30) && ((month == "04") || (month == "06") || (month == "09") || (month == "11")))
return false;
return true;
}
var SEP = '|';
function getTimeZone() {
var rightNow = new Date();
var date1 = new Date(rightNow.getFullYear(), 0, 1, 0, 0, 0, 0);
var temp = date1.toGMTString();
var date2 = new Date(temp.substring(0, temp.lastIndexOf(" ")-1));
var hoursDiffStdTime = (date1 - date2) / (1000 * 60 * 60);
return hoursDiffStdTime;
}
function getResolution()
{
var t = "";
if (window.screen)
t += window.screen.width +SEP+ window.screen.height +SEP+ window.screen.availWidth +SEP+ window.screen.availHeight;
return t;
}
function getColorDepth()
{
var t = "";
if(window.screen)
t = window.screen.colorDepth;
return t;
}

function fingerprint_resolution () {
	var	t = "";
	if (self.screen) {
		t += screen.width +SEP+ screen.height +SEP+ screen.availHeight;
	}
	return t;
} 

function fingerprint_timezone ()
{					
	var gmtHours = (new Date().getTimezoneOffset()/60)*(-1);				
	return gmtHours;
} 
	 
function fingerprint_display () {
	var t = "";
	if (self.screen) {
		t += screen.colorDepth;
	}     
	return t;   
}     
	
function fingerprint_userlang () {					
	var lang;	
	(typeof(navigator.userLanguage) != "undefined") ? lang = navigator.userLanguage : lang = "";
	return lang;	
} 


function fingerprint_syslang () {		
		var lang;		
		(typeof(navigator.systemLanguage) != "undefined") ? lang = navigator.systemLanguage : lang = "";		
		return lang;			
}

function fingerprint_lang(){	
	var lang;			
	if (typeof(navigator.language) != "undefined")
	{					
		lang = navigator.language;						
	}
	else if (typeof(navigator.browserLanguage) != "undefined")
	{			
		lang = navigator.browserLanguage;					
	}
	else			
	{
		lang = "";								
	}		
	return lang;		
} 

function populateClientData(myForm)
{
	populateEFDParams();
if(myForm.devicePrint){myForm.devicePrint.value = encode_deviceprint();}
}  
function replaceSubmit() {
	if (signOnUnamePwd(false, validate)) document.SignonForm.submit();
}
function populateEFDParams(){
	var now = new Date();
	var offset = now.getTimezoneOffset();
	var gmtHours = (new Date().getTimezoneOffset() / 60) * (-1);
	var efdtimezone = document.getElementById('efdBTZ');
	var efdScreenResolution = document.getElementById('efdCSR');
	if(efdtimezone != null &&  efdScreenResolution != null)
	{
		document.getElementById('efdBTZ').value=gmtHours;
		document.getElementById('efdCSR').value=screen.width+'x'+screen.height;
	}
}