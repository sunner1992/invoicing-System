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

import com.sunjiamin.invoice.model.Result;
import com.sunjiamin.invoice.model.Role;
import com.sunjiamin.invoice.repository.RoleRepository;

@RestController
@RequestMapping("/role")
public class RoleRS {

	private static Logger logger = LoggerFactory.getLogger(RoleRS.class);

	@Autowired
	private RoleRepository _roleRepository;

	// @RequestMapping(value = "/add", method = { RequestMethod.POST })
	@RequestMapping(method = { RequestMethod.POST })
	public void add(@RequestBody Role role) {
		_roleRepository.save(role);
		logger.debug("增加角色" + role.getName());
		// logger.info("增加角色" + role.getName());
	}

	@RequestMapping(value = "/getAll", method = { RequestMethod.GET })
	public Result<List<Role>> getAll() {
		logger.debug("查询全部角色");
		return new Result<List<Role>>(200, "查询全部角色成功", _roleRepository.findAll());
	}

	// @RequestMapping(value = "/update", method = { RequestMethod.POST })
	@RequestMapping(method = { RequestMethod.PUT })
	public void update(@RequestParam String name, @RequestBody Role role) {
		logger.debug(name);
		_roleRepository.deleteById(name);
		_roleRepository.save(role);
		logger.debug("修改角色 --> name:" + name + " 修改为name:" + role.getName());
	}

	@RequestMapping(method = { RequestMethod.GET })
	public Result<Role> getByName(@RequestParam String name) {
		Role role = _roleRepository.findById(name).get();
		return new Result<Role>(200, "查询角色成功", role);
	}

	// @RequestMapping(value = "/delete", method = { RequestMethod.GET })
	@RequestMapping(method = { RequestMethod.DELETE })
	public void deleteByName(@RequestParam String name) {
		_roleRepository.deleteById(name);
		logger.debug("删除角色-->name:" + name);
	}
}
