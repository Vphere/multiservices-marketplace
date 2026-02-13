package com.login.signup.login.signup.service;

import com.login.signup.login.signup.dto.ProviderSlotDto;
import com.login.signup.login.signup.dto.ServiceProviderDto;
import com.login.signup.login.signup.dto.UserBookingDto;
import com.login.signup.login.signup.model.ServiceProvider;
import org.jspecify.annotations.Nullable;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.List;

@Service
public interface ServiceProviderServices {
    String fetchdetails(MultipartFile profilePic,  MultipartFile documentPic,ServiceProviderDto serviceProviderDto) throws IOException, SQLException;

    Boolean existByEmail(String email);

    List<ServiceProvider> getHomeService();

    List<ServiceProvider> getBeauty();

    ServiceProvider findByEmail(String email);

    String fetchDetailsAfterAccept(String email, List<ProviderSlotDto> providerSlotDtos);

    List<LocalDateTime> getTimeslots(String email);

    List<ServiceProvider> getFitness();

    List<ServiceProvider> getArtsAndRecreation();

    List<UserBookingDto> getBooking(String email);

    String deleteBooking(String email, List<ProviderSlotDto> providerSlotDtos);

    String sendEmailForCancelletion(String reason,LocalDateTime time, String email,String providerEmail);

    String setOrderCompleted(LocalDateTime bookedTime, String email);
}
