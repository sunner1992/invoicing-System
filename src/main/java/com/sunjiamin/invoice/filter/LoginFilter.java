package com.sunjiamin.invoice.filter;

import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.core.annotation.Order;

@Order(1)
@WebFilter(filterName = "testFilter1", urlPatterns = "/invoice/*")
public class LoginFilter implements Filter {

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		HttpServletRequest httpServletRequest = (HttpServletRequest) request;
		HttpServletResponse httpServletResponse = (HttpServletResponse) response;
//		String referer = httpServletRequest.getHeader("Referer");
		String url = httpServletRequest.getRequestURI();
		String username = (String) httpServletRequest.getSession().getAttribute("username");
		if (username != null || url.indexOf("login") > 0) {
			chain.doFilter(request, response);
		} else {
			httpServletResponse.sendRedirect("/invoice/#!/lgoin");
		}
	}

	@Override
	public void destroy() {

	}

}
