package com.login.signup.login.signup.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
public class UserBooking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    private String address;

    private String city;

    private String mobileNo;

    private String state;

    private LocalDateTime bookedTime;

    private boolean enabled = true;

    private String reason;

    private boolean completed = false;

    @ManyToOne
    private ServiceProvider serviceProvider;

    @ManyToOne
    private User user;

}
