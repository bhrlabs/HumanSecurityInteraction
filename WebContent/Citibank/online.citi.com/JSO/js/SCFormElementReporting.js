SCFormElementReporting = {
	report: function(f,e) {
			if (e != undefined && typeof e=="object" && e.length != undefined && document.forms[f] != undefined) {
			rp = "";

				n = document.forms[f].elements[e[0]];
				st = null;
				if (n != undefined) {
					if (n.type != undefined && n.type == "checkbox") {
						if (n.checked) {
							l = this.getLabel(f,n.id,e[0]);
							st = "checkbox__"+l+"("+n.name+")"+"::"; //true
						}
					} else if (n.type != undefined && n.type == "select-one") {
						l = this.getLabel(f,n.id,e[0]);
						st = "select__"+l+"("+n.name+")"+"::";
					} else if (n.length != undefined && n.length > 0 && 
							   n[0].type != undefined && n[0].type == "radio") {
						for (r=0;r<n.length;r++) {
							if (n[r].checked != undefined && n[r].checked) {
								l = this.getLabel(f,n[r].id,n[r].value);
								st = "radio__"+e[0]+"::";
								break;
							}
						} 
					} else if (n.type == "radio") {
						if (n.checked) {
							l = this.getLabel(f,n.id,n.value);
							st = "radio__"+e[0]+"::";
						}
					}
				}
			if (st != null && st != "") rp=st.substr(0,100);
			if (rp != null && rp != "") return '@formEles='+rp;

		}
	},
	getLabel: function(f,id,d) {
		l = document.forms[f].getElementsByTagName('label');
		for (var i=0;i<l.length;i++) {
			if (l[i].htmlFor != undefined && l[i].htmlFor==id) return escape(l[i].innerHTML);
		}
		return d;
	}
}