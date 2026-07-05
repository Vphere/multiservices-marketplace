package com.login.signup.login.signup.service;

import com.login.signup.login.signup.dto.*;
import com.login.signup.login.signup.model.ProviderSlot;
import com.login.signup.login.signup.model.ServiceProvider;
import com.login.signup.login.signup.model.User;
import com.login.signup.login.signup.model.UserBooking;
import com.login.signup.login.signup.repository.ServiceProviderRepository;
import com.login.signup.login.signup.repository.UserBookingRepository;
import com.login.signup.login.signup.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserBookingServiceImpl implements UserBookingService{
    private final UserBookingRepository userBookingRepository;
    private final ServiceProviderRepository serviceProviderRepository;
    private final UserRepository userRepository;

    @Override
    public String setBooking(String email, UserBookingDto userBookingDto,String useremail) {
       ServiceProvider serviceProvider = serviceProviderRepository.findByEmail(email);
       if(email==null)throw new RuntimeException("email not found");
       UserBooking userBooking = convertor(userBookingDto);
       User user = userRepository.findByEmail(useremail).get();
       System.out.println(user);
       userBooking.setUser(user);
       List<UserBooking> list = serviceProvider.getUserBookings();
       list.add(userBooking);
       serviceProvider.setUserBookings(list);
       userBooking.setServiceProvider(serviceProvider);
       serviceProviderRepository.save(serviceProvider);
       return "User Booking added succesfully";
    }

    @Override
    public List<ProviderSlotDto> getBooking(String email) {
        ServiceProvider serviceProvider = serviceProviderRepository.findByEmail(email);
        if(email==null)throw new RuntimeException("email not found");
        List<ProviderSlotDto> list = new ArrayList<>();
        System.out.println(serviceProvider);
        for(UserBooking userBooking : serviceProvider.getUserBookings()){
            System.out.println(userBooking.isEnabled());
            if(userBooking.isEnabled()) {
                ProviderSlotDto p = new ProviderSlotDto();
                p.setStart(userBooking.getBookedTime());
                list.add(p);
            }
        }
        return list;
    }

    @Override
    public List<ServiceProviderForUser> getServiceProvider(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if(user.isEmpty())throw new RuntimeException("User not Found!!!");
        List<UserBooking> userBookinglist = userBookingRepository.findByUserId(user.get().getId());
        List<ServiceProviderForUser> serviceProviderForUsers = new ArrayList<>();
        for(UserBooking userBooking : userBookinglist){
            ServiceProvider serviceProvider = userBooking.getServiceProvider();
            ServiceProviderForUser serviceProviderForUser = convertService(serviceProvider, userBooking.getBookedTime(),userBooking.isEnabled(),userBooking.isCompleted(),userBooking.getAddress());
            serviceProviderForUsers.add(serviceProviderForUser);

        }
        return serviceProviderForUsers;
    }

    @Override
    public String cancelOrder(String email, CancelBookingDto cancelBookingDto, String providerEmail) {
        ServiceProvider serviceProvider = serviceProviderRepository.findByEmail(providerEmail);
        List<UserBooking> userBookingList = serviceProvider.getUserBookings();
//        System.out.println(serviceProvider.getServiceId());
//        System.out.println(cancelBookingDto.getBookedTime());
        Optional<User> user = userRepository.findByEmail(email);
        for (UserBooking u : userBookingList){

            if(user.get().getId().equals(u.getUser().getId()) && u.getBookedTime().equals(cancelBookingDto.getBookedTime()) && u.isEnabled()){
//                u.setEnabled(false);
//                u.setReason(cancelBookingDto.getReason());
//                Optional<UserBooking> userBooking = userBookingRepository.findById(u.getId());
                System.out.println(u.getId());
                u.setEnabled(false);
                u.setCompleted(false);
                u.setReason(cancelBookingDto.getReason());
                userBookingRepository.save(u);
                return "Booking canceled successfully";
            }
        }
//        Optional<UserBooking> userBooking = userBookingRepository.findBooking(serviceProvider.getServiceId(),cancelBookingDto.getBookedTime());
//        System.out.println(userBooking);
//        if(userBooking.isPresent()) {
//            userBooking.get().setEnabled(false);
//            userBooking.get().setReason(cancelBookingDto.getReason());
//            userBookingRepository.save(userBooking.get());
//        }
        throw new RuntimeException("something went wrong");
    }

    private UserBooking convertor(UserBookingDto userBookingDto){
        UserBooking userBooking = new UserBooking();
        userBooking.setState(userBookingDto.getState());
        userBooking.setCity(userBookingDto.getCity());
        userBooking.setAddress(userBookingDto.getAddress());
        userBooking.setMobileNo(userBookingDto.getMobileNo());
        userBooking.setBookedTime(userBookingDto.getBookedTime());
        return userBooking;
    }

    private ServiceProviderForUser convertService(ServiceProvider serviceProvider,LocalDateTime slottime,boolean enabled,boolean completed,String address){
        ServiceProviderForUser serviceProviderForUser = new ServiceProviderForUser();
        serviceProviderForUser.setName(serviceProvider.getName());
        serviceProviderForUser.setEmail(serviceProvider.getEmail());
        serviceProviderForUser.setPrice(serviceProvider.getPrice());
        serviceProviderForUser.setProfession(serviceProvider.getProfession());
        serviceProviderForUser.setPhonenumber(serviceProvider.getPhonenumber());
        serviceProviderForUser.setCompanyName(serviceProvider.getCompanyName());
        serviceProviderForUser.setSlottime(slottime);
        serviceProviderForUser.setAddress(serviceProvider.getAddress());
        serviceProviderForUser.setEnabled(enabled);
        serviceProviderForUser.setCompleted(completed);
        serviceProviderForUser.setCategories(serviceProvider.getCategories());
        serviceProviderForUser.setUserAddress(address);
        return serviceProviderForUser;
    }
}