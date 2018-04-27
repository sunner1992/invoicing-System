package com.sunjiamin.invoice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.sunjiamin.invoice.model.Purchase;

public interface PurchaseRepository extends JpaRepository<Purchase, Integer> {

}
