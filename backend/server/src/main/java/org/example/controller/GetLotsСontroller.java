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
    @GetMapping("/getall")
    public List<Cars> allLots(){
        List<Cars> response = x.findAll();
        return response;
    }
}
@RestController
@RequestMapping("/admin")
class AddLotsСontroller {
    @Autowired
    CarsRepository x;
    @PostMapping("/addlot")
    public String handleForm(@RequestParam("file") List<MultipartFile> files,
                             @ModelAttribute Cars data) {
        System.out.println("Файлы загружены: " + files.size());
        String uploadDir = "./src/main/resources/";
        try {
            data = x.save(data);
            String uniqueDir = uploadDir +  data.getId() + "/";
            Files.createDirectories(Paths.get(uniqueDir));
            for (MultipartFile file : files) {
                Path path = Paths.get(uniqueDir, file.getOriginalFilename()); // Сохранение файла в новую папку
                Files.write(path, file.getBytes());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "Файл загружен!";
    }
}

