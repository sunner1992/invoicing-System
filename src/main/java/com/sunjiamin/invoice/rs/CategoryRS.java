package com.sunjiamin.invoice.rs;

import java.util.List;
import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.sunjiamin.invoice.model.Category;
import com.sunjiamin.invoice.model.Result;
import com.sunjiamin.invoice.repository.CategoryRepository;

@RestController
@RequestMapping(value = "/category")
public class CategoryRS {

	private static Logger logger = LoggerFactory.getLogger(ProviderRS.class);

	@Autowired
	private CategoryRepository _categoryRepository;

	@RequestMapping(method = RequestMethod.POST)
	public void add(@RequestBody Category category) {
		_categoryRepository.save(category);
		logger.debug("添加类别-->id:" + category.getId());
	}

	@RequestMapping(method = RequestMethod.DELETE)
	public void delete(@RequestParam String id) {
		_categoryRepository.deleteById(id);
	}

	@RequestMapping(method = RequestMethod.PUT)
	public void update(@RequestBody Category category) {
		_categoryRepository.deleteById(category.getId());
		_categoryRepository.save(category);
	}

	@RequestMapping(value = "/getAll", method = RequestMethod.GET)
	public Result<List<Category>> getAll() {
		List<Category> categorys = _categoryRepository.findAll();
		return new Result<List<Category>>(200, "查询全部类型成功", categorys);
	}
}
