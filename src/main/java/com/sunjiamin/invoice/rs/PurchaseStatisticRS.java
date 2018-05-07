package com.sunjiamin.invoice.rs;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.sunjiamin.invoice.model.Result;
import com.sunjiamin.invoice.repository.PurchaseRepository;
import com.sunjiamin.invoice.service.GoodService;
import com.sunjiamin.invoice.statistic.type.MostPurchase;

@RestController
@RequestMapping(value = "/purchase_statistic")
public class PurchaseStatisticRS {

	@Autowired
	private PurchaseRepository _purchaseRepository;

	@Autowired
	private GoodService _goodService;

	@RequestMapping(value = "/getMostPurchase", method = RequestMethod.GET)
	public Result<List<MostPurchase>> getMostPurchase() {
		List<String> goodIds = _purchaseRepository.getGoodIdsOfMostSumCount();
		List<MostPurchase> mostPurchases = new ArrayList<MostPurchase>();
		for (String id : goodIds) {
			MostPurchase tmp = new MostPurchase();
			tmp.setGood_id(id);
			mostPurchases.add(tmp);
		}
		// 设置总量
		for (MostPurchase tmp : mostPurchases) {
			tmp.setCount(_purchaseRepository.getSumCountByGood_id(tmp.getGood_id()));
			tmp.setShowGood(_goodService.getShowGoodById(tmp.getGood_id()));
		}
		return new Result<List<MostPurchase>>(200, "查询采购量最高的商品成功", mostPurchases);
	}
}
