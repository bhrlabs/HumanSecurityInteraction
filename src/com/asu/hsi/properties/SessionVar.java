package com.asu.hsi.properties;

import java.util.HashSet;
import java.util.Set;

public class SessionVar {

	public static int sesNum = 0;
	
	public static Set<String> validEmails = new HashSet<String>();
	
	static {
		
		// Important Note : Add all Email IDs in lower case. 
		
		validEmails.add("bsingh21@asu.edu");
		validEmails.add("amahesh3@asu.edu");
		validEmails.add("ssmishr2@asu.edu");
		validEmails.add("jernotte@asu.edu");
		validEmails.add("hsodhi@asu.edu");
		validEmails.add("tmanicki@asu.edu");
		validEmails.add("julian.alvarez@asu.edu");
		validEmails.add("ajneid@asu.edu");
		validEmails.add("justin.a.convery@gmail.com");
		validEmails.add("stellarz.jay@gmail.com");
		validEmails.add("scott_s_jones@cox.net"); // TODO: Get gmail ID
	}
	
}
