package com.sunjiamin.invoice.rs;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.sunjiamin.invoice.model.Result;
import com.sunjiamin.invoice.model.ShowStorage;
import com.sunjiamin.invoice.service.StorageService;

@RequestMapping(value = "/storage")
@RestController
public class StorageRS {

	@Autowired
	private StorageService _storageService;

	@RequestMapping(value = "/getAll", method = RequestMethod.GET)
	public Result<List<ShowStorage>> getAll() {
		List<ShowStorage> showStorages = _storageService.getAll();
		return new Result<List<ShowStorage>>(200, "查询全部库存成功", showStorages);
	}
}
