package com.login.signup.login.signup.responses;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.Base64;
import java.util.Collection;

@Data
public class ServiceResponse {
    private Long serviceId;
    private String profilePic;
    private String documentPic;
    private String name;
    private String phonenumber;
    private String address;
    private String categories;
    private Collection<String> servicelist;
    private int years;
    private String email;
    private String city;
    private String state;
    private boolean homeService;
    private boolean reachWorkplace;
    private String companyName;
    private String profession;
    private Integer price;

    public ServiceResponse(Long serviceId, byte[] profilePic, byte[] documentPic, String name, String phonenumber, String address, String categories, Collection<String> servicelist, int years, String email, String city, String state, boolean homeService, boolean reachWorkplace,String companyName,String profession,Integer price) {
        this.serviceId = serviceId;
        this.profilePic = profilePic != null ? Base64.getEncoder().encodeToString(profilePic) : null;
        this.documentPic = documentPic != null ? Base64.getEncoder().encodeToString(documentPic) : null;
        this.name = name;
        this.phonenumber = phonenumber;
        this.address = address;
        this.categories = categories;
        this.servicelist = servicelist;
        this.years = years;
        this.email = email;
        this.city = city;
        this.state = state;
        this.homeService = homeService;
        this.reachWorkplace = reachWorkplace;
        this.companyName = companyName;
        this.profession = profession;
        this.price = price;
    }
}
