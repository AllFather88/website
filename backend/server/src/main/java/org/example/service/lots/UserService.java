package org.example.service.lots;

import io.jsonwebtoken.Claims;
import org.example.base.*;
import org.example.base.User;
import org.example.service.JWT.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;

@Service
public class UserService {
    @Autowired
    UsersRepository users;
    @Autowired
    CarsRepository cars;

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


    public boolean save(Integer id, String token) {
        token = token.substring(6);
        Claims cl = JwtService.extractClaims(token);
        String name = cl.getSubject();
        try{
            Cars car = cars.findById(id).orElseThrow();
        } catch (Exception e) {
            return false;
        }
        User user = users.findByName(name);
        List<Integer> saved = user.getSaved();
        if(saved == null){
            saved = new LinkedList<>();
            saved.add(id);
            user.setSaved(saved);
        }
        else{
            if(saved.contains(id)){
                saved.remove(id);
            }else {
                saved.add(id);
            }
        }
        users.save(user);
        return true;
    }
}
