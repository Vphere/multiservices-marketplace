package com.login.signup.login.signup.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
public class ProviderSlot {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    private ServiceProvider provider;

    private LocalDateTime slotStart;
}

