package org.example.service.JWT;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class JwtService {
    @Value("5c819f8cc63427b0d9aabfaae0df09edabc198a8051b538df684c38a33b33d2d")
    private String secret;

    public JWTauthDAO generateAuthToken(){
        JWTauthDAO token = new JWTauthDAO();
        token.setToken();
    }
}
