package com.sunjiamin.invoice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sunjiamin.invoice.model.Good;
import com.sunjiamin.invoice.model.Provider;
import com.sunjiamin.invoice.repository.GoodRepository;
import com.sunjiamin.invoice.repository.ProviderRepository;

@Service
public class ProviderService {

	@Autowired
	private GoodRepository _goodRepository;

	@Autowired
	private ProviderRepository _providerRepository;

	public String getProviderNameByGoodId(String goodId) {
		Good good = _goodRepository.findById(goodId).get();
		Provider provider = _providerRepository.findById(good.getProviderId()).get();
		return provider.getContact();
	}
}
