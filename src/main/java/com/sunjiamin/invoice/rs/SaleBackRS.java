package com.sunjiamin.invoice.rs;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.sunjiamin.invoice.model.Result;
import com.sunjiamin.invoice.model.SaleBack;
import com.sunjiamin.invoice.model.ShowSaleBack;
import com.sunjiamin.invoice.repository.SaleBackRepository;
import com.sunjiamin.invoice.service.SaleBackService;
import com.sunjiamin.invoice.service.StorageService;

@RestController
@RequestMapping(value = "/saleBack")
public class SaleBackRS {

	// 本部分依旧缺少对于库存的操作
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

}
