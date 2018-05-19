package com.sunjiamin.invoice.model;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "sale")
public class Sale implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "id")
	@GeneratedValue
	private int id;
	@Column(name = "goodId")
	private String goodId;
	@Column(name = "salemanId")
	private String salemanId;
	@Column(name = "count")
	private int count;
	@Column(name = "time")
	private Date time;
	@Column(name = "price")
	private Double price;

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

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}
	
	

}
