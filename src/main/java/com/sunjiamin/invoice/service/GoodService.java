package com.sunjiamin.invoice.service;

import java.util.ArrayList;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.sunjiamin.invoice.model.Good;
import com.sunjiamin.invoice.model.ShowGood;
import com.sunjiamin.invoice.repository.CategoryRepository;
import com.sunjiamin.invoice.repository.GoodRepository;
import com.sunjiamin.invoice.repository.ProviderRepository;

@Service
public class GoodService {

	private static Logger logger = LoggerFactory.getLogger(GoodService.class);

	@Autowired
	private GoodRepository _goodRepository;

	@Autowired
	private CategoryRepository _categoryRepository;

	@Autowired
	private ProviderRepository _providerRepository;

	public void add(ShowGood showGood) {
		Good good = convertShowGoodToGood(showGood);
		_goodRepository.save(good);
		logger.debug("增加货物-->id:" + good.getId());
	}

	public void delete(String id) {
		_goodRepository.deleteById(id);
		logger.debug("删除货物-->id:" + id);
	}

	public void update(ShowGood showGood) {
		_goodRepository.deleteById(showGood.getId());
		Good good = convertShowGoodToGood(showGood);
		_goodRepository.save(good);
		logger.debug("修改货物-->id:" + good.getId());
	}

	public List<ShowGood> getAll() {
		List<Good> goods = _goodRepository.findAll();
		List<ShowGood> showGoods = new ArrayList<ShowGood>();
		for (Good good : goods) {
			//更新category和provider
			String provider = _providerRepository.findById(good.getProviderId()).get().getContact();
			String category = _categoryRepository.findById(good.getCategoryId()).get().getName();
			showGoods.add(convertGoodToShowGood(good, category, provider));
		}
		return showGoods;
	}

	public Good convertShowGoodToGood(ShowGood showGood) {
		Good good = new Good();
		good.setId(showGood.getId());
		good.setName(showGood.getName());
		good.setCategoryId(showGood.getCategoryId());
		good.setProviderId(showGood.getProviderId());
		good.setCreater(showGood.getCreater());
		return good;
	}

	public ShowGood convertGoodToShowGood(Good good, String category, String provider) {
		ShowGood showGood = new ShowGood();
		showGood.setId(good.getId());
		showGood.setName(good.getName());
		showGood.setCategory(category);
		showGood.setCategoryId(good.getCategoryId());
		showGood.setCreater(good.getCreater());
		showGood.setProvider(provider);
		showGood.setProviderId(good.getProviderId());
		return showGood;
	}
}
