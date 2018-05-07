package com.sunjiamin.invoice.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.sunjiamin.invoice.model.Good;

public interface GoodRepository extends JpaRepository<Good, String> {

	@Query(value = "select id from good where category_id = ?1", nativeQuery = true)
	List<String> getGoodIdsByCategory(String categoryId);
}
