package com.sunjiamin.invoice.service;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.sunjiamin.invoice.model.Purchase;
import com.sunjiamin.invoice.model.ShowPurchase;
import com.sunjiamin.invoice.repository.GoodRepository;
import com.sunjiamin.invoice.repository.PurchaseRepository;
import com.sunjiamin.invoice.repository.UserRepository;

@Service
public class PruchaseService {

	@Autowired
	private PurchaseRepository _purchaseRepository;

	@Autowired
	private GoodRepository _goodRepository;

	@Autowired
	private UserRepository _userRepository;

	@Autowired
	private CategoryService _categoryService;

	@Autowired
	private ProviderService _providerService;

	public List<ShowPurchase> getAll() {
		List<Purchase> tmpPurchases = _purchaseRepository.findAll();
		List<ShowPurchase> results = new ArrayList<ShowPurchase>();
		for (Purchase purchase : tmpPurchases) {
			ShowPurchase showPurchase = convetToShowPurchase(purchase);
			results.add(showPurchase);
		}
		return results;
	}
	
	@Deprecated
	public List<ShowPurchase> getByPage(int page, int limit) {
		Pageable pageable = new PageRequest(page - 1, limit);
		List<Purchase> tmpPurchases= _purchaseRepository.findAll(pageable).getContent();
		List<ShowPurchase> results = new ArrayList<ShowPurchase>();
		for (Purchase purchase : tmpPurchases) {
			ShowPurchase showPurchase = convetToShowPurchase(purchase);
			results.add(showPurchase);
		}
		return results;
	}

	public ShowPurchase convetToShowPurchase(Purchase purchase) {
		ShowPurchase showPurchase = new ShowPurchase();
		showPurchase.setBuyer(_userRepository.findById(purchase.getBuyerId()).get().getName());
		showPurchase.setCategory(_categoryService.getCategoryNameByGoodId(purchase.getGoodId()));
		showPurchase.setCount(purchase.getCount());
		showPurchase.setPrice(purchase.getPrice());
		showPurchase.setTime(purchase.getTime());
		showPurchase.setGoodId(purchase.getGoodId());
		showPurchase.setTotalPrice(purchase.getTotalPrice());
		showPurchase.setProvider(_providerService.getProviderNameByGoodId(purchase.getGoodId()));
		showPurchase.setGoodName(_goodRepository.findById(purchase.getGoodId()).get().getName());
		showPurchase.setId(purchase.getId());
		return showPurchase;
	}

}
