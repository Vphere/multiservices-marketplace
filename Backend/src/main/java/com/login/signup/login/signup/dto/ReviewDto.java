package com.login.signup.login.signup.dto;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class ReviewDto {
    private Long id;
    private String description;
    private String title;
    private Double rating;
    private Long ProviderId;
}
