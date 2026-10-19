package com.study.si.auth;

import com.study.si.auth.AuthDtos.LoginRequest;
import com.study.si.auth.AuthDtos.RegisterRequest;
import com.study.si.auth.AuthDtos.TokenResponse;
import com.study.si.user.User;
import com.study.si.user.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtService jwtService;

	public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
		this.jwtService = jwtService;
	}

	@Transactional
	public TokenResponse register(RegisterRequest req) {
		if (userRepository.existsByEmail(req.email())) {
			throw new ResponseStatusException(HttpStatus.CONFLICT, "email already registered");
		}
		User user = userRepository.save(new User(req.email(), passwordEncoder.encode(req.password())));
		return TokenResponse.bearer(jwtService.createToken(user.getId(), user.getEmail()));
	}

	@Transactional(readOnly = true)
	public TokenResponse login(LoginRequest req) {
		User user = userRepository.findByEmail(req.email())
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "invalid credentials"));
		if (!passwordEncoder.matches(req.password(), user.getPasswordHash())) {
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "invalid credentials");
		}
		return TokenResponse.bearer(jwtService.createToken(user.getId(), user.getEmail()));
	}
}
