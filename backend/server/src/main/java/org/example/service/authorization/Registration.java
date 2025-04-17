package org.example.service.authorization;

import org.example.base.User;
import org.example.base.UserDto;
import org.example.base.UsersRepository;
import org.example.service.JWT.JwtDTO;
import org.example.service.JWT.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class Registration {
    @Autowired
    private UsersRepository users;
    public JwtDTO getTokens(UserDto user){
        JwtDTO response = new JwtDTO();
        user.setPassword(Hash.hashPassword(user.getPassword()));
        User a = users.findByName(user.getName());
        if(a == null){
            a = new User();
            a.setPassword(user.getPassword());
            a.setName(user.getName());
            a.setRole("user");
             users.save(a);
        }
        else {
            response.setToken("error");
            response.setRefreshtoken("Пользователь с таким именем уже есть!");
        }
        response.setToken(JwtService.generateJWT(a.getName(),a.getRole()));
        response.setRefreshtoken(JwtService.generateRefreshJWT(a.getName(),a.getRole()));
        return response;
    }
}
