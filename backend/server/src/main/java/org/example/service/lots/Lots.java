package org.example.service.lots;

import org.example.base.Cars;
import org.example.base.CarsRepository;
import org.example.base.DateDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.File;
import java.io.IOException;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class Lots {
    @Autowired
    CarsRepository x;
    public String addLot(List<MultipartFile> files,Cars data){
        System.out.println("Файлы загружены: " + files.size());
        String uploadDir = "./src/main/resources/static/";
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

    public ResponseEntity<byte[]> getImage(Integer id,String name){
        Path path = Paths.get("src/main/resources/static/"+id+"/"+name);
        byte[] imageBytes = null;
        try {
            imageBytes = Files.readAllBytes(path);
            String contentType = Files.probeContentType(path);
            if (contentType == null) {
                contentType = "application/octet-stream"; // Если тип неизвестен
            }
        }catch (IOException e){
            System.out.println(e.toString());
            return ResponseEntity.status(500).body(imageBytes);
        }
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(imageBytes);
    }
    public String[] getImages(Integer id){
        File folder = new File("./src/main/resources/static/"+id+"/");
        if(folder == null){
            return null;
        }
        String[] fileNames = folder.list();
        return fileNames;
    }
    public Cars getLot(Integer id){
        return x.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Лот не найден"));
    }
    public ResponseEntity<byte[]> getFirstImage(Integer id){
        Path folderPath = Paths.get("./src/main/resources/static/" + id + "/");

        try (DirectoryStream<Path> stream = Files.newDirectoryStream(folderPath, "main.*")) {
            Path firstFile = null;
            for (Path path : stream) { // Без использования итератора
                firstFile = path;
                break; // Берём первый найденный и выходим из цикла
            }

            if (firstFile != null) {
                byte[] imageBytes = Files.readAllBytes(firstFile);
                String contentType = Files.probeContentType(firstFile);

                return ResponseEntity.ok()
                        .contentType(MediaType.parseMediaType(contentType != null ? contentType : "application/octet-stream"))
                        .body(imageBytes);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new byte[0]);
            }
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new byte[0]);
        }


    }


}
