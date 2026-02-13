package com.login.signup.login.signup.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.sql.Blob;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;

@Entity
@Table(name = "service_provider")
@Getter
@Setter
@NoArgsConstructor
public class ServiceProvider {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long serviceId;

    @Lob
    private Blob profilePic;

    private String name;

    private String phonenumber;

    private String address;

    private String categories;

    private Collection<String> servicelist;

    private int years;

    @Lob
    private Blob documentPic;

    private boolean enabled;

    private String email;

    private String city;

    private String state;

    private boolean homeService;

    private boolean reachWorkplace;

    private String companyName;

    private String profession;

    @OneToMany(fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    private List<ProviderSlot> providerSlot;

    private Integer price;

    public ServiceProvider(boolean enabled) {
        this.enabled = false;
    }

    @OneToMany(fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    private List<UserBooking> userBookings;
}
