package com.login.signup.login.signup.service;

import com.login.signup.login.signup.dto.*;
import com.login.signup.login.signup.model.ProviderSlot;
import org.jspecify.annotations.Nullable;

import java.time.LocalDateTime;
import java.util.List;

public interface UserBookingService {
    String setBooking(String email, UserBookingDto userBookingDto,String useremail);

    List<ProviderSlotDto> getBooking(String email);

    List<ServiceProviderForUser> getServiceProvider(String email);

    String cancelOrder(String email, CancelBookingDto cancelBookingDto, String providerEmail);
}
