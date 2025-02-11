package com.klu;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

@org.springframework.stereotype.Service
public class Service {
	@Autowired
	UserRepo repo1;
	
	@Autowired
	JavaMailSender mailSender;
	
	public String insertUser(User user) {
		 if (repo1.findById(user.getUsername()).isPresent()) {
	            return "Username already exists";
	        }

	        if (repo1.existsByEmail(user.getEmail())) {
	            return "Email already exists";
	        }

	        repo1.save(user);
	        return "Signed up successfully";
	}
	
	public Authenti verifyUser(LoginDetails log) {
		
		if (repo1.findById(log.getUsername()).isEmpty())  
		    return new Authenti(); // Default auth = false, role = 0  

		String or = repo1.findById(log.getUsername()).get().getPassword();  
		Cryptography c = new Cryptography();  
		String pass = c.decryptData(or);  

		Authenti a = new Authenti();
		if (pass.equals(log.getPassword())) {
		    a.setAuth(true);
		    a.setRole(repo1.findById(log.getUsername()).get().getRole());
		} else {
		    a.setAuth(false);
		    a.setRole(0); // Default or error role value
		}

		return a;

	}
	
    public String sendPassword(String username) {
        try {
            Optional<User> userOptional = repo1.findById(username);
            
            if (userOptional.isEmpty()) {
                return "Error: Username not found. Please sign up.";
            }

            String email = userOptional.get().getEmail();
            System.out.println("Mail: " + email);

            Cryptography c = new Cryptography();
            String Enpassword = userOptional.get().getPassword();
            String password = c.decryptData(Enpassword);
            System.out.println("Password: " + password);

            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("thiruveedula13@gmail.com");
            message.setTo(email);
            message.setSubject("Password request for Learning Hub");
            message.setText("This is your current password: " + password);

            mailSender.send(message);
            return "Mail sent successfully";

        } catch (MailException e) {
            return "Error: Failed to send email. Please check your email configuration.";
        } catch (Exception e) {
            return "Error: Something went wrong. " + e.getMessage();
        }
    }
	
}
