package com.login.signup.login.signup.service;

import com.login.signup.login.signup.dto.LoginUserDto;
import com.login.signup.login.signup.dto.RegisterUserDto;
import com.login.signup.login.signup.dto.VerifyUserDto;
import com.login.signup.login.signup.model.Role;
import com.login.signup.login.signup.model.User;
import com.login.signup.login.signup.repository.RoleRepository;
import com.login.signup.login.signup.repository.UserRepository;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final EmailService emailService;
    private final RoleRepository roleRepository;
    private final jwtService service;

    public User signup(RegisterUserDto input){
        User user = new User(input.getUsername(),input.getEmail(),passwordEncoder.encode(input.getPassword()));
        Collection<Role> roles = new HashSet<>();
        for(String name: input.getRoles()){
            Role role = roleRepository.findByName(name);
            System.out.println(name);
            roles.add(role);
        }
        user.setVerificationCode(generateVerificationCode());
        user.setVerificationCodeExpiredAt(LocalDateTime.now().plusMinutes(15));
        user.setEnabled(false);
        sendVerificationEmail(user);
        System.out.println(user);
        user.setRoles(roles);
        return userRepository.save(user);
    }

    public User authenticate(LoginUserDto input){
        User user = userRepository.findByEmail(input.getEmail()).orElseThrow(() -> new RuntimeException("User not found"));
        System.out.println(user);
        if(!user.isEnabled()){
            throw new RuntimeException("Account not verified! , Please verify your account");
        }
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(input.getEmail(),input.getPassword()));
        return user;
    }

    public static String encodePassword(String rawPassword) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        return encoder.encode(rawPassword);
    }

    public String changePassword(String email,String password){
        if(email==null)throw new RuntimeException("email not found");
        if(userRepository.findByEmail(email).isPresent()){
            User user = userRepository.findByEmail(email).get();
            user.setPassword(encodePassword(password));
            userRepository.save(user);
            return "password changed successfully";
        }
        else{
            throw new RuntimeException("user not found!!!");
        }
    }

    public void verifyUser(VerifyUserDto input){
        Optional<User> optionalUser = userRepository.findByEmail(input.getEmail());
        if(optionalUser.isPresent()){
            User user = optionalUser.get();
            if(user.getVerificationCodeExpiredAt().isBefore(LocalDateTime.now())){
                throw new RuntimeException("Verification code has expired");
            }
            if(user.getVerificationCode().equals(input.getVerificationCode())){
                user.setEnabled(true);
                user.setVerificationCode(null);
                user.setVerificationCodeExpiredAt(null);
                userRepository.save(user);
            }else{
                throw new RuntimeException("invalid verification code!!");
            }
        }else {
            throw new RuntimeException("User not found!!!");
        }
    }

    public void resendVerificationCode(String email){
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if(optionalUser.isPresent()){
            User user = optionalUser.get();
            System.out.println(optionalUser);
            if(user.isEnabled()){
                throw new RuntimeException("account is already verified");
            }
            user.setVerificationCode(generateVerificationCode());
            user.setVerificationCodeExpiredAt(LocalDateTime.now().plusHours(1));
            sendVerificationEmail(user);
            userRepository.save(user);
        }else{
            throw new RuntimeException("User not found");
        }
    }

    public void sendVerificationCodeforPasswrod(String email){
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if(optionalUser.isPresent()){
            User user = optionalUser.get();
            System.out.println(optionalUser);
            user.setVerificationCode(generateVerificationCode());
            user.setVerificationCodeExpiredAt(LocalDateTime.now().plusHours(1));
            sendVerificationEmail(user);
            userRepository.save(user);
        }else{
            throw new RuntimeException("User not found");
        }
    }

    private String generateVerificationCode() {
        Random random = new Random();
        int code = random.nextInt(900000) + 100000;
        return String.valueOf(code);
    }

    private void sendVerificationEmail(User user) {
        String subject = "Account Verification";
        String verificationCode = user.getVerificationCode();
        String htmlMessage = "<html>"
                + "<body style=\"font-family: Arial, sans-serif;\">"
                + "<div style=\"background-color: #f5f5f5; padding: 20px;\">"
                + "<h2 style=\"color: #333;\">Welcome to our app!</h2>"
                + "<p style=\"font-size: 16px;\">Please enter the verification code below to continue:</p>"
                + "<div style=\"background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0,0,0,0.1);\">"
                + "<h3 style=\"color: #333;\">Verification Code:</h3>"
                + "<p style=\"font-size: 18px; font-weight: bold; color: #007bff;\">" + verificationCode + "</p>"
                + "</div>"
                + "</div>"
                + "</body>"
                + "</html>";

        try{
            emailService.sendVerificationEmail(user.getEmail(), subject,htmlMessage);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }

    public void sendBookingCancellationEmail(
            User user,
            LocalDateTime bookedTime,
            String reason
    ) {
        String subject = "Your Booking Has Been Cancelled";

        String formattedDateTime = bookedTime.toLocalDate().toString()
                + " at "
                + bookedTime.toLocalTime().toString();

        String htmlMessage =
                "<html>" +
                        "<body style=\"font-family: Arial, sans-serif; background-color:#f4f6f8; padding:20px;\">" +

                        "<div style=\"max-width:600px; margin:auto; background:#ffffff; padding:24px; border-radius:8px; " +
                        "box-shadow:0 4px 12px rgba(0,0,0,0.1);\">" +

                        "<h2 style=\"color:#b91c1c; text-align:center;\">Booking Cancelled</h2>" +

                        "<p style=\"font-size:15px; color:#333;\">Dear <b>" + user.getUsername() + "</b>,</p>" +

                        "<p style=\"font-size:15px; color:#333;\">" +
                        "We regret to inform you that your booking scheduled for the following time has been cancelled by the service provider:" +
                        "</p>" +

                        "<div style=\"background:#f1f5f9; padding:14px; border-radius:6px; margin:16px 0;\">" +
                        "<p style=\"margin:0;\"><b>📅 Date & Time:</b> " + formattedDateTime + "</p>" +
                        "</div>" +

                        "<div style=\"background:#fff1f2; padding:14px; border-left:4px solid #dc2626; border-radius:6px;\">" +
                        "<p style=\"margin:0; color:#7f1d1d;\"><b>Reason for Cancellation:</b></p>" +
                        "<p style=\"margin-top:6px; color:#991b1b; font-style:italic;\">" + reason + "</p>" +
                        "</div>" +

                        "<p style=\"margin-top:18px; font-size:14px; color:#444;\">" +
                        "We sincerely apologize for the inconvenience caused. You may book another slot at your convenience." +
                        "</p>" +

                        "<p style=\"margin-top:20px; font-size:14px; color:#333;\">" +
                        "Thank you for your understanding.<br/>" +
                        "<b>Support Team</b>" +
                        "</p>" +

                        "</div>" +
                        "</body>" +
                        "</html>";

        try {
            emailService.sendVerificationEmail(
                    user.getEmail(),
                    subject,
                    htmlMessage
            );
        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send cancellation email", e);
        }
    }

    public void sendServiceProviderRejectionEmail(String email , String reason) {

        String subject = "Service Provider Application Update - Urban Nexus";

        String htmlMessage = "<html>"
                + "<body style=\"font-family: Arial, sans-serif; background-color:#f4f6f9; padding:20px;\">"

                + "<div style=\"max-width:600px; margin:auto; background:#ffffff; padding:30px; "
                + "border-radius:8px; box-shadow:0 5px 15px rgba(0,0,0,0.08);\">"

                + "<h2 style=\"color:#1e293b; text-align:center;\">Urban Nexus Services</h2>"

                + "<hr style=\"border:none; border-top:1px solid #e2e8f0; margin:20px 0;\"/>"

                + "<h3 style=\"color:#dc2626;\">Application Rejected</h3>"

                + "<p style=\"font-size:15px; color:#334155;\">"
                + "Dear <strong>" + email + "</strong>,"
                + "</p>"

                + "<p style=\"font-size:15px; color:#334155;\">"
                + "Thank you for applying to become a Service Provider on Urban Nexus."
                + "</p>"

                + "<p style=\"font-size:15px; color:#334155;\">"
                + "After reviewing your request, we regret to inform you that your application "
                + "has been rejected for the following reason:"
                + "</p>"

                + "<div style=\"background:#fef2f2; padding:15px; border-left:4px solid #dc2626; "
                + "border-radius:6px; margin:20px 0;\">"
                + "<p style=\"margin:0; color:#7f1d1d; font-size:14px;\">"
                + reason
                + "</p>"
                + "</div>"

                + "<p style=\"font-size:15px; color:#334155;\">"
                + "You may update your information and reapply again in the future."
                + "</p>"

                + "<br/>"

                + "<p style=\"font-size:14px; color:#64748b;\">"
                + "Best Regards,<br/>"
                + "<strong>Urban Nexus Team</strong><br/>"
                + "📧 support@urbannexus.com"
                + "</p>"

                + "</div>"
                + "</body>"
                + "</html>";

        try {
            emailService.sendVerificationEmail(email, subject, htmlMessage);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }


}
