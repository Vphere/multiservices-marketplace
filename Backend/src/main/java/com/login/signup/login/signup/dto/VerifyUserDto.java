package com.login.signup.login.signup.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class VerifyUserDto {
    private String email;
    private String verificationCode;
}
