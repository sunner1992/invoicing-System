package com.sunjiamin.invoice.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="role")
// @NamedQuery(name = "User.findByName", query = "select name,address from User
// u where u.name=?1")
public class Role {
	@Id
	private Long id;
	@Column(name = "name")
	private String name;
	@Column(name = "createTime")
	private String createTime;
	@Column(name = "permissions")
	private String permissions;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCreateTime() {
		return createTime;
	}

	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}

	public String getPermissions() {
		return permissions;
	}

	public void setPermissions(String permissions) {
		this.permissions = permissions;
	}
}
