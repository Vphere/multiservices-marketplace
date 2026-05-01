package com.login.signup.login.signup.controller;

import com.login.signup.login.signup.dto.LoginUserDto;
import com.login.signup.login.signup.dto.RegisterUserDto;
import com.login.signup.login.signup.dto.VerifyUserDto;
import com.login.signup.login.signup.model.User;
import com.login.signup.login.signup.repository.UserRepository;
import com.login.signup.login.signup.responses.LoginResponse;
import com.login.signup.login.signup.service.AuthenticationService;
import com.login.signup.login.signup.service.ServiceProviderServices;
import com.login.signup.login.signup.service.jwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RequestMapping("/auth")
@RestController
@RequiredArgsConstructor
@CrossOrigin(value = "${FRONTEND_URL}",allowCredentials = "true")
public class AuthenticationController {
    private final jwtService service;
    private final AuthenticationService authenticationService;
    private final UserRepository userRepository;
    private final ServiceProviderServices serviceProviderServices;

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
            System.out.println(email);
            authenticationService.resendVerificationCode(email);
            return ResponseEntity.ok("Verification code sent");
        }catch (RuntimeException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/sendOtp-Newpass")
    public ResponseEntity<?> sendVerificationCodeforPassword(@RequestParam String email){
        try{
            System.out.println(email);
            authenticationService.sendVerificationCodeforPasswrod(email);
            return ResponseEntity.ok("Verification code sent");
        }catch (RuntimeException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/changePassword")
    public ResponseEntity<?> verifyExistingUser(@RequestParam String email,@RequestParam String password){
        try{
            return ResponseEntity.ok(authenticationService.changePassword(email,password));
        }catch (RuntimeException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/emailcheck")
    public ResponseEntity<Boolean> existByemail(@RequestParam String email){
        Boolean isavailable = serviceProviderServices.existByEmail(email);
        System.out.println(email);
        return ResponseEntity.ok(isavailable);
    }
}
