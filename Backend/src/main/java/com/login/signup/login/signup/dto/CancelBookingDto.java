package com.login.signup.login.signup.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CancelBookingDto {
    public String reason;
    public LocalDateTime bookedTime;
}
