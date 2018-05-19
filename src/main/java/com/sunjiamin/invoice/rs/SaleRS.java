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

import com.sunjiamin.invoice.model.Result;
import com.sunjiamin.invoice.model.Sale;
import com.sunjiamin.invoice.model.ShowSale;
import com.sunjiamin.invoice.repository.DefinePriceRepository;
import com.sunjiamin.invoice.repository.SaleRepository;
import com.sunjiamin.invoice.service.SaleService;
import com.sunjiamin.invoice.service.StorageService;

@RestController
@RequestMapping(value = "/sale")
public class SaleRS {

	@Autowired
	private SaleRepository _saleRepository;

	@Autowired
	private SaleService _saleService;

	@Autowired
	private StorageService _storageService;
	
	@Autowired
	private DefinePriceRepository _definePriceRepository;

	@RequestMapping(method = RequestMethod.POST)
	public void add(@RequestBody Sale sale) {
		sale.setPrice(_definePriceRepository.findById(sale.getGoodId()).get().getSalePrice());
		_saleRepository.save(sale);
		_storageService.subtract(sale.getGoodId(), sale.getCount());
	}

	@RequestMapping(method = RequestMethod.PUT)
	public void update(@RequestBody Sale sale) {
		int oldCount = _saleRepository.findById(sale.getId()).get().getCount();
		int newCount = sale.getCount();
		sale.setPrice(_saleRepository.findById(sale.getId()).get().getPrice());
		_saleRepository.deleteById(sale.getId());
		_saleRepository.save(sale);
		if (newCount > oldCount) {
			_storageService.subtract(sale.getGoodId(), newCount - oldCount);
		} else {
			_storageService.add(sale.getGoodId(), oldCount - newCount);
		}
	}

	@RequestMapping(value = "/getAll", method = RequestMethod.GET)
	public Result<List<ShowSale>> getAll() {
		List<ShowSale> data = _saleService.getAll();
		return new Result<List<ShowSale>>(200, "查询全部销售记录成功", data);
	}
	
	@Deprecated
	@RequestMapping(value = "/getByPage", method = RequestMethod.GET)
	public Result<Map<String, Object>> getByPage(@RequestParam int page, @RequestParam int limit) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("items", _saleService.getByPage(page, limit));
		map.put("totalCount", _saleRepository.count());
		return new Result<Map<String, Object>>(200, "分页查询成功", map);
	}
}
