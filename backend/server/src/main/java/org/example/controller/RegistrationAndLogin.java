package org.example.controller;

import org.example.base.Cars;
import org.example.base.CarsRepository;
import org.example.base.CarsWithFiles;
import org.example.base.UserDto;
import org.example.service.JWT.JwtDTO;
import org.example.service.authorization.Login;
import org.example.service.authorization.Registration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;


@RestController
@RequestMapping("/public")
class RegistrationAndLogin {
    @Autowired
    private Login loginService;
    @Autowired
    private Registration registration;

    @PostMapping("/login")
    private JwtDTO Entry(@RequestBody UserDto user) {
        return loginService.getTokens(user);
    }
    @PostMapping("/registration")
    private JwtDTO Registration(@RequestBody UserDto user){
        return registration.getTokens(user);
    }
    @Autowired
    CarsRepository x;
    @PostMapping("/x")
    public String handleForm(@RequestParam("file") List<MultipartFile> files,
                             @ModelAttribute Cars data) {
        System.out.println("Файлы загружены: " + files.size());
        String uploadDir = "C:/Users/user/Desktop/ч/website/backend/server/src/main/resources/images/";
        try {
            String uniqueDir = uploadDir + System.currentTimeMillis() + "/";
            Files.createDirectories(Paths.get(uniqueDir));
            for (MultipartFile file : files) {
                Path path = Paths.get(uniqueDir, file.getOriginalFilename()); // Сохранение файла в новую папку
                Files.write(path, file.getBytes());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        x.save(data);
        return "Файл загружен!";
    }
}

