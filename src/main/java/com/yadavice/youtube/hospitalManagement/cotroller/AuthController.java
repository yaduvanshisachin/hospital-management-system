package com.yadavice.youtube.hospitalManagement.cotroller;

import com.yadavice.youtube.hospitalManagement.dto.LoginRequestDto;
import com.yadavice.youtube.hospitalManagement.dto.LoginResponseDto;
import com.yadavice.youtube.hospitalManagement.dto.SignupRequestDto;
import com.yadavice.youtube.hospitalManagement.dto.SignupResponseDto;
import com.yadavice.youtube.hospitalManagement.security.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    public ResponseEntity<LoginResponseDto> login(@RequestBody LoginRequestDto loginRequestDto){
        return ResponseEntity.ok(authService.login(loginRequestDto));
    }

    public ResponseEntity<SignupResponseDto> signup(@RequestBody SignupRequestDto signupRequestDto){
        return ResponseEntity.ok(authService.signup(signupRequestDto));
    }
}
