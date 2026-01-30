package com.login.signup.login.signup.service;

import com.login.signup.login.signup.model.ServiceProvider;
import com.login.signup.login.signup.repository.ServiceProviderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService{
    private final ServiceProviderRepository serviceProviderRepository;

    @Override
    public List<ServiceProvider> getPendingUser() {
        List<ServiceProvider> serviceProvider = serviceProviderRepository.findByEnabled(false);
        return serviceProvider;
    }

    @Override
    public String setEnabled(String email,boolean enabled) {
        try {
            ServiceProvider serviceProvider = serviceProviderRepository.findByEmail(email);
            serviceProvider.setEnabled(enabled);
            serviceProviderRepository.save(serviceProvider);
            return "your account has been accepted";
        } catch (Exception e) {
            throw new RuntimeException("something went wrong");
        }
    }
}
