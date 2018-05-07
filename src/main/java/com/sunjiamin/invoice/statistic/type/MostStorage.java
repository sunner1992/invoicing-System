package com.sunjiamin.invoice.statistic.type;

import com.sunjiamin.invoice.model.ShowGood;

public class MostStorage {
	private String good_id;
	private int count;
	private ShowGood showGood;

	public String getGood_id() {
		return good_id;
	}

	public void setGood_id(String good_id) {
		this.good_id = good_id;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}

	public ShowGood getShowGood() {
		return showGood;
	}

	public void setShowGood(ShowGood showGood) {
		this.showGood = showGood;
	}

}
