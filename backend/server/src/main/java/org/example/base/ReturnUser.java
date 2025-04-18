package org.example.base;

import lombok.Data;
import org.example.service.JWT.JwtDTO;

@Data
public class ReturnUser {
    String name;
    String role;
    JwtDTO tokens;
    public ReturnUser(){
        tokens = new JwtDTO();
    }


}