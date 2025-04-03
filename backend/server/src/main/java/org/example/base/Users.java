package org.example.base;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

@Setter
@Getter
@Entity()
@Table(name = "users")
public class Users {
    @Id
    @GenericGenerator(name = "generator", strategy = "increment")
    @GeneratedValue(generator = "generator")
    private Integer id;
    @Column(name = "name")
    private String name;
    @Column(name = "password")
    private String password;
    @Column(name = "role")
    private String role;
    public Users(){}
    public Users(String name, String password, String role) {
        this.name = name;
        this.password = password;
        this.role = role;
    }
}