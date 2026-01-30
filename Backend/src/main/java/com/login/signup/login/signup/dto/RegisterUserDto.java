package com.login.signup.login.signup.dto;

import com.login.signup.login.signup.model.Role;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Collection;

@Getter
@Setter
@Data
public class RegisterUserDto {
    private String email;
    private String password;
    private String username;
    private Collection<String> roles;
}

