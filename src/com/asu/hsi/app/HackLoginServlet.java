package com.asu.hsi.app;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.asu.hsi.engine.LoginManager;

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
		// TODO Auto-generated method stub
		// response.getWriter().append("Served at: ").append(request.getContextPath());
		
		String idTokenString = request.getParameter("token");
		GoogleAPI.verifyToken(idTokenString);
		System.out.println("here");
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
