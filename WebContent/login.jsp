<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Human Security Interaction</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="google-signin-client_id"
	content="150003091760-k7c690rf8qtrjohjvvqe5l28ra398kcu.apps.googleusercontent.com">
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

	<center>
		<div class="container firstdiv">
			<h2>Hack List Login</h2>
			<h3>Sign In Using Google</h3>
			<div class="g-signin2" data-onsuccess="onSignIn"></div>
			<script type="text/javascript">
				function onSignIn(googleUser) {
					var profile = googleUser.getBasicProfile();
					console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
					console.log('Name: ' + profile.getName());
					console.log('Image URL: ' + profile.getImageUrl());
					console.log('Email: ' + profile.getEmail());
					var id_token = googleUser.getAuthResponse().id_token;
					console.log("ID Token: " + id_token);

					/* window.location = "dataform.jsp"; 
					request.setAttribute("token", id_token);*/
					window.location = "HackLoginServlet?token=" + id_token;
				}
			</script>
			<br />
			<br />
		</div>
	</center>



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