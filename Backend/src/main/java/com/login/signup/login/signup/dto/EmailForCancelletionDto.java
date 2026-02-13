package com.login.signup.login.signup.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class EmailForCancelletionDto {
    public LocalDateTime bookedTime;
    public String reason;
}
