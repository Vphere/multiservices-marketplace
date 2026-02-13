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

    @Query("""
    SELECT s FROM ServiceProvider s
    WHERE s.enabled = true
    AND s.categories = 'Home Services'
    AND s.providerSlot IS NOT EMPTY
    """)
    List<ServiceProvider> findHomeService();

    @Query("""
        SELECT s FROM ServiceProvider s
        WHERE s.enabled = true
        AND s.categories = 'Beauty'
        AND s.providerSlot IS NOT EMPTY
    """)
    List<ServiceProvider> findBeauty();

    @Query("""
        SELECT s FROM ServiceProvider s
        WHERE s.enabled = true
        AND s.categories = 'Fitness'
        AND s.providerSlot IS NOT EMPTY
    """)
    List<ServiceProvider> findFitness();

    @Query("""
        SELECT s FROM ServiceProvider s
        WHERE s.enabled = true
        AND s.categories = 'Arts & Recreation'
        AND s.providerSlot IS NOT EMPTY
    """)
    List<ServiceProvider> findArtsAndRecreation();
}
