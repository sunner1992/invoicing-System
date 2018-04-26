package com.sunjiamin.invoice.rs;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sunjiamin.invoice.model.Result;
import com.sunjiamin.invoice.model.ShowGood;
import com.sunjiamin.invoice.service.GoodService;

@RestController
@RequestMapping(value = "/good")
public class GoodRS {

	@Autowired
	private GoodService _goodService;

	@RequestMapping(method = RequestMethod.POST)
	public void add(@RequestBody ShowGood showGood) {
		_goodService.add(showGood);
	}

	@RequestMapping(method = RequestMethod.DELETE)
	public void delete(@RequestParam String id) {
		_goodService.delete(id);
	}

	@RequestMapping(method = RequestMethod.PUT)
	public void update(@RequestBody ShowGood showGood) {
		_goodService.update(showGood);
	}

	@RequestMapping(value = "/getAll", method = RequestMethod.GET)
	public Result<List<ShowGood>> getAll() {
		List<ShowGood> list = _goodService.getAll();
		return new Result<List<ShowGood>>(200, "查询全部货物成功", list);
	}
}
