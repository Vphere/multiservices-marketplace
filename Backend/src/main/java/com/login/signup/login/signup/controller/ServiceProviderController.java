package com.login.signup.login.signup.controller;

import com.login.signup.login.signup.dto.*;
import com.login.signup.login.signup.model.ServiceProvider;
import com.login.signup.login.signup.service.ServiceProviderServices;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/serviceProvider")
public class ServiceProviderController {

    private final ServiceProviderServices serviceProviderServices;
    @PostMapping("/service/fetch")
    public ResponseEntity<String> fetchDetails(@RequestParam String name,
                                               @RequestParam String email,
                                               @RequestParam String address,
                                               @RequestParam String phonenumber,
                                               @RequestParam("profilePic") MultipartFile profilePic,
                                               @RequestParam("documentPic") MultipartFile documentPic,
                                               @RequestParam int years,
                                               @RequestParam String categories,
                                               @RequestParam String city,
                                               @RequestParam String state,
                                               @RequestParam String servicelist,
                                               @RequestParam String homeService,
                                               @RequestParam String reachWorkplace,
                                               @RequestParam String companyName,
                                               @RequestParam String profession,
                                               @RequestParam("price") String price
                                               ) throws IOException, SQLException {
        ServiceProviderDto serviceProviderDto = new ServiceProviderDto();
        Integer price2 = Integer.parseInt(price);
        if(homeService.equals("true")){
            serviceProviderDto.setHomeService(true);
        }
        else serviceProviderDto.setHomeService(false);

        if(reachWorkplace.equals("true")){
            serviceProviderDto.setReachWorkplace(true);
        }
        else serviceProviderDto.setReachWorkplace(false);

        List<String> list = List.of(servicelist.split(","));
        System.out.println(list);
        System.out.println(state);
        serviceProviderDto.setEmail(email);
        serviceProviderDto.setProfession(profession);
        serviceProviderDto.setCompanyName(companyName);
        serviceProviderDto.setName(name);
        serviceProviderDto.setAddress(address);
        serviceProviderDto.setPhonenumber(phonenumber);
        serviceProviderDto.setServicelist(list);
        serviceProviderDto.setYears(years);
        serviceProviderDto.setCategories(categories);
        serviceProviderDto.setCity(city);
        serviceProviderDto.setState(state);
        serviceProviderDto.setPrice(price2);
        serviceProviderServices.fetchdetails(profilePic,documentPic,serviceProviderDto);
        return ResponseEntity.ok("sueccesfully");
    }

//    @PostMapping("/emailcheck")
//    public ResponseEntity<Boolean> existByemail(@RequestParam String email){
//        Boolean isavailable = serviceProviderServices.existByEmail(email);
//        System.out.println(email);
//        return ResponseEntity.ok(isavailable);
//    }

    @GetMapping("/getHomeService")
    public ResponseEntity<List<ServiceProviderDto>> getHomeService(){
        try{
            List<ServiceProvider> serviceProvider = serviceProviderServices.getHomeService();
            List<ServiceProviderDto> serviceProviderDtos = new ArrayList<>();
            for(ServiceProvider services : serviceProvider){
                ServiceProviderDto serviceProviderDto = convertor(services);
                serviceProviderDtos.add(serviceProviderDto);
            }
            return ResponseEntity.ok(serviceProviderDtos);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/getBeauty")
    public ResponseEntity<List<ServiceProviderDto>> getBeauty(){
        try{
            List<ServiceProvider> serviceProvider = serviceProviderServices.getBeauty();
            List<ServiceProviderDto> serviceProviderDtos = new ArrayList<>();
            for(ServiceProvider services : serviceProvider){
                ServiceProviderDto serviceProviderDto = convertor(services);
                serviceProviderDtos.add(serviceProviderDto);
            }
            return ResponseEntity.ok(serviceProviderDtos);
        }catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/getFitness")
    public ResponseEntity<List<ServiceProviderDto>> getFitness(){
        try{
            List<ServiceProvider> serviceProvider = serviceProviderServices.getFitness();
            List<ServiceProviderDto> serviceProviderDtos = new ArrayList<>();
            for(ServiceProvider services : serviceProvider){
                ServiceProviderDto serviceProviderDto = convertor(services);
                serviceProviderDtos.add(serviceProviderDto);
            }
            return ResponseEntity.ok(serviceProviderDtos);
        }catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/getArtsAndRecreation")
    public ResponseEntity<List<ServiceProviderDto>> getArtsAndRecreation(){
        try{
            List<ServiceProvider> serviceProvider = serviceProviderServices.getArtsAndRecreation();
            List<ServiceProviderDto> serviceProviderDtos = new ArrayList<>();
            for(ServiceProvider services : serviceProvider){
                ServiceProviderDto serviceProviderDto = convertor(services);
                serviceProviderDtos.add(serviceProviderDto);
            }
            return ResponseEntity.ok(serviceProviderDtos);
        }catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
    public ServiceProviderDto convertor(ServiceProvider serviceProvider){
        ServiceProviderDto serviceProviderDto = new ServiceProviderDto();
        serviceProviderDto.setEmail(serviceProvider.getEmail());
        serviceProviderDto.setName(serviceProvider.getName());
        serviceProviderDto.setCity(serviceProvider.getCity());
        serviceProviderDto.setState(serviceProvider.getState());
        serviceProviderDto.setAddress(serviceProvider.getAddress());
        serviceProviderDto.setPhonenumber(serviceProvider.getPhonenumber());
        serviceProviderDto.setYears(serviceProvider.getYears());
        serviceProviderDto.setCategories(serviceProvider.getCategories());
        serviceProviderDto.setHomeService(serviceProvider.isHomeService());
        serviceProviderDto.setServicelist(serviceProvider.getServicelist());
        serviceProviderDto.setProfession(serviceProvider.getProfession());
        serviceProviderDto.setCompanyName(serviceProvider.getCompanyName());
        serviceProviderDto.setReachWorkplace(serviceProvider.isReachWorkplace());
        serviceProviderDto.setPrice(serviceProvider.getPrice());
        return serviceProviderDto;
    }

    @PostMapping("/service/setService")
    public ResponseEntity<String> fetchDetailsAfterAccept(@RequestBody List<ProviderSlotDto> wrapperDto, Authentication authentication){
        String email = authentication.getName();
        System.out.println(wrapperDto);
//        List<ProviderSlotDto> slots = wrapperDto.getSlots();
        return ResponseEntity.ok(serviceProviderServices.fetchDetailsAfterAccept(email,wrapperDto));
    }

    @GetMapping("/getTimeslots")
    public ResponseEntity<List<LocalDateTime>> getTimeslots(Authentication authentication){
        String email = authentication.getName();
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

    @GetMapping("/service/getEnabled")
    public ResponseEntity<Boolean> getEnabled(Authentication authentication){
        String email = authentication.getName();
        ServiceProvider serviceProvider = findByEmail(email);
        if (serviceProvider == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Please fill the form first!"
            );
        }
        else if(!serviceProvider.isEnabled()){
            return ResponseEntity.ok(false);}
        return ResponseEntity.ok(true);
    }

    @GetMapping("/getBooking")
    public ResponseEntity<List<UserBookingDto>> getBooking(Authentication authentication){
        try{
            String email = authentication.getName();
            System.out.println(email);
            return ResponseEntity.ok(serviceProviderServices.getBooking(email));
        } catch (Exception e) {
            throw new RuntimeException("something went wrong!!!");
        }
    }

    @DeleteMapping("/service/deleteBooking")
    public ResponseEntity<String> deleteBooking(Authentication authentication,@RequestBody List<ProviderSlotDto> providerSlotDtos){
        try{
            String email = authentication.getName();
            return ResponseEntity.ok(serviceProviderServices.deleteBooking(email,providerSlotDtos));
        } catch (Exception e) {
            throw new RuntimeException("something went wrong!!!");
        }
    }

    @PostMapping("/service/sendEmailForCancelletion")
    public ResponseEntity<String> sendEmailForCancelletion(@RequestBody EmailForCancelletionDto dto, @RequestParam String email,Authentication authentication){
        try{
            String provideremail = authentication.getName();
            return ResponseEntity.ok(serviceProviderServices.sendEmailForCancelletion(dto.getReason(), dto.getBookedTime(),email,provideremail));
        } catch (Exception e) {
            throw new RuntimeException("email not sent!!!");
        }
    }

    @PostMapping("/service/setOrderCompleted")
    public ResponseEntity<String> setOrderCompleted(@RequestBody OrderCompleteDto bookedTime, Authentication authentication){
        try{
            String email = authentication.getName();
            return ResponseEntity.ok(serviceProviderServices.setOrderCompleted(bookedTime.getBookedTime(),email));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
