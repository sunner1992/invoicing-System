package com.sunjiamin.invoice.rs;

import java.util.Optional;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.sunjiamin.invoice.model.Result;
import com.sunjiamin.invoice.model.User;
import com.sunjiamin.invoice.repository.UserRepository;

@RestController
@RequestMapping(value = "/login")
public class LoginRS {

	private static Logger logger = LoggerFactory.getLogger(LoginRS.class);

	@Value("${invoice.admin.username}")
	private String defaultUsername;

	@Value("${invoice.admin.username}")
	private String defaultPassword;

	@Autowired
	private UserRepository _userRepository;

	@RequestMapping(value = "/in", method = RequestMethod.GET)
	public Result<String> in(@RequestParam String username, @RequestParam String password, HttpServletResponse response,
			HttpServletRequest requset) {
		logger.debug("默认用户名:" + defaultUsername);
		logger.debug("默认密码:" + defaultPassword);
		HttpSession HttpSession = requset.getSession();
		if (username.equals(defaultUsername)) {
			if (password.equals(defaultPassword)) {
				HttpSession.setAttribute("username", username);
				HttpSession.setAttribute("password", password);
				return new Result<String>(200, "登录成功", username);
			} else {
				return new Result<String>(400, "参数错误", "密码不正确");
			}
		}
		Optional<User> option = _userRepository.findById(username);
		if (option.isPresent()) {
			if (option.get().getPassword() == password) {
				HttpSession.setAttribute("username", username);
				HttpSession.setAttribute("password", password);
				return new Result<String>(200, "登录成功", username);
			} else {
				return new Result<String>(400, "参数错误", "密码不正确");
			}
		} else {
			return new Result<String>(400, "参数错误", "用户名不存在");
		}
	}

}
