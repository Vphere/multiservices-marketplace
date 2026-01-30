package com.login.signup.login.signup.service;

import com.login.signup.login.signup.model.ServiceProvider;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface AdminService {
    List<ServiceProvider> getPendingUser();

    String setEnabled(String email,boolean enabled);
}
