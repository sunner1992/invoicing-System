package com.sunjiamin.invoice.rs;

import java.util.List;

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

@RestController
@RequestMapping(value = "/purchaseBack")
public class PurchaseBackRS {

	@Autowired
	private PurchaseBackService _purchaseBackService;

	@Autowired
	private PurchaseBackRepository _purchaseBackRepository;

	@RequestMapping(method = RequestMethod.POST)
	public void add(@RequestBody PurchaseBack PurchaseBack) {
		// TODO 去更改库存
		_purchaseBackRepository.save(PurchaseBack);
	}

	@RequestMapping(method = RequestMethod.DELETE)
	public void delete(@RequestParam int id) {
		_purchaseBackRepository.deleteById(id);
	}

	@RequestMapping(method = RequestMethod.PUT)
	public void update(@RequestBody PurchaseBack PurchaseBack) {
		// TODO 更改库存
		_purchaseBackRepository.deleteById(PurchaseBack.getId());
		_purchaseBackRepository.save(PurchaseBack);
	}

	@RequestMapping(value = "/getAll", method = RequestMethod.GET)
	public Result<List<ShowPurchaseBack>> getAll() {
		List<ShowPurchaseBack> list = _purchaseBackService.getAll();
		return new Result<List<ShowPurchaseBack>>(200, "查询全部退货成功", list);
	}
}
