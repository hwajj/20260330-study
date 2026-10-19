package com.study.si.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public final class AuthDtos {

	private AuthDtos() {
	}

	public record RegisterRequest(
			@NotBlank @Email String email,
			@NotBlank @Size(min = 6, max = 64) String password) {
	}

	public record LoginRequest(
			@NotBlank @Email String email,
			@NotBlank String password) {
	}

	public record TokenResponse(String accessToken, String tokenType) {
		public static TokenResponse bearer(String token) {
			return new TokenResponse(token, "Bearer");
		}
	}
}
