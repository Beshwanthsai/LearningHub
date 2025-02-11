package com.klu;

import java.security.MessageDigest;
import java.util.Base64;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

public class Cryptography {
	public String encryptData(String data)
	  {
	    try
	    {
	      MessageDigest MD5 = MessageDigest.getInstance("SHA-256");
	      byte[] keyBytes = MD5.digest("BALAJEE".getBytes());
	      SecretKey cryptoKey = new SecretKeySpec(keyBytes, 0, 16, "AES");
	      
	      Cipher cipher = Cipher.getInstance("AES");
	      cipher.init(Cipher.ENCRYPT_MODE, cryptoKey);
	      byte[] encryptedBytes = cipher.doFinal(data.getBytes());
	      return Base64.getEncoder().encodeToString(encryptedBytes);            
	    }catch(Exception e)
	    {
	      return e.getMessage();
	    }
	  }
	  
	  public String decryptData(String data)
	  {
	    try
	    {
	      MessageDigest MD5 = MessageDigest.getInstance("SHA-256");
	      byte[] keyBytes = MD5.digest("BALAJEE".getBytes());
	      SecretKey cryptoKey = new SecretKeySpec(keyBytes, 0, 16, "AES");
	      
	      Cipher cipher = Cipher.getInstance("AES");
	      cipher.init(Cipher.DECRYPT_MODE, cryptoKey);
	      byte[] decryptedBytes = cipher.doFinal(Base64.getDecoder().decode(data));
	      return new String(decryptedBytes);
	    }catch(Exception e)
	    {
	      return e.getMessage();
	    }
	  }

}
