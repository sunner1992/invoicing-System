package com.sunjiamin.invoice.rs;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sunjiamin.invoice.model.Result;
import com.sunjiamin.invoice.model.Sale;
import com.sunjiamin.invoice.model.ShowSale;
import com.sunjiamin.invoice.repository.SaleRepository;
import com.sunjiamin.invoice.service.SaleService;

@RestController
@RequestMapping(value = "/sale")
public class SaleRS {

	@Autowired
	private SaleRepository _saleRepository;

	@Autowired
	private SaleService _saleService;

	//TODO 联动库存的操作
	
	@RequestMapping(method = RequestMethod.POST)
	public void add(@RequestBody Sale sale) {
		_saleRepository.save(sale);
	}

	@RequestMapping(method = RequestMethod.DELETE)
	public void delete(@RequestParam int id) {
		_saleRepository.deleteById(id);
	}

	@RequestMapping(method = RequestMethod.PUT)
	public void update(@RequestBody Sale sale) {
		_saleRepository.deleteById(sale.getId());
		_saleRepository.save(sale);
	}

	@RequestMapping(value = "/getAll", method = RequestMethod.GET)
	public Result<List<ShowSale>> getAll() {
		List<ShowSale> data = _saleService.getAll();
		return new Result<List<ShowSale>>(200, "查询全部销售记录成功", data);
	}
}
