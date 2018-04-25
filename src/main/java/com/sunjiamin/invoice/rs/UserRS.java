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
import com.sunjiamin.invoice.model.User;
import com.sunjiamin.invoice.repository.UserRepository;

@RestController
@RequestMapping("/user")
public class UserRS {
	/**
	 * user的主键为username，唯一
	 */
	private static Logger logger = LoggerFactory.getLogger(RoleRS.class);

	@Autowired
	private UserRepository _userRepository;

	@RequestMapping(method = { RequestMethod.POST })
	public Result<User> add(@RequestBody User user) {
		if (_userRepository.existsById(user.getUsername())) {
			logger.debug("增加用户失败,用户已经存在-->username: " + user.getUsername());
			return new Result<User>(200, "username为" + user.getUsername() + "的用户已经存在", null);
		} else {
			_userRepository.save(user);
			logger.debug("新增用户：  id：" + user.getUsername());
			return new Result<User>(200, "增加用户成功", user);
		}
	}

	@RequestMapping(method = { RequestMethod.PUT })
	public void update(@RequestParam String username, @RequestBody User user) {
		_userRepository.deleteById(user.getUsername());
		_userRepository.save(user);
		logger.debug("修改用户--> username:" + user.getUsername());
	}

	@RequestMapping(value = "/getAll", method = { RequestMethod.GET })
	public Result<List<User>> getAll() {
		List<User> users = _userRepository.findAll();
		return new Result<List<User>>(200, "查询所有用户成功", users);
	}

	@RequestMapping(method = { RequestMethod.DELETE })
	public void deleteByUsername(@RequestParam String username) {
		_userRepository.deleteById(username);
		logger.debug("删除用户--> id:" + username);
	}
}
