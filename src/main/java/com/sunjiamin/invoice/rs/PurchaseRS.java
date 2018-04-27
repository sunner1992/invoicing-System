package com.sunjiamin.invoice.rs;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sunjiamin.invoice.model.Purchase;
import com.sunjiamin.invoice.model.Result;
import com.sunjiamin.invoice.model.ShowPurchase;
import com.sunjiamin.invoice.repository.PurchaseRepository;
import com.sunjiamin.invoice.service.PruchaseService;

@RestController
@RequestMapping(value = "/purchase")
public class PurchaseRS {

	private static Logger logger = LoggerFactory.getLogger(ProviderRS.class);

	@Autowired
	private PurchaseRepository _purchaseRepository;

	@Autowired
	private PruchaseService _pruchaseService;

	@RequestMapping(method = RequestMethod.POST)
	public void add(@RequestBody Purchase purchase) {
		_purchaseRepository.save(purchase);
		//TODO　向库存添加
	}

	@RequestMapping(method = RequestMethod.DELETE)
	public void delete(@RequestParam int id) {
		_purchaseRepository.deleteById(id);
	}

	@RequestMapping(method = RequestMethod.PUT)
	public void update(@RequestBody Purchase purchase) {
		//修改的时候要生成记录的，防止偷改
		_purchaseRepository.deleteById(purchase.getId());
		_purchaseRepository.save(purchase);
	}

	@RequestMapping(value = "/getAll", method = RequestMethod.GET)
	public Result<List<ShowPurchase>> getAll() {
		List<ShowPurchase> list = _pruchaseService.getAll();
		return new Result<List<ShowPurchase>>(200, "查询全部采购信息成功", list);
	}
}
