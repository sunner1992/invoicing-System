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

import com.sunjiamin.invoice.model.DefinePrice;
import com.sunjiamin.invoice.model.Result;
import com.sunjiamin.invoice.model.ShowDefinePrice;
import com.sunjiamin.invoice.model.User;
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
	
	@Deprecated
	@RequestMapping(value = "/getByPage", method = RequestMethod.GET)
	public Result<Map<String, Object>> getByPage(@RequestParam int page, @RequestParam int limit) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("items", _definePriceService.getByPage(page, limit));
		map.put("totalCount", _definePriceRepository.count());
		return new Result<Map<String, Object>>(200, "分页查询成功", map);
	}
}
