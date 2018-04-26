package com.sunjiamin.invoice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sunjiamin.invoice.model.Good;

public interface GoodRepository extends JpaRepository<Good, String> {

}
