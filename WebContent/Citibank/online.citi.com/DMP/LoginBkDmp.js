var parsing_bk_results = [],
    loginparsed_bk_result_format,
    loginbkPhints="",
    loginecmCampaign,
    loginbkDomain,
    loginbkTimeout,
    loginecmNames;

var loginbk = {
	parseBkData: function() {
		loginparsed_bk_result_format = '';
		if (bk_results.campaigns.length == 1 && loginecmCampaign == bk_results.campaigns[0].campaign) {
			bk_results.campaigns.length = 0;
			return;
		}
		if (!Array.prototype.reduce || !Array.prototype.map){
			for (i = 0; i < bk_results.campaigns.length; i++) {
				var c, campaignid, categoriesTotal = '';
			    c = bk_results.campaigns[i];
                campaignid = parseInt(c.campaign);
                categoriesTotal = '';
                for (j = 0; j < c.categories.length; j++) {
                    var cid = parseInt(c.categories[j].categoryID);
                    if (j != c.categories.length - 1)
                        categoriesTotal = categoriesTotal + cid + "|";
                    else
                        categoriesTotal = categoriesTotal + cid;
                }
                if (i != bk_results.campaigns.length - 1)
                	loginparsed_bk_result_format = loginparsed_bk_result_format + campaignid + ":" + categoriesTotal + "-";
                else
                	loginparsed_bk_result_format = loginparsed_bk_result_format + campaignid + ":" + categoriesTotal; 
            }
		}else{
		    bk_results.campaigns.reduce(function(i, v) {
		        parsing_bk_results.push(v.campaign + ':' + v.categories.map(function(elem) {
		            return elem.categoryID;
		        }).join("|"));
		    }, true);
		    loginparsed_bk_result_format = parsing_bk_results.join('-');
		}
	},
	
	createCookie: function(cname, cvalue, exdays){
		var d = new Date();
	    d.setTime(d.getTime() + (exdays*24*60*60*1000));
	    var expires = "expires=" + d.toGMTString();
	    document.cookie = cname + "=" + cvalue + "; " + expires + ";secure; path=/";
	},
	
	bkCall: function(){
	    var ecmCookieSplit, loginecmNamesMap;
	    var cbolecm = getCookie("CBOLECM");
	    if(cbolecm) {
	      ecmCookieSplit = cbolecm.split("-");
	    }
	    loginecmNamesMap = $.parseJSON(JSON.stringify(ecmNames));
	    loginbkPhints = "";
	    if(ecmCookieSplit){
		    for (var i = 0; i < ecmCookieSplit.length; i++) {
		        if (String(loginecmNamesMap[String(i + 1)]) != 'undefined') {
		            loginbkPhints = loginbkPhints + "&phint=" + loginecmNamesMap[String(i + 1)] + "%3D" + ecmCookieSplit[i];
		        }
		    }
	    }
	    $.ajax({
			url : loginbkDomain + loginbkPhints,
			type : "POST",
			dataType : "script",
			timeout : loginbkTimeout,
			global : false,
			success : function (data, status, jqxHR) {
		    	if (typeof bk_results == 'undefined') {
		    		loginbk.createCookie("BKDMP", '', 1);
		            return;
		        } else {
		        	loginbk.parseBkData();
		        	loginbk.createCookie("BKDMP", loginparsed_bk_result_format, 1);
		        }
			},
			error : function (x, t, m) {
				if (t === "timeout") {
					loginbk.createCookie("BKDMP", '', 1);
				} else {
					loginbk.createCookie("BKDMP", '', 1);
				}
			}
		});
	}
};
