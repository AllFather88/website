package org.example.service.authorization;

import org.example.base.ReturnUser;
import org.example.base.User;
import org.example.base.UserDto;
import org.example.base.UsersRepository;
import org.example.service.JWT.JwtDTO;
import org.example.service.JWT.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Registration {
    @Autowired
    private UsersRepository users;
    public ReturnUser getTokens(UserDto user){
        ReturnUser response = new ReturnUser();
        user.setPassword(Hash.hashPassword(user.getPassword()));
        User a = users.findByName(user.getName());
        if(a == null){
            a = new User();
            a.setPassword(user.getPassword());
            a.setName(user.getName());
            a.setPhone_number(user.getPhone_number());
            a.setRole("user");
            users.save(a);
            response.setName(user.getName());
            response.setRole("user");
            response.getTokens().setToken(JwtService.generateJWT(a.getName(),a.getRole()));
            response.getTokens().setRefreshtoken(JwtService.generateRefreshJWT(a.getName(),a.getRole()));
            response.setSaved(List.of(-1));
        }
        else {
            response.getTokens().setToken("error");
            response.getTokens().setRefreshtoken("Пользователь с таким именем уже есть!");
        }

        return response;
    }
}
