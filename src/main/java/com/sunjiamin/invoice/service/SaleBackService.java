package com.sunjiamin.invoice.service;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.sunjiamin.invoice.model.Good;
import com.sunjiamin.invoice.model.SaleBack;
import com.sunjiamin.invoice.model.ShowSaleBack;
import com.sunjiamin.invoice.repository.DefinePriceRepository;
import com.sunjiamin.invoice.repository.GoodRepository;
import com.sunjiamin.invoice.repository.SaleBackRepository;
import com.sunjiamin.invoice.repository.UserRepository;

@Service
public class SaleBackService {

	@Autowired
	private SaleBackRepository _saleBackRepository;

	@Autowired
	private GoodRepository _goodRepository;

	@Autowired
	private ProviderService _providerService;

	@Autowired
	private DefinePriceRepository _definePriceRepository;

	@Autowired
	private UserRepository _userRepository;

	public List<ShowSaleBack> getAll() {
		List<SaleBack> list = _saleBackRepository.findAll();
		List<ShowSaleBack> showSales = new ArrayList<ShowSaleBack>();
		for (SaleBack saleBack : list) {
			showSales.add(convertToShowSaleBack(saleBack));
		}
		return showSales;
	}

	public ShowSaleBack convertToShowSaleBack(SaleBack saleBack) {
		ShowSaleBack showSaleBack = new ShowSaleBack();
		Good good = _goodRepository.findById(saleBack.getGoodId()).get();
		showSaleBack.setCount(saleBack.getCount());
		showSaleBack.setCreater(good.getCreater());
		showSaleBack.setDefinePrice(_definePriceRepository.findById(saleBack.getGoodId()).get().getSalePrice());
		showSaleBack.setGoodId(saleBack.getGoodId());
		showSaleBack.setGoodName(good.getName());
		showSaleBack.setId(saleBack.getId());
		showSaleBack.setProvider(_providerService.getProviderNameByGoodId(saleBack.getGoodId()));
		showSaleBack.setSaleman(_userRepository.findById(saleBack.getSalemanId()).get().getName());
		showSaleBack.setTime(saleBack.getTime());
		showSaleBack.setSalemanId(saleBack.getSalemanId());
		return showSaleBack;
	}
}
