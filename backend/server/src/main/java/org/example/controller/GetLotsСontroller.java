package org.example.controller;

import org.example.base.Cars;
import org.example.base.CarsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/public")
public class GetLotsСontroller {
    @Autowired
    CarsRepository x;
    @PostMapping("/addlot")
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
@RestController
@RequestMapping("/private")
class AddLotsСontroller {
    @Autowired
    CarsRepository x;
    @PostMapping("/addlot")
    public String handleForm(@RequestParam("file") List<MultipartFile> files,
                             @ModelAttribute Cars data) {
        System.out.println("Файлы загружены: " + files.size());
        String uploadDir = "./";
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

