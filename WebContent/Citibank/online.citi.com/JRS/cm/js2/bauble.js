var	objBubble = {
	container : "def-box", // overall bubble container;
	defaultWidth : "300px", // if no width specified - the default;
	specialWidthClass : "custom-", // custom class for specified width; 
	contentContainer : "product-bubble", // container within bubble container that displays the content;
	pointer : "bubble-pointer", // the pointer container contained within the bubble.;
	pointerRight : "rightSide", // class name for right sided pointer;
	pointerDefaultLeft : "-26px", // default position for the pointer (LEFT);
	pointerDefaultTop : "5px", // default position for the pointer (LEFT);
	linkClassName : "def-link", // class name searched for when implementing bubble;
	linkIdAppend : "-info", // additonal word appended to the (hidden) content div.;
	// content error string;
	contentError : "<h4>Error getting content.</h4><p>The associated content with this link could not be found at this time. Please try again later.</p>",
	seeMoreLink : "lnk_see-more", // link ID for the see more info button;
	seeMoreHidden : "no-link", // className for hidden see more info button;
	seeMoreImg : "/JRS/cm/img/buttons/seeMoreInfo.gif", // image for the close button;
	linkTarget : "_blank", // target window for the see more info button;
	closeLink : "def-closer",
	closeBtnImg : "/JRS/cm/img/buttons/close.gif", // image for the close button;
	styleSheetName: "/JRS/cm/css2/bubble.css", // stylesheet with rules for presentation of bubble 
	pageWidth : "900", // page width
	setWidth : function()	{ 
		// parse the calling link's class names and check to see if there is a classname with a number.;
		callingLink = arguments[0];
		if(callingLink) { 
			var container = document.getElementById(this.container);
			var theClasses = callingLink.className.split(" ");
			for(x=0,y=theClasses.length;x<y;x++)
			{
			if (theClasses[x].indexOf(this.specialWidthClass) != -1)
			{
			var theWidth = theClasses[x].replace(this.specialWidthClass,'')
			break;
			}
			}
			if(theWidth)
			{
			container.style.width = theWidth + "px";
			}
			else
			{
			container.style.width = this.defaultWidth;	  	  
			}
		} else {
			return false;
		}
	},
	placeRightPointer : function() {
		var bubble = document.getElementById(this.container);
		var pointer = document.getElementById(this.pointer);
		if(bubble && pointer) {
			bubbleWidth = parseInt(bubble.offsetWidth);
			bubbleWidth = parseInt(bubbleWidth - 7);
			pointer.style.left = bubbleWidth+'px';
			pointer.className = this.pointerRight;
			this.positionPointer()
		} else {
			return false;
		}
	},
	resetPointer : function() {
		pointer = document.getElementById(this.pointer);
		if(arguments[0] == 'y') {
		// resets only the Y axis of the pointer to default;
		pointer.style.top = this.pointerDefaultTop;
		} else {
			// resets the entire pointer to default position;
			pointer.className = '';
			pointer.style.top = this.pointerDefaultTop;
			pointer.style.left = this.pointerDefaultLeft;
		}
	},
	positionPointer: function () {
		var theBox = document.getElementById(this.container);
		var thePointer = document.getElementById(this.pointer);
		if (theBox && thePointer) {
			var theHeight = theBox.offsetHeight;
			theDistance = parseInt(theHeight / 2);
			thePointer.style.top = theDistance + 'px';
			return parseInt(theDistance - 3);
		}
	},
	movePointerToTop : function() {	
	},
	cumulativeOffset: function(element) {
	var track = '';
		var valueT = 0, valueL = 0;
		do {
			valueT += element.offsetTop  || 0;
			valueL += element.offsetLeft || 0;
	track += '['+element.tagName+']['+element.id+']['+element.className+']['+valueL+']['+valueT+']\n';
			element = element.offsetParent;
		} while (element);
//		alert(track);
		return [valueL, valueT];
	},
	toggleVisibility : function() {
		var theBox = document.getElementById(this.container);
		if(theBox) {
			switch (theBox.style.display) {
				case "none" :
					theBox.style.display = "block";
					break;
				default:
					theBox.style.display = "none";
			}
		}
	},
	positionBubble : function() {	// grab the page offset(if any) to determine if the page has been scrolled - used to calculate if the bubble pops upwards or downwards;
		var pageScrolled = self.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
		var callingLink = arguments[0];
//		this.checkDoubleLines(arguments[0]);
		var vOffset = arguments[1];
		var callingLinkPos = this.cumulativeOffset(callingLink); // returns an X(0),Y(1) combination;
		var callingLinkLength = callingLink.offsetWidth;
		var container = document.getElementById(this.container);
		// take the offsetWidth of the container + 28 +  the left position of the link + the offsetWidth of the calling link;
		// and determine if its wider than 900px;
		totalPos = parseInt(container.offsetWidth + 28 + callingLinkPos[0] + callingLinkLength)
		if(totalPos >= 900) {
			container.style.left = parseInt(callingLinkPos[0] - (container.offsetWidth +28)) + "px" ;
			container.style.top = parseInt(callingLinkPos[1] - vOffset) + "px";
			this.placeRightPointer()
		} else {
			if(!this.checkDoubleLines(callingLink)) {
				container.style.left = parseInt(callingLinkPos[0] + callingLinkLength + 28) + "px";
			} else {
				container.style.left = (this.cumulativeOffset(callingLink.parentNode)[0] + callingLink.parentNode.offsetWidth + 28) + "px";	
			}
			container.style.top = parseInt(callingLinkPos[1] - vOffset) + "px";
		}
		var boxHeight = container.offsetHeight;
		var thePageY = (parseInt(callingLinkPos[1]) - (pageScrolled + boxHeight));
		if (thePageY  <= 0 ) {
			container.style.top = callingLinkPos[1];
			this.resetPointer('y');			 
		}
		this.grabLink(callingLink);
	},
	populate : function(){ 
		callingLink = arguments[0];
		callingLinkId = callingLink.id;
		var content =  document.getElementById(callingLinkId + this.linkIdAppend)
		if(content) {
			content = content.innerHTML
		} else {
			content = this.contentError;
		}
		contentContainer = document.getElementById(this.contentContainer);
		if (contentContainer) {
			contentContainer.innerHTML = content;
		} else {
			return false;
		}
	},
	checkDoubleLines : function() {
		// take the left position of the link and calculate its position in the container
		// and return the adjusted left position for the element.
		callee = arguments[0];
		var singlelineheight = 28;
		if(callee) {
			var containerWidth = callee.parentNode.offsetWidth;
			var containerLeft = this.cumulativeOffset(callee.parentNode)[0];
			var spaceLeft = parseInt(containerWidth - (callee.offsetLeft - containerLeft));
			if(callee.offsetHeight >= singlelineheight) {
				return parseInt(callee.offsetLeft + spaceLeft);
			} else {
				return false;
			}
		} else {
			return false;	
		}
	},
	displayBubble : function(event) { 
		var container = document.getElementById(objBubble.container);
		stopEvent(event);
		var callee = getEventTarget(event);
		if(container && callee) {
			container.style.display="none";
			objBubble.resetPointer();
			objBubble.setWidth(callee);
			objBubble.populate(callee);
			container.style.display="block";
			dw_SelectsShim.init(objBubble.container);
			container.positionShim=dw_SelectsShim.position;
			var pointerPos = objBubble.positionPointer(callee); // vertical positioning
			objBubble.positionBubble(callee,pointerPos);
			container.positionShim();
			//in IE, focus on infobubble container so it will be read by JAWS (and hopefully other screen readers)
			if (dw_SelectsShim.supported) container.focus();
			objBubble.handleFocus(callee,container);
			return false;
		} else {
			return false;
		}
	},
	hideBubble : function() { 
		var container = document.getElementById(objBubble.container);
		dw_SelectsShim.hide(objBubble.container);
		if (container.style.display != "none") {
			container.style.display = "none";
		}
	},
	init : function() {
		var links = this.getElementsByClazzName(this.linkClassName,"a",document);
		for (x=0,y=links.length;x<y;x++) {
			// links[x].onclick = function(){objBubble.displayBubble(this);return false;}
			attachEventListener(links[x],"click",objBubble.displayBubble,true);
		}
		//attachEventListener(document.getElementsByTagName('body')[0],"click",objBubble.hideBubble,false);
		var beforeBaubleBodyOnclick = (document.body.onclick) ? document.body.onclick : function () {};
		document.body.onclick = function (e) {beforeBaubleBodyOnclick(e); objBubble.hideBubble(e);}
	},
	getElementsByClazzName: function(strClass, strTag, objContElm) {
		strTag = strTag || "*";
		objContElm = objContElm || document;
		var objColl = (strTag == '*' && document.all) ? document.all : objContElm.getElementsByTagName(strTag);
		var arr = new Array();
		var delim = strClass.indexOf('|') != -1  ? '|' : ' ';
		var arrClass = strClass.split(delim);
		for (i = 0, j = objColl.length; i < j; i++) {
			var arrObjClass = objColl[i].className.split(' ');
			if (delim == ' ' && arrClass.length > arrObjClass.length) continue;
			var c = 0;
			comparisonLoop:
			for (k = 0, l = arrObjClass.length; k < l; k++) {
				for (m = 0, n = arrClass.length; m < n; m++) {
					if (arrClass[m] == arrObjClass[k]) c++;
					if (( delim == '|' && c == 1) || (delim == ' ' && c == arrClass.length)) {
						arr.push(objColl[i]);
						break comparisonLoop;
					}
				}
			}
		}
		return arr;
	},
	grabLink : function () {
		var seeMore = document.getElementById(this.seeMoreLink);
		// reset seeMore button
		seeMore.href = "#";
		seeMore.className = "";
		seeMore.target = "";
		var callee = arguments[0];
		if (callee && seeMore) {
			// parse links href;
			theLink = callee.href;
			// test to see if the the pound symbol is the last characted of the links href and pass over the link if it isnt.
			if(theLink.charAt(theLink.length - 1) == "#") {
			// hide the button
			seeMore.className = this.seeMoreHidden;
			} else {
				seeMore.href = theLink;
//				seeMore.target = this.linkTarget; should not display in new browser unless the original anchor is so coded.
			}
		} else {
			return false;
		}
	},
	injectBubble : function() {
		var box = document.createElement("div");
		box.id = this.container;
		box.style.display = "none";
		var bubbleAnchor = document.createElement("div");
		bubbleAnchor.id = "bubble-anchor";
		box.appendChild(bubbleAnchor);
		var innerBubble = document.createElement("div");
		innerBubble.id = "inner-bubble";
		bubbleAnchor.appendChild(innerBubble);
		var bubbleTop = document.createElement("div");
		bubbleTop.id = "bubble-top";
		innerBubble.appendChild(bubbleTop);
		var bubbleTopLeft = document.createElement("div");
		bubbleTopLeft.id = "bubble-top-left";
		bubbleTop.appendChild(bubbleTopLeft);
		var bubbleBody = document.createElement("div");
		bubbleBody.id = "bubble-body";
		innerBubble.appendChild(bubbleBody);
		var innerBody = document.createElement("div");
		innerBody.id = "inner-body";
		bubbleBody.appendChild(innerBody);
		var productBubble = document.createElement("div");
		productBubble.id = "product-bubble";
		//set tabindex to -1 so infobubble can be focused in firefox 1.5+ for screenreaders
		productBubble.setAttribute('tabindex','-1');
		innerBody.appendChild(productBubble);
		var bubbleControls = document.createElement("div");
		bubbleControls.id = "bubble-controls";
		innerBody.appendChild(bubbleControls);
		var defCloser = document.createElement("a");
		defCloser.id = this.closeLink;
		defCloser.href = "#";
		defCloser.onclick = function(){objBubble.hideBubble();return false;}
		bubbleControls.appendChild(defCloser);
		var closerImg = document.createElement("img");
		closerImg.src = this.closeBtnImg;
		closerImg.className = "roll";
		closerImg.alt = "Close";
		closerImg.width = "49";
		closerImg.height = "16";
		closerImg.border = "0";
		defCloser.appendChild(closerImg);
		var seeMoreLink = document.createElement("a")
		seeMoreLink.id = "lnk_see-more";
		seeMoreLink.href = "#";
		bubbleControls.appendChild(seeMoreLink);
		var seeMoreImg = document.createElement("img");
		seeMoreImg.src = this.seeMoreImg;
		seeMoreImg.className = "roll";
		seeMoreImg.width="90";
		seeMoreImg.height = "16";
		seeMoreImg.alt = "See more";
		seeMoreImg.border = "0";
		seeMoreLink.appendChild(seeMoreImg);
		var bubbleBottom = document.createElement("div");
		bubbleBottom.id = "bubble-bottom";
		var bubbleBottomLeft = document.createElement("div");
		bubbleBottomLeft.id = "bubble-bottom-left";
		bubbleBottom.appendChild(bubbleBottomLeft);
		innerBubble.appendChild(bubbleBottom);
		var bubblePointer = document.createElement("div");
		bubblePointer.id = "bubble-pointer";
		bubbleAnchor.appendChild(bubblePointer);
		document.getElementsByTagName('body')[0].appendChild(box);
		var stylesheet = document.createElement("link");
		stylesheet.rel = "stylesheet";
		stylesheet.type = "text/css";
		stylesheet.href = this.styleSheetName;
		stylesheet.id = "global";
		document.getElementsByTagName('head')[0].appendChild(stylesheet);
	},
	handleFocus : function()
	{
		//set focus on infobubble for Firefox 1.5+ with JAWS, other browsers will ignore, IE is already focused there
		//requires focusee as global var, setTimeout with 0 argument, and tabindex of -1 on focusee (set in inject method)
		callingLink = arguments[0];
		focusee = document.getElementById('product-bubble');
		setTimeout("focusee.focus();",0);
		closeBtn = document.getElementById(this.closeLink);
		if (closeBtn)
		{
			closeBtn.onclick = function()
			{
				//return focus to link for JAWS
				var parentLink = callingLink;
				parentLink.focus();
				return false;
			}
		}
	}
}
function getEventTarget(event) {
	var targetElement = null;
	if(typeof event.target !="undefined") {
		targetElement = event.target;
	} else {
		targetElement = event.srcElement;
	}
	while ((targetElement.nodeType == 3 && targetElement.parentNode !=null) || targetElement.nodeName.toLowerCase() != 'a') {
		targetElement = targetElement.parentNode;
	}
	return targetElement;
}
function attachEventListener(target,eventType,functionRef,capture) {
	if(typeof target.addEventListenr != "undefined") {
		target.addEventListener(eventType,functionRef,capture);
	} else if (typeof target.attachEvent != "undefined") {
		target.attachEvent("on" + eventType, functionRef);
	} else {
		eventType="on" + eventType;
		if(typeof target[eventType] == "function") {
			var oldListener = target[eventType];
			target[eventType] = function() {
				oldListener();
				return functionRef();
			};
		}
		else {
			target[eventType] = functionRef;
		}
	}
}
function stopEvent(event) {
	if(typeof event.stopPropagation != "undefined") {
		event.stopPropagation();
	} else {
		event.cancelBubble = true;
	}
}

dw_SelectsShim = {
    doOverlay: true,  // do iframe shim for select lists? (for ie win)
    supported: false,
    checked: false,

    init: function(lyrID) {
        if ( !dw_SelectsShim.checked ) {
            dw_SelectsShim.supported = dw_SelectsShim.checkSupport();

        }
        
        var lyr = document.getElementById? document.getElementById(lyrID): null;
        // create, position, and size iframe
        if ( lyr && dw_SelectsShim.doOverlay && dw_SelectsShim.supported && !dw_SelectsShim.checked) {
            document.body.insertAdjacentHTML("beforeEnd", '<iframe id="' + lyrID + '_shim" src="/JRS/images/pixel.gif" style="position:absolute; left:0; top:0; z-index:1; visibility:hidden" scrolling="no" frameborder="0"></iframe>');
            var shim = document.getElementById( lyrID + '_shim' ); 
            if (shim) {
                shim.style.width = lyr.offsetWidth + "px";
                shim.style.height = lyr.offsetHeight + "px";
                shim.style.left = lyr.style.left;
                shim.style.top = lyr.style.top;
                shim.style.visibility = lyr.style.visibility;
            }
        }
        dw_SelectsShim.checked = true;
      },

    // position with other layer(s)
    position: function() {
        if (!document.getElementById || !dw_SelectsShim.doOverlay || !dw_SelectsShim.supported ) return;
        var lyr = document.getElementById(this.id);
        var shim = document.getElementById( this.id + '_shim');
        if ( shim && lyr ) {
            shim.style.left = lyr.style.left;
            shim.style.top = lyr.style.top;
        }
    },

    hide: function(id) {
        if (!document.getElementById || !dw_SelectsShim.doOverlay || !dw_SelectsShim.supported ) return;
        var shim = document.getElementById( id + '_shim');
        if ( shim ) {
            shim.style.visibility = 'hidden';
        }
    },

    checkSupport: function() {
        if ( navigator.userAgent.indexOf("Windows") != -1 && 
            typeof document.body != "undefined" && 
            typeof document.body.insertAdjacentHTML != "undefined" && 
            !window.opera && navigator.appVersion.indexOf("MSIE 5.0") == -1 
            ) return true;
        else return false;
    }
};



var n = navigator.appVersion;
preBubbles = (window.onload) ? window.onload : function () {}; 

if(n.indexOf("Chrome") > -1){
                setTimeout(function(){preBubbles();objBubble.injectBubble();objBubble.init();},2000);
}else{
window.onload = function() {
                preBubbles();
                objBubble.injectBubble();
                objBubble.init();
}
}
