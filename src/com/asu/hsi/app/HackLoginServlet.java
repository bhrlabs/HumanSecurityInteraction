package com.asu.hsi.app;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.catalina.Session;

import com.asu.hsi.engine.LoginManager;
import com.google.api.client.auth.oauth2.AuthorizationCodeFlow;

/**
 * Servlet implementation class HackLoginServlet
 */
//@WebServlet("/HackLoginServlet")
public class HackLoginServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public HackLoginServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// response.getWriter().append("Served at: ").append(request.getContextPath());
		String idTokenString = request.getParameter("token");
		boolean flag = GoogleAPI.verifyToken(idTokenString);

		if (flag) {
			RequestDispatcher rd = request.getRequestDispatcher("dataform.jsp");
			rd.forward(request, response);
		} else {
			PrintWriter out = response.getWriter();
			out.println("<body><h1>Login Failed</h1></br><a href=\"login.jsp\">Back to Login Page</a></body>");
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String idTokenString = request.getParameter("token");
		/*String password = request.getParameter("password");
		
		boolean flag = LoginManager.tryLogin(username, password);
		
		PrintWriter out = response.getWriter();
		
		String res = "";
		if (flag) {
			res = "Passed";
		} else {
			res = "Failed";
		}
		
		out.println("<body><h1>Login " + res + "</h1></br><a href=\"dataform.jsp\">Enter Website</a></body>");*/
		
		//doGet(request, response);
	}

}
