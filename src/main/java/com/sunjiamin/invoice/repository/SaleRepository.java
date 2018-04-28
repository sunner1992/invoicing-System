package com.sunjiamin.invoice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.sunjiamin.invoice.model.Sale;

public interface SaleRepository extends JpaRepository<Sale, Integer> {

}
