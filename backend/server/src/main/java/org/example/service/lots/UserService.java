package org.example.service.lots;

import io.jsonwebtoken.Claims;
import org.example.base.EmailDTO;
import org.example.base.NumberDTO;
import org.example.base.User;
import org.example.base.UsersRepository;
import org.example.service.JWT.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    UsersRepository users;

    public void newNumber(NumberDTO number,String token){
        token = token.substring(6);
        Claims cl = JwtService.extractClaims(token);
        String name = cl.getSubject();
        User user = users.findByName(name);
        if(user != null){
            if(number.getPhone_number() != null && !number.getPhone_number().isEmpty()){
                user.setPhone_number(number.getPhone_number());
                users.save(user);
            }
        }
    }
    public void newEmail(EmailDTO email,String token){
        token = token.substring(6);
        Claims cl = JwtService.extractClaims(token);
        String name = cl.getSubject();
        User user = users.findByName(name);
        if(user != null){
            if(email.getEmail() != null && !email.getEmail().isEmpty()){
                user.setEmail(email.getEmail());
                users.save(user);
            }
        }
    }
    public User Im(String token){
        token = token.substring(6);
        Claims cl = JwtService.extractClaims(token);
        String name = cl.getSubject();
        User user = users.findByName(name);
        user.setPassword(null);
        return user;
    }


}
