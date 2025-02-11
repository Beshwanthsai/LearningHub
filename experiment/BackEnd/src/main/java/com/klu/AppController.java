package com.klu;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
@RestController
@CrossOrigin
public class AppController {
	@Autowired
	Service service;
	@GetMapping("/check")
	public String fun1() {
		return "Welcome to Leraning Hub";
	}

	@PostMapping("/register")
	public String fun2(@RequestBody User user) {
		Cryptography cryp = new Cryptography();
		user.setPassword(cryp.encryptData(user.getPassword()));
		return service.insertUser(user);
	}
	@CrossOrigin
	@PostMapping("/verifyUser")
	public Authenti check(@RequestBody LoginDetails log) {
		return service.verifyUser(log);
	}
	
	@PostMapping("/sendPassword")
	public String sendPassword(@RequestBody PasswordSender p) {
		return service.sendPassword(p.getPassword());
	}
}
