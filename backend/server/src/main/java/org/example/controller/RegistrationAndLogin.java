package org.example.controller;


import org.example.base.ReturnUser;
import org.example.base.UserDto;
import org.example.service.JWT.JwtDTO;
import org.example.service.JWT.JwtService;
import org.example.service.authorization.Login;
import org.example.service.authorization.Registration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/public")
class RegistrationAndLogin {
    @Autowired
    private Login loginService;
    @Autowired
    private Registration registration;

    @PostMapping("/login")
    private ReturnUser Entry(@RequestBody UserDto user) {
        return loginService.getTokens(user);
    }
    @PostMapping("/registration")
    private ReturnUser Registration(@RequestBody UserDto user){
        return registration.getTokens(user);
    }
    @GetMapping("newtoken")
    private ResponseEntity<String> newToken(@RequestBody String refreshToken) {
        String newToken = JwtService.getNewToken(refreshToken);
        if ("session is over".equals(newToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(newToken);
        }
        return ResponseEntity.ok(newToken);
    }

}

