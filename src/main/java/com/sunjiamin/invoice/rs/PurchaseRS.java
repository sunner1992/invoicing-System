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

import com.sunjiamin.invoice.model.Purchase;
import com.sunjiamin.invoice.model.Result;
import com.sunjiamin.invoice.model.ShowPurchase;
import com.sunjiamin.invoice.model.User;
import com.sunjiamin.invoice.repository.PurchaseRepository;
import com.sunjiamin.invoice.service.PruchaseService;
import com.sunjiamin.invoice.service.StorageService;

@RestController
@RequestMapping(value = "/purchase")
public class PurchaseRS {

	private static Logger logger = LoggerFactory.getLogger(ProviderRS.class);

	@Autowired
	private PurchaseRepository _purchaseRepository;

	@Autowired
	private PruchaseService _pruchaseService;

	@Autowired
	private StorageService _storageService;

	@RequestMapping(method = RequestMethod.POST)
	public void add(@RequestBody Purchase purchase) {
		_purchaseRepository.save(purchase);
		_storageService.add(purchase.getGoodId(), purchase.getCount());
	}

	@RequestMapping(method = RequestMethod.PUT)
	public void update(@RequestBody Purchase purchase) {
		int oldCount = _purchaseRepository.findById(purchase.getId()).get().getCount();
		int newCount = purchase.getCount();
		// 修改的时候要生成记录的，防止偷改
		_purchaseRepository.deleteById(purchase.getId());
		_purchaseRepository.save(purchase);
		if (newCount > oldCount) {
			_storageService.add(purchase.getGoodId(), newCount - oldCount);
		} else {
			_storageService.subtract(purchase.getGoodId(), oldCount - newCount);
		}
	}

	@RequestMapping(value = "/getAll", method = RequestMethod.GET)
	public Result<List<ShowPurchase>> getAll() {
		List<ShowPurchase> list = _pruchaseService.getAll();
		return new Result<List<ShowPurchase>>(200, "查询全部采购信息成功", list);
	}
	
	@Deprecated
	@RequestMapping(value = "/getByPage", method = RequestMethod.GET)
	public Result<Map<String, Object>> getByPage(@RequestParam int page, @RequestParam int limit) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("items", _pruchaseService.getByPage(page, limit));
		map.put("totalCount", _purchaseRepository.count());
		return new Result<Map<String, Object>>(200, "分页查询成功", map);
	}
}
