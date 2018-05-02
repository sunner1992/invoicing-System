package com.sunjiamin.invoice.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "storage")
public class Storage implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "goodId", unique = true)
	private String goodId;
	@Column(name = "count")
	private int count;

	public String getGoodId() {
		return goodId;
	}

	public void setGoodId(String goodId) {
		this.goodId = goodId;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}

}
