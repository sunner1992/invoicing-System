package com.sunjiamin.invoice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sunjiamin.invoice.model.Category;

public interface CategoryRepository extends JpaRepository<Category, String> {

}
