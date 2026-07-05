package com.login.signup.login.signup.messaging;

import com.login.signup.login.signup.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MailConsumer {
    private final AuthenticationService authenticationService;

    @RabbitListener(queues = "MailSending")
    public void consumeEmail(String email){
        authenticationService.sendVerificationCodeforPasswrod(email);
    }
}
