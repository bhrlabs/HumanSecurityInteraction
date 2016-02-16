package com.asu.hsi.engine;

import java.sql.Connection;
import java.sql.Statement;

public class HackEntryManager {

	
	public static boolean insertHack(String[] values) {
		boolean retVal = false;
		
		Connection con = null;
		Statement st = null;
		
		try {
			try {
				con = DatabaseManager.getConnection();
				st = con.createStatement();
				st.executeUpdate("INSERT INTO hacklist(header, context, target, datatype, relation, contribution, motive, malwaretype, malwarename, systemtype, malwaresource, browsertype, hdate, notes, cio, sources) "
						+ "VALUES ('" + values[0] + "','" + values[1] + "','" + values[2] + "','" + values[3] + "','" + values[4] + "','" + values[5] + "','" + values[6] + "','" + values[7] + "','" + values[8] 
								+ "','" + values[9] + "','" + values[10] + "','" + values[11] + "','" + values[12] + "','" + values[13] + "','" + values[14] + "','" + values[15] + "')");
				retVal = true;
			} finally {
				if (st != null) {
					st.close();
					con.close();
				}
			}
		} catch (Exception e) {
			retVal = false;
			System.out.println("Database Error !!" + e.getMessage());
		}
		
		return retVal;
	}
}
