package org.example.service.authorization;

import io.jsonwebtoken.Claims;
import org.example.base.UsersRepository;
import org.example.service.JWT.JwtDTO;
import org.example.service.JWT.JwtService;
import org.example.service.JWT.TokenDTO;
import org.springframework.beans.factory.annotation.Autowired;

public class UpdateToken {
    @Autowired
    private UsersRepository users;

    public JwtDTO getNewToken(TokenDTO token){
        JwtDTO response = new JwtDTO();
        if(JwtService.validateJWT(token.getToken())){
            Claims cl = JwtService.extractClaims(token.getToken());
            response.setRefreshtoken(token.getToken());
            response.setToken(JwtService.generateJWT(cl.get("name",String.class),cl.get("role",String.class)));
        }
        else{
            response.setRefreshtoken("Refreshtoken не действителен!");
            response.setToken("error");
        }
        return response;
    }
}
