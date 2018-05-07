package com.sunjiamin.invoice.rs;

import java.util.LinkedList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.sunjiamin.invoice.model.Category;
import com.sunjiamin.invoice.model.Result;
import com.sunjiamin.invoice.repository.CategoryRepository;
import com.sunjiamin.invoice.repository.GoodRepository;
import com.sunjiamin.invoice.statistic.type.GoodCountOfCategory;

@RestController
@RequestMapping(value = "/good_statistic")
public class GoodStatisticRS {

	@Autowired
	private CategoryRepository _categoryRepository;

	@Autowired
	private GoodRepository _goodRepository;

	@RequestMapping(value = "/getGoodCountsOfCategory", method = RequestMethod.GET)
	public Result<List<GoodCountOfCategory>> getGoodCountsOfCategory() {
		List<GoodCountOfCategory> GoodCountOfCategorys = new LinkedList<GoodCountOfCategory>();
		List<Category> categorys = _categoryRepository.findAll();
		for (Category category : categorys) {
			GoodCountOfCategory goodCountOfCategory = new GoodCountOfCategory();
			goodCountOfCategory.setCategoryId(category.getId());
			goodCountOfCategory.setName(category.getName());
			goodCountOfCategory.setCount(_goodRepository.getGoodIdsByCategory(category.getId()).size());
			GoodCountOfCategorys.add(goodCountOfCategory);
		}
		return new Result<List<GoodCountOfCategory>>(200, "查询类别数量占比成功", GoodCountOfCategorys);
	}
}
