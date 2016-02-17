package com.asu.hsi.engine;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class LoginManager {
	
	public static int ses = 0;

	public static boolean tryLogin(String username, String password) {
		boolean retVal = false;
		
		Connection con = null;
		Statement st = null;
		
		try {
			try {
				con = DatabaseManager.getConnection();
				st = con.createStatement();
				ResultSet rs = st.executeQuery("SELECT password FROM login WHERE username = '"+ username + "'");
				if (rs.next()) {
					String pass = rs.getString(1);
					if (password != null && password.equals(pass)) {
						retVal = true;
						Thread thread = new Thread(new SessionKeeper());
						thread.start();
					}
				}
			} finally {
				st.close();
				con.close();
			}
		} catch (SQLException e) {
			System.out.println("Database Error!!");
			e.printStackTrace();
		}
		
		return retVal;
	}
	
	public static void main(String[] args) {
		System.out.println(tryLogin("bharat", "hack"));
	}
}
