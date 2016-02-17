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
		<h2>Hack List Entry</h2>
		<form action="HackEntryServlet" method="POST" name="hackform">
			<table class="myTableText">
				<tr>
					<td>Header :</td>
					<td><input type="text" name="header" /></td>
				</tr>
				<tr>
					<td>Context :</td>
					<td><input type="text" name="context" /></td>
				</tr>
				<tr>
					<td>Target :</td>
					<td><input type="text" name="target" /></td>
				</tr>
				<tr>
					<td>Target Data Type :</td>
					<td><form action="">
                                            <input type="checkbox" name=“type” value="Application">Application<br>
                                            <input type="checkbox" name=“type” value="Enail">Email<br>
                                            <input type="checkbox" name=“type” value="Database">Database<br>
                                            <input type="checkbox" name=“type” value="Securitysystem">Security system<br>
                                            <input type="checkbox" name=“type” value="HostFileSystem">Host File System<br>
                                            <input type="checkbox" name=“type” value="PersonalFileSystem">Personal File System
                                            </form>
                                        /td>
				</tr>
				<tr>
					<td>Hacker relation to target :</td>
					<td><input type="text" name="relation" /></td>
				</tr>
				<tr>
					<td>Subjected Hacker User Contribution :</td>
					<td><input type="text" name="contribution" /></td>
				</tr>
				<tr>
					<td>Motive :</td>
					<td><input type="text" name="motive" /></td>
				</tr>
				<tr>
					<td>Malware Used Type :</td>
					<td><input type="text" name="malwaretype" /></td>
				</tr>
				<tr>
					<td>Malware Name :</td>
					<td><input type="text" name="malwarename" /></td>
				</tr>
				<tr>
					<td>System Type :</td>
					<td><input type="text" name="systemtypes" /></td>
				</tr>
				<tr>
					<td>Malware Source :</td>
					<td><input type="text" name="malwaresource" /></td>
				</tr>
				<tr>
					<td>Browser Type :</td>
					<td><input type="text" name="browsertype" /></td>
				</tr>
				<tr>
					<td>Date :</td>
					<td><input type="text" name="date" /></td>
				</tr>
				<tr>
					<td>Notes :</td>
					<td><input type="text" name="notes" /></td>
				</tr>
				<tr>
					<td>CIO Name:</td>
					<td><input type="text" name="cio" /></td>
				</tr>
				<tr>
					<td>Sources :</td>
					<td><input type="text" name="sources" /></td>
				</tr>
				<tr>
					<td colspan="2">
						<center>
							<input type="submit" name="Submit" />
						</center>
					</td>
				</tr>

			</table>
		</form>
	</div>


	<!-- FOOTER -->
	<div class="container-fluid footer">
		<div class="container">
			<div class="navbar-left">� 2015 humanhsecurityinteraction.com.
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