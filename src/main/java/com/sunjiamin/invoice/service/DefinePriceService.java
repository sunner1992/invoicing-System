package com.sunjiamin.invoice.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sunjiamin.invoice.model.DefinePrice;
import com.sunjiamin.invoice.model.Good;
import com.sunjiamin.invoice.model.ShowDefinePrice;
import com.sunjiamin.invoice.repository.DefinePriceRepository;
import com.sunjiamin.invoice.repository.GoodRepository;

@Service
public class DefinePriceService {

	@Autowired
	private DefinePriceRepository _definePriceRepository;

	@Autowired
	private GoodRepository _goodRepository;

	@Autowired
	private ProviderService _providerService;

	public List<ShowDefinePrice> getAll() {
		List<DefinePrice> list = _definePriceRepository.findAll();
		List<ShowDefinePrice> showDefinePrices = new ArrayList<ShowDefinePrice>();
		for (DefinePrice definePrice : list) {
			showDefinePrices.add(convertToShowDefinePrice(definePrice));
		}
		return showDefinePrices;
	}

	public ShowDefinePrice convertToShowDefinePrice(DefinePrice definePrice) {
		ShowDefinePrice showDefinePrice = new ShowDefinePrice();
		Good good = _goodRepository.findById(definePrice.getGoodId()).get();
		showDefinePrice.setCreater(good.getCreater());
		showDefinePrice.setGoodId(definePrice.getGoodId());
		showDefinePrice.setGoodName(good.getName());
		showDefinePrice.setProvider(_providerService.getProviderNameByGoodId(good.getId()));
		showDefinePrice.setSalePrice(definePrice.getSalePrice());
		return showDefinePrice;
	}
}
