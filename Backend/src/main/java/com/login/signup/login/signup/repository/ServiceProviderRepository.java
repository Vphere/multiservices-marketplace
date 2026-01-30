package com.login.signup.login.signup.repository;

import com.login.signup.login.signup.model.ServiceProvider;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceProviderRepository extends JpaRepository<ServiceProvider,Long> {
    boolean existsByEmail(String email);

    ServiceProvider findByEmail(String email);

    List<ServiceProvider> findByEnabled(boolean i);

    @Query(
            value = "SELECT * FROM service_provider WHERE enabled = 1 AND categories = 'Home Services'",
            nativeQuery = true
    )
    List<ServiceProvider> findHomeService();

    @Query(
            value = "SELECT * FROM service_provider WHERE enabled = 1 AND categories = 'Beauty'",
            nativeQuery = true
    )
    List<ServiceProvider> findBeauty();
}
