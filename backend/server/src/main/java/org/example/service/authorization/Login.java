package org.example.service.authorization;

import org.example.base.User;
import org.example.base.UserDto;
import org.example.base.UsersRepository;
import org.example.service.JWT.JwtDTO;
import org.example.service.JWT.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class Login {
    @Autowired
    private UsersRepository users;
    public JwtDTO getTokens(UserDto user){
        user.setPassword(Hash.hashPassword(user.getPassword()));
        User a = users.findByName(user.getName());
        JwtDTO response = new JwtDTO();
        if(a != null &&  a.getPassword().equals(user.getPassword())){
            response.setToken(JwtService.generateJWT(a.getName(),a.getRole()));
            response.setRefreshtoken(JwtService.generateRefreshJWT(a.getName(),a.getRole()));
        }
        else{
            response.setToken("error");
            response.setRefreshtoken("Неверен логин или пароль");
        }
        return response;
    }
}
