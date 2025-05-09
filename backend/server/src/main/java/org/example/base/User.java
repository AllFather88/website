package org.example.base;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import java.util.List;

@Data
@Entity
@Table(name = "users")
public class User {
    @Id
    @GenericGenerator(name = "generator", strategy = "increment")
    @GeneratedValue(generator = "generator")
    private Integer id;
    @Column(name = "name")
    private String name;
    @Column(name = "phone_number")
    private String phone_number;
    @Column(name = "password")
    private String password;
    @Column(name = "role")
    private String role;
    @Column(name = "email")
    private String email;
    @Column(name = "saved")
    private List<Integer> saved;
    public User(){}
    public User(String name, String password, String role) {
        this.name = name;
        this.password = password;
        this.role = role;
    }
    public void setUser(UserDto a){
        name = a.getName();
        role = a.getRole();
        password = a.getPassword();
    }
}