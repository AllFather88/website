package org.example.controller;

import org.example.base.User;
import org.example.base.UserDto;
import org.example.base.UsersRepository;
import org.example.service.JWT.JwtDTO;
import org.example.service.JWT.JwtService;
import org.example.service.authorization.Hash;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/account")
class RegistrationAndLogin {
    @Autowired
    private UsersRepository users;
    @PostMapping("/login")
    JwtDTO Login(@RequestBody UserDto user) {
        if(user == null){
            JwtDTO x =  new JwtDTO();
            x.setToken("ssss");
            x.setRefreshtoken("ssss");
            return x;
        }
        user.setPassword(Hash.hashPassword(user.getPassword()));
        User a = users.findByName(user.getName());
        JwtDTO response = new JwtDTO();
        if(a.getPassword().equals(user.getPassword())){
            response.setToken(JwtService.generateJWT(a.getName(),a.getRole()));
            response.setRefreshtoken(JwtService.generateRefreshJWT(a.getName()));
        }
        return response;
    }
}

@RestController
@RequestMapping("/public")
class HelloController {
    @GetMapping("/hello")
    public String sayHello() {
        return "Привет, Spring Boot!";
    }
}

@RestController
@RequestMapping("/x")
class Hello {
    @Autowired
    private UsersRepository users;
    @GetMapping("*")
    public List<String> sayHello() {

        User us = new User("mark","aaaa","admin");
        if(users.findUsersByName("mark").isEmpty()){
            us = new User("mark","aaaa","admin");
        }
        if(us != null) {
            users.save(us);
        }
        return List.of("Holaa","mark");
    }
    @GetMapping("mark")
    public  List<String> say() {
        return List.of("Holaa","mark");
    }
}