package com.login.signup.login.signup.service;

import com.login.signup.login.signup.dto.UserDetailsDto;
import com.login.signup.login.signup.model.User;
import com.login.signup.login.signup.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.Nullable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public List<User> AllUsers(){
        List<User> users = new ArrayList<>();
        userRepository.findAll().forEach(users :: add);
        return users;
    }

    public UserDetailsDto getAddressDetails(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if(user.isEmpty())throw new RuntimeException("User Not Found!!!");
        String address = user.get().getAddress();
        if(address==null)return new UserDetailsDto();
        UserDetailsDto userDetailsDto = new UserDetailsDto();
        userDetailsDto.setAddress(user.get().getAddress());
        userDetailsDto.setCity(user.get().getCity());
        userDetailsDto.setMobileNo(user.get().getMobileNo());
        userDetailsDto.setState(user.get().getState());
        return userDetailsDto;
    }

    public String setAddressDetails(String email, UserDetailsDto userDetailsDto) {
        Optional<User> user = userRepository.findByEmail(email);
        if(user.isEmpty())throw new RuntimeException("User Not Found!!!");
        user.get().setAddress(userDetailsDto.getAddress());
        user.get().setCity(userDetailsDto.getCity());
        user.get().setMobileNo(userDetailsDto.getMobileNo());
        user.get().setState(userDetailsDto.getState());
        userRepository.save(user.get());
        return "address added successfully";
    }
}
