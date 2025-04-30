package org.example.controller;

import org.example.base.Cars;
import org.example.base.CarsRepository;
import org.example.base.DateDTO;
import org.example.service.lots.Lots;
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


