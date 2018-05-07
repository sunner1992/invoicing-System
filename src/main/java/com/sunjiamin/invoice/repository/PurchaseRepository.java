package com.sunjiamin.invoice.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.sunjiamin.invoice.model.Purchase;

public interface PurchaseRepository extends JpaRepository<Purchase, Integer> {
	
	@Query(value = "select good_id from purchase group by good_id order by sum(count) desc limit 0,10", nativeQuery = true)
	List<String> getGoodIdsOfMostSumCount();

	@Query(value = "select sum(count) from purchase where good_id = ?1", nativeQuery = true)
	int getSumCountByGood_id(String good_id);
}
