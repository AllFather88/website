package org.example.base;

import lombok.Data;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;


@Data
public class CarsWithFiles extends Cars{
    private List<MultipartFile> files;
    public Cars getCar(){
        return new Cars(getBid(),getYear(),getStarting_price(),getStart(),getPath(),getModel(),getId(),getHighest_bidder(),getEnd(),getDescription(),getBrand());
    }
}
