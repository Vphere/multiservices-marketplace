package com.login.signup.login.signup.controller;

import com.login.signup.login.signup.dto.*;
import com.login.signup.login.signup.model.ProviderSlot;
import com.login.signup.login.signup.model.ServiceProvider;
import com.login.signup.login.signup.model.UserBooking;
import com.login.signup.login.signup.service.ServiceProviderServices;
import com.login.signup.login.signup.service.UserBookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/UserBooking")
@RequiredArgsConstructor
public class UserBookingController {
    private final UserBookingService userBookingService;

    private final ServiceProviderServices serviceProviderServices;

    @PostMapping
    public ResponseEntity<String> setBooking(@RequestParam String email, @RequestBody UserBookingDto userBookingDto,Authentication authentication){
        try{
            System.out.println(email);
            if(email==null)throw new RuntimeException("Email Not Found");
            String useremail = authentication.getName();
            String response = userBookingService.setBooking(email,userBookingDto,useremail);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            throw new RuntimeException("Something Went Wrong");
        }
    }

    @GetMapping
    public ResponseEntity<List<ProviderSlotDto>> getBooking(@RequestParam String email){
        try {
            if (email == null) throw new RuntimeException("Email Not Found");
            List<ProviderSlotDto> timelist = userBookingService.getBooking(email);
            return ResponseEntity.ok(timelist);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/getTimeslots")
    public ResponseEntity<List<LocalDateTime>> getTimeslots(@RequestParam String email){
        System.out.println(email);
        if(email==null)throw new RuntimeException("please login");
        return ResponseEntity.ok(serviceProviderServices.getTimeslots(email));
    }

    public ServiceProvider findByEmail(String email){
        try{
            ServiceProvider serviceProvider = serviceProviderServices.findByEmail(email);
            return serviceProvider;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/getServices")
    public ResponseEntity<List<ServiceProviderForUser>> getServiceProvider(Authentication authentication){
        try{
            String email = authentication.getName();
            if(email==null)throw new RuntimeException("user not found!");
            List<ServiceProviderForUser> serviceProviderForUser = userBookingService.getServiceProvider(email);
            return ResponseEntity.ok(serviceProviderForUser);
        } catch (Exception e) {
            throw new RuntimeException("something went wrong!!!");
        }
    }

    @PostMapping("/cancelOrder")
    public ResponseEntity<String> cancelOrder(@RequestBody CancelBookingDto cancelBookingDto, Authentication authentication, @RequestParam String providerEmail){
        try{
            String email = authentication.getName();
            System.out.println(providerEmail);
            return ResponseEntity.ok(userBookingService.cancelOrder(email,cancelBookingDto,providerEmail));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
