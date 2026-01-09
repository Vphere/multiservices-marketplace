package com.login.signup.login.signup.service;

import com.login.signup.login.signup.model.User;
import com.login.signup.login.signup.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public List<User> AllUsers(){
        List<User> users = new ArrayList<>();
        userRepository.findAll().forEach(users :: add);
        return users;
    }
}
