package com.sunjiamin.invoice.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sunjiamin.invoice.model.Good;
import com.sunjiamin.invoice.model.ShowStorage;
import com.sunjiamin.invoice.model.Storage;
import com.sunjiamin.invoice.repository.DefinePriceRepository;
import com.sunjiamin.invoice.repository.GoodRepository;
import com.sunjiamin.invoice.repository.StorageRepository;

@Service
public class StorageService {

	@Autowired
	private StorageRepository _StorageRepository;

	@Autowired
	private CategoryService _categoryService;

	@Autowired
	private GoodRepository _goodRepository;

	@Autowired
	private DefinePriceRepository _definePriceRepository;

	@Autowired
	private ProviderService _providerService;

	public void add(String goodId, int count) {
		if (!_StorageRepository.findById(goodId).isPresent()) {
			Storage storage = new Storage();
			storage.setCount(count);
			storage.setGoodId(goodId);
			_StorageRepository.save(storage);
		} else {
			int totalCount = _StorageRepository.findById(goodId).get().getCount();
			int newcount = totalCount + count;
			Storage storage = new Storage();
			storage.setGoodId(goodId);
			storage.setCount(newcount);
			_StorageRepository.deleteById(storage.getGoodId());
			_StorageRepository.save(storage);
		}
	}

	public void subtract(String goodId, int count) {
		int totalCount = _StorageRepository.findById(goodId).get().getCount();
		totalCount = totalCount - count;
		Storage storage = new Storage();
		storage.setGoodId(goodId);
		storage.setCount(totalCount);
		_StorageRepository.deleteById(storage.getGoodId());
		_StorageRepository.save(storage);
	}

	public List<ShowStorage> getAll() {
		List<ShowStorage> result = new ArrayList<ShowStorage>();
		List<Storage> storages = _StorageRepository.findAll();
		for (Storage storage : storages) {
			ShowStorage showStorage = new ShowStorage();
			Good good = _goodRepository.findById(storage.getGoodId()).get();
			showStorage.setCategory(_categoryService.getCategoryNameByGoodId(good.getId()));
			showStorage.setCount(storage.getCount());
			showStorage.setGoodId(good.getId());
			showStorage.setGoodName(good.getName());
			showStorage.setPrice(_definePriceRepository.findById(good.getId()).get().getSalePrice());
			showStorage.setProvider(_providerService.getProviderNameByGoodId(good.getId()));
			result.add(showStorage);
		}
		return result;
	}

}
