package com.sunjiamin.invoice.rs;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.sunjiamin.invoice.model.Role;
import com.sunjiamin.invoice.repository.RoleRepository;

@RestController("/invoice")
public class RoleRS {

	private static Logger logger = LoggerFactory.getLogger(RoleRS.class);
	@Autowired
	private RoleRepository _RoleRepository;

	@RequestMapping(value = "/role/add", method = { RequestMethod.POST })
	public void add(@RequestBody Role role) {
		_RoleRepository.save(role);
		logger.debug("增加角色" + role.getName());
//		logger.info("增加角色" + role.getName());
	}
	
	@RequestMapping(value = "/role/getAll", method = { RequestMethod.GET })
	public List<Role> getAll(){
		return _RoleRepository.findAll();
	}
}
