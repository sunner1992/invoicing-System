package com.sunjiamin.invoice.service;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.sunjiamin.invoice.model.Good;
import com.sunjiamin.invoice.model.Sale;
import com.sunjiamin.invoice.model.ShowSale;
import com.sunjiamin.invoice.repository.GoodRepository;
import com.sunjiamin.invoice.repository.SaleRepository;
import com.sunjiamin.invoice.repository.UserRepository;

@Service
public class SaleService {

	@Autowired
	private SaleRepository _saleRepository;

	@Autowired
	private GoodRepository _goodRepository;

	@Autowired
	private ProviderService _providerService;

	@Autowired
	private UserRepository _userRepository;

	public List<ShowSale> getAll() {
		List<Sale> list = _saleRepository.findAll();
		List<ShowSale> showSales = new ArrayList<ShowSale>();
		for (Sale sale : list) {
			showSales.add(convertToShowSale(sale));
		}
		return showSales;
	}

	@Deprecated
	public List<ShowSale> getByPage(int page, int limit) {
		Pageable pageable = new PageRequest(page - 1, limit);
		List<Sale> list = _saleRepository.findAll(pageable).getContent();
		List<ShowSale> showSales = new ArrayList<ShowSale>();
		for (Sale sale : list) {
			showSales.add(convertToShowSale(sale));
		}
		return showSales;
	}

	public ShowSale convertToShowSale(Sale sale) {
		ShowSale showSale = new ShowSale();
		Good good = _goodRepository.findById(sale.getGoodId()).get();
		showSale.setCount(sale.getCount());
		showSale.setCreater(good.getCreater());
		showSale.setDefinePrice(sale.getPrice());
		showSale.setGoodId(sale.getGoodId());
		showSale.setGoodName(good.getName());
		showSale.setId(sale.getId());
		showSale.setProvider(_providerService.getProviderNameByGoodId(sale.getGoodId()));
		showSale.setSaleman(_userRepository.findById(sale.getSalemanId()).get().getName());
		showSale.setTime(sale.getTime());
		showSale.setSalemanId(sale.getSalemanId());
		return showSale;
	}
}
