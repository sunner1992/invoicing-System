package com.sunjiamin.invoice.rs;

import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.sunjiamin.invoice.model.Result;
import com.sunjiamin.invoice.repository.SaleRepository;
import com.sunjiamin.invoice.service.GoodService;
import com.sunjiamin.invoice.statistic.type.MostSale;

@RestController
@RequestMapping(value = "/sale_statistic")
public class SaleStatisticRS {

	@Autowired
	private SaleRepository _saleRepository;

	@Autowired
	private GoodService _goodService;

	@RequestMapping(value = "/getMostSales", method = RequestMethod.GET)
	public Result<List<MostSale>> getMostSales() {
		List<String> goodIds = _saleRepository.getGoodIdsOfMostSumCount();
		List<MostSale> mostSales = new LinkedList<MostSale>();
		for (String id : goodIds) {
			MostSale tmp = new MostSale();
			tmp.setGood_id(id);
			mostSales.add(tmp);
		}
		// 设置总量
		for (MostSale tmp : mostSales) {
			tmp.setCount(_saleRepository.getSumCountByGood_id(tmp.getGood_id()));
			tmp.setShowGood(_goodService.getShowGoodById(tmp.getGood_id()));
		}
		return new Result<List<MostSale>>(200, "查询销售量最高的商品成功", mostSales);
	}
}
