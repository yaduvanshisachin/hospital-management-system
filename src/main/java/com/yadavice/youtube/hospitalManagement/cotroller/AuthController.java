package com.yadavice.youtube.hospitalManagement.cotroller;

import com.yadavice.youtube.hospitalManagement.dto.LoginRequestDto;
import com.yadavice.youtube.hospitalManagement.dto.LoginResponseDto;
import com.yadavice.youtube.hospitalManagement.dto.SignupRequestDto;
import com.yadavice.youtube.hospitalManagement.dto.SignupResponseDto;
import com.yadavice.youtube.hospitalManagement.security.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@Valid @RequestBody LoginRequestDto loginRequestDto){
        return ResponseEntity.ok(authService.login(loginRequestDto));
    }

    @PostMapping("/signup")
    public ResponseEntity<SignupResponseDto> signup(@Valid @RequestBody SignupRequestDto signupRequestDto){
        return ResponseEntity.ok(authService.signup(signupRequestDto));
    }
}
