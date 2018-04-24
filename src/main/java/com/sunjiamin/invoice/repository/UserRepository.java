package com.sunjiamin.invoice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sunjiamin.invoice.model.User;

public interface UserRepository extends JpaRepository<User, String> {

}
