package org.example.controller;

import io.jsonwebtoken.Claims;
import org.example.base.*;
import org.example.service.JWT.JwtService;
import org.example.service.lots.Lots;
import org.example.service.lots.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/private")
class LotsAndUserController{
    @Autowired
    Lots lots;
    @Autowired
    UserService userserv;
    @PostMapping("/bid/{id}/{bid}")
    public String Bid(@PathVariable Integer id,@PathVariable Integer bid,@RequestHeader("Authorization") String token){
        token = token.substring(6);
        Claims cl = JwtService.extractClaims(token);
        String name = cl.getSubject();
        return lots.bid(id,bid,name);
    }
    @PostMapping("/newnumber")
    public void newNumber(@RequestBody NumberDTO number,@RequestHeader("Authorization") String Token){
        userserv.newNumber(number,Token);
    }
    @PostMapping("/newemail")
    public void newEmail(@RequestBody EmailDTO email,@RequestHeader("Authorization") String Token){
        userserv.newEmail(email,Token);
    }
    @GetMapping("/im")
    public User Im(@RequestHeader("Authorization") String Token){
       return userserv.Im(Token);
    }
    @PostMapping("/save/{id}")
    public boolean Save(@PathVariable Integer id,@RequestHeader("Authorization") String Token){
       return userserv.save(id,Token);
    }

}
@RestController
@RequestMapping("/public")
public class GetLotsСontroller {
    @Autowired
    Lots lots;
    @Autowired
    CarsRepository repository;
    @GetMapping("/getall")
    public List<Cars> allLots(){
        List<Cars> response = repository.findAll();
        return response;
    }
    @GetMapping("/image/{id}/{name}")
    public ResponseEntity<byte[]> getImage(@PathVariable String name,@PathVariable Integer id){
       return lots.getImage(id,name);
    }
    @GetMapping("/image/{id}")
    public ResponseEntity<byte[]> getFirst(@PathVariable Integer id){
        return lots.getFirstImage(id);
    }
    @GetMapping("/images/{id}")
    public List<String> getNames(@PathVariable Integer id){
        System.out.println(id);
        String[] x =lots.getImages(id);
        return Arrays.stream(x).toList();
    }
    @GetMapping("/lot/{id}")
    public Cars  getLot(@PathVariable Integer id){
        return lots.getLot(id);
    }
    @GetMapping("/lot/{id}/stream")
    public SseEmitter streamEvents(@PathVariable Integer id) {
        SseEmitter emitter = new SseEmitter();
        Executors.newSingleThreadScheduledExecutor().scheduleAtFixedRate(() -> {
            try {
                emitter.send(lots.getLot(id));
            } catch (IOException e) {
                emitter.complete();
            }
        }, 0, 3, TimeUnit.SECONDS);
        return emitter;
    }
}
@RestController
@RequestMapping("/admin")
class AddLotsСontroller {
    @Autowired
    Lots lots;
    @PostMapping("/addlot")
    public String add(@RequestParam("file") List<MultipartFile> files,
                             @ModelAttribute Cars data) {
       return lots.addLot(files,data);
    }
    @GetMapping("/user/{id}")
    public User userNumber(@PathVariable Integer id) {
        return lots.user(id);
    }
    @PostMapping("/dellot")
    public String del(@RequestBody Integer id) {
        lots.delLot(id);
        return "Лот "+id+ " удaлён";
    }
    @PostMapping("/start")
    public String updateStart(@RequestBody DateDTO newDate) {
        lots.updateStartDate(newDate);
        return "Лот "+newDate.getId()+ " обновлён";
    }
    @PostMapping("/end")
    public String updateEnd(@RequestBody DateDTO newDate) {
        lots.updateEndDate(newDate);
        return "Лот "+newDate.getId()+ " обновлён";
    }
}


