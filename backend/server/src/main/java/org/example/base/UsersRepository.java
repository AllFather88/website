package org.example.base;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UsersRepository extends JpaRepository<User,Integer>{
    List<User> findUsersByName(String x);
    User findByName(String x);
}

