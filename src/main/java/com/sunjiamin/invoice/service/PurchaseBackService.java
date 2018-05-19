package com.sunjiamin.invoice.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.sunjiamin.invoice.model.Good;
import com.sunjiamin.invoice.model.PurchaseBack;
import com.sunjiamin.invoice.model.ShowPurchaseBack;
import com.sunjiamin.invoice.repository.GoodRepository;
import com.sunjiamin.invoice.repository.PurchaseBackRepository;

@Service
public class PurchaseBackService {

	@Autowired
	private PurchaseBackRepository _purchaseBackRepository;

	@Autowired
	private CategoryService _categoryService;

	@Autowired
	private ProviderService _providerService;

	@Autowired
	private GoodRepository _goodRepository;

	public List<ShowPurchaseBack> getAll() {
		List<PurchaseBack> purchaseBacks = _purchaseBackRepository.findAll();
		List<ShowPurchaseBack> result = new ArrayList<ShowPurchaseBack>();
		for (PurchaseBack purchaseBack : purchaseBacks) {
			result.add(convertToShow(purchaseBack));
		}
		return result;
	}

	@Deprecated
	public List<ShowPurchaseBack> getByPage(int page, int limit) {
		Pageable pageable = new PageRequest(page - 1, limit);
		List<PurchaseBack> purchaseBacks = _purchaseBackRepository.findAll(pageable).getContent();
		List<ShowPurchaseBack> result = new ArrayList<ShowPurchaseBack>();
		for (PurchaseBack purchaseBack : purchaseBacks) {
			result.add(convertToShow(purchaseBack));
		}
		return result;
	}

	public ShowPurchaseBack convertToShow(PurchaseBack purchaseBack) {
		ShowPurchaseBack showPurchaseBack = new ShowPurchaseBack();
		Good good = _goodRepository.findById(purchaseBack.getGoodId()).get();
		showPurchaseBack.setCategory(_categoryService.getCategoryNameByGoodId(purchaseBack.getGoodId()));
		showPurchaseBack.setCount(purchaseBack.getCount());
		showPurchaseBack.setCreater(good.getCreater());
		showPurchaseBack.setGoodId(purchaseBack.getGoodId());
		showPurchaseBack.setGoodName(good.getName());
		showPurchaseBack.setId(purchaseBack.getId());
		showPurchaseBack.setProvider(_providerService.getProviderNameByGoodId(purchaseBack.getGoodId()));
		showPurchaseBack.setTime(purchaseBack.getTime());
		return showPurchaseBack;
	}
}
