package com.sunjiamin.invoice.rs;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sunjiamin.invoice.model.Role;
import com.sunjiamin.invoice.repository.RoleRepository;

@RestController
@RequestMapping("/role")
public class RoleRS {

	private static Logger logger = LoggerFactory.getLogger(RoleRS.class);

	@Autowired
	private RoleRepository _roleRepository;

	@RequestMapping(value = "/add", method = { RequestMethod.POST })
	public void add(@RequestBody Role role) {
		_roleRepository.save(role);
		logger.debug("增加角色" + role.getName());
		// logger.info("增加角色" + role.getName());
	}

	@RequestMapping(value = "/getAll", method = { RequestMethod.GET })
	public List<Role> getAll() {
		return _roleRepository.findAll();
	}

	@RequestMapping(value = "/modify", method = { RequestMethod.POST })
	public void modify(@RequestBody Role role) {
		_roleRepository.deleteById(role.getName());
		_roleRepository.save(role);
		logger.debug("修改角色" + role.getName());
	}

	@RequestMapping(value = "/get", method = { RequestMethod.GET })
	public Role getByName(@RequestParam String name) {
		return _roleRepository.findById(name).get();
	}

	@RequestMapping(value = "/delete", method = { RequestMethod.GET })
	public void deleteByName(@RequestParam String name) {
		_roleRepository.deleteById(name);
		logger.debug("删除角色-->name:" + name);
	}
}
