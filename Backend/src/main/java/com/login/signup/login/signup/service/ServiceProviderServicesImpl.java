package com.login.signup.login.signup.service;

import com.login.signup.login.signup.dto.ProviderSlotDto;
import com.login.signup.login.signup.dto.ServiceProviderDto;
import com.login.signup.login.signup.dto.UserBookingDto;
import com.login.signup.login.signup.model.ProviderSlot;
import com.login.signup.login.signup.model.ServiceProvider;
import com.login.signup.login.signup.model.User;
import com.login.signup.login.signup.model.UserBooking;
import com.login.signup.login.signup.repository.ProviderSlotRepository;
import com.login.signup.login.signup.repository.ServiceProviderRepository;
import com.login.signup.login.signup.repository.UserRepository;
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
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ServiceProviderServicesImpl implements ServiceProviderServices{
    private final ServiceProviderRepository serviceProviderRepository;
    private final ProviderSlotRepository providerSlotRepository;
    private final AuthenticationService authenticationService;
    private final UserRepository userRepository;

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

    @Override
    public List<ServiceProvider> getFitness() {
        List<ServiceProvider> serviceProvider = serviceProviderRepository.findFitness();
        System.out.println(serviceProvider);
        return serviceProvider;
    }

    @Override
    public List<ServiceProvider> getArtsAndRecreation() {
        List<ServiceProvider> serviceProvider = serviceProviderRepository.findArtsAndRecreation();
        System.out.println(serviceProvider);
        return serviceProvider;
    }

    @Override
    public List<UserBookingDto> getBooking(String email) {
        ServiceProvider serviceProvider = findByEmail(email);
        List<UserBookingDto> list = new ArrayList<>();
        for(UserBooking u : serviceProvider.getUserBookings()){
            UserBookingDto userBookingDto = converter(u);
            list.add(userBookingDto);
        }
        return list;
    }

    @Override
    public String deleteBooking(String email, List<ProviderSlotDto> providerSlotDtos) {
        ServiceProvider serviceProvider = serviceProviderRepository.findByEmail(email);
        List<ProviderSlot> list = serviceProvider.getProviderSlot();
        if(serviceProvider==null)throw new RuntimeException("ServiceProvider Not Found!!!");
        for(ProviderSlotDto p : providerSlotDtos){
            LocalDateTime time = p.getStart();
            for(ProviderSlot providerSlot : list){
                if(providerSlot.getSlotStart().equals(time) && providerSlot.getProvider().equals(serviceProvider)){
                    list.remove(providerSlot);
                    providerSlotRepository.deleteById(providerSlot.getId());
                    break;
                }
            }
//            providerSlotRepository.deleteByProviderServiceIdAndDate(serviceProvider.getServiceId(),epochSeconds);
        }
        return "slots deleted successfully";
    }

    @Override
    public String sendEmailForCancelletion(String reason,LocalDateTime time, String email,String providerEmail) {
        ServiceProvider serviceProvider = serviceProviderRepository.findByEmail(providerEmail);
        List<UserBooking> userBookings = serviceProvider.getUserBookings();
        Optional<User> user = userRepository.findByEmail(email);
        if(user.isPresent()){
            authenticationService.sendBookingCancellationEmail(user.get(),time,reason);
            for(UserBooking userBooking : userBookings){
                if(userBooking.getBookedTime().equals(time)){
                    userBookings.remove(userBooking);
                    break;
                }
            }
            serviceProviderRepository.save(serviceProvider);
            return "email sent successfully";
        }
        throw new RuntimeException("something wrong!!!");
    }

    @Override
    public String setOrderCompleted(LocalDateTime bookedTime, String email) {
        ServiceProvider serviceProvider = serviceProviderRepository.findByEmail(email);
        for(UserBooking userBooking : serviceProvider.getUserBookings()){
            if(userBooking.getBookedTime().equals(bookedTime)){
                userBooking.setCompleted(true);
                userBooking.setEnabled(false);
                serviceProviderRepository.save(serviceProvider);
                return "order Completed successfully";
            }
        }
        throw new RuntimeException("BookedDate not found!!!");
    }

    private UserBookingDto converter(UserBooking userBooking){
        UserBookingDto userBookingDto = new UserBookingDto();
        userBookingDto.setBookedTime(userBooking.getBookedTime());
        userBookingDto.setAddress(userBooking.getAddress());
        userBookingDto.setCity(userBooking.getCity());
        userBookingDto.setState(userBooking.getState());
        userBookingDto.setMobileNo(userBooking.getMobileNo());
        userBookingDto.setReason(userBooking.getReason());
        userBookingDto.setEnabled(userBooking.isEnabled());
        userBookingDto.setEmail(userBooking.getUser().getEmail());
        userBookingDto.setCompleted(userBooking.isCompleted());
        return userBookingDto;
    }
}
