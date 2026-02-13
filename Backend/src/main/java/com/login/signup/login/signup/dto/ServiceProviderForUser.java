package com.login.signup.login.signup.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ServiceProviderForUser {
    private String name;
    private String phonenumber;
    private String email;
    private String companyName;
    private String profession;
    private Integer price;
    private LocalDateTime slottime;
    private String address;
}
