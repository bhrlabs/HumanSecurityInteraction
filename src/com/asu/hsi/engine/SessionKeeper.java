package com.asu.hsi.engine;

import com.asu.hsi.properties.SessionVar;

public class SessionKeeper implements Runnable {

	@Override
	public void run() {
		
		SessionVar.sesNum = 1937;
		
		try {
			// Session remains on for 50 mins after the login and then requires logging in again.
			Thread.sleep(3000000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		SessionVar.sesNum = 0;
	}

}
