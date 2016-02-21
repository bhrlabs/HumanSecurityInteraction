<%@page import="java.io.PrintWriter"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="com.asu.hsi.engine.DatabaseManager"%>
<%@page import="java.sql.Statement"%>
<%@page import="java.sql.SQLException"%>
<%@page import="java.sql.Connection"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Human Security Interaction</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="shortcut icon" type="image/ico" href="images/favicon.ico" />
<link rel="shortcut icon" type="image/ico"
	href="http://eg.com/favicon.ico" />
<link rel="stylesheet" href="css/style.css">
<link rel="stylesheet" href="css/bootstrap.min.css">
<script src="js/jquery.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="js/design.js"></script>
</head>
<body>
	<!-- HEADER -->
	<nav class="navbar-inverse tophd navbar-fixed-top">
	<div class="container">
		<div class="navbar-header">
			<a href="index.html"><img src="images/logo.png" /></a>
		</div>
		<div class="topmenu">
			<ul class="nav navbar-nav navbar-right">
				<a href="index.html" class="btn btn-default" role="button">Home</a>
				<a href="model.html" class="btn btn-default" role="button">Model</a>
				<a href="methodology.html" class="btn btn-default" role="button">Methodology</a>
				<a href="patterns.html" class="btn btn-default" role="button">Patterns</a>
				<a href="about.html" class="btn btn-default" role="button">About
					Us</a>
				<a href="contact.html" class="btn btn-default" role="button">Contact
					Us</a>
			</ul>
		</div>
	</div>
	</nav>
	<!-- HEADER -->

	<div class="container firstdiv">
		<h2>Hack List </h2>
		<table class="table-fill">
			<tr>
				<th>Header</th>
				<th>Context</th>
				<th>Target</th>
				<th>Target Data Type</th>
				<th>Hacker relation to target</th>
				<th>Hacked User Contribution</th>
				<th>Motive</th>
				<th>Malware Type Used</th>
				<th>Malware Name</th>
				<th>System Type</th>
				<th>Malware Source</th>
				<th>Browser Type</th>
				<th>Date</th>
				<th>Notes</th>
				<th>CIO</th>
				<th>Sources</th>
			</tr>
			<% 	Connection con = null;
			   	Statement st = null;
			   	ResultSet rs = null;
			   	try {
			   		try {
			   			con = DatabaseManager.getConnection();
			   			st = con.createStatement();
			   			rs = st.executeQuery("SELECT * FROM hacklist");
			   			while (rs.next()) {
			%> 
			<tr>
				<td><% out.print(rs.getString(2));%></td>
				<td><% out.print(rs.getString(3));%></td>
				<td><% out.print(rs.getString(4));%></td>
				<td><% out.print(rs.getString(5));%></td>
				<td><% out.print(rs.getString(6));%></td>
				<td><% out.print(rs.getString(7));%></td>
				<td><% out.print(rs.getString(8));%></td>
				<td><% out.print(rs.getString(9));%></td>
				<td><% out.print(rs.getString(10));%></td>
				<td><% out.print(rs.getString(11));%></td>
				<td><% out.print(rs.getString(12));%></td>
				<td><% out.print(rs.getString(13));%></td>
				<td><% out.print(rs.getString(14));%></td>
				<td><% out.print(rs.getString(15));%></td>
				<td><% out.print(rs.getString(16));%></td>
				<td><% out.print(rs.getString(17));%></td>
			</tr>
			 <%
			   			}
			   		} catch (SQLException e) {
			   			e.printStackTrace();
			   		}
			   	} finally {
		   			if (con != null){
		   				st.close();
		   				con.close();
		   				rs.close();
		   			}
		   		}
			   
			   %>
		</table>
	</div>


	<!-- FOOTER -->
	<div class="container-fluid footer">
		<div class="container">
			<div class="navbar-left">© 2015 humanhsecurityinteraction.com.
				All rights reserved.</div>
			<div class="navbar-right">
				<a href="index.html">Home</a> | <a href="model.html">Model</a> | <a
					href="methodology.html">Methodology</a> | <a href="patterns.html">Patterns</a>
				| <a href="about.html">About</a> | <a href="contact.html">Contact
					Us</a>
			</div>
		</div>
	</div>
	<!-- FOOTER -->

</body>
</html>