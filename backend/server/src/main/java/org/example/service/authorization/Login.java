package org.example.service.authorization;

import org.example.base.ReturnUser;
import org.example.base.UserDto;
import org.example.base.UsersRepository;
import org.example.service.JWT.JwtDTO;
import org.example.service.JWT.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.example.base.User;

import java.util.List;

@Service
public class Login {
    @Autowired
    private UsersRepository users;
    public ReturnUser getTokens(UserDto user){
        user.setPassword(Hash.hashPassword(user.getPassword()));
        User a = users.findByName(user.getName());
        ReturnUser response = new ReturnUser();
        if(a != null &&  a.getPassword().equals(user.getPassword())){
            response.getTokens().setToken(JwtService.generateJWT(a.getName(),a.getRole()));
            response.getTokens().setRefreshtoken(JwtService.generateRefreshJWT(a.getName(),a.getRole()));
            response.setName(a.getName());
            response.setRole(a.getRole());
            List<Integer> sv = a.getSaved();
            if(sv == null || sv.isEmpty()){
                sv= List.of(-1);
            }
            response.setSaved(sv);
        }
        else{
            response.getTokens().setToken("error");
            response.getTokens().setRefreshtoken("Неверен логин или пароль");
        }
        return response;
    }
}
