package com.login.signup.login.signup.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@RequiredArgsConstructor
public class UserBookingDto {
    private String address;
    private String city;
    private String mobileNo;
    private String state;
    private LocalDateTime bookedTime;
    private boolean enabled;
    private String reason;
    private String email;
    private boolean completed;
}
