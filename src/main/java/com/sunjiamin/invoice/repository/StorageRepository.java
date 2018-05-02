package com.sunjiamin.invoice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sunjiamin.invoice.model.Storage;

public interface StorageRepository extends JpaRepository<Storage, String> {

}
