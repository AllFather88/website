package org.example.service.JWT;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Base64;
import java.util.Date;
import java.util.UUID;

@Service
public class JwtService {
    static private String secret = Base64.getEncoder().encodeToString(UUID.randomUUID().toString().getBytes());
    static public String getNewToken(String token){
        String response;
        if(JwtService.validateJWT(token)){
            Claims cl = JwtService.extractClaims(token);
            response = JwtService.generateJWT(cl.get("name",String.class),cl.get("role",String.class));
        }
        else{
            response = "session is over";
        }
        return response;
    }
    static public JwtDTO generateAuthToken(String name, String role){
        JwtDTO token = new JwtDTO();
        token.setToken(generateJWT(name,role));
        token.setRefreshtoken(generateRefreshJWT(name,role));
        return token;
    }
    static public JwtDTO refreshBaseToken(String name, String role , String refreshToken){
        JwtDTO token = new JwtDTO();
        token.setToken(generateJWT(name,role));
        token.setRefreshtoken(refreshToken);
        return token;
    }
    static public boolean validateJWT(String token){
        try {
            Jwts.parser()
                    .verifyWith(getKey())
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
            return true;
        } catch (Exception e) {
           return false;
        }
    }
    static public Claims extractClaims(String token) {
        return Jwts.parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
    static public boolean rightsСheck(String role,String token){
        if(!validateJWT(token)){
            return false;
        }
        Claims claims = extractClaims(token);
        String rl = claims.get("role",String.class);
        if(rl.equals(role)){
            return true;
        }
        else{
            return false;
        }
    }
    static public String generateJWT(String name,String role){
        Date date = Date.from(LocalDateTime.now().plusMinutes(30).atZone(ZoneId.systemDefault()).toInstant());
        return Jwts.builder()
                .subject(name)
                .claim("role", role)
                .expiration(date).signWith(getKey())
                .compact();
    }
    static public String generateRefreshJWT(String name,String role){
        Date date = Date.from(LocalDateTime.now().plusHours(10).atZone(ZoneId.systemDefault()).toInstant());
        return Jwts.builder()
                .subject(name)
                .claim("role", role)
                .expiration(date).signWith(getKey())
                .compact();
    }
    @NonNull
    static private SecretKey getKey(){
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
