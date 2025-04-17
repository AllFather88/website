package org.example.base;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "cars")
public class Cars {
    @Id
    @GenericGenerator(name = "generator", strategy = "increment")
    @GeneratedValue(generator = "generator")
    private Integer id;
    @Column(name = "brand")
    private String brand;
    @Column(name = "year")
    private String year;
    @Column(name = "model")
    private String model;
    @Column(name = "path")
    private String path;
    @Column(name = "description")
    private String description;
    @Column(name = "starting_price")
    private Integer starting_price;
    @Column(name = "bid")
    private Integer bid;
    @Column(name = "highest_bidder")
    private String highest_bidder;
    @Column(name = "start")
    LocalDateTime start;
    @Column(name = "end")
    LocalDateTime end;

    public Cars(Integer bid, String year, Integer starting_price, LocalDateTime start, String path, String model, Integer id, String highest_bidder, LocalDateTime end, String description, String brand) {
        this.bid = bid;
        this.year = year;
        this.starting_price = starting_price;
        this.start = start;
        this.path = path;
        this.model = model;
        this.id = id;
        this.highest_bidder = highest_bidder;
        this.end = end;
        this.description = description;
        this.brand = brand;
    }

    public Cars(){}

}