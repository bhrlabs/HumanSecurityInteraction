<%@page import="com.asu.hsi.engine.GoogleSession"%>
<%@page import="com.asu.hsi.properties.SessionVar"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<meta name="google-signin-client_id"
	content="150003091760-k7c690rf8qtrjohjvvqe5l28ra398kcu.apps.googleusercontent.com">
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
<script src="https://apis.google.com/js/platform.js" async defer></script>
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
	<%
		String token = request.getParameter("token");
		if (GoogleSession.isUserValid(token)) {
	%>
	<div class="main">
		<div class="main-section">
			<div class="login-form">
				<h2>Hack List Entry</h2>
				<%
					String[] user = GoogleSession.getUserEmail(token);
				%>
				<span> <%
 	out.print(user[1] + " - " + user[0]);
 %>
				</span>
				<form action="HackEntryServlet" method="POST" name="hackform">
					<h4>Header :</h4>
					<input type="text" name="header" placeholder="Header" />
					<h4>Context :</h4>
					<textarea class="mess" name="context" placeholder="Context"></textarea>
					<h4>Target :</h4>
					<input type="text" name="target" placeholder="Target" />
					<h4>Target Data Type :</h4>
					<!-- <input type="text" name="datatype" /> -->
					<input type="checkbox" name="datatype" value="Application">Application
					&nbsp;&nbsp;&nbsp;&nbsp; <input type="checkbox" name="datatype"
						value="Email">Email &nbsp;&nbsp;&nbsp;&nbsp; <input
						type="checkbox" name="datatype" value="Database">Database
					&nbsp;&nbsp;&nbsp;&nbsp; <input type="checkbox" name="datatype"
						value="Securitysystem">Security system
					&nbsp;&nbsp;&nbsp;&nbsp; <input type="checkbox" name="datatype"
						value="HostFileSystem">Host File
					System&nbsp;&nbsp;&nbsp;&nbsp; <input type="checkbox"
						name="datatype" value="PersonalFileSystem">Personal File
					System
					<h4>Hacker relation to target :</h4>
					<input type="text" name="relation" />
					<h4>Subjected Hacked User Contribution :</h4>
					<input type="text" name="contribution" />
					<h4>Motive :</h4>
					<input type="text" name="motive" />
					<h4>Malware Used Type :</h4>
					<input type="text" name="malwaretype" />
					<h4>Malware Name :</h4>
					<input type="text" name="malwarename" />
					<h4>System Type :</h4>
					<input type="text" name="systemtype" />
					<h4>Malware Source :</h4>
					<input type="text" name="malwaresource" />
					<h4>Browser Type :</h4>
					<input type="text" name="browsertype" />
					<h4>Date :</h4>
					<input type="text" name="hdate" />
					<h4>Notes :</h4>
					<textarea class="mess" type="text" name="notes"></textarea>
					<h4>CIO Name:</h4>
					<input type="text" name="cio" />
					<h4>Sources :</h4>
					<input type="text" name="sources" /> <input type="submit"
						value="Submit your hack">
				</form>
			</div>
		</div>
	</div>

	<br />
	<br />
	<center>
		<div class="g-signin2" data-onsuccess="onSignIn"></div>
		<br />
		<br />
		<br /> <a href="#" onclick="signOut();"><img src="images/so.png" /></a>
		<script>
			function signOut() {
				var auth2 = gapi.auth2.getAuthInstance();
				auth2.signOut().then(function() {
					console.log('User signed out.');
				});
				window.location = "login.jsp";
			}
		</script>
		<br />
		<br />
	</center>
	<%
		} else {
	%>
	<div class="container firstdiv">
		<h1>Kindly Login to Proceed</h1>
		<br /> <a href="login.jsp">Login Page</a>
	</div>

	<%
		}
	%>
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