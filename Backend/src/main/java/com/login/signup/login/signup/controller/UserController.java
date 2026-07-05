package com.login.signup.login.signup.controller;

import com.login.signup.login.signup.dto.UserDetailsDto;
import com.login.signup.login.signup.model.User;
import com.login.signup.login.signup.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(value = "${FRONTEND_URL}",allowCredentials = "true")
@RequestMapping("/users")
@RestController
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public ResponseEntity<User> authenticatedUser() {
        Authentication authentication = SecurityContextHolder
                .getContext()
                .getAuthentication();

        User currentUser = (User) authentication.getPrincipal();
        return ResponseEntity.ok(currentUser);
    }

    @GetMapping("/")
    public ResponseEntity<List<User>> allUsers() {
        List<User> users = userService.AllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/getusername")
    public ResponseEntity<String> getUsername(Authentication authentication){
        try{
            String email = authentication.getName();
            return ResponseEntity.ok(userService.getUsername(email));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/getdetails")
    public ResponseEntity<UserDetailsDto> getAddressDetails(Authentication authentication){
        try{
            String email = authentication.getName();
            return ResponseEntity.ok(userService.getAddressDetails(email));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @PostMapping("/setdetails")
    public ResponseEntity<UserDetailsDto> setAddressDetails(Authentication authentication,@RequestBody UserDetailsDto userDetailsDto){
        try{
            String email = authentication.getName();
            userService.setAddressDetails(email,userDetailsDto);
            return ResponseEntity.ok(userDetailsDto);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}