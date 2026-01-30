package com.login.signup.login.signup.service;

import com.login.signup.login.signup.dto.ProviderSlotDto;
import com.login.signup.login.signup.dto.ServiceProviderDto;
import com.login.signup.login.signup.model.ProviderSlot;
import com.login.signup.login.signup.model.ServiceProvider;
import com.login.signup.login.signup.repository.ProviderSlotRepository;
import com.login.signup.login.signup.repository.ServiceProviderRepository;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.Nullable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ServiceProviderServicesImpl implements ServiceProviderServices{
    private final ServiceProviderRepository serviceProviderRepository;
    private final ProviderSlotRepository providerSlotRepository;

    @Override
    public String fetchdetails(MultipartFile profilePic, MultipartFile documentPic,ServiceProviderDto serviceProviderDto) throws IOException, SQLException {
        if(serviceProviderRepository.existsByEmail(serviceProviderDto.getEmail())){
            System.out.println("here is a problem");
            System.out.println(serviceProviderDto.getEmail());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,"user already exists");
        }

        ServiceProvider serviceProvider = new ServiceProvider();
//
//        List<ProviderSlotDto> list = serviceProviderDto.getTimes();
//        List<ProviderSlot> providerSlots = new ArrayList<>();
//        for(ProviderSlotDto p : list){
//            ProviderSlot providerSlot = new ProviderSlot();
//            providerSlot.setSlotStart(p.getStart());
//            providerSlot.setProvider(serviceProvider);
//            providerSlotRepository.save(providerSlot);
//            providerSlots.add(providerSlot);
//        }

//        serviceProvider.setProviderSlot(providerSlots);
        if(!profilePic.isEmpty()){
            byte[] pic = profilePic.getBytes();
            Blob photoblob = new SerialBlob(pic);
            serviceProvider.setProfilePic(photoblob);
        }
        else throw new RuntimeException("please upload profile pic");

        if(!documentPic.isEmpty()){
            byte[] pic = documentPic.getBytes();
            Blob photoblob = new SerialBlob(pic);
            serviceProvider.setDocumentPic(photoblob);
        }
        else throw new RuntimeException("please upload document pic");

        serviceProvider.setName(serviceProviderDto.getName());
        serviceProvider.setEmail(serviceProviderDto.getEmail());
        serviceProvider.setAddress(serviceProviderDto.getAddress());
        serviceProvider.setPhonenumber(serviceProviderDto.getPhonenumber());
        serviceProvider.setCity(serviceProviderDto.getCity());
        serviceProvider.setState(serviceProviderDto.getState());
        serviceProvider.setServicelist(serviceProviderDto.getServicelist());
        serviceProvider.setYears(serviceProviderDto.getYears());
        serviceProvider.setCategories(serviceProviderDto.getCategories());
        serviceProvider.setHomeService(serviceProviderDto.isHomeService());
        serviceProvider.setReachWorkplace(serviceProviderDto.isReachWorkplace());
        serviceProvider.setCompanyName(serviceProviderDto.getCompanyName());
        serviceProvider.setProfession(serviceProviderDto.getProfession());
        serviceProvider.setPrice(serviceProviderDto.getPrice());
        serviceProviderRepository.save(serviceProvider);
        return "request succesfully added";
    }

    @Override
    public Boolean existByEmail(String email) {
        if(serviceProviderRepository.existsByEmail(email)){
            ServiceProvider serviceProvider = serviceProviderRepository.findByEmail(email);
            if(serviceProvider.isEnabled()){
                return false;
            }
            System.out.println("i ma here to check");
            return true;
        }
        return false;
    }

    @Override
    public List<ServiceProvider> getHomeService() {
        List<ServiceProvider> serviceProvider = serviceProviderRepository.findHomeService();
        System.out.println(serviceProvider);
        return serviceProvider;
    }

    @Override
    public List<ServiceProvider> getBeauty() {
        List<ServiceProvider> serviceProvider = serviceProviderRepository.findBeauty();
        System.out.println(serviceProvider);
        return serviceProvider;
    }

    @Override
    public ServiceProvider findByEmail(String email) {
        return serviceProviderRepository.findByEmail(email);
    }

    @Override
    public String fetchDetailsAfterAccept(String email, List<ProviderSlotDto> providerSlotDtos) {
        ServiceProvider serviceProvider = findByEmail(email);
        List<ProviderSlot> providerSlots = new ArrayList<>();
        System.out.println(providerSlotDtos);
        for(ProviderSlotDto p : providerSlotDtos){
            ProviderSlot providerSlot = new ProviderSlot();
            providerSlot.setSlotStart(p.getStart());
            providerSlot.setProvider(serviceProvider);
            providerSlotRepository.save(providerSlot);
            providerSlots.add(providerSlot);
        }
        serviceProvider.setProviderSlot(providerSlots);
        serviceProviderRepository.save(serviceProvider);
        return "Successfully added";
    }

    @Override
    public List<LocalDateTime> getTimeslots(String email) {
        ServiceProvider serviceProvider = serviceProviderRepository.findByEmail(email);
        Long id = serviceProvider.getServiceId();
        List<ProviderSlot> list = providerSlotRepository.findByProviderServiceId(id);
        List<LocalDateTime> times = new ArrayList<>();
        for(ProviderSlot p : list){
            times.add(p.getSlotStart());
        }
        return times;
    }

}
