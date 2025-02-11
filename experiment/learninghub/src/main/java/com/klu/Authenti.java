package com.klu;

public class Authenti {
	int role;
	boolean auth;
	public int getRole() {
		return role;
	}
	public void setRole(int role) {
		this.role = role;
	}
	public boolean isAuth() {
		return auth;
	}
	public void setAuth(boolean auth) {
		this.auth = auth;
	}
	@Override
	public String toString() {
		return "Authenti [role=" + role + ", auth=" + auth + "]";
	}
	
}
