package com.sunjiamin.invoice.rs;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sunjiamin.invoice.model.PurchaseBack;
import com.sunjiamin.invoice.model.Result;
import com.sunjiamin.invoice.model.ShowPurchaseBack;
import com.sunjiamin.invoice.repository.PurchaseBackRepository;
import com.sunjiamin.invoice.service.PurchaseBackService;
import com.sunjiamin.invoice.service.StorageService;

@RestController
@RequestMapping(value = "/purchaseBack")
public class PurchaseBackRS {

	@Autowired
	private PurchaseBackService _purchaseBackService;

	@Autowired
	private PurchaseBackRepository _purchaseBackRepository;

	@Autowired
	private StorageService _storageService;

	@RequestMapping(method = RequestMethod.POST)
	public void add(@RequestBody PurchaseBack purchaseBack) {
		_purchaseBackRepository.save(purchaseBack);
		_storageService.subtract(purchaseBack.getGoodId(), purchaseBack.getCount());
	}

	@RequestMapping(method = RequestMethod.PUT)
	public void update(@RequestBody PurchaseBack PurchaseBack) {
		int oldCount = _purchaseBackRepository.findById(PurchaseBack.getId()).get().getCount();
		int newCount = PurchaseBack.getCount();
		_purchaseBackRepository.deleteById(PurchaseBack.getId());
		_purchaseBackRepository.save(PurchaseBack);
		if (newCount > oldCount) {
			_storageService.add(PurchaseBack.getGoodId(), newCount - oldCount);
		} else {
			_storageService.subtract(PurchaseBack.getGoodId(), oldCount - newCount);
		}
	}

	@RequestMapping(value = "/getAll", method = RequestMethod.GET)
	public Result<List<ShowPurchaseBack>> getAll() {
		List<ShowPurchaseBack> list = _purchaseBackService.getAll();
		return new Result<List<ShowPurchaseBack>>(200, "查询全部退货成功", list);
	}

	@Deprecated
	@RequestMapping(value = "/getByPage", method = RequestMethod.GET)
	public Result<Map<String, Object>> getByPage(@RequestParam int page, @RequestParam int limit) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("items", _purchaseBackService.getByPage(page, limit));
		map.put("totalCount", _purchaseBackRepository.count());
		return new Result<Map<String, Object>>(200, "分页查询成功", map);
	}
}
