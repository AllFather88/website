package org.example.controller;

import org.example.base.Users;
import org.example.base.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
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

        Users us = new Users("mark","aaaa","admin");
        if(users.findByName("mark").isEmpty()){
            us = new Users("mark","aaaa","admin");
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