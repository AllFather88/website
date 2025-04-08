package org.example.controller;

import org.example.base.UserDto;
import org.example.service.JWT.JwtDTO;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/public")
class RegistrationAndLogin {
    @PostMapping("/login")
    JwtDTO Entry(@RequestBody UserDto user) {
       return getTokens(user);
    }
    @PostMapping("/registration")
    JwtDTO Registration(@RequestBody UserDto user){
        return getTokens(user);
    }
}

