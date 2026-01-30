package com.login.signup.login.signup.repository;

import com.login.signup.login.signup.model.ProviderSlot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProviderSlotRepository extends JpaRepository<ProviderSlot,Long> {

    List<ProviderSlot> findByProviderServiceId(Long id);
}
