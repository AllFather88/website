package org.example.controller;

import org.example.base.UserDto;
import org.example.service.JWT.JwtDTO;
import org.example.service.authorization.Login;
import org.example.service.authorization.Registration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/public")
class RegistrationAndLogin {
    @Autowired
    Login loginService;
    @Autowired
    Registration registration;

    @PostMapping("/login")
    JwtDTO Entry(@RequestBody UserDto user) {
       return loginService.getTokens(user);
    }
    @PostMapping("/registration")
    JwtDTO Registration(@RequestBody UserDto user){
        return registration.getTokens(user);
    }
}

