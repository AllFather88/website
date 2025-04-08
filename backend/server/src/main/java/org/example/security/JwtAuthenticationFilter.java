package org.example.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.example.service.JWT.JwtService;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;

public class JwtAuthenticationFilter extends OncePerRequestFilter {
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        // Пропускаем запросы, которые начинаются с /public/
        return request.getRequestURI().startsWith("/public/");
    }
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain chain)
            throws IOException, ServletException {

        String token = request.getHeader("Authorization");
        if (token == null || !token.startsWith("Token ")) {
            sendErrorResponse(response, "Token not received", HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }
        try {
            token = token.substring(6);
            String username = JwtService.extractClaims(token).getSubject();

            if (username == null || !JwtService.validateJWT(token)) {
                sendErrorResponse(response, "Invalid token", HttpServletResponse.SC_UNAUTHORIZED);
                return;
            }
            chain.doFilter(request, response);
        } catch (Exception e) {
            sendErrorResponse(response, "Token verification failed: " + e.getMessage(), HttpServletResponse.SC_FORBIDDEN);
        }
    }

    private void sendErrorResponse(HttpServletResponse response, String message, int status) throws IOException {
        response.setStatus(status);
        response.setContentType("application/json");
        response.getWriter().write("{\"error\": \"" + message + "\"}");
    }
}

