package com.login.signup.login.signup.messaging;

import com.login.signup.login.signup.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class MailProducer {
    private final RabbitTemplate rabbitTemplate;

    public void sendMessage(String email){
        rabbitTemplate.convertAndSend("MailSending",email);
    }
}
