package com.sunjiamin.invoice.model;

import java.util.Date;

public class ShowSale {

	private int id;
	private String goodId;
	private String saleman;
	private String salemanId;
	private int count;
	private Date time;
	private String goodName;
	private double definePrice;
	private String provider;
	private String creater;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getGoodId() {
		return goodId;
	}

	public void setGoodId(String goodId) {
		this.goodId = goodId;
	}

	public String getSaleman() {
		return saleman;
	}

	public void setSaleman(String saleman) {
		this.saleman = saleman;
	}

	public String getSalemanId() {
		return salemanId;
	}

	public void setSalemanId(String salemanId) {
		this.salemanId = salemanId;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}

	public Date getTime() {
		return time;
	}

	public void setTime(Date time) {
		this.time = time;
	}

	public String getGoodName() {
		return goodName;
	}

	public void setGoodName(String goodName) {
		this.goodName = goodName;
	}

	public double getDefinePrice() {
		return definePrice;
	}

	public void setDefinePrice(double definePrice) {
		this.definePrice = definePrice;
	}

	public String getProvider() {
		return provider;
	}

	public void setProvider(String provider) {
		this.provider = provider;
	}

	public String getCreater() {
		return creater;
	}

	public void setCreater(String creater) {
		this.creater = creater;
	}

}
