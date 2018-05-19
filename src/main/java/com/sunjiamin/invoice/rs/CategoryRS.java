package com.sunjiamin.invoice.rs;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
	
	@Deprecated
	@RequestMapping(value = "/getByPage", method = RequestMethod.GET)
	public Result<Map<String, Object>> getByPage(@RequestParam int page, @RequestParam int limit) {
		Pageable pageable = new PageRequest(page - 1, limit);
		Page<Category> categorys = _categoryRepository.findAll(pageable);
		Map<String, Object> map = new HashMap<String, Object>();
		List<Category> cs = categorys.getContent();
		map.put("items", cs);
		map.put("totalCount", _categoryRepository.count());
		return new Result<Map<String, Object>>(200, "分页查询成功", map);
	}
}
