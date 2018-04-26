package com.sunjiamin.invoice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sunjiamin.invoice.model.Provider;

public interface ProviderRepository extends JpaRepository<Provider, String> {

}
