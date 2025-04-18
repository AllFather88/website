package org.example.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.example.service.JWT.JwtService;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;
import java.util.List;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

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
            System.out.println(username);
            if (username == null || !JwtService.validateJWT(token)) {
                sendErrorResponse(response, "Invalid token", HttpServletResponse.SC_UNAUTHORIZED);
                return;
            }
            List<GrantedAuthority> authorities = List.of(new SimpleGrantedAuthority(JwtService.extractClaims(token).get("role",String.class)));
            UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(username, null, authorities);
            SecurityContextHolder.getContext().setAuthentication(auth);
            chain.doFilter(request, response);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            sendErrorResponse(response, "Token verification failed: " + e.getMessage(), HttpServletResponse.SC_FORBIDDEN);
        }

    }

    private void sendErrorResponse(HttpServletResponse response, String message, int status) throws IOException {
        response.setStatus(status);
        response.setContentType("application/json");
        response.getWriter().write("{\"error\": \"" + message + "\"}");
    }
}

