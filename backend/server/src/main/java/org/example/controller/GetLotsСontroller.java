package org.example.controller;

import org.example.base.Cars;
import org.example.base.CarsRepository;
import org.example.base.DateDTO;
import org.example.service.lots.Lots;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.List;

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
    @PostMapping("/dellot")
    public String del(@RequestBody Integer id) {
        lots.delLot(id);
        return "Лот "+id+ " удaлён";
    }
    @PostMapping("/start")
    public String updateStart(@RequestBody DateDTO newDate) {
        System.out.println(newDate.toString());
        lots.updateStartDate(newDate);
        return "Лот"+newDate.getId()+ "обновлён";
    }
    @PostMapping("/end")
    public String updateEnd(@RequestBody DateDTO newDate) {
        lots.updateEndDate(newDate);
        return "Лот"+newDate.getId()+ "обновлён";
    }


}


