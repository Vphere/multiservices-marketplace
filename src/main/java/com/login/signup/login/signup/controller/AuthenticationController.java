package com.login.signup.login.signup.controller;

import com.login.signup.login.signup.dto.LoginUserDto;
import com.login.signup.login.signup.dto.RegisterUserDto;
import com.login.signup.login.signup.dto.VerifyUserDto;
import com.login.signup.login.signup.model.User;
import com.login.signup.login.signup.responses.LoginResponse;
import com.login.signup.login.signup.service.AuthenticationService;
import com.login.signup.login.signup.service.jwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/auth")
@RestController
@RequiredArgsConstructor
@CrossOrigin(value = "http://localhost:5173",allowCredentials = "true")
public class AuthenticationController {
    private final jwtService service;
    private final AuthenticationService authenticationService;

    @PostMapping("/signup")
    public ResponseEntity<User> register(@RequestBody RegisterUserDto registerUserDto){
        User registerUser = authenticationService.signup(registerUserDto);
        return ResponseEntity.ok(registerUser);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginUserDto loginUserDto){
        User authenticatedUser = authenticationService.authenticate(loginUserDto);
        String jwtToken = service.generateToken(authenticatedUser);
        LoginResponse loginResponse = new LoginResponse(jwtToken,service.getJwtExpiration());
        return ResponseEntity.ok(loginResponse);
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyUser(@RequestBody VerifyUserDto verifyUserDto){
        try{
            authenticationService.verifyUser(verifyUserDto);
            return ResponseEntity.ok("Account Verified Successfully");
        }catch (RuntimeException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/resend")
    public ResponseEntity<?> resendVerificationCode(@RequestParam String email){
        try{
            authenticationService.resendVerificationCode(email);
            return ResponseEntity.ok("Verification code sent");
        }catch (RuntimeException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
