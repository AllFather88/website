package org.example.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    @GetMapping("*")
    public String sayHello() {
        return "пока";
    }
    @GetMapping("mark")
    public String say() {
        return "mark";
    }
}