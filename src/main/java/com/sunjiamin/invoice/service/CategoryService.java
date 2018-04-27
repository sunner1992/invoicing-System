package com.sunjiamin.invoice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sunjiamin.invoice.model.Category;
import com.sunjiamin.invoice.model.Good;
import com.sunjiamin.invoice.repository.CategoryRepository;
import com.sunjiamin.invoice.repository.GoodRepository;

@Service
public class CategoryService {

	@Autowired
	private CategoryRepository _categoryRepository;

	@Autowired
	private GoodRepository _goodRepository;

	public String getCategoryNameByGoodId(String goodId) {
		Good good = _goodRepository.findById(goodId).get();
		Category category = _categoryRepository.findById(good.getCategoryId()).get();
		return category.getName();
	}
}
