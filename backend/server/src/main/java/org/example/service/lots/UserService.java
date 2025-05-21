package org.example.service.lots;

import io.jsonwebtoken.Claims;
import org.example.base.*;
import org.example.base.User;
import org.example.service.EmailService;
import org.example.service.JWT.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserService {
    @Autowired
    UsersRepository users;
    @Autowired
    CarsRepository cars;
    @Autowired
    EmailService email;
    public List<User> users(String token){
        token = token.substring(6);
        Claims cl = JwtService.extractClaims(token);
        String name = cl.getSubject();
        if(!"user".equals(name)){
            return null;
        }
        List<User> usr = users.findAll();
        for(User us : usr){
            us.setPassword("");
        }
        return users.findAll();
    }
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
            Set<Integer> uniqueSet = new HashSet<>(saved);
            saved = new LinkedList<>(uniqueSet);
            System.out.println(saved.toString());
            if(saved.contains(id)){
                saved.remove(id);
            }else {
                saved.add(id);
            }
            user.setSaved(saved);
        }
        users.save(user);
        return true;
    }
    public List<Cars> saved(String token) {
        token = token.substring(6);
        Claims cl = JwtService.extractClaims(token);
        String name = cl.getSubject();
        if(name == null){
            return null;
        }

        List<Integer> saved = users.findByName(name).getSaved();
        if(saved == null){
            return null;
        }
        List<Cars> response = new LinkedList<Cars>();
        for(Integer id : saved){
            Cars add = cars.findOneById(id);
            if(add != null) {
                response.add(cars.findOneById(id));
            }
        }
        return response;

    }
    public boolean Del(Integer id, String token) {
        token = token.substring(6);
        Claims cl = JwtService.extractClaims(token);
        String name = cl.getSubject();
        if(!"user".equals(name)){
            return false;
        }
        User user = users.findOneById(id);
        if(user != null && !user.getName().equals("user")){
            users.delete(user);
            email.sendEmail(user.getEmail(),"Ваш аккаунт удален", "Аккаунт "+ user.getName() +" был удалён администратором");
            return true;
        }
        return false;
    }
    public boolean change(Integer id, String token) {
        token = token.substring(6);
        Claims cl = JwtService.extractClaims(token);
        String name = cl.getSubject();
        if(!"user".equals(name)){
            return false;
        }
        User user = users.findOneById(id);
        if(user != null && !user.getName().equals("user")){
            if(user.getRole().equals("admin")){
                user.setRole("user");
                email.sendEmail(user.getEmail(),"Вас лишили прав администратора", "Аккаунт "+ user.getName() +" был лишён прав администратора");
            }
            else{
                user.setRole("admin");
                email.sendEmail(user.getEmail(),"Вам выдали права администратора", "Аккаунт "+ user.getName() +" получил права администратора");
            }
            users.save(user);
            return true;
        }
        return false;
    }
}
