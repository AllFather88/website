package org.example.base;

import lombok.Data;
import org.example.service.JWT.JwtDTO;

import java.util.List;

@Data
public class ReturnUser {
    String name;
    String role;
    JwtDTO tokens;
    private List<Integer> saved;
    public ReturnUser(){
        tokens = new JwtDTO();
    }


}