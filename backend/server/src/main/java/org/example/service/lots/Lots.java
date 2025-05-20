package org.example.service.lots;

import io.jsonwebtoken.Claims;
import org.example.base.*;
import org.example.service.JWT.JwtService;
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
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

@Service
public class Lots {
    @Autowired
    CarsRepository x;
    @Autowired
    UsersRepository users;

    public String addLot(List<MultipartFile> files,Cars data){
        System.out.println("Файлы загружены: " + files.size());
        String uploadDir = "./src/main/resources/static/";
        data.setBid(data.getStarting_price());
        data.setHighest_bidder("noname");
        System.out.println(data.toString());
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

        if (lot.getStart() != null && lot.getStart().isBefore(newDate.getDate()) && !lot.getEnd().equals(newDate.getDate())) {
            lot.setEnd(newDate.getDate());
            x.save(lot);
        }
    }
    public void updateStartDate(DateDTO newDate) {
        Cars lot = x.findById(newDate.getId()).orElseThrow();
        if (lot.getEnd() != null && lot.getEnd().isAfter(newDate.getDate()) && !lot.getStart().equals(newDate.getDate())) {
            lot.setStart(newDate.getDate());
            x.save(lot);
        }
    }

    public ResponseEntity<byte[]> getImage(Integer id,String name){
        Path path = Paths.get("./src/main/resources/static/"+id+"/"+name);
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
    public User user(Integer id) {
        Cars lot = x.findById(id).orElseThrow();
        if(lot == null){
            return null;
        }
        User us = users.findByName(lot.getHighest_bidder());
        if(us == null){
            return null;
        }
        us.setPassword("");
        return us;
    }
    public String bid(Integer id, Integer bid,String user) {
        Cars lot = x.findById(id).orElseThrow();
        System.out.println(user);
        if(lot == null){
            return "Лот не найден";
        }
        if (bid > lot.getBid() && !lot.getHighest_bidder().equals(user)){
            lot.setHighest_bidder(user);
            lot.setBid(bid);
            x.save(lot);
            return "Лот обновлён";
        }
        return "Лот не обновлён";
    }


}

