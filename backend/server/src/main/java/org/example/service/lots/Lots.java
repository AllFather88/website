package org.example.service.lots;

import org.example.base.Cars;
import org.example.base.CarsRepository;
import org.example.base.DateDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class Lots {
    @Autowired
    CarsRepository x;
    public String addLot(List<MultipartFile> files,Cars data){
        System.out.println("Файлы загружены: " + files.size());
        String uploadDir = "./src/main/resources/";
        try {
            data = x.save(data);
            String uniqueDir = uploadDir +  data.getId() + "/";
            Files.createDirectories(Paths.get(uniqueDir));
            for (MultipartFile file : files) {
                Path path = Paths.get(uniqueDir, file.getOriginalFilename());
                Files.write(path, file.getBytes());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "Файл загружен!";
    }
    public void delLot(Integer id){
        x.deleteById(id);
    }
    public void updateEndDate(DateDTO newDate) {
        Cars lot = x.findById(newDate.getId()).orElseThrow();
        lot.setEnd(newDate.getDate());
        x.save(lot);
    }
    public void updateStartDate(DateDTO newDate){
        Cars lot = x.findById(newDate.getId()).orElseThrow();
        if(lot.getEnd().isBefore(newDate.getDate())){
            lot.setStart(newDate.getDate());
        }
        x.save(lot);
    }

}
