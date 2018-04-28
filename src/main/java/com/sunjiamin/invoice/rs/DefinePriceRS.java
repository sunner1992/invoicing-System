package com.sunjiamin.invoice.rs;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sunjiamin.invoice.model.DefinePrice;
import com.sunjiamin.invoice.model.Result;
import com.sunjiamin.invoice.model.ShowDefinePrice;
import com.sunjiamin.invoice.repository.DefinePriceRepository;
import com.sunjiamin.invoice.service.DefinePriceService;

@RestController
@RequestMapping(value = "/definePrice")
public class DefinePriceRS {

	@Autowired
	private DefinePriceRepository _definePriceRepository;
	@Autowired
	private DefinePriceService _definePriceService;

	@RequestMapping(method = RequestMethod.POST)
	public void add(@RequestBody DefinePrice definePrice) {
		_definePriceRepository.save(definePrice);
	}

	@RequestMapping(method = RequestMethod.DELETE)
	public void delete(@RequestParam String id) {
		_definePriceRepository.deleteById(id);
	}

	@RequestMapping(method = RequestMethod.PUT)
	public void update(@RequestBody DefinePrice definePrice) {
		_definePriceRepository.deleteById(definePrice.getGoodId());
		_definePriceRepository.save(definePrice);
	}

	@RequestMapping(value = "/getAll", method = RequestMethod.GET)
	public Result<List<ShowDefinePrice>> getAll() {
		List<ShowDefinePrice> list = _definePriceService.getAll();
		return new Result<List<ShowDefinePrice>>(200, "查询全部定价成功", list);
	}
}
