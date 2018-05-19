package com.sunjiamin.invoice.rs;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.sunjiamin.invoice.model.Result;
import com.sunjiamin.invoice.model.SaleBack;
import com.sunjiamin.invoice.model.ShowSaleBack;
import com.sunjiamin.invoice.model.User;
import com.sunjiamin.invoice.repository.SaleBackRepository;
import com.sunjiamin.invoice.service.SaleBackService;
import com.sunjiamin.invoice.service.StorageService;

@RestController
@RequestMapping(value = "/saleBack")
public class SaleBackRS {

	@Autowired
	private SaleBackService _saleBackService;

	@Autowired
	private SaleBackRepository _saleBackRepository;

	@Autowired
	private StorageService _storageService;

	@RequestMapping(method = RequestMethod.POST)
	public void add(@RequestBody SaleBack saleBack) {
		_saleBackRepository.save(saleBack);
		int count = saleBack.getCount();
		_storageService.add(saleBack.getGoodId(), count);
	}

	@RequestMapping(method = RequestMethod.PUT)
	public void update(@RequestBody SaleBack saleBack) {
		int oldCount = _saleBackRepository.findById(saleBack.getId()).get().getCount();
		int newCount = saleBack.getCount();
		_saleBackRepository.deleteById(saleBack.getId());
		_saleBackRepository.save(saleBack);
		if (newCount > oldCount) {
			_storageService.add(saleBack.getGoodId(), newCount - oldCount);
		} else {
			_storageService.subtract(saleBack.getGoodId(), oldCount - newCount);
		}
	}

	@RequestMapping(value = "/getAll", method = RequestMethod.GET)
	public Result<List<ShowSaleBack>> getAll() {
		List<ShowSaleBack> list = _saleBackService.getAll();
		return new Result<List<ShowSaleBack>>(200, "获取全部退货信息成功", list);
	}

	@Deprecated
	@RequestMapping(value = "/getByPage", method = RequestMethod.GET)
	public Result<Map<String, Object>> getByPage(@RequestParam int page, @RequestParam int limit) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("items", _saleBackService.getByPage(page, limit));
		map.put("totalCount", _saleBackRepository.count());
		return new Result<Map<String, Object>>(200, "分页查询成功", map);
	}
}
