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
	<div class="main-section">
		<div class="login-form">
			<%
				String[] user = GoogleSession.getUserEmail(token);
			%>
			<h2>
				<%
					out.print(user[1] + " - " + user[0]);
				%>

				<div style="display: none;">
					<div class="g-signin2" data-onsuccess="onSignIn"></div>
				</div>
				<a href="#" onclick="signOut();"><img src="images/so.png" /></a>
				<script>
					function signOut() {
						var auth2 = gapi.auth2.getAuthInstance();
						auth2.signOut().then(function() {
							console.log('User signed out.');
						});
						window.location = "login.jsp";
					}
				</script>
			</h2>
			<form action="HackEntryServlet" method="POST" name="hackform">
				<table>
					<tr>
						<td><h4>Header :</h4></td>
						<td><input type="text" name="header" placeholder="Header" /></td>
					</tr>
					<tr>
						<td><h4>Context :</h4></td>
						<td><textarea class="mess" name="context"
								placeholder="Context"></textarea></td>
					</tr>
					<tr>
						<td><h4>Target :</h4></td>
						<td><input type="text" name="target" placeholder="Target" /></td>
					</tr>
					<tr>
						<td><h4>Target Datatype :</h4></td>
						<td><input type="checkbox" name="datatype"
							value="Application">Application &nbsp;&nbsp;&nbsp;&nbsp;
							<input type="checkbox" name="datatype" value="Email">Email
							&nbsp;&nbsp;&nbsp;&nbsp; <input type="checkbox" name="datatype"
							value="Database">Database &nbsp;&nbsp;&nbsp;&nbsp; <input
							type="checkbox" name="datatype" value="Securitysystem">Security
							system &nbsp;&nbsp;&nbsp;&nbsp; <input type="checkbox"
							name="datatype" value="HostFileSystem">Host File
							System&nbsp;&nbsp;&nbsp;&nbsp; <input type="checkbox"
							name="datatype" value="PersonalFileSystem">Personal File
							System</td>
					</tr>
					<tr>
						<td><h4>Hacker relation to target :</h4></td>
						<td><input type="text" name="relation" /></td>
					</tr>
					<tr>
						<td><h4>Subjected Hacker User Contribution :</h4></td>
						<td><input type="text" name="contribution" /></td>
					</tr>
					<tr>
						<td><h4>Motive :</h4></td>
						<td><input type="checkbox" name="motive" value="Entitiled">Entitiled
							&nbsp;&nbsp;&nbsp;&nbsp; <input type="checkbox" name="motive"
							value="Sabotage">Sabotage &nbsp;&nbsp;&nbsp;&nbsp; <input
							type="checkbox" name="motive" value="Conflict of Interest">Conflict
							of Interest &nbsp;&nbsp;&nbsp;&nbsp; <input type="checkbox"
							name="motive" value="Intrusion">Intrusion
							&nbsp;&nbsp;&nbsp;&nbsp; <input type="checkbox" name="motive"
							value="Just Because I Can">Just Because I
							Can&nbsp;&nbsp;&nbsp;&nbsp; <input type="checkbox" name="motive"
							value="Espionage">Espionage&nbsp;&nbsp;&nbsp;&nbsp;
							<input type="checkbox" name="motive"
							value="Re-selling Data">Re-selling Data&nbsp;&nbsp;&nbsp;&nbsp;
							<input type="checkbox" name="motive"
							value="Revenge">Revenge&nbsp;&nbsp;&nbsp;&nbsp;
							<input type="checkbox" name="motive"
							value="Ransom">Ransom&nbsp;&nbsp;&nbsp;&nbsp;</td>
					</tr>
					<tr>
						<td><h4>Malware Used Type :</h4></td>
						<td><input type="checkbox" name="malwaretype" value="Virus">Virus
							&nbsp;&nbsp;&nbsp;&nbsp; <input type="checkbox" name="motive"
							value="Worm">Worm &nbsp;&nbsp;&nbsp;&nbsp; <input
							type="checkbox" name="malwaretype" value="AdWare">AdWare&nbsp;&nbsp;&nbsp;&nbsp; <input type="checkbox"
							name="malwaretype" value="Spyware">Spyware
							&nbsp;&nbsp;&nbsp;&nbsp; <input type="checkbox" name="malwaretype"
							value="CrapWare">CrapWare&nbsp;&nbsp;&nbsp;&nbsp; <input type="checkbox" name="malwaretype"
							value="Trojan Horse">Trojan Horse&nbsp;&nbsp;&nbsp;&nbsp;
							<input type="checkbox" name="malwaretype"
							value="RansomWare">RansomWare&nbsp;&nbsp;&nbsp;&nbsp;
							<input type="checkbox" name="malwaretype"
							value="JSMalware">JSMalware&nbsp;&nbsp;&nbsp;&nbsp;</td>
					</tr>
					<tr>
						<td><h4>Malware Name :</h4></td>
						<td><input type="text" name="malwarename" placeholder="Malware Name"/></td>
					</tr>
					<tr>
						<td><h4>System Type :</h4></td>
						<td><input type="text" name="systemtype" placeholder="System Type"/></td>
					</tr>
					<tr>
						<td><h4>Malware Source :</h4></td>
						<td><input type="checkbox" name="malwaresource"
							value="Phishing">Phishing &nbsp;&nbsp;&nbsp;&nbsp; <input
							type="checkbox" name="malwaresource" value="Trusted Source">Trusted
							Source &nbsp;&nbsp;&nbsp;&nbsp; <input type="checkbox"
							name="malwaresource" value="Website">Website
							&nbsp;&nbsp;&nbsp;&nbsp; <input type="checkbox"
							name="malwaresource" value="Notes">Notes
							&nbsp;&nbsp;&nbsp;&nbsp;</td>
					</tr>
					<tr>
						<td><h4>Browser Type :</h4></td>
						<td><input type="checkbox" name="browsertype" value="Chrome">Chrome
							&nbsp;&nbsp;&nbsp;&nbsp; <input type="checkbox"
							name="browsertype" value="IE Explorer">IE Explorer
							&nbsp;&nbsp;&nbsp;&nbsp; <input type="checkbox"
							name="browsertype" value="Firefox">Firefox
							&nbsp;&nbsp;&nbsp;&nbsp; <input type="checkbox"
							name="browsertype" value="Safari">Safari
							&nbsp;&nbsp;&nbsp;&nbsp;</td>
					</tr>
					<tr>
						<td><h4>Date :</h4></td>
						<td><input type="text" name="hdate" placeholder="Date"/></td>
					</tr>
					<tr>
						<td><h4>Notes :</h4></td>
						<td><textarea class="mess" type="text" name="notes" placeholder="Notes"></textarea></td>
					</tr>
					<tr>
						<td><h4>Contact Name:</h4></td>
						<td><input type="text" name="cio" placeholder="Contact"/></td>
					</tr>
					<tr>
						<td><h4>Sources :</h4></td>
						<td><input type="text" name="sources" placeholder="Sources"/></td>
					</tr>
				</table>
				<input type="submit" value="Submit your hack">
			</form>
		</div>
	</div>

	<br />

	<%
		} else {
	%>
	<div class="container firstdiv">
		<h1>Kindly Login to Proceed</h1>
		<br /> <a href="login.jsp">Login Page</a>
	</div>

	<br />
	<br />
	<center>
		<div style="display: none;">
			<div class="g-signin2" data-onsuccess="onSignIn"></div>
		</div>
		<br /> <br /> <br /> <a href="#" onclick="signOut();"><img
			src="images/so.png" /></a>
		<script>
			function signOut() {
				var auth2 = gapi.auth2.getAuthInstance();
				auth2.signOut().then(function() {
					console.log('User signed out.');
				});
				window.location = "login.jsp";
			}
		</script>
		<br /> <br />
	</center>

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