package com.sunjiamin.invoice.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.sunjiamin.invoice.model.Storage;

public interface StorageRepository extends JpaRepository<Storage, String> {
	
	@Query(value = "select good_id from storage group by good_id order by sum(count) desc limit 0,10", nativeQuery = true)
	List<String> getStorageIdsMostSumCount();

	@Query(value = "select sum(count) from storage where good_id = ?1", nativeQuery = true)
	int getSumCountByGood_id(String good_id);
}
