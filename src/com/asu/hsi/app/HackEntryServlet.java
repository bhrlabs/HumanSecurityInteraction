package com.asu.hsi.app;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class HackEntryServlet
 */
//@WebServlet("/HackEntryServlet")
public class HackEntryServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public HackEntryServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		//response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("Status: In Servlet....");
		
		String[] values = new String[16];
		values[0] = request.getParameter("header");
		values[1] = request.getParameter("context");
		values[2] = request.getParameter("target");
		values[3] = request.getParameter("datatype");
		values[4] = request.getParameter("relation");
		values[5] = request.getParameter("contribution");
		values[6] = request.getParameter("motive");
		values[7] = request.getParameter("malwaretype");
		values[8] = request.getParameter("malwarename");
		values[9] = request.getParameter("systemtype");
		values[10] = request.getParameter("malwaresource");
		values[11] = request.getParameter("browsertype");
		values[12] = request.getParameter("date");
		values[13] = request.getParameter("notes");
		values[14] = request.getParameter("cio");
		values[15] = request.getParameter("sources");
		
		// TODO: Call Database function here
		
		String output = "<body><h1>Entry Added<h2></br>"
				+ "<a href=\"dataform.jsp\">Back to Entry Page</a></body>";
		PrintWriter out = response.getWriter();
		out.println(output);
		
		
		doGet(request, response);
	}

}
