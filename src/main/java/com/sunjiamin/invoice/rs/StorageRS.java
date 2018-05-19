package com.sunjiamin.invoice.rs;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.sunjiamin.invoice.model.Result;
import com.sunjiamin.invoice.model.ShowStorage;
import com.sunjiamin.invoice.repository.StorageRepository;
import com.sunjiamin.invoice.service.StorageService;

@RequestMapping(value = "/storage")
@RestController
public class StorageRS {

	@Autowired
	private StorageService _storageService;

	@Autowired
	private StorageRepository _storageRepository;

	@RequestMapping(value = "/getAll", method = RequestMethod.GET)
	public Result<List<ShowStorage>> getAll() {
		List<ShowStorage> showStorages = _storageService.getAll();
		return new Result<List<ShowStorage>>(200, "查询全部库存成功", showStorages);
	}

	@Deprecated
	@RequestMapping(value = "/getByPage", method = RequestMethod.GET)
	public Result<Map<String, Object>> getByPage(@RequestParam int page, @RequestParam int limit) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("items", _storageService.getByPage(page, limit));
		map.put("totalCount", _storageRepository.count());
		return new Result<Map<String, Object>>(200, "分页查询成功", map);
	}
}
