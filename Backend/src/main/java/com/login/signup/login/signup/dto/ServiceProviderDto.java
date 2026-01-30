package com.login.signup.login.signup.dto;
import com.login.signup.login.signup.model.ProviderSlot;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;

@Data
public class ServiceProviderDto {
    private MultipartFile profilePic;
    private MultipartFile documentPic;
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
    private List<ProviderSlotDto> times;
}
