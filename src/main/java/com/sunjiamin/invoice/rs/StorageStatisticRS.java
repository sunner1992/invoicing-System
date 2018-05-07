package com.sunjiamin.invoice.rs;

import java.util.LinkedList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.sunjiamin.invoice.model.Result;
import com.sunjiamin.invoice.repository.StorageRepository;
import com.sunjiamin.invoice.service.GoodService;
import com.sunjiamin.invoice.statistic.type.MostStorage;

@RestController
@RequestMapping(value = "/storage_statistic")
public class StorageStatisticRS {

	@Autowired
	private StorageRepository _storageRepository;

	@Autowired
	private GoodService _goodService;

	@RequestMapping(value = "/getMostStorages", method = RequestMethod.GET)
	public Result<List<MostStorage>> getMostSales() {
		List<String> goodIds = _storageRepository.getStorageIdsMostSumCount();
		List<MostStorage> mostStorages = new LinkedList<MostStorage>();
		for (String id : goodIds) {
			MostStorage tmp = new MostStorage();
			tmp.setGood_id(id);
			mostStorages.add(tmp);
		}
		// 设置总量
		for (MostStorage tmp : mostStorages) {
			tmp.setCount(_storageRepository.getSumCountByGood_id(tmp.getGood_id()));
			tmp.setShowGood(_goodService.getShowGoodById(tmp.getGood_id()));
		}
		return new Result<List<MostStorage>>(200, "查询库存量最高的商品成功", mostStorages);
	}
}
