package com.sunjiamin.invoice.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "define_price")
public class DefinePrice implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	@Column(name = "goodId", unique = true)
	private String goodId;
	@Column(name = "salePrice")
	private double salePrice;

	public String getGoodId() {
		return goodId;
	}

	public void setGoodId(String goodId) {
		this.goodId = goodId;
	}

	public Double getSalePrice() {
		return salePrice;
	}

	public void setSalePrice(Double salePrice) {
		this.salePrice = salePrice;
	}

}
