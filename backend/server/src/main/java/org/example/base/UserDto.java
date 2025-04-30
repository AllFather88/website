package org.example.base;

import lombok.Data;

@Data
public class UserDto {
    private String name;
    private String role;
    private String password;
    private String phone_number;
}
