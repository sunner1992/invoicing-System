package com.sunjiamin.invoice.rs;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.sunjiamin.invoice.model.Provider;
import com.sunjiamin.invoice.model.Result;
import com.sunjiamin.invoice.repository.ProviderRepository;

@RestController
@RequestMapping(value = "/provider")
public class ProviderRS {

	private static Logger logger = LoggerFactory.getLogger(ProviderRS.class);

	@Autowired
	private ProviderRepository _providerRepository;

	@RequestMapping(method = RequestMethod.POST)
	public void add(@RequestBody Provider provider) {
		_providerRepository.save(provider);
		logger.debug("增加供货商-->id:" + provider.getId());
	}

	@RequestMapping(method = RequestMethod.DELETE)
	public void delete(@RequestParam String id) {
		_providerRepository.deleteById(id);
		logger.debug("删除供应商-->id:" + id);
	}

	@RequestMapping(method = RequestMethod.PUT)
	public void update(@RequestBody @Valid Provider provider) {
		_providerRepository.deleteById(provider.getId());
		_providerRepository.save(provider);
		logger.debug("修改供应商-->id:" + provider.getId());
	}

	@RequestMapping(method = RequestMethod.GET)
	public Result<Provider> get(@RequestParam String id) {
		Provider p = _providerRepository.findById(id).get();
		return new Result<Provider>(200, "查询供应商成功", p);
	}

	@RequestMapping(value = "/getAll", method = RequestMethod.GET)
	public Result<List<Provider>> getAll() {
		List<Provider> providers = _providerRepository.findAll();
		return new Result<List<Provider>>(200, "查询全部供应商成功", providers);
	}
	
	@Deprecated
	@RequestMapping(value = "/getByPage", method = RequestMethod.GET)
	public Result<Map<String, Object>> getByPage(@RequestParam int page, @RequestParam int limit) {
		Pageable pageable = new PageRequest(page - 1, limit);
		Page<Provider> Providers = _providerRepository.findAll(pageable);
		Map<String, Object> map = new HashMap<String, Object>();
		List<Provider> ps = Providers.getContent();
		map.put("items", ps);
		map.put("totalCount", _providerRepository.count());
		return new Result<Map<String, Object>>(200, "分页查询成功", map);
	}
}
