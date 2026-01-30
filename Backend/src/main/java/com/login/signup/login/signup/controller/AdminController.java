package com.login.signup.login.signup.controller;

import com.login.signup.login.signup.model.ServiceProvider;
import com.login.signup.login.signup.responses.ServiceResponse;
import com.login.signup.login.signup.service.AdminService;
import com.login.signup.login.signup.service.ServiceProviderServices;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.sql.Blob;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:3000",allowCredentials = "true")
public class AdminController {
    private final AdminService adminService;

    @GetMapping("/pendingUser")
    public ResponseEntity<List<ServiceResponse>> getPendingUser(){
        try{
            List<ServiceProvider> serviceProviders = adminService.getPendingUser();
            List<ServiceResponse> serviceResponses = new ArrayList<>();
            for(ServiceProvider s : serviceProviders){
                ServiceResponse serviceResponse = getServiceResponse(s);
                serviceResponses.add(serviceResponse);
            }
            return ResponseEntity.ok(serviceResponses);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    private ServiceResponse getServiceResponse(ServiceProvider serviceProvider) throws SQLException {
        Blob profilePic = serviceProvider.getProfilePic();
        byte[] profileByte = profilePic.getBytes(1,(int) profilePic.length());
        Blob documentPic = serviceProvider.getDocumentPic();
        byte[] documentByte = documentPic.getBytes(1,(int) documentPic.length());
        return new ServiceResponse(serviceProvider.getServiceId(),
                profileByte,documentByte,
                serviceProvider.getName(),
                serviceProvider.getPhonenumber(),
                serviceProvider.getAddress(), serviceProvider.getCategories(),
                serviceProvider.getServicelist(),
                serviceProvider.getYears(),
                serviceProvider.getEmail(),
                serviceProvider.getCity(),
                serviceProvider.getState(),
                serviceProvider.isHomeService(),
                serviceProvider.isReachWorkplace(),
                serviceProvider.getCompanyName(),
                serviceProvider.getProfession(),
                serviceProvider.getPrice());
    }

    @PostMapping("/enabled")
//    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> setEnabled(@RequestParam String email,@RequestParam("enable") String enabled){
        try{
            String s = null;
            if(enabled.equals("true")){
                 s = adminService.setEnabled(email,true);
            }
            else {
                 s = adminService.setEnabled(email,false);
            }
            System.out.println(enabled);
            return ResponseEntity.ok(s);
        } catch (Exception e) {
            throw new RuntimeException("something went wrong");
        }
    }
}
